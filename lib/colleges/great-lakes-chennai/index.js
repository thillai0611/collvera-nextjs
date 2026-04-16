import core       from './core'
import placements  from './placements'
import fees        from './fees'
import admissions  from './admissions'
import campus      from './campus'
import verdict     from './verdict'
import reviews     from './reviews'
import faqs        from './faqs'

const college = {
  ...core,
  placements,
  fees,
  admissions,
  campus,
  verdict,
  reviews,
  faqs,
}

export default college
