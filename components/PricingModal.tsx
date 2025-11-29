
import React, { useState } from 'react';
import { X, Check, Shield, Zap, CreditCard, Star } from 'lucide-react';
import { useCredits } from '../contexts/CreditContext';

interface PricingModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface Plan {
  id: string;
  name: string;
  credits: number;
  price: number;
  features: string[];
  popular?: boolean;
}

export const PricingModal: React.FC<PricingModalProps> = ({ isOpen, onClose }) => {
  const { addCredits } = useCredits();
  const [isProcessing, setIsProcessing] = useState(false);
  const [success, setSuccess] = useState(false);

  if (!isOpen) return null;

  const plans: Plan[] = [
    {
      id: 'starter',
      name: 'Starter',
      credits: 10,
      price: 9,
      features: ['High-res downloads', 'Basic retouching', 'Standard support']
    },
    {
      id: 'pro',
      name: 'Pro',
      credits: 50,
      price: 29,
      features: ['Priority generation', 'Advanced retouching', 'Commercial rights', 'Team branding'],
      popular: true
    },
    {
      id: 'business',
      name: 'Business',
      credits: 200,
      price: 99,
      features: ['API Access', 'Dedicated support', 'Bulk generation', 'Custom styles']
    }
  ];

  const handlePurchase = (plan: Plan) => {
    setIsProcessing(true);
    
    // Simulate API payment delay
    setTimeout(() => {
      setIsProcessing(false);
      setSuccess(true);
      addCredits(plan.credits);
      
      // Close after showing success message
      setTimeout(() => {
        setSuccess(false);
        onClose();
      }, 1500);
    }, 2000);
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <div 
        className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm transition-opacity" 
        onClick={!isProcessing ? onClose : undefined}
      />
      
      <div className="relative bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto transform transition-all">
        {success ? (
          <div className="p-16 text-center flex flex-col items-center justify-center min-h-[400px]">
            <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mb-6 animate-bounce">
              <Check size={40} strokeWidth={3} />
            </div>
            <h2 className="text-3xl font-bold text-slate-900 mb-2">Payment Successful!</h2>
            <p className="text-slate-500 text-lg">Your credits have been added to your account.</p>
          </div>
        ) : (
          <>
            <div className="p-6 md:p-8 border-b border-slate-100 flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold text-slate-900">Upgrade your plan</h2>
                <p className="text-slate-500 mt-1">Choose the package that suits your needs.</p>
              </div>
              <button 
                onClick={onClose} 
                className="p-2 hover:bg-slate-100 rounded-full text-slate-400 hover:text-slate-600 transition-colors"
                disabled={isProcessing}
              >
                <X size={24} />
              </button>
            </div>

            <div className="p-6 md:p-8 bg-slate-50">
              {isProcessing && (
                <div className="absolute inset-0 bg-white/80 z-10 flex flex-col items-center justify-center">
                  <div className="w-12 h-12 border-4 border-primary-200 border-t-primary-600 rounded-full animate-spin mb-4"></div>
                  <p className="font-semibold text-slate-900">Processing secure payment...</p>
                </div>
              )}
              
              <div className="grid md:grid-cols-3 gap-6">
                {plans.map((plan) => (
                  <div 
                    key={plan.id}
                    className={`relative bg-white rounded-2xl p-6 border-2 transition-all hover:scale-[1.02] hover:shadow-xl
                      ${plan.popular ? 'border-primary-500 shadow-lg' : 'border-slate-200 shadow-sm'}
                    `}
                  >
                    {plan.popular && (
                      <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-gradient-to-r from-primary-600 to-indigo-600 text-white px-4 py-1 rounded-full text-xs font-bold uppercase tracking-wide flex items-center gap-1">
                        <Star size={12} fill="currentColor" /> Most Popular
                      </div>
                    )}

                    <div className="text-center mb-6">
                      <h3 className="text-lg font-semibold text-slate-900">{plan.name}</h3>
                      <div className="mt-4 flex items-baseline justify-center gap-1">
                        <span className="text-4xl font-bold text-slate-900">${plan.price}</span>
                        <span className="text-slate-500">USD</span>
                      </div>
                      <div className="mt-2 text-primary-600 font-medium bg-primary-50 inline-block px-3 py-1 rounded-lg">
                        {plan.credits} Credits
                      </div>
                    </div>

                    <ul className="space-y-3 mb-8">
                      {plan.features.map((feature, i) => (
                        <li key={i} className="flex items-start gap-3 text-sm text-slate-600">
                          <Check size={16} className="text-green-500 mt-0.5 shrink-0" />
                          {feature}
                        </li>
                      ))}
                    </ul>

                    <button
                      onClick={() => handlePurchase(plan)}
                      disabled={isProcessing}
                      className={`w-full py-3 px-4 rounded-xl font-bold flex items-center justify-center gap-2 transition-all
                        ${plan.popular 
                          ? 'bg-primary-600 hover:bg-primary-700 text-white shadow-lg shadow-primary-500/30' 
                          : 'bg-slate-900 hover:bg-slate-800 text-white'
                        }
                      `}
                    >
                      {isProcessing ? 'Processing...' : 'Purchase Now'}
                    </button>
                  </div>
                ))}
              </div>

              <div className="mt-8 flex items-center justify-center gap-4 text-xs text-slate-400">
                <div className="flex items-center gap-1">
                  <Shield size={12} />
                  Secure Payment
                </div>
                <div className="w-1 h-1 bg-slate-300 rounded-full"></div>
                <div className="flex items-center gap-1">
                  <Zap size={12} />
                  Instant Delivery
                </div>
                <div className="w-1 h-1 bg-slate-300 rounded-full"></div>
                <div>Money-back guarantee</div>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};
