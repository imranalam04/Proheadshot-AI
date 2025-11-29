
import React from 'react';
import { Camera, Zap, CreditCard } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { useCredits } from '../contexts/CreditContext';

export const Navbar: React.FC = () => {
  const location = useLocation();
  const { credits, openProModal } = useCredits();

  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className="bg-white border-b border-slate-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center gap-2">
              <div className="bg-primary-600 p-1.5 rounded-lg text-white">
                <Camera size={24} />
              </div>
              <span className="font-bold text-xl tracking-tight text-slate-900">ProHeadshot<span className="text-primary-600">AI</span></span>
            </Link>
          </div>
          
          <div className="flex items-center gap-6">
            <div className="hidden md:flex space-x-6 items-center">
              <Link 
                to="/" 
                className={`text-sm font-medium transition-colors ${isActive('/') ? 'text-slate-900' : 'text-slate-500 hover:text-slate-900'}`}
              >
                Home
              </Link>
              <Link 
                to="/generate" 
                className={`text-sm font-medium transition-colors ${isActive('/generate') ? 'text-slate-900' : 'text-slate-500 hover:text-slate-900'}`}
              >
                Generator
              </Link>
            </div>
            
            <div className="h-6 w-px bg-slate-200 hidden md:block"></div>

            <div className="flex items-center gap-3">
              <div className={`hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold transition-colors
                ${credits > 0 ? 'bg-slate-100 text-slate-700' : 'bg-red-50 text-red-600 border border-red-100'}
              `}>
                <Zap size={14} className={credits > 0 ? "text-yellow-500 fill-yellow-500" : "text-red-500"} />
                {credits} Credits
              </div>
              <button 
                onClick={openProModal}
                className="flex items-center gap-2 bg-slate-900 hover:bg-slate-800 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors shadow-lg shadow-slate-900/10"
              >
                 <CreditCard size={16} />
                 <span className="hidden sm:inline">Upgrade Pro</span>
                 <span className="sm:hidden">Top Up</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};
