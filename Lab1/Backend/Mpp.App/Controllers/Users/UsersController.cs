using System.Security.Claims;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Mpp.App.ApiModel;
using Mpp.App.Controllers.Users.Dtos;
using Mpp.App.Db;
using Mpp.App.Db.Entities;
using Mpp.App.Utils;

namespace Mpp.App.Controllers.Users;

[ApiController]
[Route("[controller]")]
public class UsersController : ControllerBase
{
    #region Constructor and dependensies

    private readonly AppDbContext _dbContext;

    public UsersController(AppDbContext dbContext)
    {
        _dbContext = dbContext;
    }

    #endregion

    [Authorize(Roles = "admin")]
    [HttpGet]
    public async Task<IActionResult> Get()
    {
        var users = await _dbContext.Set<User>().ToListAsync();

        return Ok(users.Select(ApiModelExtension.ToDto));
    }
    
    [Authorize]
    [HttpGet("current")]
    public async Task<IActionResult> GetCurrent()
    {
        var user = await _dbContext.Set<User>()
            .FirstAsync(x => x.Id == this.GetUserId());

        return Ok(user.ToDto());
    }

    [HttpPost("create")]
    public async Task<IActionResult> Create(CreateUserDto dto)
    {
        var userExists = await _dbContext.Set<User>()
            .AnyAsync(x => x.Login == dto.Login);

        if (userExists) return Conflict();
        
        var newUser = new User
        {
            Id = Guid.NewGuid(),
            Login = dto.Login,
            Password = dto.Password
        };

        _dbContext.Add(newUser);
        await _dbContext.SaveChangesAsync();

        return Ok(newUser.ToDto());
    }

    [Authorize]
    [HttpPatch("{id:guid}/Password")]
    public async Task<IActionResult> ChangePassword(Guid id, ChangeUserPasswordDto dto)
    {
        if (!User.IsInRole("admin") && this.GetUserId() != id)
            return BadRequest();
        
        var userToChange = await _dbContext.Set<User>()
            .SingleOrDefaultAsync(x => x.Id == id);

        if (userToChange is null) return NotFound();

        userToChange.Password = dto.Password;
        _dbContext.Update(userToChange);
        await _dbContext.SaveChangesAsync();
        
        return Ok();
    }

    [Authorize]
    [HttpDelete("{id:guid}")]
    public async Task<IActionResult> Delete(Guid id)
    {
        if (!User.IsInRole("admin") && this.GetUserId() != id)
            return BadRequest();

        var userToChange = await _dbContext.Set<User>()
            .SingleOrDefaultAsync(x => x.Id == id);

        if (userToChange is null) return NotFound();

        _dbContext.Remove(userToChange);
        await _dbContext.SaveChangesAsync();

        return Ok();
    }

    [HttpPost("login")]
    public async Task<IActionResult> Login(LoginDto dto)
    {
        var user = await _dbContext.Set<User>()
            .SingleOrDefaultAsync(x =>
                x.Login == dto.Login
                && x.Password == dto.Password);

        if (user is null) return NotFound();

        var claims = new List<Claim>
        {
            new("Id", user.Id.ToString()),
            new(ClaimTypes.Name, user.Login),
            new(ClaimsIdentity.DefaultRoleClaimType, user.IsAdmin ? "admin" : "")
        };

        await HttpContext.SignInAsync(new ClaimsPrincipal(new ClaimsIdentity(claims, "User")));

        return Ok(user.ToDto());
    }

    [Authorize]
    [HttpPost("logout")]
    public async Task<IActionResult> Logout()
    {
        await HttpContext.SignOutAsync();
        return Ok();
    }
}