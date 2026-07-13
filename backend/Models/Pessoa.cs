namespace backend.Models;

/// <summary>
/// Representa o cadastro de uma pessoa no sistema.
/// </summary>
public class Pessoa
{
    /// <summary>
    /// Identificador único gerado automaticamente pelo banco de dados.
    /// </summary>
    public int Id { get; set; }

    /// <summary>
    /// Nome completo da pessoa.
    /// </summary>
    public string Nome { get; set; } = string.Empty;

    /// <summary>
    /// Idade da pessoa. Utilizada para validação de regras de negócio (ex: menores de 18 anos).
    /// </summary>
    public int Idade { get; set; }

    /// <summary>
    /// Lista de transações associadas a esta pessoa (Relacionamento 1 para N).
    /// Ao deletar a pessoa, o EF Core deletará em cascata estas transações.
    /// </summary>
    public List<Transacao> Transacoes { get; set; } = new();
}
