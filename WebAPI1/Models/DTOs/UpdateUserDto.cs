using System.ComponentModel.DataAnnotations;

namespace WebAPI1.Models.DTOs
{
    public class UpdateUserDto
    {
       
        [Required]
        public int Id { get; set; }

        [MaxLength(100)]
        public string? UserName { get; set; }

        [EmailAddress]
        public string? Email { get; set; }

        public string? Password { get; set; }
    }
}