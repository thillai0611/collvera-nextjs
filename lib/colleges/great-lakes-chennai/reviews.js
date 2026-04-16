const reviews = {
  overall: 4.3,
  total: 78,

  // Breakdown keys match what CollegeDetailClient reads
  placements: 3.9,
  academics:  4.6,
  campus:     4.4,
  roi:        4.0,

  // Also available in breakdown object for GenericPage/CollegeSectionClient
  breakdown: {
    infrastructure: 4.7,
    faculty:        4.6,
    campus_life:    4.4,
    roi:            4.0,
    placements:     3.9,
  },

  quotes: [
    {
      text: 'The BFSI placement network in Chennai is genuinely unmatched outside the IIMs. I got a JP Morgan offer and it changed my entire career trajectory.',
      source: 'PGPM 2024 alumnus — JP Morgan, Chennai',
    },
    {
      text: 'Visiting faculty from Kellogg and Stanford were the highlight. A 3-week corporate finance module with a Kellogg professor was the best academic experience of the programme.',
      source: 'PGPM 2023 alumnus — Finance track',
    },
    {
      text: 'The campus is beautiful and the AC hostels are genuinely comfortable. But be prepared — it is a 40-minute drive to Chennai city. You live in an ECR bubble.',
      source: 'PGDM 2024 student — Shiksha verified review',
    },
    {
      text: 'Infrastructure is top-class. Bloomberg terminal, HBS case database, Sodexo food. But placements depend heavily on which track you target. BFSI and analytics students do well. Others need to work harder.',
      source: 'PGDM 2023 alumnus — Analytics track',
    },
  ],

  content: `<h2>Great Lakes Chennai Student Reviews 2025 — What Current Students and Alumni Actually Say</h2>

<p>78 verified reviews from Shiksha, Google, Quora, and LinkedIn give an aggregate rating of <strong>4.3 out of 5</strong>. Breakdown: infrastructure 4.7, faculty 4.6, campus life 4.4, ROI 4.0, placements 3.9. The gap between infrastructure (very high) and placements (good but variable) is the most informative signal — it reflects a recurring theme. Students love the campus experience consistently; placement outcomes vary based on sector targeting and internship performance.</p>

<h3>Infrastructure: Unanimously Praised</h3>

<p>Infrastructure at 4.7/5 is the highest-rated category with near-unanimous positivity. AC hostels, classroom quality, campus greenery, Bloomberg terminal access, and Sodexo cafeteria management receive consistent praise. Multiple reviews from engineering undergraduates note that GLIM Chennai's campus quality compares favourably to their IIT campuses. The HBS case database is specifically called out in multiple reviews as a daily-use resource for analytics, finance, and consulting students — not marketing infrastructure.</p>

<h3>Faculty: Visiting Professors Get the Highest Praise</h3>

<p>Faculty at 4.6/5, but with a clear internal pattern: visiting international faculty receive significantly higher praise than full-time faculty. A PGPM 2023 alumnus specifically credited a 3-week corporate finance module from a Kellogg professor as the single best academic experience of the programme. A 2024 batch member described a Stanford visiting professor's digital business models module as the trigger for their career switch into product management. Full-time faculty receive praise for availability and responsiveness; the differentiated academic experience is the visiting faculty programme.</p>

<h3>Placements: Positive at the Top, Mixed in the Middle</h3>

<p>Placements at 3.9/5 — the lowest-rated category — follows a consistent pattern. Students who landed JP Morgan, BNY Mellon, Deloitte, Tiger Analytics, or Gartner are uniformly positive. Students who ended up in IT services at ₹12–15 LPA report feeling that placement support was concentrated on the top 30–40% of the batch targeting BFSI, analytics, and consulting. This is a genuine structural limitation: GLIM Chennai's placement infrastructure is optimised for its core sectors. Students who enter without a clear sector thesis have more variable outcomes.</p>

<h3>Campus Life: The ECR Bubble</h3>

<p>Campus life at 4.4/5. The ECR location creates an immersive residential environment where peer relationships form deep and fast. Students describe friendships at GLIM Chennai as unusually durable — the forced proximity of campus living and the distance from the city concentrate social energy on campus. The annual cultural fest Colloquium is a highlight. The standard criticism is predictable: Chennai city is 45–60 minutes away, limiting spontaneous urban access. Whether this is a feature or a limitation depends on what you want from the MBA experience.</p>

<h3>The Student Who Thrives at GLIM Chennai</h3>

<p>The pattern across 78 reviews is clear: students who entered with a specific sector target (BFSI, analytics, or consulting), engaged proactively with the Finance or Analytics Club, invested seriously in their summer internship, and used the visiting faculty connections to build professional networks outside the placement cell — these students rate GLIM Chennai 4–5/5 and recommend it without reservation. Students who arrived without a plan, relied on institutional process alone, and defaulted to IT services outcomes are more ambivalent. Both experiences are real and predictable from day one.</p>`,
}

export default reviews
