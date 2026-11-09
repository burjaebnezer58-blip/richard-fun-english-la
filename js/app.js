/* Richard Fun English Lab AI - application logic (plain JavaScript, no libraries) */
const $ = s => document.querySelector(s);
const esc = s => String(s).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
const day = () => Math.floor((Date.now() - Date.parse(new Date().getFullYear() + '-01-01')) / 864e5);
const pick = (a, i) => a[((i % a.length) + a.length) % a.length];

/* ---------- Storage (this device only) ---------- */
function load() {
  try { return Object.assign({ role: 'student', stars: 0, students: [] }, JSON.parse(localStorage.getItem('rfel2'))); }
  catch (e) { return { role: 'student', stars: 0, students: [] }; }
}
function save() { try { localStorage.setItem('rfel2', JSON.stringify(S)); } catch (e) {} }
let S = load();

/* ---------- Helpers ---------- */
function toast(m) { const t = $('#toast'); t.textContent = m; t.style.display = 'block'; clearTimeout(t._h); t._h = setTimeout(() => t.style.display = 'none', 1800); }
function speak(text) {
  if (!('speechSynthesis' in window)) return toast('Voice is not supported in this browser');
  speechSynthesis.cancel();
  const u = new SpeechSynthesisUtterance(text); u.lang = 'en-US'; u.rate = 0.9; speechSynthesis.speak(u);
}
document.addEventListener('click', e => { const b = e.target.closest('[data-say]'); if (b) speak(b.dataset.say); });
function done() { S.stars++; save(); toast('⭐ Star earned! Well done!'); }
function setRole(r) { S.role = r; save(); location.hash = 'home'; route(); }
function toggleRole() { setRole(S.role === 'student' ? 'teacher' : 'student'); }
function classSel(id) { return `<select id="${id}">${[1,2,3,4,5,6,7,8,9,10].map(i => `<option value="${i}">Class ${i}</option>`).join('')}</select>`; }
const avgOf = s => s.scores.length ? s.scores.reduce((a, x) => a + x.avg, 0) / s.scores.length : 0;

/* ---------- Quiz engine ---------- */
const QUIZ = {};
function quiz(id, items) {
  QUIZ[id] = items;
  return items.map((it, i) => `<div class="item"><b>${i + 1}. ${esc(it.q)}</b>${it.o.map((o, j) =>
    `<label class="opt"><input type="radio" name="${id}${i}" value="${j}"> ${esc(o)}</label>`).join('')}</div>`).join('')
    + `<button class="btn" onclick="grade('${id}')">Check answers</button><p id="${id}-r"></p>`;
}
function grade(id) {
  const items = QUIZ[id]; let s = 0;
  items.forEach((x, i) => { const c = document.querySelector(`input[name="${id}${i}"]:checked`); if (c && +c.value === x.a) s++; });
  $('#' + id + '-r').textContent = `Score: ${s} / ${items.length}` + (s === items.length ? ' 🎉 Perfect!' : '');
}

/* ---------- Generated content ---------- */
const GAMES = [];
DATA.gameTypes.forEach(g => DATA.topics.forEach(t => [1, 2, 3, 4, 5].forEach(l => GAMES.push({ n: g.n, r: g.r, t, l }))));
const SENT = [];
DATA.openers.forEach(o => DATA.subjects.forEach(s => DATA.pairs.forEach(([v, ob]) => {
  const subj = o && s !== 'I' ? s.toLowerCase() : s;
  const verb = DATA.third.includes(s) ? v.replace(/^(\w+)/, '$1s') : v;
  SENT.push(o + subj + ' ' + verb + ' ' + ob + '.');
})));
let SPAGE = 0, CI = 0, RP = 0, ME = 0;

