"use client";
import React, { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { ChevronDown, X, Search, Ruler } from "lucide-react";
import { Input } from "@/components/ui/input";

interface SpaceOption {
  id: string;
  label: string;
  min?: number;
  max?: number;
}

const PropertySpaceDropdown: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState<SpaceOption | null>(null);
  const [customMin, setCustomMin] = useState("");
  const [customMax, setCustomMax] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const dropdownRef = useRef<HTMLDivElement>(null);

  const spaceOptions: SpaceOption[] = [
    { id: "studio", label: "استوديو (20 - 50 م²)", min: 20, max: 50 },
    { id: "small", label: "صغيرة (50 - 100 م²)", min: 50, max: 100 },
    { id: "medium", label: "متوسطة (100 - 200 م²)", min: 100, max: 200 },
    { id: "large", label: "كبيرة (200 - 500 م²)", min: 200, max: 500 },
    { id: "villa", label: "فيلا (500 - 1000 م²)", min: 500, max: 1000 },
    { id: "mansion", label: "قصر (1000 - 2000 م²)", min: 1000, max: 2000 },
    { id: "estate", label: "عقار (2000 - 5000 م²)", min: 2000, max: 5000 },
    { id: "land-small", label: "أرض صغيرة (500 - 1000 م²)", min: 500, max: 1000 },
    { id: "land-medium", label: "أرض متوسطة (1000 - 5000 م²)", min: 1000, max: 5000 },
    { id: "land-large", label: "أرض كبيرة (5000+ م²)", min: 5000 },
  ];

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const filteredOptions = spaceOptions.filter(option =>
    option.label.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleConfirm = () => {
    setIsOpen(false);
    if (customMin || customMax) {
      console.log("Custom space:", { min: customMin, max: customMax });
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

  const getDisplayText = () => {
    if (customMin || customMax) {
      return `من ${customMin || "؟"} إلى ${customMax || "؟"} م²`;
    }
    return selectedOption ? selectedOption.label : "اختر المساحة";
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
          <Ruler size={18} className="text-gray-400 ml-2" />
          <ChevronDown
            size={18}
            className={`text-gray-500 transition-transform ${isOpen ? "rotate-180" : ""}`}
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
            {/* Search Input */}
            <div className="p-3 border-b border-gray-100" dir="rtl">
              <div className="relative">
                <Search size={18} className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <Input
                  type="text"
                  placeholder="ابحث عن مساحة..."
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
                <Ruler size={16} className="ml-1" />
                أدخل مساحة مخصصة (م²)
              </p>
              <div className="flex gap-2">
                <div className="flex-1">
                  <Input
                    type="number"
                    placeholder="من"
                    value={customMin}
                    onChange={(e) => {
                      setCustomMin(e.target.value);
                      setSelectedOption(null);
                    }}
                    className="text-center"
                    min="0"
                  />
                </div>
                <span className="flex items-center text-gray-500">-</span>
                <div className="flex-1">
                  <Input
                    type="number"
                    placeholder="إلى"
                    value={customMax}
                    onChange={(e) => {
                      setCustomMax(e.target.value);
                      setSelectedOption(null);
                    }}
                    className="text-center"
                    min="0"
                  />
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
                تأكيد
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

export default PropertySpaceDropdown;