import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://atcsvmnnhcxnudfxyrke.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImF0Y3N2bW5uaGN4bnVkZnh5cmtlIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzQ2MjY3MzUsImV4cCI6MjA5MDIwMjczNX0.QAuRWzD29jRg8j_ES8Li30jxA8wyYVZRYYfz259tEnw'

export const supabase = createClient(supabaseUrl, supabaseKey)

// College queries
export async function getColleges(filters = {}) {
  let query = supabase
    .from('college_overview')
    .select('*')
    .order('nirf_rank', { ascending: true })

  if (filters.city) query = query.eq('city', filters.city)
  if (filters.tier) query = query.eq('tier', filters.tier)
  if (filters.search) query = query.ilike('name', `%${filters.search}%`)

  const { data, error } = await query
  if (error) console.error(error)
  return data || []
}

export async function getCollege(slug) {
  const { data, error } = await supabase
    .from('colleges')
    .select('*')
    .eq('slug', slug)
    .single()
  if (error) console.error(error)
  return data
}

export async function getCollegePrograms(collegeId) {
  const { data, error } = await supabase
    .from('programs')
    .select(`
      *,
      exam_cutoffs (
        cutoff, category, cutoff_type, year,
        exams ( name, score_type )
      ),
      placements ( * ),
      scholarships ( * ),
      testimonials ( * )
    `)
    .eq('college_id', collegeId)
    .eq('is_active', true)
  if (error) console.error(error)
  return data || []
}

export async function getCollegeLoans(collegeId) {
  const { data, error } = await supabase
    .from('loans')
    .select('*')
    .eq('college_id', collegeId)
  if (error) console.error(error)
  return data || []
}

// Programs with filters — for eligibility checker and rank predictor
export async function getPrograms(filters = {}) {
  let query = supabase
    .from('program_detail')
    .select('*')
    .eq('is_active', true)

  if (filters.maxFees) query = query.lte('total_fees', filters.maxFees)
  if (filters.programType) query = query.eq('program_type', filters.programType)
  if (filters.city) query = query.eq('city', filters.city)

  const { data, error } = await query.order('nirf_rank', { ascending: true })
  if (error) console.error(error)
  return data || []
}

// Get programs matching a CAT percentile
export async function getMatchingPrograms(examName, score) {
  const { data: exam } = await supabase
    .from('exams')
    .select('id')
    .eq('name', examName)
    .single()

  if (!exam) return { safe: [], reach: [], dream: [] }

  const { data, error } = await supabase
    .from('exam_cutoffs')
    .select(`
      cutoff,
      programs (
        id, name, slug, total_fees, program_type,
        colleges ( name, slug, city, nirf_rank, logo_emoji, color )
      )
    `)
    .eq('exam_id', exam.id)
    .eq('category', 'General')

  if (error || !data) return { safe: [], reach: [], dream: [] }

  const safe = data.filter(r => score >= r.cutoff + 1).map(r => r.programs)
  const reach = data.filter(r => score >= r.cutoff - 3 && score < r.cutoff + 1).map(r => r.programs)
  const dream = data.filter(r => score >= r.cutoff - 6 && score < r.cutoff - 2).map(r => r.programs)

  return { safe, reach, dream }
}

// Submit lead to Supabase
export async function submitLead(leadData) {
  const { data, error } = await supabase
    .from('leads')
    .insert([leadData])
  if (error) console.error('Lead error:', error)
  return !error
}

// Blog
export async function getBlogPosts() {
  const { data, error } = await supabase
    .from('blog_posts')
    .select('id, title, slug, description, category, read_time, published_at')
    .eq('is_published', true)
    .order('published_at', { ascending: false })
  if (error) console.error(error)
  return data || []
}

export async function getBlogPost(slug) {
  const { data, error } = await supabase
    .from('blog_posts')
    .select('*')
    .eq('slug', slug)
    .eq('is_published', true)
    .single()
  if (error) console.error(error)
  return data
}
