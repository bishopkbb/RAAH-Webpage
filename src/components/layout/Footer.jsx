import React from 'react';
import { Link } from 'react-router-dom';
import { Phone, MapPin, Mail, Facebook, Twitter, Linkedin, Instagram } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white pt-16 pb-8">
      <div className="container-custom">
        <div className="grid md:grid-cols-4 gap-8 mb-12">
          {/* Brand Column */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <img src="/raah.png" alt="RAAH" className="h-10 w-auto bg-white rounded p-1" />
              <span className="text-2xl font-bold font-serif">RAAH<span className="text-green-500">Tech</span></span>
            </div>
            <p className="text-gray-400 mb-6">
              Revolutionizing home health care with integrated technology solutions for agencies, caregivers, and patients.
            </p>
            <div className="flex gap-4">
              <a href="#" className="hover:text-green-400 transition"><Facebook size={20} /></a>
              <a href="#" className="hover:text-green-400 transition"><Twitter size={20} /></a>
              <a href="#" className="hover:text-green-400 transition"><Linkedin size={20} /></a>
              <a href="#" className="hover:text-green-400 transition"><Instagram size={20} /></a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-bold mb-4 border-b border-green-700 pb-2 inline-block">Quick Links</h3>
            <ul className="space-y-2">
              <li><Link to="/" className="text-gray-400 hover:text-green-400 transition">Home</Link></li>
              <li><Link to="/about" className="text-gray-400 hover:text-green-400 transition">About Us</Link></li>
              <li><Link to="/services" className="text-gray-400 hover:text-green-400 transition">Our Services</Link></li>
              <li><Link to="/pricing" className="text-gray-400 hover:text-green-400 transition">Pricing</Link></li>
              <li><Link to="/contact" className="text-gray-400 hover:text-green-400 transition">Contact</Link></li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-lg font-bold mb-4 border-b border-green-700 pb-2 inline-block">Solutions</h3>
            <ul className="space-y-2">
              <li className="text-gray-400">Agency Management</li>
              <li className="text-gray-400">EVV Compliance</li>
              <li className="text-gray-400">Caregiver Mobile App</li>
              <li className="text-gray-400">Billing & Invoicing</li>
              <li className="text-gray-400">Clinical Documentation</li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-bold mb-4 border-b border-green-700 pb-2 inline-block">Contact Us</h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3 text-gray-400">
                <MapPin className="text-green-500 mt-1 shrink-0" size={18} />
                <span>123 Healthcare Blvd,<br/>Wellness City, HC 90210</span>
              </li>
              <li className="flex items-center gap-3 text-gray-400">
                <Phone className="text-green-500 shrink-0" size={18} />
                <span>(555) 123-4567</span>
              </li>
              <li className="flex items-center gap-3 text-gray-400">
                <Mail className="text-green-500 shrink-0" size={18} />
                <span>info@raahtech.com</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 pt-8 text-center text-gray-500 text-sm">
          <p>&copy; {new Date().getFullYear()} RAAH Technologies. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;