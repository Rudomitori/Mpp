using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Mpp.App.Controllers.Messages.Dtos;
using Mpp.App.Db;
using Mpp.App.Db.Entities;
using Mpp.App.Utils;

namespace Mpp.App.Controllers.Messages;

[ApiController]
[Route("[controller]")]
public class MessagesController : ControllerBase
{
    #region Constructor and dependensies

    private readonly AppDbContext _dbContext;

    public MessagesController(AppDbContext dbContext)
    {
        _dbContext = dbContext;
    }

    #endregion

    [Authorize]
    [HttpPost]
    public async Task<IActionResult> Create(CreateMessageDto dto)
    {
        var currentUserId = this.GetUserId()!.Value;

        if (currentUserId == dto.ToId) return BadRequest();

        var userExists = await _dbContext.Set<User>()
            .AnyAsync(x => x.Id == dto.ToId);

        if (!userExists) return NotFound();

        var newMessage = new Message
        {
            Date = DateTime.UtcNow,
            FromId = currentUserId,
            ToId = dto.ToId,
            Text = dto.Text
        };

        _dbContext.Add(newMessage);
        await _dbContext.SaveChangesAsync();

        return Ok(newMessage);
    }

    [Authorize]
    [HttpGet]
    public async Task<IActionResult> Get(Guid secondUserId)
    {
        var currentUserId = this.GetUserId()!.Value;

        if (currentUserId == secondUserId) return BadRequest();

        var userIds = new [] {currentUserId, secondUserId};
        var messages = _dbContext.Set<Message>()
            .Where(x => userIds.Contains(x.FromId) 
                        && userIds.Contains(x.ToId));

        return Ok(messages);
    }

    [Authorize(Roles = "admin")]
    [HttpGet("Statistic")]
    public async Task<IActionResult> GetStatistic()
    {
        var statistic = _dbContext.Set<Message>()
            .GroupBy(x => new {x.FromId, x.ToId})
            .Select(x => new
            {
                x.Key.FromId,
                x.Key.ToId,
                Count = x.Count()
            });

        return Ok(statistic);
    }
}