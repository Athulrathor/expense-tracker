import { BrowserRouter, Routes, Route } from 'react-router-dom';

//pages imports 
import HomePage from './pages/HomePage';
import LandingPage from './pages/landingPage';
import NoPage from './pages/noPage';
 

function App() {
  return (
    <>
      <div>
        <BrowserRouter>
          <Routes>
              <Route path="/" element={<LandingPage />} />
            <Route path="/home" index element={<HomePage />} />
              <Route path="*" element={<NoPage />} />
          </Routes>
        </BrowserRouter>
      </div>
    </>
  )
}

export default App
