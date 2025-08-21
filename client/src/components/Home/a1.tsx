"use client";

import * as React from "react";
import { useState } from "react";
import {
  Heart,
  Phone,
  MessageCircle,
  MapPin,
  Bed,
  Bath,
  Square,
  Star,
  Share2,
  Eye,
  Calendar,
  User,
  ChevronLeft,
  ChevronRight,
  Building
} from "lucide-react";

// Type definitions
interface ImageCarouselProps {
  images: string[];
  currentImageIndex: number;
  onPrev: () => void;
  onNext: () => void;
  onSelectImage: (index: number) => void;
  views: number;
}

interface PropertyHeaderProps {
  type: string;
  price: number;
  currency: string;
  isFeatured?: boolean;
}

interface PropertyFeaturesProps {
  bedrooms: number;
  bathrooms: number;
  area: number;
}

interface PropertyInfoProps {
  location: string;
  agent: string;
  dateAdded: string;
  rating: number;
}

interface ActionButtonsProps {
  onCall: () => void;
  onWhatsApp: () => void;
}

interface FavoriteButtonProps {
  isFavorite: boolean;
  onToggle: () => void;
}

interface Property {
  id: string;
  title: string;
  price: number;
  currency: string;
  type: string;
  area: number;
  bedrooms: number;
  bathrooms: number;
  location: string;
  images: string[];
  featured: boolean;
  isPremium?: boolean;
  returnRate?: string;
  views: number;
  rating: number;
  dateAdded: string;
  agent: string;
}

// Image Carousel Component
const ImageCarousel: React.FC<ImageCarouselProps> = ({ 
  images, 
  currentImageIndex, 
  onPrev, 
  onNext, 
  onSelectImage, 
  views 
}) => {
  return (
    <div className="md:w-2/5 relative">
      <div className="h-64 md:h-full relative overflow-hidden">
        <img
          src={images[currentImageIndex]}
          alt="Property"
          className="w-full h-full object-cover"
        />
        
        {/* Navigation Arrows */}
        {images.length > 1 && (
          <>
            <button
              onClick={onPrev}
              className="absolute top-1/2 left-2 transform -translate-y-1/2 bg-white/90 hover:bg-white rounded-full p-2 transition-all"
            >
              <ChevronRight className="h-5 w-5 text-gray-800" />
            </button>
            <button
              onClick={onNext}
              className="absolute top-1/2 right-2 transform -translate-y-1/2 bg-white/90 hover:bg-white rounded-full p-2 transition-all"
            >
              <ChevronLeft className="h-5 w-5 text-gray-800" />
            </button>
          </>
        )}
        
        {/* Image Indicators */}
        {images.length > 1 && (
          <div className="absolute bottom-3 left-1/2 transform -translate-x-1/2 flex gap-1">
            {images.map((_, index) => (
              <button
                key={index}
                onClick={() => onSelectImage(index)}
                className={`w-2 h-2 rounded-full transition-all ${
                  index === currentImageIndex 
                    ? 'bg-blue-600 scale-125' 
                    : 'bg-white/60'
                }`}
              />
            ))}
          </div>
        )}
        
        {/* Views Counter */}
        <div className="absolute bottom-3 left-3 bg-black/70 text-white text-xs px-2 py-1 rounded-full flex items-center gap-1">
          <Eye className="h-3 w-3" />
          <span>{views} مشاهدة</span>
        </div>
      </div>
    </div>
  );
};

// Property Header Component
const PropertyHeader: React.FC<PropertyHeaderProps> = ({ type, price, currency, isFeatured }) => {
  const formatPrice = (price: number): string => {
    return price.toLocaleString();
  };

  return (
    <div className="flex justify-between items-start mb-4">
      <div>
        <span className="text-blue-600 font-medium text-sm">{type}</span>
        <h2 className="text-2xl font-bold text-gray-800">
          {formatPrice(price)} {currency}
        </h2>
        <div className="text-sm text-gray-500 mt-1">شامل الضريبة</div>
      </div>
      {isFeatured && (
        <span className="bg-blue-600 text-white px-3 py-1 rounded-full text-xs font-medium flex items-center">
          <Star className="h-3 w-3 ml-1 fill-current" />
          مميز
        </span>
      )}
    </div>
  );
};

// Property Features Component
const PropertyFeatures: React.FC<PropertyFeaturesProps> = ({ bedrooms, bathrooms, area }) => {
  return (
    <div className="grid grid-cols-3 gap-3 mb-5">
      <div className="flex flex-col items-center p-3 bg-blue-50 rounded-lg">
        <div className="bg-blue-100 p-2 rounded-full mb-2">
          <Bed className="h-5 w-5 text-blue-600" />
        </div>
        <div className="text-sm font-medium text-gray-700">{bedrooms} غرف</div>
      </div>
      <div className="flex flex-col items-center p-3 bg-blue-50 rounded-lg">
        <div className="bg-blue-100 p-2 rounded-full mb-2">
          <Bath className="h-5 w-5 text-blue-600" />
        </div>
        <div className="text-sm font-medium text-gray-700">{bathrooms} حمام</div>
      </div>
      <div className="flex flex-col items-center p-3 bg-blue-50 rounded-lg">
        <div className="bg-blue-100 p-2 rounded-full mb-2">
          <Square className="h-5 w-5 text-blue-600" />
        </div>
        <div className="text-sm font-medium text-gray-700">{area} م²</div>
      </div>
    </div>
  );
};

