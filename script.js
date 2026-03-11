/* ── DATA ── */
const priorityData = {
  high: [
    { name: "Tautology, Contradiction & Contingency", ch: "1", type: "Definition" },
    { name: "Logical Equivalences & De Morgan's", ch: "1", type: "Proof" },
    { name: "Conditional Statements (Converse etc.)", ch: "1", type: "Definition" },
    { name: "Truth Table Construction", ch: "1", type: "Calculation" },
    { name: "Functions: Injective / Surjective / Bijective", ch: "2", type: "Definition" },
    { name: "Sequences & Double Summations", ch: "2", type: "Calculation" },
    { name: "Power Sets & Cartesian Products", ch: "2", type: "Problem" },
  ],
  medium: [
    { name: "Predicates & Quantifiers", ch: "1", type: "Mixed" },
    { name: "Set Operations & Bit Strings", ch: "2", type: "Problem" },
    { name: "Floor & Ceiling Functions", ch: "2", type: "Problem" },
    { name: "Sum & Product Rules", ch: "3", type: "Problem" },
    { name: "Inclusion-Exclusion Principle", ch: "3", type: "Problem" },
    { name: "Pigeonhole Principle", ch: "3", type: "Context" },
  ],
  low: [
    { name: "Precedence of Logical Operators", ch: "1", type: "Definition" },
    { name: "Uniqueness Quantifiers", ch: "1", type: "Definition" },
  ]
};

const roadmapData = [
  {
    chapter: "Chapter 1 — Logic & Proofs",
    topics: [
      { name: "Proposition, Tautology, Contradiction", slide: "pp. 1–10", priority: "high", type: "Definition", desc: "Core vocabulary. Definitions directly from slides score easy marks." },
      { name: "Truth Tables — All Connectives", slide: "pp. 21–24", priority: "high", type: "Calculation", desc: "Evaluating compound propositions including $p \\rightarrow q$ and $(p \\rightarrow q) \\vee (\\neg p \\rightarrow q)$." },
      { name: "De Morgan's Laws (Truth Table Proof)", slide: "pp. 21–24", priority: "high", type: "Proof", desc: "Prove $\\neg(p \\vee q) \\equiv \\neg p \\wedge \\neg q$ using a complete truth table." },
      { name: "Converse, Inverse, Contrapositive", slide: "pp. 15–18", priority: "high", type: "Definition", desc: "Given $p \\rightarrow q$, derive all three forms. Frequently tested." },
      { name: "Predicates & Quantifiers", slide: "pp. 27–40", priority: "medium", type: "Mixed", desc: "Translate between English and $\\forall x$ / $\\exists x$ notation." },
    ]
  },
  {
    chapter: "Chapter 2 — Basic Structures",
    topics: [
      { name: "Power Sets & Cartesian Products", slide: "pp. 13–16", priority: "high", type: "Problem", desc: "Compute $A \\times B \\times C$ and prove $A \\times B \\neq B \\times A$ with a counterexample." },
      { name: "Injection, Surjection, Bijection", slide: "pp. 36–38", priority: "high", type: "Diagrams", desc: "Identify function types from mapping diagrams or algebraic definitions." },
      { name: "AP & GP — Find the Formula", slide: "pp. 42–44", priority: "high", type: "Calculation", desc: "Given a sequence, identify type and derive the closed-form $a_n$ formula." },
      { name: "Double Summations + C Loop", slide: "pp. 46–47", priority: "high", type: "Calculation", desc: "Evaluate $\\sum_{i=1}^{m}\\sum_{j=1}^{n} i$ step by step. Translate to nested for loops." },
      { name: "Bit Representation of Sets", slide: "pp. 27–28", priority: "medium", type: "Problem", desc: "Perform set operations using bit string notation." },
      { name: "Floor & Ceiling Functions", slide: "pp. 30–32", priority: "medium", type: "Problem", desc: "Evaluate $\\lfloor x \\rfloor$ and $\\lceil x \\rceil$ for given values." },
    ]
  },
  {
    chapter: "Chapter 3 — Counting Theory",
    topics: [
      { name: "Sum Rule & Product Rule", slide: "pp. 1–5", priority: "high", type: "Problem", desc: "Apply to bit strings, password counting, and seating arrangement problems." },
      { name: "Permutation Proof P(n,r) = C(n,r)·P(r,r)", slide: "Textbook", priority: "high", type: "Proof", desc: "Algebraic derivation. Has appeared in past papers but missing from some slides." },
      { name: "Inclusion-Exclusion Principle", slide: "p. 19", priority: "medium", type: "Problem", desc: "$|A \\cup B| = |A| + |B| - |A \\cap B|$. Applied to bit string and element problems." },
      { name: "Pigeonhole Principle", slide: "Textbook", priority: "medium", type: "Context", desc: "If $n+1$ objects into $n$ boxes, at least one box has 2+ objects." },
    ]
  }
];

