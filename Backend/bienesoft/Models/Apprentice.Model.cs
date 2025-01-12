using System.ComponentModel;
using System.ComponentModel.DataAnnotations;

namespace bienesoft.Models
{
    public class Apprentice
    {
        [Key]
        public long Apprentice_Id { get; set; }

        [DisplayName("Nombre del Aprendiz")]
        [Required(ErrorMessage = "Campo {0} es requerido")]
        [StringLength(100, ErrorMessage = "El campo {0} tiene un limite de caracteres de {1}")]
        public string Apprentice_Name { get; set; }

        [DisplayName("Numero de Telefono")]
        [Required(ErrorMessage = "Campo {0} es requerido")]
        [StringLength(100, ErrorMessage = "El campo {0} tiene un limite de caracteres de {1}")]
        public string Apprentice_Phone { get; set; }

        [DisplayName("Tipo de Aprendiz")]
        [Required(ErrorMessage = "Campo {0} es requerido")]
        [StringLength(100, ErrorMessage = "El campo {0} tiene un limite de caracteres de {1}")]
        public string Apprentice_Type { get; set; }

        [DisplayName("Acudiente")]
        [Required(ErrorMessage = "Campo {0} es requerido")]
        public int Attendant_Id { get; set; }

        [DisplayName("File")]
        [Required(ErrorMessage = "Campo {0} es requerido")]
        public int File_Id { get; set; }

        [DisplayName("Correo Electrónico")]
        [Required(ErrorMessage = "Campo {0} es requerido")]
        [StringLength(45, ErrorMessage = "El campo {0} tiene un limite de caracteres de {1}")]
        [EmailAddress(ErrorMessage = "El campo {0} debe tener un formato de correo electrónico válido")]
        public string Apprentice_Email { get; set; }

        [DisplayName("Dirección")]
        [Required(ErrorMessage = "Campo {0} es requerido")]
        [StringLength(45, ErrorMessage = "El campo {0} tiene un limite de caracteres de {1}")]
        public string Apprentice_Address { get; set; }

        [DisplayName("Sexo")]
        [Required(ErrorMessage = "Campo {0} es requerido")]
        [StringLength(15, ErrorMessage = "El campo {0} tiene un limite de caracteres de {1}")]
        public string Apprentice_Sex { get; set; }

        [DisplayName("Localidad")]
        [Required(ErrorMessage = "Campo {0} es requerido")]
        public int Locality_Id { get; set; }

        [DisplayName("Tipo de Documento")]
        [Required(ErrorMessage = "Campo {0} es requerido")]
        [StringLength(5, ErrorMessage = "El campo {0} tiene un limite de caracteres de {1}")]
        public string Document_Type { get; set; }

        [DisplayName("Discapacidad")]
        [Required(ErrorMessage = "Campo {0} es requerido")]
        public string Disability { get; set; }


        [DisplayName("Acumulado de permisos")]
        public int? Stackor_Permissions { get; set; } = null;   
    }
}
