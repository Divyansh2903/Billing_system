
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';

import Bill from './pages/Bill';
import Dashboard from './pages/Dashboard';


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Bill />} />
        <Route path='/dashboard' element={<Dashboard />} />
      </Routes>
    </BrowserRouter>
  )

}
export default App;