using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using micromarket.Config;
using micromarket.Models;

namespace micromarket.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class BuysController : ControllerBase
    {
        private readonly MySqlDbContext _context;

        public BuysController(MySqlDbContext context)
        {
            _context = context;
        }

        // GET: api/Buys
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Buy>>> GetBuy()
        {
          if (_context.Buy == null)
          {
              return NotFound();
          }
            return await _context.Buy.Include(b => b.usuario).Include(b => b.proveedor).ToListAsync();
        }

        // GET: api/Buys/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Buy>> GetBuy(string id)
        {
          if (_context.Buy == null)
          {
              return NotFound();
          }
            var buy = await _context.Buy.FindAsync(id);

            if (buy == null)
            {
                return NotFound();
            }

            return buy;
        }

        // PUT: api/Buys/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutBuy(string id, Buy buy)
        {
            if (id != buy.id)
            {
                return BadRequest();
            }

            _context.Entry(buy).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!BuyExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // POST: api/Buys
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<Buy>> PostBuy(Buy buy)
        {
          if (_context.Buy == null)
          {
              return Problem("Entity set 'MySqlDbContext.Buy'  is null.");
          }
            _context.Buy.Add(buy);
            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateException)
            {
                if (BuyExists(buy.id))
                {
                    return Conflict();
                }
                else
                {
                    throw;
                }
            }

            return CreatedAtAction("GetBuy", new { id = buy.id }, buy);
        }

        // DELETE: api/Buys/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteBuy(string id)
        {
            if (_context.Buy == null)
            {
                return NotFound();
            }
            var buy = await _context.Buy.FindAsync(id);
            if (buy == null)
            {
                return NotFound();
            }

            _context.Buy.Remove(buy);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool BuyExists(string id)
        {
            return (_context.Buy?.Any(e => e.id == id)).GetValueOrDefault();
        }
    }
}
