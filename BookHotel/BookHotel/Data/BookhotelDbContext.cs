using BookHotel.Auth.Model;
using BookHotel.Data.Entities;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace BookHotel.Data;

public class BookhotelDbContext : IdentityDbContext<BookHotelRestUser>
{
	private readonly IConfiguration _configuration;
	public DbSet<City> City { get; set; }
	public DbSet<Hotel> Hotel { get; set; }

	public DbSet<Room> Room { get; set; }

	public BookhotelDbContext(IConfiguration configuration)
	{
		_configuration = configuration;
	}

	protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
	{
		optionsBuilder.UseMySQL("server=localhost;port=3306;user=root;password=Aurvas189;database=bookhoteldb");
	}
}
