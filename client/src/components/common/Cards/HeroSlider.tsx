"use client";

import React, { useRef, useState } from "react";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, EffectFade } from "swiper/modules";
import type { Swiper as SwiperType } from "swiper";
import "swiper/css";
import "swiper/css/effect-fade";
import SearchCard from "@/components/Home/hero/SearchCard";

interface HeroSlide {
  id: number;
  title: string;
  description: string;
  image: string;
}

const defaultSlides: HeroSlide[] = [
  {
    id: 1,
    title: "اكتشف منزل أحلامك",
    description: "ابحث عن الشقق والفلل والمكاتب في أفضل المواقع.",
    image:
      "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=1200&h=1600&fit=crop",
  },
  {
    id: 2,
    title: "استثمار عقاري مضمون",
    description: "عوائد مرتفعة وأمان استثماري مضمون.",
    image:
      "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1200&h=1600&fit=crop",
  },
  {
    id: 3,
    title: "خدمات عقارية شاملة",
    description: "من البحث إلى التمويل والتسجيل، نحن معك.",
    image:
      "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=1200&h=1600&fit=crop",
  },
];

export default function HeroSlider({
  slides = defaultSlides,
}: {
  slides?: HeroSlide[];
}) {
  const swiperRef = useRef<SwiperType | null>(null);
  const [currentSlide, setCurrentSlide] = useState<number>(0);

  return (
    <section className="relative w-full h-screen overflow-hidden" dir="rtl">
      <Swiper
        modules={[Autoplay, EffectFade]}
        onSwiper={(swiper) => (swiperRef.current = swiper)}
        onSlideChange={(swiper) => setCurrentSlide(swiper.activeIndex)}
        effect="fade"
        autoplay={{ delay: 10000, disableOnInteraction: false }} // 10 ثواني لكل سلايد
        loop
        speed={1500} // سرعة الانتقال نفسها زودناها شوية
        className="w-full h-full"
      >
        {slides.map((slide, index) => (
          <SwiperSlide key={slide.id}>
            <div className="absolute inset-0">
              <Image
                src={slide.image}
                alt={slide.title}
                fill
                priority={index === 0}
                className="object-cover"
              />
              <div className="absolute inset-0 bg-black/50" />
            </div>

            <div className="relative z-10 h-full flex items-center justify-center text-center px-4">
              <div className="max-w-2xl mx-auto">
                <h1 className="text-4xl sm:text-5xl font-bold text-white mb-4 drop-shadow-lg">
                  {slide.title}
                </h1>
                <p className="text-lg sm:text-xl text-white/90 drop-shadow-md">
                  {slide.description}
                </p>
                <div className="mt-6">
                    <SearchCard/>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Counter */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 bg-black/40 text-white px-4 py-1.5 rounded-full text-sm">
        {currentSlide + 1} / {slides.length}
      </div>
    </section>
  );
}
