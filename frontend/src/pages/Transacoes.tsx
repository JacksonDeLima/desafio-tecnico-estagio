import { useEffect, useState, FormEvent } from 'react';
import api from '../api/axios';
import { Layout } from '../components/Layout';
import { PlusCircle } from 'lucide-react';

interface Pessoa {
  id: number;
  nome: string;
  idade: number;
}

interface Transacao {
  id: number;
  descricao: string;
  valor: number;
  tipo: string;
  pessoaId: number;
  pessoa?: Pessoa;
}

export function Transacoes() {
  const [transacoes, setTransacoes] = useState<Transacao[]>([]);
  const [pessoas, setPessoas] = useState<Pessoa[]>([]);
  
  // Estados do formulário
  const [descricao, setDescricao] = useState('');
  const [valor, setValor] = useState('');
  const [tipo, setTipo] = useState('Despesa');
  const [pessoaId, setPessoaId] = useState('');
  const [erro, setErro] = useState('');

  useEffect(() => {
    carregarDados();
  }, []);

  const carregarDados = async () => {
    try {
      const [resTransacoes, resPessoas] = await Promise.all([
        api.get('/Transacoes'),
        api.get('/Pessoas')
      ]);
      setTransacoes(resTransacoes.data);
      setPessoas(resPessoas.data);
    } catch (error) {
      console.error('Erro ao buscar dados', error);
    }
  };

  const cadastrarTransacao = async (e: FormEvent) => {
    e.preventDefault();
    setErro('');

    if (!descricao || !valor || !pessoaId) {
      setErro('Preencha todos os campos obrigatórios.');
      return;
    }

    try {
      await api.post('/Transacoes', {
        descricao,
        valor: parseFloat(valor),
        tipo,
        pessoaId: parseInt(pessoaId)
      });
      
      // Limpa formulário
      setDescricao('');
      setValor('');
      carregarDados(); // atualiza a lista
    } catch (error: any) {
      // Se for menor de 18 tentando registrar receita, a API retorna erro 400
      setErro(error.response?.data || 'Erro ao cadastrar transação.');
    }
  };

  const formatarMoeda = (valor: number) => {
    return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(valor);
  };

  return (
    <Layout>
      <div className="flex justify-between items-center" style={{ marginBottom: '1.5rem' }}>
        <h1>Gerenciar Transações</h1>
      </div>

      <div className="card" style={{ marginBottom: '2rem' }}>
        <h2 style={{ fontSize: '1.25rem', marginBottom: '1rem' }}>Cadastrar Nova Transação</h2>
        
        {erro && <div style={{ color: 'var(--danger)', marginBottom: '1rem', fontWeight: 500 }}>{erro}</div>}
        
        <form onSubmit={cadastrarTransacao} style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '1rem', alignItems: 'end' }}>
          
          <div className="form-group" style={{ marginBottom: 0 }}>
            <label>Pessoa</label>
            <select value={pessoaId} onChange={e => setPessoaId(e.target.value)}>
              <option value="">Selecione...</option>
              {pessoas.map(p => (
                <option key={p.id} value={p.id}>{p.nome}</option>
              ))}
            </select>
          </div>

          <div className="form-group" style={{ marginBottom: 0 }}>
            <label>Descrição</label>
            <input 
              type="text" 
              value={descricao} 
              onChange={e => setDescricao(e.target.value)} 
              placeholder="Ex: Conta de Luz"
            />
          </div>
          
          <div className="form-group" style={{ marginBottom: 0 }}>
            <label>Valor (R$)</label>
            <input 
              type="number" 
              step="0.01"
              value={valor} 
              onChange={e => setValor(e.target.value)} 
              placeholder="Ex: 150.50"
              min="0"
            />
          </div>

          <div className="form-group" style={{ marginBottom: 0 }}>
            <label>Tipo</label>
            <select value={tipo} onChange={e => setTipo(e.target.value)}>
              <option value="Despesa">Despesa</option>
              <option value="Receita">Receita</option>
            </select>
          </div>
          
          <div style={{ gridColumn: '1 / -1', display: 'flex', justifyContent: 'flex-end', marginTop: '0.5rem' }}>
            <button type="submit" className="btn btn-primary">
              <PlusCircle size={18} />
              Registrar Transação
            </button>
          </div>
        </form>
      </div>

      <div className="card">
        <h2 style={{ fontSize: '1.25rem', marginBottom: '1rem' }}>Histórico de Transações</h2>
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Pessoa</th>
              <th>Descrição</th>
              <th>Tipo</th>
              <th style={{ textAlign: 'right' }}>Valor</th>
            </tr>
          </thead>
          <tbody>
            {transacoes.length === 0 ? (
              <tr>
                <td colSpan={5} style={{ textAlign: 'center', color: 'var(--text-light)' }}>Nenhuma transação registrada.</td>
              </tr>
            ) : (
              transacoes.map(t => (
                <tr key={t.id}>
                  <td>#{t.id}</td>
                  <td style={{ fontWeight: 500 }}>{t.pessoa?.nome}</td>
                  <td>{t.descricao}</td>
                  <td>
                    <span style={{ 
                      padding: '0.25rem 0.75rem', 
                      borderRadius: '99px',
                      fontSize: '0.75rem',
                      fontWeight: 600,
                      backgroundColor: t.tipo === 'Receita' ? '#ECFDF5' : '#FEF2F2',
                      color: t.tipo === 'Receita' ? 'var(--secondary)' : 'var(--danger)'
                    }}>
                      {t.tipo}
                    </span>
                  </td>
                  <td style={{ textAlign: 'right', fontWeight: 600 }} className={t.tipo === 'Receita' ? 'text-green' : 'text-red'}>
                    {t.tipo === 'Despesa' ? '-' : '+'}{formatarMoeda(t.valor)}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </Layout>
  );
}
