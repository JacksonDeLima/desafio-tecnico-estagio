using backend.Data;
using backend.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace backend.Controllers;

[ApiController]
[Route("api/[controller]")]
public class PessoasController : ControllerBase
{
    private readonly AppDbContext _context;

    public PessoasController(AppDbContext context)
    {
        _context = context;
    }

    /// <summary>
    /// Lista todas as pessoas cadastradas no sistema.
    /// </summary>
    /// <returns>Uma lista de objetos Pessoa</returns>
    [HttpGet]
    public async Task<IActionResult> GetPessoas()
    {
        var pessoas = await _context.Pessoas.ToListAsync();
        return Ok(pessoas);
    }

    /// <summary>
    /// Cria e armazena uma nova pessoa no banco de dados.
    /// </summary>
    /// <param name="pessoa">O modelo de pessoa passado pelo cliente</param>
    /// <returns>Retorna 201 Created caso sucesso, ou 400 BadRequest em caso de dados inválidos</returns>
    [HttpPost]
    public async Task<IActionResult> CriarPessoa(Pessoa pessoa)
    {
        if (pessoa.Idade < 0)
        {
            return BadRequest("A idade não pode ser negativa.");
        }

        _context.Pessoas.Add(pessoa);
        await _context.SaveChangesAsync();

        return CreatedAtAction(nameof(GetPessoas), new { id = pessoa.Id }, pessoa);
    }

    /// <summary>
    /// Exclui uma pessoa do sistema utilizando o seu ID.
    /// Importante: Devido à regra em cascata no DbContext, as transações associadas serão automaticamente deletadas.
    /// </summary>
    /// <param name="id">O Identificador da pessoa que será excluída</param>
    /// <returns>Mensagem de sucesso</returns>
    [HttpDelete("{id}")]
    public async Task<IActionResult> DeletarPessoa(int id)
    {
        var pessoa = await _context.Pessoas.FindAsync(id);
        
        if (pessoa == null)
        {
            return NotFound("Pessoa não encontrada.");
        }

        // Isso vai apagar a pessoa e também as transações dela,
        // graças à configuração de deleção em cascata que fizemos no AppDbContext.
        _context.Pessoas.Remove(pessoa);
        await _context.SaveChangesAsync();

        return Ok(new { mensagem = "Pessoa e suas transações apagadas com sucesso." });
    }
}
