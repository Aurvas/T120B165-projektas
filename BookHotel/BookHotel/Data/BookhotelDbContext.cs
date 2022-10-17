using BookHotel.Data.Entities;
using Microsoft.EntityFrameworkCore;

namespace BookHotel.Data;

public class BookhotelDbContext : DbContext
{
	public DbSet<City> City { get; set; }
	public DbSet<Hotel> Hotel { get; set; }

	public DbSet<Room> Room { get; set; }
	

	protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
	{
		optionsBuilder.UseMySQL("server=localhost;port=3306;user=root;password=Aurvas189;database=bookhoteldb");
	}
}
