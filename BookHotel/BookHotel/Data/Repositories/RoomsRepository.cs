using BookHotel.Data.Entities;
using Microsoft.EntityFrameworkCore;

namespace BookHotel.Data.Repositories;

public interface IRoomsRepository
{
	Task<Room?> GetAsync(int cityId, int hotelId, int roomId);
	Task<IReadOnlyList<Room>> GetManyAsync(int cityId, int hotelId);
	Task CreateAsync(Room room);
	Task UpdateAsync(Room room);
	Task DeleteAsync(Room room);
}

public class RoomsRepository : IRoomsRepository
{
	private readonly BookhotelDbContext _bookhotelDbContext;

	public RoomsRepository(BookhotelDbContext bookhotelDbContext)
	{
		_bookhotelDbContext = bookhotelDbContext;
	}

	public async Task<Room?> GetAsync(int cityId, int hotelId, int roomId)
	{
		return await _bookhotelDbContext.Room.FirstOrDefaultAsync(o => o.CityId == cityId && o.HotelId == hotelId && o.Id == roomId);
	}

	public async Task<IReadOnlyList<Room>> GetManyAsync(int cityId, int hotelId)
	{
		return await _bookhotelDbContext.Room.Where(o => o.CityId == cityId && o.HotelId == hotelId ).ToListAsync();
	}

	public async Task CreateAsync(Room room)
	{
		_bookhotelDbContext.Room.Add(room);
		await _bookhotelDbContext.SaveChangesAsync();
	}

	public async Task UpdateAsync(Room room)
	{
		_bookhotelDbContext.Room.Update(room);
		await _bookhotelDbContext.SaveChangesAsync();
	}

	public async Task DeleteAsync(Room room)
	{
		_bookhotelDbContext.Room.Remove(room);
		await _bookhotelDbContext.SaveChangesAsync();
	}
}
