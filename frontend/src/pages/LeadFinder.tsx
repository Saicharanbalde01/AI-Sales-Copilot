import React, { useState, useEffect } from 'react';
import { 
  Search, 
  Filter, 
  MapPin, 
  Building2, 
  ExternalLink, 
  Linkedin, 
  Twitter,
  ChevronRight,
  Sparkles,
  Save,
  CheckCircle2,
  Users
} from 'lucide-react';
import { leadService } from '../services/lead.service';
import { Lead } from '../types';
import { clsx } from 'clsx';

const LeadFinder = () => {
  const [query, setQuery] = useState('');
  const [leads, setLeads] = useState<Lead[]>([]);
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null);
  const [isEnriching, setIsEnriching] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    handleSearch();
  }, []);

  const handleSearch = async () => {
    setIsLoading(true);
    const results = await leadService.searchLeads(query);
    setLeads(results);
    setIsLoading(false);
  };

  const handleEnrich = async (lead: Lead) => {
    setIsEnriching(true);
    const enriched = await leadService.enrichLead(lead.id);
    if (enriched) {
      setSelectedLead(enriched);
      setLeads(leads.map(l => l.id === enriched.id ? enriched : l));
    }
    setIsEnriching(false);
  };

  return (
    <div className="flex gap-8 h-[calc(100vh-160px)] animate-in fade-in duration-500">
      <div className="flex-1 flex flex-col min-w-0">
        <div className="flex flex-col gap-4 mb-6">
          <h1 className="text-2xl font-bold text-slate-900">Lead Finder</h1>
          <div className="flex gap-3">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
              <input 
                type="text" 
                placeholder="Search by name, company, or industry..." 
                className="input pl-10"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
              />
            </div>
            <button className="btn btn-secondary flex gap-2">
              <Filter size={18} />
              Filters
            </button>
            <button className="btn btn-primary px-6" onClick={handleSearch} disabled={isLoading}>
              {isLoading ? 'Searching...' : 'Search'}
            </button>
          </div>
        </div>

        <div className="flex-1 card overflow-hidden flex flex-col">
          <div className="overflow-y-auto">
            <table className="w-full text-left border-collapse">
              <thead className="sticky top-0 bg-white border-b border-slate-200 z-10">
                <tr>
                  <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Lead</th>
                  <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Company</th>
                  <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Score</th>
                  <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Status</th>
                  <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider"></th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {leads.map((lead) => (
                  <tr 
                    key={lead.id} 
                    className={clsx(
                      "hover:bg-slate-50 transition-colors cursor-pointer group",
                      selectedLead?.id === lead.id && "bg-primary-50/50"
                    )}
                    onClick={() => setSelectedLead(lead)}
                  >
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="h-10 w-10 bg-slate-100 rounded-full flex items-center justify-center font-bold text-slate-600">
                          {lead.firstName[0]}{lead.lastName[0]}
                        </div>
                        <div>
                          <p className="text-sm font-semibold text-slate-900">{lead.firstName} {lead.lastName}</p>
                          <p className="text-xs text-slate-500">{lead.jobTitle}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <Building2 size={16} className="text-slate-400" />
                        <div>
                          <p className="text-sm text-slate-900">{lead.company?.name}</p>
                          <p className="text-xs text-slate-500">{lead.company?.industry}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <div className="w-12 bg-slate-100 h-1.5 rounded-full overflow-hidden">
                          <div 
                            className={clsx(
                              "h-full rounded-full",
                              lead.score >= 80 ? "bg-emerald-500" : lead.score >= 60 ? "bg-amber-500" : "bg-red-500"
                            )}
                            style={{ width: `${lead.score}%` }}
                          />
                        </div>
                        <span className="text-sm font-medium text-slate-700">{lead.score}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className={clsx(
                        "badge",
                        lead.status === 'New' ? "bg-blue-50 text-blue-700" : 
                        lead.status === 'Contacted' ? "bg-amber-50 text-amber-700" :
                        lead.status === 'Replied' ? "bg-emerald-50 text-emerald-700" : "bg-slate-100 text-slate-700"
                      )}>
                        {lead.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <ChevronRight size={18} className="text-slate-300 group-hover:text-primary-500 transition-colors" />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <div className="w-96 flex flex-col gap-6 overflow-y-auto">
        {selectedLead ? (
          <>
            <div className="card p-6 space-y-6">
              <div className="flex items-start justify-between">
                <div className="flex gap-4">
                  <div className="h-16 w-16 bg-primary-100 text-primary-600 rounded-xl flex items-center justify-center text-2xl font-bold">
                    {selectedLead.firstName[0]}{selectedLead.lastName[0]}
                  </div>
                  <div>
                    <h2 className="text-xl font-bold text-slate-900">{selectedLead.firstName} {selectedLead.lastName}</h2>
                    <p className="text-slate-500 font-medium">{selectedLead.jobTitle}</p>
                    <p className="text-sm text-slate-400 mt-1">{selectedLead.email}</p>
                  </div>
                </div>
              </div>

              <div className="flex gap-2">
                <button className="btn btn-primary flex-1 gap-2" onClick={() => handleEnrich(selectedLead)} disabled={isEnriching}>
                  <Sparkles size={18} className={isEnriching ? "animate-spin" : ""} />
                  {isEnriching ? 'Enriching...' : 'AI Enrich'}
                </button>
                <button className="btn btn-secondary px-3">
                  <Save size={18} />
                </button>
              </div>

              <div className="space-y-4 pt-4 border-t border-slate-100">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-slate-500">Smart Score</span>
                  <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 text-sm font-bold">
                    {selectedLead.score}/100
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-slate-500">Industry Fit</span>
                  <span className="text-sm font-semibold text-slate-900">Excellent</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-slate-500">Buying Intent</span>
                  <span className="text-sm font-semibold text-slate-900">High</span>
                </div>
              </div>
            </div>

            <div className="card p-6">
              <h3 className="text-lg font-bold text-slate-900 mb-4">Company Profile</h3>
              <div className="space-y-4">
                <div className="flex gap-3">
                  <div className="h-10 w-10 bg-slate-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Building2 size={20} className="text-slate-600" />
                  </div>
                  <div>
                    <p className="text-sm font-bold text-slate-900">{selectedLead.company?.name}</p>
                    <p className="text-xs text-slate-500">{selectedLead.company?.location}</p>
                  </div>
                </div>
                
                <p className="text-sm text-slate-600 leading-relaxed">
                  {selectedLead.company?.description}
                </p>

                <div className="flex gap-4 py-2">
                  <a href={selectedLead.company?.website} target="_blank" rel="noreferrer" className="text-slate-400 hover:text-primary-600 transition-colors">
                    <ExternalLink size={20} />
                  </a>
                  {selectedLead.company?.socialLinks.linkedin && (
                    <a href={selectedLead.company?.socialLinks.linkedin} target="_blank" rel="noreferrer" className="text-slate-400 hover:text-primary-600 transition-colors">
                      <Linkedin size={20} />
                    </a>
                  )}
                  {selectedLead.company?.socialLinks.twitter && (
                    <a href={selectedLead.company?.socialLinks.twitter} target="_blank" rel="noreferrer" className="text-slate-400 hover:text-primary-600 transition-colors">
                      <Twitter size={20} />
                    </a>
                  )}
                </div>

                <div className="space-y-3 pt-4 border-t border-slate-100">
                  <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">AI Insights</p>
                  {selectedLead.company?.insights.map((insight, idx) => (
                    <div key={idx} className="flex gap-3 items-start">
                      <CheckCircle2 size={14} className="text-emerald-500 mt-1 flex-shrink-0" />
                      <p className="text-xs text-slate-600">{insight}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </>
        ) : (
          <div className="h-full card flex flex-col items-center justify-center p-8 text-center text-slate-400">
            <div className="bg-slate-50 p-4 rounded-full mb-4">
              <Users size={48} className="opacity-20" />
            </div>
            <p className="font-medium">Select a lead to see details and AI enrichment</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default LeadFinder;
