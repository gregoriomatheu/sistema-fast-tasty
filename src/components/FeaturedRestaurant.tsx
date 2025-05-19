
import React from 'react';
import { Link } from 'react-router-dom';
import { Star, Clock } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

interface FeaturedRestaurantProps {
  id: number;
  name: string;
  image: string;
  coverImage: string;
  logo: string;
  rating: number;
  deliveryTime: string;
  deliveryFee: string;
  categories: string[];
  description: string;
}

const FeaturedRestaurant: React.FC<FeaturedRestaurantProps> = ({
  id,
  name,
  image,
  coverImage,
  logo,
  rating,
  deliveryTime,
  deliveryFee,
  categories,
  description,
}) => {
  return (
    <div className="mb-8">
      <div className="rounded-3xl overflow-hidden shadow-md relative">
        {/* Cover Image */}
        <div className="relative h-48 md:h-64 w-full">
          <img
            src={coverImage}
            alt={`${name} cover`}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
          
          <div className="absolute bottom-0 left-0 w-full p-6 text-white">
            <Badge className="bg-orange-500 mb-2">Patrocinado</Badge>
            <h2 className="text-2xl md:text-3xl font-bold">{name}</h2>
            
            <div className="flex items-center text-sm my-2">
              <div className="flex items-center">
                <Star size={16} className="text-yellow-500 mr-1 fill-yellow-500" />
                <span className="font-medium">{rating}</span>
              </div>
              <span className="mx-2">•</span>
              <div className="flex items-center">
                <Clock size={16} className="text-gray-200 mr-1" />
                <span>{deliveryTime}</span>
              </div>
              <span className="mx-2">•</span>
              <span>
                {deliveryFee === "Grátis" ? (
                  <span className="text-green-400">{deliveryFee}</span>
                ) : (
                  <span>Entrega {deliveryFee}</span>
                )}
              </span>
            </div>
            
            <div className="flex flex-wrap gap-1 mb-3">
              {categories.map((category, index) => (
                <span 
                  key={index}
                  className="text-xs py-1 px-2 bg-white/20 rounded-full"
                >
                  {category}
                </span>
              ))}
            </div>
            
            <p className="text-sm text-gray-200 mb-4 max-w-xl hidden md:block">{description}</p>
            
            <Link to={`/restaurant/${id}`}>
              <Button className="bg-orange-500 hover:bg-orange-600 text-white">
                Ver Cardápio
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeaturedRestaurant;
