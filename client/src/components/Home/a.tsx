"use client";
import { useState } from "react";
import {
  Heart,
  Phone,
  MessageCircle,
  MapPin,
  Bed,
  Bath,
  Square,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

interface Property {
  id: string;
  title: string;
  price: number;
  currency: string;
  type: string;
  area: number;
  bedrooms?: number;
  bathrooms?: number;
  location: string;
  images: string[];
  featured: boolean;
  returnRate?: string;
}

interface PropertyCardProps {
  property: Property;
}

// Image slider component for better separation of concerns
const ImageSlider = ({ 
  images, 
  currentIndex, 
  onNext, 
  onPrev, 
  onSelect 
}: {
  images: string[];
  currentIndex: number;
  onNext: () => void;
  onPrev: () => void;
  onSelect: (index: number) => void;
}) => (
  <div className="relative">
    <div className="w-full h-48 relative overflow-hidden">
      <img
        src={images[currentIndex]}
        alt={`Property image ${currentIndex + 1}`}
        className="w-full h-48 object-cover transition-transform duration-300"
      />

      {images.length > 1 && (
        <>
          <button
            onClick={onPrev}
            className="absolute top-1/2 left-2 -translate-y-1/2 bg-white/80 p-1 rounded-full shadow-sm hover:bg-white transition"
            aria-label="Previous image"
          >
            <ChevronLeft className="h-4 w-4 text-gray-700" />
          </button>
          <button
            onClick={onNext}
            className="absolute top-1/2 right-2 -translate-y-1/2 bg-white/80 p-1 rounded-full shadow-sm hover:bg-white transition"
            aria-label="Next image"
          >
            <ChevronRight className="h-4 w-4 text-gray-700" />
          </button>

          <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1">
            {images.map((_, index) => (
              <button
                key={index}
                onClick={() => onSelect(index)}
                className={`w-2 h-2 rounded-full transition-colors ${
                  index === currentIndex ? 'bg-white' : 'bg-white/50'
                }`}
                aria-label={`Go to image ${index + 1}`}
              />
            ))}
          </div>
        </>
      )}
    </div>
  </div>
);

// Property features component
const PropertyFeatures = ({ property }: { property: Property }) => (
  <div className="flex items-center gap-3 text-gray-600 text-xs mb-4">
    <div className="flex items-center gap-1">
      <Square className="h-3 w-3" />
      <span>{property.area} م²</span>
    </div>
    {property.bedrooms && (
      <div className="flex items-center gap-1">
        <Bed className="h-3 w-3" />
        <span>{property.bedrooms}</span>
      </div>
    )}
    {property.bathrooms && (
      <div className="flex items-center gap-1">
        <Bath className="h-3 w-3" />
        <span>{property.bathrooms}</span>
      </div>
    )}
  </div>
);

const PropertyCard: React.FC<PropertyCardProps> = ({ property }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isFavorite, setIsFavorite] = useState(false);

  const nextImage = () => {
    setCurrentImageIndex(prev => 
      prev === property.images.length - 1 ? 0 : prev + 1
    );
  };

  const prevImage = () => {
    setCurrentImageIndex(prev => 
      prev === 0 ? property.images.length - 1 : prev - 1
    );
  };

  const formatPrice = (price: number) => {
    return price.toLocaleString();
  };

  const handleWhatsApp = () => {
    const message = `مرحبا، أريد الاستفسار عن ${property.title}`;
    const phoneNumber = "966501234567";
    const url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank');
  };

  const handleCall = () => {
    window.open("tel:+966501234567");
  };

  return (
    <div className="bg-white rounded-lg border border-gray-200 overflow-hidden shadow-md max-w-sm">
      {/* Image Section */}
      <div className="relative">
        <ImageSlider 
          images={property.images}
          currentIndex={currentImageIndex}
          onNext={nextImage}
          onPrev={prevImage}
          onSelect={setCurrentImageIndex}
        />

        {/* Favorite Button */}
        <button
          onClick={() => setIsFavorite(!isFavorite)}
          aria-label="Add to favorites"
          className="absolute top-3 right-3 bg-white/90 p-1.5 rounded-full hover:bg-white transition z-10"
        >
          <Heart className={`h-4 w-4 ${isFavorite ? 'text-red-500 fill-current' : 'text-gray-600'}`} />
        </button>

        {/* Price Badge */}
        <div className="absolute bottom-3 right-3 bg-black/75 text-white px-2 py-1 rounded text-sm">
          {formatPrice(property.price)} {property.currency}
        </div>

        {/* Featured Badge */}
        {property.featured && (
          <div className="absolute top-3 left-3 bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs">
            مميز
          </div>
        )}

        {/* Return Rate Badge */}
        {property.returnRate && (
          <div className="absolute top-12 left-3 bg-green-100 text-green-700 px-2 py-1 rounded text-xs">
            عائد {property.returnRate}
          </div>
        )}
      </div>

      {/* Content Section */}
      <div className="p-4">
        <div className="text-xs text-gray-500 mb-1">
          {property.type}
        </div>

        <h3 className="text-sm font-medium text-gray-900 mb-2 line-clamp-2">
          {property.title}
        </h3>

        <div className="flex items-center text-gray-500 text-xs mb-3">
          <MapPin className="h-3 w-3 ml-1 flex-shrink-0" />
          <span className="truncate">{property.location}</span>
        </div>

        <PropertyFeatures property={property} />

        <div className="flex gap-2">
          <button 
            onClick={handleWhatsApp}
            className="flex items-center justify-center gap-1 bg-green-600 text-white py-2 px-3 rounded text-xs flex-1 hover:bg-green-700 transition"
          >
            <MessageCircle className="h-3 w-3" />
            واتساب
          </button>
          <button 
            onClick={handleCall}
            className="flex items-center justify-center gap-1 text-purple-600 py-2 px-3 rounded text-xs flex-1 hover:bg-purple-50 transition border border-purple-200"
          >
            <Phone className="h-3 w-3" />
            اتصال
          </button>
        </div>
      </div>
    </div>
  );
};

