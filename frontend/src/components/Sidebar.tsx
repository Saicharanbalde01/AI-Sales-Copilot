import React from 'react';
import { NavLink } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Search, 
  Send, 
  Users, 
  BarChart3, 
  Settings,
  Zap
} from 'lucide-react';
import { clsx } from 'clsx';

const navItems = [
  { icon: LayoutDashboard, label: 'Dashboard', path: '/' },
  { icon: Search, label: 'Lead Finder', path: '/finder' },
  { icon: Send, label: 'AI Outreach', path: '/outreach' },
  { icon: Users, label: 'Saved Leads', path: '/saved' },
  { icon: BarChart3, label: 'Analytics', path: '/analytics' },
];

const Sidebar = () => {
  return (
    <aside className="w-64 bg-white border-r border-slate-200 flex flex-col h-screen sticky top-0">
      <div className="p-6 flex items-center gap-3">
        <div className="bg-primary-600 p-2 rounded-lg text-white">
          <Zap size={24} fill="currentColor" />
        </div>
        <span className="text-xl font-bold tracking-tight text-slate-900">SalesCopilot</span>
      </div>
      
      <nav className="flex-1 px-4 py-4 space-y-1">
        {navItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) =>
              clsx(
                "flex items-center gap-3 px-3 py-2 rounded-lg transition-colors group",
                isActive 
                  ? "bg-primary-50 text-primary-600" 
                  : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
              )
            }
          >
            <item.icon size={20} className="group-hover:scale-110 transition-transform" />
            <span className="font-medium">{item.label}</span>
          </NavLink>
        ))}
      </nav>
      
      <div className="p-4 border-t border-slate-100">
        <NavLink
          to="/settings"
          className={({ isActive }) =>
            clsx(
              "flex items-center gap-3 px-3 py-2 rounded-lg transition-colors group",
              isActive 
                ? "bg-primary-50 text-primary-600" 
                : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
            )
          }
        >
          <Settings size={20} className="group-hover:rotate-45 transition-transform" />
          <span className="font-medium">Settings</span>
        </NavLink>
      </div>
    </aside>
  );
};

export default Sidebar;
