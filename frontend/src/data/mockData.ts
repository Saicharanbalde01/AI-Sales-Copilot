import { Lead, Company, LeadStatus } from '../types';

export const mockCompanies: Company[] = [
  {
    id: 'c1',
    name: 'TechFlow Systems',
    website: 'https://techflow.io',
    industry: 'Software Development',
    size: '50-200 employees',
    location: 'San Francisco, CA',
    description: 'TechFlow specializes in cloud infrastructure automation and CI/CD pipelines for high-growth startups.',
    socialLinks: {
      linkedin: 'https://linkedin.com/company/techflow',
      twitter: 'https://twitter.com/techflow'
    },
    insights: [
      'Recently raised Series B funding ($25M).',
      'Expanding their engineering team in Europe.',
      'High priority for security automation tools.'
    ]
  },
  {
    id: 'c2',
    name: 'GreenLeaf Marketing',
    website: 'https://greenleaf.com',
    industry: 'Marketing & Advertising',
    size: '11-50 employees',
    location: 'Austin, TX',
    description: 'A full-service digital marketing agency focusing on sustainable and eco-friendly brands.',
    socialLinks: {
      linkedin: 'https://linkedin.com/company/greenleaf',
      twitter: 'https://twitter.com/greenleaf'
    },
    insights: [
      'Integrating AI into their content production workflow.',
      'Looking for better client reporting dashboards.',
      'Focusing on video content for 2024.'
    ]
  },
  {
    id: 'c3',
    name: 'Nimbus Health',
    website: 'https://nimbushealth.com',
    industry: 'Healthcare Tech',
    size: '201-500 employees',
    location: 'Boston, MA',
    description: 'Innovative telemedicine platform connecting rural patients with specialists via AI-driven diagnostics.',
    socialLinks: {
      linkedin: 'https://linkedin.com/company/nimbushealth'
    },
    insights: [
      'Strong focus on HIPAA compliance and data security.',
      'Acquired a smaller AI diagnostics startup last month.',
      'Planning to enter the APAC market.'
    ]
  }
];

export const mockLeads: Lead[] = [
  {
    id: 'l1',
    firstName: 'Sarah',
    lastName: 'Chen',
    jobTitle: 'VP of Engineering',
    email: 'sarah.chen@techflow.io',
    companyId: 'c1',
    status: 'New',
    score: 88,
    createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString()
  },
  {
    id: 'l2',
    firstName: 'Mark',
    lastName: 'Johnson',
    jobTitle: 'Head of Marketing',
    email: 'mark@greenleaf.com',
    companyId: 'c2',
    status: 'Contacted',
    score: 72,
    lastContacted: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
    createdAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString()
  },
  {
    id: 'l3',
    firstName: 'Elena',
    lastName: 'Rodriguez',
    jobTitle: 'CTO',
    email: 'elena@nimbushealth.com',
    companyId: 'c3',
    status: 'Replied',
    score: 95,
    lastContacted: new Date(Date.now() - 12 * 60 * 60 * 1000).toISOString(),
    createdAt: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000).toISOString()
  },
  {
    id: 'l4',
    firstName: 'David',
    lastName: 'Smith',
    jobTitle: 'Director of Ops',
    email: 'dsmith@techflow.io',
    companyId: 'c1',
    status: 'New',
    score: 65,
    createdAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString()
  }
].map(lead => ({
  ...lead,
  company: mockCompanies.find(c => c.id === lead.companyId)
}) as Lead);
