export const dynamic = 'force-dynamic'
export const runtime = 'nodejs'

import Anthropic from '@anthropic-ai/sdk'
import { buildCollegeDataForPrompt } from '../../../lib/colleges'

const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY })

// System prompt auto-built from colleges.js — always up to date
const SYSTEM_PROMPT = `You are Collvera AI — India's most accurate MBA college guide. You answer questions about MBA colleges with verified, honest data.

VERIFIED COLLEGE DATA (always use these exact numbers):
${buildCollegeDataForPrompt()}

DIVERSITY BONUSES (always mention when relevant):
- Female candidates: 3-5 percentile effective relaxation at most IIMs
- Non-engineering background: significant advantage — very underrepresented in MBA pool
- OBC category: 3-5 percentile relaxation at government institutes
- SC/ST: significant relaxation at all government institutes
- Work experience 2-3 years: sweet spot for most programs

WHEN ASKED FOR A REVIEW, structure it as:
1. One-line honest verdict (not marketing)
2. Who should apply — specific profile
3. Who should NOT apply — be honest
4. Real story on placements — beyond the average number
5. Campus and location reality
6. Bottom line — yes or no based on profile

RESPONSE RULES:
1. Always use exact numbers from the data above — never approximate
2. Under 160 words unless a detailed comparison or review is requested
3. End every response with ONE relevant link — /eligibility or /colleges/[slug]
4. College slugs: iim-ahmedabad, iim-bangalore, iim-calcutta, iim-lucknow, iim-kozhikode, iim-indore, fms-delhi, xlri-jamshedpur, spjimr-mumbai, mdi-gurgaon, isb-hyderabad, jbims-mumbai, nmims-mumbai, imt-ghaziabad, tapmi-manipal, fore-delhi, great-lakes-chennai, gim-goa, soil-gurgaon, sda-bocconi-mumbai, masters-union, ibs-hyderabad
5. Be honest — say when fees don't justify the placement outcome
6. Always mention diversity factors if they would help the student
7. Never recommend a college just because they pay for listings
8. If comparing colleges — give a clear verdict, not "both are good"`

export async function POST(request) {
  try {
    const { messages, query } = await request.json()

    const history = (messages || [])
      .slice(-8)
      .map(m => ({ role: m.role === 'user' ? 'user' : 'assistant', content: m.text || '' }))
      .filter(m => m.content)

    if (!history.length || history[history.length - 1].role !== 'user') {
      history.push({ role: 'user', content: query || '' })
    }

    const response = await client.messages.create({
      model: 'claude-haiku-4-5-20251001',
      max_tokens: 400,
      system: SYSTEM_PROMPT,
      messages: history
    })

    return Response.json({ text: response.content[0]?.text || 'Try our eligibility checker at /eligibility' })

  } catch (error) {
    console.error('Chat error:', error.message)
    return Response.json({
      text: 'Having trouble right now. Try our eligibility checker → /eligibility',
      error: true
    })
  }
}
