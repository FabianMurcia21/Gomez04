using bienesoft.Funcions;
using bienesoft.Models;
using bienesoft.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Linq;

namespace bienesoft.Controllers
{
    [ApiController]
    [Route("Api/[controller]")]
   
    public class ApprenticeController : Controller

    {
        public IConfiguration _Configuration { get; set; }
        public GeneralFunction GeneralFunction;
        private readonly ApprenticeServices _ApprenticeServices;


        public ApprenticeController(IConfiguration configuration, ApprenticeServices apprenticeServices)
        {
            _Configuration = configuration;
            _ApprenticeServices = apprenticeServices;
        }

        [HttpPost("Create")]
        public IActionResult AddApprendice(Apprentice apprentice)
        {
            try
            {
                //var error = GeneralFunction.ValidModel(apprentice);
                //if (error.Length == 0)
                //{
                    _ApprenticeServices.AddApprendice(apprentice);
                    return Ok(new
                    {
                        message = "Apprentice Creado Con Exito"
                    });
                //}
                //return BadRequest();
            }
            catch (Exception ex)
            {
                GeneralFunction.Addlog(ex.ToString());
                return StatusCode(500, ex.ToString());
            }
        }

        [HttpGet("AllApprentice")]
        public ActionResult<IEnumerable<Apprentice>> AllApprentice()
        {
            return Ok(_ApprenticeServices.AllApprentice());
        }

        [HttpGet("GetApprentice")]
        public IActionResult GetApprentice(int id)
        {
            try
            {
                var apprentice = _ApprenticeServices.GetById(id);
                if (apprentice == null)
                {
                    return NotFound("No se encontró el aprendiz");
                }
                return Ok(apprentice);
            }
            catch (Exception ex)
            {
                GeneralFunction.Addlog(ex.Message);
                return StatusCode(500, ex.ToString());
            }
        }

        [HttpDelete("DeleteApprentice")]
        public IActionResult Delete(int id)
        {
            try
            {
                var apprentice = _ApprenticeServices.GetById(id);
                if (apprentice == null)
                {
                    return NotFound($"El aprendiz con el ID {id} no se pudo encontrar");
                }
                _ApprenticeServices.Delete(id);
                return Ok("Apprentice eliminado con éxito");
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

        [HttpPut("UpdateApprentice")]
        public IActionResult Update(Apprentice apprentice)
        {
            if (apprentice == null)
            {
                return BadRequest("El modelo de Apprentice es nulo");
            }

            try
            {
                _ApprenticeServices.UpdateApprentice(apprentice);
                return Ok("Apprentice actualizado exitosamente");
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

        [HttpGet("AllApprenticeInRange")]
        public ActionResult<IEnumerable<Apprentice>> GetAllInRange(int Inicio, int Fin)
        {
            try
            {
                // Validar los parámetros
                if (Inicio < 1 || Fin < Inicio)
                {
                    return BadRequest("Los parámetros de rango son inválidos.");
                }

                var apprentice = _ApprenticeServices.AllApprentice()
                                                    .Skip(Inicio - 1)
                                                    .Take(Fin - Inicio + 1)
                                                    .ToList();

                if (!apprentice.Any())
                {
                    return NotFound("No se encontraron aprendices en el rango especificado.");
                }

                return Ok(apprentice);
            }
            catch (Exception ex)
            {
                GeneralFunction.Addlog(ex.Message);
                return StatusCode(500, ex.ToString());
            }
        }
    }
}
