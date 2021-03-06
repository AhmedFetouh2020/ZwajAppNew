using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.OpenApi.Models;
using ZwajApp.API.Data;
using Microsoft.AspNetCore.Authentication.JwtBearer ;
using Microsoft.IdentityModel.Tokens;
using System.Text;
using System.Net;
using Microsoft.AspNetCore.Diagnostics;
using Microsoft.AspNetCore.Http;
using ZwajApp.API.Helper;

namespace ZwajApp.API
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {

            services.AddDbContext<DataContext>(x=>x.UseSqlite(Configuration.GetConnectionString("DefaultConnection")));
            services.AddMvc().SetCompatibilityVersion(Microsoft.AspNetCore.Mvc.CompatibilityVersion.Version_3_0);
            services.AddCors();
            services.AddScoped<IAuthRepository,AuthRepository>();
            //Authentication MiddleWare
            services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
            .AddJwtBearer(Options=>{
                Options.TokenValidationParameters=new TokenValidationParameters{
                    ValidateIssuerSigningKey=true,
                    IssuerSigningKey=new SymmetricSecurityKey(Encoding.ASCII.GetBytes(Configuration.GetSection("AppSettings:Token").Value)),
                    ValidateIssuer=false,
                    ValidateAudience=false
                };
            });
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
                
            }
            // else{
            //     app.UseExceptionHandler(BuilderException=>
            //     BuilderException.Run(async context=>
            //     {
            //         context.Response.StatusCode=(int)HttpStatusCode.InternalServerError;
            //         var error =context.Features.Get<IExceptionHandlerFeature>();
            //         if(error!=null)
            //         {
            //                 context.Response.AddApplicationError(error.Error.Message);
            //                 await context.Response.WriteAsync(error.Error.Message);
            //         }
            //     }));
            // }

            app.UseCors(s=>s.AllowAnyOrigin().AllowAnyMethod().AllowAnyHeader());
            
            app.UseRouting();
            app.UseAuthorization();

            

              app.UseEndpoints(endpoints =>
              {
                  endpoints.MapControllers();
            });
        }
    }
}
