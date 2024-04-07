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

    public virtual DbSet<CommodityImport> CommodityImports { get; set; }

    public virtual DbSet<FiscalYear> FiscalYears { get; set; }

    public virtual DbSet<MonthsEnNp> MonthsEnNps { get; set; }

    public virtual DbSet<ReportImport> ReportImports { get; set; }

    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
#warning To protect potentially sensitive information in your connection string, you should move it out of source code. You can avoid scaffolding the connection string by using the Name= syntax to read it from configuration - see https://go.microsoft.com/fwlink/?linkid=2131148. For more guidance on storing connection strings, see https://go.microsoft.com/fwlink/?LinkId=723263.
        => optionsBuilder.UseSqlServer("Server=ASPIRE-SUSHI\\SQLEXPRESS;Database=Import_Export_DB;user=sa;password=@ssms123;TrustServerCertificate=True");

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<Category>(entity =>
        {
            entity.ToTable("Category");

            entity.HasIndex(e => e.ChapterCode, "UniqueChapterCode").IsUnique();

            entity.Property(e => e.CategoryTitle).HasMaxLength(200);
            entity.Property(e => e.ChapterCode)
                .HasMaxLength(50)
                .IsUnicode(false);
        });

        modelBuilder.Entity<CommodityImport>(entity =>
        {
            entity.HasKey(e => e.CommodityId);

            entity.ToTable("CommodityImport");

            entity.Property(e => e.ChapterCode)
                .HasMaxLength(50)
                .IsUnicode(false);
            entity.Property(e => e.CreatedDate).HasColumnType("datetime");
            entity.Property(e => e.HsCode)
                .HasMaxLength(100)
                .IsUnicode(false);
            entity.Property(e => e.ImportRevenue).HasColumnType("decimal(18, 2)");
            entity.Property(e => e.ImportValue).HasColumnType("decimal(18, 2)");
            entity.Property(e => e.Quantity).HasColumnType("decimal(18, 2)");
            entity.Property(e => e.Unit)
                .HasMaxLength(50)
                .IsUnicode(false);

            entity.HasOne(d => d.Category).WithMany(p => p.CommodityImports)
                .HasForeignKey(d => d.CategoryId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_CommodityImport_CommodityImport");

            entity.HasOne(d => d.FiscalYear).WithMany(p => p.CommodityImports)
                .HasForeignKey(d => d.FiscalYearId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_FiscalYear_CommodityImport");

            entity.HasOne(d => d.Month).WithMany(p => p.CommodityImports)
                .HasForeignKey(d => d.MonthId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_MonthsEnNp_CommodityImport");
        });

        modelBuilder.Entity<FiscalYear>(entity =>
        {
            entity.Property(e => e.CreatedBy).HasMaxLength(500);
            entity.Property(e => e.CreatedDate).HasColumnType("datetime");
            entity.Property(e => e.CreatedTerminalId)
                .HasMaxLength(500)
                .IsUnicode(false);
            entity.Property(e => e.DeletedBy).HasMaxLength(500);
            entity.Property(e => e.DeletedDate).HasColumnType("datetime");
            entity.Property(e => e.DeletedTerminalId)
                .HasMaxLength(500)
                .IsUnicode(false);
            entity.Property(e => e.FiscalYearCode)
                .HasMaxLength(100)
                .IsUnicode(false);
            entity.Property(e => e.FiscalYearTitle).HasMaxLength(500);
            entity.Property(e => e.UpdatedBy).HasMaxLength(500);
            entity.Property(e => e.UpdatedDate).HasColumnType("datetime");
            entity.Property(e => e.UpdatedTerminalId).HasMaxLength(500);
        });

        modelBuilder.Entity<MonthsEnNp>(entity =>
        {
            entity.HasKey(e => e.MonthId);

            entity.ToTable("MonthsEnNp");

            entity.Property(e => e.MonthEn)
                .HasMaxLength(50)
                .IsUnicode(false);
            entity.Property(e => e.MonthNp)
                .HasMaxLength(50)
                .IsUnicode(false);
        });

        modelBuilder.Entity<ReportImport>(entity =>
        {
            entity
                .HasNoKey()
                .ToView("reportImport");

            entity.Property(e => e.CategoryTitle).HasMaxLength(200);
            entity.Property(e => e.CreatedDate).HasColumnType("datetime");
            entity.Property(e => e.FiscalYearTitle).HasMaxLength(500);
            entity.Property(e => e.HsCode)
                .HasMaxLength(100)
                .IsUnicode(false);
            entity.Property(e => e.ImportRevenue).HasColumnType("decimal(18, 2)");
            entity.Property(e => e.ImportValue).HasColumnType("decimal(18, 2)");
            entity.Property(e => e.MonthNp)
                .HasMaxLength(50)
                .IsUnicode(false);
            entity.Property(e => e.Quantity).HasColumnType("decimal(18, 2)");
            entity.Property(e => e.Unit)
                .HasMaxLength(50)
                .IsUnicode(false);
        });

        OnModelCreatingPartial(modelBuilder);
    }

    partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
}
