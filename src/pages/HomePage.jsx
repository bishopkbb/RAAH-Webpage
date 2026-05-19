/**
 * HomePage.jsx — RAAH Technologies
 *
 * Key change: HeroCarousel now accepts a `navbar` prop.
 * We pass <Navbar heroMode /> so the topbar + nav links render
 * INSIDE the green overlay of the hero section — not above it.
 *
 * Layout.jsx still wraps all inner pages with a solid Navbar.
 * Only the homepage passes heroMode.
 */

import React from 'react';
import Layout from '../components/layout/Layout';
import HeroCarousel from '../components/home/HeroCarousel';
import Navbar from '../components/layout/Navbar';
import { Shield, Clock, Activity, ArrowRight, CheckCircle, Smartphone, Globe, BarChart3, Users } from 'lucide-react';
import { Link } from 'react-router-dom';

// ─── Scroll-triggered animation wrapper ──────────────────────────────────────
const AnimatedSection = ({ children, className = '', animation = 'fade-in-up' }) => {
  const [isVisible, setIsVisible] = React.useState(false);
  const domRef = React.useRef();

  React.useEffect(() => {
    const observer = new IntersectionObserver(
      entries => entries.forEach(e => setIsVisible(e.isIntersecting)),
      { threshold: 0.1 }
    );
    const el = domRef.current;
    if (el) observer.observe(el);
    return () => el && observer.unobserve(el);
  }, []);

  return (
    <div
      ref={domRef}
      className={`${className} ${isVisible ? `animate-${animation}` : 'opacity-0'}`}
    >
      {children}
    </div>
  );
};

// ─── Component ────────────────────────────────────────────────────────────────

