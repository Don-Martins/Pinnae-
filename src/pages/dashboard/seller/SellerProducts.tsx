import React, { useState } from 'react';
import { 
  Package, 
  Search, 
  Plus, 
  Edit2, 
  Trash2, 
  Filter, 
  Image as ImageIcon,
  X,
  AlertCircle
} from 'lucide-react';
import { useDashboardContext } from '../../../context/DashboardContext';
import { useAppContext } from '../../../context/AppContext';
import { Product, Category } from '../../../types';
import { cn } from '../../../lib/utils';
import { motion, AnimatePresence } from 'motion/react';

const SellerProducts = () => {
  const { products, categories, addProduct, updateProduct, deleteProduct } = useDashboardContext();
  const { user } = useAppContext();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  const sellerProducts = products.filter(p => p.sellerId === user?.id);
  
  const filteredProducts = sellerProducts.filter(p => 
    p.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleOpenModal = (product: Product | null = null) => {
    setEditingProduct(product);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setEditingProduct(null);
    setIsModalOpen(false);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const productData = {
      name: formData.get('name') as string,
      description: formData.get('description') as string,
      price: parseFloat(formData.get('price') as string),
      category: formData.get('category') as Category,
      image: formData.get('image') as string || 'https://picsum.photos/seed/new/600/600',
      stock: parseInt(formData.get('stock') as string),
      rating: editingProduct?.rating || 4.5,
      reviews: editingProduct?.reviews || 0,
      sellerId: user?.id
    };

    if (editingProduct) {
      updateProduct(editingProduct.id, productData);
    } else {
      addProduct(productData);
    }
    handleCloseModal();
  };

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-display font-bold tracking-tight">My Products</h1>
          <p className="text-[var(--text-muted)] mt-1">Manage your shop inventory and listings.</p>
        </div>
        <button 
          onClick={() => handleOpenModal()}
          className="btn-primary flex items-center gap-2"
        >
          <Plus size={20} />
          Add Listing
        </button>
      </div>

      {/* Search */}
      <div className="card-premium p-4 flex flex-col md:flex-row items-center gap-4">
        <div className="relative flex-grow w-full">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--text-muted)]" size={18} />
          <input 
            type="text" 
            placeholder="Search my listings..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-[var(--section)] border border-[var(--border)] rounded-xl text-sm focus:outline-none focus:border-blue-500 transition-all"
          />
        </div>
      </div>

      {/* Products Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {filteredProducts.map((product) => (
          <motion.div 
            layout
            key={product.id} 
            className="card-premium p-0 overflow-hidden flex flex-col group"
          >
            <div className="aspect-square overflow-hidden relative">
              <img 
                src={product.image} 
                alt={product.name} 
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" 
                referrerPolicy="no-referrer"
              />
              <div className="absolute top-4 left-4">
                <span className="px-3 py-1 bg-black/50 backdrop-blur-md text-white text-[10px] font-bold uppercase tracking-widest rounded-full border border-white/20">
                  {product.category}
                </span>
              </div>
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-3">
                <button 
                  onClick={() => handleOpenModal(product)}
                  className="w-10 h-10 bg-white rounded-xl flex items-center justify-center text-blue-600 shadow-xl transform translate-y-4 group-hover:translate-y-0 transition-all"
                >
                  <Edit2 size={18} />
                </button>
                <button 
                  onClick={() => deleteProduct(product.id)}
                  className="w-10 h-10 bg-white rounded-xl flex items-center justify-center text-red-600 shadow-xl transform translate-y-4 group-hover:translate-y-0 transition-all delay-75"
                >
                  <Trash2 size={18} />
                </button>
              </div>
            </div>
            <div className="p-6">
              <div className="flex items-start justify-between mb-2">
                <h3 className="font-bold text-lg truncate pr-4">{product.name}</h3>
                <span className="font-bold text-blue-500">${product.price.toFixed(2)}</span>
              </div>
              <p className="text-xs text-[var(--text-muted)] line-clamp-2 mb-4 leading-relaxed h-8">
                {product.description}
              </p>
              <div className="pt-4 border-t border-[var(--border)] flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className={cn("w-2 h-2 rounded-full", product.stock > 0 ? "bg-green-500" : "bg-red-500")} />
                  <span className="text-[10px] font-bold uppercase tracking-widest text-[var(--text-muted)]">
                    Stock: {product.stock}
                  </span>
                </div>
                <div className="flex items-center gap-1 text-amber-500 font-bold text-xs">
                  ★ {product.rating}
                </div>
              </div>
            </div>
          </motion.div>
        ))}
        {filteredProducts.length === 0 && (
          <div className="col-span-full card-premium p-12 text-center">
            <AlertCircle size={48} className="mx-auto mb-4 text-[var(--text-muted)]" />
            <h3 className="text-xl font-bold">No products found</h3>
            <p className="text-[var(--text-muted)]">Start by adding your first tech masterpiece!</p>
          </div>
        )}
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
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-2xl bg-[var(--card)] rounded-[32px] shadow-2xl overflow-hidden border border-[var(--border)]"
            >
              <div className="p-8 border-b border-[var(--border)] flex items-center justify-between">
                <h2 className="text-2xl font-display font-bold">
                  {editingProduct ? 'Edit Listing' : 'New Listing'}
                </h2>
                <button onClick={handleCloseModal} className="p-2 hover:bg-[var(--section)] rounded-xl text-[var(--text-muted)]">
                  <X size={24} />
                </button>
              </div>

              <form onSubmit={handleSubmit} className="p-8 space-y-6 max-h-[70vh] overflow-y-auto custom-scrollbar">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="label-dash">Product Name</label>
                    <input name="name" required defaultValue={editingProduct?.name} className="input-dash" />
                  </div>
                  <div className="space-y-2">
                    <label className="label-dash">Category</label>
                    <select name="category" required defaultValue={editingProduct?.category} className="input-dash">
                      {categories.map(cat => <option key={cat} value={cat}>{cat}</option>)}
                    </select>
                  </div>
                  <div className="space-y-2">
                    <label className="label-dash">Price ($)</label>
                    <input name="price" type="number" step="0.01" required defaultValue={editingProduct?.price} className="input-dash" />
                  </div>
                  <div className="space-y-2">
                    <label className="label-dash">Initial Stock</label>
                    <input name="stock" type="number" required defaultValue={editingProduct?.stock} className="input-dash" />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="label-dash">Description</label>
                  <textarea name="description" required defaultValue={editingProduct?.description} rows={4} className="input-dash resize-none" />
                </div>

                <div className="space-y-2">
                  <label className="label-dash">Image URL</label>
                  <input name="image" defaultValue={editingProduct?.image} placeholder="https://..." className="input-dash" />
                </div>

                <div className="pt-4 flex gap-4">
                  <button type="button" onClick={handleCloseModal} className="btn-secondary flex-grow py-4">Cancel</button>
                  <button type="submit" className="btn-primary flex-grow py-4">{editingProduct ? 'Update Listing' : 'Publish Product'}</button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      <style>{`
        .label-dash { @apply text-[10px] font-bold uppercase tracking-widest text-[var(--text-muted)]; }
        .input-dash { @apply w-full px-4 py-3 bg-[var(--section)] border border-[var(--border)] rounded-2xl focus:outline-none focus:border-blue-500 transition-colors; }
      `}</style>
    </div>
  );
};

export default SellerProducts;
