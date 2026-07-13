import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Dashboard } from './pages/Dashboard';
import { Pessoas } from './pages/Pessoas';
import { Transacoes } from './pages/Transacoes';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/pessoas" element={<Pessoas />} />
        <Route path="/transacoes" element={<Transacoes />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
