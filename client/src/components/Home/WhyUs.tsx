"use client";

import React from 'react';
import { Shield, Users, Award, Clock, HeadphonesIcon, Star } from 'lucide-react';

interface Feature {
  id: number;
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  description: string;
  color: string;
}

const WhyUs: React.FC = () => {
  const features: Feature[] = [
    {
      id: 1,
      icon: Shield,
      title: 'موثوقية عالية',
      description: 'نحن شركة مرخصة وموثوقة في مجال العقارات مع سنوات من الخبرة في السوق',
      color: 'from-blue-500 to-blue-600'
    },
    {
      id: 2,
      icon: Users,
      title: 'فريق متخصص',
      description: 'فريق من الخبراء العقاريين المؤهلين لتقديم أفضل الخدمات لعملائنا',
      color: 'from-green-500 to-green-600'
    },
    {
      id: 3,
      icon: Award,
      title: 'جوائز وتقدير',
      description: 'حاصلون على جوائز عديدة في مجال الخدمات العقارية والتميز في الأداء',
      color: 'from-amber-500 to-amber-600'
    },
    {
      id: 4,
      icon: Clock,
      title: 'خدمة سريعة',
      description: 'نقدم خدماتنا بكفاءة عالية وسرعة في تلبية احتياجات عملائنا',
      color: 'from-purple-500 to-purple-600'
    },
    {
      id: 5,
      icon: HeadphonesIcon,
      title: 'دعم فني متواصل',
      description: 'فريق دعم متخصص متاح 24/7 للإجابة على استفساراتكم ومساعدتكم',
      color: 'from-red-500 to-red-600'
    },
    {
      id: 6,
      icon: Star,
      title: 'تقييمات ممتازة',
      description: 'آلاف العملاء راضون عن خدماتنا ويثقون فينا لتلبية احتياجاتهم العقارية',
      color: 'from-indigo-500 to-indigo-600'
    }
  ];

  return (
    <div className="max-w-6xl mx-auto p-6 my-12">
      {/* Header Section */}
      <div className="text-center mb-12">
        <h2 className="text-4xl font-bold text-gray-800 mb-4 font-sans">
          لماذا تختار <span className="text-primary">إتجاه</span>؟
        </h2>
        <p className="text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
          نحن نقدم خدمات عقارية متميزة تجمع بين الخبرة الطويلة والتكنولوجيا الحديثة
          لنضمن لك تجربة فريدة في عالم العقارات
        </p>
      </div>

      {/* Features Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
        {features.map((feature) => {
          const IconComponent = feature.icon;
          return (
            <div
              key={feature.id}
              className="group bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border border-gray-100"
            >
              <div className={`w-16 h-16 rounded-full bg-gradient-to-r ${feature.color} p-4 mb-4 group-hover:scale-110 transition-transform duration-300`}>
                <IconComponent className="w-8 h-8 text-white" />
              </div>

              <h3 className="text-xl font-semibold text-gray-800 mb-3 font-sans">
                {feature.title}
              </h3>

              <p className="text-gray-600 leading-relaxed">
                {feature.description}
              </p>
            </div>
          );
        })}
      </div>

      {/* Stats Section */}
      <div className="bg-gradient-to-r from-primary to-primary/80 rounded-2xl p-8 text-white">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          <div>
            <div className="text-3xl font-bold mb-2">500+</div>
            <div className="text-primary-foreground/90">عقار مُباع</div>
          </div>
          <div>
            <div className="text-3xl font-bold mb-2">1000+</div>
            <div className="text-primary-foreground/90">عميل راضي</div>
          </div>
          <div>
            <div className="text-3xl font-bold mb-2">5+</div>
            <div className="text-primary-foreground/90">سنوات خبرة</div>
          </div>
          <div>
            <div className="text-3xl font-bold mb-2">24/7</div>
            <div className="text-primary-foreground/90">دعم متواصل</div>
          </div>
        </div>
      </div>

      {/* Call to Action */}
      <div className="text-center mt-12">
        <div className="bg-white rounded-xl p-8 shadow-lg border border-gray-100 max-w-2xl mx-auto">
          <h3 className="text-2xl font-bold text-gray-800 mb-4 font-sans">
            هل تحتاج مساعدة في العثور على عقارك المثالي؟
          </h3>
          <p className="text-gray-600 mb-6">
            فريقنا جاهز لمساعدتك في كل خطوة من رحلتك العقارية
          </p>
          <button className="bg-gradient-to-r from-primary to-primary/80 text-white px-8 py-3 rounded-lg font-semibold hover:shadow-lg transition-all duration-300 transform hover:scale-105">
            تواصل معنا الآن
          </button>
        </div>
      </div>
    </div>
  );
};

export default WhyUs;
