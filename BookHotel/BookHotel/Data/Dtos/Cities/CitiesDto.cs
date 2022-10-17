namespace BookHotel.Data.Dtos.Cities;

public record CityDto(int Id, string CityName, string County);
public record CreateCityDto(string CityName, string County);
public record UpdateCityDto(string CityName, string County);
