import React from 'react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
  Legend
} from 'recharts';
import { TrendingUp, Target, Users, Zap } from 'lucide-react';

const data = [
  { name: 'Week 1', leads: 40, outreach: 24, replies: 4 },
  { name: 'Week 2', leads: 30, outreach: 13, replies: 2 },
  { name: 'Week 3', leads: 20, outreach: 98, replies: 12 },
  { name: 'Week 4', leads: 27, outreach: 39, replies: 8 },
];

const statusData = [
  { name: 'New', value: 400, color: '#3b82f6' },
  { name: 'Contacted', value: 300, color: '#f59e0b' },
  { name: 'Replied', value: 300, color: '#10b981' },
  { name: 'Converted', value: 200, color: '#6366f1' },
];

const Analytics = () => {
  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">Analytics & Reports</h1>
        <p className="text-slate-500">Track your performance and optimize your outreach strategy.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 card p-6">
          <h3 className="text-lg font-bold text-slate-900 mb-6">Performance Trend</h3>
          <div className="h-[350px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={data}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#64748b', fontSize: 12}} />
                <YAxis axisLine={false} tickLine={false} tick={{fill: '#64748b', fontSize: 12}} />
                <Tooltip 
                   contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                />
                <Legend iconType="circle" />
                <Line type="monotone" dataKey="outreach" stroke="#2563eb" strokeWidth={3} dot={{ r: 4, fill: '#2563eb', strokeWidth: 2, stroke: '#fff' }} activeDot={{ r: 6 }} />
                <Line type="monotone" dataKey="replies" stroke="#10b981" strokeWidth={3} dot={{ r: 4, fill: '#10b981', strokeWidth: 2, stroke: '#fff' }} activeDot={{ r: 6 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="card p-6 flex flex-col">
          <h3 className="text-lg font-bold text-slate-900 mb-6">Pipeline Health</h3>
          <div className="flex-1 h-[250px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={statusData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {statusData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="space-y-3 mt-6">
            {statusData.map((item) => (
              <div key={item.name} className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }}></div>
                  <span className="text-sm font-medium text-slate-600">{item.name}</span>
                </div>
                <span className="text-sm font-bold text-slate-900">{Math.round((item.value / 1200) * 100)}%</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { label: 'Avg. Response Time', value: '4.2h', icon: Zap, color: 'blue' },
          { label: 'Lead Quality Score', value: '82/100', icon: Target, color: 'indigo' },
          { label: 'Outreach Velocity', value: '+18%', icon: TrendingUp, color: 'emerald' },
          { label: 'Active Sequences', value: '12', icon: Users, color: 'orange' },
        ].map((item, i) => (
          <div key={i} className="card p-6 flex items-center gap-4">
            <div className={`p-3 rounded-xl bg-${item.color}-50 text-${item.color}-600`}>
              <item.icon size={24} />
            </div>
            <div>
              <p className="text-sm font-medium text-slate-500">{item.label}</p>
              <h4 className="text-xl font-bold text-slate-900">{item.value}</h4>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Analytics;
