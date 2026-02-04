import React from 'react';
import Layout from '../components/layout/Layout';
import PageBanner from '../components/common/PageBanner';
import { Heart, Users, Shield, Target, Award, Smile } from 'lucide-react';

// Simple Intersection Observer Component (Reusing inline logic)
const AnimatedSection = ({ children, className = "", animation = "fade-in-up", delay = "" }) => {
  const [isVisible, setIsVisible] = React.useState(false);
  const domRef = React.useRef();

  React.useEffect(() => {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => setIsVisible(entry.isIntersecting));
    }, { threshold: 0.1 });
    
    const currentRef = domRef.current;
    if (currentRef) observer.observe(currentRef);
    return () => currentRef && observer.unobserve(currentRef);
  }, []);

  return (
    <div
      ref={domRef}
      className={`${className} ${isVisible ? `animate-${animation} ${delay}` : 'opacity-0'}`}
    >
      {children}
    </div>
  );
};

const AboutPage = () => {
  const stats = [
    { number: "10+", label: "Years Experience" },
    { number: "500+", label: "Agencies Served" },
    { number: "1M+", label: "Visits Managed" },
    { number: "99%", label: "Client Satisfaction" }
  ];

  return (
    <Layout>
      <PageBanner 
        title="About RAAH Home Health" 
        subtitle="Bridging the gap between compassionate care and advanced technology."
        image="https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&q=80&w=2070" 
      />

      {/* Mission Section */}
      <section className="py-24">
        <div className="container-custom">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <AnimatedSection animation="slide-in-left" className="relative">
              <div className="absolute -top-6 -left-6 w-24 h-24 bg-green-100 rounded-full -z-10"></div>
              <div className="absolute -bottom-6 -right-6 w-40 h-40 bg-green-50 rounded-full -z-10"></div>
              <img 
                src="https://images.unsplash.com/photo-1551076805-e1869033e561?auto=format&fit=crop&q=80&w=1000" 
                alt="Team Meeting" 
                className="rounded-2xl shadow-2xl w-full object-cover h-[500px]"
              />
            </AnimatedSection>
            
            <AnimatedSection animation="slide-in-right">
              <span className="text-green-600 font-bold tracking-widest uppercase text-sm mb-4 block">Our Mission</span>
              <h2 className="text-4xl font-bold text-gray-900 mb-6 font-serif">Empowering Care Providers</h2>
              <p className="text-gray-600 mb-8 text-lg leading-relaxed">
                At RAAH Home Health, we believe that administrative burdens should never get in the way of patient care. Our mission is to empower home health agencies with intuitive, powerful tools that streamline operations, ensure compliance, and ultimately improve patient outcomes.
              </p>
              
              <div className="grid sm:grid-cols-2 gap-6">
                {[
                  { icon: Shield, text: "Integrity & Compliance" },
                  { icon: Heart, text: "Patient-Centered Design" },
                  { icon: Target, text: "Innovation in Healthcare" },
                  { icon: Users, text: "Reliability & Security" }
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-4 p-4 bg-gray-50 rounded-xl border border-gray-100 hover:border-green-200 hover:bg-green-50 transition-colors">
                    <item.icon className="text-green-600 w-6 h-6" />
                    <span className="font-bold text-gray-800">{item.text}</span>
                  </div>
                ))}
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="bg-green-900 py-20 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
        <div className="container-custom relative z-10">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-12 text-center">
            {stats.map((stat, i) => (
              <AnimatedSection key={i} animation="zoom-in" delay={`delay-[${i*100}ms]`}>
                <div className="text-5xl md:text-6xl font-bold mb-2 text-green-400">{stat.number}</div>
                <div className="text-green-100 font-medium text-lg">{stat.label}</div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-24 bg-gray-50">
        <div className="container-custom">
          <AnimatedSection className="text-center mb-16">
            <h2 className="section-title">Meet Our Leadership</h2>
            <div className="section-divider"></div>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              A dedicated team of healthcare and technology veterans committed to your success.
            </p>
          </AnimatedSection>

          <div className="grid md:grid-cols-3 gap-10">
            {[
              { name: "Dr. Elena Rostova", role: "Chief Medical Officer", img: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&q=80&w=400" },
              { name: "James Sterling", role: "CEO & Founder", img: "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&w=400" },
              { name: "Sarah Chen", role: "Head of Product", img: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&q=80&w=400" }
            ].map((member, i) => (
              <AnimatedSection key={i} animation="fade-in-up" delay={`delay-[${i*150}ms]`}>
                <div className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 group">
                  <div className="h-80 overflow-hidden relative">
                    <img 
                      src={member.img} 
                      alt={member.name}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center pb-6">
                      <div className="flex gap-4 text-white">
                        <Award size={24} className="cursor-pointer hover:text-green-400" />
                        <Smile size={24} className="cursor-pointer hover:text-green-400" />
                      </div>
                    </div>
                  </div>
                  <div className="p-8 text-center">
                    <h3 className="text-2xl font-bold text-gray-900 mb-1 font-serif">{member.name}</h3>
                    <p className="text-green-600 font-bold uppercase text-xs tracking-wider">{member.role}</p>
                  </div>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default AboutPage;