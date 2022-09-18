using Microsoft.AspNetCore.Mvc.ModelBinding;

namespace Mpp.App.Controllers.Users.Dtos;

public class ChangeUserPasswordDto
{
    [BindRequired]
    public string Password { get; set; }
}