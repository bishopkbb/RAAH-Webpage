import React from 'react';
import Layout from '../components/layout/Layout';
import PageBanner from '../components/common/PageBanner';
import { Phone, Mail, MapPin, Clock, Send } from 'lucide-react';

const ContactPage = () => {
  return (
    <Layout>
      <PageBanner 
        title="Contact Us" 
        subtitle="We'd love to hear from you. Get in touch with our team."
        image="https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&q=80&w=2070"
      />

      <section className="py-24 bg-gray-50">
        <div className="container-custom">
          <div className="grid lg:grid-cols-2 gap-16">
            
            {/* Contact Info Column */}
            <div className="space-y-10">
              <div>
                <h2 className="text-3xl font-bold text-gray-900 mb-6 font-serif">Get in Touch</h2>
                <div className="h-1 w-20 bg-green-600 rounded mb-6"></div>
                <p className="text-gray-600 text-lg leading-relaxed">
                  Whether you have questions about features, pricing, or need support, our team is ready to answer all your questions. We usually respond within 24 hours.
                </p>
              </div>

              <div className="grid gap-8">
                <div className="flex items-start gap-6 p-6 bg-white rounded-xl shadow-sm border border-gray-100 hover:border-green-200 transition-all">
                  <div className="w-14 h-14 bg-green-100 rounded-full flex items-center justify-center shrink-0 text-green-600">
                    <MapPin size={24} />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">Our Location</h3>
                    <p className="text-gray-600">13891 Oswego Street,<br/>Aurora CO</p>
                  </div>
                </div>

                <div className="flex items-start gap-6 p-6 bg-white rounded-xl shadow-sm border border-gray-100 hover:border-green-200 transition-all">
                  <div className="w-14 h-14 bg-green-100 rounded-full flex items-center justify-center shrink-0 text-green-600">
                    <Phone size={24} />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">Phone Number</h3>
                    <p className="text-gray-600 text-lg"> +1 (0001) 2222-2890</p>
                    <p className="text-green-600 text-sm mt-1 font-medium">Mon-Fri from 8am to 6pm</p>
                  </div>
                </div>

                <div className="flex items-start gap-6 p-6 bg-white rounded-xl shadow-sm border border-gray-100 hover:border-green-200 transition-all">
                  <div className="w-14 h-14 bg-green-100 rounded-full flex items-center justify-center shrink-0 text-green-600">
                    <Mail size={24} />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">Email Address</h3>
                    <p className="text-gray-600">info@raahhealth.org</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Map / Form Column */}
            <div className="bg-white rounded-3xl shadow-xl overflow-hidden border border-gray-200 h-full min-h-[500px] relative">
              {/* Map Placeholder - Styled to look active */}
              <div className="absolute inset-0 bg-gray-200 flex items-center justify-center">
                <div className="text-center">
                   <div className="inline-block p-4 rounded-full bg-white shadow-lg mb-4 animate-bounce">
                     <MapPin size={32} className="text-red-500" />
                   </div>
                   <p className="text-gray-500 font-medium">Interactive Map Loading...</p>
                   <p className="text-gray-400 text-sm">(Integration Placeholder)</p>
                </div>
              </div>
              
              {/* Optional: If you wanted a contact form here instead of a map, you could replace the above div */}
            </div>

          </div>
        </div>
      </section>

      {/* Support CTA */}
      {/*<section className="bg-green-50 py-20">
        <div className="container-custom text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-6 font-serif">Current Client?</h2>
          <p className="text-gray-600 mb-8 max-w-2xl mx-auto text-lg">
            Visit our Help Center for tutorials, documentation, and direct support from our technical team.
          </p>
          <button className="btn-secondary px-10 py-3">
            Visit Help Center
          </button>
        </div>
      </section>*/}
    </Layout>
  );
};

export default ContactPage;