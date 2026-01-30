
import React from 'react';
import { ShoppingCart, Menu, Leaf, MessageCircle } from 'lucide-react';
import { AppView } from '../types';

interface NavbarProps {
  currentView: AppView;
  setView: (view: AppView) => void;
  cartCount: number;
  toggleCart: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ currentView, setView, cartCount, toggleCart }) => {
  const whatsappNumber = "5569984416841";
  const whatsappMessage = encodeURIComponent("Olá! Gostaria de saber mais sobre as castanhas.");
  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${whatsappMessage}`;

  return (
    <nav className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-brand-green/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          <div className="flex items-center cursor-pointer" onClick={() => setView(AppView.LANDING)}>
            <div className="bg-brand-green p-2 rounded-xl mr-3">
              <Leaf className="text-brand-lime h-6 w-6" />
            </div>
            <div>
              <span className="text-2xl font-black text-brand-green font-serif tracking-tight">NS</span>
              <span className="text-2xl font-light text-brand-orange font-serif">CASTANHAS</span>
            </div>
          </div>

          <div className="hidden md:flex items-center space-x-8">
            <button 
              onClick={() => setView(AppView.LANDING)}
              className={`text-sm font-semibold transition-colors ${currentView === AppView.LANDING ? 'text-brand-orange' : 'text-brand-green hover:text-brand-orange'}`}
            >
              Início
            </button>
            <button 
              onClick={() => setView(AppView.ABOUT)}
              className={`text-sm font-semibold transition-colors ${currentView === AppView.ABOUT ? 'text-brand-orange' : 'text-brand-green hover:text-brand-orange'}`}
            >
              Nossa História
            </button>
            <a 
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center space-x-2 px-4 py-2 bg-[#25D366] text-white rounded-full text-xs font-bold hover:bg-[#128C7E] transition-all shadow-md shadow-green-200"
            >
              <MessageCircle className="h-4 w-4" />
              <span>WhatsApp</span>
            </a>
          </div>

          <div className="flex items-center space-x-4">
            <button 
              onClick={toggleCart}
              className="relative p-2 text-brand-green hover:bg-brand-green/5 rounded-full transition-all"
            >
              <ShoppingCart className="h-6 w-6" />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-brand-orange text-white text-[10px] font-bold h-5 w-5 flex items-center justify-center rounded-full border-2 border-white">
                  {cartCount}
                </span>
              )}
            </button>
            <button className="md:hidden p-2 text-brand-green">
              <Menu className="h-6 w-6" />
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};
