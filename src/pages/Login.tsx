import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Mail, Lock, ArrowRight } from 'lucide-react';
import { useAppContext } from '../context/AppContext';
import { motion } from 'motion/react';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useAppContext();
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      login(email);
      navigate('/dashboard');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-6 bg-[var(--section)]">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-md w-full"
      >
        <div className="card-premium p-10">
          <div className="text-center mb-10">
            <h1 className="text-3xl font-display font-bold mb-2">Welcome Back</h1>
            <p className="text-[var(--text-muted)]">Sign in to your Pinnacle Tech account</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-widest text-[var(--text-muted)]">Email Address</label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-[var(--text-muted)]" size={18} />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@example.com"
                  className="w-full pl-12 pr-4 py-3 bg-[var(--section)] border border-[var(--border)] rounded-2xl focus:outline-none focus:border-blue-500 transition-colors"
                />
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between">
                <label className="text-xs font-bold uppercase tracking-widest text-[var(--text-muted)]">Password</label>
                <a href="#" className="text-xs text-blue-500 hover:underline">Forgot?</a>
              </div>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-[var(--text-muted)]" size={18} />
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full pl-12 pr-4 py-3 bg-[var(--section)] border border-[var(--border)] rounded-2xl focus:outline-none focus:border-blue-500 transition-colors"
                />
              </div>
            </div>

            <button type="submit" className="btn-primary w-full py-4 flex items-center justify-center gap-3">
              Sign In
              <ArrowRight size={20} />
            </button>
          </form>

          <div className="relative my-8">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-[var(--border)]"></div>
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-[var(--card)] px-4 text-[var(--text-muted)] font-bold">Or</span>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <button 
              onClick={() => {
                login('admin@pinnacle.com');
                navigate('/dashboard');
              }}
              className="w-full py-3 rounded-2xl border-2 border-purple-500 text-purple-500 text-xs font-bold hover:bg-purple-500 hover:text-white transition-all flex items-center justify-center gap-2"
            >
              Admin Demo
              <ArrowRight size={16} />
            </button>
            <button 
              onClick={() => {
                login('seller@example.com');
                navigate('/dashboard');
              }}
              className="w-full py-3 rounded-2xl border-2 border-blue-500 text-blue-500 text-xs font-bold hover:bg-blue-500 hover:text-white transition-all flex items-center justify-center gap-2"
            >
              Seller Demo
              <ArrowRight size={16} />
            </button>
          </div>

          <p className="text-center text-sm text-[var(--text-muted)] mt-10">
            Don't have an account? <a href="#" className="text-blue-500 font-bold hover:underline">Sign up</a>
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default Login;
