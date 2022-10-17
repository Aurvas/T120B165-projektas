namespace BookHotel.Data.Dtos.Rooms;

public record RoomDto(int Id, int Floor, string Number, string Description, int HotelId, int CityId);
public record CreateRoomDto(int Floor, string Number, string Description, int HotelId, int CityId);
public record UpdateRoomDto(string Description);
