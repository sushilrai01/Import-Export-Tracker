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

        public async Task<ServiceResponse<bool>> Add(ImportExportModel model)
        {
            return new ServiceResponse<bool>(true, "Okay" , MessageType.Success) { Data = true };
        }
    }
}
