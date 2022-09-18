using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Mpp.App.Migrations
{
    public partial class AddIdToLogItem : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<Guid>(
                name: "Id",
                table: "LogItem",
                type: "uuid",
                nullable: false,
                defaultValue: new Guid("00000000-0000-0000-0000-000000000000"));

            migrationBuilder.AddColumn<Guid>(
                name: "UserId",
                table: "LogItem",
                type: "uuid",
                nullable: true);

            migrationBuilder.AddPrimaryKey(
                name: "PK_LogItem",
                table: "LogItem",
                column: "Id");

            migrationBuilder.CreateIndex(
                name: "IX_LogItem_UserId",
                table: "LogItem",
                column: "UserId");

            migrationBuilder.AddForeignKey(
                name: "FK_LogItem_User_UserId",
                table: "LogItem",
                column: "UserId",
                principalTable: "User",
                principalColumn: "Id");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_LogItem_User_UserId",
                table: "LogItem");

            migrationBuilder.DropPrimaryKey(
                name: "PK_LogItem",
                table: "LogItem");

            migrationBuilder.DropIndex(
                name: "IX_LogItem_UserId",
                table: "LogItem");

            migrationBuilder.DropColumn(
                name: "Id",
                table: "LogItem");

            migrationBuilder.DropColumn(
                name: "UserId",
                table: "LogItem");
        }
    }
}
