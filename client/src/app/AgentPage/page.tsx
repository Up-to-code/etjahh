"use client";

import * as React from "react";
import { useState, useEffect } from "react";
import {
  Phone,
  MessageCircle,
  Mail,
  MapPin,
  Star,
  User,
  Briefcase,
  Heart,
  Eye,
  Bed,
  Bath,
  Square,
  ArrowLeft,
  Home,
  Building,
  Crown,
  Video,
  BadgeCheck,
  Clock,
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
  verified: boolean;
  virtualTour: boolean;
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
  verified: boolean;
  premium: boolean;
  responseTime: string;
  joinedDate: string;
}

// UI Components (shadcn-inspired)
const Card: React.FC<{
  className?: string;
  children: React.ReactNode;
}> = ({ className = "", children, ...props }) => (
  <div className={`bg-white rounded-xl border border-gray-200 shadow-sm ${className}`} {...props}>
    {children}
  </div>
);

const CardHeader: React.FC<{
  className?: string;
  children: React.ReactNode;
}> = ({ className = "", children, ...props }) => (
  <div className={`p-6 pb-3 ${className}`} {...props}>
    {children}
  </div>
);

const CardTitle: React.FC<{
  className?: string;
  children: React.ReactNode;
}> = ({ className = "", children, ...props }) => (
  <h3 className={`text-lg font-semibold ${className}`} {...props}>
    {children}
  </h3>
);

const CardContent: React.FC<{
  className?: string;
  children: React.ReactNode;
}> = ({ className = "", children, ...props }) => (
  <div className={`p-6 pt-3 ${className}`} {...props}>
    {children}
  </div>
);

const Button: React.FC<{
  className?: string;
  variant?: "default" | "secondary" | "outline" | "ghost";
  size?: "default" | "sm" | "lg" | "icon";
  children: React.ReactNode;
  onClick?: () => void;
}> = ({ className = "", variant = "default", size = "default", children, onClick, ...props }) => {
  const baseStyle = "inline-flex items-center justify-center rounded-lg text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2";
  
  const variants = {
    default: "bg-blue-600 text-white hover:bg-blue-700",
    secondary: "bg-gray-100 text-gray-900 hover:bg-gray-200",
    outline: "border border-gray-300 bg-transparent hover:bg-gray-100",
    ghost: "hover:bg-gray-100"
  };
  
  const sizes = {
    default: "h-10 px-4 py-2",
    sm: "h-9 px-3",
    lg: "h-11 px-8",
    icon: "h-10 w-10"
  };
  
  return (
    <button 
      className={`${baseStyle} ${variants[variant]} ${sizes[size]} ${className}`} 
      onClick={onClick}
      {...props}
    >
      {children}
    </button>
  );
};

const Badge: React.FC<{
  className?: string;
  variant?: "default" | "secondary" | "destructive" | "premium";
  children: React.ReactNode;
}> = ({ className = "", variant = "default", children, ...props }) => {
  const baseStyle = "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium";
  
  const variants = {
    default: "bg-blue-100 text-blue-800",
    secondary: "bg-gray-100 text-gray-800",
    destructive: "bg-red-100 text-red-800",
    premium: "bg-amber-100 text-amber-800"
  };
  
  return (
    <span className={`${baseStyle} ${variants[variant]} ${className}`} {...props}>
      {children}
    </span>
  );
};

const Skeleton: React.FC<{
  className?: string;
}> = ({ className = "", ...props }) => (
  <div className={`animate-pulse rounded-md bg-gray-200 ${className}`} {...props} />
);

// Sample data
const agentData: Agent = {
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
  verified: true,
  premium: true,
  responseTime: "أقل من ساعة",
  joinedDate: "2018",
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
      dateAdded: "3 أيام",
      verified: true,
      virtualTour: true
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
      dateAdded: "أسبوع",
      verified: true,
      virtualTour: false
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
      dateAdded: "أسبوعين",
      verified: false,
      virtualTour: true
    }
  ]
};

