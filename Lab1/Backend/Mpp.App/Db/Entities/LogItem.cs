using System.ComponentModel.DataAnnotations;

namespace Mpp.App.Db.Entities;

public class LogItem
{
    public Guid Id { get; set; }
    public DateTime Date { get; set; }
    [Required]
    public string Action { get; set; }
    
    public Guid? UserId { get; set; }
    public User User { get; set; }
}