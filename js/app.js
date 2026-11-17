/* =========================================================
   FLUENT 90 — App (mobile-first)
   Funciona de duas formas:
   - local (index.html / iniciar.bat): progresso salvo no navegador
   - hospedado no claude.ai (fluent90.html): microfone via ditado do
     Claude e progresso sincronizado entre celular e computador
   ========================================================= */
(() => {
  'use strict';

  /* ---------------- helpers ---------------- */
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => [...r.querySelectorAll(s)];
  const esc = s => String(s).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  const h = html => { const t = document.createElement('template'); t.innerHTML = html.trim(); return t.content.firstElementChild; };
  const z = n => String(n).padStart(2, '0');
  const todayKey = (d = new Date()) => `${d.getFullYear()}-${z(d.getMonth() + 1)}-${z(d.getDate())}`;
  const addDays = (key, n) => { const d = new Date(key + 'T12:00:00'); d.setDate(d.getDate() + n); return todayKey(d); };
  const dayDiff = (a, b) => Math.round((new Date(b + 'T12:00:00') - new Date(a + 'T12:00:00')) / 864e5);
  const fmt = s => `${Math.floor(s / 60)}:${z(Math.floor(s % 60))}`;
  const shuffle = a => { const b = [...a]; for (let i = b.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [b[i], b[j]] = [b[j], b[i]]; } return b; };
  const seeded = n => (+todayKey().replace(/-/g, '')) % n;
  const IN_FRAME = !!(window.claude && typeof window.claude.use === 'function');
  const useCap = async name => { if (!IN_FRAME) return null; try { return await window.claude.use(name); } catch (e) { return null; } };

  let cleanups = [];
  const onCleanup = fn => cleanups.push(fn);

  function toast(msg) {
    const t = $('#toast'); if (!t) return;
    t.textContent = msg; t.classList.add('show');
    clearTimeout(toast._t); toast._t = setTimeout(() => t.classList.remove('show'), 2800);
  }

  async function copyText(text, fallbackEl) {
    try { await navigator.clipboard.writeText(text); toast('Copiado!'); return; } catch (e) { }
    if (fallbackEl) { fallbackEl.hidden = false; fallbackEl.focus(); fallbackEl.select(); toast('Selecionei o texto: copie manualmente.'); }
    else toast('Não consegui copiar automaticamente.');
  }

  /* ---------------- ícones ---------------- */
  const ICONS = {
    home: '<path d="M3 11l9-7 9 7v9a1 1 0 0 1-1 1h-5v-6H9v6H4a1 1 0 0 1-1-1z"/>',
    path: '<circle cx="6" cy="6" r="2"/><circle cx="18" cy="18" r="2"/><path d="M8 6h7a3 3 0 0 1 0 6H9a3 3 0 0 0 0 6h7"/>',
    target: '<circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="5"/><circle cx="12" cy="12" r="1"/>',
    mic: '<rect x="9" y="3" width="6" height="11" rx="3"/><path d="M5 11a7 7 0 0 0 14 0M12 18v3"/>',
    chart: '<path d="M5 20V11M12 20V5M19 20v-8"/>',
    level: '<path d="M4 20h4v-6H4zM10 20h4V9h-4zM16 20h4V4h-4z"/>',
    cards: '<rect x="3" y="6" width="14" height="14" rx="2"/><path d="M7 3h12a2 2 0 0 1 2 2v12"/>',
    wave: '<path d="M3 12h2M7 8v8M11 5v14M15 8v8M19 11v2"/>',
    ear: '<path d="M7 9a5 5 0 0 1 10 0c0 3-3 4-3 7a3 3 0 0 1-6 0"/><path d="M10 9a2 2 0 0 1 4 0"/>',
    pen: '<path d="M4 20l4-1 11-11-3-3L5 16z"/><path d="M14 6l3 3"/>',
    note: '<rect x="5" y="3" width="14" height="18" rx="2"/><path d="M9 8h6M9 12h6M9 16h3"/>',
    x: '<circle cx="12" cy="12" r="9"/><path d="M9 9l6 6M15 9l-6 6"/>',
    book: '<path d="M4 5a2 2 0 0 1 2-2h13v16H6a2 2 0 0 0-2 2z"/><path d="M4 19V5"/>'
  };
  const icon = (n, cls = 'i') => `<svg class="${cls}" viewBox="0 0 24 24" aria-hidden="true">${ICONS[n] || ''}</svg>`;

  /* ---------------- store ---------------- */
  const KEY = 'fluent90.v1';
  const defaults = () => ({
    created: todayKey(), level: null, placement: null, days: {}, units: {}, exScores: {},
    cards: {}, daily: {}, journal: [], interview: {}, resetAt: 0,
    settings: { rate: 0.95, pitch: 1.06, voice: '', dir: 'pt-en', newPerDay: 15, theme: 'auto' }
  });
  let S;
  function load() {
    try { S = JSON.parse(localStorage.getItem(KEY)); } catch (e) { S = null; }
    const d = defaults();
    if (!S || typeof S !== 'object') S = d;
    else { for (const k in d) if (!(k in S)) S[k] = d[k]; S.settings = { ...d.settings, ...S.settings }; }
  }
  function saveLocal() { try { localStorage.setItem(KEY, JSON.stringify(S)); } catch (e) { } }
  function save() { saveLocal(); Sync.schedule(); }
  function day(k = todayKey()) { return S.days[k] || (S.days[k] = { xp: 0, cards: 0, newSeen: 0, shadow: 0, dict: 0 }); }
  function addXP(n) { if (!n) return; day().xp += n; save(); renderFoot(); }
  function dailyDone(id) { return !!(S.daily[todayKey()] || {})[id]; }
  function markDaily(id, val = true) {
    const k = todayKey(); S.daily[k] = S.daily[k] || {};
    if (!!S.daily[k][id] === val) return;
    S.daily[k][id] = val; save();
    if (val) toast('✓ Tarefa do dia concluída!');
  }
  function streak() {
    let k = todayKey(), n = 0;
    if (!(S.days[k] && S.days[k].xp > 0)) k = addDays(k, -1);
    while (S.days[k] && S.days[k].xp > 0) { n++; k = addDays(k, -1); }
    return n;
  }
  const totalXP = () => Object.values(S.days).reduce((a, d) => a + (d.xp || 0), 0);
  const unitsDone = () => UNITS.filter(u => S.units[u.id] && S.units[u.id].done).length;
  const currentUnit = () => { const u = UNITS.find(u => !(S.units[u.id] && S.units[u.id].done)); return u ? u.id : UNITS.length; };
  const dayNumber = () => dayDiff(S.created, todayKey()) + 1;

  function applyTheme() {
    const t = S.settings.theme;
    if (t === 'auto') document.documentElement.removeAttribute('data-theme');
    else document.documentElement.setAttribute('data-theme', t);
  }

  /* ---------------- sincronização (claude.ai) ---------------- */
  // Junta o progresso de dois aparelhos sem perder nada.
  function mergeState(a, b) {
    if ((b.resetAt || 0) > (a.resetAt || 0)) return { ...JSON.parse(JSON.stringify(b)), settings: a.settings };
    if ((a.resetAt || 0) > (b.resetAt || 0)) return a;
    const m = JSON.parse(JSON.stringify(a));
    if (b.created && b.created < m.created) m.created = b.created;
    for (const [k, d] of Object.entries(b.days || {})) {
      if (!m.days[k]) m.days[k] = d; else for (const f in d) m.days[k][f] = Math.max(m.days[k][f] || 0, d[f] || 0);
    }
    for (const [k, u] of Object.entries(b.units || {})) if (!m.units[k]) m.units[k] = u;
    for (const [k, v] of Object.entries(b.exScores || {})) m.exScores[k] = Math.max(m.exScores[k] || 0, v);
    for (const [k, c] of Object.entries(b.cards || {})) { const x = m.cards[k]; if (!x || (c.at || 0) > (x.at || 0)) m.cards[k] = c; }
    for (const [k, d] of Object.entries(b.daily || {})) { m.daily[k] = m.daily[k] || {}; for (const t in d) if (d[t]) m.daily[k][t] = true; }
    for (const [k, v] of Object.entries(b.interview || {})) { const x = m.interview[k]; if (!x || (v.times || 0) > (x.times || 0)) m.interview[k] = v; }
    if (b.placement && (!m.placement || (b.placement.at || 0) > (m.placement.at || 0))) { m.placement = b.placement; m.level = b.level; }
    const seen = new Set(m.journal.map(j => j.at + '|' + j.text.length));
    (b.journal || []).forEach(j => { if (!seen.has(j.at + '|' + j.text.length)) m.journal.push(j); });
    m.journal.sort((x, y) => (y.at || 0) - (x.at || 0)); m.journal = m.journal.slice(0, 60);
    return m;
  }
  const shareable = st => { const c = { ...st }; delete c.settings; return c; };

  const Sync = {
    status: IN_FRAME ? 'connecting' : 'local', ref: null, timer: null, writing: false, again: false, last: '',
    async init() {
      if (!IN_FRAME) return;
      const [db, user] = await Promise.all([useCap('db'), useCap('user')]);
      if (!db || !user) return this.set('local');
      let id = null; try { id = await user.id(); } catch (e) { }
      if (!id) return this.set('local');
      try { this.ref = db.doc('data/users/' + id + '/progress'); } catch (e) { return this.set('local'); }
      await this.pull();
      document.addEventListener('visibilitychange', () => {
        if (document.visibilityState === 'visible') this.pull();
        else if (this.timer) { clearTimeout(this.timer); this.push(); }
      });
    },
    set(s) { this.status = s; renderSyncBadge(); },
    async pull() {
      if (!this.ref) return;
      try {
        const snap = await Promise.race([this.ref.get(), new Promise((_, rej) => setTimeout(() => rej({ code: 'timeout' }), 10000))]);
        let remote = null;
        if (snap.exists) { try { remote = JSON.parse(snap.data().json); } catch (e) { } }
        const before = JSON.stringify(S);
        if (remote) S = mergeState(S, remote);
        if (JSON.stringify(S) !== before) {
          saveLocal(); applyTheme();
          if (['inicio', 'progresso', 'trilha', 'treinar'].includes(route)) render(); else renderFoot();
        }
        this.last = remote ? JSON.stringify(shareable(remote)) : '';
        this.set('synced');
        if (JSON.stringify(shareable(S)) !== this.last) this.schedule(0);
      } catch (e) { this.set(e && e.code === 'revoked' ? 'local' : 'offline'); }
    },
    schedule(delay = 1500) {
      if (!this.ref) return;
      clearTimeout(this.timer); this.timer = setTimeout(() => { this.timer = null; this.push(); }, delay);
    },
    async push() {
      if (!this.ref) return;
      if (this.writing) { this.again = true; return; }
      const json = JSON.stringify(shareable(S));
      if (json === this.last) return;
      this.writing = true; this.set('saving');
      try { await this.ref.set({ json, updatedAt: Date.now() }); this.last = json; this.set('synced'); }
      catch (e) {
        const code = e && e.code;
        this.set(code === 'revoked' || code === 'not_granted' ? 'local' : 'offline');
        if (code === 'unavailable' || code === 'resource_exhausted') setTimeout(() => this.schedule(0), 4000 + Math.random() * 3000);
      }
      this.writing = false;
      if (this.again) { this.again = false; this.schedule(0); }
    }
  };
  const SYNC_LABEL = { connecting: ['Conectando…', ''], synced: ['☁ Sincronizado', 'ok'], saving: ['☁ Salvando…', 'ok'], offline: ['⚠ Sem conexão', 'warn'], local: ['Salvo neste aparelho', ''] };
  function renderSyncBadge() {
    const [txt, cls] = SYNC_LABEL[Sync.status] || SYNC_LABEL.local;
    $$('.sync').forEach(el => { el.textContent = txt; el.className = 'sync ' + cls; });
  }

  /* ---------------- voz do professor (TTS) ---------------- */
  const TTS = {
    voices: [], ok: 'speechSynthesis' in window, cloud: null,
    init() {
      if (this.ok) {
        const load = () => { this.voices = speechSynthesis.getVoices().filter(v => /^en[-_]/i.test(v.lang)); };
        load();
        speechSynthesis.addEventListener && speechSynthesis.addEventListener('voiceschanged', () => { load(); if (route === 'progresso') render(); });
      }
      useCap('tts').then(t => { this.cloud = t; if (t && route === 'progresso') render(); });
    },
    // Vozes femininas jovens e naturais primeiro (Edge, Chrome, Android, iPhone)
    rank(x) {
      const n = x.name;
      if (/\bmale\b|guy|andrew|brian|christopher|eric|roger|steffan|\balex\b|fred|daniel|david|mark|aaron|arthur|tom\b|evan|nathan|ryan/i.test(n)) return 99;
      const female = /ava|jenny|aria|emma|michelle|ana\b|samantha|zoe|nicky|allison|susan|zira|joanna|salli|kendra|kimberly|ivy|serena|karen|moira|tessa|libby|sonia|natasha|female/i.test(n);
      let r = 50;
      if (female && /natural|neural/i.test(n)) r = 1;
      else if (female && /premium|enhanced/i.test(n)) r = 2;
      else if (/google us english/i.test(n)) r = 4;
      else if (female) r = 5;
      else if (/natural|neural|premium|enhanced/i.test(n)) r = 20;
      if (/ava|jenny|emma|zoe|nicky|ana\b/i.test(n)) r -= 0.5; // timbres mais jovens
      if (!/en[-_]US/i.test(x.lang)) r += 10;
      return r;
    },
    femaleVoices() { return this.voices.filter(v => this.rank(v) < 40).sort((a, b) => this.rank(a) - this.rank(b)); },
    pick() {
      const v = this.voices; if (!v.length) return null;
      if (S.settings.voice && !S.settings.voice.startsWith('claude:')) { const f = v.find(x => x.name === S.settings.voice); if (f) return f; }
      return [...v].sort((a, b) => this.rank(a) - this.rank(b))[0];
    },
    speak(text, rate) {
      rate = rate || S.settings.rate;
      const chosen = S.settings.voice || '';
      // voz do Claude escolhida no Perfil, ou aparelho sem voz em inglês
      if (this.cloud && (chosen.startsWith('claude:') || !this.ok || !this.voices.length)) {
        const opts = { language: 'en', rate: Math.min(1.5, Math.max(0.7, rate)) };
        if (chosen.startsWith('claude:')) opts.voice = chosen.slice(7);
        return this.cloud.speak(text, opts).catch(() => { });
      }
      return new Promise(res => {
        if (!this.ok) { toast('Este navegador não tem voz para leitura.'); return res(); }
        speechSynthesis.cancel();
        const u = new SpeechSynthesisUtterance(text);
        const v = this.pick(); if (v) u.voice = v;
        u.lang = v ? v.lang : 'en-US'; u.rate = rate; u.pitch = S.settings.pitch || 1.06;
        u.onend = res; u.onerror = res;
        speechSynthesis.speak(u); // chamada direta: iOS exige o toque do usuário
      });
    },
    stop() { if (this.ok) speechSynthesis.cancel(); if (this.cloud) try { this.cloud.stop(); } catch (e) { } }
  };

  /* ---------------- microfone (reconhecimento de fala) ---------------- */
  const SR = window.SpeechRecognition || window.webkitSpeechRecognition;
  const Voice = {
    mode: IN_FRAME ? 'pending' : (SR ? 'native' : 'none'),
    dict: null, sess: null,
    available() { return this.mode !== 'none'; },
    async init() {
      if (!IN_FRAME) return;
      this.dict = await useCap('dictation');
      this.setMode(this.dict ? 'claude' : 'none');
    },
    setMode(m) { if (this.mode === m) return; this.mode = m; document.dispatchEvent(new Event('voicemode')); },
    start(opts) {
      this.abort(); TTS.stop();
      if (this.mode === 'native') return this._native(opts);
      if (this.mode === 'claude') return this._claude(opts);
      if (this.mode === 'pending') toast('O microfone ainda está carregando. Tente de novo em instantes.');
      return false;
    },
    stop() { if (this.sess) this.sess.stop(); },
    abort() { if (this.sess) this.sess.abort(); },
    _reason(code) {
      const msg = {
        not_granted: 'Microfone bloqueado. Use o ditado do teclado.', unavailable: 'Microfone indisponível aqui. Use o ditado do teclado.',
        dismissed: 'Permita o microfone para treinar a fala.', rate_limited: 'Muitas gravações seguidas. Aguarde um pouco.',
        upstream_error: 'Falha no microfone. Tente de novo.', no_gesture: 'Toque no botão para gravar.', time_limit: 'Tempo máximo atingido.'
      }[code];
      if (msg) toast(msg);
      if (code === 'not_granted' || code === 'unavailable') this.setMode('none');
    },
    _claude(opts) {
      const d = this.dict; let acc = '', ended = false, started = false, silence = null;
      const end = () => {
        if (ended) return; ended = true; clearTimeout(silence);
        unsubs.forEach(u => { try { u(); } catch (e) { } });
        if (this.sess === sess) this.sess = null;
        opts.onEnd(acc.trim());
      };
      const stopSoon = ms => { if (opts.continuous) return; clearTimeout(silence); silence = setTimeout(() => d.stop().catch(() => { }), ms); };
      const unsubs = [
        d.onPartial(({ text }) => { if (text) clearTimeout(silence); opts.onUpdate((acc + ' ' + text).replace(/\s+/g, ' ').trim()); }),
        d.onFinal(({ text }) => { acc += acc ? text : text.replace(/^\s+/, ''); opts.onUpdate(acc.trim()); stopSoon(1500); }),
        d.onState(({ state, reason }) => {
          if (state === 'listening' && !started) { started = true; opts.onListening && opts.onListening(); stopSoon(9000); }
          if (state === 'idle' && (started || reason)) { if (reason) this._reason(reason); end(); }
        })
      ];
      const sess = { stop: () => { d.stop().catch(() => { }); }, abort: () => { d.stop().catch(() => { }); end(); } };
      this.sess = sess;
      d.start({ language: 'en' }).catch(e => { const c = e && e.code; if (c && c !== 'stopped') this._reason(c); end(); });
      return true;
    },
    _native(opts) {
      const sess = { wanted: true, acc: '', rec: null };
      const run = () => {
        const r = new SR();
        r.lang = 'en-US'; r.interimResults = true; r.continuous = !!opts.continuous; r.maxAlternatives = 1;
        let fin = '';
        r.onstart = () => { opts.onListening && opts.onListening(); };
        r.onresult = e => {
          let interim = '';
          for (let i = e.resultIndex; i < e.results.length; i++) {
            const t = e.results[i][0].transcript;
            if (e.results[i].isFinal) fin += t + ' '; else interim += t;
          }
          opts.onUpdate((sess.acc + ' ' + fin + interim).replace(/\s+/g, ' ').trim());
        };
        r.onerror = e => {
          if (e.error === 'not-allowed' || e.error === 'service-not-allowed') { sess.wanted = false; toast('Permita o uso do microfone no navegador.'); }
          else if (e.error === 'network') { sess.wanted = false; toast('O reconhecimento de voz precisa de internet.'); }
          else if (e.error === 'no-speech') { if (!opts.keepAlive) toast('Não ouvi nada. Fale mais perto do microfone.'); }
          else if (e.error !== 'aborted') toast('Microfone: ' + e.error);
        };
        r.onend = () => {
          sess.acc = (sess.acc + ' ' + fin).replace(/\s+/g, ' ').trim();
          if (opts.continuous && sess.wanted) { try { run(); return; } catch (err) { } }
          sess.wanted = false;
          if (this.sess === sess) this.sess = null;
          opts.onEnd(sess.acc);
        };
        sess.rec = r; r.start();
      };
      sess.stop = () => { sess.wanted = false; try { sess.rec.stop(); } catch (e) { } };
      sess.abort = () => { sess.wanted = false; try { sess.rec.abort(); } catch (e) { } };
      this.sess = sess;
      try { run(); } catch (err) { this.sess = null; toast('Não foi possível iniciar o microfone.'); return false; }
      return true;
    }
  };

  /* ---------------- comparação de fala/texto ---------------- */
  const CONTR = { "i'm": "i am", "you're": "you are", "we're": "we are", "they're": "they are", "he's": "he is", "she's": "she is", "it's": "it is", "that's": "that is", "what's": "what is", "there's": "there is", "let's": "let us", "i've": "i have", "you've": "you have", "we've": "we have", "they've": "they have", "i'll": "i will", "you'll": "you will", "we'll": "we will", "they'll": "they will", "it'll": "it will", "he'll": "he will", "she'll": "she will", "i'd": "i would", "you'd": "you would", "we'd": "we would", "they'd": "they would", "don't": "do not", "doesn't": "does not", "didn't": "did not", "can't": "cannot", "won't": "will not", "isn't": "is not", "aren't": "are not", "wasn't": "was not", "weren't": "were not", "haven't": "have not", "hasn't": "has not", "hadn't": "had not", "couldn't": "could not", "wouldn't": "would not", "shouldn't": "should not", "gonna": "going to", "wanna": "want to", "gotta": "got to", "ok": "okay" };
  const ONES = ['zero', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine', 'ten', 'eleven', 'twelve', 'thirteen', 'fourteen', 'fifteen', 'sixteen', 'seventeen', 'eighteen', 'nineteen'];
  const TENS = ['', '', 'twenty', 'thirty', 'forty', 'fifty', 'sixty', 'seventy', 'eighty', 'ninety'];
  function n2w(n) {
    if (n < 20) return [ONES[n]];
    if (n < 100) return n % 10 ? [TENS[Math.floor(n / 10)], ONES[n % 10]] : [TENS[n / 10]];
    if (n < 1000) return [ONES[Math.floor(n / 100)], 'hundred', ...(n % 100 ? n2w(n % 100) : [])];
    if (n < 1e6) return [...n2w(Math.floor(n / 1000)), 'thousand', ...(n % 1000 ? n2w(n % 1000) : [])];
    return [String(n)];
  }
  function normWord(w) {
    const x = w.toLowerCase().replace(/[’‘]/g, "'").replace(/%/g, ' percent ').replace(/[^a-z0-9' ]+/g, ' ').trim();
    return x.split(/\s+/).filter(Boolean)
      .flatMap(t => (CONTR[t] || t).split(' '))
      .map(t => t.replace(/'/g, '')).filter(Boolean)
      .flatMap(t => /^\d+$/.test(t) ? n2w(+t) : [t]);
  }
  function tokenize(s) {
    s = String(s).replace(/(\d),(\d{3})/g, '$1$2').replace(/[-–—]/g, ' ');
    return s.split(/\s+/).filter(Boolean).map(orig => ({ orig, norm: normWord(orig) }));
  }
  function compare(target, spoken) {
    const T = tokenize(target);
    const flat = []; T.forEach((t, i) => t.norm.forEach(w => flat.push({ w, owner: i })));
    const H = tokenize(spoken).flatMap(t => t.norm);
    const n = flat.length, m = H.length;
    const dp = Array.from({ length: n + 1 }, () => new Uint16Array(m + 1));
    for (let i = n - 1; i >= 0; i--) for (let j = m - 1; j >= 0; j--)
      dp[i][j] = flat[i].w === H[j] ? dp[i + 1][j + 1] + 1 : Math.max(dp[i + 1][j], dp[i][j + 1]);
    const hit = new Set(); let i = 0, j = 0;
    while (i < n && j < m) {
      if (flat[i].w === H[j]) { hit.add(i); i++; j++; }
      else if (dp[i + 1][j] >= dp[i][j + 1]) i++; else j++;
    }
    const score = n ? Math.round(hit.size / n * 100) : 0;
    const html = T.map((t, ti) => {
      const idx = flat.map((f, k) => f.owner === ti ? k : -1).filter(k => k >= 0);
      const ok = idx.length === 0 || idx.every(k => hit.has(k));
      return `<span class="${ok ? 'hit' : 'miss'}">${esc(t.orig)}</span>`;
    }).join(' ');
    return { score, html };
  }
  const scoreClass = s => s >= 85 ? 'good' : s >= 60 ? 'mid' : 'bad';
  const scoreMsg = s => s >= 95 ? 'Perfect! Sounds great.' : s >= 85 ? 'Excelente! Muito claro.' : s >= 70 ? 'Bom! Repita focando nas palavras em vermelho.' : s >= 50 ? 'Quase lá. Ouça no modo lento e repita por partes.' : 'Ouça de novo no modo lento e repita palavra por palavra.';

  /* ---------------- componentes ---------------- */
  const sayBtn = (text, slow) => `<button class="icon-btn" data-say="${esc(text)}" ${slow ? 'data-rate="0.7"' : ''} title="${slow ? 'Ouvir devagar' : 'Ouvir'}" aria-label="${slow ? 'Ouvir devagar' : 'Ouvir'}">${slow ? '🐢' : '▶'}</button>`;

  /* Gravador: microfone quando disponível; senão (ou por escolha) campo de texto
     para usar o ditado do próprio teclado do celular. onDone(texto, segundos|null) */
  function recorder({ continuous = false, label = '🎤 Gravar', onDone, onStart }) {
    const wrap = h(`<div class="recorder">
      <div class="rec-mic"><button class="btn rec" type="button">${label}</button><span class="rec-status"></span></div>
      <div class="transcript"></div>
      <div class="rec-type">
        <textarea class="input" rows="3" style="min-height:96px" placeholder="Toque aqui e use o 🎤 do teclado para falar em inglês (ou digite)." autocapitalize="sentences"></textarea>
        <div class="row"><button class="btn primary" type="button">Conferir</button><span class="small muted">Dica: deixe o teclado do celular em inglês para o ditado entender melhor.</span></div>
      </div>
      <button class="linkish" type="button"></button>
    </div>`);
    const mic = $('.rec-mic', wrap), btn = $('.rec-mic .btn', wrap), st = $('.rec-status', wrap), tr = $('.transcript', wrap);
    const typeBox = $('.rec-type', wrap), ta = $('textarea', typeBox), check = $('.rec-type .btn', wrap), toggle = $('.linkish', wrap);
    let typed = false, t0 = 0, tick = null, live = false, tStart = 0;
    const sync = () => {
      const can = Voice.available();
      mic.hidden = !can || typed; tr.hidden = !can || typed;
      typeBox.hidden = can && !typed;
      toggle.hidden = !can;
      toggle.textContent = typed ? '🎤 Voltar para o microfone' : '⌨ Prefiro digitar ou usar o ditado do teclado';
    };
    toggle.onclick = () => { typed = !typed; if (typed) Voice.abort(); sync(); };
    document.addEventListener('voicemode', sync);
    onCleanup(() => { document.removeEventListener('voicemode', sync); clearInterval(tick); });
    sync();

    ta.addEventListener('focus', () => { if (!tStart) tStart = Date.now(); });
    check.onclick = () => {
      const text = ta.value.trim();
      if (!text) { toast('Fale ou escreva sua resposta primeiro.'); return; }
      onStart && onStart();
      onDone && onDone(text, null);
    };

    btn.onclick = () => {
      if (live) { Voice.stop(); st.textContent = 'Finalizando…'; return; }
      tr.textContent = '';
      const ok = Voice.start({
        continuous,
        onListening: () => { st.textContent = 'Ouvindo… fale agora'; },
        onUpdate: t => { tr.textContent = t; },
        onEnd: text => {
          live = false; clearInterval(tick);
          if (!document.body.contains(wrap)) return;
          btn.classList.remove('live'); btn.textContent = label; st.textContent = '';
          tr.textContent = text;
          if (!text) { if (Voice.available()) toast('Não captei nada. Tente de novo.'); return; }
          onDone && onDone(text, (Date.now() - t0) / 1000);
        }
      });
      if (!ok) return;
      live = true; t0 = Date.now(); btn.classList.add('live'); btn.textContent = '■ Parar';
      st.textContent = 'Preparando…';
      onStart && onStart();
      tick = setInterval(() => { if (st.textContent.startsWith('Ouvindo') || st.textContent.startsWith('Gravando')) st.textContent = 'Gravando ' + fmt((Date.now() - t0) / 1000); }, 500);
    };
    return wrap;
  }

  /* ---------------- shell & roteador ---------------- */
  const NAV = [
    ['Começar'],
    ['inicio', 'Hoje', 'home'], ['nivelamento', 'Nivelamento', 'level'], ['trilha', 'Trilha 12 semanas', 'path'],
    ['Treinos'],
    ['flashcards', 'Flashcards', 'cards'], ['shadowing', 'Shadowing', 'wave'], ['pronuncia', 'Pronúncia', 'ear'],
    ['ditado', 'Ditado', 'pen'], ['entrevista', 'Simulador de entrevista', 'mic'], ['escrita', 'Escrita', 'note'], ['erros', 'Erros de brasileiro', 'x'],
    ['Você'],
    ['metodo', 'Método e imersão', 'book'], ['progresso', 'Progresso', 'chart']
  ];
  const TABS = [['inicio', 'Hoje', 'home'], ['trilha', 'Trilha', 'path'], ['treinar', 'Treinar', 'target'], ['entrevista', 'Entrevista', 'mic'], ['progresso', 'Perfil', 'chart']];
  const TRAIN_ROUTES = ['treinar', 'flashcards', 'shadowing', 'pronuncia', 'ditado', 'escrita', 'erros', 'metodo', 'nivelamento'];

  function renderShell() {
    $('#app').innerHTML = `
      <aside class="sidebar">
        <a class="brand" href="#inicio"><span class="brand-mark">F</span><span class="brand-text">Fluent<b>90</b></span></a>
        <nav class="nav" id="nav">${NAV.map(n => n.length === 1 ? `<div class="nav-group">${n[0]}</div>` : `<a href="#${n[0]}" data-route="${n[0]}">${icon(n[2])}${n[1]}</a>`).join('')}</nav>
        <div class="sidebar-foot" id="sidebarFoot"></div>
      </aside>
      <header class="topbar">
        <a class="brand" href="#inicio"><span class="brand-mark">F</span><span class="brand-text">Fluent<b>90</b></span></a>
        <div class="top-right"><span class="top-streak" id="topStreak"></span><span class="sync"></span></div>
      </header>
      <main class="main" id="view" tabindex="-1"></main>
      <nav class="tabbar" id="tabbar" aria-label="Navegação principal">${TABS.map(t => `<a href="#${t[0]}" data-tab="${t[0]}">${icon(t[2])}<span>${t[1]}</span></a>`).join('')}</nav>
      <div class="toast" id="toast" role="status" aria-live="polite"></div>`;
  }

  let route = 'inicio';
  const routes = {};

  function parseHash() {
    const raw = decodeURIComponent(location.hash.replace(/^#\/?/, ''));
    const m = raw.match(/^([a-z]+)(?:[-/](.+))?$/);
    return m ? [m[1], m[2]] : ['inicio'];
  }

  function render() {
    cleanups.forEach(f => { try { f(); } catch (e) { } }); cleanups = [];
    Voice.abort(); TTS.stop();
    const [name, arg] = parseHash();
    route = routes[name] ? name : 'inicio';
    $$('#nav a').forEach(a => a.classList.toggle('active', a.dataset.route === route || (route === 'aula' && a.dataset.route === 'trilha')));
    const tab = route === 'aula' ? 'trilha' : TRAIN_ROUTES.includes(route) ? 'treinar' : route;
    $$('#tabbar a').forEach(a => { const on = a.dataset.tab === tab; a.classList.toggle('active', on); if (on) a.setAttribute('aria-current', 'page'); else a.removeAttribute('aria-current'); });
    const view = $('#view');
    view.innerHTML = '';
    routes[route](view, arg);
    window.scrollTo(0, 0);
    renderFoot();
  }

  function renderFoot() {
    const s = streak();
    const f = $('#sidebarFoot');
    if (f) f.innerHTML = `
      <div class="row" style="justify-content:space-between"><span>🔥 <b>${s}</b> ${s === 1 ? 'dia' : 'dias'}</span><span>⚡ <b>${totalXP()}</b> XP</span></div>
      <div class="muted small" style="margin-top:6px">${S.level ? 'Nível ' + S.level : 'Faça o nivelamento'} · Dia ${dayNumber()}</div>
      <div style="margin-top:6px"><span class="sync"></span></div>`;
    const t = $('#topStreak'); if (t) t.textContent = `🔥 ${s} · ⚡ ${totalXP()}`;
    renderSyncBadge();
  }

  /* =========================================================
     HOJE
     ========================================================= */
  const TEACHER_TIPS = [
    'Fluência não é saber tudo, é conseguir continuar falando quando não sabe uma palavra. Treine contornar: "It\'s like a… a kind of…".',
    'Pare de traduzir do português. Aprenda blocos prontos ("I\'m in charge of…") e encaixe as informações.',
    'Sua pronúncia não precisa ser perfeita, precisa ser clara. Foque em sílaba tônica e terminações (-ed, -s).',
    'Fale sozinho! Narre o que você está fazendo em inglês enquanto dirige, cozinha ou toma banho.',
    'Errar em voz alta hoje é o que te impede de travar na entrevista amanhã.',
    'Ouça o mesmo áudio várias vezes. Na 5ª vez, você começa a perceber o que antes era só barulho.',
    'Anote numa lista toda frase que você quis dizer e não soube. Isso vira seu material de estudo mais valioso.',
    'Consistência ganha de intensidade: 1 hora por dia vence 7 horas no sábado.',
    'Grave-se respondendo "Tell me about yourself". Daqui a 30 dias grave de novo e compare. Você vai se surpreender.',
    'Recrutadores não esperam inglês perfeito. Esperam clareza, confiança e exemplos concretos.',
    'Use os tempos mortos: fila, ônibus, intervalo. 5 minutos de flashcards no celular contam muito no fim do mês.'
  ];

  function taskLink(t) { return t.link === 'lesson' ? `#aula-${currentUnit()}` : t.link; }
  function firstOpenTaskLink() { const t = DAILY_TASKS.find(t => !dailyDone(t.id)); return t ? taskLink(t) : '#progresso'; }

  routes.inicio = (el) => {
    const cu = UNITS.find(u => u.id === currentUnit());
    const tasks = DAILY_TASKS;
    const doneCount = tasks.filter(t => dailyDone(t.id)).length;
    const due = buildQueue('all').length;
    const s = SENTENCES[seeded(SENTENCES.length)];
    const hour = new Date().getHours();
    const greet = hour < 12 ? 'Good morning!' : hour < 18 ? 'Good afternoon!' : 'Good evening!';

    el.append(h(`<section class="hero">
      <div class="eyebrow">Dia ${dayNumber()} da sua jornada</div>
      <h1>${greet}</h1>
      <p>${S.level
        ? `Foco da semana: <b>Unidade ${cu.id} · ${esc(cu.titlePt)}</b>. Faça o treino de hoje, mesmo que em partes ao longo do dia.`
        : 'Primeiro, vamos descobrir seu nível real. São 20 perguntas rápidas e o sistema ajusta as recomendações para você.'}</p>
      <div class="row" style="margin-top:14px">
        ${S.level
        ? `<a class="btn primary" href="${firstOpenTaskLink()}">${doneCount ? 'Continuar treino' : 'Começar treino de hoje'} →</a><a class="btn" href="#aula-${cu.id}">Abrir aula ${cu.id}</a>`
        : `<a class="btn primary" href="#nivelamento">Fazer nivelamento (5 min) →</a><a class="btn" href="#metodo">Como funciona</a>`}
      </div></section>`));

    el.append(h(`<div class="grid grid-4 section">
      <div class="card stat"><div class="num">🔥 ${streak()}</div><div class="lbl">dias seguidos</div></div>
      <div class="card stat"><div class="num">${day().xp}</div><div class="lbl">XP hoje · ${totalXP()} total</div></div>
      <a class="card stat" href="#flashcards" style="color:inherit"><div class="num">${due}</div><div class="lbl">flashcards para hoje →</div></a>
      <a class="card stat" href="#trilha" style="color:inherit"><div class="num">${unitsDone()}/12</div><div class="lbl">unidades concluídas →</div></a>
    </div>`));

    const tcard = h(`<div class="card section">
      <div class="row"><h2 style="margin:0">Treino de hoje</h2><span class="spacer"></span><span class="badge accent">${doneCount}/${tasks.length} · ~${tasks.reduce((a, t) => a + t.min, 0)} min</span></div>
      <div class="progress" style="margin:12px 0 4px"><span style="width:${doneCount / tasks.length * 100}%"></span></div>
      <div class="tasks"></div></div>`);
    const list = $('.tasks', tcard);
    tasks.forEach(t => {
      const done = dailyDone(t.id);
      const row = h(`<div class="task ${done ? 'done' : ''}">
        <button class="check ${done ? 'on' : ''}" aria-label="Marcar ${esc(t.label)}">${done ? '✓' : ''}</button>
        <a class="task-body" href="${taskLink(t)}"><div class="task-title">${esc(t.label)}</div><div class="task-desc">${esc(t.desc)}</div></a>
        <span class="badge">${t.min} min</span></div>`);
      $('.check', row).onclick = () => { const v = !dailyDone(t.id); markDaily(t.id, v); if (v) addXP(5); render(); };
      list.append(row);
    });
    el.append(tcard);

    el.append(h(`<div class="grid grid-2 section">
      <div class="card">
        <div class="eyebrow">Frase do dia</div>
        <div class="big-sentence">${esc(s.en)}</div>
        <p class="muted">${esc(s.pt)}</p>
        <div class="row">${sayBtn(s.en)}${sayBtn(s.en, true)}<span class="muted small" style="flex:1;min-width:160px">Repita 5 vezes em voz alta e use hoje em algum momento.</span></div>
      </div>
      <div class="card">
        <div class="eyebrow">Recado do professor</div>
        <p>${esc(TEACHER_TIPS[seeded(TEACHER_TIPS.length)])}</p>
        <a href="#metodo" class="small">Ver o método completo →</a>
      </div></div>`));
  };

  /* =========================================================
     TREINAR (hub, principal no celular)
     ========================================================= */
  routes.treinar = (el) => {
    const d = day();
    const tiles = [
      ['flashcards', 'cards', 'Flashcards', 'Repetição espaçada com frases de trabalho.', `${buildQueue('all').length} para hoje`, dailyDone('cards')],
      ['shadowing', 'wave', 'Shadowing', 'Ouça, repita e grave. Meta: 5 frases.', `${d.shadow || 0}/5 hoje`, dailyDone('shadow')],
      ['pronuncia', 'ear', 'Pronúncia', 'TH, -ED, vogais e sílaba tônica.', '6 tópicos', false],
      ['ditado', 'pen', 'Ditado', 'Escreva o que ouvir. Meta: 5 frases.', `${d.dict || 0}/5 hoje`, dailyDone('dictation')],
      ['entrevista', 'mic', 'Entrevista', '15 perguntas reais com métricas.', `${Object.keys(S.interview).length}/15 treinadas`, dailyDone('speak')],
      ['escrita', 'note', 'Escrita', 'Um tema por dia + correção com IA.', `${S.journal.length} textos`, dailyDone('writing')],
      ['erros', 'x', 'Erros de brasileiro', '26 erros que entregam o sotaque.', 'Estudo e quiz', false],
      ['nivelamento', 'level', 'Nivelamento', 'Teste A1–C1. Refaça a cada 30 dias.', S.level ? `Nível ${S.level}` : 'Não feito', !!S.level],
      ['metodo', 'book', 'Método e imersão', 'Rotinas, o que ouvir e prompt de conversa.', 'Guia', false]
    ];
    el.append(h(`<div><div class="eyebrow">Escolha um treino</div><h1>Treinar</h1>
      <p class="lead">Sessões curtas que cabem em qualquer intervalo. Use fone de ouvido e fale em voz alta.</p></div>`));
    el.append(h(`<div class="hub section">${tiles.map(([r, ic, t, d, b, ok]) => `
      <a class="tile" href="#${r}"><span class="ic">${icon(ic)}</span><b>${t}</b><span class="d">${d}</span><span class="badge ${ok ? 'green' : ''}">${ok ? '✓ ' : ''}${b}</span></a>`).join('')}</div>`));
  };

  /* =========================================================
     NIVELAMENTO
     ========================================================= */
  routes.nivelamento = (el) => {
    let i = -1; const answers = [];
    const box = h(`<div></div>`); el.append(box);
    const intro = () => {
      box.innerHTML = `
        <div class="eyebrow">Teste de nivelamento</div>
        <h1>Descubra seu nível real</h1>
        <p class="lead">20 perguntas, do A1 ao C1. Responda sem consultar nada. Se não souber, escolha a opção que soar mais natural.</p>
        ${S.level ? `<div class="notice">Último resultado: <b>${LEVELS[S.level].name}</b> (${S.placement.score}/20 em ${S.placement.date.split('-').reverse().join('/')}). Refaça a cada 30 dias para medir sua evolução.</div>` : ''}
        <div class="row section"><button class="btn primary block" id="go">Começar teste</button></div>`;
      $('#go', box).onclick = () => { i = 0; q(); };
    };
    const q = () => {
      const it = PLACEMENT[i];
      box.innerHTML = `
        <div class="row"><span class="eyebrow" style="margin:0">Pergunta ${i + 1} de ${PLACEMENT.length}</span><span class="spacer"></span><span class="badge">${it.lvl}</span></div>
        <div class="progress" style="margin:10px 0 18px"><span style="width:${i / PLACEMENT.length * 100}%"></span></div>
        <div class="card"><div class="big-sentence">${esc(it.q)}</div>
        <div class="opts" style="margin-top:16px">${it.options.map((o, k) => `<button class="opt" data-k="${k}">${esc(o)}</button>`).join('')}</div></div>`;
      $$('.opt', box).forEach(b => b.onclick = () => {
        answers[i] = +b.dataset.k === it.answer; i++;
        if (i < PLACEMENT.length) { q(); window.scrollTo(0, 0); } else result();
      });
    };
    const result = () => {
      const score = answers.filter(Boolean).length;
      const lvl = score <= 4 ? 'A1' : score <= 8 ? 'A2' : score <= 12 ? 'B1' : score <= 16 ? 'B2' : 'C1';
      const first = !S.level;
      S.level = lvl; S.placement = { score, date: todayKey(), at: Date.now() }; save(); addXP(first ? 30 : 10);
      const byLvl = ['A1', 'A2', 'B1', 'B2', 'C1'].map(l => {
        const qs = PLACEMENT.map((p, k) => ({ p, k })).filter(x => x.p.lvl === l);
        const ok = qs.filter(x => answers[x.k]).length;
        return `<div class="row" style="margin:6px 0;flex-wrap:nowrap"><b style="width:34px">${l}</b><div class="progress" style="flex:1"><span style="width:${ok / qs.length * 100}%"></span></div><span class="small muted" style="width:36px;text-align:right">${ok}/${qs.length}</span></div>`;
      }).join('');
      box.innerHTML = `
        <div class="eyebrow">Resultado</div>
        <h1>${LEVELS[lvl].name}</h1>
        <p class="lead">Você acertou <b>${score} de 20</b>.</p>
        <div class="grid grid-2 section">
          <div class="card"><h3>O que isso significa</h3><p>${esc(LEVELS[lvl].text)}</p></div>
          <div class="card"><h3>Acertos por nível</h3>${byLvl}</div>
        </div>
        <div class="notice section">Este teste mede gramática e vocabulário. Fluência se mede falando: por isso o simulador de entrevista e o shadowing são tão importantes na sua rotina.</div>
        <div class="row section"><a class="btn primary" href="#trilha">Ver minha trilha →</a><a class="btn" href="#inicio">Treino de hoje</a></div>`;
      window.scrollTo(0, 0);
    };
    intro();
  };

  /* =========================================================
     TRILHA
     ========================================================= */
  routes.trilha = (el) => {
    const cu = currentUnit();
    const phases = [
      { name: 'Fase 1 · Fundação', range: [1, 4], goal: 'Falar de você e do seu trabalho por 3 minutos sem travar.' },
      { name: 'Fase 2 · Comunicação', range: [5, 8], goal: 'Participar de uma reunião simulada de 10 minutos e escrever e-mails naturais.' },
      { name: 'Fase 3 · Performance', range: [9, 12], goal: 'Fazer uma entrevista completa de 20 minutos, gravada, com respostas STAR.' }
    ];
    el.append(h(`<div><div class="eyebrow">Trilha de 12 semanas</div><h1>Do básico à entrevista em inglês</h1>
      <p class="lead">Uma unidade por semana: gramática aplicada ao trabalho, frases-chave, exercícios e uma tarefa de fala. Avance mais rápido se quiser, mas não pule a parte de falar.</p>
      <div class="row"><span class="badge green">${unitsDone()} concluídas</span><span class="badge">${12 - unitsDone()} restantes</span></div></div>`));
    phases.forEach(ph => {
      const card = h(`<div class="card section"><h2 style="margin:0">${ph.name}</h2>
        <p class="muted small" style="margin:4px 0 8px">🎯 Marco: ${esc(ph.goal)}</p><div></div></div>`);
      const box = card.lastElementChild;
      UNITS.filter(u => u.id >= ph.range[0] && u.id <= ph.range[1]).forEach(u => {
        const done = S.units[u.id] && S.units[u.id].done;
        const sc = S.exScores[u.id];
        const status = done ? `<span class="badge green">✓ Concluída</span>` : u.id === cu ? `<span class="badge accent">Esta semana</span>` : '';
        box.append(h(`<a class="week ${u.id === cu ? 'current' : ''}" href="#aula-${u.id}" style="color:inherit">
          <div class="wk">Sem. ${u.id}</div>
          <div><b>${esc(u.title)}</b><div class="small muted">${esc(u.titlePt)} · ${esc(u.grammarTitle)}${sc != null ? ` · exercícios ${sc}%` : ''}</div></div>
          <div class="row">${status}</div></a>`));
      });
      el.append(card);
    });
    el.append(h(`<div class="card section"><h2>Depois dos 90 dias</h2>
      <ul class="list-plain">
        <li>Faça um teste oficial gratuito (ex.: EF SET) para ter um certificado de nível no LinkedIn.</li>
        <li>Converse com nativos 2 a 3 vezes por semana (plataformas de conversação ou grupos de prática).</li>
        <li>Refaça as unidades 5, 10 e 12 com respostas mais longas e complexas.</li>
        <li>Mantenha flashcards e shadowing: 20 minutos por dia mantêm e aprofundam a fluência.</li>
      </ul></div>`));
  };

  /* =========================================================
     AULA
     ========================================================= */
  routes.aula = (el, arg) => {
    const id = Math.min(12, Math.max(1, parseInt(arg, 10) || currentUnit()));
    const u = UNITS.find(x => x.id === id);
    const done = S.units[id] && S.units[id].done;

    el.append(h(`<div>
      <a href="#trilha" class="small">← Trilha</a>
      <div class="eyebrow" style="margin-top:12px">Semana ${u.id} · Unidade ${u.id} de 12</div>
      <h1>${esc(u.title)}</h1>
      <p class="lead"><b>${esc(u.titlePt)}.</b> ${esc(u.goal)}</p>
      ${done ? '<span class="badge green">✓ Unidade concluída</span>' : ''}
    </div>`));

    const nav = h(`<div class="lesson-nav">${[['b1', '1 · Gramática'], ['b2', '2 · Frases'], ['b3', '3 · Exercícios'], ['b4', '4 · Fala']].map(([k, n]) => `<button class="tab" data-go="${k}">${n}</button>`).join('')}</div>`);
    $$('[data-go]', nav).forEach(b => b.onclick = () => { const t = $('#' + b.dataset.go, el); if (t) t.scrollIntoView({ behavior: 'smooth', block: 'start' }); });
    el.append(nav);

    el.append(h(`<div class="card lesson-block grammar" id="b1">
      <h2><span class="n">1</span>${esc(u.grammarTitle)}</h2>${u.grammar}</div>`));

    const ph = h(`<div class="card section lesson-block" id="b2">
      <h2><span class="n">2</span>Frases-chave</h2>
      <p class="muted small">Ouça e repita cada uma 3 vezes em voz alta. Elas entram automaticamente no seu deck de flashcards.</p>
      <button class="btn sm" id="playAll">▶ Ouvir todas em sequência</button>
      <div style="margin-top:6px">${u.phrases.map(([en, pt]) => `<div class="phrase">${sayBtn(en)}<div><div class="en">${esc(en)}</div><div class="pt">${esc(pt)}</div></div>${sayBtn(en, true)}</div>`).join('')}</div></div>`);
    let playing = false;
    $('#playAll', ph).onclick = async (e) => {
      const b = e.currentTarget;
      if (playing) { playing = false; TTS.stop(); b.textContent = '▶ Ouvir todas em sequência'; return; }
      playing = true; b.textContent = '■ Parar';
      for (const [en] of u.phrases) { if (!playing) break; await TTS.speak(en); await new Promise(r => setTimeout(r, 1800)); }
      playing = false; b.textContent = '▶ Ouvir todas em sequência';
    };
    onCleanup(() => { playing = false; });
    el.append(ph);

    const exCard = h(`<div class="card section lesson-block" id="b3"><h2><span class="n">3</span>Exercícios</h2><div class="ex-list"></div><div class="ex-summary"></div></div>`);
    renderExercises(u, $('.ex-list', exCard), $('.ex-summary', exCard));
    el.append(exCard);

    const sp = h(`<div class="card section lesson-block" id="b4">
      <h2><span class="n">4</span>Tarefa de fala</h2>
      <p><b>${esc(u.speaking.prompt)}</b></p>
      <ul class="list-plain small">${u.speaking.tips.map(t => `<li>${esc(t)}</li>`).join('')}</ul>
      <div class="rec-slot" style="margin-top:14px"></div>
      <div class="metrics rec-metrics" style="margin-top:12px" hidden></div>
      <details class="model"><summary>Ver resposta modelo</summary>
        <p>${esc(u.speaking.model)}</p>
        <div class="row">${sayBtn(u.speaking.model)}${sayBtn(u.speaking.model, true)}<span class="small muted" style="flex:1;min-width:160px">Ouça o modelo e depois grave a sua versão com as SUAS informações.</span></div>
      </details></div>`);
    $('.rec-slot', sp).append(recorder({
      continuous: true, label: '🎤 Gravar minha resposta',
      onDone: (text, secs) => {
        const words = text ? text.split(/\s+/).length : 0;
        const m = $('.rec-metrics', sp); m.hidden = false;
        m.innerHTML = `<div class="metric"><b>${secs == null ? '—' : fmt(secs)}</b><span>duração</span></div><div class="metric"><b>${words}</b><span>palavras</span></div><div class="metric"><b>${secs > 5 ? Math.round(words / secs * 60) : '—'}</b><span>palavras/min</span></div>`;
        if (words >= 30) { addXP(15); markDaily('speak'); }
        else if (words > 0) toast('Tente falar mais: o ideal é passar de 60 palavras.');
      }
    }));
    el.append(sp);

    const fin = h(`<div class="card section">
      <h3 style="margin:0">${done ? 'Unidade concluída 🎉' : 'Terminou tudo?'}</h3>
      <p class="small muted" style="margin:4px 0 12px">${done ? 'Revise sempre que quiser. As frases continuam no seu deck.' : 'Conclua depois de fazer os exercícios e gravar a tarefa de fala.'}</p>
      ${done ? '' : '<button class="btn primary block" id="finish">Concluir unidade (+50 XP)</button>'}
      <div class="row" style="margin-top:12px">
      ${id > 1 ? `<a class="btn sm ghost" href="#aula-${id - 1}">← Unidade ${id - 1}</a>` : ''}<span class="spacer"></span>
      ${id < 12 ? `<a class="btn sm ghost" href="#aula-${id + 1}">Unidade ${id + 1} →</a>` : ''}</div></div>`);
    const fb = $('#finish', fin);
    if (fb) fb.onclick = () => {
      S.units[id] = { done: true, date: todayKey() }; save(); addXP(50); markDaily('lesson');
      toast('Unidade concluída! +50 XP'); render();
    };
    el.append(fin);
  };

  const normAns = s => String(s).toLowerCase().replace(/[’‘]/g, "'").replace(/[.!?,]/g, '').replace(/\s+/g, ' ').trim();

  function renderExercises(u, list, summary) {
    const results = new Array(u.exercises.length).fill(null);
    const set = (i, v) => {
      if (results[i] !== null) return;
      results[i] = v;
      if (results.every(r => r !== null)) {
        const ok = results.filter(Boolean).length; const pct = Math.round(ok / results.length * 100);
        S.exScores[u.id] = Math.max(S.exScores[u.id] || 0, pct); save(); addXP(ok * 5);
        summary.innerHTML = `<div class="notice ${pct >= 70 ? '' : 'warn'}" style="margin-top:14px"><b>${ok}/${results.length} acertos (${pct}%)</b> · +${ok * 5} XP. ${pct >= 70 ? 'Ótimo! Agora vá para a tarefa de fala.' : 'Releia a explicação e tente de novo.'}</div>
          <button class="btn sm" style="margin-top:10px" id="redo">↻ Refazer exercícios</button>`;
        $('#redo', summary).onclick = () => { list.innerHTML = ''; summary.innerHTML = ''; renderExercises(u, list, summary); };
      }
    };
    u.exercises.forEach((ex, i) => {
      const box = h(`<div class="ex"><div class="ex-q">${i + 1}. ${ex.type === 'order' ? 'Toque nas palavras na ordem certa:' : esc(ex.q)}</div><div class="ex-body"></div><div class="feedback"></div></div>`);
      const body = $('.ex-body', box), fb = $('.feedback', box);
      const show = (ok, extra = '') => { fb.className = 'feedback show ' + (ok ? 'ok' : 'no'); fb.innerHTML = (ok ? '✓ Correto! ' : '✕ ' + extra) + ' ' + esc(ex.explain); };

      if (ex.type === 'mc') {
        body.innerHTML = `<div class="opts">${ex.options.map((o, k) => `<button class="opt" data-k="${k}">${esc(o)}</button>`).join('')}</div>`;
        $$('.opt', body).forEach(b => b.onclick = () => {
          const k = +b.dataset.k, ok = k === ex.answer;
          $$('.opt', body).forEach((x, kk) => { x.disabled = true; if (kk === ex.answer) x.classList.add('correct'); });
          if (!ok) b.classList.add('wrong');
          show(ok); set(i, ok);
        });
      } else if (ex.type === 'fill') {
        body.innerHTML = `<div class="row" style="flex-wrap:nowrap"><input class="input" style="flex:1;min-width:0" placeholder="Resposta" autocapitalize="off" autocorrect="off" autocomplete="off" spellcheck="false" enterkeyhint="done"><button class="btn">OK</button></div>`;
        const inp = $('input', body), b = $('button', body);
        const check = () => {
          if (!inp.value.trim()) return;
          const ok = ex.answer.map(normAns).includes(normAns(inp.value));
          inp.disabled = true; b.disabled = true; inp.blur();
          show(ok, `Resposta: <b>${esc(ex.answer[0])}</b>.`); set(i, ok);
        };
        b.onclick = check; inp.onkeydown = e => { if (e.key === 'Enter') check(); };
      } else if (ex.type === 'order') {
        let pool = shuffle(ex.words); while (pool.join(' ') === ex.answer && ex.words.length > 1) pool = shuffle(ex.words);
        const picked = [];
        body.innerHTML = `<div class="answer-line"></div><div class="word-bank"></div><div class="row"><button class="btn sm" data-a="check">Verificar</button><button class="btn sm ghost" data-a="clear">Limpar</button></div>`;
        const line = $('.answer-line', body), bank = $('.word-bank', body);
        let locked = false;
        const draw = () => {
          line.innerHTML = ''; bank.innerHTML = '';
          picked.forEach((w, k) => { const b = h(`<button class="word">${esc(w)}</button>`); b.onclick = () => { if (locked) return; pool.push(picked.splice(k, 1)[0]); draw(); }; line.append(b); });
          pool.forEach((w, k) => { const b = h(`<button class="word">${esc(w)}</button>`); b.onclick = () => { if (locked) return; picked.push(pool.splice(k, 1)[0]); draw(); }; bank.append(b); });
        };
        draw();
        $('[data-a=clear]', body).onclick = () => { if (locked) return; pool.push(...picked.splice(0)); draw(); };
        $('[data-a=check]', body).onclick = () => {
          if (locked) return;
          if (pool.length) { toast('Use todas as palavras.'); return; }
          const ok = normAns(picked.join(' ')) === normAns(ex.answer);
          locked = true; show(ok, `Ordem certa: <b>${esc(ex.answer)}.</b>`); set(i, ok);
          if (ok) TTS.speak(ex.answer);
        };
      }
      list.append(box);
    });
  }

  /* =========================================================
     FLASHCARDS (repetição espaçada)
     ========================================================= */
  function allCards() {
    const cu = currentUnit();
    const cards = [];
    UNITS.filter(u => u.id <= cu).forEach(u => u.phrases.forEach(([en, pt], i) =>
      cards.push({ id: `u${u.id}-${i}`, deck: 'aulas', en, pt, say: en, tag: `Unidade ${u.id}` })));
    PHRASAL_VERBS.forEach(([term, ex, pt], i) =>
      cards.push({ id: `pv-${i}`, deck: 'phrasal', en: term, pt, example: ex, say: ex, tag: 'Phrasal verb' }));
    BUSINESS_VOCAB.forEach(([term, ex, pt], i) =>
      cards.push({ id: `bv-${i}`, deck: 'vocab', en: term, pt, example: ex, say: ex, tag: 'Vocabulário' }));
    return cards;
  }
  function buildQueue(deck) {
    const t = todayKey();
    const cards = allCards().filter(c => deck === 'all' || c.deck === deck);
    const due = cards.filter(c => S.cards[c.id] && S.cards[c.id].due <= t);
    const newLeft = Math.max(0, S.settings.newPerDay - (day().newSeen || 0));
    const fresh = cards.filter(c => !S.cards[c.id]).sort((a, b) => (a.deck === 'aulas' ? 0 : 1) - (b.deck === 'aulas' ? 0 : 1)).slice(0, newLeft);
    return [...shuffle(due), ...fresh];
  }
  function nextIvl(st, rating) {
    if (rating === 0) return 0;
    if (rating === 1) return Math.max(1, Math.round((st.ivl || 1) * 1.2));
    if (rating === 2) return st.reps === 0 ? 1 : st.reps === 1 ? 3 : Math.round(st.ivl * st.ease);
    return st.reps === 0 ? 4 : Math.round(Math.max(st.ivl, 1) * st.ease * 1.3);
  }
  function schedule(id, rating) {
    const isNew = !S.cards[id];
    const st = S.cards[id] || { ivl: 0, ease: 2.5, reps: 0, lapses: 0 };
    st.ivl = nextIvl(st, rating);
    if (rating === 0) { st.reps = 0; st.ease = Math.max(1.3, st.ease - 0.2); st.lapses++; }
    else if (rating === 1) { st.ease = Math.max(1.3, st.ease - 0.15); st.reps++; }
    else if (rating === 2) st.reps++;
    else { st.ease += 0.15; st.reps++; }
    st.due = addDays(todayKey(), st.ivl); st.at = Date.now();
    S.cards[id] = st;
    const d = day(); d.cards++; if (isNew) d.newSeen = (d.newSeen || 0) + 1;
    save();
  }
  function previewIvl(id, rating) {
    if (rating === 0) return 'agora';
    const ivl = nextIvl(S.cards[id] || { ivl: 0, ease: 2.5, reps: 0 }, rating);
    return ivl < 30 ? `${ivl}d` : `${Math.round(ivl / 30)}m`;
  }

  routes.flashcards = (el) => {
    let deck = 'all';
    const decks = [['all', 'Todos'], ['aulas', 'Frases das aulas'], ['phrasal', 'Phrasal verbs'], ['vocab', 'Vocabulário']];
    const wrap = h(`<div class="flash-wrap"></div>`);
    const header = h(`<div><div class="eyebrow">Repetição espaçada</div><h1>Flashcards</h1>
      <p class="lead">Cada cartão volta no momento em que você está prestes a esquecer. Tente <b>falar a resposta em voz alta</b> antes de virar.</p></div>`);
    el.append(header, wrap);

    const home = () => {
      header.hidden = false;
      const q = buildQueue(deck);
      const due = q.filter(c => S.cards[c.id]).length, fresh = q.length - due;
      const learned = Object.values(S.cards).filter(c => c.reps > 0).length;
      wrap.innerHTML = `
        <div class="tabs scroll">${decks.map(([k, n]) => `<button class="tab ${k === deck ? 'active' : ''}" data-d="${k}">${n}</button>`).join('')}</div>
        <div class="card" style="text-align:center;padding:26px 18px">
          <div class="grid grid-3" style="margin-bottom:18px">
            <div><div class="score" style="color:var(--blue)">${due}</div><div class="small muted">revisar</div></div>
            <div><div class="score" style="color:var(--accent)">${fresh}</div><div class="small muted">novos</div></div>
            <div><div class="score" style="color:var(--green)">${learned}</div><div class="small muted">aprendidos</div></div>
          </div>
          ${q.length
          ? `<button class="btn primary block" id="start">Começar revisão (${q.length}) →</button>`
          : `<p><b>Tudo em dia! 🎉</b><br><span class="muted">Volte amanhã. Novas frases são liberadas conforme você avança nas unidades.</span></p>`}
          <label class="small muted" style="display:block;margin-top:16px">Direção
            <select class="input" id="dir" style="display:block;width:100%;margin-top:4px">
              <option value="pt-en" ${S.settings.dir === 'pt-en' ? 'selected' : ''}>Português → Inglês (treina a fala)</option>
              <option value="en-pt" ${S.settings.dir === 'en-pt' ? 'selected' : ''}>Inglês → Português (treina a compreensão)</option>
            </select></label>
        </div>
        <p class="small muted desk-only" style="text-align:center;margin-top:12px">Atalhos: <span class="kbd">Espaço</span> vira · <span class="kbd">1</span>–<span class="kbd">4</span> avaliam</p>`;
      $$('.tab', wrap).forEach(b => b.onclick = () => { deck = b.dataset.d; home(); });
      $('#dir', wrap).onchange = e => { S.settings.dir = e.target.value; save(); };
      const st = $('#start', wrap); if (st) st.onclick = () => session(q);
    };

    const session = (queue) => {
      header.hidden = true;
      let idx = 0, reviewed = 0, revealed = false, cur = null;
      const total = queue.length;
      const ctl = {};
      const show = () => {
        if (idx >= queue.length) return end();
        const c = cur = queue[idx]; revealed = false;
        const ptFirst = S.settings.dir === 'pt-en';
        const front = ptFirst
          ? `<div class="small muted" style="margin-bottom:10px">Como você diria em inglês?</div><div class="front">${esc(c.pt)}</div>${c.example ? `<div class="hint">${c.deck === 'phrasal' ? 'phrasal verb' : 'termo de negócios'}</div>` : ''}`
          : `<div class="small muted" style="margin-bottom:10px">O que significa?</div><div class="front">${esc(c.en)}</div>${c.example ? `<div class="hint">"${esc(c.example)}"</div>` : ''}`;
        const back = ptFirst
          ? `<div class="en">${esc(c.en)}</div>${c.example ? `<p style="margin:8px 0 0">"${esc(c.example)}"</p>` : ''}`
          : `<div class="en" style="color:var(--ink)">${esc(c.pt)}</div>`;
        wrap.innerHTML = `
          <div class="row small muted"><button class="btn sm ghost" id="quit">✕ Sair</button><span class="spacer"></span><span>${Math.min(reviewed + 1, total)} / ${total}</span><span class="badge">${esc(c.tag)}</span>${S.cards[c.id] ? '' : '<span class="badge accent">novo</span>'}</div>
          <div class="progress" style="margin:8px 0 12px"><span style="width:${reviewed / Math.max(total, 1) * 100}%"></span></div>
          <div class="card flash">${front}<div class="tap">Toque para ver a resposta</div><div class="back" hidden>${back}
            <div class="row" style="justify-content:center;margin-top:10px">${sayBtn(c.say)}${sayBtn(c.say, true)}</div>
            <div class="diff-out" style="margin-top:10px"></div></div></div>
          <div class="actions" style="margin-top:12px"></div>`;
        $('#quit', wrap).onclick = () => { Voice.abort(); finish(); home(); };
        const actions = $('.actions', wrap), card = $('.flash', wrap);
        const reveal = (answer) => {
          if (revealed) return; revealed = true;
          Voice.abort();
          card.classList.add('open'); $('.tap', wrap).hidden = true; $('.back', wrap).hidden = false;
          if (ptFirst) TTS.speak(c.say);
          if (answer != null && ptFirst) {
            const r = compare(c.en, answer);
            $('.diff-out', wrap).innerHTML = `<div class="small muted">Sua resposta: “${esc(answer || '—')}” · ${r.score}%</div><div class="diff" style="font-size:1rem">${r.html}</div>`;
          }
          actions.innerHTML = `<div class="small muted" style="text-align:center">Como foi lembrar?</div><div class="rate" style="margin-top:6px">
            <button class="btn again" data-r="0">Errei<small>${previewIvl(c.id, 0)}</small></button>
            <button class="btn hard" data-r="1">Difícil<small>${previewIvl(c.id, 1)}</small></button>
            <button class="btn good" data-r="2">Bom<small>${previewIvl(c.id, 2)}</small></button>
            <button class="btn easy" data-r="3">Fácil<small>${previewIvl(c.id, 3)}</small></button></div>`;
          $$('[data-r]', actions).forEach(b => b.onclick = () => rate(+b.dataset.r));
        };
        const rate = (r) => {
          schedule(c.id, r); reviewed++;
          if (r === 0) queue.push(c);
          idx++; show(); window.scrollTo(0, 0);
        };
        card.onclick = e => { if (!e.target.closest('button')) reveal(null); };
        const canSpeak = ptFirst && Voice.available();
        actions.innerHTML = `<div class="stack-actions">
          ${canSpeak ? '<button class="btn rec" id="say">🎤 Responder falando</button>' : ''}
          ${ptFirst ? '<button class="btn" id="typeAns">⌨ Responder digitando</button>' : ''}
          <button class="btn ${ptFirst ? 'ghost' : 'primary'}" id="rev">Mostrar resposta</button></div>
          <div class="type-ans row" hidden style="margin-top:10px;flex-wrap:nowrap"><input class="input" style="flex:1;min-width:0" placeholder="Escreva ou dite em inglês" autocapitalize="sentences" enterkeyhint="done"><button class="btn primary">OK</button></div>
          <div class="transcript" style="text-align:center"></div>`;
        $('#rev', actions).onclick = () => reveal(null);
        const ta = $('#typeAns', actions);
        if (ta) ta.onclick = () => {
          const box = $('.type-ans', actions); box.hidden = false; const inp = $('input', box); inp.focus();
          const go = () => { if (inp.value.trim()) { inp.blur(); reveal(inp.value.trim()); } };
          $('button', box).onclick = go; inp.onkeydown = e => { if (e.key === 'Enter') go(); };
        };
        const sb = $('#say', actions);
        if (sb) sb.onclick = () => {
          if (sb.classList.contains('live')) { Voice.stop(); return; }
          const tr = $('.transcript', actions);
          const ok = Voice.start({
            onListening: () => { sb.textContent = '■ Ouvindo… toque para parar'; },
            onUpdate: t => { tr.textContent = t; },
            onEnd: t => { if (cur === c && document.body.contains(sb)) { sb.classList.remove('live'); if (t) reveal(t); else sb.textContent = '🎤 Responder falando'; } }
          });
          if (ok) { sb.classList.add('live'); sb.textContent = 'Preparando…'; }
        };
        ctl.reveal = reveal; ctl.rate = rate;
      };
      const key = e => {
        if (e.target.matches('input,textarea,select')) return;
        if (e.code === 'Space') { e.preventDefault(); if (!revealed && ctl.reveal) ctl.reveal(null); }
        else if (revealed && /^[1-4]$/.test(e.key)) ctl.rate(+e.key - 1);
      };
      document.addEventListener('keydown', key);
      onCleanup(() => document.removeEventListener('keydown', key));
      const finish = () => {
        document.removeEventListener('keydown', key);
        if (reviewed) addXP(reviewed * 2);
        if (reviewed >= 10 || (reviewed && buildQueue('all').length === 0)) markDaily('cards');
        return reviewed;
      };
      const end = () => {
        const n = finish();
        header.hidden = false;
        wrap.innerHTML = `<div class="card" style="text-align:center;padding:34px 18px">
          <div class="score" style="color:var(--green)">✓</div><h2>Sessão concluída!</h2>
          <p class="muted">${n} revisões · +${n * 2} XP</p>
          <div class="stack-actions"><button class="btn" id="back">Voltar aos decks</button><a class="btn primary" href="#inicio">Treino de hoje</a></div></div>`;
        $('#back', wrap).onclick = home;
      };
      show();
    };
    home();
  };

  /* =========================================================
     SHADOWING
     ========================================================= */
  const levelDefault = () => S.level === 'A1' || S.level === 'A2' ? 1 : S.level === 'B1' ? 2 : S.level ? 3 : 1;
  const LVL_TABS = [[1, 'Fácil'], [2, 'Médio'], [3, 'Difícil']];

  routes.shadowing = (el) => {
    let lvl = levelDefault(), hide = false;
    let list = SENTENCES.filter(s => s.lvl === lvl), i = 0;
    el.append(h(`<div><div class="eyebrow">Treino de fala e pronúncia</div><h1>Shadowing</h1>
      <p class="lead">Ouça e repita imitando ritmo, entonação e sotaque. Faça pelo menos 5 frases por dia.</p>
      <details class="model"><summary>Como fazer shadowing</summary>
        <ol class="list-plain small" style="margin-top:8px"><li><b>Ouça</b> 2 ou 3 vezes, prestando atenção na melodia.</li><li><b>Murmure junto</b> com o áudio, mesmo sem as palavras.</li><li><b>Repita</b> como um ator, exagerando a entonação.</li><li><b>Grave</b> e veja quais palavras não foram entendidas.</li></ol></details></div>`));
    const box = h(`<div class="section"></div>`); el.append(box);
    const draw = () => {
      const s = list[i];
      box.innerHTML = `
        <div class="tabs">${LVL_TABS.map(([v, n]) => `<button class="tab ${v === lvl ? 'active' : ''}" data-l="${v}">${n}</button>`).join('')}</div>
        <div class="card">
          <div class="row small muted"><span>Frase ${i + 1} de ${list.length}</span><span class="spacer"></span><span>Hoje: ${day().shadow || 0}</span></div>
          <div class="big-sentence" style="${hide ? 'filter:blur(8px);user-select:none' : ''}" id="sent">${esc(s.en)}</div>
          <p class="muted" style="${hide ? 'visibility:hidden' : ''}">${esc(s.pt)}</p>
          <div class="grid grid-3" style="gap:8px"><button class="btn dark" data-say="${esc(s.en)}">▶ Ouvir</button><button class="btn" data-say="${esc(s.en)}" data-rate="0.65">🐢 Lento</button><button class="btn" id="loop">🔁 3x</button></div>
          <label class="small muted" style="display:flex;gap:8px;align-items:center;margin-top:12px"><input type="checkbox" id="hide" ${hide ? 'checked' : ''}> Modo desafio: esconder o texto</label>
          <hr><div class="rec-slot"></div><div class="result" style="margin-top:12px"></div>
          <hr><div class="row" style="flex-wrap:nowrap"><button class="btn sm ghost" id="prev">← Anterior</button><span class="spacer"></span><button class="btn sm ghost" id="rand">Aleatória</button><button class="btn sm" id="next">Próxima →</button></div>
        </div>`;
      $$('[data-l]', box).forEach(b => b.onclick = () => { lvl = +b.dataset.l; list = SENTENCES.filter(x => x.lvl === lvl); i = 0; draw(); });
      $('#hide', box).onchange = e => { hide = e.target.checked; draw(); };
      $('#prev', box).onclick = () => { i = (i - 1 + list.length) % list.length; draw(); };
      $('#next', box).onclick = () => { i = (i + 1) % list.length; draw(); };
      $('#rand', box).onclick = () => { i = Math.floor(Math.random() * list.length); draw(); };
      $('#loop', box).onclick = async () => { for (let k = 0; k < 3; k++) { await TTS.speak(s.en, k === 1 ? 0.75 : undefined); await new Promise(r => setTimeout(r, 1200)); } };
      $('.rec-slot', box).append(recorder({
        label: '🎤 Repetir e gravar',
        onDone: text => {
          const r = compare(s.en, text);
          const sent = $('#sent', box); sent.style.filter = ''; sent.innerHTML = `<span class="diff" style="font-size:inherit">${r.html}</span>`;
          $('.result', box).innerHTML = `<div class="row" style="flex-wrap:nowrap;align-items:flex-start"><div class="score ${scoreClass(r.score)}">${r.score}%</div><div><b>${scoreMsg(r.score)}</b><div class="small muted">Verde = entendido · Vermelho = não reconhecido. Repita focando nelas.</div></div></div>`;
          const d = day(); d.shadow = (d.shadow || 0) + 1; save();
          if (r.score >= 70) addXP(3);
          if (d.shadow >= 5) markDaily('shadow');
        }
      }));
    };
    draw();
  };

  /* =========================================================
     PRONÚNCIA
     ========================================================= */
  routes.pronuncia = (el) => {
    let t = 0;
    el.append(h(`<div><div class="eyebrow">Sons que o brasileiro precisa dominar</div><h1>Pronúncia</h1>
      <p class="lead">Seis pontos que mais afetam a clareza de quem fala português. Toque nas palavras para ouvir, compare os pares e grave as frases.</p></div>`));
    const box = h(`<div class="section"></div>`); el.append(box);
    const draw = () => {
      const p = PRONUNCIATION[t];
      const clean = w => w.replace(/\(.*?\)/g, '').trim().toLowerCase();
      box.innerHTML = `
        <div class="tabs scroll">${PRONUNCIATION.map((x, k) => `<button class="tab ${k === t ? 'active' : ''}" data-t="${k}">${esc(x.title)}</button>`).join('')}</div>
        <div class="card"><h2>${esc(p.title)}</h2><p>${esc(p.text)}</p>
          <h3 style="margin-top:16px">Pares para comparar</h3>
          <div class="grid grid-3 stack" style="gap:8px">${p.pairs.map(([a, b]) => `<div class="pair"><button data-say="${esc(clean(a))}" data-rate="0.75">${esc(a)}</button><span class="vs">×</span><button data-say="${esc(clean(b))}" data-rate="0.75">${esc(b)}</button></div>`).join('')}</div>
        </div>
        <div class="card"><h3>Frases para gravar</h3><div class="sents"></div></div>`;
      $$('[data-t]', box).forEach(b => b.onclick = () => { t = +b.dataset.t; draw(); });
      const sents = $('.sents', box);
      p.sentences.forEach(s => {
        const row = h(`<div class="ex"><div class="row" style="flex-wrap:nowrap;align-items:flex-start"><div class="big-sentence" style="font-size:1.15rem;flex:1;margin:0">${esc(s)}</div>${sayBtn(s)}${sayBtn(s, true)}</div><div class="slot" style="margin-top:10px"></div><div class="res" style="margin-top:8px"></div></div>`);
        $('.slot', row).append(recorder({
          label: '🎤 Gravar', onDone: text => {
            const r = compare(s, text);
            $('.res', row).innerHTML = `<div class="row" style="flex-wrap:nowrap;align-items:flex-start"><span class="score ${scoreClass(r.score)}" style="font-size:1.6rem">${r.score}%</span><span class="diff" style="font-size:1rem">${r.html}</span></div>`;
            if (r.score >= 70) addXP(3);
            const d = day(); d.shadow = (d.shadow || 0) + 1; save(); if (d.shadow >= 5) markDaily('shadow');
          }
        }));
        sents.append(row);
      });
    };
    draw();
  };

  /* =========================================================
     DITADO
     ========================================================= */
  routes.ditado = (el) => {
    let lvl = levelDefault();
    let order = shuffle(SENTENCES.filter(s => s.lvl === lvl)), i = 0;
    el.append(h(`<div><div class="eyebrow">Treino de compreensão auditiva</div><h1>Ditado</h1>
      <p class="lead">Ouça e escreva exatamente o que ouviu. Isso treina seu ouvido a separar palavras que nativos falam “grudadas”. Faça 5 por dia.</p></div>`));
    const box = h(`<div class="section"></div>`); el.append(box);
    const draw = () => {
      const s = order[i];
      box.innerHTML = `
        <div class="tabs">${LVL_TABS.map(([v, n]) => `<button class="tab ${v === lvl ? 'active' : ''}" data-l="${v}">${n}</button>`).join('')}</div>
        <div class="card">
          <div class="row small muted"><span>Frase ${i + 1} de ${order.length}</span><span class="spacer"></span><span>Hoje: ${day().dict || 0}</span></div>
          <div class="grid grid-2" style="gap:8px;margin:14px 0;grid-template-columns:1fr 1fr"><button class="btn dark" id="play">▶ Ouvir</button><button class="btn" id="slow">🐢 Lento</button></div>
          <textarea class="input" id="ans" style="min-height:90px" placeholder="Escreva o que você ouviu…" autocapitalize="sentences" autocorrect="off" autocomplete="off" spellcheck="false"></textarea>
          <div class="row" style="margin-top:10px"><button class="btn primary" id="check" style="flex:1">Verificar</button><button class="btn ghost" id="skip">Pular →</button></div>
          <div class="out" style="margin-top:16px"></div>
        </div>`;
      $$('[data-l]', box).forEach(b => b.onclick = () => { lvl = +b.dataset.l; order = shuffle(SENTENCES.filter(x => x.lvl === lvl)); i = 0; draw(); });
      $('#play', box).onclick = () => TTS.speak(s.en); $('#slow', box).onclick = () => TTS.speak(s.en, 0.65);
      $('#skip', box).onclick = () => { i = (i + 1) % order.length; draw(); };
      const ans = $('#ans', box);
      const check = () => {
        if (!ans.value.trim()) { toast('Ouça e escreva primeiro.'); return; }
        const r = compare(s.en, ans.value);
        ans.blur();
        $('.out', box).innerHTML = `
          <div class="row" style="flex-wrap:nowrap;align-items:flex-start"><div class="score ${scoreClass(r.score)}">${r.score}%</div><div class="diff">${r.html}</div></div>
          <p class="muted" style="margin-top:8px">${esc(s.pt)}</p>
          <button class="btn primary block" id="nx">Próxima →</button>`;
        $('#check', box).disabled = true;
        $('#nx', box).onclick = () => { i = (i + 1) % order.length; draw(); };
        const d = day(); d.dict = (d.dict || 0) + 1; save();
        if (r.score >= 80) addXP(3);
        if (d.dict >= 5) markDaily('dictation');
      };
      $('#check', box).onclick = check;
      ans.onkeydown = e => { if (e.key === 'Enter' && (e.ctrlKey || e.metaKey)) { e.preventDefault(); check(); } };
    };
    draw();
  };

  /* =========================================================
     SIMULADOR DE ENTREVISTA
     ========================================================= */
  routes.entrevista = (el) => {
    let qi = 0;
    el.append(h(`<div><div class="eyebrow">Treino de fala sob pressão</div><h1>Simulador de entrevista</h1>
      <p class="lead">As 15 perguntas mais comuns em entrevistas nos EUA. Ouça a pergunta, responda falando e veja suas métricas. Meta: <b>90 a 120 segundos</b> e <b>110+ palavras por minuto</b>.</p></div>`));
    const box = h(`<div class="section"></div>`); el.append(box);
    const FILLERS = ['um', 'uh', 'er', 'like', 'you know', 'basically', 'actually', 'i mean', 'kind of'];
    const draw = (autoplay) => {
      const q = INTERVIEW[qi];
      const hist = S.interview[qi];
      box.innerHTML = `
        <div class="row" style="margin-bottom:12px;flex-wrap:nowrap">
          <select class="input" id="qsel" style="flex:1;min-width:0">${INTERVIEW.map((x, k) => `<option value="${k}" ${k === qi ? 'selected' : ''}>${k + 1}. ${esc(x.q)}${S.interview[k] ? ' ✓' : ''}</option>`).join('')}</select>
          <button class="btn" id="rnd" aria-label="Pergunta aleatória">🎲</button>
        </div>
        <div class="grid grid-2">
          <div class="card">
            <div class="eyebrow">Interviewer</div>
            <div class="big-sentence">“${esc(q.q)}”</div>
            <p class="muted">${esc(q.pt)}</p>
            <button class="btn dark" data-say="${esc(q.q)}">▶ Ouvir pergunta</button>
            <hr>
            <div class="row"><div class="timer" id="tm">0:00</div><span class="spacer"></span><span class="small muted">${hist ? `Treinada ${hist.times}x · última: ${hist.words} palavras` : 'Ainda não treinada'}</span></div>
            <div class="rec-slot" style="margin-top:10px"></div>
            <div class="metrics" id="mt" style="margin-top:12px" hidden></div>
            <div id="fl" class="small" style="margin-top:8px"></div>
          </div>
          <div class="card">
            <h3>Como responder bem</h3>
            <ul class="list-plain">${q.tips.map(t => `<li>${esc(t)}</li>`).join('')}</ul>
            <details class="model"><summary>Autoavaliação</summary><div class="small" style="margin-top:8px">${['Respondi exatamente o que foi perguntado', 'Dei um exemplo concreto', 'Usei números ou resultados', 'Terminei conectando com a vaga', 'Não travei mais de 3 segundos'].map(t => `<label style="display:flex;gap:8px;margin:8px 0"><input type="checkbox"> ${t}</label>`).join('')}</div></details>
            <details class="model"><summary>Ver resposta modelo</summary><p>${esc(q.model)}</p>
              <div class="row">${sayBtn(q.model)}${sayBtn(q.model, true)}</div>
              <p class="small muted" style="margin-top:8px">Não decore o modelo. Use a estrutura e troque pelas suas experiências reais.</p></details>
          </div>
        </div>`;
      $('#qsel', box).onchange = e => { qi = +e.target.value; draw(true); };
      $('#rnd', box).onclick = () => { let n; do { n = Math.floor(Math.random() * INTERVIEW.length); } while (n === qi && INTERVIEW.length > 1); qi = n; draw(true); };
      const tm = $('#tm', box); let t0 = 0, tick = null;
      const rec = recorder({
        continuous: true, label: '🎤 Responder',
        onStart: () => { t0 = Date.now(); clearInterval(tick); tick = setInterval(() => { tm.textContent = fmt((Date.now() - t0) / 1000); }, 250); },
        onDone: (text, secs) => {
          clearInterval(tick); tm.textContent = secs == null ? '—' : fmt(secs);
          const words = text ? text.split(/\s+/).length : 0;
          const wpm = secs > 5 ? Math.round(words / secs * 60) : null;
          const low = ' ' + text.toLowerCase() + ' ';
          const fills = FILLERS.map(f => [f, (low.match(new RegExp(`\\b${f}\\b`, 'g')) || []).length]).filter(x => x[1] > 0);
          const m = $('#mt', box); m.hidden = false;
          m.innerHTML = `<div class="metric"><b>${secs == null ? '—' : fmt(secs)}</b><span>${secs == null ? 'duração' : secs < 45 ? 'curta' : secs > 150 ? 'longa' : 'boa duração'}</span></div>
            <div class="metric"><b>${words}</b><span>palavras</span></div>
            <div class="metric"><b style="color:var(${wpm == null ? '--ink' : wpm >= 110 ? '--green' : wpm >= 80 ? '--yellow' : '--red'})">${wpm == null ? '—' : wpm}</b><span>palavras/min</span></div>`;
          $('#fl', box).innerHTML = fills.length ? `Vícios de linguagem: ${fills.map(([f, n]) => `<span class="badge red">${f} ×${n}</span>`).join(' ')}` : (words ? '<span class="badge green">Sem vícios de linguagem detectados</span>' : '');
          if (words >= 30) {
            const hst = S.interview[qi] || { times: 0 }; S.interview[qi] = { times: hst.times + 1, words, wpm, date: todayKey() }; save();
            addXP(15); markDaily('speak');
          } else if (words) toast('Resposta curta. Tente passar de 80 palavras.');
        }
      });
      onCleanup(() => clearInterval(tick));
      $('.rec-slot', box).append(rec);
      if (autoplay) TTS.speak(q.q);
    };
    draw(false);
  };

  /* =========================================================
     ESCRITA
     ========================================================= */
  routes.escrita = (el) => {
    let pi = seeded(WRITING_PROMPTS.length);
    el.append(h(`<div><div class="eyebrow">Diário de escrita</div><h1>Escrita</h1>
      <p class="lead">Escrever organiza o pensamento e prepara a fala. Escreva 5 a 8 frases e use IA como corretora com o botão abaixo.</p></div>`));
    const box = h(`<div class="section"></div>`); el.append(box);
    const draw = () => {
      const p = WRITING_PROMPTS[pi];
      box.innerHTML = `
        <div class="card">
          <div class="row"><div class="eyebrow" style="margin:0">Tema de hoje</div><span class="spacer"></span><button class="btn sm ghost" id="other">Outro tema ↻</button></div>
          <div class="big-sentence">${esc(p)}</div>
          <textarea class="input" id="txt" placeholder="Write here… Não traduza do português: combine frases que você já conhece."></textarea>
          <div class="small muted" id="wc" style="margin-top:6px">0 palavras</div>
          <div class="grid grid-2" style="gap:8px;margin-top:10px"><button class="btn" id="copy">📋 Copiar para correção com IA</button><button class="btn primary" id="save">Salvar no diário</button></div>
          <textarea class="input" id="copyBox" readonly hidden style="margin-top:10px;min-height:120px;font-size:.85rem"></textarea>
        </div>
        <div class="card"><h3>Checklist antes de salvar</h3><ul class="list-plain small">
          <li>Tempos verbais certos (present perfect para experiência, past simple para datas)?</li>
          <li><b>-s</b> na 3ª pessoa (he works, it depends)?</li>
          <li>Sem falsos cognatos (actually, pretend, eventually)?</li>
          <li>Usei 2 frases-chave da unidade da semana?</li></ul></div>
        <div class="card"><h3>Entradas anteriores</h3><div id="hist">${S.journal.length ? '' : '<p class="muted small">Nenhuma entrada ainda.</p>'}</div></div>`;
      const txt = $('#txt', box);
      try { txt.value = localStorage.getItem('fluent90.draft') || ''; } catch (e) { }
      const wc = () => { const n = txt.value.trim() ? txt.value.trim().split(/\s+/).length : 0; $('#wc', box).textContent = `${n} palavras`; return n; };
      wc();
      txt.oninput = () => { wc(); try { localStorage.setItem('fluent90.draft', txt.value); } catch (e) { } };
      $('#other', box).onclick = () => { pi = (pi + 1) % WRITING_PROMPTS.length; draw(); };
      $('#copy', box).onclick = () => {
        if (!txt.value.trim()) { toast('Escreva algo primeiro.'); return; }
        const prompt = `Você é meu professor de inglês, nativo americano, especialista em inglês corporativo. Corrija o texto abaixo:\n1) Reescreva a versão corrigida e natural, como um nativo escreveria no trabalho.\n2) Liste cada erro com uma explicação curta em português.\n3) Sugira 3 expressões mais naturais que eu poderia ter usado.\n4) Dê uma nota de 0 a 10 e estime meu nível (CEFR).\n\nTema: ${p}\n\nMeu texto:\n${txt.value.trim()}`;
        const cb = $('#copyBox', box); cb.value = prompt;
        copyText(prompt, cb);
      };
      $('#save', box).onclick = () => {
        const n = wc(); if (n < 10) { toast('Escreva pelo menos 10 palavras.'); return; }
        S.journal.unshift({ date: todayKey(), at: Date.now(), prompt: p, text: txt.value.trim(), words: n });
        S.journal = S.journal.slice(0, 60); save();
        try { localStorage.removeItem('fluent90.draft'); } catch (e) { }
        addXP(n >= 40 ? 15 : 5); if (n >= 40) markDaily('writing'); else toast('Salvo! Com 40+ palavras a tarefa do dia é concluída.');
        draw();
      };
      const hist = $('#hist', box);
      S.journal.slice(0, 20).forEach(j => hist.append(h(`<details class="model"><summary>${j.date.split('-').reverse().join('/')} · ${esc(j.prompt)} <span class="muted small">(${j.words} palavras)</span></summary><p style="white-space:pre-wrap">${esc(j.text)}</p></details>`)));
    };
    draw();
  };

  /* =========================================================
     ERROS DE BRASILEIRO
     ========================================================= */
  routes.erros = (el) => {
    let quiz = false;
    el.append(h(`<div><div class="eyebrow">O que entrega que você é brasileiro</div><h1>Erros clássicos</h1>
      <p class="lead">Estes ${MISTAKES.length} erros aparecem em quase toda entrevista com brasileiros. Corrigi-los muda na hora a impressão que você causa.</p></div>`));
    const box = h(`<div class="section"></div>`); el.append(box);
    const draw = () => {
      box.innerHTML = `<div class="tabs"><button class="tab ${!quiz ? 'active' : ''}" data-m="0">Estudar</button><button class="tab ${quiz ? 'active' : ''}" data-m="1">Quiz: corrija o erro</button></div><div class="list"></div>`;
      $$('[data-m]', box).forEach(b => b.onclick = () => { quiz = b.dataset.m === '1'; draw(); });
      const list = $('.list', box);
      (quiz ? shuffle(MISTAKES) : MISTAKES).forEach(m => {
        const c = h(`<div class="card">
          <div class="mistake"><div class="w">${esc(m.wrong)}</div><div class="r" ${quiz ? 'hidden' : ''}>${esc(m.right)}</div></div>
          <div class="why small muted" style="margin-top:8px" ${quiz ? 'hidden' : ''}>${esc(m.why)}</div>
          <div class="row" style="margin-top:10px">${quiz ? '<button class="btn sm reveal">Pensei na correção. Mostrar</button>' : ''}${sayBtn(m.right.split(' / ')[0].replace(/\(.*?\)/g, ''))}<span class="small muted">ouvir a forma correta</span></div></div>`);
        const rv = $('.reveal', c);
        if (rv) rv.onclick = () => { $('.r', c).hidden = false; $('.why', c).hidden = false; rv.remove(); addXP(1); };
        list.append(c);
      });
    };
    draw();
  };

  /* =========================================================
     MÉTODO
     ========================================================= */
  routes.metodo = (el) => {
    const convoPrompt = `You are my American English conversation partner and job interview coach. I'm a Brazilian professional at about ${S.level || 'B1'} level preparing for job interviews in English.\n\nRules:\n- Ask me ONE interview question at a time and wait for my answer.\n- After each answer, give me: (1) a corrected, more natural version of what I said, (2) up to 3 key mistakes explained briefly in Portuguese, (3) one follow-up question like a real interviewer would ask.\n- Keep your language natural, like a real American recruiter.\n- Start by asking me to introduce myself.`;
    el.append(h(`<div>
      <div class="eyebrow">Como você vai ficar fluente</div><h1>Método e imersão</h1>
      <p class="lead">Fluência é uma <b>habilidade</b>, não um conhecimento. Ninguém aprende a nadar lendo sobre natação. Este sistema combina os pilares com mais evidência de resultado para adultos.</p>

      <div class="grid grid-3 section">
        <div class="card"><h3>Input compreensível</h3><p class="small" style="margin:0">Ouvir e ler muito conteúdo que você entende 70–80%. É assim que o cérebro absorve estruturas sem decorar regras.</p></div>
        <div class="card"><h3>Recordação ativa</h3><p class="small" style="margin:0">Tentar lembrar (flashcards PT→EN) fixa muito mais que reler. O esforço de buscar a palavra cria a memória.</p></div>
        <div class="card"><h3>Repetição espaçada</h3><p class="small" style="margin:0">Rever no momento certo, logo antes de esquecer. O algoritmo dos flashcards faz isso por você.</p></div>
        <div class="card"><h3>Output (fala)</h3><p class="small" style="margin:0">Falar em voz alta todo dia transforma conhecimento passivo em automático. É a parte que a maioria pula, e por isso trava.</p></div>
        <div class="card"><h3>Feedback</h3><p class="small" style="margin:0">Gravar-se, comparar com o modelo e receber correção. Sem feedback, você reforça os próprios erros.</p></div>
        <div class="card"><h3>Consistência</h3><p class="small" style="margin:0">60 minutos todos os dias superam 7 horas no fim de semana. A sequência (🔥) existe para te manter no jogo.</p></div>
      </div>

      <div class="card section"><h2>Escolha sua rotina</h2>
        <div class="grid grid-3">
          <div><span class="badge">Essencial · 30 min</span><ul class="list-plain small" style="margin-top:10px"><li>10 min flashcards</li><li>10 min aula</li><li>5 min shadowing</li><li>5 min fala (entrevista)</li><li>+ áudio em inglês no trajeto</li></ul></div>
          <div><span class="badge accent">Recomendado · 60 min</span><ul class="list-plain small" style="margin-top:10px"><li>15 min flashcards</li><li>15 min aula</li><li>10 min shadowing</li><li>5 min ditado</li><li>10 min fala</li><li>5 min escrita</li><li>+ 20 min de imersão</li></ul></div>
          <div><span class="badge green">Intensivo · 2h+</span><ul class="list-plain small" style="margin-top:10px"><li>Rotina de 60 min</li><li>+ 30 min de série/podcast sem legenda em PT</li><li>+ 20 min de conversa com IA ou nativo</li><li>+ 10 min de revisão do “caderno de lacunas”</li></ul></div>
        </div>
        <p class="small muted" style="margin:12px 0 0">No celular: divida o treino ao longo do dia. Flashcards na fila, shadowing com fone no trajeto, entrevista à noite.</p>
      </div>

      <div class="card section"><h2>Imersão sem sair do Brasil</h2>
        <div class="grid grid-2">
          <div><h3>Mude seu ambiente hoje</h3><ul class="list-plain small">
            <li>Celular, computador e redes sociais em inglês.</li>
            <li>Adicione o inglês ao teclado do celular para usar o ditado em inglês.</li>
            <li>Perfil do LinkedIn em inglês (recrutadores estrangeiros buscam assim).</li>
            <li><b>Self-talk:</b> narre seu dia em voz alta em inglês (“Now I'm making coffee…”).</li>
            <li><b>Caderno de lacunas:</b> anote toda frase que quis dizer e não soube. Pesquise e vire flashcard.</li></ul></div>
          <div><h3>O que ouvir e assistir</h3><ul class="list-plain small">
            <li><b>B1:</b> BBC Learning English (6 Minute English), Friends, vídeos curtos com legenda em inglês.</li>
            <li><b>B1–B2:</b> All Ears English, Business English Pod, Speak English With Vanessa, The Office (US).</li>
            <li><b>B2–C1:</b> TED Talks, HBR IdeaCast, The Indicator (Planet Money), Suits, Ted Lasso.</li>
            <li><b>Pronúncia americana:</b> Rachel's English; YouGlish para ouvir qualquer palavra em contexto real.</li>
            <li>Regra: legenda em <b>inglês</b>, nunca em português.</li></ul></div>
        </div>
      </div>

      <div class="card section"><h2>Pratique conversação com IA</h2>
        <p class="small">Cole este prompt no app do Claude no celular e use o <b>modo de voz</b> para simular entrevistas com correção. Ele já está ajustado para o seu nível${S.level ? ` (${S.level})` : ''}.</p>
        <textarea class="input" id="cpBox" readonly style="min-height:170px;font-size:.85rem">${esc(convoPrompt)}</textarea>
        <button class="btn primary block" id="cp" style="margin-top:10px">📋 Copiar prompt</button>
      </div>

      <div class="card section"><h2>Marcos dos 90 dias</h2>
        <div class="week"><div class="wk">Dia 30</div><div><b>Falar de você e do seu trabalho por 3 minutos sem travar.</b><div class="small muted">Teste: grave “Tell me about yourself” + “Describe your current role”.</div></div><span></span></div>
        <div class="week"><div class="wk">Dia 60</div><div><b>Participar de uma reunião simulada e escrever e-mails sem tradutor.</b><div class="small muted">Teste: simulação com IA de uma reunião de 10 minutos.</div></div><span></span></div>
        <div class="week"><div class="wk">Dia 90</div><div><b>Entrevista completa de 20 minutos, gravada.</b><div class="small muted">Teste: as 15 perguntas do simulador, em sequência, sem consultar nada.</div></div><span></span></div>
      </div>
    </div>`));
    $('#cp', el).onclick = () => copyText(convoPrompt, $('#cpBox', el));
  };

  /* =========================================================
     PROGRESSO / PERFIL
     ========================================================= */
  routes.progresso = (el) => {
    const cardsArr = Object.values(S.cards);
    const learned = cardsArr.filter(c => c.reps > 0).length;
    const mature = cardsArr.filter(c => c.ivl >= 21).length;
    const interviews = Object.values(S.interview).reduce((a, x) => a + x.times, 0);
    const daysActive = Object.values(S.days).filter(d => d.xp > 0).length;

    const t = todayKey(); const dow = new Date(t + 'T12:00:00').getDay();
    const start = addDays(t, -(11 * 7 + dow));
    let cols = '';
    for (let w = 0; w < 12; w++) {
      let cells = '';
      for (let d = 0; d < 7; d++) {
        const k = addDays(start, w * 7 + d); const xp = (S.days[k] || {}).xp || 0;
        const l = k > t || xp === 0 ? '' : xp < 30 ? 'l1' : xp < 80 ? 'l2' : 'l3';
        cells += `<div class="heat-cell ${l}" title="${k.split('-').reverse().join('/')}: ${xp} XP" style="${k > t ? 'opacity:.3' : ''}"></div>`;
      }
      cols += `<div class="heat-col">${cells}</div>`;
    }

    const voices = TTS.voices;
    const cur = TTS.pick();
    const voiceOpts = [];
    if (TTS.cloud) [['airy', 'leve e arejada'], ['buttery', 'suave e calorosa'], ['glassy', 'clara e nítida'], ['rounded', 'encorpada']]
      .forEach(([k, d]) => voiceOpts.push({ id: 'claude:' + k, name: 'Claude · ' + k[0].toUpperCase() + k.slice(1), desc: 'Voz neural do Claude, ' + d }));
    TTS.femaleVoices().slice(0, 6).forEach(v => voiceOpts.push({
      id: v.name,
      name: v.name.replace(/Microsoft |Online |\(Natural\)|\(Enhanced\)|\(Premium\)| - English \(United States\)/g, '').trim() || v.name,
      desc: `${v.lang}${TTS.rank(v) <= 2 ? ' · natural, alta qualidade' : ''} · do aparelho`
    }));
    const curVoice = S.settings.voice && (voiceOpts.some(o => o.id === S.settings.voice) || voices.some(v => v.name === S.settings.voice)) ? S.settings.voice : (cur ? cur.name : '');
    const syncText = {
      synced: 'Seu progresso está salvo na sua conta e aparece igual no celular e no computador, desde que você abra este mesmo link.',
      saving: 'Salvando na sua conta…', connecting: 'Conectando à sua conta…',
      offline: 'Sem conexão agora. O progresso fica neste aparelho e sincroniza quando a internet voltar.',
      local: IN_FRAME ? 'Entre na sua conta do Claude para sincronizar entre aparelhos.' : 'Esta é a versão local: o progresso fica só neste navegador. Para usar no celular com sincronização, abra o link do app no claude.ai.'
    }[Sync.status];

    el.append(h(`<div>
      <div class="eyebrow">Sua evolução</div><h1>Progresso</h1>
      <div class="grid grid-4 section">
        <div class="card stat"><div class="num">${S.level || '—'}</div><div class="lbl">nível</div></div>
        <div class="card stat"><div class="num">🔥 ${streak()}</div><div class="lbl">sequência · ${daysActive} dias ativos</div></div>
        <div class="card stat"><div class="num">${totalXP()}</div><div class="lbl">XP total</div></div>
        <div class="card stat"><div class="num">${unitsDone()}/12</div><div class="lbl">unidades</div></div>
        <div class="card stat"><div class="num">${learned}</div><div class="lbl">cartões aprendidos</div></div>
        <div class="card stat"><div class="num">${mature}</div><div class="lbl">memória longa (21d+)</div></div>
        <div class="card stat"><div class="num">${interviews}</div><div class="lbl">respostas de entrevista</div></div>
        <div class="card stat"><div class="num">${S.journal.length}</div><div class="lbl">textos escritos</div></div>
      </div>
      <div class="card section"><div class="row"><h2 style="margin:0">Sincronização</h2><span class="spacer"></span><span class="sync"></span></div><p class="small" style="margin:8px 0 0">${syncText}</p></div>
      <div class="card section"><h2>Últimas 12 semanas</h2><div class="heat">${cols}</div>
        <div class="row small muted" style="margin-top:10px;gap:4px">Menos <span class="heat-cell" style="width:14px"></span><span class="heat-cell l1" style="width:14px"></span><span class="heat-cell l2" style="width:14px"></span><span class="heat-cell l3" style="width:14px"></span> Mais</div></div>
      <div class="card section"><h2>Unidades</h2>${UNITS.map(u => `<a class="row" href="#aula-${u.id}" style="margin:0;padding:8px 0;color:inherit;flex-wrap:nowrap;border-bottom:1px solid var(--line)"><span style="width:24px" class="muted">${u.id}</span><span style="flex:1;min-width:0">${esc(u.titlePt)}</span>
        <span class="small muted">${S.exScores[u.id] != null ? `${S.exScores[u.id]}%` : ''}</span>
        ${S.units[u.id] && S.units[u.id].done ? '<span class="badge green">✓</span>' : '<span class="badge">—</span>'}</a>`).join('')}</div>

      <div class="card section" id="voiceCard"><h2>Voz da professora</h2>
        <p class="small muted" style="margin-top:-4px">Toque em ▶ para ouvir cada voz e escolha a que soar mais natural para você. As opções dependem do aparelho e do navegador.</p>
        <div id="voiceList">${voiceOpts.length ? voiceOpts.map(o => `
          <label class="voice-opt"><input type="radio" name="voice" value="${esc(o.id)}" ${o.id === curVoice ? 'checked' : ''}>
            <span class="vo-txt"><b>${esc(o.name)}</b><span class="small muted">${esc(o.desc)}</span></span>
            <button class="icon-btn" type="button" data-preview="${esc(o.id)}" aria-label="Ouvir ${esc(o.name)}">▶</button></label>`).join('')
        : '<p class="small muted">Carregando as vozes do aparelho…</p>'}</div>
        ${voices.length > voiceOpts.length ? `<details class="model"><summary>Outras vozes em inglês</summary>
          <select class="input" id="voiceAll" style="width:100%;margin-top:10px"><option value="">Escolher…</option>${voices.map(v => `<option value="${esc(v.name)}" ${S.settings.voice === v.name ? 'selected' : ''}>${esc(v.name)} (${v.lang})</option>`).join('')}</select></details>` : ''}
        <div class="grid grid-2" style="margin-top:14px">
          <label>Velocidade: <b id="rv">${S.settings.rate}</b><input type="range" id="rate" min="0.6" max="1.2" step="0.05" value="${S.settings.rate}" style="width:100%;margin-top:10px"></label>
          <label ${String(curVoice).startsWith('claude:') ? 'hidden' : ''}>Tom (mais grave ↔ mais jovem): <b id="pv">${S.settings.pitch}</b><input type="range" id="pitch" min="0.9" max="1.3" step="0.02" value="${S.settings.pitch}" style="width:100%;margin-top:10px"></label>
        </div>
        <button class="btn sm" id="test" style="margin-top:10px">▶ Testar com as configurações atuais</button>
      </div>

      <div class="card section"><h2>Configurações</h2>
        <div class="grid grid-2">
          <label>Novos flashcards por dia<input class="input" type="number" inputmode="numeric" id="npd" min="0" max="60" value="${S.settings.newPerDay}" style="width:120px;margin-top:4px;display:block"></label>
          <label>Tema<select class="input" id="theme" style="margin-top:4px;display:block">
            <option value="auto" ${S.settings.theme === 'auto' ? 'selected' : ''}>Automático</option>
            <option value="light" ${S.settings.theme === 'light' ? 'selected' : ''}>Claro</option>
            <option value="dark" ${S.settings.theme === 'dark' ? 'selected' : ''}>Escuro</option></select></label>
        </div>
      </div>

      <div class="card section"><h2>Seus dados</h2>
        <p class="small muted">Faça um backup de vez em quando ou leve seu progresso da versão local para a versão online.</p>
        <div class="row"><button class="btn" id="exp">⬇ Exportar</button><label class="btn">⬆ Importar<input type="file" id="imp" accept="application/json,.json" hidden></label><span class="spacer"></span><button class="btn ghost" id="reset" style="color:var(--red)">Apagar tudo</button></div>
      </div>
    </div>`));
    renderSyncBadge();

    const SAMPLE = "Hi! I'm your English teacher. Let's practice together every day. You're doing great!";
    const preview = id => { const prev = S.settings.voice; S.settings.voice = id; TTS.speak(SAMPLE); S.settings.voice = prev; };
    $$('[data-preview]', el).forEach(b => b.onclick = e => { e.preventDefault(); e.stopPropagation(); preview(b.dataset.preview); });
    $$('input[name=voice]', el).forEach(r => r.onchange = () => { S.settings.voice = r.value; save(); TTS.speak(SAMPLE); render(); setTimeout(() => { const c = $('#voiceCard'); if (c) c.scrollIntoView({ block: 'start' }); }, 0); });
    const va = $('#voiceAll', el);
    if (va) va.onchange = () => { if (!va.value) return; S.settings.voice = va.value; save(); TTS.speak(SAMPLE); };
    $('#rate', el).oninput = e => { S.settings.rate = +e.target.value; $('#rv', el).textContent = S.settings.rate; save(); };
    $('#pitch', el).oninput = e => { S.settings.pitch = +e.target.value; $('#pv', el).textContent = S.settings.pitch; save(); };
    $('#test', el).onclick = e => { e.preventDefault(); TTS.speak(SAMPLE); };
    $('#npd', el).onchange = e => { S.settings.newPerDay = Math.max(0, Math.min(60, +e.target.value || 0)); save(); };
    $('#theme', el).onchange = e => { S.settings.theme = e.target.value; save(); applyTheme(); };
    $('#exp', el).onclick = async () => {
      const data = JSON.stringify(S, null, 2), filename = `fluent90-progresso-${todayKey()}.json`;
      if (IN_FRAME) {
        const dl = await useCap('downloads');
        if (!dl) { toast('Download indisponível aqui.'); return; }
        try { await dl.save({ filename, data }); } catch (e) { if (e && e.code !== 'declined') toast('Não foi possível salvar o arquivo.'); }
        return;
      }
      const a = document.createElement('a'); a.href = URL.createObjectURL(new Blob([data], { type: 'application/json' })); a.download = filename; a.click();
      setTimeout(() => URL.revokeObjectURL(a.href), 1000);
    };
    $('#imp', el).onchange = e => {
      const f = e.target.files[0]; if (!f) return;
      const r = new FileReader();
      r.onload = () => {
        try {
          const d = JSON.parse(r.result); if (!d || typeof d !== 'object' || !d.days) throw 0;
          const base = Object.assign(defaults(), d); base.settings = S.settings; base.resetAt = S.resetAt;
          S = mergeState(S, base); save(); toast('Progresso importado!'); render();
        } catch (err) { toast('Arquivo inválido.'); }
      };
      r.readAsText(f);
    };
    const rb = $('#reset', el); let armed = null;
    rb.onclick = () => {
      if (!armed) { rb.textContent = 'Toque de novo para confirmar'; armed = setTimeout(() => { armed = null; rb.textContent = 'Apagar tudo'; }, 4000); return; }
      clearTimeout(armed);
      const keep = S.settings; S = defaults(); S.settings = keep; S.resetAt = Date.now(); save(); render(); toast('Progresso apagado.');
    };
  };

  /* ---------------- init ---------------- */
  load();
  applyTheme();
  renderShell();
  TTS.init();
  document.addEventListener('click', e => {
    const b = e.target.closest('[data-say]');
    if (b) { e.preventDefault(); TTS.speak(b.dataset.say, b.dataset.rate ? +b.dataset.rate : undefined); }
  });
  window.addEventListener('hashchange', render);
  if (!location.hash || location.hash.startsWith('#/')) {
    const [n, a] = parseHash();
    const target = '#' + (n || 'inicio') + (a ? '-' + a : '');
    try { history.replaceState(null, '', target); } catch (e) { location.hash = target; }
  }
  render();
  Voice.init();
  Sync.init();
})();
