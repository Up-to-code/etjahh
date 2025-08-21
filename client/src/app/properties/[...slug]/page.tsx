"use client";

import * as React from "react";
import { useState, useEffect } from "react";
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
  Car,
  Layers,
  Building,
  Check,
  ArrowLeft,
  Ruler,
  Home,
  Shield,
  Clock,
  Loader
} from "lucide-react";

// Type definitions
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
  agent: {
    name: string;
    phone: string;
    email: string;
    profileImage: string;
    rating: number;
    propertiesSold: number;
    verified: boolean;
  };
  description: string;
  features: string[];
  amenities: string[];
  yearBuilt: number;
  parking: number;
  floors: number;
  status: string;
}

// Loading Spinner Component
const LoadingSpinner: React.FC = () => {
  return (
    <div className="flex items-center justify-center h-64">
      <Loader className="h-8 w-8 text-blue-600 animate-spin" />
    </div>
  );
};

// Skeleton Loading Components
const ImageGallerySkeleton: React.FC = () => {
  return (
    <div className="relative h-80 md:h-96 w-full rounded-xl overflow-hidden bg-gray-200 animate-pulse"></div>
  );
};

const PropertyHeaderSkeleton: React.FC = () => {
  return (
    <div className="bg-white rounded-xl p-6">
      <div className="flex flex-col md:flex-row justify-between items-start gap-4 mb-4">
        <div className="flex-1">
          <div className="h-6 w-24 bg-gray-200 rounded-full mb-3"></div>
          <div className="h-8 w-3/4 bg-gray-200 rounded-md mb-3"></div>
          <div className="h-4 w-1/2 bg-gray-200 rounded-md"></div>
        </div>
        <div className="text-left">
          <div className="h-8 w-32 bg-gray-200 rounded-md mb-2"></div>
          <div className="h-4 w-20 bg-gray-200 rounded-md"></div>
        </div>
      </div>
      <div className="flex items-center justify-between pt-4 border-t border-gray-100">
        <div className="h-4 w-20 bg-gray-200 rounded-md"></div>
        <div className="h-4 w-20 bg-gray-200 rounded-md"></div>
      </div>
    </div>
  );
};

// Back Button Component
const BackButton: React.FC = () => {
  return (
    <button className="flex items-center gap-2 text-blue-600 hover:text-blue-800 transition-colors p-2 rounded-lg hover:bg-blue-50">
      <ArrowLeft className="h-5 w-5" />
      <span className="font-medium">رجوع للقائمة</span>
    </button>
  );
};

