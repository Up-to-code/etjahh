import React from 'react';
import { Heart, Phone, MessageCircle, MapPin, Bed, Bath, Square } from 'lucide-react';

const HorizontalPropertyCard = () => {
  return (
    <div className="max-w-4xl mx-auto p-4">
      <div className="bg-white rounded-xl shadow-lg overflow-hidden flex flex-col md:flex-row">
        {/* Image Section */}
        <div className="md:w-2/5 relative">
          <img
            src="https://imagedelivery.net/1DNKFJPRaeUdy_j8F7HT3w/production/properties/258569/images/4d396a19-3c86-4d9e-a737-9b675deaffff.jpg/width=600,quality=60,format=auto"
            alt="Property image"
            className="w-full h-64 md:h-full object-cover"
          />
          <div className="absolute top-3 left-3 bg-amber-500 text-white px-3 py-1 rounded-md text-sm font-medium">
            مميز
          </div>
          <button className="absolute top-3 right-3 bg-white p-2 rounded-full shadow-md">
            <Heart className="h-5 w-5 text-gray-600" />
          </button>
        </div>

        {/* Content Section */}
        <div className="md:w-3/5 p-6 flex flex-col justify-between">
          <div>
            {/* Price and Title */}
            <div className="flex justify-between items-start mb-4">
              <h3 className="text-2xl font-bold text-amber-600">1,150,000 ر.س</h3>
              <span className="text-sm text-gray-500 bg-gray-100 px-2 py-1 rounded">شقة للبيع</span>
            </div>
            
            <h2 className="text-xl font-semibold text-gray-800 mb-4">
              شقة 315 متر مربع ب 7 غرف
            </h2>

            {/* Features */}
            <div className="flex items-center gap-4 text-gray-600 mb-4">
              <div className="flex items-center">
                <Bed className="h-4 w-4 ml-1" />
                <span>7</span>
              </div>
              <div className="flex items-center">
                <Bath className="h-4 w-4 ml-1" />
                <span>5</span>
              </div>
              <div className="flex items-center">
                <Square className="h-4 w-4 ml-1" />
                <span>315m²</span>
              </div>
              <span className="bg-green-100 text-green-700 text-xs px-2 py-1 rounded">
                عائد 13.5%
              </span>
            </div>

            {/* Location */}
            <div className="flex items-center text-gray-500 mb-6">
              <MapPin className="h-4 w-4 ml-1" />
              <span>الجنادية، شرق الرياض، الرياض</span>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3">
            <button className="flex items-center justify-center gap-2 bg-green-600 text-white py-3 px-4 rounded-lg flex-1 hover:bg-green-700 transition-colors">
              <MessageCircle className="h-5 w-5" />
              واتساب
            </button>
            <button className="flex items-center justify-center gap-2 border border-gray-300 text-gray-700 py-3 px-4 rounded-lg flex-1 hover:bg-gray-50 transition-colors">
              <Phone className="h-5 w-5" />
              اتصال
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HorizontalPropertyCard;