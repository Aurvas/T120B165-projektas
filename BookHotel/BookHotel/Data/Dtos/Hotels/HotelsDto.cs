namespace BookHotel.Data.Dtos.Hotels;

public record HotelDto(int Id, string Name, string Address, string Email, int StarCount, int CityId);
public record CreateHotelDto(string Name, string Address, string? Email, int StarCount, int CityId);
public record UpdateHotelDto(string? Email, int StarCount);

