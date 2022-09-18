using System.ComponentModel.DataAnnotations;

namespace Mpp.App.Db.Entities;

public class User
{
    public Guid Id { get; set; }
    [Required]
    public string Login { get; set; }
    [Required]
    public string Password { get; set; }
    
    public bool IsAdmin { get; set; }
}