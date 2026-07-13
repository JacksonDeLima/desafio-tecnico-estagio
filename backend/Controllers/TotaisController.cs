using backend.Data;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace backend.Controllers;

[ApiController]
[Route("api/[controller]")]
public class TotaisController : ControllerBase
{
    private readonly AppDbContext _context;

    public TotaisController(AppDbContext context)
    {
        _context = context;
    }

    /// <summary>
    /// Calcula os totais de receitas, despesas e o saldo para cada pessoa, 
    /// além de fornecer a somatória geral (Total Receitas, Total Despesas e Saldo Líquido do sistema).
    /// </summary>
    /// <returns>Um objeto consolidado contendo os totais por pessoa e o total geral</returns>
    [HttpGet]
    public async Task<IActionResult> GetTotais()
    {
        var pessoas = await _context.Pessoas
            .Include(p => p.Transacoes)
            .ToListAsync();

        var listaTotais = new List<object>();

        decimal totalGeralReceitas = 0;
        decimal totalGeralDespesas = 0;

        foreach (var pessoa in pessoas)
        {
            // Calcula o total de receitas e despesas dessa pessoa
            var receitas = pessoa.Transacoes.Where(t => t.Tipo == "Receita").Sum(t => t.Valor);
            var despesas = pessoa.Transacoes.Where(t => t.Tipo == "Despesa").Sum(t => t.Valor);
            var saldo = receitas - despesas;

            // Somando para o total geral do sistema
            totalGeralReceitas += receitas;
            totalGeralDespesas += despesas;

            listaTotais.Add(new
            {
                PessoaId = pessoa.Id,
                Nome = pessoa.Nome,
                TotalReceitas = receitas,
                TotalDespesas = despesas,
                Saldo = saldo
            });
        }

        var saldoLiquidoGeral = totalGeralReceitas - totalGeralDespesas;

        // Junta tudo num objeto final para enviar pro front-end
        var resultado = new
        {
            TotaisPorPessoa = listaTotais,
            TotalGeral = new
            {
                TotalReceitas = totalGeralReceitas,
                TotalDespesas = totalGeralDespesas,
                SaldoLiquido = saldoLiquidoGeral
            }
        };

        return Ok(resultado);
    }
}
