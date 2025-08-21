"use client";

import * as React from "react";
import { useState } from "react";
import {
  Phone,
  MessageCircle,
  Mail,
  MapPin,
  Star,
  User,
  Shield,
  Briefcase,
  Heart,
  Eye,
  Bed,
  Bath,
  Square,
  Check,
  ChevronLeft,
  ChevronRight
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
  views: number;
  rating: number;
  dateAdded: string;
}

interface Agent {
  id: string;
  name: string;
  title: string;
  profileImage: string;
  phone: string;
  email: string;
  description: string;
  experience: string;
  propertiesSold: number;
  rating: number;
  reviews: number;
  languages: string[];
  specialties: string[];
  address: string;
  activeListings: Property[];
}

// Property Card Component
const PropertyCard: React.FC<{ property: Property }> = ({ property }) => {
  const [isFavorite, setIsFavorite] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const formatPrice = (price: number): string => {
    return price.toLocaleString();
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

  return (
    <div className="bg-white rounded-xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-md transition-all duration-300">
      {/* Image Section */}
      <div className="relative h-48">
        <img
          src={property.images[currentImageIndex]}
          alt={property.title}
          className="w-full h-full object-cover"
        />
        
        {/* Badge */}
        {property.featured && (
          <div className="absolute top-3 left-3">
            <span className="bg-blue-600 text-white px-2 py-1 rounded-lg text-xs font-medium">
              مميز
            </span>
          </div>
        )}
        
        {/* Favorite Button */}
        <button
          onClick={() => setIsFavorite(!isFavorite)}
          className="absolute top-3 right-3 bg-white/90 hover:bg-white rounded-full p-2 transition-all"
        >
          <Heart 
            className={`h-4 w-4 ${isFavorite ? 'fill-red-500 text-red-500' : 'text-gray-600'}`} 
          />
        </button>
        
        {/* Image Navigation */}
        {property.images.length > 1 && (
          <>
            <button
              onClick={prevImage}
              className="absolute top-1/2 left-2 transform -translate-y-1/2 bg-white/90 hover:bg-white rounded-full p-1 transition-all"
            >
              <ChevronRight className="h-4 w-4 text-gray-800" />
            </button>
            <button
              onClick={nextImage}
              className="absolute top-1/2 right-2 transform -translate-y-1/2 bg-white/90 hover:bg-white rounded-full p-1 transition-all"
            >
              <ChevronLeft className="h-4 w-4 text-gray-800" />
            </button>
          </>
        )}
      </div>
      
      {/* Content Section */}
      <div className="p-4">
        <div className="flex justify-between items-start mb-2">
          <span className="text-blue-600 text-sm font-medium">{property.type}</span>
          <span className="text-lg font-bold text-gray-800">
            {formatPrice(property.price)} {property.currency}
          </span>
        </div>
        
        <h3 className="text-sm font-medium text-gray-800 mb-3 line-clamp-1">{property.title}</h3>
        
        <div className="flex items-center gap-4 text-xs text-gray-600 mb-3">
          <div className="flex items-center gap-1">
            <Bed className="h-3 w-3" />
            <span>{property.bedrooms}</span>
          </div>
          <div className="flex items-center gap-1">
            <Bath className="h-3 w-3" />
            <span>{property.bathrooms}</span>
          </div>
          <div className="flex items-center gap-1">
            <Square className="h-3 w-3" />
            <span>{property.area} م²</span>
          </div>
        </div>
        
        <div className="flex items-center gap-1 text-xs text-gray-500 mb-3">
          <MapPin className="h-3 w-3" />
          <span className="line-clamp-1">{property.location}</span>
        </div>
        
        <div className="flex justify-between items-center">
          <span className="text-xs text-gray-500">أضيف {property.dateAdded}</span>
          <div className="flex items-center gap-1">
            <Eye className="h-3 w-3 text-gray-400" />
            <span className="text-xs text-gray-500">{property.views}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

// Agent Header Component
const AgentHeader: React.FC<{ agent: Pick<Agent, 'name' | 'title' | 'profileImage' | 'rating' | 'reviews'> }> = ({ agent }) => {
  return (
    <div className="bg-white border-b border-gray-200">
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row items-center gap-6">
          {/* Profile Image */}
          <div className="flex-shrink-0">
            <div className="w-24 h-24 rounded-full overflow-hidden border-4 border-white shadow-lg">
              <img
                src={agent.profileImage}
                alt={agent.name}
                className="w-full h-full object-cover"
              />
            </div>
          </div>
          
          {/* Agent Details */}
          <div className="flex-grow text-center md:text-right">
            <h1 className="text-2xl font-bold text-gray-800">{agent.name}</h1>
            <p className="text-gray-600 mt-1">{agent.title}</p>
            
            <div className="flex items-center justify-center md:justify-end gap-2 mt-3">
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
              <span className="text-sm text-gray-600">{agent.rating} ({agent.reviews} تقييم)</span>
            </div>
          </div>
          
          {/* Contact Buttons */}
          <div className="flex flex-wrap gap-2 justify-center">
            <button className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors">
              <Phone className="h-4 w-4" />
              <span>اتصال</span>
            </button>
            <button className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg transition-colors">
              <MessageCircle className="h-4 w-4" />
              <span>واتساب</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

// Agent Stats Component
const AgentStats: React.FC<{ 
  propertiesSold: number; 
  activeListings: number; 
  experience: string; 
  languages: number 
}> = ({ propertiesSold, activeListings, experience, languages }) => {
  return (
    <div className="bg-white rounded-xl p-6 mb-6">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        <div className="text-center">
          <div className="text-2xl font-bold text-blue-600">{propertiesSold}+</div>
          <p className="text-sm text-gray-600 mt-1">عقارات مباعة</p>
        </div>
        <div className="text-center">
          <div className="text-2xl font-bold text-blue-600">{activeListings}</div>
          <p className="text-sm text-gray-600 mt-1">قائمة نشطة</p>
        </div>
        <div className="text-center">
          <div className="text-2xl font-bold text-blue-600">{experience}</div>
          <p className="text-sm text-gray-600 mt-1">سنوات الخبرة</p>
        </div>
        <div className="text-center">
          <div className="text-2xl font-bold text-blue-600">{languages}</div>
          <p className="text-sm text-gray-600 mt-1">اللغات</p>
        </div>
      </div>
    </div>
  );
};

// Contact Info Component
const ContactInfo: React.FC<{ 
  phone: string; 
  email: string; 
  address: string; 
  specialties: string[] 
}> = ({ phone, email, address, specialties }) => {
  return (
    <div className="bg-white rounded-xl p-6 mb-6">
      <h2 className="text-lg font-bold text-gray-800 mb-4">معلومات الاتصال</h2>
      
      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <Phone className="h-4 w-4 text-blue-600" />
          <span className="text-gray-700">{phone}</span>
        </div>
        
        <div className="flex items-center gap-2">
          <Mail className="h-4 w-4 text-blue-600" />
          <span className="text-gray-700">{email}</span>
        </div>
        
        <div className="flex items-center gap-2">
          <MapPin className="h-4 w-4 text-blue-600" />
          <span className="text-gray-700">{address}</span>
        </div>
      </div>
      
      <div className="mt-6 pt-6 border-t border-gray-100">
        <h3 className="text-lg font-bold text-gray-800 mb-3">التخصصات</h3>
        <div className="flex flex-wrap gap-2">
          {specialties.map((specialty, index) => (
            <span key={index} className="bg-blue-50 text-blue-700 text-xs px-3 py-1 rounded-full">
              {specialty}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

// Verification Badge Component
const VerificationBadge: React.FC = () => {
  return (
    <div className="bg-white rounded-xl p-6">
      <div className="flex items-center gap-3 mb-4">
        <Shield className="h-5 w-5 text-green-600" />
        <h3 className="font-bold text-gray-800">الحساب موثوق</h3>
      </div>
      <div className="space-y-2 text-sm text-gray-600">
        <div className="flex items-center gap-2">
          <Check className="h-4 w-4 text-green-600" />
          <span>هوية موثقة</span>
        </div>
        <div className="flex items-center gap-2">
          <Check className="h-4 w-4 text-green-600" />
          <span>بريد إلكتروني مؤكد</span>
        </div>
        <div className="flex items-center gap-2">
          <Check className="h-4 w-4 text-green-600" />
          <span>رقم هاتف مؤكد</span>
        </div>
      </div>
    </div>
  );
};

// About Agent Component
const AboutAgent: React.FC<{ 
  description: string; 
  experience: string 
}> = ({ description, experience }) => {
  return (
    <div className="bg-white rounded-xl p-6">
      <h2 className="text-xl font-bold text-gray-800 mb-4">عن الوسيط</h2>
      <p className="text-gray-700 leading-relaxed mb-6">{description}</p>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="flex items-start gap-3">
          <Briefcase className="h-5 w-5 text-blue-600 mt-1" />
          <div>
            <h3 className="font-semibold text-gray-800">الخبرة</h3>
            <p className="text-gray-600">{experience} سنوات في مجال العقارات</p>
          </div>
        </div>
        
        <div className="flex items-start gap-3">
          <User className="h-5 w-5 text-blue-600 mt-1" />
          <div>
            <h3 className="font-semibold text-gray-800">نهجي في العمل</h3>
            <p className="text-gray-600">أركز على فهم احتياجات العملاء وتقديم الحلول المناسبة</p>
          </div>
        </div>
      </div>
    </div>
  );
};

// Property Grid Component
const PropertyGrid: React.FC<{ properties: Property[] }> = ({ properties }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {properties.map(property => (
        <PropertyCard key={property.id} property={property} />
      ))}
    </div>
  );
};

// Tab Navigation Component
const TabNavigation: React.FC<{ 
  activeTab: string; 
  onTabChange: (tab: 'listings' | 'about') => void;
  listingsCount: number;
}> = ({ activeTab, onTabChange, listingsCount }) => {
  return (
    <div className="bg-white rounded-xl p-4 mb-6">
      <div className="flex border-b border-gray-200">
        <button
          onClick={() => onTabChange('listings')}
          className={`px-4 py-2 font-medium ${activeTab === 'listings' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500 hover:text-gray-700'}`}
        >
          العقارات المعروضة ({listingsCount})
        </button>
        <button
          onClick={() => onTabChange('about')}
          className={`px-4 py-2 font-medium ${activeTab === 'about' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500 hover:text-gray-700'}`}
        >
          عن الوسيط
        </button>
      </div>
    </div>
  );
};

// Agent Profile Component
const AgentProfile: React.FC<{ agent: Agent }> = ({ agent }) => {
  const [activeTab, setActiveTab] = useState<'listings' | 'about'>('listings');

  return (
    <div className="min-h-screen bg-gray-50 font-cairo">
      {/* Header Section */}
      <AgentHeader agent={agent} />
      
      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar */}
          <div className="lg:w-1/4">
            <ContactInfo 
              phone={agent.phone}
              email={agent.email}
              address={agent.address}
              specialties={agent.specialties}
            />
            
            <VerificationBadge />
          </div>
          
          {/* Main Content */}
          <div className="lg:w-3/4">
            <AgentStats 
              propertiesSold={agent.propertiesSold}
              activeListings={agent.activeListings.length}
              experience={agent.experience}
              languages={agent.languages.length}
            />
            
            <TabNavigation 
              activeTab={activeTab}
              onTabChange={setActiveTab}
              listingsCount={agent.activeListings.length}
            />
            
            {/* Tab Content */}
            {activeTab === 'listings' && (
              <PropertyGrid properties={agent.activeListings} />
            )}
            
            {activeTab === 'about' && (
              <AboutAgent 
                description={agent.description}
                experience={agent.experience}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

// Main Agent Page Component
const AgentPage: React.FC = () => {
  // Sample agent data
  const agent: Agent = {
    id: "1",
    name: "أحمد السعدي",
    title: "وسيط عقاري محترف",
    profileImage: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300",
    phone: "+966 50 123 4567",
    email: "ahmed@realestate.com",
    description: "وسيط عقاري محترف مع أكثر من 10 سنوات من الخبرة في سوق العقارات السعودي. متخصص في عقارات الرياض والأحياء الراقية. أتمتع بعلاقات قوية مع المطورين العقاريين وأستطيع مساعدتك في العثور على العقار المناسب بأسعار مناسبة.",
    experience: "10+",
    propertiesSold: 127,
    rating: 4.8,
    reviews: 34,
    languages: ["العربية", "الإنجليزية"],
    specialties: ["شقق للبيع", "فلل للبيع", "مكاتب تجارية", "أراضي"],
    address: "الرياض، حي الصحافة، شارع العليا",
    activeListings: [
      {
        id: "1",
        title: "شقة فاخرة في حي الصحافة",
        price: 850000,
        currency: "ر.س",
        type: "شقة للبيع",
        area: 180,
        bedrooms: 3,
        bathrooms: 2,
        location: "حي الصحافة، الرياض",
        images: [
          "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=600"
        ],
        featured: true,
        views: 124,
        rating: 4.5,
        dateAdded: "3 أيام"
      },
      {
        id: "2",
        title: "فيلا راقية في حي الربيع",
        price: 2100000,
        currency: "ر.س",
        type: "فيلا للبيع",
        area: 420,
        bedrooms: 5,
        bathrooms: 4,
        location: "حي الربيع، الرياض",
        images: [
          "https://images.unsplash.com/photo-1613977257363-707ba9348227?w=600"
        ],
        featured: false,
        views: 87,
        rating: 4.8,
        dateAdded: "أسبوع"
      },
      {
        id: "3",
        title: "شقة حديثة في حي النخيل",
        price: 720000,
        currency: "ر.س",
        type: "شقة للبيع",
        area: 150,
        bedrooms: 2,
        bathrooms: 2,
        location: "حي النخيل، الرياض",
        images: [
          "https://images.unsplash.com/photo-1574362848149-11496d93a7c7?w=600"
        ],
        featured: false,
        views: 56,
        rating: 4.3,
        dateAdded: "أسبوعين"
      },
      {
        id: "4",
        title: "مكتب تجاري في حي العليا",
        price: 1200000,
        currency: "ر.س",
        type: "مكتب للبيع",
        area: 220,
        bedrooms: 0,
        bathrooms: 2,
        location: "حي العليا، الرياض",
        images: [
          "https://images.unsplash.com/photo-1497366811353-6870744d04b2?w=600"
        ],
        featured: true,
        views: 42,
        rating: 4.6,
        dateAdded: "5 أيام"
      },
      {
        id: "5",
        title: "شقة فاخرة بمساحة 315م في مجمع سكني راقي",
        price: 1150000,
        currency: "ر.س",
        type: "شقة للبيع",
        area: 315,
        bedrooms: 7,
        bathrooms: 5,
        location: "حي الدبلوماسيين، الرياض",
        images: [
          "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=600"
        ],
        featured: true,
        views: 245,
        rating: 4.7,
        dateAdded: "3 أيام"
      },
      {
        id: "6",
        title: "شقة عائلية في حي الورود",
        price: 950000,
        currency: "ر.س",
        type: "شقة للبيع",
        area: 200,
        bedrooms: 4,
        bathrooms: 3,
        location: "حي الورود، الرياض",
        images: [
          "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=600"
        ],
        featured: false,
        views: 78,
        rating: 4.4,
        dateAdded: "أسبوع"
      }
    ]
  };

  return <AgentProfile agent={agent} />;
};

export default AgentPage;