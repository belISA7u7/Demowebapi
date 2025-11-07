using System.ComponentModel.DataAnnotations;

namespace WebAPI1.Models.DTOs
{
    public class DeleteUserDto
    {
        [Required]
        public int Id { get; set; }
    }
}