using System.ComponentModel.DataAnnotations;

namespace ZwajApp.API.DTOs
{
    public class UserForRegisterDto
    {
        [Required]
        public string Username { get; set; }
        [StringLength(8,MinimumLength=6,ErrorMessage="يجب ان لا تقل كلمة السر عن اربعة حروف والا تزيد عن ثمانيه")]
        public string Password { get; set; }
    }
}