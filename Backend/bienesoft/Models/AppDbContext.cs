using bienesoft.models;
using Bienesoft.Models;
using Microsoft.EntityFrameworkCore;

namespace bienesoft.Models
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }

        //Agrega tus DbSet para las entidades
        public DbSet<Apprentice> apprentice { get; set; }
        public DbSet<FileModel> file { get; set; }
        public DbSet<Area> area { get; set; }
        public DbSet<Permission> permissiongn { get; set; }
        public DbSet<Attendant> attendant { get; set; }
        public DbSet<ProgramModel> program { get; set; }
        public DbSet<User> user { get; set; }
        public DbSet<Department>department { get; set; }
        public DbSet<Locality> locality { get; set; }
        public DbSet<AuthorizationResponsible> authorizationResponsible { get; set; }
        public DbSet<PermissionFS> permissionFS { get; set; }
        public DbSet<Reason> reason { get; set; }
        public DbSet<Responsible> responsible { get; set; }




        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            if (!optionsBuilder.IsConfigured)
            {
                optionsBuilder.UseMySql("Server=localhost;Database=bienesoft;User=root;Password=murcia21;Port=3306",
                    new MySqlServerVersion(new Version(8,0,23)));
            }

        }
    }


}
