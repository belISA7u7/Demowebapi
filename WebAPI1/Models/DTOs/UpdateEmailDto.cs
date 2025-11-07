using System.ComponentModel.DataAnnotations;

namespace WebAPI1.Models.DTOs
{
    public class UpdateEmailDto
    {
       
        [Required]
        public int Id { get; set; }

        [Required, EmailAddress]
        public string Email { get; set; } = string.Empty;
    }
}