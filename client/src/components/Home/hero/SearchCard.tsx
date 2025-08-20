"use client";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Search } from "lucide-react";
import PropertyTypeDropdown from "./PropertyTypeDropdown";
import PropertySpaceDropdown from "./PropertySpaceDropdown";
import PropertyPriceDropdown from "./PropertyPriceDropdown";
import CityDropdown from "./CityDropdown";
import NeighborhoodDropdown from "./NeighborhoodDropdown";

function SearchCard() {
  // State for all dropdown values
  const [selectedCity, setSelectedCity] = useState<string | null>(null);
  const [selectedNeighborhood, setSelectedNeighborhood] = useState<string | null>(null);
  const [selectedPropertyTypes, setSelectedPropertyTypes] = useState<string[]>([]);
  const [selectedSpace, setSelectedSpace] = useState<{ min?: number; max?: number } | null>(null);
  const [selectedPrice, setSelectedPrice] = useState<{ min?: number; max?: number } | null>(null);

  // Handler for search button
  const handleSearch = () => {
    console.log("Search parameters:", {
      city: selectedCity,
      neighborhood: selectedNeighborhood,
      propertyTypes: selectedPropertyTypes,
      space: selectedSpace,
      price: selectedPrice
    });
    
    // Here you would typically make an API call or update state in a parent component
  };

  return (
    <div className="w-full max-w-7xl mx-auto px-2 sm:px-4">
      <Card className="p-3 sm:p-4 md:p-6 shadow-lg border-0 rounded-2xl bg-white">
        <div className="flex flex-col gap-4">
          
          {/* Responsive Grid Layout - Dropdowns */}
          <div className="grid gap-2 sm:gap-3 md:gap-4">
            
            {/* Primary Filters */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2 sm:gap-3">
              <div className="min-w-0">
                <CityDropdown 
                  onCityChange={setSelectedCity}
                  initialSelected={selectedCity}
                />
              </div>
              
              <div className="min-w-0">
                <NeighborhoodDropdown
                  selectedCity={selectedCity}
                  onNeighborhoodChange={setSelectedNeighborhood}
                  initialSelected={selectedNeighborhood}
                />
              </div>
              
              <div className="min-w-0 sm:col-span-2 lg:col-span-1">
                <PropertyTypeDropdown 
                  onPropertyTypesChange={setSelectedPropertyTypes}
                  initialSelected={selectedPropertyTypes}
                />
              </div>
            </div>

            {/* Secondary Filters */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-3">
              <div className="min-w-0">
                <PropertySpaceDropdown 
                  onSpaceChange={setSelectedSpace}
                  initialSelected={selectedSpace}
                />
              </div>
              
              <div className="min-w-0">
                <PropertyPriceDropdown 
                  onPriceChange={setSelectedPrice}
                  initialSelected={selectedPrice}
                />
              </div>
            </div>
          </div>

          {/* Search Button - Clean & Simple */}
          <div className="w-full flex justify-center mt-4 sm:mt-6">
            <Button
              size="lg"
              className="py-4 sm:py-5 px-8 sm:px-12 text-lg sm:text-xl w-full sm:w-56 md:w-64 bg-blue-600 hover:bg-blue-700 text-white flex items-center justify-center gap-3 rounded-xl transition-colors duration-200 font-semibold shadow-md hover:shadow-lg"
              onClick={handleSearch}
            >
              <Search size={22} className="sm:size-6" />
              <span className="whitespace-nowrap">بحث</span>
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
}

export default SearchCard;