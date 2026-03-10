import { UserSettings } from '../types';

const SETTINGS_KEY = 'sales_copilot_settings';

const DEFAULT_SETTINGS: UserSettings = {
  profile: {
    fullName: 'John Doe',
    email: 'john@example.com',
    jobTitle: 'Sales Manager',
    company: 'Acme Inc',
  },
  aiConfig: {
    creativityLevel: 50,
    defaultTone: 'Professional',
    complianceFilter: true,
  },
};

class SettingsService {
  async getSettings(): Promise<UserSettings> {
    const saved = localStorage.getItem(SETTINGS_KEY);
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error('Failed to parse settings', e);
      }
    }
    return DEFAULT_SETTINGS;
  }

  async updateSettings(settings: UserSettings): Promise<UserSettings> {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 800));
    
    localStorage.setItem(SETTINGS_KEY, JSON.stringify(settings));
    return settings;
  }
}

export const settingsService = new SettingsService();
