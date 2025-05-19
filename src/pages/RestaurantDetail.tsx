
import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import Header from '@/components/Layout/Header';
import Footer from '@/components/Layout/Footer';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Star, Clock, MapPin, ShoppingCart, Plus, Minus, Info, Heart } from 'lucide-react';

// Mock data - in a real app, this would be fetched based on the restaurant ID
const restaurantData = {
  id: 1,
  name: 'Lanchonete dos Amigos',
  coverImage: 'https://images.unsplash.com/photo-1561758033-d89a9ad46330?ixlib=rb-1.2.1&auto=format&fit=crop&w=2100&q=80',
  logo: 'https://images.unsplash.com/photo-1572802419224-296b0aeee0d9?ixlib=rb-1.2.1&auto=format&fit=crop&w=1003&q=80',
  rating: 4.8,
  reviewCount: 324,
  deliveryTime: '30-45 min',
  deliveryFee: 'Grátis',
  minOrder: 'R$ 15,00',
  address: 'Av. Brasil, 123 - Centro, Ceres - GO',
  categories: ['Lanches', 'Brasileira', 'Combos'],
  description: 'O melhor da culinária local com sabor caseiro e atendimento de primeira. Experimente nossos lanches artesanais e pratos tradicionais.',
  menuCategories: [
    {
      id: 'lanches',
      name: 'Lanches',
      items: [
        {
          id: 1,
          name: 'X-Tudo',
          description: 'Pão, hambúrguer, queijo, presunto, bacon, ovo, alface, tomate e batata palha',
          price: 'R$ 25,90',
          image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?ixlib=rb-1.2.1&auto=format&fit=crop&w=1202&q=80',
          popular: true,
        },
        {
          id: 2,
          name: 'X-Salada',
          description: 'Pão, hambúrguer, queijo, alface e tomate',
          price: 'R$ 18,90',
          image: 'https://images.unsplash.com/photo-1572802419224-296b0aeee0d9?ixlib=rb-1.2.1&auto=format&fit=crop&w=1003&q=80',
          popular: false,
        },
        {
          id: 3,
          name: 'X-Bacon',
          description: 'Pão, hambúrguer, queijo, bacon, alface e tomate',
          price: 'R$ 22,90',
          image: 'https://images.unsplash.com/photo-1565299507177-b0ac66763828?ixlib=rb-1.2.1&auto=format&fit=crop&w=1014&q=80',
          popular: true,
        },
      ],
    },
    {
      id: 'combos',
      name: 'Combos',
      items: [
        {
          id: 4,
          name: 'Combo X-Tudo',
          description: 'X-Tudo + Batata Frita + Refrigerante',
          price: 'R$ 35,90',
          image: 'https://images.unsplash.com/photo-1594212699903-ec8a3eca50f5?ixlib=rb-1.2.1&auto=format&fit=crop&w=1071&q=80',
          popular: true,
        },
        {
          id: 5,
          name: 'Combo Família',
          description: '2 X-Salada + 2 X-Bacon + Batata Grande + 2 Refrigerantes',
          price: 'R$ 89,90',
          image: 'https://images.unsplash.com/photo-1456418047667-56bcd35b1a88?ixlib=rb-1.2.1&auto=format&fit=crop&w=1650&q=80',
          popular: false,
        },
      ],
    },
    {
      id: 'bebidas',
      name: 'Bebidas',
      items: [
        {
          id: 6,
          name: 'Refrigerante Lata',
          description: 'Coca-Cola, Guaraná Antarctica, Fanta ou Sprite',
          price: 'R$ 6,00',
          image: 'https://images.unsplash.com/photo-1581006852262-e4307cf6283a?ixlib=rb-1.2.1&auto=format&fit=crop&w=1234&q=80',
          popular: false,
        },
        {
          id: 7,
          name: 'Suco Natural',
          description: 'Laranja, Abacaxi, Maracujá ou Limão',
          price: 'R$ 8,00',
          image: 'https://images.unsplash.com/photo-1613478223719-2ab802602423?ixlib=rb-1.2.1&auto=format&fit=crop&w=1234&q=80',
          popular: false,
        },
      ],
    },
  ],
};

interface CartItem {
  id: number;
  name: string;
  price: string;
  quantity: number;
  image: string;
}

