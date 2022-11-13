using Microsoft.AspNetCore.Identity;

namespace BookHotel.Auth.Model
{
	public class BookHotelRestUser : IdentityUser
	{
		[PersonalData]

		public string? AdditionalInfo { get; set; }
	}
}
