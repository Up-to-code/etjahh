"use client";

import React, { JSX, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import type { Swiper as SwiperType } from "swiper";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { FaWhatsapp, FaPhoneAlt, FaHeart, FaChevronLeft, FaChevronRight } from "react-icons/fa";

interface PropertyCardProps {
  id: number;
  title: string;
  price: string;
  location: string;
  images: string[];
  bedrooms: number;
  status: string;
  roi: string;
  url: string;
  phoneNumber?: string;
}

export default function PropertyCard({
  id,
  title,
  price,
  location,
  images,
  bedrooms,
  status,
  roi,
  url,
  phoneNumber = "0500000000",
}: PropertyCardProps): JSX.Element {
  const swiperRef = useRef<SwiperType | null>(null);
  const [isFavorite, setIsFavorite] = useState<boolean>(false);
  const [currentSlide, setCurrentSlide] = useState<number>(0);

  const handlePrevSlide = (): void => {
    if (swiperRef.current) {
      swiperRef.current.slidePrev();
    }
  };

  const handleNextSlide = (): void => {
    if (swiperRef.current) {
      swiperRef.current.slideNext();
    }
  };

  const handleSlideChange = (swiper: SwiperType): void => {
    setCurrentSlide(swiper.activeIndex);
  };

  const toggleFavorite = (): void => {
    setIsFavorite(!isFavorite);
  };

  const handleWhatsAppClick = (): void => {
    const message = encodeURIComponent(`مرحبا، أنا مهتم بالعقار: ${title} - ${price} ريال`);
    window.open(`https://wa.me/${phoneNumber.replace(/\D/g, '')}?text=${message}`, '_blank');
  };

  if (!images || images.length === 0) {
    return (
      <article className="rounded-xl shadow-md border overflow-hidden bg-gray-100 h-96 flex items-center justify-center">
        <p className="text-gray-500">لا توجد صور متاحة</p>
      </article>
    );
  }

  return (
    <article className="rounded-xl shadow-md border overflow-hidden relative bg-white hover:shadow-lg transition-shadow duration-300">
      {/* Featured Badge */}
      <div className="absolute top-3 right-3 z-20">
        <span className="bg-yellow-500 text-white text-xs font-medium px-3 py-1 rounded-md shadow-sm">
          مميز بلس
        </span>
      </div>

      {/* Favorite Button */}
      <button
        onClick={toggleFavorite}
        className={`absolute top-3 left-3 z-20 p-2 rounded-full transition-colors duration-200 ${
          isFavorite
            ? 'text-red-500 bg-white/90'
            : 'text-gray-400 hover:text-red-500 bg-white/70 hover:bg-white/90'
        }`}
        aria-label={isFavorite ? 'إزالة من المفضلة' : 'إضافة إلى المفضلة'}
      >
        <FaHeart size={16} className={isFavorite ? 'fill-current' : ''} />
      </button>

      {/* Image Slider */}
      <div className="relative">
        <Swiper
          modules={[Navigation, Pagination]}
          onSwiper={(swiper: SwiperType) => {
            swiperRef.current = swiper;
          }}
          onSlideChange={handleSlideChange}
          pagination={{
            clickable: true,
            bulletClass: 'swiper-pagination-bullet !bg-white/70',
            bulletActiveClass: 'swiper-pagination-bullet-active !bg-white',
          }}
          loop={images.length > 1}
          className="property-slider"
        >
          {images.map((img: string, index: number) => (
            <SwiperSlide key={`${id}-${index}`}>
              <Link href={url} className="block">
                <div className="relative w-full h-[220px] overflow-hidden">
                  <Image
                    src={img}
                    alt={`${title} - صورة ${index + 1}`}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="object-cover transition-transform duration-300 hover:scale-105"
                    priority={index === 0}
                  />
                </div>
              </Link>
            </SwiperSlide>
          ))}
        </Swiper>

        {/* Navigation Buttons - Only show if multiple images */}
        {images.length > 1 && (
          <>
            <button
              onClick={handlePrevSlide}
              className="absolute left-3 top-1/2 -translate-y-1/2 z-10 w-8 h-8 bg-white/80 hover:bg-white rounded-full flex items-center justify-center shadow-md transition-all duration-200 hover:scale-110"
              aria-label="الصورة السابقة"
            >
              <FaChevronLeft className="text-gray-700 text-sm" />
            </button>
            <button
              onClick={handleNextSlide}
              className="absolute right-3 top-1/2 -translate-y-1/2 z-10 w-8 h-8 bg-white/80 hover:bg-white rounded-full flex items-center justify-center shadow-md transition-all duration-200 hover:scale-110"
              aria-label="الصورة التالية"
            >
              <FaChevronRight className="text-gray-700 text-sm" />
            </button>
          </>
        )}

        {/* Image Counter */}
        {images.length > 1 && (
          <div className="absolute bottom-3 left-3 z-10 bg-black/60 text-white text-xs px-2 py-1 rounded-md">
            {currentSlide + 1} / {images.length}
          </div>
        )}
      </div>

      {/* Card Content */}
      <div className="p-4 space-y-3">
        {/* Price and Title */}
        <Link href={url} className="block group">
          <div className="text-xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors">
            {price} ريال
          </div>
          <h2 className="text-base font-semibold text-gray-700 mt-1 line-clamp-2 group-hover:text-gray-900 transition-colors">
            {title}
          </h2>
        </Link>

        {/* Property Details */}
        <div className="flex items-center gap-4 text-sm text-gray-600">
          <div className="flex items-center gap-1">
            <span>🛏</span>
            <span>{bedrooms} غرف</span>
          </div>
          <div className="flex items-center gap-1">
            <span>📍</span>
            <span>{status}</span>
          </div>
          <div className="text-green-600 font-medium">
            عائد {roi}
          </div>
        </div>

        {/* Location */}
        <div className="text-gray-500 text-sm flex items-center gap-1">
          <span>📍</span>
          <span className="line-clamp-1">{location}</span>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-2 pt-2">
          <button
            onClick={handleWhatsAppClick}
            className="flex-1 flex items-center justify-center gap-2 bg-green-500 hover:bg-green-600 text-white px-3 py-2.5 rounded-lg text-sm font-medium shadow-sm transition-colors duration-200"
          >
            <FaWhatsapp size={16} />
            واتساب
          </button>
          <a
            href={`tel:${phoneNumber}`}
            className="flex-1 flex items-center justify-center gap-2 bg-blue-500 hover:bg-blue-600 text-white px-3 py-2.5 rounded-lg text-sm font-medium shadow-sm transition-colors duration-200"
          >
            <FaPhoneAlt size={14} />
            اتصال
          </a>
        </div>
      </div>
    </article>
  );
}