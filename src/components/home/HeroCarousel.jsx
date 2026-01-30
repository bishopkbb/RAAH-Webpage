import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';

const HeroCarousel = () => {
  const [index, setIndex] = useState(0);
  const slides = [
    {
      img: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&q=80&w=2070",
      title: "Compassionate Care, Delivered Home",
      subtitle: "Empowering agencies with cutting-edge technology for superior patient care."
    },
    {
      img: "https://images.unsplash.com/photo-1581056771107-24ca5f033842?auto=format&fit=crop&q=80&w=2069",
      title: "Streamline Your Operations",
      subtitle: "Simplify scheduling, billing, and compliance in one platform."
    },
    {
      // New Image: Nurse working on a tablet (Reliable ID)
      img: "https://images.unsplash.com/photo-1584516150909-c43483ee7932?auto=format&fit=crop&q=80&w=2070",
      title: "Tools for Caregivers",
      subtitle: "Real-time mobile solutions for your staff in the field."
    }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % slides.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="relative h-[650px] md:h-[800px] overflow-hidden bg-gray-900">
      {/* Background Images */}
      <AnimatePresence mode='wait'>
        <motion.div
          key={index}
          initial={{ opacity: 0, scale: 1.05 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.2 }}
          className="absolute inset-0"
        >
          <div 
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url(${slides[index].img})` }}
          />
          {/* Darker Overlay for better contrast */}
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-transparent"></div>
        </motion.div>
      </AnimatePresence>

      {/* Content - Lifted up significantly with pb-48 for better button visibility */}
      <div className="absolute inset-0 flex items-center px-4 md:px-12 z-10 pb-48">
        <div className="container-custom">
          <div className="max-w-4xl">
            <AnimatePresence mode='wait'>
              <motion.div
                key={index}
                initial={{ y: 40, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: -40, opacity: 0 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="text-left"
              >
                <div className="inline-block bg-green-600/90 text-white px-4 py-1 rounded-full text-sm font-bold uppercase tracking-widest mb-6 backdrop-blur-sm">
                  Home Health Software
                </div>
                <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6 font-serif leading-tight drop-shadow-lg">
                  {slides[index].title}
                </h1>
                <p className="text-xl md:text-2xl text-gray-200 mb-10 font-light drop-shadow-md max-w-2xl leading-relaxed">
                  {slides[index].subtitle}
                </p>
                <div className="flex flex-col sm:flex-row gap-6">
                  <Link to="/demo" className="btn-primary text-lg px-10 py-4 shadow-xl hover:shadow-2xl">
                    Start Free Trial <ChevronRight size={20} />
                  </Link>
                  <Link to="/services" className="px-10 py-4 rounded-full font-bold text-lg text-white border-2 border-white hover:bg-white hover:text-green-900 transition-all duration-300 text-center">
                    Learn More
                  </Link>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>

      {/* Slide Indicators */}
      <div className="absolute bottom-10 left-0 w-full flex justify-center gap-3 z-20">
        {slides.map((_, i) => (
          <button 
            key={i}
            onClick={() => setIndex(i)}
            className={`h-3 rounded-full transition-all duration-300 ${i === index ? 'w-12 bg-green-500' : 'w-3 bg-white/50 hover:bg-white'}`}
            aria-label={`Go to slide ${i + 1}`}
          />
        ))}
      </div>
    </div>
  );
};

export default HeroCarousel;