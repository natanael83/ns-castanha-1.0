
import React from 'react';
import { X, Trash2, ShoppingBag, Plus, Minus, ArrowRight } from 'lucide-react';
import { CartItem } from '../types';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onUpdateQuantity: (id: string, delta: number) => void;
  onRemove: (id: string) => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({ isOpen, onClose, items, onUpdateQuantity, onRemove }) => {
  const total = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] overflow-hidden">
      <div className="absolute inset-0 bg-brand-dark/40 backdrop-blur-sm transition-opacity" onClick={onClose}></div>
      
      <div className="absolute inset-y-0 right-0 w-full max-w-md bg-white shadow-2xl flex flex-col animate-in slide-in-from-right duration-300">
        <div className="p-6 border-b border-gray-100 flex justify-between items-center bg-brand-light">
          <div className="flex items-center space-x-3">
            <div className="bg-brand-green p-2 rounded-xl">
              <ShoppingBag className="h-6 w-6 text-brand-lime" />
            </div>
            <h2 className="text-xl font-black text-brand-green font-serif">Sua Sacola</h2>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-brand-green/5 rounded-full text-brand-green transition-all">
            <X className="h-6 w-6" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-6 custom-scroll">
          {items.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center">
              <div className="bg-gray-50 p-8 rounded-full mb-6">
                <ShoppingBag className="h-16 w-16 text-gray-200" />
              </div>
              <h3 className="text-lg font-bold text-gray-400">Sua sacola está vazia</h3>
              <p className="text-sm text-gray-400 mt-2">Explore nosso catálogo e adicione o frescor da natureza no seu dia.</p>
              <button 
                onClick={onClose}
                className="mt-8 px-6 py-3 bg-brand-green text-white font-bold rounded-xl hover:bg-brand-orange transition-all"
              >
                Voltar às compras
              </button>
            </div>
          ) : (
            <div className="space-y-6">
              {items.map((item) => (
                <div key={item.id} className="flex items-center space-x-4 bg-white p-2 rounded-2xl border border-gray-50">
                  <img src={item.image} className="w-20 h-20 object-cover rounded-xl shrink-0" alt={item.name} />
                  <div className="flex-1 min-w-0">
                    <h4 className="font-bold text-brand-green truncate">{item.name}</h4>
                    <p className="text-xs text-brand-orange font-bold uppercase tracking-wider">R$ {item.price.toLocaleString('pt-BR')}/{item.unit}</p>
                    <div className="flex items-center mt-3 space-x-4">
                      <div className="flex items-center bg-gray-100 rounded-lg px-2 py-1">
                        <button onClick={() => onUpdateQuantity(item.id, -1)} className="p-1 hover:text-brand-orange"><Minus className="h-3 w-3" /></button>
                        <span className="mx-3 text-xs font-bold w-4 text-center">{item.quantity}</span>
                        <button onClick={() => onUpdateQuantity(item.id, 1)} className="p-1 hover:text-brand-orange"><Plus className="h-3 w-3" /></button>
                      </div>
                      <button onClick={() => onRemove(item.id)} className="text-red-400 hover:text-red-600 transition-colors">
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="text-sm font-black text-brand-green">
                      R$ {(item.price * item.quantity).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {items.length > 0 && (
          <div className="p-6 border-t border-gray-100 bg-brand-light">
            <div className="flex justify-between items-center mb-6">
              <span className="text-gray-400 font-bold uppercase tracking-widest text-xs">Subtotal estimado</span>
              <span className="text-3xl font-black text-brand-green">R$ {total.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</span>
            </div>
            <button className="w-full bg-brand-orange text-white py-5 rounded-2xl font-black text-lg hover:bg-brand-dark transition-all shadow-xl shadow-brand-orange/20 flex items-center justify-center group">
              Finalizar Pedido
              <ArrowRight className="ml-3 h-6 w-6 group-hover:translate-x-2 transition-transform" />
            </button>
            <p className="text-[10px] text-center text-gray-400 mt-4 uppercase font-bold tracking-widest">Entrega grátis em pedidos acima de R$ 200</p>
          </div>
        )}
      </div>
    </div>
  );
};
