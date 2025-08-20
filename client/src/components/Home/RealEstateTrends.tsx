"use client";

import React, { useState } from 'react';

type TabType = 'للبيع' | 'للإيجار';
type PropertyType = 'فال' | 'شقق';

interface SearchData {
  [key: string]: {
    [key in PropertyType]: string[];
  };
}

interface PopularSearch {
  id: number;
  text: string;
}

const RealEstateTrends: React.FC = () => {
  const [activeTab, setActiveTab] = useState<TabType>('للبيع');

  const searchData: SearchData = {
    'للبيع': {
      'فال': ['السعودية', 'الرياض', 'دبي', 'الدوادمي', 'مكة'],
      'شقق': ['السعودية', 'الرياض', 'دبي', 'الدوادمي', 'مكة'],
    },
    'للإيجار': {
      'فال': ['السعودية', 'الرياض', 'دبي', 'الدوادمي', 'مكة'],
      'شقق': ['السعودية', 'الرياض', 'دبي', 'الدوادمي', 'مكة'],
    }
  };

  const popularSearches: PopularSearch[] = [
    { id: 1, text: 'عقارات للبيع في المدينة المنورة' },
    { id: 2, text: 'عقارات للبيع في الدوادمي' },
    { id: 3, text: 'عقارات للبيع في القيصومة' },
    { id: 4, text: 'عقارات للبيع في الرياض' },
    { id: 5, text: 'عقارات للبيع في مكة' },
    { id: 6, text: 'عقارات للبيع في دبي' }
  ];

  const handleTabClick = (tab: TabType) => {
    setActiveTab(tab);
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-xl shadow-lg my-8 font-sans">
      <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
        الأكثر بحثاً في السعودية
      </h2>
      
      {/* Tabs */}
      <div className="flex border-b border-gray-200 mb-6">
        {(['للبيع', 'للإيجار'] as TabType[]).map((tab) => (
          <button
            key={tab}
            className={`py-2 px-6 font-medium text-lg transition-colors ${
              activeTab === tab
                ? 'border-b-2 border-amber-500 text-amber-600'
                : 'text-gray-500 hover:text-gray-700'
            }`}
            onClick={() => handleTabClick(tab)}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Property Types */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
        {(Object.entries(searchData[activeTab]) as [PropertyType, string[]][]).map(([propertyType, cities]) => (
          <div key={propertyType} className="bg-gray-50 p-4 rounded-lg">
            <h3 className="text-lg font-semibold text-gray-800 mb-3">{propertyType}</h3>
            <ul className="space-y-2">
              {cities.map((city, index) => (
                <li key={index}>
                  <a 
                    href="#" 
                    className="text-gray-600 hover:text-amber-600 flex items-center justify-between transition-colors"
                  >
                    <span>{propertyType} للبيع في {city}</span>
                    <svg 
                      className="w-4 h-4" 
                      fill="none" 
                      stroke="currentColor" 
                      viewBox="0 0 24 24"
                    >
                      <path 
                        strokeLinecap="round" 
                        strokeLinejoin="round" 
                        strokeWidth={2} 
                        d="M9 5l7 7-7 7" 
                      />
                    </svg>
                  </a>
                </li>
              ))}
            </ul>
            <button className="text-amber-600 font-medium mt-3 flex items-center transition-colors hover:text-amber-700">
              عرض الكل
              <svg 
                className="w-4 h-4 mr-1" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={2} 
                  d="M9 5l7 7-7 7" 
                />
              </svg>
            </button>
          </div>
        ))}
      </div>

      {/* Popular Searches */}
      <div className="border-t border-gray-200 pt-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">
          عمليات البحث الشائعة عن عقارات للبيع في السعودية
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
          {popularSearches.map((search) => (
            <a
              key={search.id}
              href="#"
              className="text-gray-600 hover:text-amber-600 bg-gray-50 hover:bg-amber-50 py-2 px-4 rounded-md transition-colors duration-200"
            >
              {search.text}
            </a>
          ))}
        </div>
      </div>
    </div>
  );
};

export default RealEstateTrends;