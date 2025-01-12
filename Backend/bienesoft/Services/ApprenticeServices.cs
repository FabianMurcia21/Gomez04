using bienesoft.Models;
using Bienesoft.Models;

namespace bienesoft.Services
{
    public class ApprenticeServices
    {
        private readonly AppDbContext _context;
        public ApprenticeServices(AppDbContext context)
        {
            _context = context;
        }
        public IEnumerable<Apprentice> AllApprentice() 
        { 
            return _context.apprentice.ToList();
        }
        public void AddApprendice(Apprentice apprentice)
        { 
            _context.apprentice.Add(apprentice);
            _context.SaveChanges();
        }
        public Apprentice GetById(int id)
        {
            return _context.apprentice.FirstOrDefault(p => p.Apprentice_Id == id);
        }
        public void Delete(int id)
        {
            var apprentice = _context.apprentice.FirstOrDefault(p => p.Apprentice_Id == id);
            if (apprentice != null) 
            {
                try
                {
                    _context.apprentice.Remove(apprentice);
                    _context.SaveChanges();
                }
                catch (Exception ex) 
                {
                    throw new Exception("No Se Pudo Eliminar El Aprendiz" + ex.Message);
                }
            }
            else
            {
                throw new KeyNotFoundException("El Apprentice Con El Id" + id + "No Se Pudo Encontrar");
            }
        }
        public void UpdateApprentice(Apprentice apprentice)
        {
            if (apprentice == null)
            {
                throw new ArgumentNullException(nameof(Apprentice), "El modelo de Apprentice es nulo");
            }

            var existingApprentice = _context.apprentice.Find(apprentice.Apprentice_Id);
            if (existingApprentice == null)
            {
                throw new ArgumentException("Apprentice no encontrado");
            }

            existingApprentice.Apprentice_Name = apprentice.Apprentice_Name;
            // Actualiza otros campos según sea necesario

            _context.SaveChanges();
        }
        public IEnumerable<Apprentice> GetApprenticeByCriteria(string criteria)
        {
            return _context.apprentice
                .Where(a => a.Apprentice_Name.Contains(criteria)) // Puedes modificar esta línea según el criterio
                .ToList();
        }
    }
}
