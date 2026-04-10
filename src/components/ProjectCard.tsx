import React from 'react';
import { Link } from 'react-router-dom';
import { Play, Clock, BarChart3, Package } from 'lucide-react';
import { Project } from '../types';
import { motion } from 'motion/react';

interface ProjectCardProps {
  project: Project;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project }) => {
  return (
    <motion.div
      whileHover={{ y: -8 }}
      className="card-premium group overflow-hidden flex flex-col h-full"
    >
      {/* Image Container */}
      <Link to={`/project/${project.id}`} className="relative aspect-video rounded-xl overflow-hidden mb-4 bg-[var(--section)]">
        <img
          src={project.image}
          alt={project.name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
          <div className="w-16 h-16 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center text-white border border-white/30 scale-90 group-hover:scale-100 transition-transform">
            <Play size={32} fill="white" className="ml-1" />
          </div>
        </div>
        <div className="absolute bottom-3 left-3 bg-black/60 backdrop-blur-md text-white text-[10px] font-bold px-2 py-1 rounded-lg border border-white/10">
          {project.difficulty}
        </div>
      </Link>

      {/* Content */}
      <div className="flex flex-col flex-grow">
        <div className="flex items-center gap-4 mb-3 text-[var(--text-muted)] text-xs">
          <div className="flex items-center gap-1">
            <Clock size={14} />
            <span>{project.timeEstimate}</span>
          </div>
          <div className="flex items-center gap-1">
            <Package size={14} />
            <span>{project.components.length} Components</span>
          </div>
        </div>

        <Link to={`/project/${project.id}`} className="text-xl font-display font-bold mb-2 hover:text-blue-500 transition-colors">
          {project.name}
        </Link>
        
        <p className="text-sm text-[var(--text-muted)] line-clamp-2 mb-6 flex-grow">
          {project.description}
        </p>

        <Link
          to={`/project/${project.id}`}
          className="btn-secondary w-full text-center py-2 text-sm"
        >
          View Project Details
        </Link>
      </div>
    </motion.div>
  );
};

export default ProjectCard;
