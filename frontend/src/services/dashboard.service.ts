import { leadService } from './lead.service';
import { DashboardStats } from '../types';

class DashboardService {
  async getStats(): Promise<DashboardStats> {
    const leads = await leadService.getAllLeads();
    const contacted = leads.filter(l => l.status !== 'New').length;
    const replied = leads.filter(l => l.status === 'Replied' || l.status === 'Converted').length;
    
    return {
      totalLeads: leads.length,
      contactedLeads: contacted,
      repliedLeads: replied,
      conversionRate: Math.round((replied / (contacted || 1)) * 100),
      weeklyGrowth: 15 // Mock growth
    };
  }

  async getMonthlyActivity() {
    return [
      { name: 'Jan', leads: 40, contacted: 24 },
      { name: 'Feb', leads: 30, contacted: 13 },
      { name: 'Mar', leads: 20, contacted: 98 },
      { name: 'Apr', leads: 27, contacted: 39 },
      { name: 'May', leads: 18, contacted: 48 },
      { name: 'Jun', leads: 23, contacted: 38 },
      { name: 'Jul', leads: 34, contacted: 43 },
    ];
  }
}

export const dashboardService = new DashboardService();
