import React from 'react';
import { Cpu, Github, Twitter, Linkedin, Mail } from 'lucide-react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-[var(--section)] border-t border-[var(--border)] pt-20 pb-10 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          {/* Brand */}
          <div className="col-span-1 md:col-span-1">
            <Link to="/" className="flex items-center gap-2 mb-6">
              <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center text-white">
                <Cpu size={18} />
              </div>
              <span className="text-lg font-display font-bold tracking-tight">
                Pinnacle<span className="text-blue-500">Tech</span>
              </span>
            </Link>
            <p className="text-sm text-[var(--text-muted)] leading-relaxed mb-6">
              Empowering makers and engineers with premium electronics and expert-led DIY projects.
            </p>
            <div className="flex items-center gap-4">
              <a href="#" className="w-10 h-10 rounded-full bg-[var(--background)] border border-[var(--border)] flex items-center justify-center text-[var(--text-muted)] hover:text-blue-500 hover:border-blue-500 transition-all">
                <Twitter size={18} />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-[var(--background)] border border-[var(--border)] flex items-center justify-center text-[var(--text-muted)] hover:text-blue-500 hover:border-blue-500 transition-all">
                <Github size={18} />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-[var(--background)] border border-[var(--border)] flex items-center justify-center text-[var(--text-muted)] hover:text-blue-500 hover:border-blue-500 transition-all">
                <Linkedin size={18} />
              </a>
            </div>
          </div>

          {/* Links */}
          <div>
            <h4 className="font-bold mb-6">Marketplace</h4>
            <ul className="space-y-4 text-sm text-[var(--text-muted)]">
              <li><Link to="/marketplace" className="hover:text-blue-500 transition-colors">All Products</Link></li>
              <li><Link to="/marketplace" className="hover:text-blue-500 transition-colors">Microcontrollers</Link></li>
              <li><Link to="/marketplace" className="hover:text-blue-500 transition-colors">Sensors & Modules</Link></li>
              <li><Link to="/marketplace" className="hover:text-blue-500 transition-colors">Robotics Kits</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold mb-6">Resources</h4>
            <ul className="space-y-4 text-sm text-[var(--text-muted)]">
              <li><Link to="/projects" className="hover:text-blue-500 transition-colors">DIY Projects</Link></li>
              <li><Link to="#" className="hover:text-blue-500 transition-colors">Documentation</Link></li>
              <li><Link to="#" className="hover:text-blue-500 transition-colors">Community Forum</Link></li>
              <li><Link to="#" className="hover:text-blue-500 transition-colors">Learning Path</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold mb-6">Newsletter</h4>
            <p className="text-sm text-[var(--text-muted)] mb-4">
              Subscribe to get the latest project updates and product releases.
            </p>
            <div className="flex gap-2">
              <input
                type="email"
                placeholder="Email address"
                className="flex-grow bg-[var(--background)] border border-[var(--border)] rounded-xl px-4 py-2 text-sm focus:outline-none focus:border-blue-500 transition-colors"
              />
              <button className="p-2 bg-blue-500 text-white rounded-xl hover:bg-blue-600 transition-colors">
                <Mail size={18} />
              </button>
            </div>
          </div>
        </div>

        <div className="pt-8 border-t border-[var(--border)] flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-[var(--text-muted)]">
          <p>© 2026 Pinnacle Tech Market. All rights reserved.</p>
          <div className="flex gap-6">
            <a href="#" className="hover:text-blue-500 transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-blue-500 transition-colors">Terms of Service</a>
            <a href="#" className="hover:text-blue-500 transition-colors">Cookie Policy</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