const RestaurantDetail = () => {
  const { id } = useParams<{id: string}>();
  const [cart, setCart] = useState<CartItem[]>([]);
  const [selectedCategory, setSelectedCategory] = useState('lanches');
  
  const addToCart = (item: any) => {
    setCart(prevCart => {
      const existingItem = prevCart.find(cartItem => cartItem.id === item.id);
      
      if (existingItem) {
        return prevCart.map(cartItem => 
          cartItem.id === item.id 
            ? {...cartItem, quantity: cartItem.quantity + 1} 
            : cartItem
        );
      } else {
        return [...prevCart, {
          id: item.id,
          name: item.name,
          price: item.price,
          quantity: 1,
          image: item.image
        }];
      }
    });
  };
  
  const removeFromCart = (itemId: number) => {
    setCart(prevCart => {
      const existingItem = prevCart.find(item => item.id === itemId);
      
      if (existingItem && existingItem.quantity > 1) {
        return prevCart.map(item => 
          item.id === itemId ? {...item, quantity: item.quantity - 1} : item
        );
      } else {
        return prevCart.filter(item => item.id !== itemId);
      }
    });
  };
  
  const calculateCartTotal = () => {
    return cart.reduce((total, item) => {
      const price = parseFloat(item.price.replace('R$ ', '').replace(',', '.'));
      return total + (price * item.quantity);
    }, 0).toFixed(2).replace('.', ',');
  };
  
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow">
        {/* Restaurant Header */}
        <div className="relative h-64 md:h-80">
          <img 
            src={restaurantData.coverImage} 
            alt={restaurantData.name} 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
        </div>
        
        <div className="container-custom relative -mt-24 mb-8">
          <div className="bg-white rounded-3xl shadow-xl p-6">
            <div className="flex flex-col md:flex-row md:items-center gap-4 md:gap-6">
              <div className="w-20 h-20 md:w-24 md:h-24 rounded-xl overflow-hidden border-4 border-white shadow-md">
                <img 
                  src={restaurantData.logo} 
                  alt={restaurantData.name} 
                  className="w-full h-full object-cover"
                />
              </div>
              
              <div className="flex-1">
                <div className="flex flex-wrap items-start justify-between gap-2">
                  <h1 className="text-2xl md:text-3xl font-bold">{restaurantData.name}</h1>
                  
                  <button className="rounded-full p-2 bg-gray-100 hover:bg-gray-200 transition-colors">
                    <Heart size={20} className="text-gray-600" />
                  </button>
                </div>
                
                <div className="flex flex-wrap gap-4 text-sm mt-2">
                  <div className="flex items-center">
                    <Star size={16} className="text-yellow-500 mr-1 fill-yellow-500" />
                    <span className="font-medium">{restaurantData.rating}</span>
                    <span className="text-gray-500 ml-1">({restaurantData.reviewCount})</span>
                  </div>
                  
                  <div className="flex items-center">
                    <Clock size={16} className="text-gray-500 mr-1" />
                    <span>{restaurantData.deliveryTime}</span>
                  </div>
                  
                  <div className="flex items-center">
                    <ShoppingCart size={16} className="text-gray-500 mr-1" />
                    <span>Min. {restaurantData.minOrder}</span>
                  </div>
                  
                  <div className="flex items-center">
                    <MapPin size={16} className="text-gray-500 mr-1" />
                    <span className="text-gray-700">{restaurantData.address}</span>
                  </div>
                </div>
                
                <div className="flex flex-wrap gap-2 mt-3">
                  {restaurantData.categories.map((category, index) => (
                    <span 
                      key={index}
                      className="text-xs py-1 px-3 bg-orange-100 text-orange-700 rounded-full"
                    >
                      {category}
                    </span>
                  ))}
                </div>
                
                <p className="text-gray-600 mt-3 text-sm hidden md:block">
                  {restaurantData.description}
                </p>
              </div>
            </div>
          </div>
          
          {/* Menu Tabs */}
          <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="md:col-span-2">
              <Tabs defaultValue="menu" className="w-full">
                <TabsList className="mb-4 w-full bg-transparent border-b border-gray-200 justify-start space-x-8">
                  <TabsTrigger value="menu" className="data-[state=active]:border-b-2 data-[state=active]:border-orange-500 rounded-none pb-3 text-base font-medium">
                    Cardápio
                  </TabsTrigger>
                  <TabsTrigger value="about" className="data-[state=active]:border-b-2 data-[state=active]:border-orange-500 rounded-none pb-3 text-base font-medium">
                    Sobre
                  </TabsTrigger>
                  <TabsTrigger value="reviews" className="data-[state=active]:border-b-2 data-[state=active]:border-orange-500 rounded-none pb-3 text-base font-medium">
                    Avaliações
                  </TabsTrigger>
                </TabsList>
                
                <TabsContent value="menu" className="mt-0">
                  {/* Menu Category Filter */}
                  <div className="mb-6 overflow-x-auto">
                    <div className="flex space-x-4">
                      {restaurantData.menuCategories.map(category => (
                        <button
                          key={category.id}
                          onClick={() => setSelectedCategory(category.id)}
                          className={`px-4 py-2 whitespace-nowrap rounded-xl transition-all ${
                            selectedCategory === category.id 
                              ? 'bg-orange-500 text-white' 
                              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                          }`}
                        >
                          {category.name}
                        </button>
                      ))}
                    </div>
                  </div>
                  
                  {/* Menu Items */}
                  {restaurantData.menuCategories
                    .filter(category => category.id === selectedCategory)
                    .map(category => (
                      <div key={category.id} className="space-y-4">
                        <h3 className="text-xl font-bold">{category.name}</h3>
                        
                        {category.items.map(item => (
                          <Card key={item.id} className="overflow-hidden">
                            <div className="flex flex-col sm:flex-row">
                              <div className="flex-1 p-4">
                                <div className="flex justify-between">
                                  <div>
                                    <div className="flex items-center">
                                      <h4 className="text-lg font-semibold">{item.name}</h4>
                                      {item.popular && (
                                        <Badge className="ml-2 bg-orange-500">Popular</Badge>
                                      )}
                                    </div>
                                    <p className="text-gray-600 text-sm mt-1">{item.description}</p>
                                  </div>
                                  <div className="text-right">
                                    <div className="font-semibold text-orange-600">{item.price}</div>
                                    <Button 
                                      onClick={() => addToCart(item)}
                                      className="mt-2 bg-orange-500 hover:bg-orange-600"
                                      size="sm"
                                    >
                                      <Plus size={16} className="mr-1" />
                                      Adicionar
                                    </Button>
                                  </div>
                                </div>
                              </div>
                              <div className="sm:w-32 h-28 sm:h-auto">
                                <img 
                                  src={item.image} 
                                  alt={item.name} 
                                  className="w-full h-full object-cover"
                                />
                              </div>
                            </div>
                          </Card>
                        ))}
                      </div>
                    ))}
                </TabsContent>
                
                <TabsContent value="about">
                  <Card className="p-6">
                    <h3 className="text-xl font-bold mb-4">Sobre {restaurantData.name}</h3>
                    <p className="text-gray-700 mb-4">{restaurantData.description}</p>
                    
                    <h4 className="font-semibold text-lg mb-2">Endereço</h4>
                    <p className="text-gray-700 flex items-start mb-4">
                      <MapPin size={18} className="text-orange-500 mr-2 mt-1 flex-shrink-0" />
                      {restaurantData.address}
                    </p>
                    
                    <h4 className="font-semibold text-lg mb-2">Horário de Funcionamento</h4>
                    <div className="text-gray-700">
                      <div className="flex justify-between py-1">
                        <span>Segunda à Sexta</span>
                        <span>11:00 - 22:00</span>
                      </div>
                      <div className="flex justify-between py-1">
                        <span>Sábado</span>
                        <span>11:00 - 23:00</span>
                      </div>
                      <div className="flex justify-between py-1">
                        <span>Domingo</span>
                        <span>12:00 - 22:00</span>
                      </div>
                    </div>
                  </Card>
                </TabsContent>
                
                <TabsContent value="reviews">
                  <Card className="p-6">
                    <div className="flex items-center justify-between mb-6">
                      <h3 className="text-xl font-bold">Avaliações</h3>
                      <div className="flex items-center">
                        <Star size={24} className="text-yellow-500 mr-2 fill-yellow-500" />
                        <span className="text-2xl font-bold">{restaurantData.rating}</span>
                        <span className="text-gray-500 ml-1">({restaurantData.reviewCount})</span>
                      </div>
                    </div>
                    
                    <div className="space-y-4">
                      {/* Sample reviews */}
                      <div className="border-b pb-4">
                        <div className="flex justify-between">
                          <div className="font-medium">Maria S.</div>
                          <div className="flex">
                            {[...Array(5)].map((_, i) => (
                              <Star 
                                key={i} 
                                size={16} 
                                className={`${i < 5 ? 'text-yellow-500 fill-yellow-500' : 'text-gray-300'} mr-0.5`} 
                              />
                            ))}
                          </div>
                        </div>
                        <div className="text-gray-600 mt-1 text-sm">
                          Comida excelente! O X-Tudo é maravilhoso e muito bem servido. Entrega foi rápida.
                        </div>
                      </div>
                      
                      <div className="border-b pb-4">
                        <div className="flex justify-between">
                          <div className="font-medium">João P.</div>
                          <div className="flex">
                            {[...Array(5)].map((_, i) => (
                              <Star 
                                key={i} 
                                size={16} 
                                className={`${i < 4 ? 'text-yellow-500 fill-yellow-500' : 'text-gray-300'} mr-0.5`} 
                              />
                            ))}
                          </div>
                        </div>
                        <div className="text-gray-600 mt-1 text-sm">
                          Sempre peço aqui. Lanches muito bons e preço justo.
                        </div>
                      </div>
                      
                      <div>
                        <div className="flex justify-between">
                          <div className="font-medium">Ana C.</div>
                          <div className="flex">
                            {[...Array(5)].map((_, i) => (
                              <Star 
                                key={i} 
                                size={16} 
                                className={`${i < 5 ? 'text-yellow-500 fill-yellow-500' : 'text-gray-300'} mr-0.5`} 
                              />
                            ))}
                          </div>
                        </div>
                        <div className="text-gray-600 mt-1 text-sm">
                          O melhor lanche de Ceres! Recomendo o Combo Família, vale muito a pena.
                        </div>
                      </div>
                    </div>
                    
                    <Button variant="outline" className="w-full mt-6">
                      Ver Todas as Avaliações
                    </Button>
                  </Card>
                </TabsContent>
              </Tabs>
            </div>
            
            {/* Cart */}
            <div>
              <Card className="sticky top-20 p-4">
                <h3 className="font-bold text-lg mb-4 flex items-center">
                  <ShoppingCart size={18} className="mr-2" />
                  Seu Pedido
                </h3>
                
                {cart.length === 0 ? (
                  <div className="text-center py-8">
                    <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-3">
                      <ShoppingCart size={24} className="text-gray-400" />
                    </div>
                    <p className="text-gray-500">Seu carrinho está vazio</p>
                    <p className="text-sm text-gray-400 mt-1">
                      Adicione itens para fazer seu pedido
                    </p>
                  </div>
                ) : (
                  <div>
                    <div className="space-y-3 max-h-80 overflow-y-auto mb-4">
                      {cart.map(item => (
                        <div key={item.id} className="flex items-center gap-3">
                          <div className="w-16 h-16 rounded-lg overflow-hidden bg-gray-100">
                            <img 
                              src={item.image} 
                              alt={item.name} 
                              className="w-full h-full object-cover"
                            />
                          </div>
                          
                          <div className="flex-1">
                            <h4 className="font-medium">{item.name}</h4>
                            <div className="flex items-center justify-between mt-1">
                              <div className="text-orange-600 font-medium">
                                {item.price}
                              </div>
                              
                              <div className="flex items-center">
                                <button 
                                  onClick={() => removeFromCart(item.id)}
                                  className="w-7 h-7 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200 transition-colors"
                                >
                                  <Minus size={14} />
                                </button>
                                <span className="mx-2 w-6 text-center">{item.quantity}</span>
                                <button 
                                  onClick={() => addToCart(item)}
                                  className="w-7 h-7 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200 transition-colors"
                                >
                                  <Plus size={14} />
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                    
                    <div className="border-t pt-3 mb-4">
                      <div className="flex justify-between text-sm mb-1">
                        <span className="text-gray-600">Subtotal</span>
                        <span>R$ {calculateCartTotal()}</span>
                      </div>
                      <div className="flex justify-between text-sm mb-1">
                        <span className="text-gray-600">Taxa de entrega</span>
                        <span className="text-green-600">Grátis</span>
                      </div>
                      <div className="flex justify-between font-bold mt-2">
                        <span>Total</span>
                        <span>R$ {calculateCartTotal()}</span>
                      </div>
                    </div>
                    
                    <Button className="w-full bg-orange-500 hover:bg-orange-600">
                      Finalizar Pedido
                    </Button>
                  </div>
                )}
                
                <div className="mt-4 bg-orange-50 p-3 rounded-lg text-sm flex items-start">
                  <Info size={16} className="text-orange-600 mr-2 mt-0.5 flex-shrink-0" />
                  <div className="text-gray-700">
                    Pedido mínimo de <span className="font-medium">{restaurantData.minOrder}</span>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default RestaurantDetail;
