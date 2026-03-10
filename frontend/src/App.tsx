import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Dashboard from './pages/Dashboard';
import LeadFinder from './pages/LeadFinder';
import OutreachHub from './pages/OutreachHub';
import SavedLeads from './pages/SavedLeads';
import Analytics from './pages/Analytics';
import Settings from './pages/Settings';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Dashboard />} />
          <Route path="finder" element={<LeadFinder />} />
          <Route path="outreach" element={<OutreachHub />} />
          <Route path="saved" element={<SavedLeads />} />
          <Route path="analytics" element={<Analytics />} />
          <Route path="settings" element={<Settings />} />
        </Route>
      </Routes>
    </Router>
  );
};

export default App;