// Mock data for demonstration
const mockProperties: Property[] = [
  {
    id: "1",
    title: "أرض 400 متر مربع غربية على شارع 15م",
    price: 600000,
    currency: "ر.س",
    type: "أرض للبيع",
    area: 400,
    location: "المفيصل، جنوب جدة، جدة",
    images: [
      "https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=800",
      "https://images.unsplash.com/photo-1507089947368-19c1da9775ae?w=800",
      "https://images.unsplash.com/photo-1518780664697-55e3ad937233?w=800",
    ],
    featured: true,
  },
  {
    id: "2",
    title: "شقة 315 متر مربع ب 7 غرف",
    price: 1150000,
    currency: "ر.س",
    type: "شقة للبيع",
    area: 315,
    bedrooms: 7,
    bathrooms: 5,
    location: "الجنادية، شرق الرياض، الرياض",
    images: [
      "https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=800",
      "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800",
      "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800",
    ],
    featured: false,
    returnRate: "13.5%",
  },
  {
    id: "3",
    title: "فيلا دورين مع حديقة واسعة",
    price: 2800000,
    currency: "ر.س",
    type: "فيلا للبيع",
    area: 450,
    bedrooms: 5,
    bathrooms: 4,
    location: "حي الملك فهد، شمال الرياض، الرياض",
    images: [
      "https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=800",
      "https://images.unsplash.com/photo-1605146769289-440113cc3d00?w=800",
      "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800",
    ],
    featured: true,
    returnRate: "8.2%",
  },
];

// Demo component showing multiple cards
const PropertyCardDemo = () => {
  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-2xl font-bold text-gray-900 mb-6 text-center">
        العقارات المتاحة
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
        {mockProperties.map((property) => (
          <PropertyCard key={property.id} property={property} />
        ))}
      </div>
    </div>
  );
};

export default PropertyCardDemo;