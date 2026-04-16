import iimAhmedabad      from './iim-ahmedabad'
import iimBangalore      from './iim-bangalore'
import soil              from './soil'
import greatLakesChennai from './great-lakes-chennai/index'

export const COLLEGES = [
  iimAhmedabad,
  iimBangalore,
  soil,
  greatLakesChennai,
]

export const COLLEGE_MAP = Object.fromEntries(COLLEGES.map(c => [c.slug, c]))

export default COLLEGES
