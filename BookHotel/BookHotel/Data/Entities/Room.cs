﻿namespace BookHotel.Data.Entities
{
	public class Room
	{
		public int Id { get; set; }
		public int Floor { get; set; }
		public string Number { get; set; }
		public string Description { get; set; }
		public int HotelId { get; set; }
		public int CityId { get; set; }
		public Hotel Hotel { get; set; }
		public City City { get; set; }
	}
}
