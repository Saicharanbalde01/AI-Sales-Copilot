import { Lead, OutreachSequence, OutreachMessage } from '../types';
import { v4 as uuidv4 } from 'uuid';

class OutreachService {
  async generateSequence(lead: Lead): Promise<OutreachSequence> {
    // Simulate AI generation delay
    await new Promise(resolve => setTimeout(resolve, 1500));

    const companyName = lead.company?.name || 'your company';
    const industry = lead.company?.industry || 'your industry';

    const messages: OutreachMessage[] = [
      {
        id: uuidv4(),
        type: 'Email',
        subject: `Question about ${companyName}'s engineering growth`,
        content: `Hi ${lead.firstName},

I've been following ${companyName}'s progress in ${industry} and was particularly impressed by your recent expansion.

At [My Company], we help companies like yours optimize their B2B outreach through AI. Given your role as ${lead.jobTitle}, I thought you might be interested in how we could help scale your team's efficiency.

Do you have 10 minutes next week to chat?

Best,
[My Name]`
      },
      {
        id: uuidv4(),
        type: 'LinkedIn',
        content: `Hi ${lead.firstName}, I noticed your work at ${companyName} in the ${industry} space. Would love to connect and share some insights on sales automation we've been seeing in your industry. Cheers!`
      },
      {
        id: uuidv4(),
        type: 'FollowUp',
        subject: `Re: Question about ${companyName}'s engineering growth`,
        content: `Hi ${lead.firstName},

Just following up on my previous email. I know you're busy leading the team at ${companyName}, but I'd still love to share how we're helping other companies in ${industry} achieve better outreach results.

Let me know if you'd be open to a quick call.

Best,
[My Name]`
      }
    ];

    return {
      id: uuidv4(),
      leadId: lead.id,
      messages,
      status: 'Draft',
      createdAt: new Date().toISOString()
    };
  }
}

export const outreachService = new OutreachService();
