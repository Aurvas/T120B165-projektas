using System.ComponentModel.DataAnnotations;
using System.Globalization;
using BookHotel.Auth.Model;

namespace BookHotel.Data.Entities
{
	public class City : IUserOwnedResource
	{
		public int Id { get; set; }
		public string CityName { get; set; }
		public string ImageUrl { get; set; }
		public string County { get; set; }
		[Required]
		public string UserId { get; set; }
		public BookHotelRestUser User { get; set; }

	}
}
