
import React, { createContext, useContext, useState, useEffect } from 'react';
import { PricingModal } from '../components/PricingModal';

interface CreditContextType {
  credits: number;
  deductCredit: () => void;
  addCredits: (amount: number) => void;
  openProModal: () => void;
  closeProModal: () => void;
}

const CreditContext = createContext<CreditContextType | undefined>(undefined);

export const CreditProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Initialize from localStorage or default to 5 free credits
  const [credits, setCredits] = useState<number>(() => {
    const saved = localStorage.getItem('proheadshot_credits');
    return saved ? parseInt(saved, 10) : 5;
  });
  
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Persist credits whenever they change
  useEffect(() => {
    localStorage.setItem('proheadshot_credits', credits.toString());
  }, [credits]);

  const deductCredit = () => {
    setCredits(prev => Math.max(0, prev - 1));
  };

  const addCredits = (amount: number) => {
    setCredits(prev => prev + amount);
  };

  const openProModal = () => setIsModalOpen(true);
  const closeProModal = () => setIsModalOpen(false);

  return (
    <CreditContext.Provider value={{ credits, deductCredit, addCredits, openProModal, closeProModal }}>
      {children}
      <PricingModal isOpen={isModalOpen} onClose={closeProModal} />
    </CreditContext.Provider>
  );
};

export const useCredits = () => {
  const context = useContext(CreditContext);
  if (context === undefined) {
    throw new Error('useCredits must be used within a CreditProvider');
  }
  return context;
};
