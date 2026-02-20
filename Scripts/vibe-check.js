/* =====================================================
   VIBE-CHECK ENGINE — 2010s Legend vs 2026 Local
   3 Types: A=2010s Legend  B=Transitioner  C=2026 Local
   ===================================================== */

const QUESTIONS = [
    {
        text: "You’re at a party and someone hands you the aux (or the Bluetooth share). What’s the vibe?",
        options: [
            { text: "Anything by Avicii, Calvin Harris, or 2012 Rihanna.", type: "A" },
            { text: "A 15-second AI-generated phonk loop that's currently trending on TikTok 7.", type: "B" },
            { text: "\"Does anyone have a charger? My Neural-Link is at 4%.\"", type: "C" }
        ]
    },
    {
        text: "Complete this classic internet sentence: \"Keep Calm and...\"",
        options: [
            { text: "Carry On. (The only correct answer).", type: "A" },
            { text: "...Wait, is that a government slogan from the 40s?", type: "B" },
            { text: "I don't \"Keep Calm,\" I just use a mood-regulation patch.", type: "C" }
        ]
    },
    {
        text: "What was the peak of fashion in your memory?",
        options: [
            { text: "Galaxy print leggings, mustache finger tattoos, and shutter shades.", type: "A" },
            { text: "Digital skins that you project onto your white \"base-layer\" jumpsuit.", type: "B" },
            { text: "Whatever the top-rated AI stylist told me to wear this morning.", type: "C" }
        ]
    },
    {
        text: "How do you feel about the word \"Bazinga\"?",
        options: [
            { text: "It reminds me of simpler times and network TV.", type: "A" },
            { text: "It’s physically painful to hear.", type: "B" },
            { text: "Is that a new crypto-token? Should I buy the dip?", type: "C" }
        ]
    },
    {
        text: "What is your primary method of \"Scrolling\"?",
        options: [
            { text: "On a physical smartphone with a cracked screen.", type: "A" },
            { text: "Infinite vertical video feed on a foldable tablet.", type: "B" },
            { text: "Eye-tracking inside my AR glasses while I pretend to listen to my boss.", type: "C" }
        ]
    }
];

const PERSONALITIES = {
    A: {
        emoji: "🎸",
        title: "The 2010s Legend",
        theBurn: "You still miss Vine and you probably have a mustache-shaped object somewhere in your house. You're a digital dinosaur who thinks 'Aura' is something only psychics have. Pure nostalgia bait.",
        theFlex: "You have a soul. You remember what it was like to be bored without an AI to entertain you. You're the original architect of the internet, before it became a 24/7 brain-rot simulation. Based.",
        traits: ["Analog DNA", "Vinyl Collector", "Shutter-Shade Veteran", "Real-World Native", "Anti-Brain-Rot"],
        matchPct: 15,
        rank: "#Classic",
        accentColor: "#f59e0b"
    },
    B: {
        emoji: "📱",
        title: "The TikTok Transitioner",
        theBurn: "You're caught in the middle of a war zone. You remember the old world but your attention span is currently shorter than an AI-generated jingle. You're buffering between eras.",
        theFlex: "You're the most adaptive person here. You know how to talk to a human and a chatbot without short-circuiting. You've got the best of both worlds—nostalgic heart, futuristic brain.",
        traits: ["Hybrid Vibe", "Platform Hopper", "Meme Scholar", "Adaptable", "Dual-Wielder"],
        matchPct: 62,
        rank: "#Epic",
        accentColor: "#22d3ee"
    },
    C: {
        emoji: "🧠",
        title: "The 2026 Local",
        theBurn: "Your brain is basically a hard drive. You don't 'think,' you just process. If your AR glasses ran out of battery, you'd probably forget how to walk. You are 100% brain-rot certified.",
        theFlex: "You are the future. While the 'Legends' are crying about vine, you're building worlds with your eye-movements. You're the peak of human-machine evolution. Infinite Aura.",
        traits: ["Neural-Native", "AR Resident", "Post-Sillicon", "Automation God", "Brain-Rot Hero"],
        matchPct: 94,
        rank: "#Legendary",
        accentColor: "#a855f7"
    }
};

// State, DOM, and Logic mirrored from main quiz for consistency
let currentQuestion = 0;
let scores = { A: 0, B: 0, C: 0 };
let selectedOption = null;
let currentWinner = null;

