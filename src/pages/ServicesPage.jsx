import React from 'react';
import Layout from '../components/layout/Layout';
import PageBanner from '../components/common/PageBanner';
import { 
  Calendar, Smartphone, FileText, DollarSign, 
  ShieldCheck, PieChart, ArrowRight 
} from 'lucide-react';
import { Link } from 'react-router-dom';

const ServicesPage = () => {
  const services = [
    {
      icon: Calendar,
      title: "Smart Scheduling",
      desc: "Optimize your workforce with intelligent scheduling. Drag-and-drop interface with automatic conflict detection, caregiver matching based on skills and location, and automated shift reminders to reduce no-shows."
    },
    {
      icon: Smartphone,
      title: "Caregiver Mobile App",
      desc: "Empower your field staff. GPS-verified EVV, offline documentation capabilities, secure messaging, and digital signature capture—all in a user-friendly mobile application."
    },
    {
      icon: DollarSign,
      title: "Automated Billing",
      desc: "Get paid faster. Automatically convert completed visits into claims (CMS-1500). Manage invoices, track payments, and integrate seamlessly with major payers to reduce rejections."
    },
    {
      icon: FileText,
      title: "Clinical Documentation",
      desc: "Ensure compliance and quality. Access OASIS-E compliant forms, customizable care plans, and medication management tools designed to meet regulatory standards effortlessly."
    },
    {
      icon: ShieldCheck,
      title: "Compliance & EVV",
      desc: "Stay audit-ready. Built-in Electronic Visit Verification (EVV) with state aggregator integration ensures you meet all federal and state mandates without extra paperwork."
    },
    {
      icon: PieChart,
      title: "Reporting & Analytics",
      desc: "Data-driven decisions. Monitor agency health with real-time dashboards for revenue, visit completion rates, caregiver performance, and operational efficiency."
    }
  ];

  return (
    <Layout>
      <PageBanner 
        title="Our Services" 
        subtitle="A comprehensive suite of tools designed to manage every aspect of your home health agency."
        image="https://images.unsplash.com/photo-1504813184591-01572f98c85f?auto=format&fit=crop&q=80&w=2071"
      />

      <section className="py-24 bg-white">
        <div className="container-custom">
          <div className="text-center mb-20">
            <span className="text-green-600 font-bold tracking-widest uppercase text-sm mb-4 block">Features</span>
            <h2 className="section-title">Everything You Need to Succeed</h2>
            <div className="section-divider"></div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
            {services.map((service, index) => (
              <div key={index} className="p-10 bg-white rounded-2xl shadow-lg border border-gray-100 hover:border-green-200 hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 group flex flex-col h-full">
                <div className="w-16 h-16 bg-green-50 rounded-2xl flex items-center justify-center mb-8 group-hover:bg-green-600 transition-colors duration-300 shrink-0">
                  <service.icon className="w-8 h-8 text-green-600 group-hover:text-white transition-colors duration-300" />
                </div>
                <h3 className="text-2xl font-bold mb-4 text-gray-900 font-serif group-hover:text-green-700 transition-colors">{service.title}</h3>
                <p className="text-gray-600 leading-relaxed flex-grow">{service.desc}</p>
                <div className="pt-8 mt-auto">
                  <Link to="/demo" className="text-green-600 font-bold flex items-center gap-2 group-hover:gap-3 transition-all">
                    Learn more <ArrowRight size={18} />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-green-900 py-24 text-white text-center relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-20"></div>
        <div className="container-custom relative z-10">
          <h2 className="text-4xl md:text-5xl font-bold font-serif mb-8">Ready to optimize your agency?</h2>
          <p className="text-xl text-green-100 mb-10 max-w-2xl mx-auto">
            Join hundreds of agencies that trust CareFlow for their daily operations. Experience the difference today.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-6">
            <Link to="/pricing" className="bg-white text-green-900 px-10 py-4 rounded-full font-bold text-lg hover:bg-gray-100 transition shadow-xl">
              View Pricing Plans
            </Link>
            <Link to="/demo" className="bg-green-700 text-white border-2 border-green-600 px-10 py-4 rounded-full font-bold text-lg hover:bg-green-600 transition">
              Book a Demo
            </Link>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default ServicesPage;