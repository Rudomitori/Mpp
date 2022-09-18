using Microsoft.AspNetCore.Mvc.ModelBinding;

namespace Mpp.App.Controllers.Logs.Dtos;

public class PostLogDto
{
    [BindRequired]
    public string Action { get; set; }
}