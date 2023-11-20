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
    public class DispositionsController : ControllerBase
    {
        private readonly MySqlDbContext _context;

        public DispositionsController(MySqlDbContext context)
        {
            _context = context;
        }

        // GET: api/Dispositions
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Disposition>>> GetDisposition()
        {
          if (_context.Disposition == null)
          {
              return NotFound();
          }
            return await _context.Disposition.Include(d => d.almacen).ToListAsync();
        }

        // GET: api/Dispositions/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Disposition>> GetDisposition(string id)
        {
          if (_context.Disposition == null)
          {
              return NotFound();
          }
            var disposition = await _context.Disposition.FindAsync(id);

            if (disposition == null)
            {
                return NotFound();
            }

            return disposition;
        }

        // PUT: api/Dispositions/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutDisposition(string id, Disposition disposition)
        {
            if (id != disposition.id)
            {
                return BadRequest();
            }

            _context.Entry(disposition).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!DispositionExists(id))
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

        // POST: api/Dispositions
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<Disposition>> PostDisposition(Disposition disposition)
        {
          if (_context.Disposition == null)
          {
              return Problem("Entity set 'MySqlDbContext.Disposition'  is null.");
          }
            _context.Disposition.Add(disposition);
            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateException)
            {
                if (DispositionExists(disposition.id))
                {
                    return Conflict();
                }
                else
                {
                    throw;
                }
            }

            return CreatedAtAction("GetDisposition", new { id = disposition.id }, disposition);
        }

        // DELETE: api/Dispositions/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteDisposition(string id)
        {
            if (_context.Disposition == null)
            {
                return NotFound();
            }
            var disposition = await _context.Disposition.FindAsync(id);
            if (disposition == null)
            {
                return NotFound();
            }

            _context.Disposition.Remove(disposition);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool DispositionExists(string id)
        {
            return (_context.Disposition?.Any(e => e.id == id)).GetValueOrDefault();
        }
    }
}