const HomePage = () => {
  return (
    /*
      Layout normally renders Navbar + main + Footer.
      On the homepage we override the nav by passing heroMode={true} into
      HeroCarousel. Layout.jsx needs a `hideNav` prop so it doesn't render
      a second navbar on this page.
      See note at bottom of this file for the Layout.jsx change required.
    */
    <Layout hideNav>

      {/* ── Hero: full-viewport, navbar injected inside ── */}
      <HeroCarousel navbar={<Navbar heroMode />} />

      {/* ── 1. Features Grid ── */}
      <section className="py-24 bg-white relative">
        <div className="container-custom">
          <AnimatedSection className="text-center mb-20" animation="fade-in-up">
            <span className="text-green-600 font-bold tracking-wider uppercase text-sm mb-2 block">Why Choose Us</span>
            <h2 className="section-title">Redefining Home Health Management</h2>
            <div className="section-divider" />
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              We provide the integrated tools you need to deliver exceptional care while ensuring strict compliance and operational efficiency.
            </p>
          </AnimatedSection>

          <div className="grid md:grid-cols-3 gap-10">
            {[
              {
                icon: Shield,
                title: 'HIPAA Compliant Security',
                desc: 'Enterprise-grade encryption and access controls ensuring your sensitive patient data remains protected at all times.',
              },
              {
                icon: Clock,
                title: 'Real-Time EVV',
                desc: 'GPS-verified visits integrated directly with state aggregators for seamless, error-free billing and compliance.',
              },
              {
                icon: Activity,
                title: 'Clinical Insights',
                desc: 'Advanced analytics and reporting dashboards to monitor patient health trends and improve care outcomes.',
              },
            ].map((feature, i) => (
              <AnimatedSection key={i} animation="fade-in-up" className="delay-[100ms]">
                <div className="p-10 rounded-2xl bg-white hover:shadow-2xl transition-all duration-300 border border-gray-100 hover:border-green-100 group h-full flex flex-col items-center text-center transform hover:-translate-y-2">
                  <div className="w-20 h-20 bg-green-50 rounded-full flex items-center justify-center mb-8 shadow-sm group-hover:bg-green-600 transition-colors duration-300">
                    <feature.icon className="w-10 h-10 text-green-600 group-hover:text-white transition-colors duration-300" />
                  </div>
                  <h3 className="text-2xl font-bold mb-4 text-gray-900 font-serif">{feature.title}</h3>
                  <p className="text-gray-600 leading-relaxed text-lg">{feature.desc}</p>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* ── 2. How It Works ── */}
      <section className="py-24 bg-gray-50 overflow-hidden">
        <div className="container-custom">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <AnimatedSection animation="slide-in-left" className="order-2 md:order-1 relative">
              <div className="absolute -top-10 -left-10 w-40 h-40 bg-green-200 rounded-full blur-3xl opacity-50" />
              <img
                src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=1000"
                alt="Dashboard Preview"
                className="rounded-2xl shadow-2xl relative z-10 border-4 border-white"
              />
              <div className="absolute -bottom-6 -right-6 bg-white p-6 rounded-xl shadow-xl z-20 hidden lg:block">
                <div className="flex items-center gap-4">
                  <div className="bg-green-100 p-3 rounded-full">
                    <BarChart3 className="text-green-600 w-6 h-6" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 font-bold uppercase">Efficiency</p>
                    <p className="text-2xl font-bold text-gray-900">+45%</p>
                  </div>
                </div>
              </div>
            </AnimatedSection>

            <AnimatedSection animation="slide-in-right" className="order-1 md:order-2">
              <span className="text-green-600 font-bold tracking-wider uppercase text-sm mb-2 block">Workflow</span>
              <h2 className="section-title text-left mb-6">Simplified Operations from Intake to Billing</h2>
              <p className="text-lg text-gray-600 mb-10">
                Our platform unifies your entire workflow, reducing administrative overhead so you can focus on care.
              </p>

              <div className="space-y-8">
                {[
                  { title: 'Smart Scheduling', text: 'Drag-and-drop visits with automatic conflict detection.' },
                  { title: 'Mobile Verification', text: 'Caregivers clock in via GPS-enabled mobile app.' },
                  { title: 'Instant Billing', text: 'Convert completed visits to invoices in one click.' },
                ].map((step, i) => (
                  <div key={i} className="flex gap-6 group">
                    <div className="w-12 h-12 bg-white border-2 border-green-600 text-green-600 group-hover:bg-green-600 group-hover:text-white transition-colors rounded-full flex items-center justify-center font-bold text-xl shrink-0 shadow-md">
                      {i + 1}
                    </div>
                    <div>
                      <h4 className="text-xl font-bold text-gray-900 mb-2 font-serif">{step.title}</h4>
                      <p className="text-gray-600 leading-relaxed">{step.text}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-12">
                <Link to="/demo" className="text-green-700 font-bold text-lg flex items-center gap-2 hover:gap-4 transition-all group">
                  See how it works <ArrowRight size={24} className="group-hover:text-green-500" />
                </Link>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* ── 3. Mobile App Showcase ── */}
      <section className="py-24 bg-green-900 text-white overflow-hidden relative">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-green-800 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2 opacity-60" />
        <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-green-700 rounded-full blur-[80px] translate-y-1/2 -translate-x-1/2 opacity-40" />

        <div className="container-custom relative z-10">
          <AnimatedSection animation="fade-in-up" className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl md:text-5xl font-bold font-serif mb-6 leading-tight">Empower Your Caregivers</h2>
            <p className="text-green-100 text-xl leading-relaxed">
              Our intuitive mobile app gives your field staff everything they need to focus on care, not paperwork — even without an internet connection.
            </p>
          </AnimatedSection>

          <div className="grid md:grid-cols-3 gap-8 text-center">
            {[
              { icon: Smartphone, title: 'Offline Mode',         desc: 'Document visits, vitals, and notes even in remote areas without internet connection.' },
              { icon: Globe,      title: 'Real-Time Chat',       desc: 'HIPAA-compliant secure messaging between office staff and caregivers in the field.' },
              { icon: CheckCircle,title: 'Digital Signatures',   desc: 'Capture patient verification signatures directly on the device at the point of care.' },
            ].map((item, i) => (
              <AnimatedSection key={i} animation="zoom-in" className={`delay-[${i * 200}ms]`}>
                <div className="bg-white/10 p-8 rounded-2xl backdrop-blur-md border border-white/10 hover:bg-white/20 transition-all duration-300 h-full">
                  <div className="bg-green-500/20 p-4 rounded-full w-20 h-20 mx-auto mb-6 flex items-center justify-center">
                    <item.icon className="w-10 h-10 text-green-300" />
                  </div>
                  <h3 className="text-2xl font-bold mb-4 font-serif">{item.title}</h3>
                  <p className="text-green-100">{item.desc}</p>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* ── 4. Testimonials ── */}
      <section className="py-24 bg-white">
        <div className="container-custom">
          <AnimatedSection animation="fade-in-up" className="text-center mb-16">
            <h2 className="section-title">Trusted by Leading Agencies</h2>
            <div className="section-divider" />
          </AnimatedSection>

          <div className="grid md:grid-cols-2 gap-10">
            {[
              {
                quote: '"RAAH Technologies transformed our billing process. We reduced claim rejections by 90% in the first month and our cash flow has never been better. The support team is incredible."',
                name: 'Sarah Johnson',
                role: 'Director, Caring Hands Home Health',
                initials: 'SJ',
                animation: 'slide-in-left',
              },
              {
                quote: '"The mobile app is incredibly easy for our caregivers to use. Training took almost no time at all, and compliance issues have virtually disappeared. Highly recommended!"',
                name: 'Michael Chen',
                role: 'Owner, BrightPath Services',
                initials: 'MC',
                animation: 'slide-in-right',
              },
            ].map((t, i) => (
              <AnimatedSection key={i} animation={t.animation}>
                <div className="bg-white p-10 rounded-2xl shadow-lg border border-gray-100 hover:shadow-xl transition-all relative">
                  <div className="absolute top-8 right-8 text-green-100">
                    <svg width="60" height="60" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M14.017 21L14.017 18C14.017 16.8954 14.9124 16 16.017 16H19.017C19.5693 16 20.017 15.5523 20.017 15V9C20.017 8.44772 19.5693 8 19.017 8H15.017C14.4647 8 14.017 8.44772 14.017 9V11C14.017 11.5523 13.5693 12 13.017 12H12.017V5H22.017V15C22.017 18.3137 19.3307 21 16.017 21H14.017ZM5.0166 21L5.0166 18C5.0166 16.8954 5.91203 16 7.0166 16H10.0166C10.5689 16 11.0166 15.5523 11.0166 15V9C11.0166 8.44772 10.5689 8 10.0166 8H6.0166C5.46432 8 5.0166 8.44772 5.0166 9V11C5.0166 11.5523 4.56889 12 4.0166 12H3.0166V5H13.0166V15C13.0166 18.3137 10.3303 21 7.0166 21H5.0166Z" />
                    </svg>
                  </div>
                  <div className="flex gap-1 text-yellow-400 mb-6">
                    {[1, 2, 3, 4, 5].map(s => <span key={s} className="text-xl">★</span>)}
                  </div>
                  <p className="text-gray-700 italic mb-8 text-lg leading-relaxed">{t.quote}</p>
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center font-bold text-gray-500">
                      {t.initials}
                    </div>
                    <div>
                      <p className="font-bold text-gray-900 text-lg">{t.name}</p>
                      <p className="text-green-600">{t.role}</p>
                    </div>
                  </div>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* ── 5. CTA Section ── */}
      <section className="py-28 bg-green-50 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-green-300 via-green-500 to-green-300" />
        <div className="container-custom relative z-10 text-center">
          <AnimatedSection animation="zoom-in">
            <h2 className="text-4xl md:text-5xl font-bold font-serif text-gray-900 mb-8 leading-tight">
              Ready to Transform Your Agency?
            </h2>
            <p className="text-xl text-gray-600 mb-12 max-w-2xl mx-auto">
              Get started with a personalised demo today. See exactly how RAAH can solve your specific challenges. No commitment required.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-6">
              <Link to="/demo" className="btn-primary text-xl px-12 py-5 shadow-2xl hover:shadow-3xl">
                Schedule Demo <Users size={20} />
              </Link>
              <Link to="/contact" className="btn-secondary text-xl px-12 py-5 border-2">
                Contact Sales
              </Link>
            </div>
          </AnimatedSection>
        </div>
      </section>

    </Layout>
  );
};

export default HomePage;

/*
 * ─── Required change in Layout.jsx ──────────────────────────────────────────
 *
 * Layout.jsx must accept a `hideNav` prop and conditionally render Navbar:
 *
 *   const Layout = ({ children, hideNav = false }) => (
 *     <>
 *       {!hideNav && <Navbar />}
 *       <main>{children}</main>
 *       <Footer />
 *       <Toaster ... />
 *     </>
 *   );
 *
 * This way, every inner page gets the solid Navbar via Layout as before,
 * and the homepage passes hideNav so it doesn't double-render it.
 * ────────────────────────────────────────────────────────────────────────────
 */