using bienesoft.Models;
using Bienesoft.Models;
using Microsoft.EntityFrameworkCore;

namespace bienesoft.Services
{
    public class AttendantServices
    {
        private readonly AppDbContext _context;
        public AttendantServices(AppDbContext context)
        {
            _context = context;
        }
        public IEnumerable<Attendant> GetAttendant()
        {
            return _context.attendant.ToList();
        }
        public void AddAttendant(Attendant attendant)
        {
            _context.attendant.Add(attendant);
            _context.SaveChanges();
        }
    
        public Attendant GetById(int id)
        {
            return _context.attendant.FirstOrDefault(p => p.Attendant_Id == id);
        }
        public void Delete(int id)
        {
            var attendant = _context.attendant.FirstOrDefault(p => p.Attendant_Id == id);
            if (attendant != null)
            {
                try
                {
                    _context.attendant.Remove(attendant);
                    _context.SaveChanges();
                }
                catch (Exception ex)
                {
                    throw new Exception("No Se Pudo Eliminar El Attendant" + ex.Message);
                }
            }


            else
            {
                throw new KeyNotFoundException("El Attendant Con El Id" + id + "No Se Pudo Encontrar");
            }
        }
        public void UpdateAttendant(Attendant attendant)
        {
            if (attendant == null)
            {
                throw new ArgumentNullException(nameof(Attendant), "El modelo de Attendant es nulo");
            }

            var existingAttendant = _context.attendant.Find(attendant.Attendant_Id);
            if (existingAttendant == null)
            {
                throw new ArgumentException("Attendant no encontrado");
            }

            existingAttendant.Attendant_Name = attendant.Attendant_Name;
            // Actualiza otros campos según sea necesario

            _context.SaveChanges();
        }
        public IEnumerable<Attendant> GetAttendantsByCriteria(string criteria)
        {
            return _context.attendant
                .Where(a => a.Attendant_Name.Contains(criteria)) // Puedes modificar esta línea según el criterio
                .ToList();
        }

    }
}
