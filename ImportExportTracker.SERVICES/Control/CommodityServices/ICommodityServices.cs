using ImportExportTracker.MODEL.Common;
using ImportExportTracker.MODEL.Control;
using ImportExportTracker.MODEL.Response;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ImportExportTracker.SERVICES.Control.CommodityServices
{
    
    public interface ICommodityServices
    {
        Task<ServiceResponse<bool>> Add(List<ImportExportModel> itemList);
        Task<ServiceResponse<CommonModel<DropDownList>>> FiscalYearList();
    }
}