// Property Card Component
const PropertyCard: React.FC<{ property: Property }> = ({ property }) => {
  const [isFavorite, setIsFavorite] = useState(false);
  const [currentImageIndex] = useState(0);

  const formatPrice = (price: number) => {
    return price.toLocaleString();
  };

  return (
    <Card className="overflow-hidden transition-all hover:shadow-md h-full flex flex-col">
      <div className="relative h-48 overflow-hidden">
        <img
          src={property.images[currentImageIndex]}
          alt={property.title}
          className="w-full h-full object-cover"
        />
        
        <div className="absolute top-3 left-3 flex flex-col gap-2">
          {property.featured && (
            <Badge className="bg-blue-600 text-white">مميز</Badge>
          )}
          {property.verified && (
            <Badge variant="default">موثوق</Badge>
          )}
          {property.virtualTour && (
            <Badge variant="secondary" className="bg-purple-100 text-purple-800">
              <Video className="w-3 h-3 ml-1" />
              جولة افتراضية
            </Badge>
          )}
        </div>
        
        <Button
          variant="ghost"
          size="icon"
          className="absolute top-3 right-3 rounded-full bg-white/90 p-0 hover:bg-white"
          onClick={() => setIsFavorite(!isFavorite)}
        >
          <Heart className={`h-4 w-4 ${isFavorite ? "fill-red-500 text-red-500" : ""}`} />
        </Button>
      </div>
      
      <CardContent className="p-4 flex-1 flex flex-col">
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
        
        <div className="mt-auto flex justify-between items-center">
          <span className="text-xs text-gray-500">أضيف {property.dateAdded}</span>
          <div className="flex items-center gap-1">
            <Eye className="h-3 w-3 text-gray-400" />
            <span className="text-xs text-gray-500">{property.views}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

// Agent Stats Component
const AgentStats: React.FC<{ agent: Agent }> = ({ agent }) => {
  const stats = [
    { value: `${agent.propertiesSold}+`, label: "عقارات مباعة", icon: Home, color: "bg-blue-100 text-blue-600" },
    { value: agent.activeListings.length, label: "قائمة نشطة", icon: Building, color: "bg-green-100 text-green-600" },
    { value: agent.experience, label: "سنوات الخبرة", icon: Briefcase, color: "bg-amber-100 text-amber-600" },
    { value: agent.joinedDate, label: "منذ عام", icon: Clock, color: "bg-purple-100 text-purple-600" }
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
      {stats.map((stat, index) => (
        <Card key={index} className="p-4 text-center">
          <div className={`inline-flex items-center justify-center w-12 h-12 rounded-full mb-2 ${stat.color}`}>
            <stat.icon className="h-6 w-6" />
          </div>
          <div className="text-xl font-bold text-gray-800">{stat.value}</div>
          <p className="text-sm text-gray-600">{stat.label}</p>
        </Card>
      ))}
    </div>
  );
};

// Agent Header Component
const AgentHeader: React.FC<{ agent: Agent }> = ({ agent }) => {
  return (
    <Card className="p-6 mb-6">
      <div className="flex flex-col md:flex-row items-center gap-6">
        <div className="relative">
          <img
            src={agent.profileImage}
            alt={agent.name}
            className="w-24 h-24 rounded-full object-cover border-4 border-white shadow-lg"
          />
          {agent.premium && (
            <div className="absolute -top-1 -right-1 bg-amber-400 rounded-full p-1">
              <Crown className="h-4 w-4 text-white" />
            </div>
          )}
        </div>
        
        <div className="flex-1 text-center md:text-right">
          <div className="flex items-center justify-center md:justify-end gap-2 mb-2">
            <h1 className="text-2xl font-bold text-gray-800">{agent.name}</h1>
            {agent.verified && (
              <BadgeCheck className="h-6 w-6 text-blue-500" />
            )}
          </div>
          <p className="text-gray-600">{agent.title}</p>
          
          <div className="flex items-center justify-center md:justify-end gap-4 mt-3">
            <div className="flex items-center gap-2">
              <div className="flex">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star
                    key={star}
                    className={`h-4 w-4 ${
                      star <= Math.floor(agent.rating)
                        ? "fill-yellow-400 text-yellow-400"
                        : "text-gray-300"
                    }`}
                  />
                ))}
              </div>
              <span className="text-sm text-gray-600">
                {agent.rating} ({agent.reviews} تقييم)
              </span>
            </div>
            
            <div className="flex items-center gap-1 text-sm text-gray-500">
              <Clock className="h-4 w-4" />
              <span>يستجيب عادة خلال {agent.responseTime}</span>
            </div>
          </div>
        </div>
        
        <div className="flex flex-wrap gap-2 justify-center">
          <Button className="gap-2">
            <Phone className="h-4 w-4" />
            اتصل
          </Button>
          <Button variant="outline" className="gap-2">
            <MessageCircle className="h-4 w-4" />
            واتساب
          </Button>
        </div>
      </div>
    </Card>
  );
};