/* ---------- Navigation ---------- */
const VIEWS = {
  student: [['home', '🏠 Home'], ['daily', '🗣️ Daily Speaking'], ['games', '🎲 500 Games'], ['sentences', '💬 1,000 Sentences'], ['phonics', '🔤 Phonics A–Z'], ['grammar', '✏️ Grammar'], ['vocab', '📚 Vocabulary'], ['convo', '🤝 Conversation'], ['roleplay', '🎭 Role-Play'], ['weekly', '🏆 Weekly Challenge'], ['flash', '🃏 Flashcards']],
  teacher: [['home', '🏠 Home'], ['dash', '📊 Dashboard'], ['plan', '📝 Lesson Plans'], ['sheet', '📄 Worksheets'], ['assess', '🗓️ Monthly Assessment'], ['progress', '👩‍🏫 Progress Tracker']]
};

function route() {
  const k = location.hash.slice(1) || 'home';
  const list = VIEWS[S.role];
  const cur = list.some(x => x[0] === k) ? k : 'home';
  $('#role').innerHTML = (S.role === 'student' ? '🎒 Student mode' : '👩‍🏫 Teacher mode') + ' · <a href="#home" onclick="toggleRole()">switch</a>';
  $('#nav').innerHTML = list.map(([id, l]) => `<a href="#${id}" class="${id === cur ? 'on' : ''}">${l}</a>`).join('');
  $('#app').innerHTML = VIEW[cur]();
  after(cur);
  window.scrollTo(0, 0);
}
function after(k) {
  if (k === 'games') gl();
  if (k === 'sentences') sRender();
  if (k === 'grammar') gchg();
}
window.addEventListener('hashchange', route);

/* ---------- Views ---------- */
const VIEW = {};

VIEW.home = () => {
  return `
    <div class="card" style="text-align:center; padding:35px 20px;">
      <h1>🌟 Richard Fun English Lab AI</h1>
      <h3>Learn • Speak • Sing • Play</h3>
      <p>Welcome! Please choose how you want to use the app.</p>

      <button class="btn" style="display:block; width:100%; margin:20px 0; padding:22px; font-size:20px;"
        onclick="setRole('student')">
        🎒 I AM A STUDENT
      </button>

      <button class="btn alt" style="display:block; width:100%; margin:20px 0; padding:22px; font-size:20px;"
        onclick="setRole('teacher')">
        👩‍🏫 I AM A TEACHER
      </button>
    </div>
  `;
};
VIEW.daily = () => {
  const d = pick(DATA.daily, day());
  return `<div class="card"><h2>🗣️ Today's Speaking Activity</h2>
    <div class="item"><b>${esc(d.t)}</b><p>${esc(d.d)}</p></div>
    <button class="btn" onclick="done()">✅ Mark done (+⭐)</button>
    <h3>All activities</h3>${DATA.daily.map(x => `<div class="item"><b>${esc(x.t)}</b> – ${esc(x.d)}</div>`).join('')}</div>`;
};

VIEW.games = () => `<div class="card"><h2>🎲 500 Classroom Games</h2>
  <div class="row"><div><label>Topic</label><select id="gt" onchange="gl()"><option value="all">All topics</option>${DATA.topics.map(t => `<option>${t}</option>`).join('')}</select></div>
  <div><label>Level</label><select id="gl2" onchange="gl()"><option value="all">All levels</option>${[1,2,3,4,5].map(l => `<option value="${l}">Level ${l}</option>`).join('')}</select></div></div>
  <div id="glist"></div></div>`;
function gl() {
  const box = $('#glist'); if (!box) return;
  const t = $('#gt').value, l = $('#gl2').value;
  const L = GAMES.filter(g => (t === 'all' || g.t === t) && (l === 'all' || g.l == l));
  box.innerHTML = `<p>${L.length} games shown</p>` + L.map(g => `<div class="item"><b>${esc(g.n)}</b> · ${esc(g.t)} · Level ${g.l}<br>${esc(g.r)}</div>`).join('');
}

VIEW.sentences = () => `<div class="card"><h2>💬 1,000 Daily-Use Sentences</h2>
  <p>Read each sentence aloud. Tap 🔊 to hear it.</p><div id="sl"></div>
  <button class="btn alt" onclick="sPage(-1)">◀ Previous</button>
  <button class="btn alt" onclick="sPage(1)">Next ▶</button>
  <button class="btn" data-say="${esc(pick(SENT, Math.floor(Math.random() * SENT.length)))}">🎲 Random sentence</button></div>`;
