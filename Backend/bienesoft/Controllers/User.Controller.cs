﻿using bienesoft.Funcions;
using bienesoft.models;
using bienesoft.Models;
using bienesoft.Services;
using Microsoft.AspNetCore.Authorization; // Añadir esto
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;

namespace bienesoft.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class UserController : Controller
    {
        private readonly IConfiguration _configuration;
        private readonly JWTModels _jwtSettings;
        private readonly UserServices _UserServices;
        public GeneralFunction GeneralFunction;

        public UserController(IConfiguration configuration, UserServices userServices)
        {
            _configuration = configuration;
            _jwtSettings = configuration.GetSection("JWT").Get<JWTModels>();
            _UserServices = userServices;
            GeneralFunction = new GeneralFunction(_configuration); // Inicializa GeneralFunction aquí
        }

        [HttpPost("Login")]
        public IActionResult Login(LoginUser login)
        {
            try
            {
                var user = _UserServices.GetByEmailAsync(login.Email).Result;
                if (user == null || !BCrypt.Net.BCrypt.Verify(login.HashedPassword + user.Salt, user.HashedPassword))
                {
                    return Unauthorized(new { message = "Credenciales incorrectas." });
                }

                var key = Encoding.UTF8.GetBytes(_jwtSettings.keysecret);
                var claims = new ClaimsIdentity(new[]
                {
            new Claim("User", user.Email)
                 });

                var tokenDescriptor = new SecurityTokenDescriptor
                {
                    Subject = claims,
                    Expires = DateTime.UtcNow.AddMinutes(Convert.ToDouble(_jwtSettings.JWTExpireTime)),
                    SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature)
                };

                var token = new JwtSecurityTokenHandler().CreateToken(tokenDescriptor);
                var tokenString = new JwtSecurityTokenHandler().WriteToken(token);

                user.TokJwt = tokenString;
                _UserServices.UpdateUserAsync(user).Wait();

                return Ok(new { token = tokenString });
            }
            catch (Exception ex)
            {
                GeneralFunction.Addlog(ex.ToString());
                return StatusCode(500, "Ocurrió un error en el servidor.");
            }
        }


        //[Authorize] // Protección de la ruta con JWT
        //[HttpGet("ProtectedRoute")]
        //public IActionResult ProtectedRoute()
        //{
        //    var userEmail = User.FindFirstValue(ClaimTypes.NameIdentifier); // Obtener el usuario desde el token
        //    return Ok(new { message = $"Bienvenido, {userEmail}" });
        //}

        // Método para restablecer la contraseña (sin protección JWT)
        [HttpPost("ResetPassUser")]
        public async Task<IActionResult> ResetPassword(ResetPassUser user)
        {
            try
            {
                var userExists = await _UserServices.UserByEmail(user.Email);
                if (!userExists)
                {
                    return NotFound (new { message = "El correo electrónico no está registrado." });
                }

                var emailResponse = await GeneralFunction.SendEmail(user.Email);
                if (!emailResponse.Status)
                {
                    return BadRequest(new { message = "Sin Conexion a Intenet " });
                    return BadRequest(new {message= emailResponse.Message});
                }

                return Ok(new { message = "Correo de restablecimiento de contraseña enviado correctamente."});
            }
            catch (Exception ex)
            {
                GeneralFunction.Addlog(ex.ToString());
                return StatusCode(500, ex.ToString());
            }
        }

        // Este método de crear usuario es público
        [HttpPost("CreateUser")]
        public async Task<IActionResult> CreateUser(User user)
        {
            try
            {
                string salt = BCrypt.Net.BCrypt.GenerateSalt();
                user.HashedPassword = BCrypt.Net.BCrypt.HashPassword(user.HashedPassword + salt);
                user.Salt = salt;
                user.TokJwt = "";
 
                await _UserServices.AddUserAsync(user);
                return Ok(new { message = "Usuario creado con éxito" });
            }
            catch (Exception ex)
            {
                GeneralFunction.Addlog(ex.ToString());
                return StatusCode(500, ex.ToString());
            }
        }


        [HttpGet("AllUsers")]
        //[Authorize]
        public async Task<ActionResult<IEnumerable<User>>> AllUsers()
        {
            var users = await _UserServices.AllUsersAsync();
            return Ok(users);
        }


        [HttpGet("GetUser/{id}")]
        //[Authorize]
        public async Task<IActionResult> GetUser(int id)
        {
            try
            {
                var user = await _UserServices.GetByIdAsync(id);
                if (user == null)
                {
                    return NotFound("No se encontró el usuario");
                }
                return Ok(user);
            }
            catch (Exception ex)
            {
                GeneralFunction.Addlog(ex.Message);
                return StatusCode(500, ex.ToString());
            }
        }

  
        [HttpDelete("DeleteUser/{id}")]
        //[Authorize]
        public async Task<IActionResult> Delete(int id)
        {
            try
            {
                var userToDelete = await _UserServices.GetByIdAsync(id);
                if (userToDelete == null)
                {
                    return NotFound($"El usuario con el ID {id} no se pudo encontrar");
                }
                await _UserServices.DeleteAsync(id);
                return Ok("Usuario eliminado con éxito");
            }
            catch (Exception ex)
            {
                GeneralFunction.Addlog(ex.Message);
                return StatusCode(500, ex.ToString());
            }
        }

        [HttpPut("UpdateUser")]
        //[Authorize]
        public async Task<IActionResult> Update(User user)
        {
            if (user == null)
            {
                return BadRequest("El modelo de usuario es nulo");
            }

            try
            {
                await _UserServices.UpdateUserAsync(user);
                return Ok("Usuario actualizado exitosamente");
            }
            catch (Exception ex)
            {
                GeneralFunction.Addlog(ex.Message);
                return StatusCode(500, ex.ToString());
            }
        }

  
        [HttpGet("AllUsersInRange")]
        //[Authorize]
        public async Task<ActionResult<IEnumerable<User>>> GetAllInRange(int inicio, int fin)
        {
            try
            {
                if (inicio < 1 || fin < inicio)
                {
                    return BadRequest("Los parámetros de rango son inválidos.");
                }

                var usersInRange = await _UserServices.AllUsersAsync();
                var paginatedUsers = usersInRange.Skip(inicio - 1).Take(fin - inicio + 1).ToList();

                if (!paginatedUsers.Any())
                {
                    return NotFound("No se encontraron usuarios en el rango especificado.");
                }

                return Ok(paginatedUsers);
            }
            catch (Exception ex)
            {
                GeneralFunction.Addlog(ex.Message);
                return StatusCode(500, ex.ToString());
            }
        }
    }
}

