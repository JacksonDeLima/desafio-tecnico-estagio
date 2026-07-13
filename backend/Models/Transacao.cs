namespace backend.Models;

/// <summary>
/// Representa uma transação financeira atrelada a uma pessoa.
/// </summary>
public class Transacao
{
    /// <summary>
    /// Identificador único gerado automaticamente pelo banco.
    /// </summary>
    public int Id { get; set; }

    /// <summary>
    /// Descrição da natureza do gasto ou receita.
    /// </summary>
    public string Descricao { get; set; } = string.Empty;

    /// <summary>
    /// Valor monetário da transação.
    /// </summary>
    public decimal Valor { get; set; }
    
    /// <summary>
    /// Define a natureza da transação: 'Despesa' ou 'Receita'.
    /// </summary>
    public string Tipo { get; set; } = string.Empty;

    /// <summary>
    /// Chave estrangeira referenciando a Pessoa que realizou a transação.
    /// </summary>
    public int PessoaId { get; set; }

    /// <summary>
    /// Propriedade de navegação para o Entity Framework Core mapear o objeto Pessoa.
    /// </summary>
    public Pessoa? Pessoa { get; set; }
}
