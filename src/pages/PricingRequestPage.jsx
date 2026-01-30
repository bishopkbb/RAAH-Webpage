import React, { useState, useRef } from 'react';
import ReCAPTCHA from 'react-google-recaptcha';
import Layout from '../components/layout/Layout';
import { publicApi } from '../api/services';
import { Loader2, CheckCircle, ShieldCheck, Zap, HeartHandshake } from 'lucide-react';
import toast from 'react-hot-toast';

const PricingRequestPage = () => {
  const [formData, setFormData] = useState({
    agency_name: '', contact_name: '', contact_email: '', contact_phone: '',
    estimated_patients: '', notes: ''
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [recaptchaToken, setRecaptchaToken] = useState(null);
  const recaptchaRef = useRef();

  const handleChange = (e) => setFormData({...formData, [e.target.name]: e.target.value});

  const handleSubmit = async (e) => {
    e.preventDefault();
    if(!recaptchaToken) {
      toast.error("Please verify you are human.");
      return;
    }
    
    setLoading(true);

    // Clean data
    const payload = {
      ...formData,
      estimated_patients: formData.estimated_patients ? parseInt(formData.estimated_patients) : null,
      recaptcha_token: recaptchaToken
    };

    try {
      await publicApi.submitPricingRequest(payload);
      setSuccess(true);
      toast.success("Quote request sent successfully!");
      window.scrollTo(0, 0);
    } catch (error) {
      console.error("Submission Error:", error.response?.data || error.message);
      const errMsg = error.response?.data?.message || "Submission failed. Please try again.";
      
      if(error.response?.data?.errors) {
         Object.values(error.response.data.errors).flat().forEach(err => toast.error(err));
      } else {
         toast.error(errMsg);
      }
    } finally {
      setLoading(false);
      if(recaptchaRef.current) {
        recaptchaRef.current.reset();
        setRecaptchaToken(null);
      }
    }
  };

  return (
    <Layout>
      <div className="relative min-h-screen bg-gray-900 py-20 lg:py-28 overflow-hidden">
        {/* Background Accents */}
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-green-900 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/2 opacity-40"></div>
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-green-800 rounded-full blur-[100px] translate-y-1/2 -translate-x-1/2 opacity-30"></div>

        <div className="container-custom relative z-10">
          <div className="text-center mb-16 animate-fade-in-up">
            <span className="text-green-400 font-bold tracking-widest uppercase text-sm mb-4 block">Flexible Solutions</span>
            <h1 className="text-4xl md:text-6xl font-serif font-bold text-white mb-6">Transparent Pricing for Every Agency</h1>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto leading-relaxed">
              Whether you're a startup or an enterprise, we have a plan that scales with you. Fill out the form to get a custom quote tailored to your volume.
            </p>
          </div>

          <div className="max-w-6xl mx-auto flex flex-col lg:flex-row gap-8 lg:gap-12">
            
            {/* Value Props Card */}
            <div className="lg:w-5/12 space-y-6 animate-slide-in-left delay-100">
              <div className="bg-white/10 backdrop-blur-md p-8 rounded-2xl border border-white/10 hover:bg-white/15 transition-all duration-300">
                <div className="w-12 h-12 bg-green-500 rounded-xl flex items-center justify-center mb-4 text-white shadow-lg">
                  <Zap size={24} />
                </div>
                <h3 className="text-xl font-bold text-white mb-2">All-Inclusive Features</h3>
                <p className="text-green-100">Every plan includes unlimited users, mobile app access, and automated billing. No hidden module fees.</p>
              </div>

              <div className="bg-white/10 backdrop-blur-md p-8 rounded-2xl border border-white/10 hover:bg-white/15 transition-all duration-300">
                <div className="w-12 h-12 bg-blue-500 rounded-xl flex items-center justify-center mb-4 text-white shadow-lg">
                  <ShieldCheck size={24} />
                </div>
                <h3 className="text-xl font-bold text-white mb-2">Enterprise Security</h3>
                <p className="text-blue-100">HIPAA compliant data centers, encrypted communications, and regular security audits included.</p>
              </div>

              <div className="bg-white/10 backdrop-blur-md p-8 rounded-2xl border border-white/10 hover:bg-white/15 transition-all duration-300">
                <div className="w-12 h-12 bg-purple-500 rounded-xl flex items-center justify-center mb-4 text-white shadow-lg">
                  <HeartHandshake size={24} />
                </div>
                <h3 className="text-xl font-bold text-white mb-2">Dedicated Onboarding</h3>
                <p className="text-purple-100">Our team migrates your data and trains your staff to ensure a smooth transition from day one.</p>
              </div>
            </div>

            {/* Form Card */}
            <div className="lg:w-7/12 animate-slide-in-right delay-200">
              <div className="bg-white rounded-3xl shadow-2xl p-8 md:p-12 relative">
                {success ? (
                  <div className="text-center py-20 animate-zoom-in">
                    <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-8">
                      <CheckCircle className="w-12 h-12 text-green-600" />
                    </div>
                    <h3 className="text-3xl text-gray-900 font-bold mb-4 font-serif">Quote Request Sent!</h3>
                    <p className="text-gray-600 text-lg mb-10 max-w-md mx-auto">
                      Thank you for your interest. Our sales team is reviewing your details and will email a custom proposal within 24 hours.
                    </p>
                    <button onClick={() => window.location.href='/'} className="btn-secondary w-full md:w-auto px-12">
                      Return to Homepage
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <h2 className="text-2xl font-bold text-gray-900 mb-8 font-serif border-b pb-4">Request a Quote</h2>
                    
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-bold text-gray-700 mb-2 uppercase tracking-wider text-xs">Agency Name</label>
                        <input name="agency_name" required onChange={handleChange} className="input-field bg-gray-50 border-gray-200 focus:bg-white" placeholder="e.g. Caring Hearts" />
                      </div>
                      <div>
                        <label className="block text-sm font-bold text-gray-700 mb-2 uppercase tracking-wider text-xs">Contact Person</label>
                        <input name="contact_name" required onChange={handleChange} className="input-field bg-gray-50 border-gray-200 focus:bg-white" placeholder="Full Name" />
                      </div>
                    </div>
                    
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-bold text-gray-700 mb-2 uppercase tracking-wider text-xs">Work Email</label>
                        <input type="email" name="contact_email" required onChange={handleChange} className="input-field bg-gray-50 border-gray-200 focus:bg-white" placeholder="name@agency.com" />
                      </div>
                      <div>
                        <label className="block text-sm font-bold text-gray-700 mb-2 uppercase tracking-wider text-xs">Phone Number</label>
                        <input type="tel" name="contact_phone" onChange={handleChange} className="input-field bg-gray-50 border-gray-200 focus:bg-white" placeholder="(555) 123-4567" />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-bold text-gray-700 mb-2 uppercase tracking-wider text-xs">Active Patient Count</label>
                      <input type="number" name="estimated_patients" onChange={handleChange} className="input-field bg-gray-50 border-gray-200 focus:bg-white" placeholder="e.g. 75" />
                      <p className="text-xs text-green-600 mt-2 font-medium">We use this to recommend the most cost-effective tier.</p>
                    </div>

                    <div>
                      <label className="block text-sm font-bold text-gray-700 mb-2 uppercase tracking-wider text-xs">Specific Needs / Questions</label>
                      <textarea name="notes" rows="3" onChange={handleChange} className="input-field bg-gray-50 border-gray-200 focus:bg-white" placeholder="Tell us about your current challenges..."></textarea>
                    </div>

                    {/* REMOVED scaling to fix mobile clickability */}
                    <div className="flex justify-center py-4">
                      <ReCAPTCHA
                        ref={recaptchaRef}
                        sitekey={import.meta.env.VITE_RECAPTCHA_SITE_KEY}
                        onChange={setRecaptchaToken}
                      />
                    </div>

                    <button type="submit" disabled={loading} className="w-full btn-primary text-lg py-4 shadow-xl hover:shadow-2xl hover:-translate-y-1 transition-all duration-300">
                      {loading ? <Loader2 className="animate-spin" /> : "Get Custom Pricing"}
                    </button>
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default PricingRequestPage;