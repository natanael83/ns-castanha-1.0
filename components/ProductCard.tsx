
import React from 'react';
import { Plus, Check, Info } from 'lucide-react';
import { Product } from '../types';

interface ProductCardProps {
  product: Product;
  onAddToCart: (p: Product) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product, onAddToCart }) => {
  return (
    <div className="group bg-white rounded-3xl overflow-hidden border border-brand-green/5 hover:border-brand-green/20 hover:shadow-2xl transition-all duration-300">
      <div className="relative h-64 overflow-hidden">
        <img 
          src={product.image} 
          alt={product.name} 
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
        />
        <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full shadow-sm">
          <span className="text-[10px] font-black uppercase tracking-widest text-brand-green">{product.category}</span>
        </div>
      </div>
      
      <div className="p-6">
        <h3 className="text-xl font-bold text-brand-green font-serif mb-2 group-hover:text-brand-orange transition-colors">
          {product.name}
        </h3>
        <p className="text-sm text-gray-500 line-clamp-2 mb-4">
          {product.description}
        </p>

        <div className="space-y-2 mb-6">
          {product.benefits.slice(0, 2).map((benefit, idx) => (
            <div key={idx} className="flex items-center text-[11px] font-semibold text-brand-green/70">
              <Check className="h-3 w-3 mr-2 text-brand-lime" />
              {benefit}
            </div>
          ))}
        </div>

        <div className="flex items-center justify-between mt-auto">
          <div>
            <span className="text-xs text-gray-400 font-bold block uppercase tracking-tighter leading-none">Preço por {product.unit}</span>
            <span className="text-2xl font-black text-brand-green">
              R$ {product.price.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
            </span>
          </div>
          <button 
            onClick={() => onAddToCart(product)}
            className="bg-brand-green hover:bg-brand-orange text-white p-3 rounded-2xl transition-all active:scale-95 shadow-lg shadow-brand-green/10"
          >
            <Plus className="h-6 w-6" />
          </button>
        </div>
      </div>
    </div>
  );
};
