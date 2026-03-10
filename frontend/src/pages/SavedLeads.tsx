import React, { useState, useEffect } from 'react';
import { 
  MoreHorizontal, 
  Mail, 
  Phone, 
  MessageSquare, 
  Calendar,
  Search,
  LayoutGrid,
  List,
  ArrowUpDown
} from 'lucide-react';
import { leadService } from '../services/lead.service';
import { Lead, LeadStatus } from '../types';
import { clsx } from 'clsx';
import { format } from 'date-fns';

const SavedLeads = () => {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [filter, setFilter] = useState<LeadStatus | 'All'>('All');

  useEffect(() => {
    leadService.getAllLeads().then(setLeads);
  }, []);

  const filteredLeads = filter === 'All' ? leads : leads.filter(l => l.status === filter);

  const stats = [
    { label: 'Total Saved', value: leads.length },
    { label: 'In Pipeline', value: leads.filter(l => l.status === 'Contacted').length },
    { label: 'Converted', value: leads.filter(l => l.status === 'Converted').length },
  ];

  const updateStatus = async (id: string, status: LeadStatus) => {
    const lead = leads.find(l => l.id === id);
    if (lead) {
      const updated = { ...lead, status };
      await leadService.saveLead(updated);
      setLeads(leads.map(l => l.id === id ? updated : l));
    }
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Saved Leads</h1>
          <p className="text-slate-500">Manage your B2B pipeline and track outreach status.</p>
        </div>
        <div className="flex gap-4">
          {stats.map((stat, i) => (
            <div key={i} className="text-right px-4 border-r border-slate-200 last:border-none">
              <p className="text-xs font-bold text-slate-400 uppercase">{stat.label}</p>
              <p className="text-xl font-bold text-slate-900">{stat.value}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="card">
        <div className="p-4 border-b border-slate-100 flex items-center justify-between gap-4">
          <div className="flex gap-2">
            {(['All', 'New', 'Contacted', 'Replied', 'Converted'] as const).map((s) => (
              <button
                key={s}
                onClick={() => setFilter(s)}
                className={clsx(
                  "px-4 py-1.5 rounded-full text-sm font-medium transition-all",
                  filter === s 
                    ? "bg-slate-900 text-white" 
                    : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                )}
              >
                {s}
              </button>
            ))}
          </div>
          <div className="flex items-center gap-3">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
              <input 
                type="text" 
                placeholder="Search pipeline..." 
                className="pl-9 pr-4 py-2 bg-slate-50 border-none rounded-lg text-sm focus:ring-2 focus:ring-primary-500 outline-none w-64"
              />
            </div>
            <div className="flex border border-slate-200 rounded-lg overflow-hidden">
              <button className="p-2 bg-white text-slate-600 hover:bg-slate-50"><List size={18} /></button>
              <button className="p-2 bg-slate-50 text-slate-400"><LayoutGrid size={18} /></button>
            </div>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-slate-50/50">
                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Lead Info</th>
                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Added On</th>
                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Last Activity</th>
                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredLeads.map((lead) => (
                <tr key={lead.id} className="hover:bg-slate-50/50 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="h-10 w-10 bg-primary-100 text-primary-600 rounded-full flex items-center justify-center font-bold">
                        {lead.firstName[0]}
                      </div>
                      <div>
                        <p className="text-sm font-bold text-slate-900">{lead.firstName} {lead.lastName}</p>
                        <p className="text-xs text-slate-500">{lead.jobTitle} @ {lead.company?.name}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <select 
                      value={lead.status}
                      onChange={(e) => updateStatus(lead.id, e.target.value as LeadStatus)}
                      className={clsx(
                        "text-xs font-bold px-3 py-1.5 rounded-full border-none outline-none focus:ring-1 focus:ring-primary-500 cursor-pointer",
                        lead.status === 'New' ? "bg-blue-50 text-blue-700" : 
                        lead.status === 'Contacted' ? "bg-amber-50 text-amber-700" :
                        lead.status === 'Replied' ? "bg-emerald-50 text-emerald-700" :
                        lead.status === 'Converted' ? "bg-indigo-50 text-indigo-700" : "bg-slate-100 text-slate-700"
                      )}
                    >
                      <option value="New">New</option>
                      <option value="Contacted">Contacted</option>
                      <option value="Replied">Replied</option>
                      <option value="Converted">Converted</option>
                      <option value="Lost">Lost</option>
                    </select>
                  </td>
                  <td className="px-6 py-4 text-sm text-slate-600 font-medium">
                    {format(new Date(lead.createdAt), 'MMM d, yyyy')}
                  </td>
                  <td className="px-6 py-4 text-sm text-slate-500">
                    {lead.lastContacted 
                      ? format(new Date(lead.lastContacted), 'MMM d') 
                      : 'No activity yet'}
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button className="p-2 text-slate-400 hover:text-primary-600 hover:bg-white rounded-lg transition-all" title="Send Email">
                        <Mail size={16} />
                      </button>
                      <button className="p-2 text-slate-400 hover:text-primary-600 hover:bg-white rounded-lg transition-all" title="Schedule Call">
                        <Calendar size={16} />
                      </button>
                      <button className="p-2 text-slate-400 hover:text-slate-600 hover:bg-white rounded-lg transition-all">
                        <MoreHorizontal size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {filteredLeads.length === 0 && (
            <div className="p-12 text-center text-slate-400">
              <p>No leads found matching the filter.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SavedLeads;
