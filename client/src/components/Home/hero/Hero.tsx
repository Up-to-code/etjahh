import React from "react";
import { Play } from "lucide-react";
import { Button } from "@/components/ui/button";
import SearchCard from "./SearchCard";

function Hero() {
  return (
    <section className="relative  h-[600px] sm:h-[800px] w-[95%] mx-auto rounded-2xl my-5">
      {/* Background Image with Overlay */}
      <div 
        style={{
          backgroundImage: 'url("https://17mm2glo1t.ufs.sh/f/rQix7xjgXapPuUfvLNVsAP4VXJrIeZjWaTgm82pkUSHnRqMd")',
        }} 
        className="absolute inset-0 w-full h-full bg-cover bg-center bg-no-repeat"
      >
        <div className="absolute inset-0 bg-black/30"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 flex flex-col justify-center items-center h-full text-white">
        {/* Hero Title */}
        <div className="text-center" dir="rtl">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight tracking-tight">
            كل البيوت تحت سقف واحد
          </h1>
          <p className="text-xl md:text-2xl opacity-90 max-w-3xl mx-auto font-medium mb-8">
            أسعار حقيقية. صور حقيقية. عقارات حقيقية
          </p>
          <SearchCard/>

          {/* <Button 
            size="lg"
            className="h-14 px-8 text-lg font-medium bg-white/20 hover:bg-white/30 text-white border border-white/30 backdrop-blur-sm"
          >
            <Play className="w-5 h-5 ml-2 fill-white" />
            أبدأ رحلتك
          </Button> */}
        </div>
      </div>
    </section>
  );
}

export default Hero;