using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using ZwajApp.API.Data;

namespace ZwajApp.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    public class ValueController : ControllerBase
    {
        private readonly DataContext _context;

        public ValueController(DataContext context)
        {
            _context = context;

        }

        // Get api/value
        [HttpGet]
        public async Task<IActionResult> GetValues()
        {
            var values=await _context.Values.ToListAsync();
            return Ok(values);
        }

        // Get api/value/5
        [HttpGet("{id}")]
        [AllowAnonymous]
         public async Task<IActionResult> GetValue(int id)
        {
            var item = await _context.Values.FirstOrDefaultAsync(x=>x.ID==id);
            return Ok(item);
            
        }
    }
}