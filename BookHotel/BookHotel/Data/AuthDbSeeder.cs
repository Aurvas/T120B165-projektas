﻿using BookHotel.Auth.Model;
using Microsoft.AspNetCore.Identity;

namespace BookHotel.Data
{
	public class AuthDbSeeder
	{
		private readonly UserManager<BookHotelRestUser> _userManager;
		private readonly RoleManager<IdentityRole> _roleManager;

		public AuthDbSeeder(UserManager<BookHotelRestUser> userManager, RoleManager<IdentityRole> roleManager)
		{
			_userManager = userManager;
			_roleManager = roleManager;
		}

		public async Task SeedAsync()
		{
			await AddDefaultRoles();
			await AddAdminUser();
		}

		private async Task AddAdminUser()
		{
			var newAdminUser = new BookHotelRestUser()
			{
				UserName = "admin",
				Email = "admin@admin.com"
			};

			var existingAdminUser = await _userManager.FindByNameAsync(newAdminUser.UserName);
			if (existingAdminUser == null)
			{
				var createAdminUserResult = await _userManager.CreateAsync(newAdminUser, "VerySafePassword1!");
				if (createAdminUserResult.Succeeded)
				{
					await _userManager.AddToRolesAsync(newAdminUser, BookHotelRoles.All);
				}
			}
		}

		private async Task AddDefaultRoles()
		{
			foreach (var role in BookHotelRoles.All)
			{
				var roleExists = await _roleManager.RoleExistsAsync(role);
				if (!roleExists)
					await _roleManager.CreateAsync(new IdentityRole(role));
			}
		}
	}
}