/* ── NAV / SECTION SWITCHING ── */
const topbarLabels = {
  'sec-patterns': 'Pattern Analysis',
  'sec-slides':   'Slide Map',
  'sec-priority': 'Priority Matrix',
  'sec-roadmap':  'Study Roadmap',
  'sec-strategy': 'Exam Strategy'
};

function switchSection(id, el) {
  document.querySelectorAll('.section').forEach(s => s.classList.remove('active'));
  document.getElementById(id).classList.add('active');
  document.querySelectorAll('.nav-item').forEach(n => n.classList.remove('active'));
  if (el) el.classList.add('active');
  document.getElementById('main-content').scrollTop = 0;
  document.getElementById('topbar-current').textContent = topbarLabels[id] || '';
  if (window.MathJax) MathJax.typesetPromise();
  // close mobile menu
  document.getElementById('sidebar').classList.remove('open');
  document.getElementById('mobileOverlay').classList.remove('open');
}

function toggleMobileMenu() {
  document.getElementById('sidebar').classList.toggle('open');
  document.getElementById('mobileOverlay').classList.toggle('open');
}

/* ── CHART ── */
function renderChart() {
  const ctx = document.getElementById('donutChart').getContext('2d');

  // Plugin draws label directly onto canvas — always perfectly centered in the hole
  const centerLabel = {
    id: 'centerLabel',
    afterDraw(chart) {
      const { ctx: c, chartArea } = chart;
      if (!chartArea) return;
      const cx = (chartArea.left + chartArea.right) / 2;
      const cy = (chartArea.top + chartArea.bottom) / 2;
      c.save();
      c.textAlign = 'center';
      c.textBaseline = 'middle';
      c.font = "900 26px 'Playfair Display', serif";
      c.fillStyle = '#1e1b4b';
      c.fillText('4', cx, cy - 8);
      c.font = "500 9px 'JetBrains Mono', monospace";
      c.fillStyle = '#9ca3af';
      c.fillText('CATEGORIES', cx, cy + 11);
      c.restore();
    }
  };

  new Chart(ctx, {
    type: 'doughnut',
    plugins: [centerLabel],
    data: {
      labels: ['Problem Solving', 'Theory / Definitions', 'Proofs', 'Logic Translation'],
      datasets: [{
        data: [45, 20, 20, 15],
        backgroundColor: ['#6366f1','#059669','#d97706','#f43f5e'],
        borderWidth: 0,
        hoverOffset: 8,
        borderRadius: 5,
        spacing: 3
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: true,
      plugins: {
        legend: {
          position: 'bottom',
          labels: {
            usePointStyle: true,
            pointStyle: 'circle',
            padding: 16,
            font: { size: 11, weight: '600', family: 'JetBrains Mono' },
            color: '#6b7280'
          }
        },
        tooltip: {
          backgroundColor: 'rgba(255,255,255,0.96)',
          borderColor: 'rgba(99,102,241,0.18)',
          borderWidth: 1,
          padding: 10,
          cornerRadius: 8,
          titleColor: '#1e1b4b',
          bodyColor: '#6b7280',
          callbacks: { label: c => `  ${c.parsed}% of exam weight` }
        }
      },
      cutout: '68%'
    }
  });
}

/* ── PRIORITY MATRIX ── */
function renderPriority() {
  const grid = document.getElementById('priority-grid');
  const cols = [
    { key: 'high',   label: '🔴 High Focus',    sub: 'Guaranteed Presence', headBg: 'rgba(255,107,107,0.08)', headBorder: 'rgba(255,107,107,0.2)', headColor: '#ff8f8f', topBorder: '#ff6b6b' },
    { key: 'medium', label: '🟡 Medium Focus',   sub: 'High Probability',    headBg: 'rgba(245,200,66,0.07)', headBorder: 'rgba(245,200,66,0.18)', headColor: '#f5c842', topBorder: '#f5c842' },
    { key: 'low',    label: '🟢 Core Context',   sub: 'Fundamental',         headBg: 'rgba(61,255,160,0.06)', headBorder: 'rgba(61,255,160,0.15)', headColor: '#3dffa0', topBorder: '#3dffa0' }
  ];

  cols.forEach(col => {
    const items = priorityData[col.key];
    const html = `
      <div style="background:var(--glass);backdrop-filter:blur(14px);-webkit-backdrop-filter:blur(14px);border:1px solid var(--glass-border);border-radius:16px;overflow:hidden;box-shadow:var(--glass-shadow);border-top:3px solid ${col.topBorder};">
        <div style="padding:18px 20px;border-bottom:1px solid rgba(255,255,255,0.6);background:${col.headBg};">
          <div style="font-size:14px;font-weight:800;color:var(--text);">${col.label}</div>
          <div style="font-family:'JetBrains Mono',monospace;font-size:9px;letter-spacing:0.15em;text-transform:uppercase;color:${col.headColor};margin-top:4px;">${items.length} topics · ${col.sub}</div>
        </div>
        <div>
          ${items.map(item => `
            <div class="priority-item">
              <div class="priority-name">${item.name}</div>
              <div style="display:flex;gap:6px;flex-shrink:0;align-items:center;">
                <span class="ch-pill ch${item.ch}">Ch ${item.ch}</span>
                <span class="type-badge">${item.type}</span>
              </div>
            </div>
          `).join('')}
        </div>
      </div>
    `;
    grid.innerHTML += html;
  });
}

/* ── ROADMAP ── */
function renderRoadmap() {
  const container = document.getElementById('roadmap-container');
  roadmapData.forEach((chapter, i) => {
    const rows = chapter.topics.map(t => {
      const prioClass = `prio-${t.priority}`;
      const prioLabel = t.priority.charAt(0).toUpperCase() + t.priority.slice(1);
      return `
        <tr>
          <td>
            <div class="topic-name">${t.name}</div>
            <div class="topic-desc">${t.desc}</div>
          </td>
          <td><span class="slide-ref">${t.slide}</span></td>
          <td>
            <div class="prio-bar ${prioClass}">
              <span class="prio-dot"></span>
              <span class="prio-text">${prioLabel}</span>
            </div>
          </td>
          <td><span class="topic-tag tag-info" style="font-size:10px;">${t.type}</span></td>
        </tr>
      `;
    }).join('');

    container.innerHTML += `
      <div class="accordion" id="acc-${i}">
        <button class="accordion-trigger" onclick="toggleAcc(${i})">
          <span class="acc-num">0${i+1}</span>
          <span class="acc-title">${chapter.chapter}</span>
          <div class="acc-meta">
            <span class="acc-count">${chapter.topics.length} topics</span>
            <span class="acc-arrow" id="arr-${i}">▾</span>
          </div>
        </button>
        <div class="accordion-body" id="body-${i}">
          <table class="acc-table">
            <thead><tr>
              <th style="width:45%">Topic</th>
              <th>Slides</th>
              <th>Priority</th>
              <th>Type</th>
            </tr></thead>
            <tbody>${rows}</tbody>
          </table>
        </div>
      </div>
    `;
  });

  // open first one
  setTimeout(() => toggleAcc(0), 80);
}

function toggleAcc(i) {
  const acc = document.getElementById(`acc-${i}`);
  const body = document.getElementById(`body-${i}`);
  const arr = document.getElementById(`arr-${i}`);
  const isOpen = acc.classList.contains('open');
  acc.classList.toggle('open', !isOpen);
  if (window.MathJax && !isOpen) MathJax.typesetPromise();
}

/* ── COUNTDOWN ── */
function updateCountdown() {
  const examDate = new Date('2026-04-01T09:00:00');
  const now = new Date();
  const diff = examDate - now;
  if (diff <= 0) { document.getElementById('exam-countdown-val').textContent = 'Today!'; return; }
  const days = Math.floor(diff / 86400000);
  const hrs = Math.floor((diff % 86400000) / 3600000);
  document.getElementById('exam-countdown-val').textContent = `${days}d ${hrs}h · Apr 1`;
}

/* ── INIT ── */
window.onload = () => {
  renderChart();
  renderPriority();
  renderRoadmap();
  updateCountdown();
  setInterval(updateCountdown, 60000);
  if (window.MathJax) MathJax.typesetPromise();
};