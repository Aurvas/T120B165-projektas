namespace BookHotel.Auth.Model
{
	public static class BookHotelRoles
	{
		public const string Admin = nameof(Admin);
		public const string BookHotelUser = nameof(BookHotelUser);

		public static readonly IReadOnlyCollection<string> All = new[] { Admin, BookHotelUser };
	}
}
