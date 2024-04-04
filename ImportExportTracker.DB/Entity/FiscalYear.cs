using System;
using System.Collections.Generic;

namespace ImportExportTracker.DB.Entity;

public partial class FiscalYear
{
    public int FiscalYearId { get; set; }

    public string FiscalYearTitle { get; set; } = null!;

    public string? FiscalYearCode { get; set; }

    public DateOnly StartDate { get; set; }

    public DateOnly EndDate { get; set; }

    public string? Remarks { get; set; }

    public bool IsActive { get; set; }

    public bool IsDeleted { get; set; }

    public string? UpdatedBy { get; set; }

    public DateTime? UpdatedDate { get; set; }

    public string? UpdatedTerminalId { get; set; }

    public string CreatedBy { get; set; } = null!;

    public DateTime? CreatedDate { get; set; }

    public string? CreatedTerminalId { get; set; }

    public string? DeletedBy { get; set; }

    public DateTime? DeletedDate { get; set; }

    public string? DeletedTerminalId { get; set; }

    public virtual ICollection<CommodityImport> CommodityImports { get; set; } = new List<CommodityImport>();
}