function sPage(d) { SPAGE = Math.max(0, Math.min(SENT.length - 20, SPAGE + d * 20)); sRender(); }
function sRender() {
  const el = $('#sl'); if (!el) return;
  el.innerHTML = SENT.slice(SPAGE, SPAGE + 20).map((s, i) =>
    `<div class="item">${SPAGE + i + 1}. ${esc(s)} <button class="btn alt" style="margin:0 0 0 6px;padding:4px 10px" data-say="${esc(s)}">🔊</button></div>`).join('');
}

VIEW.phonics = () => `<div class="card"><h2>🔤 Phonics A–Z</h2>
  <div class="grid">${DATA.phonics.map((p, i) => `<button class="btn alt" style="margin:0" onclick="showL(${i})">${p[0]} ${p[0].toLowerCase()}</button>`).join('')}</div>
  <div id="ld" class="out">Tap a letter to see its word and hear its sound.</div></div>`;
function showL(i) {
  const [L, w, s] = DATA.phonics[i];
  $('#ld').textContent = `${L} / ${L.toLowerCase()} says "${s}" as in "${w}"`;
  speak(`${L.toLowerCase()}. ${s}, as in ${w}`);
}

VIEW.grammar = () => `<div class="card"><h2>✏️ Grammar Activities</h2>
  <label>Topic</label><select id="gg" onchange="gchg()">${DATA.grammar.map((g, i) => `<option value="${i}">${esc(g.title)}</option>`).join('')}</select>
  <div id="gb"></div></div>`;
function gchg() {
  const box = $('#gb'); if (!box) return;
  const g = DATA.grammar[+$('#gg').value];
  box.innerHTML = `<div class="out">${esc(g.rule)}</div>` + quiz('gq', g.qs);
}

VIEW.vocab = () => `<div class="card"><h2>📚 Vocabulary Builder</h2><p>Tap a card to see its meaning. Tap 🔊 to hear the word.</p>
  <div class="grid">${DATA.vocab.map(v => `<div class="vc" onclick="this.classList.toggle('flip')">
    <div class="front"><b style="font-size:20px">${esc(v.w)}</b><br><button class="btn alt" style="margin:6px 0 0" data-say="${esc(v.w)}" onclick="event.stopPropagation()">🔊</button></div>
    <div class="back">${esc(v.m)}<br><i>${esc(v.e)}</i></div></div>`).join('')}</div></div>`;

VIEW.convo = () => {
  const c = DATA.convo[CI % DATA.convo.length];
  return `<div class="card"><h2>🤝 Conversation Practice</h2>
    <div class="item"><b>Partner asks:</b> ${esc(c.q)}</div>
    <div class="out">Possible reply: "${esc(c.a)}"</div>
    <button class="btn" data-say="${esc(c.q)}">🔊 Hear question</button>
    <button class="btn alt" onclick="CI++;route()">Next conversation ▶</button></div>`;
};

VIEW.roleplay = () => {
  const r = DATA.roles[RP % DATA.roles.length];
  const me = ME % r.r.length;
  return `<div class="card"><h2>🎭 Role-Play</h2>
    <div class="row"><div><label>Scenario</label><select onchange="RP=+this.value;ME=0;route()">${DATA.roles.map((x, i) => `<option value="${i}" ${i === RP ? 'selected' : ''}>${esc(x.t)}</option>`).join('')}</select></div>
    <div><label>I play</label><select onchange="ME=+this.value;route()">${r.r.map((x, i) => `<option value="${i}" ${i === me ? 'selected' : ''}>${esc(x)}</option>`).join('')}</select></div></div>
    ${r.l.map(([who, line]) => `<div class="item ${who === r.r[me] ? 'me' : ''}"><b>${esc(who)}:</b> ${esc(line)}</div>`).join('')}
    <button class="btn" data-say="${esc(r.l.map(x => x[1]).join(' '))}">🔊 Read the script</button></div>`;
};

