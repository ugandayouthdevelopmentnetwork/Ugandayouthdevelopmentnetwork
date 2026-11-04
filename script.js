(() => {
  const menuButton = document.querySelector('.menubtn');
  const nav = document.querySelector('nav');
  if (menuButton && nav) {
    menuButton.addEventListener('click', () => nav.classList.toggle('open'));
    document.querySelectorAll('nav a').forEach((link) => {
      link.addEventListener('click', () => nav.classList.remove('open'));
    });
  }

  const yearElement = document.getElementById('year');
  if (yearElement) yearElement.textContent = new Date().getFullYear();

  const dashboardItems = document.querySelectorAll('.dashboard-item');
  const panels = document.querySelectorAll('.content-panel');

  dashboardItems.forEach((button) => {
    button.addEventListener('click', () => {
      const target = button.dataset.target;
      dashboardItems.forEach((item) => item.classList.toggle('active', item === button));
      panels.forEach((panel) => panel.classList.toggle('active', panel.id === target));
      document.querySelector('.uydnet-main')?.scrollTo({ top: 0, behavior: 'smooth' });
    });
  });

  const assistantToggle = document.getElementById('uydnetAssistantToggle');
  const assistantWidget = document.getElementById('uydnetAssistantWidget');
  const assistantMessages = document.getElementById('uydnetAssistantMessages');
  const assistantInput = document.getElementById('uydnetAssistantInput');
  const sendBtn = document.getElementById('uydnetSendBtn');
  const clearBtn = document.getElementById('uydnetClearBtn');
  const voiceToggleBtn = document.getElementById('uydnetVoiceToggle');
  const closeBtn = document.getElementById('uydnetCloseBtn');
  const minimizeBtn = document.getElementById('uydnetMinimizeBtn');
  const playBtn = document.getElementById('uydnetPlayBtn');
  const pauseBtn = document.getElementById('uydnetPauseBtn');
  const stopBtn = document.getElementById('uydnetStopBtn');
  const autoVoiceCheckbox = document.getElementById('uydnetAutoVoice');
  const suggestionButtons = document.querySelectorAll('.uydnet-suggestion-btn');

  if (assistantToggle && assistantWidget && assistantMessages && assistantInput && sendBtn && clearBtn && voiceToggleBtn && closeBtn && minimizeBtn && playBtn && pauseBtn && stopBtn && autoVoiceCheckbox) {
    const conversation = [];
    let recognition = null;
    let isListening = false;

    const knowledgeBase = [
      {keywords:['mission','what is the mission','how does uydnet work'], answer:'UYDNet is a youth-development network connecting young people, leaders, professionals and communities to improve wellbeing, skills, participation and opportunity.'},
      {keywords:['about','who is uydnet','organization'], answer:'UYDNet is Uganda Youth Development Network Organization, a youth-focused organisation based in Mukono Central Division, Uganda.'},
      {keywords:['membership','join uydnet','become a member'], answer:'To become a member, complete the membership application form and submit it to the Vice President as described in the membership section.'},
      {keywords:['support','donate','contribute'], answer:'Support UYDNet through the payment details provided in the support section, where the organisation accepts contributions to help youth and community projects.'},
      {keywords:['partner','partnership','become a partner'], answer:'UYDNet welcomes organizations, companies, institutions, development partners and individuals interested in collaboration and partnership.'},
      {keywords:['services','what services'], answer:'UYDNet services include paid training, consultation, events, publications and other opportunities offered or promoted by the network.'},
      {keywords:['contact','phone','email'], answer:'You can contact UYDNet via email at dabond9997@gmail.com or by phone at +256 744 689 594.'},
      {keywords:['hello','hi','hey','welcome'], answer:'Hello! I am the UYDNet Virtual Assistant. I can help you learn about UYDNet, membership, support, partnership opportunities and youth development programmes.'}
    ];

    function addMessage(content, role='bot') {
      const bubble = document.createElement('div');
      bubble.className = 'uydnet-message ' + role;
      bubble.textContent = content;
      assistantMessages.appendChild(bubble);
      assistantMessages.scrollTop = assistantMessages.scrollHeight;
    }

    function setTyping(isActive) {
      const typed = document.getElementById('uydnetTyping');
      if (isActive) {
        if (typed) return;
        const indicator = document.createElement('div');
        indicator.id = 'uydnetTyping';
        indicator.className = 'uydnet-typing';
        indicator.innerHTML = '<span class="uydnet-dot"></span><span class="uydnet-dot"></span><span class="uydnet-dot"></span>';
        assistantMessages.appendChild(indicator);
        assistantMessages.scrollTop = assistantMessages.scrollHeight;
      } else if (typed) {
        typed.remove();
      }
    }

    function getAnswer(question) {
      const q = question.toLowerCase();
      const recentContext = conversation.filter((item) => item.role === 'user').slice(-2).map((item) => item.text.toLowerCase()).join(' ');
      if (recentContext.includes('become a member') && q.includes('how')) {
        return 'To become a member, download the membership application form, complete it and submit it to the Vice President.';
      }
      if (recentContext.includes('support') && q.includes('how')) {
        return 'Support UYDNet through the payment details provided in the support section on the website.';
      }
      const match = knowledgeBase.find((entry) => entry.keywords.some((keyword) => q.includes(keyword)));
      return match ? match.answer : 'I can help with UYDNet information such as membership, support, partnerships, leadership and programmes. Please ask a question about the organisation.';
    }

    function speakText(text) {
      if (!('speechSynthesis' in window)) {
        addMessage('Voice playback is not supported in this browser.', 'system');
        return;
      }
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.rate = 1;
      utterance.pitch = 1;
      utterance.volume = 1;
      const voices = window.speechSynthesis.getVoices();
      const preferred = voices.find((voice) => /google|samantha|zira|susan|alex|english/i.test(voice.name));
      if (preferred) utterance.voice = preferred;
      window.speechSynthesis.speak(utterance);
    }

    function clearConversation() {
      assistantMessages.innerHTML = '';
      conversation.length = 0;
      addMessage('Hello! I am the UYDNet Virtual Assistant. I can help you learn about UYDNet, membership, support, partnership opportunities and youth development programmes. How can I help today?', 'bot');
    }

    function respondToQuestion(question) {
      const trimmed = question.trim();
      if (!trimmed) return;
      conversation.push({ role: 'user', text: trimmed });
      addMessage(trimmed, 'user');
      setTyping(true);
      setTimeout(() => {
        const answer = getAnswer(trimmed);
        conversation.push({ role: 'bot', text: answer });
        setTyping(false);
        addMessage(answer, 'bot');
        if (autoVoiceCheckbox.checked) speakText(answer);
      }, 700);
    }

    function sendCurrentQuestion() {
      const question = assistantInput.value.trim();
      assistantInput.value = '';
      respondToQuestion(question);
    }

    assistantToggle.addEventListener('click', () => {
      assistantWidget.classList.remove('hidden');
      assistantToggle.style.display = 'none';
      assistantInput.focus();
    });
    closeBtn.addEventListener('click', () => {
      assistantWidget.classList.add('hidden');
      assistantToggle.style.display = 'flex';
      window.speechSynthesis.cancel();
    });
    minimizeBtn.addEventListener('click', () => {
      assistantWidget.classList.add('hidden');
      assistantToggle.style.display = 'flex';
    });
    sendBtn.addEventListener('click', sendCurrentQuestion);
    assistantInput.addEventListener('keydown', (event) => {
      if (event.key === 'Enter') sendCurrentQuestion();
    });
    clearBtn.addEventListener('click', clearConversation);

    suggestionButtons.forEach((button) => {
      button.addEventListener('click', () => {
        assistantInput.value = button.getAttribute('data-question') || '';
        sendCurrentQuestion();
      });
    });

    function supportsSpeechRecognition() {
      return 'SpeechRecognition' in window || 'webkitSpeechRecognition' in window;
    }

    voiceToggleBtn.addEventListener('click', () => {
      if (!supportsSpeechRecognition()) {
        addMessage('Voice recognition is not supported in this browser. Please type your question.', 'system');
        return;
      }
      if (isListening) {
        recognition.stop();
        isListening = false;
        voiceToggleBtn.classList.remove('listening');
        return;
      }
      const SpeechRecognitionConstructor = window.SpeechRecognition || window.webkitSpeechRecognition;
      recognition = new SpeechRecognitionConstructor();
      recognition.lang = 'en-US';
      recognition.interimResults = true;
      recognition.continuous = false;
      recognition.onstart = () => {
        isListening = true;
        voiceToggleBtn.classList.add('listening');
        addMessage('Listening... speak now.', 'system');
      };
      recognition.onresult = (event) => {
        let transcript = '';
        for (let i = 0; i < event.results.length; i += 1) {
          transcript += event.results[i][0].transcript;
        }
        if (transcript.trim()) assistantInput.value = transcript.trim();
      };
      recognition.onerror = () => {
        addMessage('Microphone permission was denied or unavailable. Please try again or type your question.', 'system');
        isListening = false;
        voiceToggleBtn.classList.remove('listening');
      };
      recognition.onend = () => {
        isListening = false;
        voiceToggleBtn.classList.remove('listening');
      };
      recognition.start();
    });

    playBtn.addEventListener('click', () => {
      const latest = [...document.querySelectorAll('.uydnet-message.bot')].pop();
      if (latest) speakText(latest.textContent);
    });
    pauseBtn.addEventListener('click', () => window.speechSynthesis.pause());
    stopBtn.addEventListener('click', () => window.speechSynthesis.cancel());

    const header = document.getElementById('uydnetAssistantHeader');
    let dragX = 0;
    let dragY = 0;
    let dragging = false;
    if (header) {
      header.addEventListener('pointerdown', (event) => {
        dragging = true;
        dragX = event.clientX;
        dragY = event.clientY;
      });
    }
    document.addEventListener('pointermove', (event) => {
      if (!dragging) return;
      const rect = assistantWidget.getBoundingClientRect();
      const nextLeft = rect.left + (event.clientX - dragX);
      const nextTop = rect.top + (event.clientY - dragY);
      assistantWidget.style.left = Math.max(8, Math.min(window.innerWidth - rect.width - 8, nextLeft)) + 'px';
      assistantWidget.style.right = 'auto';
      assistantWidget.style.top = Math.max(8, Math.min(window.innerHeight - rect.height - 8, nextTop)) + 'px';
      assistantWidget.style.bottom = 'auto';
      dragX = event.clientX;
      dragY = event.clientY;
    });
    document.addEventListener('pointerup', () => {
      dragging = false;
    });

    clearConversation();
  }

  const comments = document.getElementById('uydnetComments');
  if (comments) {
    const sampleComment = document.createElement('div');
    sampleComment.className = 'comment-item';
    sampleComment.innerHTML = '<strong>UYDNet Community</strong><p>Thank you for supporting youth development, leadership and community empowerment in Uganda.</p>';
    comments.appendChild(sampleComment);
  }
})();
