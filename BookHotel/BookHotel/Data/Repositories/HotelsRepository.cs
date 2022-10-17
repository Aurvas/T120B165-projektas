using BookHotel.Data.Dtos.Hotels;
using BookHotel.Data.Entities;
using Microsoft.EntityFrameworkCore;

namespace BookHotel.Data.Repositories;

public interface IHotelsRepository
{
	Task<Hotel?> GetAsync(int cityId, int hotelId);
	Task<IReadOnlyList<Hotel>> GetManyAsync(int cityId);
	Task CreateAsync(Hotel hotel);
	Task UpdateAsync(Hotel hotel);
	Task DeleteAsync(Hotel hotel);
}

public class HotelsRepository : IHotelsRepository
{
	private readonly BookhotelDbContext _bookhotelDbContext;

	public HotelsRepository(BookhotelDbContext bookhotelDbContext)
	{
		_bookhotelDbContext = bookhotelDbContext;
	}

	public async Task<Hotel?> GetAsync(int cityId, int hotelId)
	{
		return await _bookhotelDbContext.Hotel.FirstOrDefaultAsync(o => o.CityId == cityId && o.Id ==hotelId);
	}

	public async Task<IReadOnlyList<Hotel>> GetManyAsync(int cityId)
	{
		return await _bookhotelDbContext.Hotel.Where(o => o.CityId == cityId).ToListAsync();
	}

	public async Task CreateAsync(Hotel hotel)
	{
		_bookhotelDbContext.Hotel.Add(hotel);
		await _bookhotelDbContext.SaveChangesAsync();
	}

	public async Task UpdateAsync(Hotel hotel)
	{
		_bookhotelDbContext.Hotel.Update(hotel);
		await _bookhotelDbContext.SaveChangesAsync();
	}

	public async Task DeleteAsync(Hotel hotel)
	{
		_bookhotelDbContext.Hotel.Remove(hotel);
		await _bookhotelDbContext.SaveChangesAsync();
	}
}
