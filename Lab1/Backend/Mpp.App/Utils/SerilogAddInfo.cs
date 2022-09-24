using Serilog.Context;

namespace Mpp.App.Utils;

/// <summary>
/// An additional info provider for Serialog.
/// Adds a property <c>Address</c> with a client IP to the logging context 
/// </summary>
public class SerilogAddInfo
{
    private readonly RequestDelegate _next;

    public SerilogAddInfo(RequestDelegate next)
    {
        _next = next;
    }

    public async Task Invoke(HttpContext context)
    {
        using var addressProperty = LogContext.PushProperty(
            "Address",
            context.Connection.RemoteIpAddress
        );
        
        using var userIdProperty = LogContext.PushProperty(
            "UserId",
            context.User.FindFirst("id")?.Value is { } str
                ? new Guid(str)
                : null
        );
            
        await _next.Invoke(context);
    }
}