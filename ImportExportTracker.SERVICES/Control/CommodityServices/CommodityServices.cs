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

        public async Task<ServiceResponse<bool>> Add(List<ImportExportModel> itemList)
        {
            using var ent = new ImportExportDbContext();
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

        public async Task<ServiceResponse<CommonModel<DropDownList>>> FiscalYearList()
        {
            using var ent = new ImportExportDbContext();

            var model = new CommonModel<DropDownList>();
            
           var list = await ent.FiscalYears.Select(x =>new DropDownList
           {
               Text = x.FiscalYearTitle,
               Value = x.FiscalYearId,
           }).ToListAsync();

            model.List = list;

            return new ServiceResponse<CommonModel<DropDownList>>(true, "Success List", MessageType.Success)
            {
                Data = model
            };
            
        }

        public async Task<ServiceResponse<bool>> SaveExcelData(ImportExportMasterModel model)
        {
            using var ent = new ImportExportDbContext();
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
    }
}
