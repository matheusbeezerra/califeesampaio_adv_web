import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Site from './pages/Site';
import Admin from './pages/Admin';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/admin/*" element={<Admin />} />
        <Route path="*" element={<Site />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
