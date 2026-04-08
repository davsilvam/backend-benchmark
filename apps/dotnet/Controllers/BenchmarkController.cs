using dotnet_app.Data;
using dotnet_app.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Npgsql;

namespace dotnet_app.Controllers;

[ApiController]
[Route("api")]
public class BenchmarkController : ControllerBase
{
    private readonly AppDbContext _context;
    private readonly IConfiguration _configuration;

    public BenchmarkController(AppDbContext context, IConfiguration configuration)
    {
        _context = context;
        _configuration = configuration;
    }

    [HttpGet("health")]
    public IActionResult Health()
    {
        return Ok(new { status = "ok" });
    }

    [HttpGet("compute")]
    public IActionResult Compute([FromQuery] int n = 40)
    {
        return Ok(new { result = Fib(n) });
    }

    private long Fib(int n)
    {
        if (n <= 1) return n;
        return Fib(n - 1) + Fib(n - 2);
    }

    [HttpGet("users")]
    public async Task<IActionResult> GetUsers()
    {
        var users = await _context.Users
            .AsNoTracking()
            .Select(u => new
            {
                u.Id,
                u.Name,
                u.Email,
                u.CreatedAt
            })
            .Take(1000)
            .ToListAsync();

        return Ok(users);
    }

    [HttpGet("users/raw")]
    public async Task<IActionResult> GetUsersRaw()
    {
        var users = new List<object>();
        var connectionString = _configuration.GetConnectionString("Default");

        await using var conn = new NpgsqlConnection(connectionString);
        await conn.OpenAsync();

        await using var cmd = new NpgsqlCommand(
            "SELECT id, name, email, created_at FROM users LIMIT 1000",
            conn
        );

        await using var reader = await cmd.ExecuteReaderAsync();

        while (await reader.ReadAsync())
        {
            users.Add(new
            {
                id = reader.GetInt32(0),
                name = reader.GetString(1),
                email = reader.GetString(2),
                created_at = reader.GetDateTime(3)
            });
        }

        return Ok(users);
    }

    [HttpPost("users")]
    public async Task<IActionResult> CreateUser([FromBody] User user)
    {
        user.CreatedAt = DateTime.UtcNow;

        _context.Users.Add(user);
        await _context.SaveChangesAsync();

        return StatusCode(201, user);
    }
}
