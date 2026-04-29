/* ═══════════════════════════════════════════════════════════
   HELIOS — Olympus University AI Chatbot
   Helpful Engagement and Learning Intelligence for Olympus
   ═══════════════════════════════════════════════════════════ */

const HeliosChatbot = {
  responses: {
    'admission': 'Applications for 2025-26 are open! Last date: <b>June 30 for UG</b>, <b>July 15 for PG</b>. Visit our <a href="admissions.html">Admissions page</a> or call <b>1800-123-4567</b> (Toll Free).',
    'fees': 'B.Tech fees start at <b>₹1.8L/yr</b>. MBA is <b>₹2.5L/yr</b>. Scholarships & EMI options available. Check our <a href="admissions.html">Admissions page</a> for the full fee structure.',
    'placement': 'Olympus has a <b>98% placement rate</b>. Average package: <b>₹24 LPA</b>, highest: <b>₹72 LPA</b>. 350+ companies recruit including Google, Microsoft, and Amazon. <a href="placements.html">View details →</a>',
    'hostel': 'Hostels available for boys (1,800 seats) and girls (900 seats). Fee: <b>₹80,000/yr</b>. AC/Non-AC options. Apply through the student portal.',
    'contact': 'Reach us at <b>+91-80-4567-8900</b> or <b>info@olympusuniversity.edu.in</b>. Office hours: Mon-Sat, 9AM-5PM. <a href="contact.html">Contact page →</a>',
    'cse': 'CSE is our flagship department with <b>42 faculty</b>, <b>8 labs</b>, ranked <b>#5 nationally</b>. Offers B.Tech, M.Tech, MCA, and PhD programs. <a href="cse.html">Explore CSE →</a>',
    'computer science': 'CSE is our flagship department with <b>42 faculty</b>, <b>8 labs</b>, ranked <b>#5 nationally</b>. Offers B.Tech, M.Tech, MCA, and PhD programs. <a href="cse.html">Explore CSE →</a>',
    'mba': 'Our MBA program offers dual specialization in Finance, Marketing, HR & more. Duration: <b>2 years</b>, Fees: <b>₹2.5L/yr</b>. CAT/MAT/OUET-MBA scores accepted.',
    'scholarship': 'We offer <b>Merit Scholarships</b> (₹50K/yr), <b>Sports Excellence</b> (full tuition), <b>SC/ST Scholarship</b> (₹40K/yr), and <b>Founder\'s Scholarship</b> (100% fee waiver). <a href="academics.html">Learn more →</a>',
    'campus': 'Olympus spans <b>200 acres</b> with a central library (2L+ books), Olympic-size pool, sports complex, 3 hostels, innovation hub, and 2,000-seater auditorium. <a href="campus.html">Explore campus →</a>',
    'library': 'Our Central Library has <b>2 lakh+ books</b>, <b>50+ journals</b>, 24/7 reading hall, and a digital library with access to IEEE, Springer, and ACM Digital Library.',
    'research': 'Olympus has <b>₹120 Cr total research funding</b>, <b>340 publications</b> (2024), <b>28 patents</b>, and collaborations with MIT Media Lab, IISc, and ISRO. <a href="research.html">View research →</a>',
    'faculty': 'We have <b>850+ full-time faculty</b> with PhDs from top institutions. Student-faculty ratio: <b>18:1</b>. <a href="departments.html">Browse departments →</a>',
    'ranking': 'Olympus is ranked <b>#3 in South India</b> (NIRF 2025), <b>#12 in India</b> (THE 2025), <b>#1 in Karnataka</b>. We hold <b>NAAC A++</b> accreditation.',
    'hello': 'Hello! 👋 Welcome to Olympus University. I\'m Helios, your AI assistant. How can I help you today?',
    'hi': 'Hi there! 👋 I\'m Helios, Olympus University\'s AI assistant. Ask me about admissions, departments, fees, placements, or anything about our campus!',
    'help': 'I can help you with: <b>Admissions</b>, <b>Fees</b>, <b>Departments</b>, <b>Placements</b>, <b>Campus Life</b>, <b>Scholarships</b>, <b>Research</b>, <b>Rankings</b>, and <b>Contact info</b>. Just ask!',
    'thank': 'You\'re welcome! 😊 If you have more questions, feel free to ask. You can also call us at <b>1800-123-4567</b>.',
    'exam': 'For exam-related queries, visit our <a href="academics.html">Academics page</a> or contact the Examination Cell: <b>exam@olympusuniversity.edu.in</b>. Controller of Exams: Dr. Ramesh Pillai.',
    'event': 'Upcoming events: 🎭 <b>SUMMIT Tech Fest</b> (Aug 14-16), 🎨 <b>Rangotsav Cultural Fest</b> (Feb), ⚽ <b>Olympiad Sports Fest</b> (Dec). <a href="campus.html">See all events →</a>',
    'alumni': 'Join our network of <b>50,000+ alumni</b> across <b>60+ countries</b>. Notable alumni include VPs at Google, IAS officers, and startup founders. <a href="alumni.html">Alumni page →</a>',
    'login': 'Students can log in at <a href="students.html">Student Portal</a> with their Roll Number. Faculty can access the <a href="faculty.html">Faculty Portal</a> with their Faculty ID.',
  },

  findResponse(message) {
    const msg = message.toLowerCase().trim();
    for (const [key, response] of Object.entries(this.responses)) {
      if (msg.includes(key)) return response;
    }
    return "I'm not sure about that. For detailed information, please visit our website pages or contact us at <b>+91-80-4567-8900</b> or <b>info@olympusuniversity.edu.in</b>. You can also ask me about admissions, fees, placements, departments, or campus life!";
  },

  init() {
    this.injectHTML();
    this.bindEvents();
  },

  injectHTML() {
    const html = `
    <div class="chatbot-btn" id="chatbotBtn">
      <i class="fas fa-robot"></i>
      <span class="pulse"></span>
    </div>
    <div class="chatbot-window" id="chatbotWindow">
      <div class="chatbot-header">
        <h4>🤖 Helios — Olympus AI</h4>
        <button id="chatbotClose"><i class="fas fa-minus"></i></button>
      </div>
      <div class="chatbot-messages" id="chatMessages">
        <div class="chat-msg bot">Hi! I'm Helios 👋 Olympus University's AI assistant. How can I help you today?</div>
      </div>
      <div class="chat-chips" id="chatChips">
        <button class="chat-chip" data-query="admission">Admissions</button>
        <button class="chat-chip" data-query="fees">Fees</button>
        <button class="chat-chip" data-query="cse">Departments</button>
        <button class="chat-chip" data-query="placement">Placements</button>
        <button class="chat-chip" data-query="campus">Campus</button>
        <button class="chat-chip" data-query="contact">Contact</button>
      </div>
      <div class="chatbot-input-area">
        <input type="text" class="chatbot-input" id="chatInput" placeholder="Ask Helios anything..." autocomplete="off">
        <button class="chatbot-send" id="chatSend"><i class="fas fa-paper-plane"></i></button>
      </div>
    </div>`;
    
    const container = document.createElement('div');
    container.innerHTML = html;
    document.body.appendChild(container);
  },

  bindEvents() {
    const btn = document.getElementById('chatbotBtn');
    const window_ = document.getElementById('chatbotWindow');
    const close = document.getElementById('chatbotClose');
    const input = document.getElementById('chatInput');
    const send = document.getElementById('chatSend');
    const chips = document.querySelectorAll('.chat-chip');

    btn.addEventListener('click', () => {
      window_.classList.toggle('active');
      btn.style.display = window_.classList.contains('active') ? 'none' : 'flex';
    });

    close.addEventListener('click', () => {
      window_.classList.remove('active');
      btn.style.display = 'flex';
    });

    const sendMessage = () => {
      const msg = input.value.trim();
      if (!msg) return;
      this.addMessage(msg, 'user');
      input.value = '';
      this.showTyping();
      setTimeout(() => {
        this.removeTyping();
        const response = this.findResponse(msg);
        this.addMessage(response, 'bot');
      }, 800 + Math.random() * 600);
    };

    send.addEventListener('click', sendMessage);
    input.addEventListener('keypress', (e) => {
      if (e.key === 'Enter') sendMessage();
    });

    chips.forEach(chip => {
      chip.addEventListener('click', () => {
        const query = chip.getAttribute('data-query');
        this.addMessage(chip.textContent, 'user');
        this.showTyping();
        setTimeout(() => {
          this.removeTyping();
          this.addMessage(this.findResponse(query), 'bot');
        }, 600);
      });
    });
  },

  addMessage(text, type) {
    const messages = document.getElementById('chatMessages');
    const msg = document.createElement('div');
    msg.className = `chat-msg ${type}`;
    msg.innerHTML = text;
    messages.appendChild(msg);
    messages.scrollTop = messages.scrollHeight;
  },

  showTyping() {
    const messages = document.getElementById('chatMessages');
    const typing = document.createElement('div');
    typing.className = 'typing-indicator';
    typing.id = 'typingIndicator';
    typing.innerHTML = '<span></span><span></span><span></span>';
    messages.appendChild(typing);
    messages.scrollTop = messages.scrollHeight;
  },

  removeTyping() {
    const typing = document.getElementById('typingIndicator');
    if (typing) typing.remove();
  }
};

document.addEventListener('DOMContentLoaded', () => HeliosChatbot.init());
