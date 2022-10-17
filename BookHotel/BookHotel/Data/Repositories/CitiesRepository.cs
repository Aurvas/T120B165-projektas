using BookHotel.Data.Dtos.Cities;
using BookHotel.Data.Entities;

using Microsoft.EntityFrameworkCore;

namespace BookHotel.Data.Repositories;

public interface ICitiesRepository
{
	Task<City?> GetAsync(int cityId);
	Task<IReadOnlyList<City>> GetManyAsync();
	Task CreateAsync(City city);
	Task UpdateAsync(City city);
	Task DeleteAsync(City city);
}

public class CitiesRepository : ICitiesRepository
{
	private readonly BookhotelDbContext _bookhotelDbContext;

    public CitiesRepository(BookhotelDbContext bookhotelDbContext)
    {
        _bookhotelDbContext = bookhotelDbContext;
    }
    
    public async Task<City?> GetAsync(int cityId)
    {
        return await _bookhotelDbContext.City.FirstOrDefaultAsync(o => o.Id == cityId);
    }
    
    public async Task<IReadOnlyList<City>> GetManyAsync()
    {
        return await _bookhotelDbContext.City.ToListAsync();
    }
    
    public async Task CreateAsync(City city)
    {
        _bookhotelDbContext.City.Add(city);
        await _bookhotelDbContext.SaveChangesAsync();
    }
    
    public async Task UpdateAsync(City city)
    {
        _bookhotelDbContext.City.Update(city);
        await _bookhotelDbContext.SaveChangesAsync();
    }
    
    public async Task DeleteAsync(City city)
    {
        _bookhotelDbContext.City.Remove(city);
        await _bookhotelDbContext.SaveChangesAsync();
    }
}
