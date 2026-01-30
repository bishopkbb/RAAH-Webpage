import React from 'react';

const PageBanner = ({ title, subtitle, image }) => {
  return (
    <div className="relative h-64 md:h-80 bg-gray-900 overflow-hidden">
      <div 
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${image || 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&q=80&w=2070'})` }}
      />
      <div className="absolute inset-0 bg-black/60"></div>
      <div className="absolute inset-0 flex items-center justify-center text-center px-4">
        <div>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 font-serif">{title}</h1>
          {subtitle && <p className="text-xl text-green-50 max-w-2xl mx-auto">{subtitle}</p>}
        </div>
      </div>
    </div>
  );
};

export default PageBanner;