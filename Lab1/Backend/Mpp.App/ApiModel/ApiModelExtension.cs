using Mpp.App.Db.Entities;

namespace Mpp.App.ApiModel;

public static class ApiModelExtension
{
    public static ApiUser ToDto(this User user) => new ApiUser
    {
        Id = user.Id,
        Login = user.Login,
        IsAdmin = user.IsAdmin
    };

    public static ApiLogItem ToDto(this LogItem item) => new ApiLogItem
    {
        Id = item.Id,
        Date = item.Date,
        Action = item.Action,
        User = item.User?.ToDto()
    };
}