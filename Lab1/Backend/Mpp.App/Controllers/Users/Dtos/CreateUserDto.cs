using Microsoft.AspNetCore.Mvc.ModelBinding;

namespace Mpp.App.Controllers.Users.Dtos;

public class CreateUserDto
{
    [BindRequired]
    public string Login { get; set; }
    
    [BindRequired]
    public string Password { get; set; }
}