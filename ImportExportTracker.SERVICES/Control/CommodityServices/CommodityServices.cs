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
    }
}
