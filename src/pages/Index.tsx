
import React, { useState } from 'react';
import Header from '@/components/Layout/Header';
import Footer from '@/components/Layout/Footer';
import CategoryFilter from '@/components/CategoryFilter';
import RestaurantCard from '@/components/RestaurantCard';
import FeaturedRestaurant from '@/components/FeaturedRestaurant';

// Sample data - in a real app, this would come from an API
const categories = [
  { id: 1, name: 'Lanches', icon: '🍔' },
  { id: 2, name: 'Pizza', icon: '🍕' },
  { id: 3, name: 'Brasileira', icon: '🍖' },
  { id: 4, name: 'Açaí', icon: '🍨' },
  { id: 5, name: 'Japonesa', icon: '🍣' },
  { id: 6, name: 'Doces', icon: '🍪' },
  { id: 7, name: 'Bebidas', icon: '🥤' },
];

const featuredRestaurant = {
  id: 1,
  name: 'Lanchonete dos Amigos',
  image: 'https://images.unsplash.com/photo-1572802419224-296b0aeee0d9?ixlib=rb-1.2.1&auto=format&fit=crop&w=1003&q=80',
  coverImage: 'https://images.unsplash.com/photo-1561758033-d89a9ad46330?ixlib=rb-1.2.1&auto=format&fit=crop&w=2100&q=80',
  logo: 'https://images.unsplash.com/photo-1572802419224-296b0aeee0d9?ixlib=rb-1.2.1&auto=format&fit=crop&w=1003&q=80',
  rating: 4.8,
  deliveryTime: '30-45 min',
  deliveryFee: 'Grátis',
  categories: ['Lanches', 'Brasileira', 'Combos'],
  description: 'O melhor da culinária local com sabor caseiro e atendimento de primeira. Experimente nossos lanches artesanais e pratos tradicionais.',
};

const restaurants = [
  {
    id: 1,
    name: 'Lanchonete dos Amigos',
    image: 'https://images.unsplash.com/photo-1572802419224-296b0aeee0d9?ixlib=rb-1.2.1&auto=format&fit=crop&w=1003&q=80',
    rating: 4.8,
    deliveryTime: '30-45 min',
    deliveryFee: 'Grátis',
    categories: ['Lanches', 'Brasileira'],
    featured: true,
  },
  {
    id: 2,
    name: 'Pizza Express',
    image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?ixlib=rb-1.2.1&auto=format&fit=crop&w=2100&q=80',
    rating: 4.5,
    deliveryTime: '40-55 min',
    deliveryFee: 'R$ 5,00',
    categories: ['Pizza', 'Italiana'],
    featured: false,
  },
  {
    id: 3,
    name: 'Açaí da Praça',
    image: 'https://images.unsplash.com/photo-1502301197179-65228ab57f78?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80',
    rating: 4.7,
    deliveryTime: '20-35 min',
    deliveryFee: 'R$ 3,00',
    categories: ['Açaí', 'Doces'],
    featured: false,
  },
  {
    id: 4,
    name: 'Japonês Premium',
    image: 'https://images.unsplash.com/photo-1553621042-f6e147245754?ixlib=rb-1.2.1&auto=format&fit=crop&w=1225&q=80',
    rating: 4.9,
    deliveryTime: '50-65 min',
    deliveryFee: 'R$ 8,00',
    categories: ['Japonesa', 'Sushi'],
    featured: false,
  },
  {
    id: 5,
    name: 'Bar do Zé',
    image: 'https://images.unsplash.com/photo-1514933651103-005eec06c04b?ixlib=rb-1.2.1&auto=format&fit=crop&w=1934&q=80',
    rating: 4.3,
    deliveryTime: '30-45 min',
    deliveryFee: 'R$ 4,00',
    categories: ['Brasileira', 'Petiscos', 'Bebidas'],
    featured: false,
  },
  {
    id: 6,
    name: 'Sorveteria Gelado',
    image: 'https://images.unsplash.com/photo-1563805042-7684c019e1cb?ixlib=rb-1.2.1&auto=format&fit=crop&w=2102&q=80',
    rating: 4.6,
    deliveryTime: '15-30 min',
    deliveryFee: 'R$ 3,50',
    categories: ['Doces', 'Sorvetes'],
    featured: false,
  },
];

