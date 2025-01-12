using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Bienesoft.Models;
using bienesoft.Funcions;
using bienesoft.Services;
using Microsoft.Extensions.Configuration;
using bienesoft.Models;
using Microsoft.AspNetCore.Authorization;

namespace Bienesoft.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
   
    public class AttendantController : Controller
    {
        public IConfiguration _Configuration { get; set; }
        public GeneralFunction GeneralFunction;
        private readonly AttendantServices _AttendantServices;

        public AttendantController(IConfiguration configuration, AttendantServices attendantservices)
        {
            _Configuration = configuration;
            _AttendantServices = attendantservices;
        }
        [HttpPost("CreateAttendant")]
        public IActionResult AddArea(Attendant attendant)
        {
            try
            {
                _AttendantServices.AddAttendant(attendant);
                return Ok(new
                {
                    message = "Attendant creado con exito"
                });
            }
            catch (Exception ex)
            {
                GeneralFunction.Addlog(ex.ToString());
                return StatusCode(500, ex.ToString());
            }

        }

        [HttpGet("GetAttendant")]
        public IActionResult GetAttendant(int id)
        {
            try
            {
                var attendant = _AttendantServices.GetById(id);
                if (attendant == null)
                {
                    return NotFound("No Se Encontró El Attendant");
                }
                return Ok(attendant);
            }
            catch (Exception ex)
            {

                return StatusCode(500, ex.ToString());

            }
        }

        [HttpPost("UpdateAttendant")]
        public IActionResult Update(int Id, Attendant attendant)
        {
            try
            {
                return Ok();
            }
            catch (Exception ex)
            {
                GeneralFunction.Addlog(ex.Message);
                return StatusCode(500, ex.ToString());
            }
        }

        [HttpDelete("DeleteAttendant")]
        public IActionResult Delete(int id)
        {
            try
            {
                var attendant = _AttendantServices.GetById(id);
                if (attendant == null)
                {
                    return NotFound("El Attendant Con El Id" + id + "No Se Pudo Encontrar");
                }
                _AttendantServices.Delete(id);
                return Ok("Attendant Eliminado Con Exito");
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

        [HttpGet("AllAttendant")]
        public ActionResult<IEnumerable<Attendant>> GetAttendant()
        {
            return Ok(_AttendantServices.GetAttendant());
        }
        [HttpPut("UpdateAttendant")]
        public IActionResult Update(Attendant attendant)
        {
            if (attendant == null)
            {
                return BadRequest("El modelo de Attendant es nulo");
            }

            try
            {
                _AttendantServices.UpdateAttendant(attendant);
                return Ok("Attendant actualizado exitosamente");
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
        [HttpGet("search")]
        public IActionResult SearchAttendants(string criteria)
        {
            var attendants = _AttendantServices.GetAttendantsByCriteria(criteria);
            if (attendants == null || !attendants.Any())
            {
                return NotFound("No se encontraron asistentes que coincidan con el criterio.");
            }
            return Ok(attendants);
        }



    }
}
