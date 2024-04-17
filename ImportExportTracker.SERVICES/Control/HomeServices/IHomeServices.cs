using ImportExportTracker.MODEL.Common;
using ImportExportTracker.MODEL.Control.HomeModel;
using ImportExportTracker.MODEL.Response;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ImportExportTracker.SERVICES.Control.HomeServices
{
    public interface IHomeServices
    {
        Task<ServiceResponse<HomeReportModel>> ListImportExport();
        Task<object> GetFiscalYearTitle();
    }
}
