using System;
using System.ComponentModel;
using System.ComponentModel.DataAnnotations;

namespace bienesoft.Models
{
    public class FileModel
    {
        [Key]
        public int File_Id { get; set; }

        [DisplayName("Cantidad de aprendices")]
        [Required(ErrorMessage = "Se requiere este campo")]
        [Range(0, 1000, ErrorMessage = "La cantidad de aprendices debe ser un valor entre {1} y {2}")]
        public int Apprentice_count { get; set; }

        [DisplayName("Fecha de Inicio")]
        [Required(ErrorMessage = "Se requiere este campo")]
        [DataType(DataType.Date, ErrorMessage = "El formato de la fecha no es válido")]
        public DateTime Start_Date { get; set; }

        [DisplayName("Fecha de Fin")]
        [Required(ErrorMessage = "Se requiere este campo")]
        [DataType(DataType.Date, ErrorMessage = "El formato de la fecha no es válido")]
        public DateTime End_Date { get; set; }

        [DisplayName("Programa")]
        [Required(ErrorMessage = "Se requiere este campo")]
        public int Program_Id { get; set; }
    }
}
