import PropertyCardDemo from '@/components/common/HorizontalPropertyCard'
import HorizontalPropertyCard from '@/components/common/HorizontalPropertyCard'
import Hero from '@/components/Home/hero/Hero'
import TextDisplay from '@/components/common/HorizontalPropertyCard'
import RealEstateTrends from '@/components/Home/RealEstateTrends'
import WhyUs from '@/components/Home/WhyUs'
import { Button } from '@/components/ui/button'
import React from 'react'
import AdImage from '@/components/common/AdImage'
import VerticalPropertyCard from '@/components/common/VerticalPropertyCard'
import TrendingNow from '@/components/common/Groups/TrendingNow'
import PropertyCard from '@/components/common/Cards/PropertyCardProps'
import HeroSlider from '@/components/common/Cards/HeroSlider'

function Page() {
  const properties = [
    {
      id: 1,
      title: "شقة فاخرة مطلة على البحر",
      price: "850,000",
      location: "الرياض - حي العليا",
      images: [
        "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2",
        "https://images.unsplash.com/photo-1507089947368-19c1da9775ae",
        "https://images.unsplash.com/photo-1600607687126-1d5f9d9b4d52",
      ],
      bedrooms: 3,
      status: "جاهزة للتسليم",
      roi: "8%",
      url: "/property/1",
    },
    {
      id: 2,
      title: "فيلا حديثة بحديقة خاصة",
      price: "1,250,000",
      location: "جدة - حي الشاطئ",
      images: [
        "https://images.unsplash.com/photo-1600585154340-be6161a56a0c",
        "https://images.unsplash.com/photo-1600573472590-34d8f3d88d08",
      ],
      bedrooms: 5,
      status: "تحت الإنشاء",
      roi: "12%",
      url: "/property/2",
    },
    {
      id: 3,
      title: "استوديو أنيق في وسط المدينة",
      price: "420,000",
      location: "الدمام - حي المزروعية",
      images: [
        "https://images.unsplash.com/photo-1613977257360-92007c9242c0",
        "https://images.unsplash.com/photo-1600607687126-1d5f9d9b4d52",
      ],
      bedrooms: 1,
      status: "جاهز للسكن",
      roi: "10%",
      url: "/property/3",
    },
  ];

  return (
    <>     
    
    <HeroSlider 
      
     
     />
      {/* <Hero /> */}
      <TrendingNow />

      {/* هنا عرض العقارات */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 p-6">
        {properties.map((property) => (
          <PropertyCard key={property.id} {...property} />
        ))}
      </div>

      <VerticalPropertyCard />
      <AdImage />
      {/* <RealEstateTrends/> */}
      {/* <TextDisplay/> */}
      {/* <WhyUs/> */}
    </>
  )
}

export default Page
