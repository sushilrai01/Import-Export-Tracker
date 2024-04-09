using ImportExportTracker.MODEL.Control;
using ImportExportTracker.DB;
using ImportExportTracker.DB.Entity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using ImportExportTracker.MODEL.Response;
using ImportExportTracker.MODEL.Common;
using Microsoft.EntityFrameworkCore;
using ClosedXML.Excel;
using DocumentFormat.OpenXml.Spreadsheet;
using System.Text.RegularExpressions;
using DocumentFormat.OpenXml.Office2010.Drawing;

namespace ImportExportTracker.SERVICES.Control.CommodityServices
{
    public class CommodityServices : ICommodityServices
    {
        private const bool resulkt = true;
        public IDbOptions _dbOptions;
        public CommodityServices(IDbOptions dboptions)
        {
            _dbOptions = dboptions;
        }
        public async Task<ServiceResponse<bool>> Add(List<ImportExportModel> itemList)
        {
            using var ent = new ImportExportDbContext(_dbOptions.ConOptions);
            List<CommodityImport> commodityList = new List<CommodityImport>();
            try
            {
                foreach (var item in itemList)
                {
                    var importData = new CommodityImport()
                    {
                        CommodityName = item.CommodityName,
                        HsCode = item.HsCode,
                        ChapterCode = item.ChapterCode,
                        CategoryId = item.CategoryId,
                        Unit = item.Unit ?? "na",
                        Quantity = item.Quantity,
                        ImportRevenue = item.ImportRevenue,
                        ImportValue = item.ImportValue,
                        FiscalYearId =  item.FiscalYearId,
                        MonthId =  item.MonthId,
                        CreatedDate = DateTime.Now,
                    };
                    commodityList.Add(importData);
                }


                await ent.CommodityImports.AddRangeAsync(commodityList);
                await ent.SaveChangesAsync();
                return new ServiceResponse<bool>(true, "Added Successfully", MessageType.Success) { Data = true };
            }
            catch(Exception ex)
            {
                throw;
            }
           
        }

        public async Task<ServiceResponse<bool>> SaveExcelData(ImportExportMasterModel model)
        {
            using var ent = new ImportExportDbContext(_dbOptions.ConOptions);
            string reg = @"^[0-9]\d*(\.\d+)?$";
            var chapterIdCodes = ent.Categories.Select(x => new
            {
                x.CategoryId,
                x.ChapterCode
            });
           
            using (var stream = model.File.OpenReadStream())
            {
                using (var workbook = new XLWorkbook(stream))
                {
                    var worksheet = workbook.Worksheets.First(); // Assuming data is in the first worksheet
                    int startRow = 2; // Assuming data starts from the third row (excluding headers)
                    var ExcelResultList = new ImportExportModel();
                    List<CommodityImport> excelRows = new List<CommodityImport>();
                    while (!worksheet.Row(startRow).IsEmpty()) // Loop until an empty row is encountered
                    {
                        //long InitialKws = 0;
                        decimal Quantity = 0;
                        decimal ImportRevenue = 0;
                        decimal ImportValue = 0;

                        string hsCode = worksheet.Cell(startRow, 1).Value.ToString();
                        string commodityName = worksheet.Cell(startRow, 2).Value.ToString();
                        string unit = worksheet.Cell(startRow, 3).Value.ToString();
                        var quantity = worksheet.Cell(startRow, 4).Value.ToString();
                        var importValue = worksheet.Cell(startRow, 5).Value.ToString();
                        var importRevenue = worksheet.Cell(startRow, 6).Value.ToString();

                        if (!string.IsNullOrWhiteSpace(hsCode))
                        {
                            if (Regex.IsMatch(quantity, reg))
                            {
                                double dValue = double.Parse(quantity);
                                Quantity = (decimal)dValue;
                            }
                            if (Regex.IsMatch(importValue, reg))
                            {
                                double doubleValue = double.Parse(importValue);
                                ImportValue = (decimal)doubleValue;
                            }
                            if (Regex.IsMatch(importRevenue, reg))
                            {
                                double doubleValue = double.Parse(importRevenue);
                                ImportRevenue = (decimal)doubleValue;
                            }
                            // This is an item within the current location
                            var chapterCode = hsCode.Substring(0, 2);
                             int categoryId = chapterIdCodes.Where(x => x.ChapterCode == chapterCode).Select(x => x.CategoryId).FirstOrDefault();   

                            var masteritem = new CommodityImport
                            {
                                CommodityName = commodityName,
                                HsCode = hsCode,
                                ChapterCode = chapterCode,
                                CategoryId = categoryId,
                                Unit = unit ?? "na",
                                Quantity = Quantity,
                                ImportRevenue = ImportRevenue,
                                ImportValue = ImportValue,
                                FiscalYearId = model.FiscalYearId,
                                MonthId = model.MonthId,
                                CreatedDate = DateTime.Now,
                            };
                            excelRows.Add(masteritem);
                            //PlanPolicyMasterList.Add(masteritemS);
                            // Insert the header into the database

                        }
                        startRow++;
                    }

                    if (excelRows.Any())
                    {
                        await ent.CommodityImports.AddRangeAsync(excelRows);
                        await ent.SaveChangesAsync();
                    }
                }
            }

            return new ServiceResponse<bool>(true, "Data Uploaded Successfully");
        }

