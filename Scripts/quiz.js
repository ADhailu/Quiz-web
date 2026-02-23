/* =====================================================
   QUIZ ENGINE — VibeMetric.ai
   4 Types: A=AI Overlord  B=Prompt Engineer  C=AI Tourist  D=AI Muggle
   ===================================================== */

const QUESTIONS = [
    {
        text: "How do you write a professional email in 2026?",
        options: [
            { text: "Write three bullet points and let AI 'Professional-ify' it", type: "A" },
            { text: "I don't. My AI agent talks to their AI agent", type: "B" },
            { text: "Type it word-for-word like a caveman", type: "C" },
            { text: "I record a quick video so they can see my face and hear my voice", type: "D" }
        ]
    },
    {
        text: "You see a video of a politician dancing with a giant penguin. Your first thought is:",
        options: [
            { text: "Wow, that penguin is talented!", type: "A" },
            { text: "Check the metadata—that's definitely a deepfake.", type: "B" },
            { text: "Which AI model did they use? The lighting is slightly off.", type: "C" },
            { text: "I hope the politician is in on the joke and not being bullied.", type: "D" }
        ]
    },
    {
        text: "What does 'Prompting' mean to you?",
        options: [
            { text: "It's how I talk to my AI agents", type: "A" },
            { text: "It's a skill I'm mastering to optimize workflows", type: "B" },
            { text: "It's a creative art form — like poetry for machines", type: "C" },
            { text: "I don't really do it. I just ask for what I need.", type: "D" }
        ]
    },
    {
        text: "When you're stuck on a math problem, you:",
        options: [
            { text: "Cry.", type: "A" },
            { text: "Use a calculator.", type: "B" },
            { text: "Ask ChatGPT.", type: "C" },
            { text: "Point my phone at it and ask the AI to explain it like I'm five.", type: "D" }
        ]
    },
    {
        text: "Your 'Digital Aura' is mostly made of:",
        options: [
            { text: "Aesthetic AI-edited travel photos", type: "A" },
            { text: "Custom-coded scripts and high-level rizz", type: "B" },
            { text: "Grainy selfies and 2010 memes", type: "C" },
            { text: "Wholesome group chats and heartfelt voice notes", type: "D" }
        ]
    },
    {
        text: "'Brain Rot' in 2026 is caused by:",
        options: [
            { text: "Too much TV.", type: "A" },
            { text: "Scrolling 4 hours of AI-generated TikToks.", type: "B" },
            { text: "Not using AI to filter your feed.", type: "C" },
            { text: "Forgetting what it's like to just sit in silence.", type: "D" }
        ]
    },
    {
        text: "What's your reaction when an AI 'Hallucinates' (gives a wrong answer)?",
        options: [
            { text: "My prompt was mid. I need to lock in and re-prompt.", type: "A" },
            { text: "I should probably double-check that on Google.", type: "B" },
            { text: "See? The machines are stupid!", type: "C" },
            { text: "I'll just ask it to clarify — everyone makes mistakes sometimes.", type: "D" }
        ]
    },
    {
        text: "Pick a 2026 Superpower:",
        options: [
            { text: "Flying.", type: "A" },
            { text: "Instant translation of every language.", type: "B" },
            { text: "A chip in my brain that connects directly to the cloud.", type: "C" },
            { text: "The ability to make anyone feel truly heard and understood.", type: "D" }
        ]
    },
    {
        text: "Your friend says their new outfit is 'Bussin.' You:",
        options: [
            { text: "Use AI to find the exact brand and a 20% discount code", type: "A" },
            { text: "Say 'No Cap, that fit ate.'", type: "B" },
            { text: "Ask if they need a bus pass.", type: "C" },
            { text: "Tell them they look incredible and you love their confidence.", type: "D" }
        ]
    },
    {
        text: "Do you think AI will take your job?",
        options: [
            { text: "AI won't take my job, but a human using AI will.", type: "A" },
            { text: "No, I'm the one who controls the AI.", type: "B" },
            { text: "Yes, and I'm scared.", type: "C" },
            { text: "AI can't replace the genuine human connection I provide.", type: "D" }
        ]
    }
];

