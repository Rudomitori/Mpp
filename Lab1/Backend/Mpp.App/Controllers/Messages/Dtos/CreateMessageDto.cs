using Microsoft.AspNetCore.Mvc.ModelBinding;

namespace Mpp.App.Controllers.Messages.Dtos;

public class CreateMessageDto
{
    [BindRequired]
    public Guid ToId { get; set; }
    
    [BindRequired]
    public string Text { get; set; }
}