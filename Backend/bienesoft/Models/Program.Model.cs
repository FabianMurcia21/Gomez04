using System.ComponentModel.DataAnnotations;

namespace Bienesoft.Models
{
    public class ProgramModel
    {
        [Key]public int Program_Id { get; set; }


        [Required(ErrorMessage = "El nombre del programa es obligatorio.")]
        [StringLength(35, ErrorMessage = "El nombre no puede tener más de 35 caracteres.")]
        public string Program_Name  { get; set; }

    }
    public class UpdateModelProgram
    {
        public string Program_Name { get; set; }
    }
}
