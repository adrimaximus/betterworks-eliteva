import type { VercelRequest, VercelResponse } from '@vercel/node';

const MINIMAX_API_KEY = process.env.MINIMAX_API_KEY ?? '';

const SYSTEM_PROMPT = `You are EliteVA's AI configuration engine. EliteVA is an AI-powered virtual assistant service that helps businesses automate their operations — focused on WhatsApp automation, customer service, lead management, and workflow efficiency.

Your job: analyze a business profile and return a personalized EliteVA agent configuration as JSON.

Available service IDs and their descriptions:
- customer-service: 24/7 inbound chat & FAQ handling
- whatsapp-automation: Blast, reply & reminder flows
- lead-qualification: Auto-screen incoming prospects
- order-handling: Track and process requests automatically
- email-followup: Auto nurture sequences & reminders
- dashboard-reporting: Live summaries & performance views
- calendar-scheduling: Booking & task cadence automation
- auto-reminder: Context-aware scheduled reminders
- data-entry: Auto-capture from comm channels

Available tools: WhatsApp, Gmail, CRM, Google Sheets, Google Calendar, APIs, Google Drive

Instructions:
- Choose the 2 most relevant primaryFocus service IDs based on the business type and pains
- Choose 2 supportFocus service IDs that complement the primary
- Choose up to 4 tools that match the workflow
- Write 3 concise expectedOutputs (one sentence each, outcome-focused)
- Write a 2-3 sentence summary mentioning the business name, plan scale, focus areas, and tools
- Be specific and actionable — no generic filler

Return ONLY valid JSON. No markdown, no explanation, just the JSON object.

JSON structure:
{
  "tools": ["string"],
  "primaryFocus": ["service-id", "service-id"],
  "supportFocus": ["service-id", "service-id"],
  "expectedOutputs": ["string", "string", "string"],
  "summary": "string"
}`;

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { businessType, businessName, planInterest, businessPains } = req.body ?? {};

  if (!businessType || !planInterest || !businessPains) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  const userMessage = `Business Type: ${businessType}
Business Name: ${businessName || 'Not specified'}
Plan Interest: ${planInterest}
Work Challenges / Business Pains:
${businessPains}`;

  try {
    const response = await fetch('https://api.minimax.chat/v1/text/chatcompletion_v2', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${MINIMAX_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'MiniMax-Text-01',
        messages: [
          { role: 'system', content: SYSTEM_PROMPT },
          { role: 'user', content: userMessage },
        ],
        max_tokens: 800,
        temperature: 0.4,
      }),
    });

    if (!response.ok) {
      const errText = await response.text();
      console.error('MiniMax error:', errText);
      return res.status(502).json({ error: 'AI service error', detail: errText });
    }

    const data = await response.json();
    const raw = data?.choices?.[0]?.message?.content ?? '';

    // Extract JSON from response (strip any markdown code fences)
    const jsonMatch = raw.match(/\{[\s\S]*\}/);
    if (!jsonMatch) {
      console.error('No JSON found in response:', raw);
      return res.status(502).json({ error: 'Invalid AI response format' });
    }

    const recommendation = JSON.parse(jsonMatch[0]);
    return res.status(200).json(recommendation);
  } catch (err: any) {
    console.error('Recommend API error:', err);
    return res.status(500).json({ error: 'Internal server error', detail: err?.message });
  }
}
