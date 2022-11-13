using BookHotel.Data.Repositories;
using BookHotel.Data.Dtos.Rooms;
using BookHotel.Data.Entities;
using BookHotel.Data;
using Microsoft.AspNetCore.Mvc;
using System.Text.Json;
using Microsoft.AspNetCore.Authorization;
using System.Data;
using BookHotel.Auth.Model;
using System.Security.Claims;
using Microsoft.IdentityModel.JsonWebTokens;



namespace BookHotel.Controllers;
[ApiController]
[Route("api/cities/{cityId}/hotels/{hotelId}/rooms")]
public class RoomsController : ControllerBase
{
	private readonly IHotelsRepository _hotelsRepository;
	private readonly ICitiesRepository _citiesRepository;
	private readonly IRoomsRepository _roomsRepository;
	private readonly IAuthorizationService _authorizationService;

	public RoomsController(ICitiesRepository citiesRepository, IHotelsRepository hotelsRepository, IRoomsRepository roomsRepository, IAuthorizationService authorizationService)
	{
		_roomsRepository = roomsRepository;
		_hotelsRepository = hotelsRepository;
		_citiesRepository = citiesRepository;
		_authorizationService = authorizationService;
	}

	[HttpGet(Name = "GetRooms")]
	public async Task<IEnumerable<RoomDto>> GetManyAsync(int cityId, int hotelId)
	{
		return (await _roomsRepository.GetManyAsync(cityId, hotelId)).Select(o => new RoomDto(o.Id, o.Floor, o.Number, o.Description, o.HotelId, o.CityId));
	}

	[HttpGet("{roomId}", Name = "GetRoom")]
	public async Task<IActionResult> Get(int cityId, int hotelId, int roomId)
	{
		var room = await _roomsRepository.GetAsync(cityId, hotelId, roomId);

		if (room == null)
			return NotFound();

		var links = CreateLinksForRoom(cityId, hotelId, roomId);

		var roomDto = new RoomDto(room.Id, room.Floor, room.Number, room.Description, room.HotelId, room.CityId);
		return Ok(new { Resource = roomDto, Links = links });
	}

	[HttpPost]
	[Authorize(Roles = BookHotelRoles.BookHotelUser)]
	public async Task<ActionResult<RoomDto>> Create(int cityId, int hotelId, CreateRoomDto createRoomDto)
	{

		var hotel = await _hotelsRepository.GetAsync(cityId, hotelId);
		if (hotel == null) return NotFound($"Couldn't find a hotel with id of {hotelId}");

		var room = new Room
		{ Floor = createRoomDto.Floor, Number = createRoomDto.Number, Description = createRoomDto.Description, HotelId=hotelId, CityId = cityId, UserId = User.FindFirstValue(JwtRegisteredClaimNames.Sub) };

		await _roomsRepository.CreateAsync(room);

		return Created("", new RoomDto(room.Id, room.Floor, room.Number, room.Description, room.HotelId, room.CityId));
	}

	[HttpPut]
	[Route("{roomId}")]
	[Authorize(Roles = BookHotelRoles.BookHotelUser)]
	public async Task<ActionResult<RoomDto>> Update(int cityId, int hotelId, int roomId, UpdateRoomDto updateRoomDto)
	{
		var room = await _roomsRepository.GetAsync(cityId, hotelId, roomId);
		if (room == null) return NotFound($"Couldn't find a room with id of {roomId}");
		var authorizationResult = await _authorizationService.AuthorizeAsync(User, room, PolicyNames.ResourceOwner);
		if (!authorizationResult.Succeeded)
		{
			return Forbid();
		}
		room.Description = updateRoomDto.Description;
		await _roomsRepository.UpdateAsync(room);

		return Ok(new RoomDto(room.Id, room.Floor, room.Number, room.Description, room.HotelId, room.CityId));
	}


	[HttpDelete("{roomId}", Name = "DeleteRoom")]
	public async Task<ActionResult> Remove(int cityId, int hotelId, int roomId)
	{
		var room = await _roomsRepository.GetAsync(cityId, hotelId, roomId);

		if (room == null)
			return NotFound();

		await _roomsRepository.DeleteAsync(room);


		return NoContent();
	}

	private IEnumerable<LinkDto> CreateLinksForRoom(int cityId, int hotelId, int roomId)
	{
		yield return new LinkDto { Href = Url.Link("GetHotel", new { cityId, hotelId, roomId }), Rel = "self", Method = "GET" };
		yield return new LinkDto { Href = Url.Link("DeleteHotel", new { cityId, hotelId, roomId}), Rel = "delete_city", Method = "DELETE" };
	}
}
