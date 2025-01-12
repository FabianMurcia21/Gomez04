﻿using bienesoft.models;
using bienesoft.Models;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace bienesoft.Services
{
    public class UserServices
    {
        private readonly AppDbContext _context;

        public UserServices(AppDbContext context)
        {
            _context = context;
        }

       

        public async Task<IEnumerable<User>> AllUsersAsync()
        {
            return await _context.user.ToListAsync();
        }

        public async Task AddUserAsync(User user)
        {
            await _context.user.AddAsync(user);
            await _context.SaveChangesAsync();
        }

        public async Task<User> GetByIdAsync(int id)
        {
            return await _context.user.FirstOrDefaultAsync(p => p.User_Id == id);
        }

        public async Task DeleteAsync(int id)
        {
            var user = await GetByIdAsync(id);
            if (user != null)
            {
                try
                {
                    _context.user.Remove(user);
                    await _context.SaveChangesAsync();
                }
                catch (Exception ex)
                {
                    throw new Exception("No se pudo eliminar el usuario: " + ex.Message);
                }
            }
            else
            {
                throw new KeyNotFoundException("El usuario con el ID " + id + " no se pudo encontrar.");
            }
        }

        public async Task UpdateUserAsync(User user)
        {
            if (user == null)
            {
                throw new ArgumentNullException(nameof(user), "El modelo de usuario es nulo");
            }

            // Busca el usuario existente usando Where
            var existingUser = await _context.user
                .Where(u => u.User_Id == user.User_Id)
                .FirstOrDefaultAsync();

            if (existingUser == null)
            {
                throw new ArgumentException("Usuario no encontrado");
            }

            // Asignar todas las propiedades del objeto user al objeto existingUser
            // Puedes usar AutoMapper o simplemente asignar manualmente
            existingUser.Email = user.Email;
            existingUser.HashedPassword = user.HashedPassword;
            existingUser.Salt = user.Salt;
            existingUser.SessionCount = user.SessionCount;
            existingUser.TokJwt = user.TokJwt;
            existingUser.Blockade = user.Blockade;
            existingUser.UserType = user.UserType;
            existingUser.Asset = user.Asset;

            // Guarda los cambios en el contexto
            await _context.SaveChangesAsync();
        }

        // Nuevo método para obtener un usuario por correo electrónico
        public async Task<User> GetByEmailAsync(string email)
        {
            return await _context.user.FirstOrDefaultAsync(u => u.Email == email);
        }
        public async Task<bool> UserByEmail(string email)
        {
            return await _context.user.AnyAsync(u => u.Email == email);
        } 
    }
}
