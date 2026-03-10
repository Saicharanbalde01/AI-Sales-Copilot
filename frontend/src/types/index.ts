export type LeadStatus = 'New' | 'Contacted' | 'Replied' | 'Converted' | 'Lost';

export interface Company {
  id: string;
  name: string;
  website: string;
  industry: string;
  size: string;
  location: string;
  description: string;
  socialLinks: {
    linkedin?: string;
    twitter?: string;
  };
  insights: string[];
}

export interface Lead {
  id: string;
  firstName: string;
  lastName: string;
  jobTitle: string;
  email: string;
  companyId: string;
  company?: Company;
  status: LeadStatus;
  score: number;
  lastContacted?: string;
  createdAt: string;
}

export interface OutreachMessage {
  id: string;
  type: 'Email' | 'LinkedIn' | 'FollowUp';
  subject?: string;
  content: string;
}

export interface OutreachSequence {
  id: string;
  leadId: string;
  messages: OutreachMessage[];
  status: 'Draft' | 'Sent' | 'Scheduled';
  createdAt: string;
}

export interface DashboardStats {
  totalLeads: number;
  contactedLeads: number;
  repliedLeads: number;
  conversionRate: number;
  weeklyGrowth: number;
}

export interface UserSettings {
  profile: {
    fullName: string;
    email: string;
    jobTitle: string;
    company: string;
  };
  aiConfig: {
    creativityLevel: number;
    defaultTone: 'Professional' | 'Casual' | 'Direct' | 'Friendly';
    complianceFilter: boolean;
  };
}
