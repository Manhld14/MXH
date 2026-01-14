using System.Net.NetworkInformation;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.FileProviders;

namespace Backend
{
    public class Program
    {
        public static void Main(string[] args)
        {
            var builder = WebApplication.CreateBuilder(args);

            // Add services to the container
            builder.Services.AddControllers();

            // Swagger/OpenAPI
            builder.Services.AddEndpointsApiExplorer();
            builder.Services.AddSwaggerGen();

            // Add DbContext
            builder.Services.AddDbContext<Data.TestAPIDbContext>(options =>
                options.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection"))
            );

            // Enable CORS for Vue frontend
            builder.Services.AddCors(options =>
            {
                options.AddDefaultPolicy(policy =>
                {
                    policy.WithOrigins("http://localhost:5174") // URL frontend Vue
                          .AllowAnyHeader()
                          .AllowAnyMethod();
                });
            });

            var app = builder.Build();

            // Configure the HTTP request pipeline
            if (app.Environment.IsDevelopment())
            {
                app.UseSwagger();
                app.UseSwaggerUI();
            }

            app.UseHttpsRedirection();

            // ✅ Bật CORS trước Authorization
            app.UseCors();
            app.UseStaticFiles();
  

            app.UseAuthorization();

            app.MapControllers();

            app.Run();
        }
    }
}
