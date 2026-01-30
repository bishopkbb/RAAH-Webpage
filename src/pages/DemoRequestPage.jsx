import React, { useState, useRef } from 'react';
import ReCAPTCHA from 'react-google-recaptcha';
import Layout from '../components/layout/Layout';
import { publicApi } from '../api/services';
import { Loader2, CheckCircle, Video, Users, BarChart } from 'lucide-react';
import toast from 'react-hot-toast';

const DemoRequestPage = () => {
  const [formData, setFormData] = useState({
    agency_name: '', 
    contact_name: '', 
    contact_email: '', 
    contact_phone: '',
    estimated_patients: '', 
    preferred_demo_date: '', 
    demo_format: 'live' 
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
      // Ensure estimated_patients is sent as an integer
      estimated_patients: formData.estimated_patients ? parseInt(formData.estimated_patients) : null,
      preferred_demo_date: formData.preferred_demo_date || null,
      recaptcha_token: recaptchaToken
    };

    try {
      await publicApi.submitDemoRequest(payload);
      setSuccess(true);
      toast.success("Demo request submitted successfully!");
      window.scrollTo(0, 0);
    } catch (error) {
      console.error("Submission Error:", error.response?.data || error.message);
      const errMsg = error.response?.data?.message || "Submission failed. Please check your connection.";
      
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
      <div className="bg-gradient-to-br from-green-50 to-white min-h-screen py-16 lg:py-24">
        <div className="container-custom">
          <div className="flex flex-col lg:flex-row gap-12 lg:gap-20 items-start">
            
            {/* Left Column: Content */}
            <div className="lg:w-1/2 space-y-8 animate-slide-in-left lg:sticky lg:top-24">
              <div>
                <span className="bg-green-100 text-green-700 px-4 py-1.5 rounded-full text-sm font-bold uppercase tracking-wider inline-block mb-4">
                  Free 30-Minute Session
                </span>
                <h1 className="text-4xl lg:text-5xl font-serif font-bold text-gray-900 leading-tight mb-6">
                  See <span className="text-green-600">CareFlow</span> in Action
                </h1>
                <p className="text-xl text-gray-600 leading-relaxed">
                  Discover how our all-in-one platform can streamline your agency's operations, improve compliance, and boost profitability.
                </p>
              </div>
              
              <div className="space-y-8 pt-4 border-t border-gray-100">
                <div className="flex gap-5">
                  <div className="w-12 h-12 bg-white rounded-xl shadow-md flex items-center justify-center text-green-600 shrink-0 border border-gray-100">
                    <Video size={24} />
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900 text-lg mb-1">Live Walkthrough</h3>
                    <p className="text-gray-500 leading-relaxed">Get a personalized tour of features relevant to your specific needs.</p>
                  </div>
                </div>
                <div className="flex gap-5">
                  <div className="w-12 h-12 bg-white rounded-xl shadow-md flex items-center justify-center text-green-600 shrink-0 border border-gray-100">
                    <Users size={24} />
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900 text-lg mb-1">Q&A with Experts</h3>
                    <p className="text-gray-500 leading-relaxed">Ask technical or operational questions directly to our product specialists.</p>
                  </div>
                </div>
                <div className="flex gap-5">
                  <div className="w-12 h-12 bg-white rounded-xl shadow-md flex items-center justify-center text-green-600 shrink-0 border border-gray-100">
                    <BarChart size={24} />
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900 text-lg mb-1">ROI Analysis</h3>
                    <p className="text-gray-500 leading-relaxed">See potential cost savings and efficiency gains for your agency size.</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column: Form */}
            <div className="lg:w-1/2 w-full animate-slide-in-right delay-100">
              <div className="bg-white rounded-3xl shadow-xl p-8 md:p-10 border border-gray-100 relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-2 bg-green-600"></div>
                
                {success ? (
                  <div className="text-center py-16 animate-zoom-in">
                    <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                      <CheckCircle className="w-12 h-12 text-green-600" />
                    </div>
                    <h3 className="text-2xl text-gray-900 font-bold mb-3 font-serif">Request Received!</h3>
                    <p className="text-gray-600 text-lg mb-8 max-w-sm mx-auto">
                      Thank you for your interest. A member of our team will contact you shortly to confirm your demo time.
                    </p>
                    <button onClick={() => window.location.href='/'} className="btn-secondary w-full">
                      Return to Homepage
                    </button>
                  </div>
                ) : (
                  <>
                    <h2 className="text-2xl font-bold text-gray-900 mb-8 font-serif border-b border-gray-100 pb-6">Schedule Your Demo</h2>
                    <form onSubmit={handleSubmit} className="space-y-5">
                      <div className="grid md:grid-cols-2 gap-5">
                        <div>
                          <label className="block text-sm font-bold text-gray-700 mb-2 uppercase tracking-wider text-xs">Agency Name</label>
                          <input name="agency_name" required onChange={handleChange} className="input-field bg-gray-50 focus:bg-white transition-colors" placeholder="Your Agency" />
                        </div>
                        <div>
                          <label className="block text-sm font-bold text-gray-700 mb-2 uppercase tracking-wider text-xs">Contact Person</label>
                          <input name="contact_name" required onChange={handleChange} className="input-field bg-gray-50 focus:bg-white transition-colors" placeholder="Full Name" />
                        </div>
                      </div>
                      
                      <div className="grid md:grid-cols-2 gap-5">
                        <div>
                          <label className="block text-sm font-bold text-gray-700 mb-2 uppercase tracking-wider text-xs">Work Email</label>
                          <input type="email" name="contact_email" required onChange={handleChange} className="input-field bg-gray-50 focus:bg-white transition-colors" placeholder="name@company.com" />
                        </div>
                        <div>
                          <label className="block text-sm font-bold text-gray-700 mb-2 uppercase tracking-wider text-xs">Phone Number</label>
                          <input type="tel" name="contact_phone" onChange={handleChange} className="input-field bg-gray-50 focus:bg-white transition-colors" placeholder="(555) 123-4567" />
                        </div>
                      </div>

                      <div className="grid md:grid-cols-2 gap-5">
                        <div>
                          <label className="block text-sm font-bold text-gray-700 mb-2 uppercase tracking-wider text-xs">Estimated Patients</label>
                          <select 
                            name="estimated_patients" 
                            onChange={handleChange} 
                            className="input-field bg-gray-50 focus:bg-white transition-colors"
                            required
                          >
                            <option value="">Select Range</option>
                            <option value="25">1-25 Patients</option>
                            <option value="50">26-50 Patients</option>
                            <option value="100">51-100 Patients</option>
                            <option value="250">101-250 Patients</option>
                            <option value="500">251-500 Patients</option>
                            <option value="1000">500+ Patients</option>
                          </select>
                        </div>
                        <div>
                          <label className="block text-sm font-bold text-gray-700 mb-2 uppercase tracking-wider text-xs">Demo Format</label>
                          <select name="demo_format" onChange={handleChange} className="input-field bg-gray-50 focus:bg-white transition-colors">
                            <option value="live">Live Video Call</option>
                            <option value="screen_share">Screen Share Walkthrough</option>
                            <option value="recorded">Send me a Recording</option>
                            <option value="sandbox">Sandbox Access</option>
                          </select>
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-bold text-gray-700 mb-2 uppercase tracking-wider text-xs">Preferred Date (Optional)</label>
                        <input type="date" name="preferred_demo_date" onChange={handleChange} className="input-field bg-gray-50 focus:bg-white transition-colors" />
                      </div>

                      {/* No transform used to ensure mobile clickability */}
                      <div className="flex justify-center py-4 w-full">
                        <ReCAPTCHA
                          ref={recaptchaRef}
                          sitekey={import.meta.env.VITE_RECAPTCHA_SITE_KEY}
                          onChange={setRecaptchaToken}
                        />
                      </div>

                      <button type="submit" disabled={loading} className="w-full btn-primary text-lg py-4 shadow-xl hover:shadow-2xl hover:-translate-y-1 transition-all duration-300">
                        {loading ? <Loader2 className="animate-spin" /> : "Request Demo Session"}
                      </button>
                      <p className="text-center text-xs text-gray-400 mt-4">
                        By submitting, you agree to our Terms of Service and Privacy Policy.
                      </p>
                    </form>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default DemoRequestPage;