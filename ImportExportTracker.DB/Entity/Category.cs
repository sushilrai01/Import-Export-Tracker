using System;
using System.Collections.Generic;

namespace ImportExportTracker.DB.Entity;

public partial class Category
{
    public int CategoryId { get; set; }

    public string? ChapterCode { get; set; }

    public string? CategoryTitle { get; set; }

    public DateOnly? CreatedDate { get; set; }

    public DateOnly? UpdatedDate { get; set; }
}
