// Existing site navigation and footer year.
const menuButton = document.querySelector('.menubtn');
const nav = document.querySelector('nav');
if (menuButton && nav) menuButton.addEventListener('click', () => nav.classList.toggle('open'));
document.querySelectorAll('nav a').forEach((link) => link.addEventListener('click', () => nav?.classList.remove('open')));
const year = document.getElementById('year');
if (year) year.textContent = new Date().getFullYear();

(() => {
  'use strict';
  // Pages is static: use only facts present in the current site's published content.
  // No API key, fabricated model call, or claim of a disconnected AI service.
  const start = () => {
    if (document.getElementById('uydnetVirtualAssistant')) return;
    // Replace the previous placeholder widget, preventing duplicate assistant UIs.
    document.getElementById('uydnetAI')?.remove();
    document.getElementById('uydnetAiButton')?.remove();
    document.querySelectorAll('link[rel="stylesheet"]').forEach((link) => {
      if (/styles\.css(?:\?|$)/.test(link.href)) {
        const assistantCss = document.createElement('link');
        assistantCss.rel = 'stylesheet';
        assistantCss.href = new URL('assistant.css', link.href).href;
        document.head.append(assistantCss);
      }
    });

    const icon = '<svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M12 3.2 14 8l4.8 2-4.8 2-2 4.8L10 12l-4.8-2L10 8l2-4.8Z" stroke="currentColor" stroke-width="1.7" stroke-linejoin="round"/><path d="m18.7 15 .9 2.2 2.2.9-2.2.9-.9 2.2-.9-2.2-2.2-.9 2.2-.9.9-2.2Z" fill="currentColor"/></svg>';
    const panel = document.createElement('section');
    panel.id = 'uydnetVirtualAssistant';
    panel.className = 'uydnet-va-panel';
    panel.setAttribute('role', 'dialog');
    panel.setAttribute('aria-label', 'UYDNet Virtual Assistant');
    panel.setAttribute('aria-modal', 'false');
    panel.innerHTML = `
      <header class="uydnet-va-head" data-va-drag>
        <div class="uydnet-va-avatar">${icon}</div>
        <div class="uydnet-va-title"><strong>UYDNet Virtual Assistant</strong><span>Website information · English</span></div>
        <div class="uydnet-va-head-actions">
          <button class="uydnet-va-icon" type="button" data-action="minimize" aria-label="Minimise assistant" title="Minimise"><svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M5 12h14" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg></button>
          <button class="uydnet-va-icon" type="button" data-action="close" aria-label="Close assistant" title="Close">×</button>
        </div>
      </header>
      <div class="uydnet-va-toolbar"><small>Answers are grounded in information on this website.</small><button type="button" data-action="clear">Clear chat</button></div>
      <div class="uydnet-va-messages" role="log" aria-live="polite" aria-relevant="additions text"></div>
      <div class="uydnet-va-live" aria-live="polite"></div>
      <div class="uydnet-va-composer">
        <div class="uydnet-va-controls">
          <textarea class="uydnet-va-input" rows="1" aria-label="Your message" placeholder="Ask about UYDNet…"></textarea>
          <button class="uydnet-va-icon uydnet-va-mic" type="button" data-action="mic" aria-label="Start voice input" title="Speak a question"><svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><rect x="9" y="3" width="6" height="12" rx="3" stroke="currentColor" stroke-width="1.8"/><path d="M5.5 11.5a6.5 6.5 0 0 0 13 0M12 18v3m-4 0h8" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/></svg></button>
          <button class="uydnet-va-send" type="button" data-action="send" aria-label="Send message" title="Send"><svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="m4 4 17 8-17 8 3-8-3-8Z" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round"/><path d="M7 12h14" stroke="currentColor" stroke-width="1.8"/></svg></button>
        </div>
        <div class="uydnet-va-voicebar"><label><input type="checkbox" data-action="voice-mode"> Read replies aloud</label><span class="spacer"></span><button type="button" data-action="stop-voice" aria-label="Stop spoken response">Stop voice</button></div>
      </div>`;
    const launcher = document.createElement('button');
    launcher.className = 'uydnet-va-launcher';
    launcher.type = 'button';
    launcher.setAttribute('aria-label', 'Open UYDNet Virtual Assistant');
    launcher.setAttribute('aria-expanded', 'false');
    launcher.innerHTML = icon;
    document.body.append(panel, launcher);

    const messages = panel.querySelector('.uydnet-va-messages');
    const input = panel.querySelector('.uydnet-va-input');
    const live = panel.querySelector('.uydnet-va-live');
    const mic = panel.querySelector('[data-action="mic"]');
    const voiceMode = panel.querySelector('[data-action="voice-mode"]');
    const recognitionApi = window.SpeechRecognition || window.webkitSpeechRecognition;
    let recognition = null;
    let listening = false;
    let drag = null;
    let lastBotText = '';
    let previousQuestion = '';
    let isOpen = false;
    const suggestions = ['What is UYDNet?', 'How can I become a member?', 'What programmes does UYDNet offer?', 'How can I support UYDNet?', 'How can I become a partner?', 'How can I volunteer?'];
    const routeHints = [
      { terms: ['membership', 'join', 'register', 'registration'], id: 'membership', label: 'Membership' },
      { terms: ['programme', 'program', 'activity', 'activities'], id: 'programs', label: 'Programs & Activities' },
      { terms: ['partner', 'partnership'], id: 'partner', label: 'Become a Partner' },
      { terms: ['donat', 'support', 'contribution'], id: 'support', label: 'Support UYDNet' },
      { terms: ['leadership', 'leader', 'governance', 'constitution', 'rules'], id: 'leadership', label: 'Leadership & governance' },
      { terms: ['contact', 'phone', 'email', 'reach'], id: 'contact', label: 'Contact UYDNet' },
      { terms: ['objective', 'mission', 'vision', 'identity', 'history'], id: 'identity', label: 'About UYDNet' },
      { terms: ['health', 'education', 'youth', 'community', 'skill', 'volunteer', 'opportunit'], id: 'objectives', label: 'Objectives & focus areas' },
      { terms: ['news', 'announcement'], id: 'news', label: 'News & Activities' }
    ];
    function addLinks(container, question) {
      const lower = question.toLowerCase();
      const found = routeHints.filter((hint) => hint.terms.some((term) => lower.includes(term)) && document.getElementById(hint.id));
      if (!found.length) return;
      const links = document.createElement('div'); links.className = 'uydnet-va-links';
      found.slice(0, 2).forEach((hint) => { const a = document.createElement('a'); a.href = `#${hint.id}`; a.textContent = `Go to ${hint.label} →`; links.append(a); });
      container.append(links);
    }
    function addMessage(text, who, question = '') {
      const row = document.createElement('div'); row.className = `uydnet-va-row ${who}`;
      const bubble = document.createElement('div'); bubble.className = 'uydnet-va-bubble';
      const body = document.createElement('div'); body.textContent = text; bubble.append(body);
      if (who === 'assistant') {
        const meta = document.createElement('div'); meta.className = 'uydnet-va-meta';
        const time = document.createElement('time'); time.dateTime = new Date().toISOString(); time.textContent = new Intl.DateTimeFormat(undefined, { hour: 'numeric', minute: '2-digit' }).format(new Date());
        const copy = document.createElement('button'); copy.type = 'button'; copy.textContent = 'Copy'; copy.setAttribute('aria-label', 'Copy assistant response');
        copy.addEventListener('click', async () => { try { await navigator.clipboard.writeText(text); copy.textContent = 'Copied'; setTimeout(() => { copy.textContent = 'Copy'; }, 1400); } catch { live.textContent = 'Copy is unavailable in this browser.'; } });
        meta.append(time, copy); bubble.append(meta); addLinks(bubble, question);
      }
      row.append(bubble); messages.append(row); messages.scrollTop = messages.scrollHeight; return row;
    }
    function addSuggestions() {
      const wrap = document.createElement('div'); wrap.className = 'uydnet-va-suggestions';
      suggestions.forEach((question) => { const button = document.createElement('button'); button.type = 'button'; button.textContent = question; button.addEventListener('click', () => { input.value = question; send(); }); wrap.append(button); });
      messages.append(wrap);
    }
    function welcome() {
      messages.replaceChildren();
      addMessage('Hello! I’m the UYDNet Virtual Assistant. I can help you explore the information published on this website, including our mission, focus areas, membership, partnerships and ways to get involved. What would you like to know?', 'assistant');
      addSuggestions();
    }
    function makeKnowledgeIndex() {
      return [...document.querySelectorAll('main section, main article, body > section')]
        .filter((section) => !section.closest('#uydnetVirtualAssistant'))
        .map((section) => ({ id: section.id, title: section.querySelector('h1,h2,h3')?.textContent?.trim() || '', text: (section.innerText || section.textContent || '').replace(/\s+/g, ' ').trim() }))
        .filter((entry) => entry.text.length > 25);
    }
    function answerQuestion(question) {
      const cleaned = question.trim();
      const previous = previousQuestion ? ` Earlier topic in this conversation: “${previousQuestion}”.` : '';
      previousQuestion = cleaned;
      const lower = cleaned.toLowerCase();
      if (/\b(hi|hello|hey|good morning|good afternoon)\b/.test(lower)) return 'Hello! I’m here to help you find information about UYDNet. You can ask about our work, membership, programmes, partnerships or support.';
      const index = makeKnowledgeIndex();
      const words = lower.match(/[a-z]{3,}/g) || [];
      const stop = new Set(['what','where','when','which','does','your','about','with','from','that','this','there','have','tell','please','could','would','should','how','who','why','can','the','and','for','are','you','our']);
      const terms = [...new Set(words.filter((word) => !stop.has(word)))];
      const scored = index.map((entry) => {
        const text = `${entry.title} ${entry.text}`.toLowerCase();
        const score = terms.reduce((sum, term) => sum + (text.includes(term) ? (entry.title.toLowerCase().includes(term) ? 4 : 1) : 0), 0);
        return { ...entry, score };
      }).filter((entry) => entry.score > 0).sort((a, b) => b.score - a.score).slice(0, 2);
      if (!terms.length || !scored.length) {
        const contact = document.getElementById('contact');
        const email = contact?.querySelector('a[href^="mailto:"]')?.getAttribute('href')?.replace('mailto:', '');
        return `I couldn’t find a reliable answer to that in the information published on this website. I don’t want to guess. You can browse the relevant sections below${email ? ` or contact UYDNet at ${email}` : ''}.${previous}`;
      }
      const excerpts = scored.map((entry) => {
        let excerpt = entry.text;
        if (excerpt.length > 620) {
          const matchAt = terms.map((term) => excerpt.toLowerCase().indexOf(term)).filter((position) => position >= 0).sort((a,b) => a-b)[0] || 0;
          const begin = Math.max(0, matchAt - 100); excerpt = `${begin ? '…' : ''}${excerpt.slice(begin, begin + 620)}${begin + 620 < entry.text.length ? '…' : ''}`;
        }
        return `${entry.title ? `${entry.title}: ` : ''}${excerpt}`;
      });
      const direct = /\b(membership|member|join|register)\b/.test(lower) ? 'For the published membership steps and application form, open the Membership section. ' : /\b(program|programme|activity|activities)\b/.test(lower) ? 'Here is what the website currently says about UYDNet programmes and activities. ' : '';
      return `${direct}${excerpts.join('\n\n')}${previous}`;
    }
    function showTyping() {
      const row = document.createElement('div'); row.className = 'uydnet-va-row assistant'; row.dataset.typing = 'true';
      const dots = document.createElement('div'); dots.className = 'uydnet-va-typing'; dots.setAttribute('aria-label', 'Assistant is preparing a response'); dots.innerHTML = '<i></i><i></i><i></i>'; row.append(dots); messages.append(row); messages.scrollTop = messages.scrollHeight; return row;
    }
    function speak(text) {
      if (!('speechSynthesis' in window) || !voiceMode.checked) return;
      speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text); utterance.lang = document.documentElement.lang || 'en'; utterance.rate = 1; utterance.pitch = 1;
      speechSynthesis.speak(utterance);
    }
    function stopListening() {
      if (recognition && listening) recognition.stop();
      listening = false; mic.classList.remove('is-listening'); mic.setAttribute('aria-label', 'Start voice input');
      if (!live.textContent.startsWith('Microphone access')) live.textContent = '';
    }
    function stopAll() { stopListening(); if ('speechSynthesis' in window) speechSynthesis.cancel(); }
    function send() {
      const question = input.value.trim(); if (!question) return;
      stopListening(); if ('speechSynthesis' in window) speechSynthesis.cancel();
      messages.querySelector('.uydnet-va-suggestions')?.remove();
      addMessage(question, 'user'); input.value = ''; input.style.height = 'auto';
      const typing = showTyping(); live.textContent = 'Preparing an answer from UYDNet website content.';
      window.setTimeout(() => {
        typing.remove(); const response = answerQuestion(question); lastBotText = response;
        addMessage(response, 'assistant', question); live.textContent = 'Response based on information currently published on this website.'; speak(response);
      }, 420);
    }
    function open() {
      isOpen = true; panel.hidden = false; requestAnimationFrame(() => panel.classList.add('is-open'));
      launcher.setAttribute('aria-expanded', 'true'); launcher.style.display = 'none';
      if (!messages.children.length) welcome(); input.focus();
    }
    function close() {
      stopAll(); isOpen = false; panel.classList.remove('is-open'); launcher.style.display = 'grid'; launcher.setAttribute('aria-expanded', 'false');
      window.setTimeout(() => { if (!isOpen) panel.hidden = true; }, 220);
    }
    launcher.addEventListener('click', open);
    panel.addEventListener('click', (event) => {
      const action = event.target.closest('[data-action]')?.dataset.action;
      if (!action) return;
      if (action === 'close') close();
      if (action === 'minimize') { panel.classList.toggle('is-minimized'); panel.querySelector('[data-action="minimize"]').setAttribute('aria-label', panel.classList.contains('is-minimized') ? 'Restore assistant' : 'Minimise assistant'); }
      if (action === 'clear') { stopAll(); previousQuestion = ''; welcome(); live.textContent = 'Conversation cleared.'; }
      if (action === 'send') send();
      if (action === 'stop-voice' && 'speechSynthesis' in window) speechSynthesis.cancel();
      if (action === 'mic') toggleMic();
    });
    input.addEventListener('keydown', (event) => { if (event.key === 'Enter' && !event.shiftKey) { event.preventDefault(); send(); } });
    input.addEventListener('input', () => { input.style.height = 'auto'; input.style.height = `${Math.min(input.scrollHeight, 100)}px`; });
    function toggleMic() {
      if (listening) { stopListening(); live.textContent = 'Voice listening stopped.'; return; }
      if (!recognitionApi) { live.textContent = 'Voice input is not supported in this browser. You can type your question instead.'; return; }
      try {
        recognition = new recognitionApi(); recognition.lang = document.documentElement.lang || 'en-US'; recognition.interimResults = true; recognition.continuous = false;
        recognition.onstart = () => { listening = true; mic.classList.add('is-listening'); mic.setAttribute('aria-label', 'Stop voice input'); live.textContent = 'Listening. Speak your question; your browser may ask for microphone permission.'; };
        recognition.onresult = (event) => { let transcript = ''; for (let i = event.resultIndex; i < event.results.length; i++) transcript += event.results[i][0].transcript; input.value = transcript; input.dispatchEvent(new Event('input')); };
        recognition.onerror = (event) => { listening = false; mic.classList.remove('is-listening'); mic.setAttribute('aria-label', 'Start voice input'); live.textContent = event.error === 'not-allowed' ? 'Microphone permission was denied. Allow microphone access in browser settings to use voice input.' : `Voice input error: ${event.error}. You can type your question instead.`; };
        recognition.onend = () => { listening = false; mic.classList.remove('is-listening'); mic.setAttribute('aria-label', 'Start voice input'); if (!live.textContent.includes('permission') && input.value.trim()) live.textContent = 'Voice text is ready. Review it, then tap send.'; };
        live.textContent = 'Requesting microphone permission…'; recognition.start();
      } catch { live.textContent = 'Could not start voice input. Check microphone permissions or type your question.'; }
    }
    // Pointer-driven drag works with mouse, pen, and touch. Dragging the icon is optional.
    panel.querySelector('[data-va-drag]').addEventListener('pointerdown', (event) => {
      if (event.target.closest('button')) return;
      const rect = panel.getBoundingClientRect(); drag = { x: event.clientX, y: event.clientY, left: rect.left, top: rect.top };
      event.currentTarget.setPointerCapture?.(event.pointerId);
    });
    panel.querySelector('[data-va-drag]').addEventListener('pointermove', (event) => {
      if (!drag) return;
      const left = Math.max(8, Math.min(window.innerWidth - panel.offsetWidth - 8, drag.left + event.clientX - drag.x));
      const top = Math.max(8, Math.min(window.innerHeight - 80, drag.top + event.clientY - drag.y));
      panel.style.left = `${left}px`; panel.style.top = `${top}px`; panel.style.right = 'auto'; panel.style.bottom = 'auto';
    });
    ['pointerup', 'pointercancel', 'lostpointercapture'].forEach((name) => panel.querySelector('[data-va-drag]').addEventListener(name, () => { drag = null; }));
    launcher.addEventListener('pointerdown', (event) => { drag = { x: event.clientX, y: event.clientY, left: launcher.getBoundingClientRect().left, top: launcher.getBoundingClientRect().top, moved: false }; launcher.setPointerCapture?.(event.pointerId); });
    launcher.addEventListener('pointermove', (event) => { if (!drag) return; if (Math.abs(event.clientX - drag.x) + Math.abs(event.clientY - drag.y) > 5) drag.moved = true; if (drag.moved) { launcher.style.left = `${Math.max(4, Math.min(innerWidth - 66, drag.left + event.clientX - drag.x))}px`; launcher.style.top = `${Math.max(4, Math.min(innerHeight - 66, drag.top + event.clientY - drag.y))}px`; launcher.style.right = 'auto'; launcher.style.bottom = 'auto'; } });
    launcher.addEventListener('pointerup', () => { if (drag?.moved) { const wasOpen = false; launcher.dataset.dragged = 'true'; setTimeout(() => delete launcher.dataset.dragged, 0); } drag = null; });
    launcher.addEventListener('click', (event) => { if (launcher.dataset.dragged) { event.stopImmediatePropagation(); delete launcher.dataset.dragged; } }, true);
    window.addEventListener('resize', () => { if (!isOpen) return; const rect = panel.getBoundingClientRect(); if (rect.left > innerWidth - 30 || rect.top > innerHeight - 30) { panel.style.left = ''; panel.style.top = ''; panel.style.right = '8px'; panel.style.bottom = '84px'; } });
    document.addEventListener('visibilitychange', () => { if (document.hidden) stopAll(); });
  };
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', start, { once: true }); else start();
})();
