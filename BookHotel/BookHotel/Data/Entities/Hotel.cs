using BookHotel.Auth.Model;
using System.ComponentModel.DataAnnotations;

namespace BookHotel.Data.Entities
{
	public class Hotel : IUserOwnedResource
	{
		public int Id { get; set; }
		public string Name { get; set; }
		public string Address { get; set; }
		public string Email { get; set; }
		public int StarCount { get; set; }
		public int CityId { get; set; }
		public City City { get; set; }
		[Required]
		public string UserId { get; set; }
		public BookHotelRestUser User { get; set; }
	}
}