// Property Info Component
const PropertyInfo: React.FC<PropertyInfoProps> = ({ location, agent, dateAdded, rating }) => {
  return (
    <>
      {/* Location */}
      <div className="flex items-center gap-2 text-gray-600 mb-4 p-2 bg-gray-50 rounded-lg">
        <MapPin className="h-5 w-5 text-blue-500 flex-shrink-0" />
        <span className="text-sm">{location}</span>
      </div>
      
      {/* Additional Info */}
      <div className="grid grid-cols-2 gap-3 mb-5">
        <div className="flex items-center gap-2 text-sm text-gray-600">
          <Building className="h-4 w-4 text-blue-500" />
          <span>{agent}</span>
        </div>
        <div className="flex items-center gap-2 text-sm text-gray-600">
          <Calendar className="h-4 w-4 text-blue-500" />
          <span>أضيف منذ {dateAdded}</span>
        </div>
      </div>
      
      {/* Rating */}
      <div className="flex items-center gap-2 mb-5 text-sm text-gray-600">
        <Star className="h-4 w-4 text-yellow-400 fill-yellow-400" />
        <span>{rating} (12 تقييم)</span>
      </div>
    </>
  );
};

// Action Buttons Component
const ActionButtons: React.FC<ActionButtonsProps> = ({ onCall, onWhatsApp }) => {
  return (
    <div className="flex gap-3 mt-2">
      <button 
        onClick={onCall}
        className="flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white py-3 px-4 rounded-lg flex-1 transition-all"
      >
        <Phone className="h-5 w-5" />
        <span className="font-medium">اتصال</span>
      </button>
      <button 
        onClick={onWhatsApp}
        className="flex items-center justify-center gap-2 bg-green-600 hover:bg-green-700 text-white py-3 px-4 rounded-lg flex-1 transition-all"
      >
        <MessageCircle className="h-5 w-5" />
        <span className="font-medium">واتساب</span>
      </button>
    </div>
  );
};

// Favorite Button Component
const FavoriteButton: React.FC<FavoriteButtonProps> = ({ isFavorite, onToggle }) => {
  return (
    <button
      onClick={onToggle}
      className="absolute top-3 right-3 bg-white/90 hover:bg-white rounded-full p-2 transition-all z-10"
    >
      <Heart 
        className={`h-5 w-5 ${isFavorite ? 'fill-red-500 text-red-500' : 'text-gray-600'}`} 
      />
    </button>
  );
};

// Main Component
const HorizontalPropertyCard: React.FC = () => {
  const [isFavorite, setIsFavorite] = useState<boolean>(false);
  const [currentImageIndex, setCurrentImageIndex] = useState<number>(0);

  const property: Property = {
    id: "2",
    title: "شقة 315 متر مربع بـ 7 غرف في مجمع سكني راقي",
    price: 1150000,
    currency: "ر.س",
    type: "شقة للبيع",
    area: 315,
    bedrooms: 7,
    bathrooms: 5,
    location: "الديب، شرق الرياض، الرياض",
    images: [
      "https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=800",
      "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800",
      "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800",
    ],
    featured: true,
    isPremium: true,
    returnRate: "13.5%",
    views: 245,
    rating: 4.5,
    dateAdded: "3 أيام",
    agent: "شركة العقار المتميز"
  };

  const nextImage = (): void => {
    setCurrentImageIndex(prev => 
      prev === property.images.length - 1 ? 0 : prev + 1
    );
  };

  const prevImage = (): void => {
    setCurrentImageIndex(prev => 
      prev === 0 ? property.images.length - 1 : prev - 1
    );
  };

  const handleWhatsApp = (): void => {
    const message = `مرحبا، أريد الاستفسار عن ${property.title}`;
    const phoneNumber = "966501234567";
    const url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank');
  };

  const handleCall = (): void => {
    window.open("tel:+966501234567");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-gray-100 flex items-center justify-center p-4 font-cairo">
      <div className="max-w-4xl w-full bg-white rounded-xl overflow-hidden border border-gray-200">
        <div className="flex flex-col md:flex-row">
          {/* Image Carousel */}
          <ImageCarousel 
            images={property.images}
            currentImageIndex={currentImageIndex}
            onPrev={prevImage}
            onNext={nextImage}
            onSelectImage={setCurrentImageIndex}
            views={property.views}
          />
          
          {/* Content Section */}
          <div className="md:w-3/5 p-5 flex flex-col">
            {/* Favorite Button */}
            <FavoriteButton 
              isFavorite={isFavorite} 
              onToggle={() => setIsFavorite(!isFavorite)} 
            />
            
            {/* Property Header */}
            <PropertyHeader 
              type={property.type}
              price={property.price}
              currency={property.currency}
              isFeatured={property.featured}
            />
            
            {/* Title */}
            <h1 className="text-lg font-semibold text-gray-800 mb-4 leading-tight border-b pb-3">
              {property.title}
            </h1>
            
            {/* Property Features */}
            <PropertyFeatures 
              bedrooms={property.bedrooms}
              bathrooms={property.bathrooms}
              area={property.area}
            />
            
            {/* Property Info */}
            <PropertyInfo 
              location={property.location}
              agent={property.agent}
              dateAdded={property.dateAdded}
              rating={property.rating}
            />
            
            {/* Action Buttons */}
            <ActionButtons 
              onCall={handleCall}
              onWhatsApp={handleWhatsApp}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default HorizontalPropertyCard;