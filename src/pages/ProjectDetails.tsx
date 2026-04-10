import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { Play, Clock, BarChart3, Package, ChevronRight, CheckCircle2, ShoppingCart, ArrowRight } from 'lucide-react';
import { PROJECTS, PRODUCTS, BUNDLES } from '../mockData';
import { useAppContext } from '../context/AppContext';
import { cn } from '../lib/utils';
import { motion } from 'motion/react';

const ProjectDetails = () => {
  const { id } = useParams();
  const { addToCart } = useAppContext();
  
  const project = PROJECTS.find(p => p.id === id);
  const bundle = BUNDLES.find(b => b.id === project?.bundleId);
  const components = project?.components.map(cid => PRODUCTS.find(p => p.id === cid)).filter(Boolean) || [];

  if (!project) {
    return (
      <div className="max-w-7xl mx-auto px-6 py-20 text-center">
        <h2 className="text-2xl font-bold mb-4">Project not found</h2>
        <Link to="/projects" className="text-blue-500 font-bold">Back to DIY Projects</Link>
      </div>
    );
  }

  const handleBuyBundle = () => {
    components.forEach(p => {
      if (p) addToCart(p.id, 1);
    });
    // Add visual feedback or redirect to cart
  };

  return (
    <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-16 py-12">
      {/* Breadcrumbs */}
      <div className="flex items-center gap-2 text-sm text-[var(--text-muted)] mb-12">
        <Link to="/" className="hover:text-blue-500">Home</Link>
        <ChevronRight size={14} />
        <Link to="/projects" className="hover:text-blue-500">DIY Projects</Link>
        <ChevronRight size={14} />
        <span className="text-[var(--text)] font-medium">{project.name}</span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-16 mb-24">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-12">
          {/* Video Player */}
          <div className="aspect-video rounded-[32px] overflow-hidden bg-black shadow-2xl border border-[var(--border)]">
            <iframe
              width="100%"
              height="100%"
              src={project.videoUrl}
              title={project.name}
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>

          <div>
            <h1 className="text-4xl font-display font-bold mb-6 tracking-tight">{project.name}</h1>
            <div className="flex flex-wrap gap-6 mb-8">
              <div className="flex items-center gap-2 text-sm font-medium px-4 py-2 bg-[var(--section)] rounded-full">
                <Clock size={16} className="text-blue-500" />
                <span>{project.timeEstimate}</span>
              </div>
              <div className="flex items-center gap-2 text-sm font-medium px-4 py-2 bg-[var(--section)] rounded-full">
                <BarChart3 size={16} className="text-blue-500" />
                <span>{project.difficulty}</span>
              </div>
              <div className="flex items-center gap-2 text-sm font-medium px-4 py-2 bg-[var(--section)] rounded-full">
                <Package size={16} className="text-blue-500" />
                <span>{components.length} Components</span>
              </div>
            </div>
            <p className="text-lg text-[var(--text-muted)] leading-relaxed">
              {project.description}
            </p>
          </div>

          {/* Steps (Mocked) */}
          <div>
            <h2 className="text-2xl font-display font-bold mb-8">Project Steps</h2>
            <div className="space-y-6">
              {[
                { title: 'Gather Components', desc: 'Ensure you have all the required parts from the bundle list.' },
                { title: 'Circuit Assembly', desc: 'Follow the wiring diagram to connect the sensors to the microcontroller.' },
                { title: 'Code Upload', desc: 'Download the project code and upload it using the Arduino IDE.' },
                { title: 'Testing & Calibration', desc: 'Power up the system and calibrate the sensors for optimal performance.' }
              ].map((step, i) => (
                <div key={i} className="flex gap-6 p-6 rounded-2xl bg-[var(--section)] border border-[var(--border)]">
                  <div className="w-10 h-10 rounded-full bg-blue-500 text-white flex items-center justify-center font-bold shrink-0">
                    {i + 1}
                  </div>
                  <div>
                    <h3 className="font-bold mb-2">{step.title}</h3>
                    <p className="text-sm text-[var(--text-muted)]">{step.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Sidebar - Bundle Purchase */}
        <aside className="lg:col-span-1">
          <div className="sticky top-32 space-y-8">
            <div className="card-premium p-8 border-blue-500/20 bg-gradient-to-b from-[var(--card)] to-blue-500/5">
              <div className="flex items-center gap-2 text-blue-500 text-xs font-bold uppercase tracking-widest mb-4">
                <Package size={16} />
                <span>Smart Bundle</span>
              </div>
              <h3 className="text-2xl font-display font-bold mb-2">{bundle?.name}</h3>
              <p className="text-sm text-[var(--text-muted)] mb-8">Get all the components needed for this project in one click and save {bundle?.discountPercentage}%.</p>
              
              <div className="space-y-4 mb-8">
                {components.map((p) => (
                  <div key={p?.id} className="flex items-center gap-3">
                    <CheckCircle2 size={18} className="text-green-500 shrink-0" />
                    <span className="text-sm font-medium">{p?.name}</span>
                  </div>
                ))}
              </div>

              <div className="pt-6 border-t border-[var(--border)] mb-8">
                <div className="flex justify-between items-end">
                  <div className="text-sm text-[var(--text-muted)]">Total Bundle Price</div>
                  <div className="text-3xl font-bold text-blue-500">
                    ${(components.reduce((acc, p) => acc + (p?.price || 0), 0) * (1 - (bundle?.discountPercentage || 0) / 100)).toFixed(2)}
                  </div>
                </div>
                <div className="text-xs text-[var(--text-muted)] line-through mt-1">
                  Regular Price: ${components.reduce((acc, p) => acc + (p?.price || 0), 0).toFixed(2)}
                </div>
              </div>

              <button
                onClick={handleBuyBundle}
                className="btn-primary w-full flex items-center justify-center gap-3 py-4"
              >
                <ShoppingCart size={20} />
                Buy All Components
              </button>
              
              <p className="text-[10px] text-center text-[var(--text-muted)] mt-4">
                Free shipping included with this bundle.
              </p>
            </div>

            <div className="card-premium p-6">
              <h4 className="font-bold mb-4">Need help with this project?</h4>
              <p className="text-sm text-[var(--text-muted)] mb-6">Join our community discussion or read the full documentation.</p>
              <div className="space-y-3">
                <button className="btn-secondary w-full text-sm">View Documentation</button>
                <button className="btn-secondary w-full text-sm">Community Forum</button>
              </div>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
};

export default ProjectDetails;