VIEW.weekly = () => {
  const w = pick(DATA.weekly, Math.floor(day() / 7));
  return `<div class="card"><h2>🏆 Weekly Speaking Challenge</h2>
    <div class="item"><b>${esc(w.t)}</b><p>${esc(w.k)}</p></div>
    <button class="btn" onclick="done()">🏅 Complete challenge (+⭐)</button></div>`;
};

VIEW.flash = () => `<div class="card noprint"><h2>🃏 Printable Flashcards</h2>
  <p>Press Print, then choose paper or "Save as PDF".</p><button class="btn" onclick="print()">🖨️ Print flashcards</button></div>
  <div class="grid">${DATA.vocab.map(v => `<div class="vc" style="cursor:default"><b style="font-size:20px">${esc(v.w)}</b><br>${esc(v.m)}</div>`).join('')}</div>`;

/* Teacher views */
VIEW.dash = () => {
  const st = S.students, all = st.flatMap(s => s.scores);
  const overall = all.length ? (all.reduce((a, x) => a + x.avg, 0) / all.length).toFixed(1) : '–';
  const weak = st.filter(s => s.scores.length && avgOf(s) < 3);
  return `<div class="card"><h2>📊 Teacher Dashboard</h2>
    <div class="row"><div class="item"><b>${st.length}</b> students</div><div class="item"><b>${all.length}</b> assessments</div>
    <div class="item"><b>${overall}</b> / 5 overall average</div><div class="item"><b>${S.stars}</b> student stars (this device)</div></div>
    <h3>Students needing support (average below 3)</h3>
    ${weak.length ? weak.map(s => `<div class="item">${esc(s.name)} · ${avgOf(s).toFixed(1)} / 5</div>`).join('') : '<p>None yet. Great work!</p>'}
    <h3>Quick actions</h3><a class="btn" href="#plan">Plan a lesson</a><a class="btn alt" href="#assess">Record assessment</a></div>`;
};

VIEW.plan = () => `<div class="card"><h2>📝 Lesson Plan Generator</h2>
  <p>Built from lesson templates. No AI API or paid credits needed.</p>
  <div class="row"><div><label>Class</label>${classSel('pc')}</div>
  <div><label>Minutes</label><select id="pm"><option>30</option><option selected>40</option><option>45</option><option>60</option></select></div></div>
  <label>Topic</label><input id="pt" value="Simple Past Tense">
  <label>Goal</label><textarea id="pg" rows="2">Students use past tense to talk about yesterday.</textarea>
  <button class="btn" onclick="plan()">Generate plan</button><div id="po"></div></div>`;
function plan() {
  const c = $('#pc').value, m = +$('#pm').value, t = $('#pt').value || 'the topic', g = $('#pg').value;
  const parts = [
    ['Warm-up', 0.1, 'Greet the class and revise the last lesson with a quick question game.'],
    ['Presentation', 0.25, `Introduce ${t} with a clear model. Write three example sentences on the board.`],
    ['Guided practice', 0.3, `Pairs complete five sentences on ${t}. The teacher checks and corrects gently.`],
    ['Production', 0.25, `Students use ${t} to talk about their own lives in a short role-play.`],
    ['Wrap-up', 0.1, 'Exit ticket: three questions. Preview the next lesson.']];
  let txt = `LESSON PLAN – Class ${c} | ${t} | ${m} min\nGoal: ${g}\nMaterials: board, markers, picture cards, exit-ticket slips\n\n`;
  let start = 0;
  parts.forEach(([n, f, d]) => { const mins = Math.round(m * f); txt += `${n} (${start}–${start + mins} min)\n${d}\n\n`; start += mins; });
  txt += `Assessment: observe participation and check the exit ticket.\nHomework: write five sentences about ${t}.`;
  $('#po').innerHTML = `<div class="out">${esc(txt)}</div><button class="btn alt" data-say="${esc('Lesson plan for ' + t)}">🔊 Hear title</button>`;
}

