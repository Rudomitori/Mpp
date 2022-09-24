using Microsoft.EntityFrameworkCore;
using Mpp.App.Db;
using Mpp.App.Utils;
using Serilog;

var builder = WebApplication.CreateBuilder(args);

builder.Host
    .UseSerilog((context, services, configuration) => configuration
        .ReadFrom.Configuration(context.Configuration)
        .ReadFrom.Services(services)
        .Enrich.FromLogContext());

builder.Services.AddControllers();

builder.Services.AddDbContext<AppDbContext>(optionsBuilder =>
{
    var connectionString = builder.Configuration.GetConnectionString("Default");
    optionsBuilder.UseNpgsql(connectionString);
});

// Authentication
builder.Services.AddAuthentication("Cookie")
    .AddCookie("Cookie", options =>
    {
        options.Cookie.Name = "Cheburek";
        options.Events.OnRedirectToLogin = context =>
        {
            context.Response.StatusCode = StatusCodes.Status401Unauthorized;
            return Task.CompletedTask;
        };
        options.Cookie.HttpOnly = false;
    });

var app = builder.Build();

app.UseStaticFiles();

// Configuring CORS to be able to run frontend by command "yarn start"
app.UseCors(corsPolicyBuilder =>
{
    corsPolicyBuilder
        .AllowAnyMethod()
        .AllowAnyHeader()
        .AllowCredentials()
        .WithOrigins("http://127.0.0.1:5173");
});

app.UseAuthentication();

app.UseMiddleware<SerilogAddInfo>();
app.UseSerilogRequestLogging();

app.UseAuthorization();

app.MapControllers();

app.MapFallbackToFile("index.html");

app.Run();
