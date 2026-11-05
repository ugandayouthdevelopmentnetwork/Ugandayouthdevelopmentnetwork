// Existing UYDNet dashboard enhancements and the single site virtual assistant.
(() => {
  'use strict';
  const start = () => {
    const style = document.createElement('link');
    style.rel = 'stylesheet';
    style.href = 'styles.css';
    document.head.append(style);

    const header = document.querySelector('header.site-header') || document.querySelector('body > header');
    if (header && !document.querySelector('.uydnet-account-banner')) {
      const banner = document.createElement('div');
      banner.className = 'uydnet-account-banner';
      banner.innerHTML = `
        <div class="uydnet-banner-inner">
          <div>
            <span class="banner-label">UYDNet official account number</span>
            <div class="uydnet-banner-row">
              <strong class="uydnet-account-number">01660021481437</strong>
              <button class="uydnet-copy" type="button" data-copy-account>Copy account number</button>
            </div>
          </div>
          <div class="uydnet-banner-divider" aria-hidden="true"></div>
          <div>
            <span class="banner-label">WhatsApp contact</span>
            <div class="uydnet-banner-row">
              <span class="uydnet-whatsapp-mark" aria-hidden="true">✆</span>
              <strong class="uydnet-account-number">+256 744 689 594</strong>
              <a class="uydnet-whatsapp-link" href="https://wa.me/256744689594" target="_blank" rel="noopener noreferrer">Chat</a>
            </div>
          </div>
        </div>
      `;
      header.before(banner);
    }

    const dashboard = document.getElementById('uydnetDashboard');
    if (dashboard) {
      const nav = dashboard.querySelector('.dashboard-nav');
      if (nav && !nav.querySelector('[data-target="#account-details"]')) {
        const item = document.createElement('button');
        item.className = 'dashboard-item';
        item.type = 'button';
        item.dataset.target = '#account-details';
        item.innerHTML = '<span class="dashboard-icon">💳</span>Official Account';
        nav.appendChild(item);
      }
      if (!dashboard.querySelector('.uydnet-dashboard-community')) {
        const community = document.createElement('section');
        community.className = 'uydnet-dashboard-community';
        community.innerHTML = '<p>UYDNet WhatsApp Community · +256 744 689 594</p><a class="uydnet-whatsapp-link" href="https://wa.me/256744689594" target="_blank" rel="noopener noreferrer">Contact on WhatsApp</a>';
        dashboard.querySelector('.dashboard-header')?.after(community);
      }
    }

    const home = document.getElementById('home') || document.querySelector('main');
    if (home && !document.getElementById('account-details')) {
      const account = document.createElement('section');
      account.id = 'account-details';
      account.className = 'section overview-section';
      account.innerHTML = '<div class="container"><div class="section-title"><span>Official details</span><h2>UYDNet Account Number</h2></div><div class="uydnet-account-details"><p>Official account number for donations and support.</p><div class="account-number-box"><strong class="uydnet-account-details-number">01660021481437</strong></div><p>Call or WhatsApp: <a href="tel:+256744689594">+256 744 689 594</a></p><button class="uydnet-copy" type="button" data-copy-account>Copy account number</button><div class="uydnet-copy-status" aria-live="polite"></div></div></div>';
      const mainSections = [...home.querySelectorAll('section')];
      (mainSections.find((section) => section.id === 'membership') || home.lastElementChild)?.before(account);
      if (!document.getElementById('whatsapp-community')) {
        const compact = document.createElement('section');
        compact.id = 'whatsapp-community';
        compact.className = 'section overview-section';
        compact.innerHTML = '<div class="container"><div class="uydnet-community-invite"><h3>Join the UYDNet WhatsApp Community</h3><p>Connect with UYDNet on WhatsApp: +256 744 689 594</p><a class="uydnet-whatsapp-link" href="https://wa.me/256744689594" target="_blank" rel="noopener noreferrer">Open WhatsApp</a></div></div>';
        account.after(compact);
      }
    }

    document.addEventListener('click', async (event) => {
      const button = event.target.closest('[data-copy-account]');
      if (!button) return;
      const status = document.querySelector('.uydnet-copy-status');
      try {
        await navigator.clipboard.writeText('01660021481437');
        button.textContent = 'Copied';
        if (status) status.textContent = 'Account number copied successfully.';
        window.setTimeout(() => {
          button.textContent = 'Copy account number';
          if (status) status.textContent = '';
        }, 1800);
      } catch {
        if (status) status.textContent = 'Copy was not available. Please select and copy 01660021481437.';
      }
    });

    // Preserve one local, site-grounded assistant; no duplicate widgets or external AI service.
    if (document.getElementById('uydnetVirtualAssistant')) return;
    document.getElementById('uydnetAI')?.remove();
    document.getElementById('uydnetAiButton')?.remove();
    const assistantCss = document.createElement('link');
    assistantCss.rel = 'stylesheet';
    assistantCss.href = 'assistant.css';
    document.head.append(assistantCss);
    const icon = '<svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M12 3 14 8l5 2-5 2-2 5-2-5-5-2 5-2 2-5Z" stroke="currentColor" stroke-width="1.7"/></svg>';
    const panel = document.createElement('section');
    panel.id = 'uydnetVirtualAssistant';
    panel.className = 'uydnet-va-panel';
    panel.setAttribute('role','dialog');
    panel.setAttribute('aria-label','UYDNet Virtual Assistant');
    panel.hidden = true;
    panel.innerHTML = `<header class="uydnet-va-head"><div class="uydnet-va-avatar">${icon}</div><div class="uydnet-va-title"><strong>UYDNet Virtual Assistant</strong><span>Website information · local chat</span></div><button class="uydnet-va-close" type="button" data-va-close aria-label="Close assistant">×</button></header><div class="uydnet-va-messages"></div><div class="uydnet-va-live" aria-live="polite"></div><div class="uydnet-va-input-wrap"><textarea class="uydnet-va-input" rows="1" placeholder="Ask about membership, support, partners, or programmes..."></textarea><button class="uydnet-va-send" type="button">Send</button></div>`;
    document.body.append(panel);

    const launcher = document.createElement('button');
    launcher.className = 'uydnet-va-launcher';
    launcher.type = 'button';
    launcher.setAttribute('aria-label','Open UYDNet Virtual Assistant');
    launcher.setAttribute('aria-expanded','false');
    launcher.innerHTML = icon;
    document.body.append(launcher);

    const messages = panel.querySelector('.uydnet-va-messages');
    const input = panel.querySelector('.uydnet-va-input');
    const live = panel.querySelector('.uydnet-va-live');
    const message = (text, who) => {
      const row = document.createElement('div');
      row.className = `uydnet-va-row ${who}`;
      const bubble = document.createElement('div');
      bubble.className = 'uydnet-va-bubble';
      bubble.textContent = text;
      row.appendChild(bubble);
      messages.appendChild(row);
      messages.scrollTop = messages.scrollHeight;
    };
    const welcome = () => {
      messages.replaceChildren();
      message('Hello! I can help you explore UYDNet information published on this website. Ask about membership, programmes, partnerships or support.', 'assistant');
    };
    const send = () => {
      const question = input.value.trim();
      if (!question) return;
      message(question, 'user');
      input.value = '';
      input.style.height = 'auto';
      const q = question.toLowerCase();
      const parts = [
        q.includes('membership') || q.includes('join') ? 'Membership is open to young people, professionals, volunteers, community actors and partners. Use the membership form and contact the Vice President or WhatsApp +256 744 689 594.' : '',
        q.includes('support') || q.includes('donate') || q.includes('payment') ? 'Support UYDNet through MTN Mobile Money or Airtel Money on +256 744 689 594 and confirm the amount before sending.' : '',
        q.includes('partner') || q.includes('partnership') ? 'UYDNet welcomes organisations, institutions and development partners. Contact +256 744 689 594 to discuss partnership opportunities.' : '',
        q.includes('program') || q.includes('activity') || q.includes('service') ? 'Programs include leadership and civic engagement, health and social support, skills development, community outreach, research and learning, and partnership-building.' : '',
        q.includes('contact') || q.includes('email') || q.includes('phone') ? 'Email: dabond9997@gmail.com. Phone: +256 744 689 594.' : '',
        q.includes('account') ? 'The official account number is 01660021481437. Use it for donations and support.' : '',
      ].filter(Boolean);
      const answer = parts.length ? parts.join(' ') : 'I can help with membership, programme information, partnerships, support and contact details for UYDNet. Ask specifically for what you need.';
      window.setTimeout(() => message(answer, 'assistant'), 250);
    };

    launcher.addEventListener('click', () => {
      panel.hidden = false;
      panel.classList.add('is-open');
      launcher.style.display = 'none';
      launcher.setAttribute('aria-expanded', 'true');
      if (!messages.children.length) welcome();
      input.focus();
    });

    panel.addEventListener('click', (event) => {
      if (event.target.closest('[data-va-close]')) {
        panel.classList.remove('is-open');
        panel.hidden = true;
        launcher.style.display = 'grid';
        launcher.setAttribute('aria-expanded', 'false');
      }
    });

    input.addEventListener('keydown', (event) => {
      if (event.key === 'Enter' && !event.shiftKey) {
        event.preventDefault();
        send();
      }
    });
    panel.querySelector('.uydnet-va-send')?.addEventListener('click', send);
    input.addEventListener('input', () => {
      input.style.height = 'auto';
      input.style.height = `${Math.min(input.scrollHeight, 120)}px`;
    });
  };
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', start, {once: true}); else start();
})();