        public async Task<ServiceResponse<CommonModel<ReportImportExportModel>>> ReportCommodityImport(int FiscalYearId = 2)
        {

            using var ent = new ImportExportDbContext(_dbOptions.ConOptions);
            CommonModel<ReportImportExportModel> model = new CommonModel<ReportImportExportModel>();

            var obj = await ent.CommodityImports
                .Include(x => x.Category)
                .Include(x => x.FiscalYear)
                .Include(x => x.Month)
                .Where(x => x.FiscalYearId == FiscalYearId)
                .Select(x => new
                {
                    CommodityId = x.CommodityId,
                    CommodityName = x.CommodityName,
                    HsCode = x.HsCode,
                    CategoryId = x.Category.CategoryId,
                    CategoryTitle = x.Category.CategoryTitle,
                    ChapterCode = x.Category.ChapterCode,
                    FiscalYearId = x.FiscalYearId,
                    FiscalYearTitle = x.FiscalYear.FiscalYearTitle,
                    MonthNp = x.Month.MonthNp,
                    Unit = x.Unit,
                    Quantity = x.Quantity,
                    ImportValue = x.ImportValue,
                    ImportRevenue = x.ImportRevenue,

                }).ToListAsync();
           
            //______Report of Commodity Import as per Commodities (individual)

            var resultList = obj.GroupBy(x => new
            {
                x.CategoryId,
                x.CategoryTitle,
                x.CommodityName,
                x.CommodityId,
                x.HsCode,
                x.FiscalYearTitle
            })
            .Select(group => new ReportImportExportModel
            {
                CommodityId = group.Key.CommodityId,
                CommodityName = group.Key.CommodityName,
                HsCode = group.Key.HsCode,
                CategoryId = group.Key.CategoryId,
                CategoryTitle = group.Key.CategoryTitle,
                FiscalYearTitle = group.Key.FiscalYearTitle,
                TotalQuantity = (decimal) group.Sum(y => y.Quantity??0),
                TotalImportValue = group.Sum(x => x.ImportValue??0),
                TotalImportRevenue = group.Sum(x => x.ImportRevenue??0),
            }).OrderByDescending(x => x.TotalImportValue).ToList();

            int countR = resultList.Count();

            model.List = resultList;

            //______Report of Commodity Import as per Commodities (individual)
            //TODO

            return new ServiceResponse<CommonModel<ReportImportExportModel>>(true, "Data Uploaded Successfully", MessageType.Success) { Data = model };
        }

    }
}
