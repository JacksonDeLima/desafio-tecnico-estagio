import { ReactNode } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { LayoutDashboard, Users, Receipt } from 'lucide-react';

interface LayoutProps {
  children: ReactNode;
}

export function Layout({ children }: LayoutProps) {
  const location = useLocation();

  return (
    <div className="app-container">
      <aside className="sidebar">
        <h2>Controle de Gastos</h2>
        
        <nav style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
          <Link 
            to="/" 
            className={`nav-item ${location.pathname === '/' ? 'active' : ''}`}
          >
            <LayoutDashboard size={20} />
            Dashboard (Totais)
          </Link>
          
          <Link 
            to="/pessoas" 
            className={`nav-item ${location.pathname === '/pessoas' ? 'active' : ''}`}
          >
            <Users size={20} />
            Pessoas
          </Link>
          
          <Link 
            to="/transacoes" 
            className={`nav-item ${location.pathname === '/transacoes' ? 'active' : ''}`}
          >
            <Receipt size={20} />
            Transações
          </Link>
        </nav>
      </aside>

      <main className="main-content">
        {children}
      </main>
    </div>
  );
}
