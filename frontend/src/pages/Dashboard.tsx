import React, { useEffect, useState } from 'react';
import { 
  Users, 
  Send, 
  MessageSquare, 
  TrendingUp,
  ArrowUpRight,
  ArrowDownRight,
  MoreVertical
} from 'lucide-react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  AreaChart,
  Area
} from 'recharts';
import { dashboardService } from '../services/dashboard.service';
import { DashboardStats } from '../types';

const Dashboard = () => {
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [activity, setActivity] = useState<any[]>([]);

  useEffect(() => {
    dashboardService.getStats().then(setStats);
    dashboardService.getMonthlyActivity().then(setActivity);
  }, []);

  if (!stats) return <div className="animate-pulse flex items-center justify-center h-64 text-slate-400 font-medium">Loading metrics...</div>;

  const statCards = [
    { label: 'Total Leads', value: stats.totalLeads, icon: Users, color: 'blue', change: '+12%' },
    { label: 'Contacted', value: stats.contactedLeads, icon: Send, color: 'indigo', change: '+8%' },
    { label: 'Replies', value: stats.repliedLeads, icon: MessageSquare, color: 'emerald', change: '+24%' },
    { label: 'Conversion Rate', value: `${stats.conversionRate}%`, icon: TrendingUp, color: 'orange', change: '+2%' },
  ];

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">Welcome back, Alex!</h1>
        <p className="text-slate-500">Here's what's happening with your B2B pipeline today.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {statCards.map((stat, i) => (
          <div key={i} className="card p-6">
            <div className="flex items-start justify-between">
              <div className={`p-2 rounded-lg bg-${stat.color}-50 text-${stat.color}-600`}>
                <stat.icon size={24} />
              </div>
              <div className="flex items-center gap-1 text-emerald-600 text-sm font-medium">
                <ArrowUpRight size={16} />
                {stat.change}
              </div>
            </div>
            <div className="mt-4">
              <p className="text-sm font-medium text-slate-500">{stat.label}</p>
              <h3 className="text-2xl font-bold text-slate-900 mt-1">{stat.value}</h3>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 card p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-bold text-slate-900">Outreach Activity</h3>
            <select className="text-sm border-slate-200 rounded-lg outline-none focus:ring-1 focus:ring-primary-500">
              <option>Last 7 days</option>
              <option>Last 30 days</option>
            </select>
          </div>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={activity}>
                <defs>
                  <linearGradient id="colorLeads" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#2563eb" stopOpacity={0.1}/>
                    <stop offset="95%" stopColor="#2563eb" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#64748b', fontSize: 12}} />
                <YAxis axisLine={false} tickLine={false} tick={{fill: '#64748b', fontSize: 12}} />
                <Tooltip 
                  contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                />
                <Area type="monotone" dataKey="leads" stroke="#2563eb" fillOpacity={1} fill="url(#colorLeads)" strokeWidth={2} />
                <Area type="monotone" dataKey="contacted" stroke="#8b5cf6" fillOpacity={0} strokeWidth={2} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="card p-6">
          <h3 className="text-lg font-bold text-slate-900 mb-6">Recent AI Insights</h3>
          <div className="space-y-4">
            {[
              { lead: 'Sarah Chen', insight: 'High buying intent detected based on recent TechFlow tech stack changes.', time: '2h ago' },
              { lead: 'Elena Rodriguez', insight: 'Suggested messaging angle: Focus on HIPAA compliance for telemedicine.', time: '5h ago' },
              { lead: 'GreenLeaf Marketing', insight: 'Optimal contact window opening tomorrow at 10:00 AM CST.', time: '1d ago' },
            ].map((item, i) => (
              <div key={i} className="flex gap-4 p-3 rounded-lg hover:bg-slate-50 transition-colors group cursor-pointer">
                <div className="h-10 w-10 bg-primary-100 text-primary-600 rounded-lg flex-shrink-0 flex items-center justify-center font-bold">
                  {item.lead[0]}
                </div>
                <div className="min-w-0">
                  <p className="text-sm font-semibold text-slate-900">{item.lead}</p>
                  <p className="text-xs text-slate-500 line-clamp-2 mt-0.5">{item.insight}</p>
                  <span className="text-[10px] text-slate-400 mt-1 block">{item.time}</span>
                </div>
              </div>
            ))}
          </div>
          <button className="w-full mt-6 py-2 text-sm font-medium text-primary-600 hover:bg-primary-50 rounded-lg transition-colors">
            View all insights
          </button>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
