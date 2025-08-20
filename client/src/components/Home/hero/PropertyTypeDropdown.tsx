"use client";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { ChevronDown, Check } from "lucide-react";

interface PropertyType {
  id: string;
  label: string;
}

interface PropertyCategory {
  سكني: PropertyType[];
  تجاري: PropertyType[];
}

type CategoryKey = keyof PropertyCategory;

const PropertyTypeDropdown: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedTypes, setSelectedTypes] = useState<string[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<CategoryKey>("سكني");

  const propertyTypes: PropertyCategory = {
    سكني: [
      { id: "house", label: "بيت شعبي" },
      { id: "apartment", label: "شقة" },
      { id: "resort", label: "استراحة" },
      { id: "villa", label: "فيلا" },
      { id: "chalet", label: "شاليه" },
      { id: "floor", label: "دور" },
      { id: "room", label: "غرفة" },
      { id: "building", label: "عمارة سكنية" },
      { id: "land", label: "أرض سكنية" },
    ],
    تجاري: [
      { id: "shop", label: "محل" },
      { id: "office", label: "مكتب" },
      { id: "warehouse", label: "مستودع" },
      { id: "commercial-land", label: "أرض تجارية" },
      { id: "commercial-building", label: "عمارة تجارية" },
    ],
  };

  const handleTypeToggle = (typeId: string) => {
    setSelectedTypes((prev) =>
      prev.includes(typeId)
        ? prev.filter((id) => id !== typeId)
        : [...prev, typeId]
    );
  };

  const handleConfirm = () => {
    setIsOpen(false);
    console.log("Selected types:", selectedTypes);
  };

  const handleCancel = () => {
    setSelectedTypes([]);
    setIsOpen(false);
  };

  const getDisplayText = () => {
    if (selectedTypes.length === 0) return "اختر نوع العقار";
    if (selectedTypes.length === 1) {
      const selected = Object.values(propertyTypes)
        .flat()
        .find((t) => t.id === selectedTypes[0]);
      return selected?.label || "غير محدد";
    }
    return `${selectedTypes.length} أنواع محددة`;
  };

  return (
    <div className=" max-w-sm relative">
      {/* Trigger */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className=" flex items-center justify-between px-4 py-3 bg-white border border-slate-200 rounded-xl  transition-all"
        dir="rtl"
      >
        <ChevronDown
          size={20}
          className={`text-slate-400 transition-transform ${
            isOpen ? "rotate-180" : ""
          }`}
        />
        <span className="flex-1 text-right text-slate-700 font-medium">
          {getDisplayText()}
        </span>
      </button>

      {/* Dropdown Panel */}
      {isOpen && (
        <>
          <div className="absolute min-w-[300px] top-full left-[-50px]  mt-1 bg-white border border-gray-200 rounded-lg shadow-lg z-50 overflow-hidden">
          {/* Tabs */}
            <div className="flex bg-slate-50 border-b border-slate-200">
              {(Object.keys(propertyTypes) as CategoryKey[]).map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`flex-1 py-3 text-sm font-medium ${
                    selectedCategory === cat
                      ? "text-blue-600 bg-white border-b-2 border-blue-600"
                      : "text-slate-600 hover:text-slate-800 hover:bg-slate-100"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* List (scrollable) */}
            <div className="p-3 flex-1 overflow-y-auto">
              <div className="space-y-1">
                {propertyTypes[selectedCategory].map((type) => (
                  <button
                    key={type.id}
                    onClick={() => handleTypeToggle(type.id)}
                    className={`w-full flex items-center justify-between px-3 py-2.5 rounded-lg transition ${
                      selectedTypes.includes(type.id)
                        ? "bg-blue-50 border border-blue-200 text-blue-700"
                        : "hover:bg-slate-50 border border-transparent text-slate-700"
                    }`}
                    dir="rtl"
                  >
                    <div
                      className={`w-5 h-5 rounded-md border-2 flex items-center justify-center ${
                        selectedTypes.includes(type.id)
                          ? "border-blue-500 bg-blue-500"
                          : "border-slate-300"
                      }`}
                    >
                      {selectedTypes.includes(type.id) && (
                        <Check size={12} className="text-white" strokeWidth={3} />
                      )}
                    </div>
                    <span className="flex-1 text-right mr-3 font-medium">
                      {type.label}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* Actions (Always visible) */}
            <div className="p-3 bg-slate-50 border-t border-slate-200 flex gap-2 sticky bottom-0">
              <Button
                variant="outline"
                size="sm"
                className="flex-1 border-slate-300 text-slate-600 hover:bg-slate-100"
                onClick={handleCancel}
              >
                إلغاء
              </Button>
              <Button
                size="sm"
                className="flex-1 bg-blue-600 hover:bg-blue-700 text-white"
                onClick={handleConfirm}
                disabled={selectedTypes.length === 0}
              >
                تأكيد ({selectedTypes.length})
              </Button>
            </div>
          </div>

          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-slate-900/20 backdrop-blur-sm z-40"
            onClick={() => setIsOpen(false)}
          />
        </>
      )}
    </div>
  );
};

export default PropertyTypeDropdown;
