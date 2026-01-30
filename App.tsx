
import React, { useState, useCallback } from 'react';
import { AppView, Product, CartItem } from './types';
import { PRODUCTS } from './constants';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { ProductCard } from './components/ProductCard';
import { CartDrawer } from './components/CartDrawer';
import { ChatAssistant } from './components/ChatAssistant';
import { Leaf, Award, Shield, Sparkles } from 'lucide-react';

const App: React.FC = () => {
  const [view, setView] = useState<AppView>(AppView.LANDING);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  const handleAddToCart = useCallback((product: Product) => {
    setCart(prev => {
      const existing = prev.find(i => i.id === product.id);
      if (existing) {
        return prev.map(i => i.id === product.id ? { ...i, quantity: i.quantity + 1 } : i);
      }
      return [...prev, { ...product, quantity: 1 }];
    });
    setIsCartOpen(true);
  }, []);

  const updateCartQuantity = useCallback((id: string, delta: number) => {
    setCart(prev => prev.map(item => {
      if (item.id === id) {
        const newQty = Math.max(1, item.quantity + delta);
        return { ...item, quantity: newQty };
      }
      return item;
    }));
  }, []);

  const removeFromCart = useCallback((id: string) => {
    setCart(prev => prev.filter(i => i.id !== id));
  }, []);

  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className="min-h-screen font-sans selection:bg-brand-lime/30">
      <Navbar 
        currentView={view} 
        setView={setView} 
        cartCount={cartCount}
        toggleCart={() => setIsCartOpen(!isCartOpen)}
      />

      <main>
        {view === AppView.LANDING && (
          <>
            <Hero onShopNow={() => setView(AppView.SHOP)} />
            
            {/* Features Section */}
            <section className="py-24 bg-brand-light">
              <div className="max-w-7xl mx-auto px-4">
                <div className="text-center mb-16">
                  <h2 className="text-4xl font-serif font-black text-brand-green mb-4">Por que a NS Castanhas?</h2>
                  <div className="h-1.5 w-24 bg-brand-orange mx-auto rounded-full"></div>
                </div>
                <div className="grid md:grid-cols-3 gap-12">
                  <div className="bg-white p-10 rounded-3xl border border-brand-green/5 text-center group hover:-translate-y-2 transition-all shadow-sm hover:shadow-xl">
                    <div className="bg-brand-green/10 w-20 h-20 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:bg-brand-green transition-colors">
                      <Award className="h-10 w-10 text-brand-green group-hover:text-brand-lime transition-colors" />
                    </div>
                    <h3 className="text-xl font-bold text-brand-green mb-4">Qualidade Triple A</h3>
                    <p className="text-gray-500 text-sm leading-relaxed">A cada castanha selecionada pensamos em você.</p>
                  </div>
                  <div className="bg-white p-10 rounded-3xl border border-brand-green/5 text-center group hover:-translate-y-2 transition-all shadow-sm hover:shadow-xl">
                    <div className="bg-brand-green/10 w-20 h-20 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:bg-brand-green transition-colors">
                      <Shield className="h-10 w-10 text-brand-green group-hover:text-brand-lime transition-colors" />
                    </div>
                    <h3 className="text-xl font-bold text-brand-green mb-4">Origem Certificada</h3>
                    <p className="text-gray-500 text-sm leading-relaxed">Rastreabilidade completa do produtor até sua mesa, apoiando agricultores sustentáveis e comércio justo.</p>
                  </div>
                  <div className="bg-white p-10 rounded-3xl border border-brand-green/5 text-center group hover:-translate-y-2 transition-all shadow-sm hover:shadow-xl">
                    <div className="bg-brand-green/10 w-20 h-20 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:bg-brand-green transition-colors">
                      <Sparkles className="h-10 w-10 text-brand-green group-hover:text-brand-lime transition-colors" />
                    </div>
                    <h3 className="text-xl font-bold text-brand-green mb-4">Frescor Preservado</h3>
                    <p className="text-gray-500 text-sm leading-relaxed">Torrefação diária em pequenos lotes e embalagens de alta barreira para manter o aroma e crocância originais.</p>
                  </div>
                </div>
              </div>
            </section>

            {/* Featured Section */}
            <section className="py-24">
              <div className="max-w-7xl mx-auto px-4">
                <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 space-y-4 md:space-y-0">
                  <div>
                    <h2 className="text-4xl font-serif font-black text-brand-green mb-2">Destaques da Temporada</h2>
                    <p className="text-gray-500 max-w-lg">As favoritas dos nossos clientes, selecionadas com carinho.</p>
                  </div>
                  <button onClick={() => setView(AppView.SHOP)} className="text-brand-orange font-bold hover:underline flex items-center">
                    Ver todo o catálogo <Award className="ml-2 h-4 w-4" />
                  </button>
                </div>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {PRODUCTS.slice(0, 3).map(product => (
                    <ProductCard key={product.id} product={product} onAddToCart={handleAddToCart} />
                  ))}
                </div>
              </div>
            </section>
          </>
        )}

        {view === AppView.SHOP && (
          <section className="py-16 bg-white min-h-[70vh]">
            <div className="max-w-7xl mx-auto px-4">
              <div className="mb-12 text-center">
                <h1 className="text-5xl font-serif font-black text-brand-green mb-4">Catálogo </h1>
                <p className="text-gray-500 max-w-2xl mx-auto text-lg">Nutrição de alta performance e sabor inigualável em cada grama. Escolha o melhor para sua saúde.</p>
              </div>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
                {PRODUCTS.map(product => (
                  <ProductCard key={product.id} product={product} onAddToCart={handleAddToCart} />
                ))}
              </div>
            </div>
          </section>
        )}

        {view === AppView.ABOUT && (
          <section className="py-24 bg-white">
            <div className="max-w-4xl mx-auto px-4">
              <div className="bg-brand-green rounded-[40px] p-12 text-white relative overflow-hidden mb-16">
                <div className="absolute top-0 right-0 p-8 opacity-10">
                  <Leaf className="h-64 w-64" />
                </div>
                <h1 className="text-5xl font-serif font-black mb-8 relative z-10">Nossa Jornada</h1>
                <div className="space-y-6 text-lg relative z-10 leading-relaxed font-light opacity-90">
                  <p>A <strong>NS Castanhas</strong> nasceu do desejo de reconectar as pessoas com a pureza dos alimentos vindos direto da natureza, sem atalhos e sem comprometer a qualidade.</p>
                  <p>Iniciamos nossa história como uma pequena curadoria familiar de nuts selecionadas. Hoje, somos referência nacional para quem busca não apenas um alimento, mas uma fonte de vitalidade e sabor autêntico.</p>
                  <p>Cada lote que chega às suas mãos passa por uma rigorosa inspeção, garantindo que o padrão NS — Nutrição Superior — seja mantido em cada detalhe.</p>
                </div>
              </div>
              
              <div className="grid md:grid-cols-2 gap-12 items-center">
                <div>
                  <h3 className="text-3xl font-serif font-bold text-brand-green mb-6">Compromisso com o Planeta</h3>
                  <p className="text-gray-600 leading-relaxed">Nossas embalagens são 100% recicláveis e trabalhamos ativamente para reduzir nossa pegada de carbono em toda a cadeia logística. Acreditamos que o que é bom para você deve ser bom para o mundo.</p>
                </div>
                <img src="https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&q=80&w=800" className="rounded-3xl shadow-xl" alt="Nature" />
              </div>
            </div>
          </section>
        )}
      </main>

      <footer className="bg-brand-dark text-white py-20">
        <div className="max-w-7xl mx-auto px-4 grid md:grid-cols-4 gap-12">
          <div className="col-span-2">
            <div className="flex items-center mb-8">
              <div className="bg-white/10 p-2 rounded-xl mr-3">
                <Leaf className="text-brand-lime h-6 w-6" />
              </div>
              <div>
                <span className="text-2xl font-black text-white font-serif tracking-tight">NS</span>
                <span className="text-2xl font-light text-brand-orange font-serif">CASTANHAS</span>
              </div>
            </div>
            <p className="text-gray-400 max-w-sm mb-8 leading-relaxed">A mais alta seleção de castanhas do norte Brasil. Qualidade que você sente no primeiro contato.</p>
            <div className="flex space-x-4">
              <div className="w-10 h-10 bg-white/5 rounded-lg flex items-center justify-center hover:bg-brand-orange transition-colors cursor-pointer">IG</div>
              <div className="w-10 h-10 bg-white/5 rounded-lg flex items-center justify-center hover:bg-brand-orange transition-colors cursor-pointer">FB</div>
              <div className="w-10 h-10 bg-white/5 rounded-lg flex items-center justify-center hover:bg-brand-orange transition-colors cursor-pointer">LI</div>
            </div>
          </div>
          <div>
            <h4 className="text-lg font-bold mb-6 text-brand-lime">Links Úteis</h4>
            <ul className="space-y-4 text-gray-400 font-medium">
              <li className="hover:text-white cursor-pointer transition-colors">Início</li>
              <li className="hover:text-white cursor-pointer transition-colors">Catálogo Completo</li>
              <li className="hover:text-white cursor-pointer transition-colors">Políticas de Envio</li>
            </ul>
          </div>
          <div>
            <h4 className="text-lg font-bold mb-6 text-brand-lime">Atendimento</h4>
            <ul className="space-y-4 text-gray-400 font-medium">
              <li>nscastanhas@gmail.com</li>
              <li>+55 (69) 98441-6841</li>
              <li>Seg - Sex: 08h às 18h chama no zap</li>
            </ul>
          </div>
        </div>
        <div className="max-w-7xl mx-auto px-4 mt-20 pt-8 border-t border-white/5 text-center text-gray-500 text-sm">
          <p>© {new Date().getFullYear()} NS Castanhas. Todos os direitos reservados.</p>
        </div>
      </footer>

      <CartDrawer 
        isOpen={isCartOpen} 
        onClose={() => setIsCartOpen(false)}
        items={cart}
        onUpdateQuantity={updateCartQuantity}
        onRemove={removeFromCart}
      />

      <ChatAssistant />
    </div>
  );
};

export default App;
