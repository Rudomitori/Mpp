namespace Mpp.App.ApiModel;

public sealed class ApiUser
{
    public Guid Id { get; set; }
    public string Login { get; set; }
    public bool IsAdmin { get; set; }
}