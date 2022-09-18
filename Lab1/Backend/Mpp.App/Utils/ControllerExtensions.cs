using Microsoft.AspNetCore.Mvc;

namespace Mpp.App.Utils;

public static class ControllerExtensions
{
    /// <summary>
    /// Get the user id from <see cref="ControllerBase.HttpContext"/>
    /// </summary>
    public static Guid? GetUserId(this ControllerBase controller)
    {
        return controller.HttpContext.User.FindFirst("id")?.Value is { } str
            ? new Guid(str)
            : null;
    }
}