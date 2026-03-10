import { Lead, Company } from '../types';
import { mockLeads, mockCompanies } from '../data/mockData';

const STORAGE_KEY = 'sales_copilot_leads';

class LeadService {
  private leads: Lead[] = [];

  constructor() {
    this.init();
  }

  private init() {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      this.leads = JSON.parse(stored);
    } else {
      this.leads = [...mockLeads];
      this.save();
    }
  }

  private save() {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(this.leads));
  }

  async getAllLeads(): Promise<Lead[]> {
    return [...this.leads];
  }

  async searchLeads(query: string, filters?: any): Promise<Lead[]> {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 500));
    
    let results = [...this.leads];
    
    if (query) {
      const q = query.toLowerCase();
      results = results.filter(l => 
        l.firstName.toLowerCase().includes(q) || 
        l.lastName.toLowerCase().includes(q) || 
        l.company?.name.toLowerCase().includes(q) ||
        l.jobTitle.toLowerCase().includes(q)
      );
    }

    if (filters?.industry) {
      results = results.filter(l => l.company?.industry === filters.industry);
    }

    return results;
  }

  async getLeadById(id: string): Promise<Lead | undefined> {
    return this.leads.find(l => l.id === id);
  }

  async saveLead(lead: Lead): Promise<Lead> {
    const index = this.leads.findIndex(l => l.id === lead.id);
    if (index >= 0) {
      this.leads[index] = lead;
    } else {
      this.leads.push(lead);
    }
    this.save();
    return lead;
  }

  async enrichLead(leadId: string): Promise<Lead | undefined> {
    await new Promise(resolve => setTimeout(resolve, 1000));
    const lead = this.leads.find(l => l.id === leadId);
    if (lead && lead.company) {
      // Enrichment logic: add more insights or data points
      const updatedLead = {
        ...lead,
        company: {
          ...lead.company,
          insights: [
            ...lead.company.insights,
            'AI Insight: Highly likely to be interested in sales automation based on current hiring trends.'
          ]
        }
      };
      return this.saveLead(updatedLead);
    }
    return lead;
  }

  async getIndustries(): Promise<string[]> {
    const industries = new Set(mockCompanies.map(c => c.industry));
    return Array.from(industries);
  }
}

export const leadService = new LeadService();
