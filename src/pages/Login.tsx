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

          <p className="text-center text-sm text-[var(--text-muted)] mt-10">
            Don't have an account? <a href="#" className="text-blue-500 font-bold hover:underline">Sign up</a>
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default Login;
