
import React from 'react';
import { Product } from './types';

export const PRODUCTS: Product[] = [
  {
    id: '1',
    category: 'Granulada',
    price: 89.90,
    unit: 'kg',
    image: 'https://images.unsplash.com/photo-1596501048757-377319c3b88a?auto=format&fit=crop&q=80&w=800',
    description: 'Nossas castanhas de caju W1 são selecionadas manualmente, torradas na medida certa para garantir crocância máxima e sabor intenso.',
    benefits: ['Rica em gorduras boas', 'Fonte de magnésio', 'Saúde do coração']
  },
  {
    id: '2',
    category: 'Castanhas S/ casca',
    price: 74.50,
    unit: 'kg',
    image: 'https://images.unsplash.com/photo-1588661704257-2313674686ca?auto=format&fit=crop&q=80&w=800',
    description: 'A rainha das castanhas. Fonte primária de selênio, essencial para o sistema imunológico e saúde da tireoide.',
    benefits: ['Poderoso antioxidante', 'Rica em Selênio', 'Combate o envelhecimento']
  },
  {
    id: '3',
    category: 'Castanhas na casca',
    price: 120.00,
    unit: 'kg',
    image: 'https://images.unsplash.com/photo-1582260667018-9366e2c90666?auto=format&fit=crop&q=80&w=800',
    description: 'Pistaches californianos de alta qualidade, abertos naturalmente e temperados com uma leve pitada de sal marinho.',
    benefits: ['Auxilia no controle do peso', 'Melhora a saúde ocular', 'Baixo índice glicêmico']
  },
  {
    id: '4',
    category: 'Snacks',
    price: 95.00,
    unit: 'kg',
    image: 'https://images.unsplash.com/photo-1508061253366-f7da158b6d46?auto=format&fit=crop&q=80&w=800',
    description: 'Amêndoas crocantes com um toque defumado artesanal. O snack perfeito para acompanhar bebidas finas ou como lanche saudável.',
    benefits: ['Fonte de Vitamina E', 'Melhora o colesterol', 'Saúde da pele']
  },
  {
    id: '5',
    name: 'Mix Premium NS (6 Variedades)',
    category: 'Mixes',
    price: 98.00,
    unit: 'kg',
    image: 'https://images.unsplash.com/photo-1536627242413-29efd3a446f1?auto=format&fit=crop&q=80&w=800',
    description: 'A combinação perfeita: Caju, Pará, Amêndoas, Nozes, Macadâmias e Damascos Turcos.',
    benefits: ['Energia completa', 'Fibras e Vitaminas', 'Ideal para pré-treino']
  },
  {
    id: '6',
    name: 'Nozes Quartz Chilenas',
    category: 'Especiais',
    price: 110.00,
    unit: 'kg',
    image: 'https://images.unsplash.com/photo-1614735241165-6756e1df61ab?auto=format&fit=crop&q=80&w=800',
    description: 'Nozes de coloração clara (Quartz), sabor suave e textura amanteigada. Ricas em Ômega 3.',
    benefits: ['Saúde cerebral', 'Anti-inflamatório natural', 'Ômega 3 vegetal']
  }
];

export const SYSTEM_INSTRUCTION = `
Você é o "NutriAI Advisor" da NS Castanhas, um consultor especialista em nuts, sementes e alimentação saudável.
Sua missão é ajudar os clientes a escolherem as melhores castanhas baseadas em seus objetivos (saúde, treino, dieta, culinária).

Catálogo disponível:
${PRODUCTS.map(p => `- ${p.name}: R$ ${p.price}/${p.unit}. Benefícios: ${p.benefits.join(', ')}`).join('\n')}

Diretrizes:
1. Seja cordial, sofisticado e atencioso. Use o tom de uma marca premium.
2. Sempre que possível, recomende produtos específicos do catálogo.
3. Explique os benefícios nutricionais de forma simples e científica.
4. Responda em português do Brasil.
5. Se o usuário perguntar sobre preços, use os valores do catálogo acima.
6. Mantenha as respostas concisas e ricas em informação útil.
`;
