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
  if (yearElement) {
    yearElement.textContent = new Date().getFullYear();
  }

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

  if (!assistantToggle || !assistantWidget || !assistantMessages || !assistantInput || !sendBtn || !clearBtn || !voiceToggleBtn || !closeBtn || !minimizeBtn || !playBtn || !pauseBtn || !stopBtn || !autoVoiceCheckbox) {
    return;
  }

  const conversation = [];
  let recognition = null;
  let isListening = false;
  let currentSpeechUtterance = null;

  const knowledgeBase = [
    {
      keywords: ['mission', 'what is the mission', 'mission of uydnet', 'how does uydnet work'],
      answer: 'UYDNet is a youth-development network connecting young people, leaders, professionals and communities to improve wellbeing, skills, participation and opportunity. Its mission is to connect, equip and transform young people and communities through collaborative action, capacity building and practical support.'
    },
    {
      keywords: ['vision', 'what is the vision', 'uydnet vision'],
      answer: 'The website presents UYDNet as a youth-focused organization that supports leadership, health, skills development and community transformation. The goal is to help young people and communities thrive through practical action, partnerships and shared responsibility.'
    },
    {
      keywords: ['objectives', 'what are objectives', 'goals'],
      answer: 'The website describes UYDNet’s objectives as youth-focused and practical. They include leadership, community development, skills and empowerment, health awareness, participation, and improving opportunities for young people and communities.'
    },
    {
      keywords: ['programmes', 'programs', 'activities', 'what does uydnet do'],
      answer: 'UYDNet works through youth development programmes, community mobilization, skills development, leadership, health and outreach activities. The website presents programmes as being shaped by local need, practical action and community participation.'
    },
    {
      keywords: ['membership', 'become a member', 'join uydnet', 'register'],
      answer: 'To become a member, interested people should complete the membership application form and submit it to the Vice President as described on the website. You can find the application section on the page and use the downloadable membership form.'
    },
    {
      keywords: ['support', 'donation', 'donate', 'how can i support', 'contribute'],
      answer: 'The website says supporters can make contributions by following the payment information provided in the support section. It encourages people to support youth development, community work and UYDNet programmes.'
    },
    {
      keywords: ['partner', 'partnership', 'become a partner', 'collaborate'],
      answer: 'UYDNet welcomes organizations, companies, institutions, development partners and individuals interested in working together to create meaningful opportunities for young people and communities.'
    },
    {
      keywords: ['volunteer', 'volunteering', 'volunteer with uydnet'],
      answer: 'The site encourages direct engagement with UYDNet for programmes, partnerships and community collaboration. If you are interested in volunteering, the recommended path is to contact the organization through the contact details on the website.'
    },
    {
      keywords: ['contact', 'phone', 'email', 'call uydnet', 'how to reach'],
      answer: 'The website lists the UYDNet contact email as dabond9997@gmail.com and the phone number as +256 744 689 594. You can also use the call links available on the site.'
    },
    {
      keywords: ['about', 'who is uydnet', 'organization', 'uganda youth development network'],
      answer: 'UYDNet is Uganda Youth Development Network Organization, a youth-focused organization based in Mukono Central Division, Uganda. It works to promote youth development, leadership, participation, skills and community empowerment.'
    },
    {
      keywords: ['health', 'health programmes', 'community development', 'youth empowerment'],
      answer: 'The website highlights youth development, health, leadership, skills, participation and community transformation as key areas of focus. UYDNet works to create stronger opportunities for young people through practical support and partnership.'
    },
    {
      keywords: ['services', 'uydnet services', 'what services'],
      answer: 'UYDNet services include paid training, consultation, events, publications and other opportunities offered or promoted by the network. The website presents these as practical support areas for youth and communities.'
    },
    {
      keywords: ['welcome', 'hello', 'hi', 'hey'],
      answer: 'Hello! I am the UYDNet Virtual Assistant. I can help you learn about UYDNet, membership, support, partnership opportunities, youth development and community programmes. How can I help today?'
    }
  ];

  function addMessage(content, role = 'bot') {
    const bubble = document.createElement('div');
    bubble.className = 'uydnet-message ' + role;
    bubble.textContent = content;
    assistantMessages.appendChild(bubble);
    assistantMessages.scrollTop = assistantMessages.scrollHeight;
  }

  function setTyping(isActive) {
    const typing = document.getElementById('uydnetTyping');

    if (isActive) {
      if (typing) return;
      const indicator = document.createElement('div');
      indicator.id = 'uydnetTyping';
      indicator.className = 'uydnet-typing';
      indicator.innerHTML = '<span class="uydnet-dot"></span><span class="uydnet-dot"></span><span class="uydnet-dot"></span>';
      assistantMessages.appendChild(indicator);
      assistantMessages.scrollTop = assistantMessages.scrollHeight;
      return;
    }

    if (typing) {
      typing.remove();
    }
  }

  function openAssistant() {
    assistantWidget.classList.remove('hidden');
    assistantToggle.style.display = 'none';
    assistantInput.focus();
  }

  function closeAssistant() {
    assistantWidget.classList.add('hidden');
    assistantToggle.style.display = 'flex';
    stopSpeech();
    stopVoiceCapture();
  }

  function minimizeAssistant() {
    if (assistantWidget.classList.contains('hidden')) {
      assistantWidget.classList.remove('hidden');
      assistantToggle.style.display = 'none';
    } else {
      assistantWidget.classList.add('hidden');
      assistantToggle.style.display = 'flex';
    }
  }

  function getAnswerFromKnowledge(question) {
    const q = question.toLowerCase();
    const recentMessages = conversation.filter((item) => item.role === 'user').slice(-2);
    const recentContext = recentMessages.map((item) => item.text.toLowerCase()).join(' ');

    if (recentContext.includes('become a member') && q.includes('how')) {
      return 'To become a member, download the membership application form, complete it and submit it to the Vice President, as described on the membership section of the website.';
    }

    if (recentContext.includes('support') && q.includes('how')) {
      return 'The website provides a support section with payment numbers and instructions for contributions. You can follow the payment details listed in the support area on the website.';
    }

    if (recentContext.includes('partner') && q.includes('how')) {
      return 'UYDNet welcomes organizations, companies, institutions, development partners and individuals interested in collaboration. You can contact UYDNet through the contact details and partnership section on the website.';
    }

    const match = knowledgeBase.find((entry) => entry.keywords.some((keyword) => q.includes(keyword)));
    if (match) {
      return match.answer;
    }

    return 'I am here to help with UYDNet information. I can explain the organisation, membership, support, partnerships, youth development and programme areas. Please ask a question about UYDNet and I will guide you.';
  }

  function respondToQuestion(question) {
    const trimmedQuestion = question.trim();
    if (!trimmedQuestion) return;

    conversation.push({ role: 'user', text: trimmedQuestion });
    addMessage(trimmedQuestion, 'user');
    setTyping(true);

    setTimeout(() => {
      const answer = getAnswerFromKnowledge(trimmedQuestion);
      conversation.push({ role: 'bot', text: answer });
      setTyping(false);
      addMessage(answer, 'bot');

      if (autoVoiceCheckbox.checked) {
        speakText(answer);
      }
    }, 700);
  }

  function sendCurrentQuestion() {
    const question = assistantInput.value.trim();
    assistantInput.value = '';
    respondToQuestion(question);
  }

  function clearConversation() {
    assistantMessages.innerHTML = '';
    conversation.length = 0;
    addMessage('Hello! I am the UYDNet Virtual Assistant. I can help you learn about UYDNet, membership, support, partnership opportunities and youth development programmes. How can I help today?', 'bot');
  }

  function supportsSpeechRecognition() {
    return 'SpeechRecognition' in window || 'webkitSpeechRecognition' in window;
  }

  function startVoiceCapture() {
    if (!supportsSpeechRecognition()) {
      addMessage('Voice recognition is not supported in this browser. You can still type your question.', 'system');
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
      voiceToggleBtn.setAttribute('aria-label', 'Microphone is active');
      addMessage('Listening... speak now.', 'system');
    };

    recognition.onresult = (event) => {
      let transcript = '';
      for (let i = 0; i < event.results.length; i += 1) {
        transcript += event.results[i][0].transcript;
      }
      assistantInput.value = transcript.trim();
    };

    recognition.onerror = () => {
      addMessage('Microphone permission was denied or unavailable. Please try again or type your question.', 'system');
      stopVoiceCapture();
    };

    recognition.onend = () => {
      isListening = false;
      voiceToggleBtn.classList.remove('listening');
      voiceToggleBtn.setAttribute('aria-label', 'Use microphone');
      if (assistantInput.value.trim()) {
        addMessage('Recognised question ready to send.', 'system');
      }
    };

    recognition.start();
  }

  function stopVoiceCapture() {
    if (recognition) {
      try {
        recognition.stop();
      } catch (error) {
        // ignore repeated stop calls
      }
    }
    isListening = false;
    voiceToggleBtn.classList.remove('listening');
  }

  function speakText(text) {
    if (!('speechSynthesis' in window)) {
      addMessage('Voice playback is not supported in this browser.', 'system');
      return;
    }

    stopSpeech();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = 1;
    utterance.pitch = 1;
    utterance.volume = 1;

    const voices = window.speechSynthesis.getVoices();
    const preferredVoice = voices.find((voice) => /google|samantha|zira|susan|alex|english/i.test(voice.name));
    if (preferredVoice) {
      utterance.voice = preferredVoice;
    }

    currentSpeechUtterance = utterance;
    window.speechSynthesis.speak(utterance);
  }

  function stopSpeech() {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
    }
    currentSpeechUtterance = null;
  }

  assistantToggle.addEventListener('click', openAssistant);
  closeBtn.addEventListener('click', closeAssistant);
  minimizeBtn.addEventListener('click', minimizeAssistant);

  sendBtn.addEventListener('click', sendCurrentQuestion);
  assistantInput.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
      sendCurrentQuestion();
    }
  });

  clearBtn.addEventListener('click', clearConversation);

  voiceToggleBtn.addEventListener('click', () => {
    if (isListening) {
      stopVoiceCapture();
      return;
    }
    startVoiceCapture();
  });

  playBtn.addEventListener('click', () => {
    const latestBotMessage = [...document.querySelectorAll('.uydnet-message.bot')].pop();
    if (latestBotMessage) {
      speakText(latestBotMessage.textContent);
    }
  });

  pauseBtn.addEventListener('click', () => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.pause();
    }
  });

  stopBtn.addEventListener('click', stopSpeech);

  suggestionButtons.forEach((button) => {
    button.addEventListener('click', () => {
      assistantInput.value = button.getAttribute('data-question') || '';
      sendCurrentQuestion();
    });
  });

  let dragX = 0;
  let dragY = 0;
  let isDragging = false;

  const header = document.getElementById('uydnetAssistantHeader');
  if (header) {
    header.addEventListener('pointerdown', (event) => {
      isDragging = true;
      dragX = event.clientX;
      dragY = event.clientY;
      header.setPointerCapture?.(event.pointerId);
    });
  }

  document.addEventListener('pointermove', (event) => {
    if (!isDragging) return;

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
    isDragging = false;
  });

  clearConversation();
})();
