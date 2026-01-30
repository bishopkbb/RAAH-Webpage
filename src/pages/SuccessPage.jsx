import React, { useEffect } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import Layout from '../components/layout/Layout';
import { CheckCircle, ArrowRight } from 'lucide-react';
import PageBanner from '../components/common/PageBanner';

const SuccessPage = () => {
  const [searchParams] = useSearchParams();
  const sessionId = searchParams.get('session_id');

  useEffect(() => {
    // Logic to verify session could go here if needed
  }, [sessionId]);

  return (
    <Layout>
      <div className="min-h-[80vh] flex items-center justify-center bg-gray-50 py-20 px-4">
        <div className="bg-white p-10 md:p-16 rounded-3xl shadow-xl max-w-2xl text-center">
          <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-8 animate-bounce">
            <CheckCircle className="w-12 h-12 text-green-600" />
          </div>
          
          <h1 className="text-3xl md:text-4xl font-serif font-bold text-gray-900 mb-4">
            Payment Successful!
          </h1>
          
          <p className="text-xl text-gray-600 mb-8 leading-relaxed">
            Welcome to RAAH Technologies. Your agency account is being provisioned right now. 
            <br className="hidden md:block"/>
            Please check your email for your <strong>login credentials</strong> and unique portal link.
          </p>

          <div className="bg-green-50 border border-green-200 rounded-xl p-6 mb-8 text-left">
            <h3 className="font-bold text-green-800 mb-2">Next Steps:</h3>
            <ul className="space-y-2 text-green-700">
              <li className="flex items-start gap-2">
                <span className="font-bold">1.</span> Check your inbox for the "Welcome" email.
              </li>
              <li className="flex items-start gap-2">
                <span className="font-bold">2.</span> Click your unique agency link.
              </li>
              <li className="flex items-start gap-2">
                <span className="font-bold">3.</span> Log in with the temporary password provided.
              </li>
            </ul>
          </div>

          <Link to="/" className="btn-primary inline-flex items-center">
            Return to Homepage <ArrowRight size={18} />
          </Link>
        </div>
      </div>
    </Layout>
  );
};

export default SuccessPage;