using System.Security.Cryptography;
using System.Text;
using Microsoft.EntityFrameworkCore;
using WebAPI1.Data;
using WebAPI1.Models;
using WebAPI1.Models.DTOs;

namespace WebAPI1.Services
{
    public class UserService
    {
        private readonly AppDbContext _appDbContext;
        public UserService(AppDbContext appDbContext)
        {
            _appDbContext = appDbContext;
        }

        public async Task<List<User>> GetAllUserAsync()
        {
            var users = _appDbContext.Users.ToListAsync();
            return await users;
        }

        public async Task<User> RegisterUserAsync(RegisterUserDto dto)
        {
            if (await _appDbContext.Users.AnyAsync(u => u.Email == dto.Email))
                throw new Exception("Email ya registrado");
            var user = new User
            {
                Email = dto.Email,
                UserName = dto.UserName,
                Password = HashPassword(dto.Password)
            };

            _appDbContext.Users.Add(user);
            await _appDbContext.SaveChangesAsync();
            return user;
        }

        public async Task<User> UpdateUserAsync(UpdateUserDto dto)
        {
            var user = await _appDbContext.Users.FindAsync(dto.Id);
            if (user == null)
                throw new Exception("Usuario no encontrado");

            if (!string.IsNullOrWhiteSpace(dto.Email) && dto.Email != user.Email)
            {
                if (await _appDbContext.Users.AnyAsync(u => u.Email == dto.Email && u.Id != dto.Id))
                    throw new Exception("Email ya registrado por otro usuario");
                user.Email = dto.Email;
            }

            if (!string.IsNullOrWhiteSpace(dto.UserName))
                user.UserName = dto.UserName;

            if (!string.IsNullOrWhiteSpace(dto.Password))
                user.Password = HashPassword(dto.Password);

            _appDbContext.Users.Update(user);
            await _appDbContext.SaveChangesAsync();
            return user;
        }

        public async Task<User> UpdateUserEmailAsync(UpdateEmailDto dto)
        {
            var user = await _appDbContext.Users.FindAsync(dto.Id);
            if (user == null)
                throw new Exception("Usuario no encontrado");

            if (string.IsNullOrWhiteSpace(dto.Email))
                throw new Exception("Email inválido");

            if (user.Email == dto.Email)
                return user; 

            if (await _appDbContext.Users.AnyAsync(u => u.Email == dto.Email && u.Id != dto.Id))
                throw new Exception("Email ya registrado por otro usuario");

            user.Email = dto.Email;
            _appDbContext.Users.Update(user);
            await _appDbContext.SaveChangesAsync();
            return user;
        }

        public async Task DeleteUserAsync(int id)
        {
            var user = await _appDbContext.Users.FindAsync(id);
            if (user == null)
                throw new Exception("Usuario no encontrado");

            _appDbContext.Users.Remove(user);
            await _appDbContext.SaveChangesAsync();
        }

        public string HashPassword(string password)
        {
            var sha256 = SHA256.Create();
            var bytes = Encoding.UTF8.GetBytes(password);
            var hash = sha256.ComputeHash(bytes);
            return Convert.ToBase64String(hash);
        }
    }
}