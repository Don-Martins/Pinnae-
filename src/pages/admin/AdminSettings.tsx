import React from 'react';
import { Settings, User, Bell, Shield, Moon, Sun, Globe, Save } from 'lucide-react';
import { useAppContext } from '../../context/AppContext';
import { cn } from '../../lib/utils';

const DashboardSettings = () => {
  const { user, theme, toggleTheme } = useAppContext();

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-display font-bold tracking-tight">Settings</h1>
        <p className="text-[var(--text-muted)] mt-1">Manage your profile and dashboard preferences.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Navigation Tabs */}
        <div className="lg:col-span-1 space-y-2">
          {[
            { name: 'Profile', icon: User, active: true },
            { name: 'Notifications', icon: Bell, active: false },
            { name: 'Security', icon: Shield, active: false },
            { name: 'Appearance', icon: Moon, active: false },
            { name: 'General', icon: Globe, active: false },
          ].map((item) => (
            <button 
              key={item.name}
              className={cn(
                "w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all",
                item.active 
                  ? "bg-blue-500 text-white shadow-lg shadow-blue-500/20" 
                  : "text-[var(--text-muted)] hover:bg-[var(--card)] hover:text-[var(--text)]"
              )}
            >
              <item.icon size={18} />
              {item.name}
            </button>
          ))}
        </div>

        {/* Settings Form */}
        <div className="lg:col-span-2 space-y-8">
          {/* Profile Section */}
          <div className="card-premium p-8 space-y-8">
            <div className="flex items-center gap-6">
              <div className="w-24 h-24 rounded-[32px] bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white text-3xl font-bold shadow-xl">
                {user?.name.charAt(0).toUpperCase()}
              </div>
              <div>
                <h3 className="text-xl font-bold">My Profile</h3>
                <p className="text-sm text-[var(--text-muted)] mt-1">Update your photo and personal details.</p>
                <div className="flex gap-3 mt-4">
                  <button className="btn-primary py-2 px-4 text-xs">Change Photo</button>
                  <button className="btn-secondary py-2 px-4 text-xs">Remove</button>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-widest text-[var(--text-muted)]">Full Name</label>
                <input 
                  defaultValue={user?.name}
                  className="w-full px-4 py-3 bg-[var(--section)] border border-[var(--border)] rounded-2xl focus:outline-none focus:border-blue-500 transition-colors"
                />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-widest text-[var(--text-muted)]">Email Address</label>
                <input 
                  defaultValue={user?.email}
                  className="w-full px-4 py-3 bg-[var(--section)] border border-[var(--border)] rounded-2xl focus:outline-none focus:border-blue-500 transition-colors"
                />
              </div>
            </div>
          </div>

          {/* Appearance Section */}
          <div className="card-premium p-8">
            <h3 className="text-xl font-bold mb-6">Appearance</h3>
            <div className="flex items-center justify-between p-4 bg-[var(--section)] rounded-2xl border border-[var(--border)]">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-xl bg-[var(--card)] flex items-center justify-center text-[var(--text-muted)]">
                  {theme === 'light' ? <Sun size={20} /> : <Moon size={20} />}
                </div>
                <div>
                  <div className="font-bold text-sm">Theme Mode</div>
                  <div className="text-xs text-[var(--text-muted)]">Switch between light and dark mode</div>
                </div>
              </div>
              <button 
                onClick={toggleTheme}
                className="px-4 py-2 bg-blue-500 text-white text-xs font-bold rounded-xl hover:bg-blue-600 transition-all"
              >
                Switch to {theme === 'light' ? 'Dark' : 'Light'}
              </button>
            </div>
          </div>

          <div className="flex justify-end">
            <button className="btn-primary py-4 px-8 flex items-center gap-2">
              <Save size={20} />
              Save All Changes
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardSettings;
