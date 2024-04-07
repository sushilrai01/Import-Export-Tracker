using ImportExportTracker.MODEL.Common;
using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ImportExportTracker.MODEL.Control
{
    public class ImportExportMasterModel 
    {
        public IFormFile? File { get; set; }
        public int FiscalYearId { get; set; }
        public int MonthId { get; set; }
        //public int CategoryId { get; set; }
    }

    public class ImportExportModel : CommonModel<ImportExportModel>
    {
        public int CommodityId { get; set; }
        public string CommodityName { get; set; }
        public string HsCode { get; set; }
        public string ChapterCode { get; set; }
        public int FiscalYearId { get; set; }
        public string FiscalYearTitle { get; set; }
        public int MonthId { get; set; }
        public string MonthNp { get; set; }
        public int CategoryId { get; set; }
        public string CategoryTitle { get; set; }
        public string? Unit { get; set; }
        public decimal Quantity { get; set; }
        public decimal ImportValue { get; set; }
        public decimal ImportRevenue { get; set; }
        public DateTime CreatedDate { get; set; }
        public int CreatedBy { get; set; }
        //public List<ImportExportModel> List { get; set; }
    }

    public class DropDownList
    {
        public string Text { get; set; }
        public int Value { get; set; }

    }
}
