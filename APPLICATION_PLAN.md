# Application Plan - B2B Sales Copilot

## Core MVP Features

### 1. AI Lead Discovery
- Search interface with filters: Industry, Company Size, Location, Job Title.
- Paginated or list view of potential leads.
- Search functionality with mock data/simulated AI.

### 2. Automated Data Enrichment
- Lead detail view.
- Automated fetching of company description, website, social links.
- AI-generated insights for each company.

### 3. Personalized Outreach Engine (AI SDR)
- Generate personalized Cold Email, LinkedIn message, and Follow-up sequences.
- Context-aware generation based on lead data.

### 4. Smart Lead Scoring
- AI-calculated score (1-100) based on industry fit, growth, and role relevance.
- Visual indicator of score quality.

### 5. Mini CRM Dashboard
- Save leads to "Saved Leads".
- Track status (New, Contacted, Replied, Converted).
- Simple analytics for outreach performance.

### 6. AI Sales Insights
- Suggested messaging angle.
- Identified pain points.
- Best time to contact recommendations.

## Technical Stack
- **Frontend:** React + TypeScript + Vite
- **Styling:** Tailwind CSS v4
- **Icons:** Lucide React
- **Data Management:** Local Storage + Mock Services
- **AI Integration:** AI SDK (simulated for MVP)

## Implementation Roadmap

1. **Setup & Infrastructure:**
   - Install `react-router-dom`, `recharts`, `date-fns`.
   - Setup project structure (components, services, hooks, data).
2. **Data Mocks & Service Layer:**
   - Create comprehensive mock leads and company data.
   - Implement `lead.service.ts`, `outreach.service.ts`, `crm.service.ts`.
3. **UI Components (Atomic):**
   - Button, Input, Card, Badge, Modal, Sidebar, Layout.
4. **Main Pages:**
   - **Dashboard:** Overview stats and recent activity.
   - **Lead Finder:** Search and filter leads.
   - **Saved Leads:** CRM view with status tracking.
   - **Outreach Hub:** Message generation and sequence management.
   - **Analytics:** Basic performance charts.
5. **Polishing & Verification:**
   - Add animations and transitions.
   - Ensure responsive design.
   - Final build and error checking.