const PERSONALITIES = {
    A: {
        emoji: "🤖",
        title: "The AI Overlord",
        theBurn: "You’ve forgotten what a pen feels like. You probably try to 'Control+F' your physical books and you've automated your own morning coffee. You're barely human anymore—you're just a really well-dressed algorithm.",
        theFlex: "You are the 1%. While others are panic-googling, you're building empires with three-word prompts. You're not just ready for 2026; you're already halfway through 2030. Infinite Aura.",
        traits: ["Infinite Aura", "Prompt God", "Future-Native", "Automation King", "Zero Friction"],
        matchPct: 98,
        rank: "#1 Legendary",
        accentColor: "#a855f7"
    },
    B: {
        emoji: "👨‍🍳",
        title: "The Prompt Chef",
        theBurn: "You spend 4 hours a day talking to a bot and call it 'networking.' If the Wi-Fi goes down for ten minutes, your entire personality might actually delete itself.",
        theFlex: "You're the person who actually gets things done. You’ve mastered the tools of the future without losing your soul. You're 'Locked In' and basically un-fireable. High-level energy.",
        traits: ["Fluent in Robot", "Surgical Precision", "Pragmatic", "Efficient", "Vibe-Locked"],
        matchPct: 84,
        rank: "#2 Epic",
        accentColor: "#22d3ee"
    },
    C: {
        emoji: "📸",
        title: "The AI Tourist",
        theBurn: "You use AI for the same thing you use your gym membership: looking at it occasionally and feeling guilty. You're a 'Hello World' person in a 'Neural Network' world.",
        theFlex: "You have a life. You’re not a slave to the machine, and your brain still works without a charging cable. You’re the bridge between the old world and the new—a healthy, normal human.",
        traits: ["Homework Helper", "Meme Maker", "Part-Time AI", "Grounded", "Human-ish"],
        matchPct: 52,
        rank: "#3 Rare",
        accentColor: "#f59e0b"
    },
    D: {
        emoji: "🛖",
        title: "The AI Muggle",
        theBurn: "Your brain is 404-coded. You still think 'The Cloud' is for rain and you probably type with your index fingers. Pure 'Unc' energy.",
        theFlex: "Lowkey, you’re the most 'Based' person here. While we’re all rotting our brains with AI, you’re out here having real conversations and living rent-free in the physical world. You’re the main character of the 'Human-core' movement.",
        traits: ["Analog Original", "Authentic Human", "Cloud Skeptic", "Unc Energy", "Offline Legend"],
        matchPct: 12,
        rank: "#4 Classic",
        accentColor: "#ec4899"
    }
};

// ===== STATE =====
let currentQuestion = 0;
let scores = { A: 0, B: 0, C: 0, D: 0 };
let selectedOption = null;
let isTransitioning = false;
let currentWinner = null;

// ===== DOM REFS =====
const screens = {
    intro: document.getElementById('screen-intro'),
    quiz: document.getElementById('screen-quiz'),
    loading: document.getElementById('screen-loading')
};

const progressFill = document.getElementById('progress-fill');
const progressGlow = document.getElementById('progress-glow');
const progressLabel = document.getElementById('progress-label');
const progressPct = document.getElementById('progress-pct');
const progressTrack = document.querySelector('.progress-track');
const questionText = document.getElementById('question-text');
const optionsCont = document.getElementById('options-container');
const btnNext = document.getElementById('btn-next');
const btnNextLabel = document.getElementById('btn-next-label');
const qNumBadge = document.getElementById('question-number-badge');

// ===== AD REFRESH LOGIC =====
function refreshAds() {
    try {
        if (window.adsbygoogle) {
            (adsbygoogle = window.adsbygoogle || []).push({});
        }
    } catch (e) {
        console.warn("AdSense refresh failed.", e);
    }
}

