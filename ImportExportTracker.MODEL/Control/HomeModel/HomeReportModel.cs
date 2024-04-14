using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ImportExportTracker.MODEL.Control.HomeModel
{
    public class HomeReportModel
    {
        public List<ReportImportExportModel> CommodityReportList { get; set; }
        public List<ReportImportExportModel> CategoryReportList { get; set; }
    }
}