VIEW.sheet = () => `<div class="card"><h2>📄 Worksheets & Answer Keys</h2>
  <div class="row"><div><label>Class</label>${classSel('wc')}</div>
  <div><label>Grammar topic</label><select id="wt">${DATA.grammar.map((g, i) => `<option value="${i}">${esc(g.title)}</option>`).join('')}</select></div></div>
  <label>Number of questions</label><input id="wn" type="number" value="3" min="1" max="10">
  <button class="btn" onclick="sheet()">Make worksheet</button><div id="wo"></div></div>`;
function sheet() {
  const g = DATA.grammar[+$('#wt').value];
  const n = Math.min(+$('#wn').value || 3, g.qs.length);
  const qs = [...g.qs].sort(() => Math.random() - 0.5).slice(0, n);
  $('#wo').innerHTML = `<div class="out"><b>${esc(g.title)} – Class ${$('#wc').value}</b>
Name: ________   Date: ________

${qs.map((q, i) => `${i + 1}. ${esc(q.q)}\n   ${q.o.map((o, j) => `(${'abc'[j]}) ${esc(o)}`).join('   ')}`).join('\n\n')}</div>
  <details class="card"><summary><b>Answer key</b></summary>${qs.map((q, i) => `${i + 1}. ${esc(q.o[q.a])}`).join('<br>')}</details>
  <button class="btn alt" onclick="print()">🖨️ Print</button>`;
}

VIEW.assess = () => {
  if (!S.students.length) return `<div class="card"><h2>🗓️ Monthly Assessment</h2><p>Add students in the Progress Tracker first.</p></div>`;
  return `<div class="card"><h2>🗓️ Monthly Assessment</h2>
    <label>Student</label><select id="as">${S.students.map((s, i) => `<option value="${i}">${esc(s.name)} (Class ${s.cls})</option>`).join('')}</select>
    <label>Month</label><input type="month" id="am" value="${new Date().toISOString().slice(0, 7)}">
    ${['Listening', 'Speaking', 'Reading', 'Writing'].map((k, i) => `<label>${k}: <span id="v${i}">3</span> / 5</label>
    <input type="range" min="1" max="5" value="3" oninput="document.getElementById('v${i}').textContent=this.value">`).join('')}
    <button class="btn" onclick="saveAs()">Save assessment</button></div>`;
};
function saveAs() {
  const s = S.students[+$('#as').value];
  const v = [...document.querySelectorAll('input[type=range]')].map(r => +r.value);
  s.scores.push({ m: $('#am').value, L: v[0], S: v[1], R: v[2], W: v[3], avg: (v[0] + v[1] + v[2] + v[3]) / 4 });
  save(); toast(`Saved for ${s.name}`); route();
}

VIEW.progress = () => `<div class="card"><h2>👩‍🏫 Student Progress Tracker</h2>
  <div class="row"><div><label>Student name</label><input id="sn"></div><div><label>Class</label>${classSel('scl')}</div></div>
  <button class="btn" onclick="addStu()">➕ Add student</button>
  <div style="overflow:auto;margin-top:10px"><table><tr><th>Name</th><th>Class</th><th>Tests</th><th>Average</th><th>Last</th><th></th></tr>
  ${S.students.map((s, i) => `<tr><td>${esc(s.name)}</td><td>${esc(s.cls)}</td><td>${s.scores.length}</td><td>${avgOf(s).toFixed(1)} / 5</td>
  <td>${s.scores.length ? esc(s.scores[s.scores.length - 1].m) : '–'}</td><td><button class="btn alt" style="margin:0" onclick="delStu(${i})">Delete</button></td></tr>`).join('')}
  </table></div></div>`;
function addStu() {
  const n = $('#sn').value.trim();
  if (!n) return toast('Please enter a name');
  S.students.push({ name: n, cls: $('#scl').value, scores: [] }); save(); route();
}
function delStu(i) { if (confirm('Delete this student and all their records?')) { S.students.splice(i, 1); save(); route(); } }

/* ---------- Start ---------- */
route();
