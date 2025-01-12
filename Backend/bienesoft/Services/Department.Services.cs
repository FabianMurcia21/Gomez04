using bienesoft.Models;
using Bienesoft.Models;
using System.Collections.Generic;
using System.Linq;

namespace Bienesoft.Services
{
    public class DepartmentServices
    {
        private readonly AppDbContext _context;

        public DepartmentServices(AppDbContext context)
        {
            _context = context;
        }

        public IEnumerable<Department> GetDepartments()
        {
            return _context.department.ToList(); // Cambiado a 'departments' en minúsculas.
        }

        public void AddDepartment(Department department)
        {
            _context.department.Add(department); // Cambiado a 'departments' en minúsculas.
            _context.SaveChanges();
        }

        public Department GetById(int id)
        {
            return _context.department.FirstOrDefault(d => d.Department_Id == id); // Cambiado a 'departments' en minúsculas.
        }

        public void Delete(int id)
        {
            var department = _context.department.FirstOrDefault(d => d.Department_Id == id); // Cambiado a 'departments' en minúsculas.
            if (department != null)
            {
                try
                {
                    _context.department.Remove(department); // Cambiado a 'departments' en minúsculas.
                    _context.SaveChanges();
                }
                catch (Exception ex)
                {
                    throw new Exception("No se pudo eliminar el departamento: " + ex.Message);
                }
            }
            else
            {
                throw new KeyNotFoundException("El departamento con el ID " + id + " no se pudo encontrar.");
            }
        }

        public void UpdateDepartment(Department department)
        {
            if (department == null)
            {
                throw new ArgumentNullException(nameof(department), "El modelo de Departamento es nulo");
            }

            var existingDepartment = _context.department.Find(department.Department_Id); // Cambiado a 'departments' en minúsculas.
            if (existingDepartment == null)
            {
                throw new ArgumentException("Departamento no encontrado");
            }

            existingDepartment.DepartmentName = department.DepartmentName; // Actualiza otros campos según sea necesario.

            _context.SaveChanges();
        }
    }
}