using System.ComponentModel.DataAnnotations;

namespace WebAPI1.Models.DTOs
{
    public class UpdateUserDto
    {
       
        [MaxLength(100)]
        public string? UserName { get; set; }

        [EmailAddress]
        public string? Email { get; set; }

        public string? Password { get; set; }
    }
}