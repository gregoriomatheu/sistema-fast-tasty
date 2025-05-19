
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ShoppingCart, Menu, X, MapPin, User, Search } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 bg-white shadow-md z-50">
      <div className="container-custom py-3 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center">
          <h1 className="text-2xl font-bold text-orange-500">
            Fast<span className="text-orange-700">Tasty</span>
          </h1>
        </Link>

        {/* Location - Desktop */}
        <div className="hidden md:flex items-center gap-1 text-sm">
          <MapPin size={16} className="text-orange-500" />
          <span>Ceres, GO</span>
        </div>

        {/* Search Input - Desktop */}
        <div className="hidden md:block relative w-1/3">
          <input
            type="text"
            placeholder="Buscar restaurantes ou pratos..."
            className="w-full py-2 px-4 pr-10 bg-gray-100 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-orange-500"
          />
          <Search size={18} className="absolute right-3 top-2.5 text-gray-400" />
        </div>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-4">
          <Button variant="ghost" size="sm" className="text-gray-700">
            <User size={20} className="mr-1" />
            Entrar
          </Button>
          <Link to="/cart">
            <Button variant="outline" size="sm" className="border-orange-500 text-orange-500">
              <ShoppingCart size={20} className="mr-1" />
              Carrinho
            </Button>
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden text-gray-700 focus:outline-none"
        >
          {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden animate-slide-in fixed top-16 right-0 w-3/4 h-screen bg-white shadow-lg z-50">
          <div className="p-4 flex flex-col gap-4">
            <div className="flex items-center gap-2 px-2 py-3 bg-gray-100 rounded-lg">
              <MapPin size={18} className="text-orange-500" />
              <span className="text-sm">Ceres, GO</span>
            </div>
            
            <div className="relative mt-2">
              <input
                type="text"
                placeholder="Buscar restaurantes..."
                className="w-full py-2 px-4 pr-10 bg-gray-100 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-orange-500"
              />
              <Search size={18} className="absolute right-3 top-2.5 text-gray-400" />
            </div>
            
            <Link to="/login" className="flex items-center gap-2 px-2 py-3 hover:bg-gray-100 rounded-lg">
              <User size={20} className="text-orange-500" />
              <span>Entrar ou Cadastrar</span>
            </Link>
            
            <Link to="/cart" className="flex items-center gap-2 px-2 py-3 hover:bg-gray-100 rounded-lg">
              <ShoppingCart size={20} className="text-orange-500" />
              <span>Carrinho</span>
            </Link>

            <hr className="my-2" />

            <Link to="/" className="px-2 py-3 hover:bg-gray-100 rounded-lg">Início</Link>
            <Link to="/restaurants" className="px-2 py-3 hover:bg-gray-100 rounded-lg">Restaurantes</Link>
            <Link to="/orders" className="px-2 py-3 hover:bg-gray-100 rounded-lg">Meus Pedidos</Link>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
