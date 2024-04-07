using ImportExportTracker.MODEL.Common;
using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ImportExportTracker.MODEL.Control
{
  
    public class ReportImportExportModel : CommonModel<ReportImportExportModel>
    {
        public int CommodityId { get; set; }
        public string CommodityName { get; set; }
        public string HsCode { get; set; }
        public string ChapterCode { get; set; }
        public int FiscalYearId { get; set; }
        public string FiscalYearTitle { get; set; }
        public int CategoryId { get; set; }
        public string CategoryTitle { get; set; }
        public decimal TotalQuantity { get; set; }
        public decimal TotalImportValue { get; set; }
        public decimal TotalImportRevenue { get; set; }
        public DateTime CreatedDate { get; set; }
    }

}
