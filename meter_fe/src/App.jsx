
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';

import Bill from './pages/Bill';
import Dashboard from './pages/Dashboard';
import SolanaPaymentPage from './pages/SolanaPayment'
import { SolanaProvider } from './providers/SolanaProvider';


function App() {
  return (
    <SolanaProvider>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Bill />} />
          <Route path='/dashboard' element={<Dashboard />} />
          <Route path='/solana-payment' element={<SolanaPaymentPage />} />
        </Routes>
      </BrowserRouter>
    </SolanaProvider>

  )

}
export default App;