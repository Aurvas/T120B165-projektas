using BookHotel.Data.Repositories;
using BookHotel.Data.Dtos.Cities;
using BookHotel.Data.Entities;
using BookHotel.Data;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;
using System.Data;
using BookHotel.Auth.Model;
using System.Security.Claims;
using Microsoft.IdentityModel.JsonWebTokens;


namespace BookHotel.Controllers;
[ApiController]
[Route("api/cities")]
public class CitiesController : ControllerBase
{
	private readonly ICitiesRepository _citiesRepository;
	private readonly IRoomsRepository _roomsRepository;
	private readonly IHotelsRepository _hotelsRepository;
	private readonly IAuthorizationService _authorizationService;
	public CitiesController(ICitiesRepository citiesRepository, IHotelsRepository hotelsRepository, IRoomsRepository roomsRepository, IAuthorizationService authorizationService)
	{
		_citiesRepository = citiesRepository;
		_roomsRepository = roomsRepository;
		_hotelsRepository = hotelsRepository;
		_authorizationService = authorizationService;

	}

	[HttpGet(Name = "GetCities")]
	public async Task<IEnumerable<CityDto>> GetManyAsync()
	{
		return (await _citiesRepository.GetManyAsync()).Select(o => new CityDto(o.Id, o.CityName, o.County, o.ImageUrl));
	}

	[HttpGet("{cityId}", Name = "GetCity")]
	public async Task<IActionResult> Get(int cityId)
	{
		var city = await _citiesRepository.GetAsync(cityId);

		if (city == null)
			return NotFound();

		//var links = CreateLinksForCity(cityId);

		var cityDto = new CityDto(city.Id, city.CityName, city.County, city.ImageUrl);
		return Ok(new { Resource =cityDto });
	}

	[HttpPost]
	[Authorize(Roles = BookHotelRoles.BookHotelUser)]
	public async Task<ActionResult<CityDto>> Create(CreateCityDto createCityDto)
	{
		var city = new City
		{ CityName = createCityDto.CityName, County = createCityDto.County, UserId = User.FindFirstValue(JwtRegisteredClaimNames.Sub), ImageUrl = createCityDto.ImageUrl ?? " " };

		await _citiesRepository.CreateAsync(city);

		return Created("", new CityDto(city.Id, city.CityName, city.County, city.ImageUrl));

	}

	[HttpPut]
	[Route("{cityId}")]
	[Authorize(Roles = BookHotelRoles.BookHotelUser)]
	public async Task<ActionResult<CityDto>> Update(int cityId, UpdateCityDto updateCityDto)
	{
		var city = await _citiesRepository.GetAsync(cityId);

		if (city == null)
			return NotFound();
		var authorizationResult = await _authorizationService.AuthorizeAsync(User, city, PolicyNames.ResourceOwner);
		Console.WriteLine(city.CityName);
		if (!authorizationResult.Succeeded)
		{
			return Forbid();
		}
		city.CityName = updateCityDto.CityName ?? city.CityName;
		city.County = updateCityDto.County ?? city.County;
		city.ImageUrl = updateCityDto.ImageUrl ?? city.ImageUrl;
		await _citiesRepository.UpdateAsync(city);

		return Ok(new CityDto(city.Id, city.CityName, city.County, city.ImageUrl));
	}

	[HttpDelete("{cityId}", Name = "DeleteCity")]
	public async Task<ActionResult> Remove(int cityId)
	{
		var city = await _citiesRepository.GetAsync(cityId);
		/*var hotel = await _hotelsRepository.GetManyAsync(cityId);
		var room = await _hotelsRepository.GetManyAsync(cityId);*/
		if (city == null)
			return NotFound();

		await _citiesRepository.DeleteAsync(city);

		/*if(hotel!= null)
		{
			foreach (var h in hotel)
			{
				_hotelsRepository.DeleteAsync(h);
			}
		}
		if (room != null)
		{
			foreach (var r in room)
			{
				_hotelsRepository.DeleteAsync(r);
			}
		}*/




		return NoContent();
	}


}
