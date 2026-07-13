using backend.Data;
using backend.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace backend.Controllers;

[ApiController]
[Route("api/[controller]")]
public class TransacoesController : ControllerBase
{
    private readonly AppDbContext _context;

    public TransacoesController(AppDbContext context)
    {
        _context = context;
    }

    /// <summary>
    /// Recupera todas as transações cadastradas, incluindo as informações da pessoa associada.
    /// </summary>
    /// <returns>Lista de Transacoes e suas respectivas Pessoas</returns>
    [HttpGet]
    public async Task<IActionResult> GetTransacoes()
    {
        var transacoes = await _context.Transacoes.Include(t => t.Pessoa).ToListAsync();
        return Ok(transacoes);
    }

    /// <summary>
    /// Cria uma nova transação financeira, aplicando a regra de validação para menores de idade.
    /// </summary>
    /// <param name="transacao">Objeto contendo os dados da transação</param>
    /// <returns>Status de sucesso ou falha na validação (BadRequest)</returns>
    [HttpPost]
    public async Task<IActionResult> CriarTransacao(Transacao transacao)
    {
        // Verifica se a pessoa existe no banco de dados
        var pessoa = await _context.Pessoas.FindAsync(transacao.PessoaId);
        
        if (pessoa == null)
        {
            return BadRequest("Pessoa não encontrada no sistema.");
        }

        // Regra de negócio: menores de 18 anos só podem cadastrar despesas
        if (pessoa.Idade < 18 && transacao.Tipo.ToLower() == "receita")
        {
            return BadRequest("Menores de idade não podem registrar receitas, apenas despesas.");
        }

        // Padronizando o tipo para evitar problemas de digitação
        transacao.Tipo = transacao.Tipo.ToLower() == "receita" ? "Receita" : "Despesa";

        _context.Transacoes.Add(transacao);
        await _context.SaveChangesAsync();

        return CreatedAtAction(nameof(GetTransacoes), new { id = transacao.Id }, transacao);
    }
}