// About Tab Component
const AboutTab: React.FC<{ agent: Agent }> = ({ agent }) => {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>معلومات عن الوسيط</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-gray-700 leading-relaxed">{agent.description}</p>
          
          <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex items-start gap-3 p-4 bg-gray-50 rounded-lg">
              <div className="bg-blue-100 p-2 rounded-full">
                <Briefcase className="h-5 w-5 text-blue-600" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-800">الخبرة</h3>
                <p className="text-gray-600">{agent.experience} سنوات في مجال العقارات</p>
              </div>
            </div>
            
            <div className="flex items-start gap-3 p-4 bg-gray-50 rounded-lg">
              <div className="bg-blue-100 p-2 rounded-full">
                <User className="h-5 w-5 text-blue-600" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-800">التخصصات</h3>
                <div className="flex flex-wrap gap-1 mt-1">
                  {agent.specialties.map((specialty, index) => (
                    <Badge key={index} variant="secondary">
                      {specialty}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle>معلومات الاتصال</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="bg-blue-100 p-2 rounded-full">
                <Phone className="h-5 w-5 text-blue-600" />
              </div>
              <span className="text-gray-700">{agent.phone}</span>
            </div>
            
            <div className="flex items-center gap-3">
              <div className="bg-blue-100 p-2 rounded-full">
                <Mail className="h-5 w-5 text-blue-600" />
              </div>
              <span className="text-gray-700">{agent.email}</span>
            </div>
            
            <div className="flex items-center gap-3">
              <div className="bg-blue-100 p-2 rounded-full">
                <MapPin className="h-5 w-5 text-blue-600" />
              </div>
              <span className="text-gray-700">{agent.address}</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

// Properties Tab Component
const PropertiesTab: React.FC<{ properties: Property[] }> = ({ properties }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {properties.map((property) => (
        <PropertyCard key={property.id} property={property} />
      ))}
    </div>
  );
};

// Agent Profile Component
const AgentProfile: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>("properties");
  const [agent, setAgent] = useState<Agent>(agentData);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 p-4">
        <div className="max-w-6xl mx-auto">
          <div className="flex gap-2 mb-6">
            <Skeleton className="h-10 w-24" />
          </div>
          
          <Card className="p-6 mb-6">
            <div className="flex flex-col md:flex-row items-center gap-6">
              <Skeleton className="h-24 w-24 rounded-full" />
              <div className="flex-1 text-center md:text-right">
                <Skeleton className="h-7 w-40 mx-auto md:mx-0 md:ml-auto mb-2" />
                <Skeleton className="h-4 w-32 mx-auto md:mx-0 md:ml-auto" />
                <Skeleton className="h-4 w-48 mx-auto md:mx-0 md:ml-auto mt-3" />
              </div>
              <div className="flex gap-2">
                <Skeleton className="h-10 w-24" />
                <Skeleton className="h-10 w-24" />
              </div>
            </div>
          </Card>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
            {[1, 2, 3, 4].map((item) => (
              <Card key={item} className="p-4">
                <Skeleton className="h-12 w-12 rounded-full mx-auto mb-2" />
                <Skeleton className="h-6 w-16 mx-auto mb-1" />
                <Skeleton className="h-4 w-24 mx-auto" />
              </Card>
            ))}
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[1, 2, 3].map((item) => (
              <Skeleton key={item} className="h-80 rounded-xl" />
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-6xl mx-auto">
        {/* Back Button */}
        <Button variant="ghost" className="mb-6" onClick={() => window.history.back()}>
          <ArrowLeft className="h-4 w-4 ml-2" />
          رجوع
        </Button>
        
        {/* Agent Header */}
        <AgentHeader agent={agent} />
        
        {/* Agent Stats */}
        <AgentStats agent={agent} />
        
        {/* Tabs */}
        <div className="flex border-b border-gray-200 mb-6">
          <button
            onClick={() => setActiveTab("properties")}
            className={`px-4 py-2 font-medium relative ${
              activeTab === "properties" ? "text-blue-600" : "text-gray-500 hover:text-gray-700"
            }`}
          >
            العقارات ({agent.activeListings.length})
            {activeTab === "properties" && (
              <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-600"></div>
            )}
          </button>
          <button
            onClick={() => setActiveTab("about")}
            className={`px-4 py-2 font-medium relative ${
              activeTab === "about" ? "text-blue-600" : "text-gray-500 hover:text-gray-700"
            }`}
          >
            عن الوسيط
            {activeTab === "about" && (
              <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-600"></div>
            )}
          </button>
        </div>
        
        {/* Tab Content */}
        {activeTab === "properties" && (
          <PropertiesTab properties={agent.activeListings} />
        )}
        
        {activeTab === "about" && (
          <AboutTab agent={agent} />
        )}
      </div>
    </div>
  );
};

export default AgentProfile;