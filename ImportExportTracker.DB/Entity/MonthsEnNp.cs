using System;
using System.Collections.Generic;

namespace ImportExportTracker.DB.Entity;

public partial class MonthsEnNp
{
    public int MonthId { get; set; }

    public string? MonthNp { get; set; }

    public string? MonthEn { get; set; }

    public virtual ICollection<CommodityImport> CommodityImports { get; set; } = new List<CommodityImport>();
}
