using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Bienesoft.Models;
using bienesoft.Funcions;
using bienesoft.Services;
using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using Bienesoft.Services;
using bienesoft.Models;
using Microsoft.AspNetCore.Authorization;

namespace bienesoft.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    //[Authorize]
    public class DepartmentController : Controller
    {
        public IConfiguration _Configuration { get; set; }
        public GeneralFunction GeneralFunction;
        private readonly DepartmentServices _DepartmentServices;

        public DepartmentController(IConfiguration configuration, DepartmentServices departmentServices)
        {
            _Configuration = configuration;
            _DepartmentServices = departmentServices;
            GeneralFunction = new GeneralFunction(_Configuration); // Asegúrate de inicializar GeneralFunction si es necesario.
        }

        [HttpPost("CreateDepartment")]
        public IActionResult AddDepartment(Department department)
        {
            try
            {
                _DepartmentServices.AddDepartment(department);
                return Ok(new
                {
                    message = "Departamento creado con éxito"
                });
            }
            catch (Exception ex)
            {
                GeneralFunction.Addlog(ex.ToString());
                return StatusCode(500, ex.ToString());
            }
        }

        [HttpGet("GetDepartment")]
        public IActionResult GetDepartment(int id)
        {
            try
            {
                var department = _DepartmentServices.GetById(id);
                if (department == null)
                {
                    return NotFound("No se encontró el departamento");
                }
                return Ok(department);
            }
            catch (Exception ex)
            {
                GeneralFunction.Addlog(ex.Message);
                return StatusCode(500, ex.ToString());
            }
        }

        [HttpPut("UpdateDepartment")]
        public IActionResult UpdateDepartment(int id, Department department)
        {
            if (department == null || id != department.Department_Id)
            {
                return BadRequest("El modelo de Departamento es nulo o el ID no coincide");
            }

            try
            {
                _DepartmentServices.UpdateDepartment(department);
                return Ok("Departamento actualizado exitosamente");
            }
            catch (ArgumentNullException ex)
            {
                return BadRequest(ex.Message);
            }
            catch (ArgumentException ex)
            {
                return BadRequest(ex.Message);
            }
            catch (Exception ex)
            {
                GeneralFunction.Addlog(ex.Message);
                return StatusCode(500, ex.ToString());
            }
        }

        [HttpDelete("DeleteDepartment")]
        public IActionResult Delete(int id)
        {
            try
            {
                var department = _DepartmentServices.GetById(id);
                if (department == null)
                {
                    return NotFound("El departamento con el ID " + id + " no se pudo encontrar");
                }
                _DepartmentServices.Delete(id);
                return Ok("Departamento eliminado con éxito");
            }
            catch (KeyNotFoundException knFEx)
            {
                return NotFound(knFEx.Message);
            }
            catch (Exception ex)
            {
                GeneralFunction.Addlog(ex.Message);
                return StatusCode(500, ex.ToString());
            }
        }

        [HttpGet("AllDepartments")]
        public ActionResult<IEnumerable<Department>> GetAllDepartments()
        {
            return Ok(_DepartmentServices.GetDepartments());
        }
    }
}