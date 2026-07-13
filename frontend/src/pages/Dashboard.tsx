import { useEffect, useState } from 'react';
import api from '../api/axios';
import { Layout } from '../components/Layout';

interface TotaisPorPessoa {
  pessoaId: number;
  nome: string;
  totalReceitas: number;
  totalDespesas: number;
  saldo: number;
}

interface TotaisDashboard {
  totaisPorPessoa: TotaisPorPessoa[];
  totalGeral: {
    totalReceitas: number;
    totalDespesas: number;
    saldoLiquido: number;
  };
}

export function Dashboard() {
  const [dados, setDados] = useState<TotaisDashboard | null>(null);

  useEffect(() => {
    carregarTotais();
  }, []);

  const carregarTotais = async () => {
    try {
      const response = await api.get('/Totais');
      setDados(response.data);
    } catch (error) {
      console.error('Erro ao carregar totais', error);
    }
  };

  const formatarMoeda = (valor: number) => {
    return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(valor);
  };

  return (
    <Layout>
      <h1>Consulta de Totais (Dashboard)</h1>

      {dados && (
        <>
          <div className="dashboard-grid" style={{ marginBottom: '2rem' }}>
            <div className="card stat-card">
              <span className="title">Total Geral de Receitas</span>
              <span className="value text-green">{formatarMoeda(dados.totalGeral.totalReceitas)}</span>
            </div>
            
            <div className="card stat-card">
              <span className="title">Total Geral de Despesas</span>
              <span className="value text-red">{formatarMoeda(dados.totalGeral.totalDespesas)}</span>
            </div>
            
            <div className="card stat-card" style={{ backgroundColor: dados.totalGeral.saldoLiquido >= 0 ? '#ECFDF5' : '#FEF2F2' }}>
              <span className="title">Saldo Líquido Geral</span>
              <span className={`value ${dados.totalGeral.saldoLiquido >= 0 ? 'text-green' : 'text-red'}`}>
                {formatarMoeda(dados.totalGeral.saldoLiquido)}
              </span>
            </div>
          </div>

          <div className="card">
            <h2 style={{ marginBottom: '1rem', fontSize: '1.25rem' }}>Totais por Pessoa</h2>
            <table>
              <thead>
                <tr>
                  <th>Pessoa</th>
                  <th>Receitas</th>
                  <th>Despesas</th>
                  <th>Saldo</th>
                </tr>
              </thead>
              <tbody>
                {dados.totaisPorPessoa.length === 0 ? (
                  <tr>
                    <td colSpan={4} style={{ textAlign: 'center', color: 'var(--text-light)' }}>Nenhuma pessoa cadastrada.</td>
                  </tr>
                ) : (
                  dados.totaisPorPessoa.map((pessoa) => (
                    <tr key={pessoa.pessoaId}>
                      <td style={{ fontWeight: 500 }}>{pessoa.nome}</td>
                      <td className="text-green">{formatarMoeda(pessoa.totalReceitas)}</td>
                      <td className="text-red">{formatarMoeda(pessoa.totalDespesas)}</td>
                      <td className={pessoa.saldo >= 0 ? 'text-green' : 'text-red'}>
                        {formatarMoeda(pessoa.saldo)}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </>
      )}
    </Layout>
  );
}
