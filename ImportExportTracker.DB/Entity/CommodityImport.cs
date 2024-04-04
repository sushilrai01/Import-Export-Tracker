using System;
using System.Collections.Generic;

namespace ImportExportTracker.DB.Entity;

public partial class CommodityImport
{
    public int CommodityId { get; set; }

    public string? CommodityName { get; set; }

    public string? HsCode { get; set; }

    public int? CategoryId { get; set; }

    public string? ChapterCode { get; set; }

    public int? FiscalYearId { get; set; }

    public int? MonthId { get; set; }

    public string? Unit { get; set; }

    public int? Quantity { get; set; }

    public int? ImportValue { get; set; }

    public int? ImportRevenue { get; set; }

    public DateTime? CreatedDate { get; set; }

    public int? CreatedBy { get; set; }

    public virtual Category? Category { get; set; }

    public virtual FiscalYear? FiscalYear { get; set; }

    public virtual MonthsEnNp? Month { get; set; }
}
