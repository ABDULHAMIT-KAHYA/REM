import React, { useState, useEffect } from 'react';
import { Check, Truck, Clock, MapPin, ArrowRight, ArrowLeft, Trash2, Container, Building2, Warehouse } from 'lucide-react';

const SkipSelector = () => {
  const [selectedSkip, setSelectedSkip] = useState(null);
  const [animateIn, setAnimateIn] = useState(false);
  const [skipData, setSkipData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    setAnimateIn(true);
  }, []);

  useEffect(() => {
    const fetchSkipData = async () => {
      try {
        setIsLoading(true);
        const response = await fetch('https://app.wewantwaste.co.uk/api/skips/by-location?postcode=NR32&area=Lowestoft');
        if (!response.ok) {
          throw new Error('Failed to fetch skip data');
        }
        const data = await response.json();
        setSkipData(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchSkipData();
  }, []);

  const calculateFinalPrice = (priceBeforeVat, vat) => {
    return Math.round(priceBeforeVat * (1 + vat / 100));
  };

  const getSkipImage = (size) => {
    const colors = {
      4: ['#FDE047', '#FACC15'],
      6: ['#FDBA74', '#FB923C'],
      8: ['#60A5FA', '#2563EB'],
      10: ['#6EE7B7', '#059669'],
      12: ['#C4B5FD', '#7C3AED'],
      14: ['#F9A8D4', '#EC4899'],
      16: ['#818CF8', '#3730A3'],
      20: ['#F87171', '#B91C1C'],
      40: ['#9CA3AF', '#374151']
    };
    const [main, shadow] = colors[size] || ['#E5E7EB', '#6B7280'];

    const textColor = darkMode ? "#F1F5F9" : "#1E293B";

    return (
      <div className="flex items-center justify-center">
        <svg
          width="110"
          height="70"
          viewBox="0 0 110 70"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="drop-shadow-lg"
        >
    
          <polygon
            points="10,60 20,20 90,20 100,60"
            fill={main}
            stroke={shadow}
            strokeWidth="2"
          />
 
          <polygon
            points="100,60 90,20 95,25 105,65"
            fill={shadow}
            opacity="0.3"
          />

          <rect
            x="18"
            y="17"
            width="74"
            height="7"
            rx="2"
            fill={shadow}
            opacity="0.5"
          />
        
          <polygon
            points="15,58 23,23 87,23 95,58"
            fill="#fff"
            opacity="0.10"
          />

          <text
            x="55"
            y="48"
            textAnchor="middle"
            fontSize="22"
            fontWeight="bold"
            fill={textColor}
            opacity="0.85"
          >
            {size}Y
          </text>
        </svg>
      </div>
    );
  };

  const ProgressBar = () => (
    <div className="w-full max-w-4xl mx-auto mb-12">
      <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
        <span className="flex items-center gap-2">
          <MapPin className="w-4 h-4 text-green-500" />
          Postcode
        </span>
        <span className="flex items-center gap-2">
          <div className="w-4 h-4 bg-green-500 rounded-full flex items-center justify-center">
            <Check className="w-2.5 h-2.5 text-white" />
          </div>
          Waste Type
        </span>
        <span className="flex items-center gap-2 text-blue-600 font-medium">
          <div className="w-4 h-4 bg-blue-600 rounded-full flex items-center justify-center">
            <div className="w-2 h-2 bg-white rounded-full"></div>
          </div>
          Select Skip
        </span>
        <span className="flex items-center gap-2">
          <div className="w-4 h-4 border-2 border-gray-300 rounded-full"></div>
          Permit Check
        </span>
        <span className="flex items-center gap-2">
          <div className="w-4 h-4 border-2 border-gray-300 rounded-full"></div>
          Choose Date
        </span>
        <span className="flex items-center gap-2">
          <div className="w-4 h-4 border-2 border-gray-300 rounded-full"></div>
          Payment
        </span>
      </div>
      <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
        <div className="h-full bg-gradient-to-r from-green-500 to-blue-600 rounded-full transition-all duration-1000 ease-out"
             style={{width: '33.33%'}}></div>
      </div>
    </div>
  );

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-red-600 text-center">
          <h2 className="text-2xl font-bold mb-2">Error loading skips</h2>
          <p>{error}</p>
        </div>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-gray-600 text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p>Loading available skips...</p>
        </div>
      </div>
    );
  }

  return (
    <div className={`min-h-screen transition-colors duration-300 
      ${darkMode 
        ? 'dark bg-gray-900 text-white' 
        : 'bg-gradient-to-br from-gray-50 via-white to-blue-50'}`}>
      <div className="container mx-auto px-4 py-8 pb-40">
     
        <div className="flex justify-end mb-4">
          <button
            className={`px-4 py-2 rounded-lg font-medium border transition-colors duration-200
              ${darkMode 
                ? 'bg-gray-800 text-gray-100 border-gray-700 hover:bg-gray-700' 
                : 'bg-white text-gray-800 border-gray-200 hover:bg-gray-100'}`}
            onClick={() => setDarkMode((d) => !d)}
            aria-label="Toggle dark mode"
          >
            {darkMode ? '☀️ Light Mode' : '🌙 Dark Mode'}
          </button>
        </div>
        <ProgressBar />
        <div className={`transition-all duration-1000 ${animateIn ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <div className="text-center mb-12">
            <h1 className={`text-4xl md:text-5xl font-bold mb-4 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
              Choose Your Skip Size
            </h1>
            <p className={`text-xl max-w-2xl mx-auto ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
              Select the perfect skip size for your project. All prices include VAT and delivery.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto mb-12">
            {skipData.map((skip, index) => {
              const finalPrice = calculateFinalPrice(skip.price_before_vat, skip.vat);
              const isSelected = selectedSkip?.id === skip.id;
              
              return (
                <div
                  key={skip.id}
                  className={`group cursor-pointer transition-all duration-300 ${animateIn ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
                  style={{transitionDelay: `${index * 100}ms`}}
                  onClick={() => setSelectedSkip(skip)}
                >
                  <div className={`relative rounded-2xl transition-all duration-300 overflow-hidden
                    ${darkMode 
                      ? 'bg-gray-800 border-gray-700' 
                      : 'bg-white border-gray-200'} 
                    ${isSelected 
                      ? 'border-blue-500 scale-105 shadow-2xl' 
                      : 'hover:border-blue-300'} 
                    border-2 shadow-lg hover:shadow-2xl`}>
                    
                    {isSelected && (
                      <div className="absolute top-4 right-4 w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center z-10 animate-pulse">
                        <Check className="w-4 h-4 text-white" />
                      </div>
                    )}
                    
                    <div className="p-6">
                      <div className="mb-6">
                        {getSkipImage(skip.size)}
                      </div>
                      
                      <div className="text-center">
                        <h3 className={`text-2xl font-bold mb-2 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                          {skip.size} Yard Skip
                        </h3>
                        
                        <div className={`flex items-center justify-center gap-4 mb-4 text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                          <div className="flex items-center gap-1">
                            <Clock className="w-4 h-4" />
                            <span>{skip.hire_period_days} days</span>
                          </div>
                          {skip.allowed_on_road && (
                            <div className="flex items-center gap-1">
                              <Truck className="w-4 h-4" />
                              <span>Road legal</span>
                            </div>
                          )}
                        </div>
                        
                        <div className="mb-4">
                          <div className="text-3xl font-bold text-blue-600 mb-1">
                            £{finalPrice}
                          </div>
                          <div className="text-sm text-gray-500">
                            inc. VAT & delivery
                          </div>
                        </div>

                        <div className="space-y-2 mb-6">
                          <div className={`inline-block px-3 py-1 rounded-full text-xs font-medium
                            ${skip.allows_heavy_waste ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-600'}`}>
                            {skip.allows_heavy_waste ? 'Heavy waste allowed' : 'Light waste only'}
                          </div>
                          {!skip.allowed_on_road && (
                            <div className="block">
                              <div className="inline-block px-3 py-1 rounded-full text-xs font-medium bg-orange-100 text-orange-800">
                                Permit may be required
                              </div>
                            </div>
                          )}
                        </div>
                        
                        <button
                          className={`w-full py-3 px-6 rounded-xl font-medium transition-all duration-300 
                            ${isSelected 
                              ? 'bg-blue-600 text-white shadow-lg hover:bg-blue-700' 
                              : darkMode
                                ? 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                                : 'bg-gray-100 text-gray-700 hover:bg-gray-200 group-hover:bg-blue-50 group-hover:text-blue-600'
                            }`}
                        >
                          {isSelected ? 'Selected' : 'Select This Skip'}
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
      {selectedSkip && (
        <div className={`fixed bottom-0 left-0 right-0 border-t shadow-2xl p-6 transition-all duration-500 transform 
          ${darkMode 
            ? 'bg-gray-800 border-gray-700 text-white' 
            : 'bg-white border-gray-200'} 
          ${selectedSkip ? 'translate-y-0' : 'translate-y-full'}`}>
          <div className="max-w-4xl mx-auto flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className={`text-lg font-semibold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                {selectedSkip.size} Yard Skip
              </div>
              <div className="text-2xl font-bold text-blue-600">
                £{calculateFinalPrice(selectedSkip.price_before_vat, selectedSkip.vat)}
              </div>
              <div className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                {selectedSkip.hire_period_days} days
              </div>
            </div>
            <div className="flex gap-3">
              <button className={`px-6 py-3 border rounded-xl transition-colors duration-200 flex items-center gap-2
                ${darkMode 
                  ? 'border-gray-700 text-gray-300 hover:bg-gray-700' 
                  : 'border-gray-300 text-gray-700 hover:bg-gray-50'}`}>
                <ArrowLeft className="w-4 h-4" />
                Back
              </button>
              <button className="px-8 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors duration-200 flex items-center gap-2 shadow-lg">
                Continue
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SkipSelector;