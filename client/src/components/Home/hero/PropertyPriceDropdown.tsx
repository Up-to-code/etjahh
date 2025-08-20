"use client";
import React, { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { ChevronDown, X, Search, DollarSign, Filter } from "lucide-react";
import { Input } from "@/components/ui/input";

interface PriceOption {
  id: string;
  label: string;
  min?: number;
  max?: number;
}

const PropertyPriceDropdown: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState<PriceOption | null>(
    null
  );
  const [customMin, setCustomMin] = useState("");
  const [customMax, setCustomMax] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const dropdownRef = useRef<HTMLDivElement>(null);

  const priceOptions: PriceOption[] = [
    {
      id: "budget",
      label: "اقتصادي (50,000 - 100,000 ر.س)",
      min: 50000,
      max: 100000,
    },
    {
      id: "affordable",
      label: "معقول (100,000 - 250,000 ر.س)",
      min: 100000,
      max: 250000,
    },
    {
      id: "moderate",
      label: "متوسط (250,000 - 500,000 ر.س)",
      min: 250000,
      max: 500000,
    },
    {
      id: "expensive",
      label: "غالي (500,000 - 1,000,000 ر.س)",
      min: 500000,
      max: 1000000,
    },
    {
      id: "premium",
      label: "فاخر (1,000,000 - 2,500,000 ر.س)",
      min: 1000000,
      max: 2500000,
    },
    {
      id: "luxury",
      label: "فخم (2,500,000 - 5,000,000 ر.س)",
      min: 2500000,
      max: 5000000,
    },
    { id: "elite", label: "نخبة (5,000,000+ ر.س)", min: 5000000 },
  ];

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const filteredOptions = priceOptions.filter((option) =>
    option.label.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleConfirm = () => {
    setIsOpen(false);
    if (customMin || customMax) {
      console.log("Custom price:", { min: customMin, max: customMax });
    } else if (selectedOption) {
      console.log("Selected option:", selectedOption);
    }
  };

  const handleCancel = () => {
    setIsOpen(false);
    setSelectedOption(null);
    setCustomMin("");
    setCustomMax("");
    setSearchQuery("");
  };

  const clearSelection = () => {
    setSelectedOption(null);
    setCustomMin("");
    setCustomMax("");
  };

  const formatPrice = (price: string) => {
    if (!price) return "0";
    return parseInt(price).toLocaleString("ar-SA");
  };

  const getDisplayText = () => {
    if (customMin || customMax) {
      return `من ${customMin ? formatPrice(customMin) + " ر.س" : "؟"} إلى ${
        customMax ? formatPrice(customMax) + " ر.س" : "؟"
      }`;
    }
    return selectedOption ? selectedOption.label : "اختر السعر";
  };

  return (
    <div className=" max-w-sm relative" ref={dropdownRef}>
      {/* Dropdown Trigger */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between px-4 py-3 bg-white border border-gray-300 rounded-lg hover:border-blue-500 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all "
        dir="rtl"
      >
        <div className="flex items-center">
          <DollarSign size={18} className="text-gray-400 ml-2" />
          <ChevronDown
            size={18}
            className={`text-gray-500 transition-transform ${
              isOpen ? "rotate-180" : ""
            }`}
          />
          {selectedOption && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                clearSelection();
              }}
              className="mr-2 p-1 hover:bg-gray-100 rounded-full"
            >
              <X size={14} className="text-gray-500" />
            </button>
          )}
        </div>
        <span className="flex-1 text-right text-gray-800 font-medium">
          {getDisplayText()}
        </span>
      </button>

      {/* Dropdown Content */}
      {isOpen && (
        <>
          <div className="absolute min-w-[300px] top-full left-[-50px]  mt-1 bg-white border border-gray-200 rounded-lg shadow-lg z-50 overflow-hidden">
          {/* Header */}
            <div
              className="p-3 bg-gradient-to-r from-blue-50 to-indigo-50 border-b border-gray-200 flex items-center"
              dir="rtl"
            >
              <Filter size={18} className="text-blue-600 ml-2" />
              <h3 className="text-lg font-semibold text-gray-800">
                فلترة حسب السعر
              </h3>
            </div>

            {/* Search Input */}
            <div className="p-3 border-b border-gray-100" dir="rtl">
              <div className="relative">
                <Search
                  size={18}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                />
                <Input
                  type="text"
                  placeholder="ابحث عن نطاق سعر..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pr-10"
                  dir="rtl"
                />
              </div>
            </div>

            {/* Options List */}
            <div className="max-h-60 overflow-y-auto" dir="rtl">
              {filteredOptions.length > 0 ? (
                filteredOptions.map((opt) => (
                  <button
                    key={opt.id}
                    onClick={() => {
                      setSelectedOption(opt);
                      setCustomMin("");
                      setCustomMax("");
                    }}
                    className={`w-full text-right px-4 py-3 transition-colors flex items-center ${
                      selectedOption?.id === opt.id
                        ? "bg-blue-50 text-blue-700 border-r-4 border-r-blue-500"
                        : "hover:bg-gray-50 text-gray-700"
                    }`}
                  >
                    <span className="flex-1">{opt.label}</span>
                    {selectedOption?.id === opt.id && (
                      <div className="w-2 h-2 rounded-full bg-blue-500 ml-2"></div>
                    )}
                  </button>
                ))
              ) : (
                <div className="px-4 py-3 text-center text-gray-500">
                  لا توجد خيارات مطابقة
                </div>
              )}
            </div>

            {/* Divider */}
            <div className="border-t border-gray-100 my-2"></div>

            {/* Custom Input */}
            <div className="p-3 space-y-2" dir="rtl">
              <p className="text-sm font-medium text-gray-600 flex items-center">
                <DollarSign size={16} className="ml-1" />
                أدخل سعر مخصص (ريال سعودي)
              </p>
              <div className="flex gap-2 items-center">
                <div className="flex-1 relative">
                  <Input
                    type="number"
                    placeholder="الحد الأدنى"
                    value={customMin}
                    onChange={(e) => {
                      setCustomMin(e.target.value);
                      setSelectedOption(null);
                    }}
                    className="text-center pr-8"
                    min="0"
                  />
                  <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 text-sm">
                    ر.س
                  </span>
                </div>
                <span className="text-gray-500">-</span>
                <div className="flex-1 relative">
                  <Input
                    type="number"
                    placeholder="الحد الأقصى"
                    value={customMax}
                    onChange={(e) => {
                      setCustomMax(e.target.value);
                      setSelectedOption(null);
                    }}
                    className="text-center pr-8"
                    min="0"
                  />
                  <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 text-sm">
                    ر.س
                  </span>
                </div>
              </div>
              <p className="text-xs text-gray-400 text-center">
                اترك الحقل فارغاً للحدود المفتوحة
              </p>
            </div>

            {/* Action Buttons */}
            <div className="p-3 bg-gray-50 border-t border-gray-200 flex gap-2">
              <Button
                variant="outline"
                className="flex-1 text-gray-600 hover:bg-gray-200"
                onClick={handleCancel}
              >
                إلغاء
              </Button>
              <Button
                className="flex-1 bg-blue-600 hover:bg-blue-700"
                onClick={handleConfirm}
                disabled={!selectedOption && !customMin && !customMax}
              >
                تطبيق
              </Button>
            </div>
          </div>

          {/* Backdrop with Blur Effect */}
          <div
            className="fixed inset-0 bg-black/10 backdrop-blur-[2px] z-40"
            onClick={() => setIsOpen(false)}
          />
        </>
      )}
    </div>
  );
};

export default PropertyPriceDropdown;
