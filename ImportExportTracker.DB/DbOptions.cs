using ImportExportTracker.DB.Entity;
using Microsoft.EntityFrameworkCore;

namespace ImportExportTracker.DB
{
    public class DbOptions : IDbOptions
    {
        public DbContextOptions<ImportExportDbContext> ConOptions { get; set; }
        public DbOptions(DbContextOptions<ImportExportDbContext> uoptions)
        {
            ConOptions = uoptions;
        }
    }
    public interface IDbOptions
    {
        DbContextOptions<ImportExportDbContext> ConOptions { get; set; }

    }
}

