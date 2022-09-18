using Microsoft.EntityFrameworkCore;
using Mpp.App.Db;

var builder = WebApplication.CreateBuilder(args);

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
app.UseAuthorization();

app.MapControllers();

app.Run();
