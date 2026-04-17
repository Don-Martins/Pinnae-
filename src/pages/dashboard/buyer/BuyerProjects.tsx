import React from 'react';
import { Bookmark, Cpu } from 'lucide-react';
import { useDashboardContext } from '../../../context/DashboardContext';
import { useAppContext } from '../../../context/AppContext';
import { Link } from 'react-router-dom';

const BuyerProjects = () => {
  const { projects } = useDashboardContext();
  const { user } = useAppContext();

  const savedProjects = projects.filter(p => user?.savedProjects.includes(p.id));

  if (savedProjects.length === 0) {
    return (
      <div className="card-premium p-12 text-center">
        <Bookmark size={48} className="mx-auto mb-6 text-[var(--text-muted)]" />
        <h3 className="text-xl font-bold mb-2">No saved projects</h3>
        <p className="text-[var(--text-muted)] mb-8">Save DIY projects you want to build in the future.</p>
        <Link to="/projects" className="btn-primary inline-flex">Browse Projects</Link>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-display font-bold tracking-tight">Saved Projects</h1>
        <p className="text-[var(--text-muted)] mt-1">DIY guides and tutorials you've bookmarked.</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {savedProjects.map((project) => (
          <div key={project.id} className="card-premium p-0 overflow-hidden group">
            <div className="aspect-video relative overflow-hidden">
              <img 
                src={project.image} 
                alt={project.name} 
                className="w-full h-full object-cover transition-transform group-hover:scale-110" 
                referrerPolicy="no-referrer"
              />
              <div className="absolute top-4 right-4">
                <span className="px-3 py-1 bg-black/50 backdrop-blur-md text-white text-[10px] font-bold uppercase tracking-widest rounded-full border border-white/20">
                  {project.difficulty}
                </span>
              </div>
            </div>
            <div className="p-6">
              <h3 className="font-bold text-xl mb-2">{project.name}</h3>
              <p className="text-sm text-[var(--text-muted)] line-clamp-2 mb-4">
                {project.description}
              </p>
              <div className="flex items-center justify-between pt-4 border-t border-[var(--border)]">
                <span className="text-xs font-mono text-[var(--text-muted)]">{project.timeEstimate}</span>
                <Link to={`/project/${project.id}`} className="text-blue-500 font-bold text-sm flex items-center gap-1 group-hover:gap-2 transition-all">
                  Build Now <Cpu size={14} />
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BuyerProjects;
