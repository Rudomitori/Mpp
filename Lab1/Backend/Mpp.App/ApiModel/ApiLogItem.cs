namespace Mpp.App.ApiModel;

public class ApiLogItem
{
    public Guid Id { get; set; }
    public DateTime Date { get; set; }
    public string Action { get; set; }
    
    public ApiUser User { get; set; }
}