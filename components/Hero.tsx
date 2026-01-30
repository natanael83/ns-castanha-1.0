
import React from 'react';
import { ArrowRight, Star, ShieldCheck, Truck } from 'lucide-react';
import { AppView } from '../types';

interface HeroProps {
  onShopNow: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onShopNow }) => {
  return (
    <div className="relative overflow-hidden bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="relative z-10 text-center lg:text-left">
            <div className="inline-flex items-center space-x-2 bg-brand-green/5 px-4 py-2 rounded-full text-brand-green font-medium mb-6">
              <Star className="h-4 w-4 fill-brand-green" />
              <span className="text-sm">A melhor seleção do Norte</span>
            </div>
            <h1 className="text-5xl lg:text-7xl font-black text-brand-green font-serif leading-tight mb-6">
              Sabor que <span className="text-brand-orange underline decoration-brand-lime">Nutre</span> e Encanta.
            </h1>
            <p className="text-lg text-gray-600 mb-8 max-w-xl mx-auto lg:mx-0">
              Castanhas selecionadas artesanalmente para quem não abre mão de qualidade, frescor e um estilo de vida extraordinário.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start space-y-4 sm:space-y-0 sm:space-x-4">
              <button
                onClick={onShopNow}
                className="w-full sm:w-auto px-8 py-4 bg-brand-green text-white font-bold rounded-2xl hover:bg-brand-dark transition-all flex items-center justify-center group shadow-xl shadow-brand-green/20"
              >
                Ver Catálogo
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>

            <div className="mt-12 grid grid-cols-3 gap-4 border-t border-gray-100 pt-8">
              <div className="flex flex-col items-center lg:items-start">
                <ShieldCheck className="text-brand-orange h-6 w-6 mb-2" />
                <span className="text-xs font-bold uppercase tracking-wider text-gray-400">Origem Controlada</span>
              </div>
              <div className="flex flex-col items-center lg:items-start">
                <Truck className="text-brand-orange h-6 w-6 mb-2" />
                <span className="text-xs font-bold uppercase tracking-wider text-gray-400">Entrega Expressa</span>
              </div>
              <div className="flex flex-col items-center lg:items-start">
                <Star className="text-brand-orange h-6 w-6 mb-2" />
                <span className="text-xs font-bold uppercase tracking-wider text-gray-400">Número 1° de Vilhena</span>
              </div>
            </div>
          </div>

          <div className="relative">
            <div className="absolute -inset-4 bg-brand-lime/20 rounded-full blur-3xl"></div>
            <img
              src="/hero.png"
              alt="Qualidade e sabor"
              className="relative rounded-3xl shadow-2xl transform rotate-3 hover:rotate-0 transition-transform duration-500 object-cover aspect-[4/3] w-full"
            />
            <div className="absolute -bottom-6 -left-6 bg-white p-6 rounded-2xl shadow-xl border border-brand-green/5 animate-bounce">
              <div className="flex items-center space-x-2">
                <div className="flex -space-x-2">
                  {[1, 2, 3].map(i => (
                    <img key={i} src={`https://picsum.photos/32/32?random=${i}`} className="w-8 h-8 rounded-full border-2 border-white" />
                  ))}
                </div>
                <div className="text-xs font-bold text-brand-green">+80 Clientes Felizes</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