const screens = {
    intro: document.getElementById('screen-intro'),
    quiz: document.getElementById('screen-quiz'),
    loading: document.getElementById('screen-loading'),
    result: document.getElementById('screen-result')
};

const progressFill = document.getElementById('progress-fill');
const progressGlow = document.getElementById('progress-glow');
const progressLabel = document.getElementById('progress-label');
const progressPct = document.getElementById('progress-pct');
const questionText = document.getElementById('question-text');
const optionsCont = document.getElementById('options-container');
const btnNext = document.getElementById('btn-next');
const btnNextLabel = document.getElementById('btn-next-label');
const qNumBadge = document.getElementById('question-number-badge');

function refreshAds() {
    try { if (window.adsbygoogle) (adsbygoogle = window.adsbygoogle || []).push({}); } catch (e) { }
}

function showScreen(name) {
    Object.values(screens).forEach(s => { if (s) { s.classList.remove('active'); s.style.display = 'none'; } });
    const target = screens[name];
    if (target) {
        target.style.display = 'flex';
        requestAnimationFrame(() => { target.classList.add('active'); });
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

function renderQuestion() {
    const q = QUESTIONS[currentQuestion];
    questionText.textContent = q.text;
    qNumBadge.textContent = `Q${currentQuestion + 1}`;
    btnNextLabel.textContent = currentQuestion === QUESTIONS.length - 1 ? 'Reveal My Era 🔮' : 'Next Question';

    optionsCont.innerHTML = '';
    selectedOption = null;
    btnNext.disabled = true;

    const letters = ['A', 'B', 'C'];
    q.options.forEach((opt, i) => {
        const btn = document.createElement('button');
        btn.className = 'option-btn';
        btn.innerHTML = `<span class="option-letter">${letters[i]}</span><span class="option-text">${opt.text}</span>`;
        btn.onclick = () => {
            optionsCont.querySelectorAll('.option-btn').forEach(b => b.classList.remove('selected'));
            btn.classList.add('selected');
            selectedOption = opt.type;
            btnNext.disabled = false;
        };
        optionsCont.appendChild(btn);
    });

    const pct = Math.round((currentQuestion / QUESTIONS.length) * 100);
    progressFill.style.width = pct + '%';
    progressGlow.style.width = pct + '%';
    progressLabel.textContent = `Question ${currentQuestion + 1} of ${QUESTIONS.length}`;
    progressPct.textContent = pct + '%';
}

function renderResult(winner) {
    const p = PERSONALITIES[winner];
    currentWinner = winner;
    document.documentElement.style.setProperty('--result-accent', p.accentColor);
    document.getElementById('result-emoji').textContent = p.emoji;
    document.getElementById('result-title').textContent = p.title;
    document.getElementById('result-burn').textContent = p.theBurn;
    document.getElementById('result-flex').textContent = p.theFlex;
    document.getElementById('stat-score').textContent = `${scores[winner]}/5`;
    document.getElementById('stat-pct').textContent = `${p.matchPct}%`;
    document.getElementById('stat-rank').textContent = p.rank;
    const traitsEl = document.getElementById('result-traits');
    traitsEl.innerHTML = p.traits.map(t => `<span class="trait-tag">${t}</span>`).join('');
    document.getElementById('copy-link-input').value = window.location.href;
    launchConfetti();
    refreshAds();
}

function syncUrlWithResult(winner) {
    const url = new URL(window.location);
    url.searchParams.set('winner', winner);

    // Store in session for persistence
    sessionStorage.setItem('last_vibe_winner', winner);

    // Stealth Mode: Clean the URL bar immediately (Remove .html if on web server)
    let cleanUrl = window.location.protocol + "//" + window.location.host + window.location.pathname;
    if (window.location.protocol.startsWith('http')) {
        cleanUrl = cleanUrl.replace('.html', '');
    }
    history.pushState({ winner }, '', cleanUrl);
}

function handleUrlOnLoad() {
    const params = new URLSearchParams(window.location.search);
    let winner = params.get('winner');

    // Stealth Mode: If winner in URL, store it and clean the bar
    if (winner) {
        winner = winner.toUpperCase();
        sessionStorage.setItem('last_vibe_winner', winner);

        // Clean the URL bar (Remove ?winner=X, and .html if on web server)
        let cleanUrl = window.location.protocol + "//" + window.location.host + window.location.pathname;
        if (window.location.protocol.startsWith('http')) {
            cleanUrl = cleanUrl.replace('.html', '');
        }
        window.history.replaceState(null, '', cleanUrl);
    } else {
        // Try to recover from session
        winner = sessionStorage.getItem('last_vibe_winner');
    }

    if (winner && PERSONALITIES[winner]) {
        renderResult(winner);
        showScreen('result');
    }
}

function showLoadingThenResult() {
    const modal = document.getElementById('ad-interstitial-modal');
    const closeBtn = document.getElementById('btn-close-ad');
    const closeBtnX = document.getElementById('btn-close-ad-x');
    const calcState = document.getElementById('modal-calculating');
    const adState = document.getElementById('modal-ad-content');

    const winner = Object.entries(scores).sort((a, b) => b[1] - a[1])[0][0];
    renderResult(winner);
    syncUrlWithResult(winner);

    // Show Screen & Modal (Initial Calc State)
    showScreen('result');
    calcState.classList.add('active');
    adState.classList.remove('active');
    modal.classList.add('active');

    // Switch to Ad after 1.5s
    setTimeout(() => {
        calcState.classList.remove('active');
        adState.classList.add('active');
        refreshAds();
    }, 1500);

    const closeModal = () => { modal.classList.remove('active'); launchConfetti(); };
    closeBtn.onclick = closeModal;
    closeBtnX.onclick = closeModal;

    // Trigger Entrance
    document.querySelectorAll('.engagement-card').forEach(card => {
        card.classList.remove('reveal-card');
        void card.offsetWidth;
        card.classList.add('reveal-card');
    });
}

function launchConfetti() {
    const container = document.getElementById('confetti-container');
    if (!container) return;
    container.innerHTML = '';
    const colors = ['#a855f7', '#22d3ee', '#ec4899', '#f59e0b', '#10b981'];
    for (let i = 0; i < 70; i++) {
        const piece = document.createElement('div');
        piece.className = 'confetti-piece';
        piece.style.cssText = `position: absolute; left: ${Math.random() * 100}%; top: ${Math.random() * -20}%; background: ${colors[Math.floor(Math.random() * colors.length)]}; width: 8px; height: 8px; animation: confettiFall ${Math.random() * 2 + 1}s linear forwards;`;
        container.appendChild(piece);
    }
}

document.getElementById('btn-start').onclick = () => { currentQuestion = 0; scores = { A: 0, B: 0, C: 0 }; renderQuestion(); showScreen('quiz'); };
document.getElementById('nav-btn-start').onclick = (e) => { e.preventDefault(); document.getElementById('btn-start').click(); };

btnNext.onclick = () => {
    scores[selectedOption]++;
    currentQuestion++;
    if (currentQuestion >= QUESTIONS.length) showLoadingThenResult();
    else renderQuestion();
};

document.getElementById('btn-challenge-whatsapp').onclick = () => {
    const fullUrl = window.location.protocol + "//" + window.location.host + window.location.pathname + '?winner=' + currentWinner;
    const msg = `I'm officially a ${PERSONALITIES[currentWinner].title} on VibeMetric! 🎸 Challenge me: ${fullUrl}`;
    window.open(`https://api.whatsapp.com/send?text=${encodeURIComponent(msg)}`, '_blank');
};

document.getElementById('btn-copy-link').onclick = () => {
    const fullUrl = window.location.protocol + "//" + window.location.host + window.location.pathname + '?winner=' + currentWinner;
    navigator.clipboard.writeText(fullUrl).then(() => {
        document.getElementById('btn-copy-link').textContent = 'Copied!';
        setTimeout(() => document.getElementById('btn-copy-link').textContent = 'Copy Link', 2000);
    });
};

document.querySelectorAll('.btn-retake-quiz').forEach(btn => btn.onclick = (e) => { e.preventDefault(); showScreen('intro'); });

// No URL routing for questions in this simple version, but results are stateful
handleUrlOnLoad();

window.addEventListener('popstate', (event) => {
    if (event.state && event.state.winner) {
        renderResult(event.state.winner);
        showScreen('result');
    } else {
        showScreen('intro');
    }
});
