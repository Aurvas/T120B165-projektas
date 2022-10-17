using BookHotel.Data.Repositories;
using BookHotel.Data.Dtos.Cities;
using BookHotel.Data.Entities;
using BookHotel.Data;
using Microsoft.AspNetCore.Mvc;

namespace BookHotel.Controllers;
[ApiController]
[Route("api/cities")]
public class CitiesController : ControllerBase
{
	private readonly ICitiesRepository _citiesRepository;
	public CitiesController(ICitiesRepository citiesRepository)
	{
		_citiesRepository = citiesRepository;
	}

	[HttpGet(Name = "GetCities")]
	public async Task<IEnumerable<CityDto>> GetManyAsync()
	{
		return (await _citiesRepository.GetManyAsync()).Select(o => new CityDto(o.Id, o.CityName, o.County));
	}

	[HttpGet("{cityId}", Name = "GetCity")]
	public async Task<IActionResult> Get(int cityId)
	{
		var city = await _citiesRepository.GetAsync(cityId);

		// 404
		if (city == null)
			return NotFound();

		var links = CreateLinksForCity(cityId);

		var cityDto = new CityDto(city.Id, city.CityName, city.County);
		return Ok(new { Resource =cityDto, Links = links });
	}

	[HttpPost]
	public async Task<ActionResult<CityDto>> Create(CreateCityDto createCityDto)
	{
		var city = new City
		{ CityName = createCityDto.CityName, County = createCityDto.County};

		await _citiesRepository.CreateAsync(city);

		return Created("", new CityDto(city.Id, city.CityName, city.County));

	}

	[HttpPut]
	[Route("{cityId}")]
	public async Task<ActionResult<CityDto>> Update(int cityId, UpdateCityDto updateCityDto)
	{
		var city = await _citiesRepository.GetAsync(cityId);

		if (city == null)
			return NotFound();
		city.CityName = updateCityDto.CityName;
		city.County = updateCityDto.County;
		await _citiesRepository.UpdateAsync(city);

		return Ok(new CityDto(city.Id, city.CityName, city.County));
	}

	[HttpDelete("{cityId}", Name = "DeleteCity")]
	public async Task<ActionResult> Remove(int cityId)
	{
		var city = await _citiesRepository.GetAsync(cityId);

		if (city == null)
			return NotFound();

		await _citiesRepository.DeleteAsync(city);

		return NoContent();
	}


	private IEnumerable<LinkDto> CreateLinksForCity(int cityId)
	{
		yield return new LinkDto { Href = Url.Link("GetCity", new { cityId }), Rel = "self", Method = "GET" };
		yield return new LinkDto { Href = Url.Link("DeleteCity", new { cityId }), Rel = "delete_city", Method = "DELETE" };
	}
}
