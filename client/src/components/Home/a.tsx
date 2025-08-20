import React from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Heart, Phone, MessageCircle } from 'lucide-react';
import Image from 'next/image';

export function PropertyCardDemo() {
  return (
    <Card className="w-full max-w-sm mx-auto overflow-hidden rounded-xl shadow-lg">
      {/* Image Section */}
      <div className="relative">
        <img
          src="https://imagedelivery.net/1DNKFJPRaeUdy_j8F7HT3w/production/properties/258569/images/4d396a19-3c86-4d9e-a737-9b675deaffff.jpg/width=500,quality=60,format=auto"
          alt="Property image"
          width={500}
          height={300}
          className="w-full h-48 object-cover"
        />
        <Badge className="absolute top-3 left-3 bg-amber-500 text-white">
          مميز
        </Badge>
        <Button 
          variant="ghost" 
          size="icon"
          className="absolute top-3 right-3 bg-white rounded-full h-8 w-8"
        >
          <Heart className="h-4 w-4" />
        </Button>
      </div>

      {/* Content Section */}
      <div className="p-4 space-y-3">
        {/* Price */}
        <div className="flex items-center justify-between">
          <h3 className="text-xl font-bold text-amber-600">1,150,000 ر.س</h3>
          <span className="text-sm text-gray-500">شقة للبيع</span>
        </div>

        {/* Title */}
        <h2 className="text-lg font-semibold text-gray-800">
          شقة 315 متر مربع ب 7 غرف
        </h2>

        {/* Features */}
        <div className="flex items-center text-sm text-gray-600 gap-2">
          <span>7 غرف</span>
          <span>•</span>
          <span>5 حمامات</span>
          <span>•</span>
          <span>5 صالات</span>
          <span>•</span>
          <span>جديد</span>
        </div>

        {/* Additional Info */}
        <div className="text-sm text-gray-600">
          <span>عائد 13.5%</span>
        </div>

        {/* Location */}
        <div className="text-sm text-gray-500">
          الجنادية، شرق الرياض، الرياض
        </div>

        {/* Buttons */}
        <div className="flex gap-2 pt-2">
          <Button className="flex-1 bg-green-600 hover:bg-green-700 gap-2">
            <MessageCircle className="h-4 w-4" />
            واتساب
          </Button>
          <Button variant="outline" className="flex-1 gap-2">
            <Phone className="h-4 w-4" />
            اتصال
          </Button>
        </div>
      </div>
    </Card>
  );
}