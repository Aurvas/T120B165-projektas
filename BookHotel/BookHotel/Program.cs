using MySql.EntityFrameworkCore.Extensions;
using Microsoft.EntityFrameworkCore;
using BookHotel.Data;
using BookHotel.Data.Repositories;

var builder = WebApplication.CreateBuilder(args);


builder.Services.AddDbContext<BookhotelDbContext>();
builder.Services.AddTransient<ICitiesRepository, CitiesRepository>();
builder.Services.AddTransient<IHotelsRepository, HotelsRepository>();
builder.Services.AddTransient<IRoomsRepository, RoomsRepository>();
builder.Services.AddControllers();

builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();


if (app.Environment.IsDevelopment())
{
	app.UseSwagger();
	app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.Run();
