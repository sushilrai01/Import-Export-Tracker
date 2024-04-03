using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;

namespace ImportExportTracker.DB.Entity;

public partial class ImportExportDbContext : DbContext
{
    public ImportExportDbContext()
    {
    }

    public ImportExportDbContext(DbContextOptions<ImportExportDbContext> options)
        : base(options)
    {
    }

    public virtual DbSet<Category> Categories { get; set; }

    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
#warning To protect potentially sensitive information in your connection string, you should move it out of source code. You can avoid scaffolding the connection string by using the Name= syntax to read it from configuration - see https://go.microsoft.com/fwlink/?linkid=2131148. For more guidance on storing connection strings, see https://go.microsoft.com/fwlink/?LinkId=723263.
        => optionsBuilder.UseSqlServer("Server=ASPIRE-SUSHI\\SQLEXPRESS;Database=Import_Export_DB;user=sa;password=@ssms123;TrustServerCertificate=True");

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<Category>(entity =>
        {
            entity.ToTable("Category");

            entity.Property(e => e.CategoryTitle).HasMaxLength(200);
            entity.Property(e => e.ChapterCode)
                .HasMaxLength(50)
                .IsUnicode(false);
        });

        OnModelCreatingPartial(modelBuilder);
    }

    partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
}
