import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://atcsvmnnhcxnudfxyrke.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImF0Y3N2bW5uaGN4bnVkZnh5cmtlIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzQ2MjY3MzUsImV4cCI6MjA5MDIwMjczNX0.QAuRWzD29jRg8j_ES8Li30jxA8wyYVZRYYfz259tEnw'

export const supabase = createClient(supabaseUrl, supabaseKey)

// Get all colleges with fees from programs
export async function getColleges(filters = {}) {
  let query = supabase
    .from('colleges')
    .select('*, programs(id, total_fees, slug)')
    .order('nirf_rank', { ascending: true, nullsFirst: false })

  if (filters.city) query = query.eq('city', filters.city)
  if (filters.tier) query = query.eq('tier', filters.tier)
  if (filters.search) query = query.ilike('name', `%${filters.search}%`)

  const { data, error } = await query
  if (error) console.error('getColleges error:', error)

  return (data || []).map(c => ({
    ...c,
    min_fees: c.programs?.length > 0 ? Math.min(...c.programs.map(p => p.total_fees || Infinity).filter(f => f !== Infinity)) : null,
    program_count: c.programs?.length || 0,
    latest_avg_package: null,
    latest_max_package: null,
  }))
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

export async function getPrograms(filters = {}) {
  let query = supabase
    .from('programs')
    .select('*, colleges(name, slug, city, state, nirf_rank, logo_emoji, color, tier)')
    .eq('is_active', true)

  if (filters.maxFees) query = query.lte('total_fees', filters.maxFees)
  if (filters.programType) query = query.eq('program_type', filters.programType)

  const { data, error } = await query
  if (error) console.error(error)
  return data || []
}

export async function submitLead(leadData) {
  const { error } = await supabase.from('leads').insert([leadData])
  if (error) console.error('Lead error:', error)
  return !error
}

export async function getBlogPosts() {
  const { data, error } = await supabase
    .from('blog_posts')
    .select('id, title, slug, description, category, read_time, published_at')
    .eq('is_published', true)
    .order('published_at', { ascending: false, nullsFirst: false })
    .order('id', { ascending: false })
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

export async function getRecentBlogPosts(limit = 6, excludeSlug = '') {
  const { data, error } = await supabase
    .from('blog_posts')
    .select('id, title, slug, category, read_time, published_at')
    .eq('is_published', true)
    .order('published_at', { ascending: false, nullsFirst: false })
    .limit(limit + 1)
  if (error) console.error('getRecentBlogPosts error:', error)
  return (data || []).filter(p => p.slug !== excludeSlug).slice(0, limit)
}
