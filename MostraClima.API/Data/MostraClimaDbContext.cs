using Microsoft.EntityFrameworkCore;
using MostraClima.API.Model;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MostraClima.API.Data
{
    public class MostraClimaDbContext : DbContext
    {
        public MostraClimaDbContext(DbContextOptions<MostraClimaDbContext> opt) : base(opt)
        {

        }


        public DbSet<Consulta> Consultas { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Consulta>()
                .HasKey(c => c.Id);

            modelBuilder.Entity<Consulta>()
                .Property(c => c.QueryDate)
                .HasDefaultValueSql("GETDATE()");
        }
    }
}
