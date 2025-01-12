using System.ComponentModel.DataAnnotations;
using System.ComponentModel;

namespace bienesoft.Models
{
    public class Responsible
    {
        [Key]
        public int Responsible_Id { get; set; }

        [DisplayName("Nombre del responsable")]
        [Required(ErrorMessage = "El campo {0} es requerido")]
        [StringLength(50, ErrorMessage = "El campo {0} tiene un límite de {1} caracteres.")]
        public string Nom_Responsible { get; set; }

        [DisplayName("Apellido del responsable")]
        [Required(ErrorMessage = "El campo {0} es requerido")]
        [StringLength(50, ErrorMessage = "El campo {0} tiene un límite de {1} caracteres.")]
        public string Ape_Responsible { get; set; }

        [DisplayName("Telefono del responsable")]
        [Required(ErrorMessage = "Se requiere este campo")]
        //[Range(0000000000, 9999999999, ErrorMessage = "El campo {0} solo permite {1} caracteres")]
        public long Tel_Responsible { get; set; }

        [DisplayName("Tipo de Responsable")]
        [StringLength(50, ErrorMessage = "El campo {0} tiene un límite de {1} caracteres.")]
        [Required(ErrorMessage = "El campo {0} es requerido")]
        public string Tip_Responsible { get; set; }


 

    }
}