const Index = () => {
  const [activeCategory, setActiveCategory] = useState<number | null>(null);

  const filteredRestaurants = activeCategory
    ? restaurants.filter(restaurant => 
        restaurant.categories.includes(categories.find(c => c.id === activeCategory)?.name || ''))
    : restaurants;

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow">
        <div className="container-custom py-4 md:py-6">
          {/* Hero Banner */}
          <div className="mb-8 bg-gradient-to-r from-orange-500 to-orange-700 rounded-3xl overflow-hidden">
            <div className="grid md:grid-cols-2 items-center">
              <div className="p-6 md:p-10">
                <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">
                  Peça comida do seu jeito!
                </h1>
                <p className="text-white/90 text-lg mb-6">
                  Os melhores restaurantes de Ceres na palma da sua mão.
                  Peça agora e receba em casa.
                </p>
                <button className="bg-white text-orange-600 hover:bg-gray-100 px-6 py-3 rounded-xl font-medium transition-all shadow-lg hover:shadow-xl">
                  Explorar Restaurantes
                </button>
              </div>
              <div className="hidden md:block h-full">
                <img 
                  src="https://images.unsplash.com/photo-1513639304702-9616575c85dc?ixlib=rb-1.2.1&auto=format&fit=crop&w=1867&q=80" 
                  alt="Fast Tasty Delivery"
                  className="h-full w-full object-cover"
                />
              </div>
            </div>
          </div>

          {/* Categories Filter */}
          <CategoryFilter 
            categories={categories} 
            activeCategory={activeCategory} 
            setActiveCategory={setActiveCategory}
          />
          
          {/* Featured Restaurant */}
          <FeaturedRestaurant {...featuredRestaurant} />
          
          {/* Restaurant Listings */}
          <h2 className="text-2xl font-bold mb-4">Restaurantes em Ceres</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredRestaurants.map(restaurant => (
              <RestaurantCard key={restaurant.id} {...restaurant} />
            ))}
          </div>
          
          {/* Promotions Section */}
          <div className="mt-10 mb-6">
            <h2 className="text-2xl font-bold mb-4">Ofertas do Dia</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-gradient-to-r from-orange-100 to-orange-200 rounded-2xl p-6 flex items-center">
                <div className="flex-1">
                  <span className="bg-orange-500 text-white text-xs px-2 py-1 rounded-full">Promoção</span>
                  <h3 className="text-xl font-bold mt-2 mb-1">Combo Família</h3>
                  <p className="text-sm text-gray-700 mb-3">Peça para 4 pessoas e ganhe uma sobremesa!</p>
                  <button className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors">
                    Ver Oferta
                  </button>
                </div>
                <div className="w-1/2">
                  <img 
                    src="https://images.unsplash.com/photo-1564843375703-324a1fad0b0c?ixlib=rb-1.2.1&auto=format&fit=crop&w=934&q=80" 
                    alt="Promo"
                    className="w-full h-32 object-cover rounded-xl"
                  />
                </div>
              </div>
              
              <div className="bg-gradient-to-r from-blue-100 to-blue-200 rounded-2xl p-6 flex items-center">
                <div className="flex-1">
                  <span className="bg-blue-600 text-white text-xs px-2 py-1 rounded-full">Novidade</span>
                  <h3 className="text-xl font-bold mt-2 mb-1">Frete Grátis</h3>
                  <p className="text-sm text-gray-700 mb-3">Na primeira compra do app!</p>
                  <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors">
                    Ver Detalhes
                  </button>
                </div>
                <div className="w-1/2">
                  <img 
                    src="https://images.unsplash.com/photo-1592861956120-e524fc739696?ixlib=rb-1.2.1&auto=format&fit=crop&w=2100&q=80" 
                    alt="Free Delivery"
                    className="w-full h-32 object-cover rounded-xl"
                  />
                </div>
              </div>
            </div>
          </div>
          
          {/* CTA Download App */}
          <div className="my-10 bg-gray-900 rounded-3xl overflow-hidden">
            <div className="grid md:grid-cols-5 items-center">
              <div className="md:col-span-3 p-6 md:p-10">
                <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
                  Baixe nosso aplicativo
                </h2>
                <p className="text-gray-300 mb-6">
                  Peça direto do aplicativo e ganhe cupons exclusivos. Disponível para Android e iOS.
                </p>
                <div className="flex flex-wrap gap-4">
                  <button className="bg-white hover:bg-gray-100 text-black px-5 py-3 rounded-xl flex items-center transition-colors">
                    <svg className="h-6 w-6 mr-2" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M3 20.5V3.5c0-.83.52-1.58 1.3-1.87l10.7 9.37-10.7 9.37A1.93 1.93 0 013 20.5zm16.37.5l-6.12-3.62 2.25-1.97 4.5 2.66c.72.43.96 1.37.54 2.1-.27.46-.78.81-1.36.83h-.07a1.78 1.78 0 01-.74-.2zm-1.3-16.21l-4.84 2.75-2.25-1.97 6.12-3.62c.2-.12.42-.2.67-.2h.1c.85 0 1.55.7 1.55 1.55 0 .6-.35 1.15-.88 1.4l-.01.09h-.46z" />
                    </svg>
                    Google Play
                  </button>
                  <button className="bg-white hover:bg-gray-100 text-black px-5 py-3 rounded-xl flex items-center transition-colors">
                    <svg className="h-6 w-6 mr-2" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M16.35 2.37l5.06 5.04-5.06 5.04-.7-.71 4.01-4-8.66.01V6.04l8.66.01-4.01-4 .7-.68zm-9.7-.7l.7.7-4.01 4.01 8.66-.01v1.71l-8.66-.01 4.01 4-.7.71-5.06-5.04L6.65 2.37z" />
                    </svg>
                    App Store
                  </button>
                </div>
              </div>
              <div className="hidden md:block md:col-span-2 h-full">
                <img 
                  src="https://images.unsplash.com/photo-1556656793-08538906a9f8?ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80" 
                  alt="Fast Tasty App"
                  className="h-full w-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Index;
