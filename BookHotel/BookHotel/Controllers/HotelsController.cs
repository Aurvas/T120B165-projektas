using BookHotel.Data.Repositories;
using BookHotel.Data.Dtos.Hotels;
using BookHotel.Data.Entities;
using BookHotel.Data;
using Microsoft.AspNetCore.Mvc;
using System.Text.Json;
using System.Data;
using Microsoft.AspNetCore.Authorization;
using BookHotel.Auth.Model;
using System.Security.Claims;
using Microsoft.IdentityModel.JsonWebTokens;


namespace BookHotel.Controllers;
[ApiController]
[Route("api/cities/{cityId}/hotels")]
public class HotelsController : ControllerBase
{
	private readonly IHotelsRepository _hotelsRepository;
	private readonly ICitiesRepository _citiesRepository;
	private readonly IAuthorizationService _authorizationService;
	private readonly IAuthorizationHandler _authorizationHandler;
	public HotelsController(ICitiesRepository citiesRepository, IHotelsRepository hotelsRepository, IAuthorizationService authorizationService)
	{
		_hotelsRepository = hotelsRepository;
		_citiesRepository = citiesRepository;
		_authorizationService = authorizationService;
	}

	[HttpGet(Name = "GetHotels")]
	public async Task<IEnumerable<HotelDto>> GetManyAsync(int cityId)
	{
		return (await _hotelsRepository.GetManyAsync(cityId)).Select(o => new HotelDto(o.Id, o.Name, o.Address, o.Email, o.StarCount, o.CityId));
	}

	[HttpGet("{hotelId}", Name = "GetHotel")]
	public async Task<IActionResult> Get(int cityId, int hotelId)
	{
		var hotel = await _hotelsRepository.GetAsync(cityId, hotelId);

		if (hotel == null)
			return NotFound();

		//var links = CreateLinksForHotel(cityId, hotelId);

		var hotelDto = new HotelDto(hotel.Id, hotel.Name, hotel.Address, hotel.Email, hotel.StarCount, hotel.CityId);
		return Ok(new { Resource = hotelDto });
	}

	[HttpPost]
	[Authorize(Roles = BookHotelRoles.BookHotelUser)]
	public async Task<ActionResult<HotelDto>> Create(int cityId, CreateHotelDto createHotelDto)
	{
		var city = await _citiesRepository.GetAsync(cityId);
		if(city == null) return NotFound($"Couldn't find a city with id of {cityId}");

		var hotel = new Hotel
		{ Name = createHotelDto.Name, Address = createHotelDto.Address, Email=createHotelDto.Email ?? " ", StarCount=createHotelDto.StarCount, CityId=cityId, UserId = User.FindFirstValue(JwtRegisteredClaimNames.Sub) };

		await _hotelsRepository.CreateAsync(hotel);

		return Created("", new HotelDto(hotel.Id, hotel.Name, hotel.Address, hotel.Email, hotel.StarCount, hotel.CityId));
	}

	[HttpPut]
	[Route("{hotelId}")]
	[Authorize(Roles = BookHotelRoles.BookHotelUser)]
	public async Task<ActionResult<HotelDto>> Update(int cityId, int hotelId, UpdateHotelDto updateHotelDto)
	{
		var hotel = await _hotelsRepository.GetAsync(cityId, hotelId);
		
		if (hotel == null) return NotFound($"Couldn't find a hotel with id of {hotelId}");
		var authorizationResult = await _authorizationService.AuthorizeAsync(User, hotel, PolicyNames.ResourceOwner);
		
		Console.WriteLine(authorizationResult.Succeeded);
		
		
		if (!authorizationResult.Succeeded)
		{
			
			return Forbid();
		}
		if (updateHotelDto.Email!=null)
			hotel.Email = updateHotelDto.Email;
		if(updateHotelDto.StarCount != 0)
			hotel.StarCount = updateHotelDto.StarCount;

		await _hotelsRepository.UpdateAsync(hotel);

		return Ok(new HotelDto(hotel.Id, hotel.Name, hotel.Address, hotel.Email,hotel.StarCount, hotel.CityId));
	}

	[HttpDelete("{hotelId}", Name = "DeleteHotel")]
	public async Task<ActionResult> Remove(int cityId, int hotelId)
	{
		var hotel = await _hotelsRepository.GetAsync(cityId, hotelId);

		if (hotel == null)
			return NotFound();

		await _hotelsRepository.DeleteAsync(hotel);

		return NoContent();
	}


	/*private IEnumerable<LinkDto> CreateLinksForHotel(int cityId, int hotelId)
	{
		yield return new LinkDto { Href = Url.Link("GetHotel", new { cityId, hotelId }), Rel = "self", Method = "GET" };
		yield return new LinkDto { Href = Url.Link("DeleteHotel", new { cityId, hotelId }), Rel = "delete_city", Method = "DELETE" };
	}*/
}
