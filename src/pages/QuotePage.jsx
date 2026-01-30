import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Layout from '../components/layout/Layout';
import { publicApi } from '../api/services';
import { CheckCircle, Loader2, AlertTriangle, ShieldCheck, CreditCard, Lock } from 'lucide-react';
import toast from 'react-hot-toast';

const QuotePage = () => {
  const { token } = useParams();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [processing, setProcessing] = useState(false);
  
  // Data State
  const [agencyName, setAgencyName] = useState('');
  const [availablePlans, setAvailablePlans] = useState([]);
  const [selectedPlan, setSelectedPlan] = useState(null); // The currently active plan object

  useEffect(() => {
    const fetchQuote = async () => {
      try {
        const response = await publicApi.getQuoteDetails(token);
        const data = response.data.data;
        
        setAgencyName(data.agency_name);
        setAvailablePlans(data.plans);
        
        // Find default plan
        const defaultPlan = data.plans.find(p => p.id === data.default_plan_id);
        setSelectedPlan(defaultPlan || data.plans[0]);
        
      } catch (err) {
        console.error(err);
        setError(err.response?.data?.message || "Invalid or expired quote link.");
      } finally {
        setLoading(false);
      }
    };
    fetchQuote();
  }, [token]);

  // Toggle Handler
  const toggleInterval = () => {
    // Find the 'other' plan (if currently monthly, find yearly, and vice versa)
    const currentInterval = selectedPlan.billing_interval;
    const targetInterval = currentInterval === 'monthly' ? 'yearly' : 'monthly';
    
    const targetPlan = availablePlans.find(p => p.billing_interval === targetInterval);
    
    if (targetPlan) {
      setSelectedPlan(targetPlan);
    } else {
      toast.error(`Sorry, a ${targetInterval} option is not available for this plan.`);
    }
  };

  const handlePayment = async () => {
    setProcessing(true);
    try {
      // Pass the selected plan ID to the backend
      const response = await publicApi.createCheckoutSession(token, { plan_id: selectedPlan.id });
      window.location.href = response.data.checkout_url;
    } catch (err) {
      toast.error(err.response?.data?.message || "Payment initialization failed.");
      setProcessing(false);
    }
  };

  if (loading) {
    return (
      <Layout>
        <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50">
          <Loader2 className="animate-spin text-green-600 w-12 h-12 mb-4" />
          <p className="text-gray-500 font-medium">Loading your quote details...</p>
        </div>
      </Layout>
    );
  }

  if (error || !selectedPlan) {
    return (
      <Layout>
        <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
          <div className="bg-white p-8 rounded-2xl max-w-lg w-full text-center shadow-xl border border-red-100">
            <AlertTriangle className="w-16 h-16 text-red-500 mx-auto mb-6" />
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Unable to Load Quote</h2>
            <p className="text-gray-600 mb-6">{error}</p>
            <a href="/contact" className="btn-secondary inline-block">Contact Support</a>
          </div>
        </div>
      </Layout>
    );
  }

  // Calculate savings if yearly exists
  const monthlyPlan = availablePlans.find(p => p.billing_interval === 'monthly');
  const yearlyPlan = availablePlans.find(p => p.billing_interval === 'yearly');
  let savingsText = null;
  
  if (monthlyPlan && yearlyPlan && selectedPlan.billing_interval === 'yearly') {
    const annualCostIfMonthly = monthlyPlan.price * 12;
    const savings = annualCostIfMonthly - yearlyPlan.price;
    if (savings > 0) {
        savingsText = `Save $${savings.toFixed(0)} per year!`;
    }
  }

  return (
    <Layout>
      <div className="min-h-screen bg-gray-900 py-20 relative overflow-hidden">
        {/* Background Effects */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0">
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-green-600/20 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/3"></div>
          <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-blue-600/20 rounded-full blur-[120px] translate-y-1/2 -translate-x-1/3"></div>
        </div>

        <div className="container-custom relative z-10">
          <div className="max-w-4xl mx-auto">
            
            {/* Header */}
            <div className="text-center mb-10 text-white">
              <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-1.5 rounded-full text-sm font-medium text-green-300 mb-6 border border-white/10">
                <CheckCircle size={16} /> Quote Ready for {agencyName}
              </div>
              <h1 className="text-3xl md:text-5xl font-serif font-bold mb-4">Complete Your Subscription</h1>
              <p className="text-xl text-gray-300">Review your plan details below to activate your agency account.</p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              
              {/* Left: Plan Details Card */}
              <div className="md:col-span-2 bg-white rounded-3xl shadow-2xl overflow-hidden animate-slide-in-left">
                <div className="bg-green-50 p-8 border-b border-green-100 flex justify-between items-center">
                  <div>
                    <h2 className="text-sm font-bold text-green-600 tracking-widest uppercase mb-2">Selected Plan</h2>
                    <h3 className="text-3xl font-bold text-gray-900">{selectedPlan.name}</h3>
                  </div>
                  
                  {/* TOGGLE SWITCH */}
                  {yearlyPlan && (
                    <div className="bg-white p-1 rounded-lg border border-green-200 flex items-center shadow-sm">
                        <button
                            onClick={() => selectedPlan.billing_interval !== 'monthly' && toggleInterval()}
                            className={`px-3 py-1.5 rounded-md text-sm font-bold transition-all ${
                                selectedPlan.billing_interval === 'monthly' 
                                ? 'bg-green-100 text-green-700 shadow-sm' 
                                : 'text-gray-500 hover:text-green-600'
                            }`}
                        >
                            Monthly
                        </button>
                        <button
                            onClick={() => selectedPlan.billing_interval !== 'yearly' && toggleInterval()}
                            className={`px-3 py-1.5 rounded-md text-sm font-bold transition-all ${
                                selectedPlan.billing_interval === 'yearly' 
                                ? 'bg-green-100 text-green-700 shadow-sm' 
                                : 'text-gray-500 hover:text-green-600'
                            }`}
                        >
                            Yearly
                        </button>
                    </div>
                  )}
                </div>
                
                <div className="p-8">
                  <div className="flex items-baseline mb-2">
                    <span className="text-5xl font-bold text-gray-900">${Number(selectedPlan.price).toFixed(2)}</span>
                    <span className="text-gray-500 ml-2 text-lg capitalize">/ {selectedPlan.billing_interval}</span>
                  </div>
                  
                  {savingsText && (
                      <div className="mb-8 inline-block bg-green-100 text-green-800 text-sm font-bold px-3 py-1 rounded-full">
                          ðŸŽ‰ {savingsText}
                      </div>
                  )}
                  
                  {!savingsText && <div className="mb-8"></div>}

                  <div className="space-y-4 mb-8">
                    <h4 className="font-bold text-gray-900 mb-2">Plan Includes:</h4>
                    <ul className="space-y-3">
                      {[
                        "Unlimited Agency Users",
                        "Caregiver Mobile App Access",
                        "Real-Time EVV & GPS Verification",
                        "Automated Billing & Invoicing",
                        "Clinical Documentation (OASIS-E)",
                        "HIPAA Compliant Secure Storage",
                        "24/7 Priority Technical Support"
                      ].map((feature, i) => (
                        <li key={i} className="flex items-start gap-3 text-gray-600">
                          <CheckCircle className="w-5 h-5 text-green-500 shrink-0 mt-0.5" />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="bg-gray-50 p-4 rounded-xl flex items-start gap-3 border border-gray-100">
                    <ShieldCheck className="text-green-600 w-6 h-6 shrink-0" />
                    <div>
                      <p className="text-sm font-bold text-gray-900">Satisfaction Guarantee</p>
                      <p className="text-xs text-gray-500 mt-1">
                        Cancel anytime. If you're not satisfied within the first 30 days, we'll refund your subscription in full.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right: Payment Action Card */}
              <div className="bg-white/10 backdrop-blur-md border border-white/10 rounded-3xl p-6 text-white flex flex-col animate-slide-in-right delay-100">
                <div className="mb-6">
                  <h3 className="text-xl font-bold mb-2">Order Summary</h3>
                  <div className="flex justify-between py-3 border-b border-white/10">
                    <span className="text-gray-300">Plan</span>
                    <span className="font-medium text-white">{selectedPlan.name}</span>
                  </div>
                  <div className="flex justify-between py-3 border-b border-white/10">
                    <span className="text-gray-300">Interval</span>
                    <span className="font-medium text-white capitalize">{selectedPlan.billing_interval}</span>
                  </div>
                  <div className="flex justify-between py-4 text-xl font-bold">
                    <span>Total Due</span>
                    <span>${Number(selectedPlan.price).toFixed(2)}</span>
                  </div>
                </div>

                <div className="mt-auto space-y-4">
                  <button
                    onClick={handlePayment}
                    disabled={processing}
                    className="w-full bg-green-500 hover:bg-green-400 text-white font-bold py-4 rounded-xl shadow-lg shadow-green-900/20 transition-all transform hover:-translate-y-1 flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
                  >
                    {processing ? <Loader2 className="animate-spin" /> : (
                      <>Proceed to Payment <CreditCard size={20} /></>
                    )}
                  </button>
                  
                  <div className="flex items-center justify-center gap-2 text-xs text-gray-400">
                    <Lock size={12} />
                    <span>Secure SSL Encryption via Stripe</span>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default QuotePage;