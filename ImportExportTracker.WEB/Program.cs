using Microsoft.EntityFrameworkCore;
using ImportExportTracker.DB.Entity;
using ImportExportTracker.SERVICES.Control.CommodityServices;


var AllowCors = "_allowCors";

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddControllersWithViews();

// DbContext configuration
builder.Services.AddDbContext<ImportExportDbContext>(options =>
options.UseSqlServer("name=ConnectionStrings:DefaultConnection"));


builder.Services.AddScoped<ICommodityServices, CommodityServices>();

builder.Services.AddCors(options =>
{
    options.AddPolicy(name: AllowCors,
                      policy =>
                      {
                          policy.AllowAnyOrigin()
                                .AllowAnyMethod()
                                .AllowAnyHeader();
                      });
});

var app = builder.Build();

// Configure the HTTP request pipeline.
if (!app.Environment.IsDevelopment())
{
    app.UseExceptionHandler("/Home/Error");
    // The default HSTS value is 30 days. You may want to change this for production scenarios, see https://aka.ms/aspnetcore-hsts.
    app.UseHsts();
}

app.UseHttpsRedirection();
app.UseStaticFiles();
app.UseCors(AllowCors);
app.UseRouting();

app.UseAuthorization();

app.MapControllerRoute(
    name: "default",
    pattern: "{controller=Home}/{action=Index}/{id?}");

app.Run();
