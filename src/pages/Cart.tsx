import React from 'react';
import { Link } from 'react-router-dom';
import { Trash2, Minus, Plus, ShoppingBag, ArrowRight, ShieldCheck, Truck, RotateCcw, CheckCircle2 } from 'lucide-react';
import { useAppContext } from '../context/AppContext';
import { PRODUCTS } from '../mockData';
import { motion, AnimatePresence } from 'motion/react';

const Cart = () => {
  const { cart, removeFromCart, updateQuantity, clearCart } = useAppContext();
  const [isCheckingOut, setIsCheckingOut] = React.useState(false);
  const [isSuccess, setIsSuccess] = React.useState(false);

  const cartItems = cart.map(item => {
    const product = PRODUCTS.find(p => p.id === item.productId);
    return { ...item, product };
  }).filter(item => item.product);

  const subtotal = cartItems.reduce((acc, item) => acc + (item.product?.price || 0) * item.quantity, 0);
  const shipping = subtotal > 100 ? 0 : 15;
  const total = subtotal + shipping;

  const handleCheckout = () => {
    setIsCheckingOut(true);
    setTimeout(() => {
      setIsCheckingOut(false);
      setIsSuccess(true);
      clearCart();
    }, 2000);
  };

  if (isSuccess) {
    return (
      <div className="max-w-7xl mx-auto px-6 py-32 text-center">
        <motion.div
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="w-24 h-24 bg-green-500 rounded-full flex items-center justify-center text-white mx-auto mb-8 shadow-xl shadow-green-500/20"
        >
          <CheckCircle2 size={48} />
        </motion.div>
        <h2 className="text-3xl font-display font-bold mb-4">Order Placed Successfully!</h2>
        <p className="text-[var(--text-muted)] mb-10 max-w-md mx-auto">
          Thank you for your purchase. Your order #PT-9284 is being processed and will be shipped soon.
        </p>
        <div className="flex justify-center gap-4">
          <Link to="/dashboard/orders" className="btn-primary">View My Orders</Link>
          <Link to="/marketplace" className="btn-secondary">Continue Shopping</Link>
        </div>
      </div>
    );
  }

  if (cart.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-6 py-32 text-center">
        <div className="w-24 h-24 bg-[var(--section)] rounded-full flex items-center justify-center text-[var(--text-muted)] mx-auto mb-8">
          <ShoppingBag size={48} />
        </div>
        <h2 className="text-3xl font-display font-bold mb-4">Your cart is empty</h2>
        <p className="text-[var(--text-muted)] mb-10 max-w-md mx-auto">
          Looks like you haven't added any components to your cart yet. Explore our marketplace to find what you need.
        </p>
        <Link to="/marketplace" className="btn-primary inline-flex items-center gap-2">
          Start Shopping <ArrowRight size={20} />
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-6 py-12">
      <h1 className="text-4xl font-display font-bold mb-12">Shopping Cart</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
        {/* Cart Items */}
        <div className="lg:col-span-2 space-y-8">
          <div className="flex items-center justify-between pb-6 border-b border-[var(--border)]">
            <span className="font-bold">{cartItems.length} Items</span>
            <button onClick={clearCart} className="text-sm text-red-500 font-medium hover:underline">Clear Cart</button>
          </div>

          <div className="space-y-6">
            <AnimatePresence mode="popLayout">
              {cartItems.map((item) => (
                <motion.div
                  key={item.productId}
                  layout
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  className="flex flex-col sm:flex-row items-center gap-6 p-6 rounded-2xl bg-[var(--section)] border border-[var(--border)]"
                >
                  <div className="w-24 h-24 rounded-xl overflow-hidden bg-[var(--card)] shrink-0">
                    <img src={item.product?.image} alt={item.product?.name} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                  </div>
                  
                  <div className="flex-grow text-center sm:text-left">
                    <Link to={`/product/${item.productId}`} className="text-lg font-bold hover:text-blue-500 transition-colors">
                      {item.product?.name}
                    </Link>
                    <div className="text-sm text-[var(--text-muted)] mt-1">{item.product?.category}</div>
                  </div>

                  <div className="flex items-center gap-4 p-2 bg-[var(--card)] border border-[var(--border)] rounded-xl">
                    <button
                      onClick={() => updateQuantity(item.productId, item.quantity - 1)}
                      className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-[var(--section)] transition-colors"
                    >
                      <Minus size={16} />
                    </button>
                    <span className="w-6 text-center font-bold text-sm">{item.quantity}</span>
                    <button
                      onClick={() => updateQuantity(item.productId, item.quantity + 1)}
                      className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-[var(--section)] transition-colors"
                    >
                      <Plus size={16} />
                    </button>
                  </div>

                  <div className="text-lg font-bold w-24 text-center sm:text-right">
                    ${((item.product?.price || 0) * item.quantity).toFixed(2)}
                  </div>

                  <button
                    onClick={() => removeFromCart(item.productId)}
                    className="p-2 text-[var(--text-muted)] hover:text-red-500 transition-colors"
                  >
                    <Trash2 size={20} />
                  </button>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          {/* Trust Badges */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-12">
            <div className="flex items-center gap-3 text-sm text-[var(--text-muted)]">
              <ShieldCheck size={20} className="text-blue-500" />
              <span>Secure Checkout</span>
            </div>
            <div className="flex items-center gap-3 text-sm text-[var(--text-muted)]">
              <Truck size={20} className="text-blue-500" />
              <span>Fast Delivery</span>
            </div>
            <div className="flex items-center gap-3 text-sm text-[var(--text-muted)]">
              <RotateCcw size={20} className="text-blue-500" />
              <span>30-Day Returns</span>
            </div>
          </div>
        </div>

        {/* Order Summary */}
        <aside className="lg:col-span-1">
          <div className="sticky top-32 card-premium p-8">
            <h3 className="text-2xl font-display font-bold mb-8">Order Summary</h3>
            
            <div className="space-y-4 mb-8">
              <div className="flex justify-between text-[var(--text-muted)]">
                <span>Subtotal</span>
                <span className="text-[var(--text)] font-medium">${subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-[var(--text-muted)]">
                <span>Shipping</span>
                <span className="text-[var(--text)] font-medium">
                  {shipping === 0 ? <span className="text-green-500 font-bold">FREE</span> : `$${shipping.toFixed(2)}`}
                </span>
              </div>
              <div className="flex justify-between text-[var(--text-muted)]">
                <span>Estimated Tax</span>
                <span className="text-[var(--text)] font-medium">$0.00</span>
              </div>
            </div>

            <div className="pt-6 border-t border-[var(--border)] mb-10">
              <div className="flex justify-between items-end">
                <span className="text-lg font-bold">Total</span>
                <span className="text-3xl font-bold text-blue-500">${total.toFixed(2)}</span>
              </div>
            </div>

            <button 
              onClick={handleCheckout}
              disabled={isCheckingOut}
              className="btn-primary w-full py-4 flex items-center justify-center gap-3 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isCheckingOut ? (
                <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                <>
                  Proceed to Checkout
                  <ArrowRight size={20} />
                </>
              )}
            </button>

            <div className="mt-8">
              <div className="text-xs font-bold uppercase tracking-widest text-[var(--text-muted)] mb-4">We Accept</div>
              <div className="flex gap-4 opacity-50 grayscale">
                <img src="https://upload.wikimedia.org/wikipedia/commons/5/5e/Visa_Inc._logo.svg" alt="Visa" className="h-4" />
                <img src="https://upload.wikimedia.org/wikipedia/commons/2/2a/Mastercard-logo.svg" alt="Mastercard" className="h-6" />
                <img src="https://upload.wikimedia.org/wikipedia/commons/b/b5/PayPal.svg" alt="PayPal" className="h-5" />
              </div>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
};

export default Cart;
