import React, { useState, useEffect } from 'react';
import { 
  Send, 
  Mail, 
  Linkedin, 
  Clock, 
  Copy, 
  Check, 
  Sparkles,
  ChevronDown,
  ChevronUp,
  RotateCcw
} from 'lucide-react';
import { leadService } from '../services/lead.service';
import { outreachService } from '../services/outreach.service';
import { Lead, OutreachSequence } from '../types';
import { clsx } from 'clsx';

const OutreachHub = () => {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null);
  const [sequence, setSequence] = useState<OutreachSequence | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  useEffect(() => {
    leadService.getAllLeads().then(setLeads);
  }, []);

  const handleGenerate = async () => {
    if (!selectedLead) return;
    setIsGenerating(true);
    const result = await outreachService.generateSequence(selectedLead);
    setSequence(result);
    setIsGenerating(false);
  };

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">AI Outreach Hub</h1>
          <p className="text-slate-500">Generate hyper-personalized sequences using AI SDR.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-4 space-y-6">
          <div className="card p-6">
            <h3 className="text-lg font-bold text-slate-900 mb-4">1. Select Target Lead</h3>
            <div className="space-y-2 max-h-[400px] overflow-y-auto pr-2">
              {leads.map((lead) => (
                <div 
                  key={lead.id}
                  onClick={() => setSelectedLead(lead)}
                  className={clsx(
                    "p-3 rounded-lg border cursor-pointer transition-all",
                    selectedLead?.id === lead.id 
                      ? "border-primary-500 bg-primary-50 ring-1 ring-primary-500" 
                      : "border-slate-100 hover:border-slate-300 bg-white"
                  )}
                >
                  <p className="text-sm font-bold text-slate-900">{lead.firstName} {lead.lastName}</p>
                  <p className="text-xs text-slate-500">{lead.jobTitle} @ {lead.company?.name}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="card p-6 bg-primary-600 text-white border-none">
            <h3 className="text-lg font-bold mb-2">Ready to scale?</h3>
            <p className="text-primary-100 text-sm mb-4">AI SDR can analyze your leads and draft high-converting sequences in seconds.</p>
            <button 
              className="w-full bg-white text-primary-600 font-bold py-2 rounded-lg hover:bg-primary-50 transition-colors flex items-center justify-center gap-2"
              disabled={!selectedLead || isGenerating}
              onClick={handleGenerate}
            >
              <Sparkles size={18} className={isGenerating ? "animate-spin" : ""} />
              {isGenerating ? 'Analyzing Data...' : 'Generate Sequence'}
            </button>
          </div>
        </div>

        <div className="lg:col-span-8">
          {sequence ? (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-bold text-slate-900">Generated Sequence</h3>
                <div className="flex gap-2">
                  <button className="btn btn-secondary text-sm gap-2" onClick={handleGenerate}>
                    <RotateCcw size={16} />
                    Regenerate
                  </button>
                </div>
              </div>

              {sequence.messages.map((msg, i) => (
                <div key={msg.id} className="card overflow-visible">
                  <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
                    <div className="flex items-center gap-3">
                      <div className="h-8 w-8 bg-white border border-slate-200 rounded-lg flex items-center justify-center text-slate-600">
                        {msg.type === 'Email' || msg.type === 'FollowUp' ? <Mail size={16} /> : <Linkedin size={16} />}
                      </div>
                      <div>
                        <span className="text-sm font-bold text-slate-900">{msg.type} {msg.type === 'FollowUp' ? '(Day 3)' : ''}</span>
                      </div>
                    </div>
                    <button 
                      className="p-2 text-slate-400 hover:text-primary-600 hover:bg-white rounded-lg transition-all"
                      onClick={() => copyToClipboard(msg.content, msg.id)}
                    >
                      {copiedId === msg.id ? <Check size={18} className="text-emerald-500" /> : <Copy size={18} />}
                    </button>
                  </div>
                  <div className="p-6">
                    {msg.subject && (
                      <div className="mb-4 pb-4 border-b border-slate-50">
                        <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block mb-1">Subject</span>
                        <p className="text-sm font-semibold text-slate-900">{msg.subject}</p>
                      </div>
                    )}
                    <div className="prose prose-sm max-w-none">
                      <p className="text-slate-600 whitespace-pre-wrap leading-relaxed">{msg.content}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="h-[500px] card flex flex-col items-center justify-center p-12 text-center">
              <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center mb-6">
                <Sparkles size={40} className="text-slate-200" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-2">No Sequence Generated</h3>
              <p className="text-slate-500 max-w-md mx-auto">
                {selectedLead 
                  ? `Click "Generate Sequence" to let the AI SDR draft personalized messages for ${selectedLead.firstName}.`
                  : 'Select a lead from the list to start generating your personalized outreach sequence.'}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default OutreachHub;
