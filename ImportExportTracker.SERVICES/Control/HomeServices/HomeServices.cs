using ImportExportTracker.DB;
using ImportExportTracker.DB.Entity;
using ImportExportTracker.MODEL.Common;
using ImportExportTracker.MODEL.Control;
using ImportExportTracker.MODEL.Control.HomeModel;
using ImportExportTracker.MODEL.Response;
using Microsoft.AspNetCore.Mvc.ApplicationModels;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ImportExportTracker.SERVICES.Control.HomeServices
{
    public class HomeServices: IHomeServices
    {
        public IDbOptions _dbOptions;
        public HomeServices(IDbOptions dbOptions)
        {
            _dbOptions = dbOptions;
        }

        public async Task<ServiceResponse<HomeReportModel>> ListImportExport()
        {
            using var ent = new ImportExportDbContext(_dbOptions.ConOptions);

            HomeReportModel model = new HomeReportModel();
            int topDataNo = 5;

            var obj = await ent.CommodityImports
            .Include(x => x.Category)
                .Include(x => x.FiscalYear)
                .Include(x => x.Month)
                .Where(x => x.FiscalYearId == 3) //__CURRENT FISCAL YEAR ID
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

            var commodityReportList = obj.GroupBy(x => new
            {
                x.CategoryId,
                x.CategoryTitle,
                x.CommodityName,
                x.HsCode,
                x.FiscalYearTitle
            })
            .Select(group => new ReportImportExportModel
            {
                CommodityName = group.Key.CommodityName,
                HsCode = group.Key.HsCode,
                CategoryId = group.Key.CategoryId,
                CategoryTitle = group.Key.CategoryTitle,
                FiscalYearTitle = group.Key.FiscalYearTitle,
                TotalQuantity = (decimal)group.Sum(y => y.Quantity ?? 0),
                TotalImportValue = group.Sum(x => x.ImportValue ?? 0),
                TotalImportRevenue = group.Sum(x => x.ImportRevenue ?? 0),
            })
            .OrderByDescending(x => x.TotalImportValue);
                

              model.CommodityReportList = commodityReportList.Take(topDataNo).ToList();

            //______Report of Commodity Import as per Category (individual)
            var CategoryReportList = obj.GroupBy(x => new
            {
                x.CategoryId,
                x.CategoryTitle,
                x.FiscalYearTitle
            })
           .Select(group => new ReportImportExportModel
           {
               CategoryId = group.Key.CategoryId,
               CategoryTitle = group.Key.CategoryTitle,
               FiscalYearTitle = group.Key.FiscalYearTitle,
               TotalQuantity = (decimal)group.Sum(y => y.Quantity ?? 0),
               TotalImportValue = group.Sum(x => x.ImportValue ?? 0),
               TotalImportRevenue = group.Sum(x => x.ImportRevenue ?? 0),
           })
            .OrderByDescending(x => x.TotalImportValue);
                

            model.CategoryReportList = CategoryReportList.Take(topDataNo).ToList();

            return new ServiceResponse<HomeReportModel> (true, "Added Successfully", MessageType.Success) { Data = model };
        }

        public async Task<object> GetFiscalYearTitle()
        {
            using var ent = new ImportExportDbContext(_dbOptions.ConOptions);
            return await ent.CommodityImports.Include(x => x.FiscalYear).GroupBy(x => x.FiscalYear.FiscalYearTitle).Select(x => new
            {
                FiscalYearTitle = x.Key
            }).Take(5).OrderBy(x => x.FiscalYearTitle).ToListAsync();
         }
    }
}