// Image Gallery Component with improved animations
const ImageGallery: React.FC<{ images: string[] }> = ({ images }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [direction, setDirection] = useState(0); // 0: no direction, 1: next, -1: prev

  const nextImage = (): void => {
    setDirection(1);
    setCurrentImageIndex(prev => (prev === images.length - 1 ? 0 : prev + 1));
  };

  const prevImage = (): void => {
    setDirection(-1);
    setCurrentImageIndex(prev => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const goToImage = (index: number): void => {
    setDirection(index > currentImageIndex ? 1 : -1);
    setCurrentImageIndex(index);
  };

  useEffect(() => {
    // Preload images
    const loadImages = async () => {
      const promises = images.map(src => {
        return new Promise((resolve, reject) => {
          const img = new Image();
          img.src = src;
          img.onload = resolve;
          img.onerror = reject;
        });
      });

      try {
        await Promise.all(promises);
        setIsLoading(false);
      } catch (error) {
        console.error("Error loading images:", error);
        setIsLoading(false);
      }
    };

    loadImages();
  }, [images]);

  if (isLoading) {
    return <ImageGallerySkeleton />;
  }

  return (
    <div className="relative h-80 md:h-96 w-full rounded-xl overflow-hidden group">
      <div className="relative w-full h-full">
        {images.map((image, index) => (
          <img
            key={index}
            src={image}
            alt="Property"
            className={`absolute top-0 left-0 w-full h-full object-cover transition-all duration-500 ease-in-out ${
              index === currentImageIndex
                ? 'opacity-100 transform scale-100'
                : 'opacity-0 transform scale-105'
            }`}
            style={{
              transition: 'opacity 0.5s ease-in-out, transform 0.5s ease-in-out'
            }}
          />
        ))}
      </div>
      
      {/* Navigation Arrows */}
      {images.length > 1 && (
        <>
          <button
            onClick={prevImage}
            className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-white/90 hover:bg-white rounded-full p-2 transition-all opacity-0 group-hover:opacity-100 shadow-md"
            aria-label="Previous image"
          >
            <ChevronLeft className="h-5 w-5 text-gray-800" />
          </button>
          <button
            onClick={nextImage}
            className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-white/90 hover:bg-white rounded-full p-2 transition-all opacity-0 group-hover:opacity-100 shadow-md"
            aria-label="Next image"
          >
            <ChevronRight className="h-5 w-5 text-gray-800" />
          </button>
        </>
      )}
      
      {/* Image Indicators */}
      {images.length > 1 && (
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2">
          {images.map((_, index) => (
            <button
              key={index}
              onClick={() => goToImage(index)}
              className={`w-2 h-2 rounded-full transition-all ${
                index === currentImageIndex 
                  ? 'bg-white scale-125' 
                  : 'bg-white/60 hover:bg-white/80'
              }`}
              aria-label={`Go to image ${index + 1}`}
            />
          ))}
        </div>
      )}
      
      {/* Image Counter */}
      <div className="absolute top-4 right-4 bg-black/70 text-white text-sm px-3 py-1 rounded-full">
        {currentImageIndex + 1} / {images.length}
      </div>
    </div>
  );
};

// Property Header Component
const PropertyHeader: React.FC<{ 
  title: string; 
  price: number; 
  currency: string;
  location: string;
  type: string;
  views: number;
  dateAdded: string;
}> = ({ title, price, currency, location, type, views, dateAdded }) => {
  const formatPrice = (price: number): string => {
    return price.toLocaleString();
  };

  return (
    <div className="bg-white rounded-xl p-6 animate-fade-in">
      <div className="flex flex-col md:flex-row justify-between items-start gap-4 mb-4">
        <div className="flex-1">
          <span className="text-blue-600 font-medium text-sm bg-blue-50 px-3 py-1 rounded-full">{type}</span>
          <h1 className="text-2xl font-bold text-gray-800 mt-3">{title}</h1>
          <div className="flex items-center text-gray-600 text-sm mt-2">
            <MapPin className="h-4 w-4 ml-1" />
            <span>{location}</span>
          </div>
        </div>
        <div className="text-left">
          <h2 className="text-2xl font-bold text-blue-600">
            {formatPrice(price)} {currency}
          </h2>
          <div className="text-sm text-gray-500 mt-1">شامل الضريبة</div>
        </div>
      </div>
      
      <div className="flex items-center justify-between pt-4 border-t border-gray-100 text-sm text-gray-500">
        <div className="flex items-center">
          <Eye className="h-4 w-4 ml-1" />
          <span>{views} مشاهدة</span>
        </div>
        <div className="flex items-center">
          <Calendar className="h-4 w-4 ml-1" />
          <span>أضيف {dateAdded}</span>
        </div>
      </div>
    </div>
  );
};

// Property Features Component
const PropertyFeatures: React.FC<{
  bedrooms: number;
  bathrooms: number;
  area: number;
  parking: number;
  floors: number;
  yearBuilt: number;
}> = ({ bedrooms, bathrooms, area, parking, floors, yearBuilt }) => {
  const features = [
    { icon: Bed, label: "غرف نوم", value: bedrooms },
    { icon: Bath, label: "حمامات", value: bathrooms },
    { icon: Square, label: "المساحة", value: `${area} م²` },
    { icon: Car, label: "مواقف سيارات", value: parking },
    { icon: Layers, label: "الطوابق", value: floors },
    { icon: Building, label: "سنة البناء", value: yearBuilt },
  ];

  return (
    <div className="bg-white rounded-xl p-6 animate-fade-in">
      <h2 className="text-xl font-bold text-gray-800 mb-6">مواصفات العقار</h2>
      
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {features.map(({ icon: Icon, label, value }, index) => (
          <div 
            key={index} 
            className="flex flex-col items-center p-4 bg-gray-50 rounded-lg transition-all hover:shadow-md hover:scale-[1.02]"
            style={{ transitionDelay: `${index * 100}ms` }}
          >
            <div className="bg-blue-100 p-2 rounded-full mb-3">
              <Icon className="h-5 w-5 text-blue-600" />
            </div>
            <span className="text-sm font-medium text-gray-700">{value}</span>
            <span className="text-xs text-gray-500 mt-1">{label}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

// Property Description Component
const PropertyDescription: React.FC<{
  description: string;
  features: string[];
  amenities: string[];
}> = ({ description, features, amenities }) => {
  return (
    <div className="bg-white rounded-xl p-6 animate-fade-in">
      <h2 className="text-xl font-bold text-gray-800 mb-4">تفاصيل العقار</h2>
      
      <p className="text-gray-700 leading-relaxed mb-6">{description}</p>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <h3 className="text-lg font-semibold text-gray-800 mb-3 flex items-center">
            <Check className="h-5 w-5 text-green-600 ml-2" />
            مميزات العقار
          </h3>
          <div className="space-y-2">
            {features.map((feature, index) => (
              <div 
                key={index} 
                className="flex items-center text-gray-700 transition-all hover:translate-x-1"
                style={{ transitionDelay: `${index * 50}ms` }}
              >
                <div className="w-2 h-2 bg-blue-600 rounded-full ml-2"></div>
                <span className="text-sm">{feature}</span>
              </div>
            ))}
          </div>
        </div>
        
        <div>
          <h3 className="text-lg font-semibold text-gray-800 mb-3 flex items-center">
            <Check className="h-5 w-5 text-green-600 ml-2" />
            المرافق المتاحة
          </h3>
          <div className="space-y-2">
            {amenities.map((amenity, index) => (
              <div 
                key={index} 
                className="flex items-center text-gray-700 transition-all hover:translate-x-1"
                style={{ transitionDelay: `${index * 50}ms` }}
              >
                <div className="w-2 h-2 bg-blue-600 rounded-full ml-2"></div>
                <span className="text-sm">{amenity}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

// Agent Contact Component
const AgentContact: React.FC<{ agent: Property['agent'] }> = ({ agent }) => {
  const [isFavorite, setIsFavorite] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleFavoriteClick = async () => {
    setIsLoading(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 500));
    setIsFavorite(!isFavorite);
    setIsLoading(false);
  };

  return (
    <div className="bg-white rounded-xl p-6 animate-fade-in">
      <h2 className="text-xl font-bold text-gray-800 mb-4">تواصل مع الوسيط</h2>
      
      <div className="flex items-center gap-4 mb-6">
        <div className="relative">
          <div className="w-16 h-16 rounded-full overflow-hidden">
            <img
              src={agent.profileImage}
              alt={agent.name}
              className="w-full h-full object-cover transition-all hover:scale-110"
            />
          </div>
          {agent.verified && (
            <div className="absolute -bottom-1 -right-1 bg-blue-600 rounded-full p-1">
              <Shield className="h-3 w-3 text-white" />
            </div>
          )}
        </div>
        <div>
          <h3 className="font-bold text-gray-800">{agent.name}</h3>
          <div className="flex items-center mt-1">
            <div className="flex">
              {[1, 2, 3, 4, 5].map((star) => (
                <Star
                  key={star}
                  className={`h-4 w-4 ${
                    star <= Math.floor(agent.rating)
                      ? 'fill-yellow-400 text-yellow-400'
                      : 'text-gray-300'
                  }`}
                />
              ))}
            </div>
            <span className="text-sm text-gray-600 mr-2">{agent.rating}</span>
          </div>
          <div className="text-sm text-gray-500 mt-1">{agent.propertiesSold} عقار مباع</div>
        </div>
      </div>
      
      <div className="space-y-3">
        <button className="w-full flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white py-3 px-4 rounded-lg transition-all hover:scale-[1.02] font-medium">
          <Phone className="h-5 w-5" />
          <span>اتصال</span>
        </button>
        
        <button className="w-full flex items-center justify-center gap-2 bg-green-600 hover:bg-green-700 text-white py-3 px-4 rounded-lg transition-all hover:scale-[1.02] font-medium">
          <MessageCircle className="h-5 w-5" />
          <span>واتساب</span>
        </button>
        
        <button className="w-full flex items-center justify-center gap-2 border border-gray-300 hover:bg-gray-50 text-gray-700 py-3 px-4 rounded-lg transition-all hover:scale-[1.02]">
          <User className="h-5 w-5" />
          <span>عرض الملف الشخصي</span>
        </button>
      </div>
      
      <div className="flex gap-2 mt-6 pt-6 border-t border-gray-100">
        <button 
          onClick={handleFavoriteClick}
          disabled={isLoading}
          className="flex-1 flex items-center justify-center gap-2 border border-gray-300 hover:bg-gray-50 text-gray-700 py-2 px-4 rounded-lg transition-all disabled:opacity-50"
        >
          {isLoading ? (
            <Loader className="h-5 w-5 animate-spin" />
          ) : (
            <Heart className={`h-5 w-5 ${isFavorite ? 'fill-red-500 text-red-500' : ''}`} />
          )}
          <span>حفظ</span>
        </button>
        
        <button className="flex-1 flex items-center justify-center gap-2 border border-gray-300 hover:bg-gray-50 text-gray-700 py-2 px-4 rounded-lg transition-all hover:scale-[1.02]">
          <Share2 className="h-5 w-5" />
          <span>مشاركة</span>
        </button>
      </div>
    </div>
  );
};

// Ad Banner Component
const AdBanner: React.FC = () => {
  return (
    <div className="bg-gradient-to-r from-blue-600 to-blue-800 rounded-xl p-4 text-white animate-fade-in">
      <div className="flex flex-col md:flex-row items-center justify-between">
        <div className="mb-4 md:mb-0">
          <h3 className="font-bold text-lg">ابحث عن منزل أحلامك</h3>
          <p className="text-sm opacity-90">أكثر من 10,000 عقار متاح للبيع والإيجار</p>
        </div>
        <button className="bg-white text-blue-600 px-4 py-2 rounded-lg font-medium hover:bg-blue-50 transition-all hover:scale-105">
          تصفح العقارات
        </button>
      </div>
    </div>
  );
};

// Map Section Component
const MapSection: React.FC<{ location: string }> = ({ location }) => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate map loading
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="bg-white rounded-xl p-6 animate-fade-in">
      <h2 className="text-xl font-bold text-gray-800 mb-4">الموقع</h2>
      
      {isLoading ? (
        <div className="h-64 bg-gray-100 rounded-lg flex items-center justify-center">
          <Loader className="h-8 w-8 text-blue-600 animate-spin" />
        </div>
      ) : (
        <>
          <div className="h-64 bg-gray-100 rounded-lg flex items-center justify-center relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-gray-100"></div>
            <div className="relative z-10 text-center text-gray-500">
              <MapPin className="h-12 w-12 mx-auto mb-2 text-blue-600" />
              <p className="font-medium">{location}</p>
              <p className="text-sm mt-1">خريطة تفاعلية للموقع</p>
            </div>
          </div>
          
          <button className="w-full mt-4 bg-gray-100 hover:bg-gray-200 text-gray-700 py-3 rounded-lg transition-all hover:scale-[1.02] font-medium">
            عرض الاتجاهات
          </button>
        </>
      )}
    </div>
  );
};

// Similar Properties Component
const SimilarProperties: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate data loading
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  const properties = [
    {
      id: 1,
      title: "شقة فاخرة في حي الصحافة",
      price: 850000,
      currency: "ر.س",
      type: "شقة للبيع",
      area: 180,
      bedrooms: 3,
      bathrooms: 2,
      image: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=400"
    },
    {
      id: 2,
      title: "فيلا راقية في حي الربيع",
      price: 2100000,
      currency: "ر.س",
      type: "فيلا للبيع",
      area: 420,
      bedrooms: 5,
      bathrooms: 4,
      image: "https://images.unsplash.com/photo-1613977257363-707ba9348227?w=400"
    },
    {
      id: 3,
      title: "شقة حديثة في حي النخيل",
      price: 720000,
      currency: "ر.س",
      type: "شقة للبيع",
      area: 150,
      bedrooms: 2,
      bathrooms: 2,
      image: "https://images.unsplash.com/photo-1574362848149-11496d93a7c7?w=400"
    }
  ];

  if (isLoading) {
    return (
      <div className="bg-white rounded-xl p-6">
        <h2 className="text-xl font-bold text-gray-800 mb-6">عقارات مشابهة</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3].map(item => (
            <div key={item} className="border border-gray-200 rounded-lg overflow-hidden">
              <div className="h-48 bg-gray-200 animate-pulse"></div>
              <div className="p-4">
                <div className="h-4 bg-gray-200 rounded mb-2"></div>
                <div className="flex justify-between items-center mb-3">
                  <div className="h-4 w-16 bg-gray-200 rounded"></div>
                  <div className="h-6 w-24 bg-gray-200 rounded"></div>
                </div>
                <div className="flex gap-4">
                  <div className="h-4 w-12 bg-gray-200 rounded"></div>
                  <div className="h-4 w-12 bg-gray-200 rounded"></div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl p-6 animate-fade-in">
      <h2 className="text-xl font-bold text-gray-800 mb-6">عقارات مشابهة</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {properties.map(property => (
          <div 
            key={property.id} 
            className="border border-gray-200 rounded-lg overflow-hidden hover:shadow-md transition-all duration-300 hover:scale-[1.02]"
          >
            <div className="h-48 relative">
              <img
                src={property.image}
                alt={property.title}
                className="w-full h-full object-cover transition-all duration-300 hover:scale-105"
              />
              <div className="absolute top-3 left-3">
                <span className="bg-blue-600 text-white px-2 py-1 rounded text-xs font-medium">
                  {property.type}
                </span>
              </div>
            </div>
            
            <div className="p-4">
              <h3 className="text-sm font-medium text-gray-800 mb-2 line-clamp-1">{property.title}</h3>
              
              <div className="flex justify-between items-center mb-3">
                <span className="text-blue-600 text-sm font-medium">{property.area} م²</span>
                <span className="text-lg font-bold text-gray-800">
                  {property.price.toLocaleString()} {property.currency}
                </span>
              </div>
              
              <div className="flex items-center gap-4 text-xs text-gray-600">
                <div className="flex items-center gap-1">
                  <Bed className="h-3 w-3" />
                  <span>{property.bedrooms}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Bath className="h-3 w-3" />
                  <span>{property.bathrooms}</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// Main Property Details Component
const PropertyDetails: React.FC<{ property: Property }> = ({ property }) => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate initial loading
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 font-cairo">
        <div className="container mx-auto px-4 py-6">
          <BackButton />
        </div>
        
        <div className="container mx-auto px-4 pb-12">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-6">
              <ImageGallerySkeleton />
              <PropertyHeaderSkeleton />
              <div className="bg-white rounded-xl p-6">
                <div className="h-6 w-32 bg-gray-200 rounded-md mb-6"></div>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {[1, 2, 3, 4, 5, 6].map(item => (
                    <div key={item} className="flex flex-col items-center p-4 bg-gray-50 rounded-lg">
                      <div className="bg-gray-200 p-2 rounded-full mb-3 h-9 w-9"></div>
                      <div className="h-4 w-12 bg-gray-200 rounded-md mb-1"></div>
                      <div className="h-3 w-16 bg-gray-200 rounded-md"></div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            
            <div className="space-y-6">
              <div className="bg-white rounded-xl p-6">
                <div className="h-6 w-40 bg-gray-200 rounded-md mb-4"></div>
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-16 h-16 bg-gray-200 rounded-full"></div>
                  <div>
                    <div className="h-4 w-24 bg-gray-200 rounded-md mb-2"></div>
                    <div className="h-3 w-32 bg-gray-200 rounded-md"></div>
                  </div>
                </div>
                <div className="space-y-3">
                  <div className="h-12 bg-gray-200 rounded-lg"></div>
                  <div className="h-12 bg-gray-200 rounded-lg"></div>
                  <div className="h-12 bg-gray-200 rounded-lg"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 font-cairo">
      <div className="container mx-auto px-4 py-6">
        <BackButton />
      </div>
      
      <div className="container mx-auto px-4 pb-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            <ImageGallery images={property.images} />
            <PropertyHeader
              title={property.title}
              price={property.price}
              currency={property.currency}
              location={property.location}
              type={property.type}
              views={property.views}
              dateAdded={property.dateAdded}
            />
            <PropertyFeatures
              bedrooms={property.bedrooms}
              bathrooms={property.bathrooms}
              area={property.area}
              parking={property.parking}
              floors={property.floors}
              yearBuilt={property.yearBuilt}
            />
            <PropertyDescription
              description={property.description}
              features={property.features}
              amenities={property.amenities}
            />
            
            {/* Ad Banner */}
            <AdBanner />
            
            {/* Similar Properties */}
            <SimilarProperties />
          </div>
          
          {/* Sidebar */}
          <div className="space-y-6">
            <AgentContact agent={property.agent} />
            <MapSection location={property.location} />
            
            {/* Premium Ad */}
            <div className="bg-gradient-to-br from-amber-500 to-amber-600 rounded-xl p-6 text-white animate-fade-in">
              <div className="text-center">
                <Star className="h-8 w-8 mx-auto mb-3 fill-white" />
                <h3 className="font-bold text-lg mb-2">ترقية إلى مميز بلس</h3>
                <p className="text-sm opacity-90 mb-4">اجعل عقارك يظهر في المقدمة ويحصل على 10x المشاهدات</p>
                <button className="bg-white text-amber-600 px-4 py-2 rounded-lg font-medium hover:bg-amber-50 transition-all hover:scale-105">
                  ترقية الآن
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Add CSS for animations */}
      <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in {
          animation: fadeIn 0.5s ease-out forwards;
        }
      `}</style>
    </div>
  );
};

// Main Property Page Component
const PropertyPage: React.FC = () => {
  // Sample property data
  const property: Property = {
    id: "1",
    title: "شقة فاخرة بمساحة 315 متر مربع بـ 7 غرف في مجمع سكني راقي",
    price: 1150000,
    currency: "ر.س",
    type: "شقة للبيع",
    area: 315,
    bedrooms: 7,
    bathrooms: 5,
    location: "حي الدبلوماسيين، الرياض",
    images: [
      "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800",
      "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800",
      "https://images.unsplash.com/photo-1560448204-603b3fc33ddc?w=800",
      "https://images.unsplash.com/photo-1613977257363-707ba9348227?w=800"
    ],
    featured: true,
    isPremium: true,
    returnRate: "13.5%",
    views: 245,
    rating: 4.7,
    dateAdded: "3 أيام",
    agent: {
      name: "أحمد السعدي",
      phone: "+966501234567",
      email: "ahmed@realestate.com",
      profileImage: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300",
      rating: 4.8,
      propertiesSold: 127,
      verified: true
    },
    description: "شقة فاخرة في مجمع سكني راقي في حي الدبلوماسيين، تتميز بمساحة واسعة وتصميم حديث. الشقة تشمل 7 غرف نوم و5 حمامات وصالة كبيرة ومطبخ مجهز بأحدث الأجهزة. الموقع ممتاز بالقرب من الخدمات والمرافق العامة. الشقة جاهزة للسكن الفوري وتتميز بإطلالة رائعة وتجهيزات عالية الجودة.",
    features: [
      "تصميم حديث وفسيح",
      "إطلالة رائعة",
      "تشطيب فاخر",
      "نظام أمن متكامل",
      "مدخل رئيسي فاخر",
      "أسقف عالية",
      "نوافذ كبيرة",
      "تكييف مركزي"
    ],
    amenities: [
      "مواقف سيارات تحت الأرض",
      "صالة رياضية",
      "مسابح",
      "حدائق مشتركة",
      "ملاعب أطفال",
      "غرف اجتماعات",
      "نظام أمن 24/7",
      "خدمة صيانة"
    ],
    yearBuilt: 2022,
    parking: 2,
    floors: 2,
    status: "للبيع"
  };

  return <PropertyDetails property={property} />;
};

export default PropertyPage;