// ===== ROUTING LOGIC =====
function syncUrlWithState(qIndex, push = true) {
    const qNum = qIndex + 1;
    const url = new URL(window.location);
    url.searchParams.delete('winner');
    url.searchParams.set('q', qNum);

    if (push) {
        history.pushState({ q: qIndex }, `Question ${qNum}`, url.pathname + url.search);
    }
}


function handleUrlOnLoad() {
    const params = new URLSearchParams(window.location.search);
    const qParam = params.get('q');

    if (qParam) {
        const qIndex = parseInt(qParam) - 1;
        if (qIndex >= 0 && qIndex < QUESTIONS.length) {
            currentQuestion = qIndex;
            showScreen('quiz');
            renderQuestion(false);
            return;
        }
    }
    showScreen('intro');
}

// ===== SCREEN TRANSITIONS =====
function showScreen(name) {
    Object.values(screens).forEach(s => {
        if (s) {
            s.classList.remove('active');
            s.style.display = 'none';
        }
    });
    const target = screens[name];
    if (target) {
        target.style.display = 'flex';
        requestAnimationFrame(() => {
            requestAnimationFrame(() => { target.classList.add('active'); });
        });
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// ===== RENDER QUESTION =====
function renderQuestion(pushToHistory = true) {
    const q = QUESTIONS[currentQuestion];
    questionText.textContent = q.text;
    qNumBadge.textContent = `Q${currentQuestion + 1}`;
    btnNextLabel.textContent = currentQuestion === QUESTIONS.length - 1 ? 'See My Result 🔮' : 'Next Question';

    optionsCont.innerHTML = '';
    selectedOption = null;
    btnNext.disabled = true;

    if (pushToHistory) syncUrlWithState(currentQuestion);
    refreshAds();

    const letters = ['A', 'B', 'C', 'D'];
    q.options.forEach((opt, i) => {
        const btn = document.createElement('button');
        btn.className = 'option-btn';
        btn.innerHTML = `<span class="option-letter">${letters[i]}</span><span class="option-text">${opt.text}</span>`;
        btn.addEventListener('click', () => {
            optionsCont.querySelectorAll('.option-btn').forEach(b => b.classList.remove('selected'));
            btn.classList.add('selected');
            selectedOption = opt.type;
            btnNext.disabled = false;
        });
        optionsCont.appendChild(btn);
    });

    const pct = Math.round((currentQuestion / QUESTIONS.length) * 100);
    progressFill.style.width = pct + '%';
    progressGlow.style.width = pct + '%';
    progressLabel.textContent = `Question ${currentQuestion + 1} of ${QUESTIONS.length}`;
    progressPct.textContent = pct + '%';
}


// ===== POST-QUIZ ENGAGEMENT LOGIC =====
function animateEngagementModule() {
    // 0. Trigger Sequential Entrance
    document.querySelectorAll('.engagement-card').forEach(card => {
        card.classList.remove('reveal-card');
        void card.offsetWidth; // Force reflow
        card.classList.add('reveal-card');
    });

    // 1. Aura Leaderboard - Mock distribution
    const stats = { A: 15, B: 28, C: 42, D: 15 }; // Mock global data
    setTimeout(() => {
        document.getElementById('bar-a').style.width = stats.A + '%';
        document.getElementById('bar-b').style.width = stats.B + '%';
        document.getElementById('bar-c').style.width = stats.C + '%';
        document.getElementById('bar-d').style.width = stats.D + '%';
    }, 500);

    // 2. Micro-Poll Logic
    const pollContainer = document.getElementById('poll-container');
    const questionView = pollContainer.querySelector('.poll-question-view');
    const resultsView = pollContainer.querySelector('.poll-results-view');
    const pollButtons = pollContainer.querySelectorAll('.poll-opt');

    pollButtons.forEach(btn => {
        btn.onclick = () => {
            const vote = btn.dataset.vote;
            questionView.classList.add('slide-hidden');

            // Mock result reveal
            setTimeout(() => {
                questionView.style.display = 'none';
                resultsView.classList.remove('slide-hidden');
                resultsView.classList.add('slide-visible');

                const yesPct = vote === 'yes' ? 68 : 64; // Slight bias for fun
                const noPct = 100 - yesPct;

                setTimeout(() => {
                    document.getElementById('poll-bar-yes').style.width = yesPct + '%';
                    document.getElementById('poll-bar-no').style.width = noPct + '%';
                    document.getElementById('poll-pct-yes').textContent = yesPct + '%';
                    document.getElementById('poll-pct-no').textContent = noPct + '%';
                }, 100);
            }, 300);
        };
    });
}

// ===== LOADING → RESULT (Redirect Flow) =====
function showLoadingThenResult() {
    const modal = document.getElementById('ad-interstitial-modal');
    const closeBtn = document.getElementById('btn-close-ad');
    const closeBtnX = document.getElementById('btn-close-ad-x');
    const calcState = document.getElementById('modal-calculating');
    const adState = document.getElementById('modal-ad-content');

    // 1. Calculate Winner
    const winner = Object.entries(scores).sort((a, b) => b[1] - a[1])[0][0];

    // 2. Show Modal (Initial Calc State)
    calcState.classList.add('active');
    adState.classList.remove('active');
    modal.classList.add('active');

    // 3. Switch to Ad State after 2.5s
    setTimeout(() => {
        calcState.classList.remove('active');
        adState.classList.add('active');
        refreshAds();
    }, 2500);

    const closeModalAndRedirect = () => {
        modal.classList.remove('active');
        // Restore .html for local compatibility; results.js will clean it on load
        window.location.href = `results.html?winner=${winner}`;
    };

    closeBtn.onclick = closeModalAndRedirect;
    closeBtnX.onclick = closeModalAndRedirect;
}

// ===== CONFETTI =====
function launchConfetti() {
    const container = document.getElementById('confetti-container');
    if (!container) return;
    container.innerHTML = '';
    const colors = ['#a855f7', '#22d3ee', '#ec4899', '#f59e0b', '#10b981', '#fff'];
    for (let i = 0; i < 70; i++) {
        const piece = document.createElement('div');
        piece.className = 'confetti-piece';
        piece.style.cssText = `
            position: absolute; left: ${Math.random() * 100}%; top: ${Math.random() * -20}%;
            background: ${colors[Math.floor(Math.random() * colors.length)]};
            width: ${Math.random() * 10 + 4}px; height: ${Math.random() * 10 + 4}px;
            animation: confettiFall ${Math.random() * 2.5 + 1.5}s linear forwards;
        `;
        container.appendChild(piece);
    }
}

// ===== SAFE ELEMENT LISTENER =====
function safeAddListener(id, event, callback) {
    const el = document.getElementById(id);
    if (el) el.addEventListener(event, callback);
}

// ===== EVENT LISTENERS =====
safeAddListener('btn-start', 'click', startQuiz);
safeAddListener('btn-start-footer', 'click', startQuiz);
safeAddListener('nav-btn-start', 'click', (e) => { e.preventDefault(); startQuiz(); });

function startQuiz() {
    currentQuestion = 0;
    scores = { A: 0, B: 0, C: 0, D: 0 };
    renderQuestion(true);
    showScreen('quiz');
}

if (btnNext) {
    btnNext.addEventListener('click', () => {
        scores[selectedOption]++;
        currentQuestion++;
        if (currentQuestion >= QUESTIONS.length) {
            showLoadingThenResult();
        } else {
            renderQuestion(true);
        }
    });
}

document.querySelectorAll('.btn-retake-quiz').forEach(btn => btn.onclick = (e) => {
    e.preventDefault();
    const url = new URL(window.location);
    url.searchParams.delete('q');
    url.searchParams.delete('winner');
    // For local file safety, we just push the base search or empty string
    history.pushState(null, '', url.search || window.location.pathname);
    showScreen('intro');
});

window.addEventListener('popstate', (event) => {
    if (event.state && event.state.q !== undefined) {
        currentQuestion = event.state.q;
        renderQuestion(false);
        showScreen('quiz');
    } else if (event.state && event.state.winner) {
        renderResult(event.state.winner);
        showScreen('result');
    } else {
        showScreen('intro');
    }
});

handleUrlOnLoad();
