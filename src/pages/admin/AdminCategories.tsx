import React, { useState } from 'react';
import { Layers, Plus, Edit2, Trash2, X, Search } from 'lucide-react';
import { useDashboardContext } from '../../context/DashboardContext';
import { motion, AnimatePresence } from 'motion/react';

const AdminCategories = () => {
  const { categories, products, addCategory, updateCategory, deleteCategory } = useDashboardContext();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [editingCategory, setEditingCategory] = useState<string | null>(null);
  const [categoryName, setCategoryName] = useState('');

  const filteredCategories = categories.filter(c => 
    c.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleOpenModal = (category: string | null = null) => {
    setEditingCategory(category);
    setCategoryName(category || '');
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setEditingCategory(null);
    setCategoryName('');
    setIsModalOpen(false);
  };

  const handleSubmit = () => {
    if (!categoryName) return;
    if (editingCategory) {
      updateCategory(editingCategory, categoryName);
    } else {
      addCategory(categoryName);
    }
    handleCloseModal();
  };

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-display font-bold tracking-tight">Categories</h1>
          <p className="text-[var(--text-muted)] mt-1">Organize your products into logical groups.</p>
        </div>
        <button 
          onClick={() => handleOpenModal()}
          className="btn-primary flex items-center gap-2"
        >
          <Plus size={20} />
          Add Category
        </button>
      </div>

      <div className="card-premium p-4">
        <div className="relative w-full max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--text-muted)]" size={18} />
          <input 
            type="text" 
            placeholder="Search categories..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-[var(--section)] border border-[var(--border)] rounded-xl text-sm focus:outline-none focus:border-blue-500 transition-all"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredCategories.map((category) => (
          <motion.div 
            layout
            key={category}
            className="card-premium p-6 flex items-center justify-between group"
          >
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-blue-500/10 flex items-center justify-center text-blue-500">
                <Layers size={24} />
              </div>
              <div>
                <div className="font-bold">{category}</div>
                <div className="text-xs text-[var(--text-muted)] mt-1">
                  {products.filter(p => p.category === category).length} Products
                </div>
              </div>
            </div>
            <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
              <button 
                onClick={() => handleOpenModal(category)}
                className="p-2 hover:bg-blue-500/10 hover:text-blue-500 rounded-lg transition-colors"
              >
                <Edit2 size={16} />
              </button>
              <button 
                onClick={() => deleteCategory(category)}
                className="p-2 hover:bg-red-500/10 hover:text-red-500 rounded-lg transition-colors"
              >
                <Trash2 size={16} />
              </button>
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
              className="relative w-full max-w-md bg-[var(--card)] rounded-[32px] shadow-2xl overflow-hidden border border-[var(--border)] p-8"
            >
              <div className="flex items-center justify-between mb-8">
                <h2 className="text-2xl font-display font-bold">
                  {editingCategory ? 'Edit Category' : 'Add Category'}
                </h2>
                <button onClick={handleCloseModal} className="p-2 hover:bg-[var(--section)] rounded-xl text-[var(--text-muted)]">
                  <X size={24} />
                </button>
              </div>
              <div className="space-y-6">
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-widest text-[var(--text-muted)]">Category Name</label>
                  <input 
                    value={categoryName}
                    onChange={(e) => setCategoryName(e.target.value)}
                    placeholder="e.g. Robotics"
                    className="w-full px-4 py-3 bg-[var(--section)] border border-[var(--border)] rounded-2xl focus:outline-none focus:border-blue-500 transition-colors"
                  />
                </div>
                <button 
                  onClick={handleSubmit}
                  className="btn-primary w-full py-4"
                >
                  {editingCategory ? 'Save Changes' : 'Create Category'}
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default AdminCategories;
