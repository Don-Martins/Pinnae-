import React, { useState } from 'react';
import { Box, Plus, Edit2, Trash2, Search, X, Check } from 'lucide-react';
import { useDashboardContext } from '../../context/DashboardContext';
import { Bundle, Product } from '../../types';
import { cn } from '../../lib/utils';
import { motion, AnimatePresence } from 'motion/react';

const AdminBundles = () => {
  const { bundles, products, addBundle, updateBundle, deleteBundle } = useDashboardContext();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingBundle, setEditingBundle] = useState<Bundle | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedProductIds, setSelectedProductIds] = useState<string[]>([]);
  const [bundleName, setBundleName] = useState('');
  const [discount, setDiscount] = useState(10);

  const filteredBundles = bundles.filter(b => 
    b.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleOpenModal = (bundle: Bundle | null = null) => {
    setEditingBundle(bundle);
    setBundleName(bundle?.name || '');
    setDiscount(bundle?.discountPercentage || 10);
    setSelectedProductIds(bundle?.productIds || []);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setEditingBundle(null);
    setBundleName('');
    setDiscount(10);
    setSelectedProductIds([]);
    setIsModalOpen(false);
  };

  const toggleProductSelection = (productId: string) => {
    setSelectedProductIds(prev => 
      prev.includes(productId) 
        ? prev.filter(id => id !== productId) 
        : [...prev, productId]
    );
  };

  const handleSubmit = () => {
    if (!bundleName || selectedProductIds.length === 0) return;

    const bundleData = {
      name: bundleName,
      discountPercentage: discount,
      productIds: selectedProductIds,
    };

    if (editingBundle) {
      updateBundle(editingBundle.id, bundleData);
    } else {
      addBundle(bundleData);
    }
    handleCloseModal();
  };

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-display font-bold tracking-tight">Bundles</h1>
          <p className="text-[var(--text-muted)] mt-1">Create smart product packages with discounts.</p>
        </div>
        <button 
          onClick={() => handleOpenModal()}
          className="btn-primary flex items-center gap-2"
        >
          <Plus size={20} />
          Create Bundle
        </button>
      </div>

      <div className="card-premium p-4">
        <div className="relative w-full max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--text-muted)]" size={18} />
          <input 
            type="text" 
            placeholder="Search bundles..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-[var(--section)] border border-[var(--border)] rounded-xl text-sm focus:outline-none focus:border-blue-500 transition-all"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {filteredBundles.map((bundle) => (
          <motion.div 
            layout
            key={bundle.id}
            className="card-premium p-6 group"
          >
            <div className="flex items-start justify-between gap-4 mb-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-orange-500/10 flex items-center justify-center text-orange-500">
                  <Box size={24} />
                </div>
                <div>
                  <h3 className="font-bold text-lg">{bundle.name}</h3>
                  <div className="text-xs text-orange-500 font-bold uppercase tracking-widest mt-1">
                    {bundle.discountPercentage}% Discount
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                <button 
                  onClick={() => handleOpenModal(bundle)}
                  className="p-2 hover:bg-blue-500/10 hover:text-blue-500 rounded-lg transition-colors"
                >
                  <Edit2 size={16} />
                </button>
                <button 
                  onClick={() => deleteBundle(bundle.id)}
                  className="p-2 hover:bg-red-500/10 hover:text-red-500 rounded-lg transition-colors"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            </div>

            <div className="space-y-3">
              <div className="text-xs font-bold uppercase tracking-widest text-[var(--text-muted)]">Included Products</div>
              <div className="flex flex-wrap gap-2">
                {bundle.productIds.map(pid => {
                  const product = products.find(p => p.id === pid);
                  return (
                    <div key={pid} className="flex items-center gap-2 px-3 py-1.5 bg-[var(--section)] border border-[var(--border)] rounded-lg text-xs font-medium">
                      <div className="w-4 h-4 rounded bg-gray-200 overflow-hidden">
                        {product && <img src={product.image} alt="" className="w-full h-full object-cover" referrerPolicy="no-referrer" />}
                      </div>
                      {product?.name || pid}
                    </div>
                  );
                })}
              </div>
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
                  {editingBundle ? 'Edit Bundle' : 'Create Bundle'}
                </h2>
                <button onClick={handleCloseModal} className="p-2 hover:bg-[var(--section)] rounded-xl text-[var(--text-muted)]">
                  <X size={24} />
                </button>
              </div>
              <div className="space-y-6 max-h-[60vh] overflow-y-auto custom-scrollbar pr-2">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-widest text-[var(--text-muted)]">Bundle Name</label>
                    <input 
                      value={bundleName}
                      onChange={(e) => setBundleName(e.target.value)}
                      placeholder="e.g. Starter Kit"
                      className="w-full px-4 py-3 bg-[var(--section)] border border-[var(--border)] rounded-2xl focus:outline-none focus:border-blue-500 transition-colors" 
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-widest text-[var(--text-muted)]">Discount (%)</label>
                    <input 
                      type="number" 
                      value={discount}
                      onChange={(e) => setDiscount(Number(e.target.value))}
                      className="w-full px-4 py-3 bg-[var(--section)] border border-[var(--border)] rounded-2xl focus:outline-none focus:border-blue-500 transition-colors" 
                    />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-widest text-[var(--text-muted)]">Select Products</label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {products.map(product => {
                      const isSelected = selectedProductIds.includes(product.id);
                      return (
                        <div 
                          key={product.id} 
                          onClick={() => toggleProductSelection(product.id)}
                          className={cn(
                            "flex items-center justify-between p-3 bg-[var(--section)] border rounded-xl cursor-pointer transition-colors",
                            isSelected ? "border-blue-500 bg-blue-500/5" : "border-[var(--border)] hover:border-blue-500/50"
                          )}
                        >
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-lg overflow-hidden bg-white">
                              <img src={product.image} alt="" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                            </div>
                            <div className="text-xs font-bold truncate max-w-[120px]">{product.name}</div>
                          </div>
                          <div className={cn(
                            "w-6 h-6 rounded-full border-2 flex items-center justify-center transition-colors",
                            isSelected ? "border-blue-500 bg-blue-500" : "border-[var(--border)]"
                          )}>
                            {isSelected && <Check size={14} className="text-white" />}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
                
                <button 
                  onClick={handleSubmit}
                  className="btn-primary w-full py-4 sticky bottom-0"
                >
                  {editingBundle ? 'Save Changes' : 'Create Bundle'}
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default AdminBundles;
