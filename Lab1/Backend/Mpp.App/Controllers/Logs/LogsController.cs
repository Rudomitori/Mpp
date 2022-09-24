using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Mpp.App.ApiModel;
using Mpp.App.Controllers.Logs.Dtos;
using Mpp.App.Db;
using Mpp.App.Db.Entities;
using Mpp.App.Utils;

namespace Mpp.App.Controllers.Logs;

[ApiController]
[Route("api/[controller]")]
public class LogsController: ControllerBase
{
    #region Constructor and dependensies
    
    private readonly AppDbContext _dbContext;

    public LogsController(AppDbContext dbContext)
    {
        _dbContext = dbContext;
    }

    #endregion
    
    [HttpPost]
    public async Task<IActionResult> Post(PostLogDto dto)
    {
        var userId = this.GetUserId();
        var logItem = new LogItem
        {
            Id = Guid.NewGuid(), 
            Date = DateTime.UtcNow,
            Action = dto.Action,
            UserId = userId
        };
        _dbContext.Add(logItem);
        await _dbContext.SaveChangesAsync();
        return Ok();
    }

    [Authorize(Roles = "admin")]
    [HttpGet]
    public async Task<IActionResult> Get(bool withUser)
    {
        IQueryable<LogItem> queryable = withUser
            ? _dbContext.Set<LogItem>().Include(x => x.User)
            : _dbContext.Set<LogItem>();

        var logs = await queryable
            .OrderByDescending(x => x.Date)
            .ToListAsync();

        return Ok(
            logs.Select(x => x.ToDto())
        );
    }
}