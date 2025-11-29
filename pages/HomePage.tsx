
import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Check, Users, Briefcase, Clock } from 'lucide-react';
import { useCredits } from '../contexts/CreditContext';

export const HomePage: React.FC = () => {
  const { openProModal } = useCredits();

  return (
    <div className="bg-white">
      {/* Hero Section */}
      <div className="relative overflow-hidden bg-slate-900 text-white">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1557804506-669a67965ba0?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80')] bg-cover bg-center opacity-10"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 lg:py-32 relative z-10">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 bg-primary-500/20 border border-primary-500/30 rounded-full px-4 py-1.5 text-primary-300 font-medium text-sm mb-6">
              <span className="flex h-2 w-2 rounded-full bg-primary-400"></span>
              #1 AI Headshot Generator for Teams
            </div>
            <h1 className="text-5xl md:text-6xl font-extrabold tracking-tight leading-tight mb-6">
              Corporate Headshots,<br/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-400 to-indigo-400">Consistent & On-Brand.</span>
            </h1>
            <p className="text-xl text-slate-300 mb-10 leading-relaxed max-w-2xl">
              Create studio-quality profiles for yourself or your entire team in minutes. 
              Upload a selfie, choose your brand style, and get professional results instantly.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link 
                to="/generate" 
                className="inline-flex items-center justify-center px-8 py-4 border border-transparent text-lg font-bold rounded-xl text-slate-900 bg-primary-500 hover:bg-primary-400 transition-all transform hover:-translate-y-1 shadow-lg shadow-primary-500/25"
              >
                Start Generating
                <ArrowRight className="ml-2" size={20} />
              </Link>
              <button 
                onClick={openProModal}
                className="inline-flex items-center justify-center px-8 py-4 border border-slate-600 text-lg font-bold rounded-xl text-white hover:bg-slate-800 transition-all"
              >
                View Team Plans
              </button>
            </div>
            
            <div className="mt-12 flex items-center gap-6 text-sm text-slate-400">
              <div className="flex -space-x-3">
                <img className="w-10 h-10 rounded-full border-2 border-slate-900 object-cover" src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=100&q=80" alt="User" />
                <img className="w-10 h-10 rounded-full border-2 border-slate-900 object-cover" src="https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=100&q=80" alt="User" />
                <img className="w-10 h-10 rounded-full border-2 border-slate-900 object-cover" src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=100&q=80" alt="User" />
                <div className="w-10 h-10 rounded-full border-2 border-slate-900 bg-slate-800 flex items-center justify-center text-xs font-bold text-white">+2k</div>
              </div>
              <p>Trusted by 2,000+ founders & HR teams</p>
            </div>
          </div>
        </div>
      </div>

      {/* Value Prop Section */}
      <div className="py-24 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl font-bold text-slate-900 mb-4">Why Teams Switch to AI</h2>
            <p className="text-lg text-slate-600">Scaling a team is hard. Getting consistent headshots shouldn't be.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-200 hover:shadow-md transition-shadow">
              <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center text-blue-600 mb-6">
                <Users size={24} />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">Team Consistency</h3>
              <p className="text-slate-600">Ensure every employee has the same lighting, background, and style, regardless of where they work.</p>
            </div>
            <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-200 hover:shadow-md transition-shadow">
              <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center text-green-600 mb-6">
                <Briefcase size={24} />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">Brand Alignment</h3>
              <p className="text-slate-600">Inject your brand colors directly into the background of every headshot for a unified look.</p>
            </div>
            <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-200 hover:shadow-md transition-shadow">
              <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center text-purple-600 mb-6">
                <Clock size={24} />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">Instant Onboarding</h3>
              <p className="text-slate-600">New hire? No need to book a photographer. They upload a selfie, you get a pro photo in minutes.</p>
            </div>
          </div>
        </div>
      </div>

      {/* Pricing / CTA Section */}
      <div className="py-24 bg-white border-t border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-primary-900 rounded-3xl overflow-hidden shadow-2xl relative">
            <div className="absolute top-0 right-0 -mt-10 -mr-10 w-64 h-64 bg-primary-700 rounded-full opacity-50 blur-3xl"></div>
            <div className="absolute bottom-0 left-0 -mb-10 -ml-10 w-64 h-64 bg-indigo-700 rounded-full opacity-50 blur-3xl"></div>
            
            <div className="relative z-10 px-8 py-16 md:py-20 md:px-16 text-center md:text-left flex flex-col md:flex-row items-center justify-between gap-12">
              <div className="max-w-xl">
                <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">Ready to upgrade your professional image?</h2>
                <div className="space-y-4">
                  {[
                    "5 Free credits to start",
                    "Brand color injection",
                    "Advanced retouching suite",
                    "Commercial usage rights"
                  ].map((item, i) => (
                    <div key={i} className="flex items-center gap-3">
                      <div className="flex-shrink-0 w-6 h-6 rounded-full bg-primary-700 text-primary-200 flex items-center justify-center">
                        <Check size={14} />
                      </div>
                      <span className="text-primary-100 font-medium">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="bg-white p-8 rounded-2xl shadow-xl max-w-sm w-full">
                <div className="text-center mb-6">
                  <p className="text-slate-500 text-sm font-medium uppercase tracking-wide">Pro Pass</p>
                  <div className="flex items-center justify-center gap-1 mt-2">
                    <span className="text-4xl font-bold text-slate-900">$29</span>
                    <span className="text-slate-400">/mo</span>
                  </div>
                  <p className="text-slate-500 text-sm mt-2">Cancel anytime</p>
                </div>
                <button 
                  onClick={openProModal}
                  className="block w-full py-4 px-6 bg-primary-600 hover:bg-primary-700 text-white font-bold rounded-xl text-center transition-colors shadow-lg shadow-primary-500/20"
                >
                  Get Started
                </button>
                <p className="text-xs text-center text-slate-400 mt-4">Simulated Payment Environment</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
