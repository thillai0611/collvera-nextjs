import core       from './core'
import placements  from './placements'
import fees        from './fees'
import admissions  from './admissions'
import campus      from './campus'
import verdict     from './verdict'
import reviews     from './reviews'
import alumni      from './alumni'
import faqs        from './faqs'

const college = {
  ...core,
  placements,
  fees,
  admissions,
  campus,
  verdict,
  reviews,
  alumni: alumni.pgdm,   // CollegeDetailClient expects d.alumni as flat array
  alumni_data: alumni,   // full alumni data for section page
  faqs,
}

export default college
