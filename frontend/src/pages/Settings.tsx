import React, { useState, useEffect } from 'react';
import { 
  User, 
  Bell, 
  Lock, 
  Globe, 
  Database, 
  Zap,
  Mail,
  ShieldCheck,
  Save,
  Loader2,
  CheckCircle2
} from 'lucide-react';
import { settingsService } from '../services/settings.service';
import { UserSettings } from '../types';

const Settings = () => {
  const [activeTab, setActiveTab] = useState('profile');
  const [settings, setSettings] = useState<UserSettings | null>(null);
  const [isSaving, setIsSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const data = await settingsService.getSettings();
        setSettings(data);
      } catch (error) {
        console.error('Error fetching settings:', error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchSettings();
  }, []);

  const handleSave = async () => {
    if (!settings) return;
    
    setIsSaving(true);
    setSaveSuccess(false);
    
    try {
      await settingsService.updateSettings(settings);
      setSaveSuccess(true);
      setTimeout(() => setSaveSuccess(false), 3000);
    } catch (error) {
      console.error('Error saving settings:', error);
    } finally {
      setIsSaving(false);
    }
  };

  const updateProfile = (field: keyof UserSettings['profile'], value: string) => {
    if (!settings) return;
    setSettings({
      ...settings,
      profile: {
        ...settings.profile,
        [field]: value
      }
    });
  };

  const updateAiConfig = (field: keyof UserSettings['aiConfig'], value: any) => {
    if (!settings) return;
    setSettings({
      ...settings,
      aiConfig: {
        ...settings.aiConfig,
        [field]: value
      }
    });
  };

  if (isLoading || !settings) {
    return (
      <div className="h-full flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-primary-600" />
      </div>
    );
  }

  const tabs = [
    { id: 'profile', label: 'Profile', icon: User },
    { id: 'notifications', label: 'Notifications', icon: Bell },
    { id: 'security', label: 'Security', icon: Lock },
    { id: 'ai-config', label: 'AI Configuration', icon: Zap },
    { id: 'integrations', label: 'Integrations', icon: Globe },
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Settings</h1>
          <p className="text-slate-500 text-sm">Manage your account and application preferences</p>
        </div>
        {saveSuccess && (
          <div className="flex items-center gap-2 text-emerald-600 bg-emerald-50 px-3 py-1.5 rounded-full text-sm font-medium animate-in fade-in slide-in-from-top-2 duration-300">
            <CheckCircle2 size={16} />
            Changes saved successfully
          </div>
        )}
      </div>

      <div className="flex flex-col md:flex-row gap-6">
        {/* Sidebar Tabs */}
        <div className="w-full md:w-64 space-y-1">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all ${
                activeTab === tab.id
                  ? 'bg-primary-600 text-white shadow-md shadow-primary-200'
                  : 'text-slate-600 hover:bg-white hover:text-slate-900'
              }`}
            >
              <tab.icon size={18} />
              {tab.label}
            </button>
          ))}
        </div>

        {/* Content Area */}
        <div className="flex-1 bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden flex flex-col">
          <div className="flex-1">
            {activeTab === 'profile' && (
              <div className="p-6 space-y-6">
                <div className="flex items-center gap-6">
                  <div className="h-20 w-20 rounded-full bg-slate-100 flex items-center justify-center text-slate-400 border-2 border-slate-200">
                    <User size={40} />
                  </div>
                  <div>
                    <h3 className="font-semibold text-slate-900">Profile Picture</h3>
                    <p className="text-sm text-slate-500 mb-3">JPG, GIF or PNG. Max size of 800K</p>
                    <div className="flex gap-2">
                      <button className="px-4 py-2 bg-primary-600 text-white rounded-lg text-sm font-medium hover:bg-primary-700 transition-colors">
                        Upload new
                      </button>
                      <button className="px-4 py-2 bg-white border border-slate-200 text-slate-700 rounded-lg text-sm font-medium hover:bg-slate-50 transition-colors">
                        Remove
                      </button>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-sm font-medium text-slate-700">Full Name</label>
                    <input 
                      type="text" 
                      value={settings.profile.fullName}
                      onChange={(e) => updateProfile('fullName', e.target.value)}
                      className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 transition-all"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-sm font-medium text-slate-700">Email Address</label>
                    <input 
                      type="email" 
                      value={settings.profile.email}
                      onChange={(e) => updateProfile('email', e.target.value)}
                      className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 transition-all"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-sm font-medium text-slate-700">Job Title</label>
                    <input 
                      type="text" 
                      value={settings.profile.jobTitle}
                      onChange={(e) => updateProfile('jobTitle', e.target.value)}
                      className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 transition-all"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-sm font-medium text-slate-700">Company</label>
                    <input 
                      type="text" 
                      value={settings.profile.company}
                      onChange={(e) => updateProfile('company', e.target.value)}
                      className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 transition-all"
                    />
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'ai-config' && (
              <div className="p-6 space-y-6">
                <div className="space-y-1">
                  <h3 className="font-semibold text-slate-900">AI Model Preferences</h3>
                  <p className="text-sm text-slate-500">Configure how the AI generates outreach messages</p>
                </div>

                <div className="space-y-4">
                  <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-amber-100 text-amber-600 rounded-lg">
                        <Zap size={20} />
                      </div>
                      <div>
                        <p className="font-medium text-slate-900 text-sm">Creativity Level ({settings.aiConfig.creativityLevel}%)</p>
                        <p className="text-xs text-slate-500">Higher creativity leads to more unique messages</p>
                      </div>
                    </div>
                    <input 
                      type="range" 
                      className="accent-primary-600" 
                      value={settings.aiConfig.creativityLevel}
                      onChange={(e) => updateAiConfig('creativityLevel', parseInt(e.target.value))}
                    />
                  </div>

                  <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-blue-100 text-blue-600 rounded-lg">
                        <Mail size={20} />
                      </div>
                      <div>
                        <p className="font-medium text-slate-900 text-sm">Default Outreach Tone</p>
                        <p className="text-xs text-slate-500">Set the default mood for your emails</p>
                      </div>
                    </div>
                    <select 
                      className="bg-white border border-slate-200 rounded-lg px-3 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500/20"
                      value={settings.aiConfig.defaultTone}
                      onChange={(e) => updateAiConfig('defaultTone', e.target.value)}
                    >
                      <option value="Professional">Professional</option>
                      <option value="Casual">Casual</option>
                      <option value="Direct">Direct</option>
                      <option value="Friendly">Friendly</option>
                    </select>
                  </div>

                  <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-emerald-100 text-emerald-600 rounded-lg">
                        <ShieldCheck size={20} />
                      </div>
                      <div>
                        <p className="font-medium text-slate-900 text-sm">Compliance Filter</p>
                        <p className="text-xs text-slate-500">Automatically check for GDPR compliance</p>
                      </div>
                    </div>
                    <div className="relative inline-flex items-center cursor-pointer">
                      <input 
                        type="checkbox" 
                        className="sr-only peer" 
                        checked={settings.aiConfig.complianceFilter}
                        onChange={(e) => updateAiConfig('complianceFilter', e.target.checked)}
                      />
                      <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-600"></div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab !== 'profile' && activeTab !== 'ai-config' && (
              <div className="p-12 flex flex-col items-center justify-center text-center space-y-4">
                <div className="p-4 bg-slate-50 rounded-full text-slate-300">
                  <Database size={48} />
                </div>
                <div>
                  <h3 className="font-semibold text-slate-900">Work in Progress</h3>
                  <p className="text-sm text-slate-500">This settings module is currently under development</p>
                </div>
              </div>
            )}
          </div>

          <div className="px-6 py-4 bg-slate-50 border-t border-slate-200 flex justify-end">
            <button 
              onClick={handleSave}
              disabled={isSaving}
              className="flex items-center gap-2 px-6 py-2 bg-primary-600 text-white rounded-lg text-sm font-medium hover:bg-primary-700 transition-colors disabled:opacity-70 disabled:cursor-not-allowed min-w-[140px] justify-center"
            >
              {isSaving ? (
                <>
                  <Loader2 size={16} className="animate-spin" />
                  Saving...
                </>
              ) : (
                <>
                  <Save size={16} />
                  Save Changes
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;
