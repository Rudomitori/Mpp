using System.ComponentModel.DataAnnotations;

namespace Mpp.App.Db.Entities;

public class Message
{
    public Guid Id { get; set; }
    public DateTime Date { get; set; }
    
    public Guid FromId { get; set; }
    public User From { get; set; }
    
    public Guid ToId { get; set; }
    public User To { get; set; }
    
    [Required]
    public string Text { get; set; }
}