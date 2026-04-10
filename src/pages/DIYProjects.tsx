import React from 'react';
import { Play, Clock, BarChart3, ArrowRight } from 'lucide-react';
import { PROJECTS } from '../mockData';
import ProjectCard from '../components/ProjectCard';
import { motion } from 'motion/react';
import Skeleton from '../components/Skeleton';

const DIYProjects = () => {
  const [isLoading, setIsLoading] = React.useState(true);

  React.useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 1200);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-16 py-12">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto mb-16">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-500 text-xs font-bold uppercase tracking-wider mb-6">
          <Play size={14} fill="currentColor" />
          <span>Learn & Build</span>
        </div>
        <h1 className="text-4xl md:text-5xl font-display font-bold mb-6 tracking-tight">DIY Project Hub</h1>
        <p className="text-lg text-[var(--text-muted)] leading-relaxed">
          Step-by-step guides for building amazing electronics projects. From beginner basics to advanced robotics, we've got you covered.
        </p>
      </div>

      {/* Categories / Filters */}
      <div className="flex flex-wrap justify-center gap-4 mb-12">
        {['All Projects', 'Beginner', 'Intermediate', 'Advanced', 'Robotics', 'IoT', 'Home Automation'].map((cat) => (
          <button
            key={cat}
            className="px-6 py-2 rounded-full border border-[var(--border)] text-sm font-medium hover:border-blue-500 hover:text-blue-500 transition-all"
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Projects Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {isLoading ? (
          [1, 2, 3].map(i => (
            <div key={i} className="card-premium h-[450px] flex flex-col gap-4">
              <Skeleton className="aspect-video w-full" />
              <div className="flex gap-4">
                <Skeleton className="h-4 w-20" />
                <Skeleton className="h-4 w-20" />
              </div>
              <Skeleton className="h-8 w-3/4" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-10 w-full mt-auto" />
            </div>
          ))
        ) : (
          PROJECTS.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))
        )}
      </div>

      {/* Community Section */}
      <section className="mt-32 p-12 rounded-[32px] bg-[var(--section)] border border-[var(--border)] relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/10 blur-[80px] rounded-full" />
        <div className="relative z-10 flex flex-col lg:flex-row items-center gap-12">
          <div className="lg:w-1/2">
            <h2 className="text-3xl font-display font-bold mb-6">Share Your Creations</h2>
            <p className="text-[var(--text-muted)] mb-8">
              Built something cool? Share your project with our community and get featured on our homepage. Join thousands of makers worldwide.
            </p>
            <div className="flex gap-4">
              <button className="btn-primary">Submit Project</button>
              <button className="btn-secondary">Join Community</button>
            </div>
          </div>
          <div className="lg:w-1/2 grid grid-cols-2 gap-4">
            <div className="aspect-square rounded-2xl overflow-hidden">
              <img src="https://picsum.photos/seed/maker1/400/400" alt="Maker" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
            </div>
            <div className="aspect-square rounded-2xl overflow-hidden mt-8">
              <img src="https://picsum.photos/seed/maker2/400/400" alt="Maker" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default DIYProjects;
