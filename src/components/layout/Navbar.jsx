import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Phone, MapPin, Clock, Facebook, Twitter, Linkedin } from 'lucide-react';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const logoUrl = "/raah.png"; 

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'About', path: '/about' },
    { name: 'Services', path: '/services' },
    { name: 'Contact', path: '/contact' },
  ];

  const isActive = (path) => location.pathname === path;

  // Handle scroll effect for navbar
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => { document.body.style.overflow = 'unset'; };
  }, [isOpen]);

  // Close menu on route change
  useEffect(() => {
    setIsOpen(false);
  }, [location]);

  return (
    <nav className={`sticky top-0 z-50 transition-all duration-300 ${scrolled ? 'shadow-lg' : ''}`}>
      
      {/* Sophisticated Sub Header - Hidden on Mobile */}
      <div className="bg-gradient-to-r from-green-900 to-green-800 text-green-50 py-2.5 px-4 text-xs md:text-sm hidden md:block border-b border-green-700">
        <div className="container-custom flex justify-between items-center">
          <div className="flex items-center gap-6">
            <span className="flex items-center gap-2 hover:text-white transition cursor-pointer"><MapPin size={14} className="text-green-400" /> 13891 Oswego Street, Aurora CO</span>
            <span className="flex items-center gap-2 hover:text-white transition cursor-pointer"><Phone size={14} className="text-green-400" /> +1 (0001) 2222-2890</span>
            <span className="flex items-center gap-2 text-green-300"><Clock size={14} /> Mon - Fri: 8:00 AM - 6:00 PM</span>
          </div>
          <div className="flex items-center gap-6">
            <div className="flex gap-3 pr-6 border-r border-green-700">
              <Facebook size={14} className="hover:text-white cursor-pointer transition" />
              <Twitter size={14} className="hover:text-white cursor-pointer transition" />
              <Linkedin size={14} className="hover:text-white cursor-pointer transition" />
            </div>
          </div>
        </div>
      </div>

      {/* Main Header */}
      <div className={`bg-white/95 backdrop-blur-sm transition-all duration-300 relative z-[60] ${scrolled ? 'py-2' : 'py-3 md:py-5'}`}>
        <div className="container-custom">
          <div className="nav-container relative flex justify-between items-center">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-2 z-[60] group">
              <img src={logoUrl} alt="RAAH" className="nav-logo h-15 w-auto object-contain" />
              <div className="hidden xl:block ml-2">
                <span className="text-2xl font-bold text-gray-800 font-serif leading-none block group-hover:text-green-700 transition"></span>
                {/*<span className="text-xs text-green-600 font-sans tracking-widest uppercase block">Home Health</span>*/}
              </div>
            </Link>

            {/* Desktop Nav */}
            <div className="hidden lg:flex items-center gap-8">
              {navLinks.map((link) => (
                <Link 
                  key={link.name} 
                  to={link.path}
                  className={`relative font-semibold text-[15px] tracking-wide transition-colors py-2 group ${isActive(link.path) ? 'text-green-700' : 'text-gray-600 hover:text-green-700'}`}
                >
                  {link.name}
                  <span className={`absolute bottom-0 left-0 w-full h-0.5 bg-green-600 transform origin-left transition-transform duration-300 ${isActive(link.path) ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'}`}></span>
                </Link>
              ))}
              
              <div className="flex items-center gap-3 ml-4 pl-4 border-l border-gray-200">
                <Link to="/pricing" className="text-green-700 font-bold hover:bg-green-50 px-5 py-2.5 border-2 border-green-600 rounded-full transition-all text-sm uppercase tracking-wide">
                  Pricing
                </Link>
                <Link to="/demo" className="btn-nav shadow-green-200 hover:shadow-green-300 uppercase text-xs tracking-wider px-6 py-3">
                  Request Demo
                </Link>
              </div>
            </div>

            {/* Mobile Toggle Button - EXPLICIT HIGH Z-INDEX */}
            <button 
              onClick={() => setIsOpen(!isOpen)} 
              className="lg:hidden p-2 text-gray-700 hover:text-green-600 focus:outline-none z-[60] relative"
              aria-label={isOpen ? "Close Menu" : "Open Menu"}
            >
              {isOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      {/* Uses fixed positioning to cover entire screen, top-0 left-0 */}
      <div 
        className={`lg:hidden fixed inset-0 bg-white z-50 transition-transform duration-300 ease-in-out transform ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
        style={{ height: '100dvh', width: '100vw' }} // Dynamic viewport height
      >
        <div className="flex flex-col h-full overflow-y-auto">
          {/* Spacer for the top header area so content doesn't sit under the logo/close button */}
          <div className="h-20 shrink-0"></div>

          <div className="px-6 py-4 flex flex-col gap-6">
            {navLinks.map((link) => (
              <Link 
                key={link.name} 
                to={link.path} 
                onClick={() => setIsOpen(false)}
                className={`text-2xl font-serif font-bold py-3 border-b border-gray-100 ${isActive(link.path) ? 'text-green-700 pl-4 border-l-4 border-green-600 bg-green-50' : 'text-gray-800'}`}
              >
                {link.name}
              </Link>
            ))}
            
            <div className="flex flex-col gap-4 mt-4">
              <Link 
                to="/pricing" 
                onClick={() => setIsOpen(false)}
                className="text-green-700 font-bold border-2 border-green-600 py-4 rounded-xl w-full text-center text-lg hover:bg-green-50 transition"
              >
                Get Pricing
              </Link>
              <Link 
                to="/demo" 
                onClick={() => setIsOpen(false)}
                className="bg-green-600 text-white py-4 rounded-xl font-bold w-full text-center text-lg shadow-lg hover:bg-green-700 transition"
              >
                Request Demo
              </Link>
            </div>
            
            {/* Mobile Contact Info */}
            <div className="mt-8 pt-8 border-t border-gray-200 pb-10">
              <h4 className="text-gray-400 uppercase text-xs font-bold tracking-widest mb-6">Contact Info</h4>
              <div className="space-y-4 text-gray-600">
                <p className="flex items-center gap-4 text-lg"><Phone size={20} className="text-green-600" /> +1 (0001) 2222-2890</p>
                <p className="flex items-start gap-4 text-lg"><MapPin size={20} className="text-green-600 mt-1" /> 13891 Oswego Street, Aurora CO </p>
                <p className="flex items-center gap-4 text-lg"><Clock size={20} className="text-green-600" /> Mon - Fri: 8am - 6pm</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;