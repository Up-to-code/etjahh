"use client";

import React, { JSX, useRef, useState } from "react";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";
import type { Swiper as SwiperType } from "swiper";
import "swiper/css";
import "swiper/css/navigation";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

interface City {
  id: number;
  title: string;
  url: string;
  image: string;
}

const cities: City[] = [
  {
    id: 1040,
    title: "الرياض",
    url: "/شقق-للبيع-في-الرياض",
    image:
      "https://assets.wasalt.com/others/icons/apartments-for-sale-in-riyadh.jpeg?w=350&h=220&quality=95",
  },
  {
    id: 1042,
    title: "جدة",
    url: "/شقق-للبيع-في-جدة",
    image:
      "https://assets.wasalt.com/others/icons/apartments-for-sale-in-jeddah.jpeg?w=350&h=220&quality=95",
  },
  {
    id: 1044,
    title: "مكة",
    url: "/شقق-للبيع-في-مكة",
    image:
      "https://assets.wasalt.com/others/icons/apartments-for-sale-in-makkah.jpeg?w=350&h=220&quality=95",
  },
  {
    id: 1046,
    title: "المدينة",
    url: "/شقق-للبيع-في-المدينة",
    image:
      "https://assets.wasalt.com/others/icons/apartments-for-sale-in-madinah.jpeg?w=350&h=220&quality=95",
  },
];

export default function TrendingNow(): JSX.Element {
  const prevRef = useRef<HTMLButtonElement>(null);
  const nextRef = useRef<HTMLButtonElement>(null);
  const swiperRef = useRef<SwiperType | null>(null);
  const [isBeginning, setIsBeginning] = useState<boolean>(true);
  const [isEnd, setIsEnd] = useState<boolean>(false);

  const handleSlideChange = (swiper: SwiperType): void => {
    setIsBeginning(swiper.isBeginning);
    setIsEnd(swiper.isEnd);
  };

  const handlePrevClick = (): void => {
    if (swiperRef.current && !isBeginning) {
      swiperRef.current.slidePrev();
    }
  };

  const handleNextClick = (): void => {
    if (swiperRef.current && !isEnd) {
      swiperRef.current.slideNext();
    }
  };

  return (
    <div className="relative w-[95%] mx-auto max-w-7xl">
      <Swiper
        modules={[Navigation, Autoplay]}
        onSwiper={(swiper: SwiperType) => {
          swiperRef.current = swiper;
          // تحديث حالة الأزرار عند التهيئة
          setIsBeginning(swiper.isBeginning);
          setIsEnd(swiper.isEnd);
        }}
        onSlideChange={handleSlideChange}
        navigation={false}
        autoplay={{
          delay: 3000,
          disableOnInteraction: false,
        }}
        dir="rtl"
        spaceBetween={20}
        slidesPerView={1}
        breakpoints={{
          640: { slidesPerView: 2 },
          1024: { slidesPerView: 3 },
          1280: { slidesPerView: 4 },
        }}
        className="pb-12"
      >
        {cities.map((city: City) => (
          <SwiperSlide key={city.id}>
            <a href={city.url} className="block group">
              <div className="relative overflow-hidden rounded-xl shadow-md">
                <Image
                  src={city.image}
                  alt={city.title}
                  width={350}
                  height={220}
                  className="object-cover w-full h-auto transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute bottom-3 right-3 bg-black/60 text-white text-sm px-3 py-1 rounded-lg flex items-center gap-2">
                  <span className="text-lg">📍</span>
                  <span>{city.title}</span>
                </div>
              </div>
            </a>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* أزرار مخصصة */}
      <button
        ref={prevRef}
        onClick={handlePrevClick}
        className={`absolute top-1/2 left-2 -translate-y-1/2 z-10 w-10 h-10 rounded-full backdrop-blur-md bg-white/70 hover:bg-white/90 transition-all duration-300 flex items-center justify-center shadow-lg ${
          isBeginning ? 'opacity-20 cursor-not-allowed' : 'opacity-100'
        }`}
        disabled={isBeginning}
      >
        <FaChevronLeft className="text-gray-800" />
      </button>
      <button
        ref={nextRef}
        onClick={handleNextClick}
        className={`absolute top-1/2 right-2 -translate-y-1/2 z-10 w-10 h-10 rounded-full backdrop-blur-md bg-white/70 hover:bg-white/90 transition-all duration-300 flex items-center justify-center shadow-lg ${
          isEnd ? 'opacity-20 cursor-not-allowed' : 'opacity-100'
        }`}
        disabled={isEnd}
      >
        <FaChevronRight className="text-gray-800" />
      </button>
    </div>
  );
}