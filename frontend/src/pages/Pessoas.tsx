import { useEffect, useState, FormEvent } from 'react';
import api from '../api/axios';
import { Layout } from '../components/Layout';
import { Trash2, UserPlus } from 'lucide-react';

interface Pessoa {
  id: number;
  nome: string;
  idade: number;
}

export function Pessoas() {
  const [pessoas, setPessoas] = useState<Pessoa[]>([]);
  const [nome, setNome] = useState('');
  const [idade, setIdade] = useState('');
  const [erro, setErro] = useState('');

  useEffect(() => {
    carregarPessoas();
  }, []);

  const carregarPessoas = async () => {
    try {
      const response = await api.get('/Pessoas');
      setPessoas(response.data);
    } catch (error) {
      console.error('Erro ao buscar pessoas', error);
    }
  };

  const cadastrarPessoa = async (e: FormEvent) => {
    e.preventDefault();
    setErro('');

    if (!nome || !idade) {
      setErro('Preencha todos os campos.');
      return;
    }

    try {
      await api.post('/Pessoas', { nome, idade: parseInt(idade) });
      setNome('');
      setIdade('');
      carregarPessoas(); // recarrega a lista
    } catch (error: any) {
      setErro(error.response?.data || 'Erro ao cadastrar pessoa.');
    }
  };

  const deletarPessoa = async (id: number) => {
    if (!window.confirm('Tem certeza? Isso apagará também todas as transações desta pessoa.')) return;
    
    try {
      await api.delete(`/Pessoas/${id}`);
      carregarPessoas();
    } catch (error) {
      console.error('Erro ao deletar', error);
      alert('Erro ao excluir pessoa.');
    }
  };

  return (
    <Layout>
      <div className="flex justify-between items-center" style={{ marginBottom: '1.5rem' }}>
        <h1>Gerenciar Pessoas</h1>
      </div>

      <div className="card" style={{ marginBottom: '2rem' }}>
        <h2 style={{ fontSize: '1.25rem', marginBottom: '1rem' }}>Cadastrar Nova Pessoa</h2>
        
        {erro && <div style={{ color: 'var(--danger)', marginBottom: '1rem', fontWeight: 500 }}>{erro}</div>}
        
        <form onSubmit={cadastrarPessoa} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr auto', gap: '1rem', alignItems: 'end' }}>
          <div className="form-group" style={{ marginBottom: 0 }}>
            <label>Nome Completo</label>
            <input 
              type="text" 
              value={nome} 
              onChange={e => setNome(e.target.value)} 
              placeholder="Ex: João Silva"
            />
          </div>
          
          <div className="form-group" style={{ marginBottom: 0 }}>
            <label>Idade</label>
            <input 
              type="number" 
              value={idade} 
              onChange={e => setIdade(e.target.value)} 
              placeholder="Ex: 25"
              min="0"
            />
          </div>
          
          <button type="submit" className="btn btn-primary" style={{ height: '46px' }}>
            <UserPlus size={18} />
            Cadastrar
          </button>
        </form>
      </div>

      <div className="card">
        <h2 style={{ fontSize: '1.25rem', marginBottom: '1rem' }}>Lista de Pessoas</h2>
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Nome</th>
              <th>Idade</th>
              <th style={{ width: '100px', textAlign: 'center' }}>Ações</th>
            </tr>
          </thead>
          <tbody>
            {pessoas.length === 0 ? (
              <tr>
                <td colSpan={4} style={{ textAlign: 'center', color: 'var(--text-light)' }}>Nenhuma pessoa cadastrada.</td>
              </tr>
            ) : (
              pessoas.map(pessoa => (
                <tr key={pessoa.id}>
                  <td>#{pessoa.id}</td>
                  <td style={{ fontWeight: 500 }}>{pessoa.nome}</td>
                  <td>{pessoa.idade} anos</td>
                  <td style={{ textAlign: 'center' }}>
                    <button 
                      onClick={() => deletarPessoa(pessoa.id)}
                      className="btn btn-danger"
                      style={{ padding: '0.5rem', borderRadius: '6px' }}
                      title="Excluir pessoa"
                    >
                      <Trash2 size={16} />
                    </button>
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
