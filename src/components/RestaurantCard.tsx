
import React from 'react';
import { Link } from 'react-router-dom';
import { Star, Clock } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

interface RestaurantCardProps {
  id: number;
  name: string;
  image: string;
  rating: number;
  deliveryTime: string;
  deliveryFee: string;
  categories: string[];
  featured?: boolean;
}

const RestaurantCard: React.FC<RestaurantCardProps> = ({
  id,
  name,
  image,
  rating,
  deliveryTime,
  deliveryFee,
  categories,
  featured = false,
}) => {
  return (
    <Link to={`/restaurant/${id}`}>
      <div className={`rounded-2xl overflow-hidden bg-white shadow-sm card-hover ${
        featured ? 'border-2 border-orange-500' : 'border border-gray-100'
      }`}>
        <div className="relative">
          <img
            src={image}
            alt={name}
            className="w-full h-40 object-cover"
          />
          {featured && (
            <div className="absolute top-2 right-2">
              <Badge className="bg-orange-500 text-xs font-medium">Destaque</Badge>
            </div>
          )}
        </div>
        <div className="p-4">
          <h3 className="font-semibold text-lg mb-1">{name}</h3>
          
          <div className="flex items-center text-sm text-gray-600 mb-2">
            <div className="flex items-center">
              <Star size={16} className="text-yellow-500 mr-1 fill-yellow-500" />
              <span className="font-medium">{rating}</span>
            </div>
            <span className="mx-2">•</span>
            <div className="flex items-center">
              <Clock size={16} className="text-gray-400 mr-1" />
              <span>{deliveryTime}</span>
            </div>
          </div>
          
          <div className="flex flex-wrap gap-1 mb-3">
            {categories.map((category, index) => (
              <span 
                key={index}
                className="text-xs py-1 px-2 bg-gray-100 text-gray-700 rounded-full"
              >
                {category}
              </span>
            ))}
          </div>
          
          <div className="text-sm font-medium">
            {deliveryFee === "Grátis" ? (
              <span className="text-green-600">{deliveryFee}</span>
            ) : (
              <span>Entrega {deliveryFee}</span>
            )}
          </div>
        </div>
      </div>
    </Link>
  );
};

export default RestaurantCard;
