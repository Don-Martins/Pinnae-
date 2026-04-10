import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Cpu, Zap, Shield, Globe, Play } from 'lucide-react';
import { motion } from 'motion/react';
import { PRODUCTS, PROJECTS } from '../mockData';
import ProductCard from '../components/ProductCard';
import ProjectCard from '../components/ProjectCard';

const Home = () => {
  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center px-6 md:px-12 lg:px-16 py-24 lg:py-0 overflow-hidden">
        {/* Background Decorative Elements */}
        <div className="absolute top-1/4 -left-20 w-96 h-96 bg-blue-500/20 blur-[120px] rounded-full" />
        <div className="absolute bottom-1/4 -right-20 w-96 h-96 bg-purple-500/20 blur-[120px] rounded-full" />

        <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-2 gap-12 items-center relative z-10">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="w-full overflow-hidden"
          >
            <h1 className="text-3xl sm:text-5xl md:text-7xl font-display font-bold leading-[1.1] mb-6 tracking-tight break-words">
              Build the Future, <br className="hidden sm:block" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-purple-600">One Component</span> at a Time.
            </h1>
            <p className="text-lg text-[var(--text-muted)] mb-10 max-w-xl leading-relaxed">
              Pinnacle Tech is the ultimate destination for makers, engineers, and hobbyists. Discover premium components and expert-led DIY projects.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link to="/marketplace" className="btn-primary flex items-center gap-2 group">
                Shop Marketplace
                <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link to="/projects" className="btn-secondary flex items-center gap-2">
                Explore DIY Projects
                <Play size={18} fill="currentColor" />
              </Link>
            </div>

            <div className="mt-12 flex items-center gap-8 border-t border-[var(--border)] pt-8">
              <div>
                <div className="text-2xl font-bold">10k+</div>
                <div className="text-xs text-[var(--text-muted)] uppercase tracking-widest font-bold">Components</div>
              </div>
              <div className="w-px h-8 bg-[var(--border)]" />
              <div>
                <div className="text-2xl font-bold">500+</div>
                <div className="text-xs text-[var(--text-muted)] uppercase tracking-widest font-bold">DIY Projects</div>
              </div>
              <div className="w-px h-8 bg-[var(--border)]" />
              <div>
                <div className="text-2xl font-bold">50k+</div>
                <div className="text-xs text-[var(--text-muted)] uppercase tracking-widest font-bold">Makers</div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="relative hidden lg:block"
          >
            <div className="relative z-10 rounded-3xl overflow-hidden shadow-2xl border border-white/10">
              <img
                src="https://picsum.photos/seed/tech-hero/1200/1000"
                alt="Tech Hero"
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
              
              {/* Floating UI Elements */}
              <div className="absolute bottom-8 left-8 right-8 p-6 glass rounded-2xl border border-white/20">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-blue-500 rounded-xl flex items-center justify-center text-white">
                      <Cpu size={24} />
                    </div>
                    <div>
                      <div className="font-bold">Arduino Uno R4</div>
                      <div className="text-xs opacity-70">New Arrival • In Stock</div>
                    </div>
                  </div>
                  <div className="text-xl font-bold">$38.50</div>
                </div>
              </div>
            </div>
            
            {/* Decorative Circles */}
            <div className="absolute -top-10 -right-10 w-40 h-40 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full blur-3xl opacity-30 animate-pulse" />
          </motion.div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-24 px-6 bg-[var(--section)]">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
            <div>
              <h2 className="text-3xl md:text-4xl font-display font-bold mb-4 tracking-tight">Featured Components</h2>
              <p className="text-[var(--text-muted)] max-w-xl">
                Handpicked premium components for your next breakthrough project.
              </p>
            </div>
            <Link to="/marketplace" className="text-blue-500 font-bold flex items-center gap-2 hover:gap-3 transition-all">
              View All Products <ArrowRight size={20} />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {PRODUCTS.slice(0, 4).map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* DIY Projects Highlight */}
      <section className="py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 items-center mb-16">
            <div className="lg:col-span-1">
              <h2 className="text-3xl md:text-4xl font-display font-bold mb-6 tracking-tight">Learn by Doing</h2>
              <p className="text-[var(--text-muted)] mb-8 leading-relaxed">
                Explore our curated list of DIY projects. Each project comes with step-by-step instructions, video tutorials, and a one-click bundle purchase option.
              </p>
              <Link to="/projects" className="btn-secondary inline-flex items-center gap-2">
                Browse All Projects <ArrowRight size={18} />
              </Link>
            </div>
            <div className="lg:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-8">
              {PROJECTS.map((project) => (
                <ProjectCard key={project.id} project={project} />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-24 px-6 bg-[var(--background)] border-y border-[var(--border)]">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          <div className="flex flex-col gap-4">
            <div className="w-12 h-12 bg-blue-500/10 text-blue-500 rounded-xl flex items-center justify-center">
              <Zap size={24} />
            </div>
            <h3 className="text-xl font-bold">Fast Shipping</h3>
            <p className="text-sm text-[var(--text-muted)]">Global express shipping on all orders. Get your parts in record time.</p>
          </div>
          <div className="flex flex-col gap-4">
            <div className="w-12 h-12 bg-purple-500/10 text-purple-500 rounded-xl flex items-center justify-center">
              <Shield size={24} />
            </div>
            <h3 className="text-xl font-bold">Quality Guaranteed</h3>
            <p className="text-sm text-[var(--text-muted)]">Every component is tested and verified by our engineering team.</p>
          </div>
          <div className="flex flex-col gap-4">
            <div className="w-12 h-12 bg-green-500/10 text-green-500 rounded-xl flex items-center justify-center">
              <Globe size={24} />
            </div>
            <h3 className="text-xl font-bold">Global Community</h3>
            <p className="text-sm text-[var(--text-muted)]">Join 50k+ makers sharing projects and solving problems together.</p>
          </div>
          <div className="flex flex-col gap-4">
            <div className="w-12 h-12 bg-orange-500/10 text-orange-500 rounded-xl flex items-center justify-center">
              <Cpu size={24} />
            </div>
            <h3 className="text-xl font-bold">Expert Support</h3>
            <p className="text-sm text-[var(--text-muted)]">Technical support from real engineers who understand your build.</p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="relative rounded-[32px] overflow-hidden bg-gradient-to-br from-blue-600 to-purple-700 p-12 md:p-20 text-white text-center">
            <div className="absolute top-0 left-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10" />
            <div className="relative z-10 max-w-3xl mx-auto">
              <h2 className="text-4xl md:text-6xl font-display font-bold mb-8 leading-tight">Ready to Start Your Next Big Project?</h2>
              <p className="text-lg text-white/80 mb-10">
                Join our community of innovators and get access to exclusive components, tutorials, and early-bird discounts.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <Link to="/marketplace" className="px-8 py-4 bg-white text-blue-600 font-bold rounded-2xl hover:bg-gray-100 transition-all active:scale-95">
                  Get Started Now
                </Link>
                <Link to="/dashboard/login" className="px-8 py-4 bg-transparent border border-white/30 text-white font-bold rounded-2xl hover:bg-white/10 transition-all active:scale-95">
                  Create Account
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
