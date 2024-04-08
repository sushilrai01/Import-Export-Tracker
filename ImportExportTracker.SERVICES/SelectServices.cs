using ImportExportTracker.DB;
using ImportExportTracker.DB.Entity;
using ImportExportTracker.MODEL.Common;
using ImportExportTracker.MODEL.Control;
using ImportExportTracker.MODEL.Response;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ImportExportTracker.SERVICES
{
    public class SelectServices : ISelectServices
    {
        public IDbOptions _dbOptions;
        public SelectServices(IDbOptions dbOptions)
        {
            _dbOptions = dbOptions;
        }
        public async Task<object> GetFiscalYear()
        {
            using var ent = new ImportExportDbContext(_dbOptions.ConOptions);

            return await ent.FiscalYears.Select(x => new 
            {
                Text = x.FiscalYearTitle,
                Value = x.FiscalYearId,
            }).ToListAsync();
        }
    }
}
