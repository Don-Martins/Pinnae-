import React, { useState } from 'react';
import { Cpu, Plus, Edit2, Trash2, Search, Video, Box, X } from 'lucide-react';
import { useDashboardContext } from '../../context/DashboardContext';
import { Project } from '../../types';
import { motion, AnimatePresence } from 'motion/react';

const AdminProjects = () => {
  const { projects, addProject, updateProject, deleteProject } = useDashboardContext();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProject, setEditingProject] = useState<Project | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  const filteredProjects = projects.filter(p => 
    p.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleOpenModal = (project: Project | null = null) => {
    setEditingProject(project);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setEditingProject(null);
    setIsModalOpen(false);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const projectData = {
      name: formData.get('name') as string,
      description: formData.get('description') as string,
      difficulty: formData.get('difficulty') as Project['difficulty'],
      videoUrl: formData.get('videoUrl') as string,
      image: formData.get('image') as string || 'https://picsum.photos/seed/project/800/600',
      timeEstimate: formData.get('timeEstimate') as string || '2 Hours',
      bundleId: editingProject?.bundleId || 'b1',
      components: editingProject?.components || [],
    };

    if (editingProject) {
      updateProject(editingProject.id, projectData);
    } else {
      addProject(projectData);
    }
    handleCloseModal();
  };

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-display font-bold tracking-tight">DIY Projects</h1>
          <p className="text-[var(--text-muted)] mt-1">Manage learning content and project guides.</p>
        </div>
        <button 
          onClick={() => handleOpenModal()}
          className="btn-primary flex items-center gap-2"
        >
          <Plus size={20} />
          Add New Project
        </button>
      </div>

      <div className="card-premium p-4">
        <div className="relative w-full max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--text-muted)]" size={18} />
          <input 
            type="text" 
            placeholder="Search projects..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-[var(--section)] border border-[var(--border)] rounded-xl text-sm focus:outline-none focus:border-blue-500 transition-all"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {filteredProjects.map((project) => (
          <motion.div 
            layout
            key={project.id}
            className="card-premium p-6 flex flex-col sm:flex-row gap-6 group"
          >
            <div className="w-full sm:w-40 h-28 rounded-xl overflow-hidden bg-[var(--section)] shrink-0 border border-[var(--border)]">
              <img 
                src={project.image} 
                alt={project.name} 
                className="w-full h-full object-cover transition-transform group-hover:scale-110" 
                referrerPolicy="no-referrer" 
              />
            </div>
            <div className="flex-grow min-w-0">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h3 className="font-bold text-lg truncate">{project.name}</h3>
                  <div className="flex items-center gap-3 mt-1">
                    <span className="flex items-center gap-1 text-xs text-[var(--text-muted)]">
                      <Video size={14} />
                      Video Guide
                    </span>
                    <span className="flex items-center gap-1 text-xs text-[var(--text-muted)]">
                      <Box size={14} />
                      Bundle: {project.bundleId}
                    </span>
                  </div>
                </div>
                <div className="flex items-center gap-1">
                  <button 
                    onClick={() => handleOpenModal(project)}
                    className="p-2 hover:bg-blue-500/10 hover:text-blue-500 rounded-lg transition-colors"
                  >
                    <Edit2 size={16} />
                  </button>
                  <button 
                    onClick={() => deleteProject(project.id)}
                    className="p-2 hover:bg-red-500/10 hover:text-red-500 rounded-lg transition-colors"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
              <p className="text-sm text-[var(--text-muted)] line-clamp-2 mt-3">
                {project.description}
              </p>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={handleCloseModal}
              className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="relative w-full max-w-2xl bg-[var(--card)] rounded-[32px] shadow-2xl overflow-hidden border border-[var(--border)] p-8"
            >
              <div className="flex items-center justify-between mb-8">
                <h2 className="text-2xl font-display font-bold">
                  {editingProject ? 'Edit Project' : 'Add Project'}
                </h2>
                <button onClick={handleCloseModal} className="p-2 hover:bg-[var(--section)] rounded-xl text-[var(--text-muted)]">
                  <X size={24} />
                </button>
              </div>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-widest text-[var(--text-muted)]">Project Title</label>
                    <input 
                      name="name"
                      required
                      defaultValue={editingProject?.name}
                      className="w-full px-4 py-3 bg-[var(--section)] border border-[var(--border)] rounded-2xl focus:outline-none focus:border-blue-500 transition-colors" 
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-widest text-[var(--text-muted)]">Difficulty</label>
                    <select 
                      name="difficulty"
                      defaultValue={editingProject?.difficulty || 'Beginner'}
                      className="w-full px-4 py-3 bg-[var(--section)] border border-[var(--border)] rounded-2xl focus:outline-none focus:border-blue-500 transition-colors appearance-none"
                    >
                      <option>Beginner</option>
                      <option>Intermediate</option>
                      <option>Advanced</option>
                    </select>
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-widest text-[var(--text-muted)]">Video URL</label>
                  <input 
                    name="videoUrl"
                    required
                    defaultValue={editingProject?.videoUrl}
                    className="w-full px-4 py-3 bg-[var(--section)] border border-[var(--border)] rounded-2xl focus:outline-none focus:border-blue-500 transition-colors" 
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-widest text-[var(--text-muted)]">Description</label>
                  <textarea 
                    name="description"
                    required
                    defaultValue={editingProject?.description}
                    rows={3}
                    className="w-full px-4 py-3 bg-[var(--section)] border border-[var(--border)] rounded-2xl focus:outline-none focus:border-blue-500 transition-colors resize-none" 
                  />
                </div>
                <button type="submit" className="btn-primary w-full py-4">
                  {editingProject ? 'Save Changes' : 'Create Project'}
                </button>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default AdminProjects;
