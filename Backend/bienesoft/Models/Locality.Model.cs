using System.ComponentModel.DataAnnotations;
using System.ComponentModel;

namespace bienesoft.Models
{
    public class Locality
    {
        [Key]
        public int Locality_Id { get; set; }

        [DisplayName("Nombre de la Localidad")]
        [Required(ErrorMessage = "El campo {0} es requerido")]
        [StringLength(50, ErrorMessage = "El campo {0} tiene un límite de {1} caracteres.")]
        public string Nom_Locality { get; set; }

        [DisplayName("Tipo de Localidad")]
        [StringLength(30, ErrorMessage = "El campo {0} tiene un límite de {1} caracteres.")]
        [Required(ErrorMessage = "El campo {0} es requerido")]
        public string Tip_Locality { get; set; }

        [DisplayName("Departamento")]
        [Required(ErrorMessage = "El campo Id_Departamento es requerido")]
        public int Id_Department { get; set; }
    }
}