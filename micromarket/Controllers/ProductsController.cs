﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using micromarket.Config;
using micromarket.Models;
using System.Configuration;

namespace micromarket.Controllers {
  [Route("api/[controller]")]
  [ApiController]
  public class ProductsController : ControllerBase {
    private readonly MySqlDbContext _context;

    public ProductsController(MySqlDbContext context) {
      _context = context;
      }

    // GET: api/Products
    [HttpGet]
    public async Task<ActionResult<IEnumerable<dynamic>>> GetProduct() {
      if (_context.Product == null)
        {
        return NotFound();
        }
      return await _context.Product
        .Include(p => p.categoria) 
        .Select(p =>  new { p.id, p.nombre, p.precio, p.descripción, p.categoriaId, p.imagenURL, categoria = new { p.categoria.nombre } })
        .ToListAsync();
      }

    // GET: api/Products/5
    [HttpGet("{id}")]
    public async Task<ActionResult<Product>> GetProduct(string id) {
      if (_context.Product == null)
        {
        return NotFound();
        }
      var product = await _context.Product.FindAsync(id);

      if (product == null)
        {
        return NotFound();
        }

      return product;
      }

    // PUT: api/Products/5
    // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
    [HttpPut("{id}")]
    public async Task<ActionResult<Product>> PutProduct(string id, Product product) {
      if (id != product.id)
        {
        return BadRequest();
        }

      // var category = 

      _context.Entry(product).State = EntityState.Modified;

      try
        {
        await _context.SaveChangesAsync();
        }
      catch (DbUpdateConcurrencyException)
        {
        if (!ProductExists(id))
          {
          return NotFound();
          }
        else
          {
          throw;
          }
        }

      return product;
      }

    // POST: api/Products
    // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
    [HttpPost]
    public async Task<ActionResult<Product>> PostProduct(Product product) {
      if (_context.Product == null)
        {
        return Problem("Entity set 'MySqlDbContext.Product'  is null.");
        }
      //Product lastProduct = _context.Product.OrderByDescending(p => p.codigo).First();
      //      if (lastProduct == null)
      //{
      //  return Conflict();
      //}
      // var lastSequence = lastProduct.codigo.Split("-").Last();
      // var codeNumber = Int32.Parse(lastSequence);
      // var code = lastSequence.Replace(codeNumber.ToString(), (codeNumber+1).ToString());
      // var category = _context.Category.Find(product.categoriaId).prefijo;

      // product.codigo = $"DNT-{category}-{code}";
      product.id = Guid.NewGuid().ToString();
      _context.Product.Add(product);
      try
        {
        await _context.SaveChangesAsync();
        }
      catch (DbUpdateException)
        {
        if (ProductExists(product.id))
          {
          return Conflict();
          }
        else
          {
          throw;
          }
        }

      return CreatedAtAction("GetProduct", new { id = product.id }, product);
      }

    // DELETE: api/Products/5
    [HttpDelete("{id}")]
    public async Task<ActionResult<Product>> DeleteProduct(string id) {
      if (_context.Product == null)
        {
        return NotFound();
        }
      var product = await _context.Product.FindAsync(id);
      if (product == null)
        {
        return NotFound();
        }

      _context.Product.Remove(product);
      await _context.SaveChangesAsync();

      return product;
      }

    private bool ProductExists(string id) {
      return (_context.Product?.Any(e => e.id == id)).GetValueOrDefault();
      }
    }
  }
