
import React from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import { Navbar } from './components/Navbar';
import { HomePage } from './pages/HomePage';
import { GeneratorPage } from './pages/GeneratorPage';
import { CreditProvider } from './contexts/CreditContext';

const App: React.FC = () => {
  return (
    <CreditProvider>
      <Router>
        <div className="min-h-screen bg-slate-50 font-sans">
          <Navbar />
          <main>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/generate" element={<GeneratorPage />} />
            </Routes>
          </main>
          
          <footer className="bg-white border-t border-slate-200 py-12 mt-12">
            <div className="max-w-7xl mx-auto px-4 text-center text-slate-500 text-sm">
              <p>© {new Date().getFullYear()} ProHeadshot AI. Powered by Gemini.</p>
            </div>
          </footer>
        </div>
      </Router>
    </CreditProvider>
  );
};

export default App;
