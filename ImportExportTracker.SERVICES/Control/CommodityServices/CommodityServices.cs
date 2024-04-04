using ImportExportTracker.MODEL.Control;
using ImportExportTracker.DB;
using ImportExportTracker.DB.Entity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using ImportExportTracker.MODEL.Response;

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
                        FiscalYearId = 3, //item.FiscalYearId,
                        MonthId = 5,//item.MonthId,
                        CreatedDate = DateTime.Now,
                    };
                    commodityList.Add(importData);
                }


                await ent.CommodityImports.AddRangeAsync(commodityList);
                await ent.SaveChangesAsync();
                return new ServiceResponse<bool>(true, "Okay", MessageType.Success) { Data = true };
            }
            catch(Exception ex)
            {
                throw;
            }

           
        }
    }
}
