/* =====================================================
   QUIZ ENGINE — The 2026 AI-Vibe Check
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

// Result page mapping
const RESULT_PAGES = {
    A: 'result-a.html',
    B: 'result-b.html',
    C: 'result-c.html',
    D: 'result-d.html'
};

// ===== STATE =====
let currentQuestion = 0;
let scores = { A: 0, B: 0, C: 0, D: 0 };
let selectedOption = null;
let isTransitioning = false;

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
    console.log("REFRESHING ADS: Triggers AdSense re-calculation for multi-page behavior.");
    try {
        if (window.adsbygoogle) {
            // Push an empty object to trigger refresh of all ad units on the page
            (adsbygoogle = window.adsbygoogle || []).push({});
            // For custom targeting or specific refreshes, you would use:
            // window.googletag.pubads().refresh(); 
            // if using Google Ad Manager (GAM)
        }
    } catch (e) {
        console.warn("AdSense refresh failed. This is normal if script isn't loaded yet.", e);
    }
}

// ===== ROUTING LOGIC =====
function syncUrlWithState(qIndex, push = true) {
    const qNum = qIndex + 1;
    const url = new URL(window.location);
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
            renderQuestion(false); // Don't push state again
        } else {
            showScreen('intro');
        }
    } else {
        showScreen('intro');
    }
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
}

// ===== PROGRESS =====
function updateProgress() {
    const pct = Math.round((currentQuestion / QUESTIONS.length) * 100);
    progressFill.style.width = pct + '%';
    progressGlow.style.width = pct + '%';
    progressLabel.textContent = `Question ${currentQuestion + 1} of ${QUESTIONS.length}`;
    progressPct.textContent = pct + '%';
    progressTrack.setAttribute('aria-valuenow', pct);
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

    // URL Routing
    if (pushToHistory) {
        syncUrlWithState(currentQuestion);
    }

    // Refresh Ads
    refreshAds();

    const letters = ['A', 'B', 'C', 'D'];
    q.options.forEach((opt, i) => {
        const btn = document.createElement('button');
        btn.className = 'option-btn';
        btn.setAttribute('aria-label', `Option ${letters[i]}: ${opt.text}`);
        btn.innerHTML = `
            <span class="option-letter">${letters[i]}</span>
            <span class="option-text">${opt.text}</span>
        `;
        btn.addEventListener('click', () => selectOption(btn, opt.type));
        btn.style.opacity = '0';
        btn.style.transform = 'translateX(-16px)';
        optionsCont.appendChild(btn);
        setTimeout(() => {
            btn.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
            btn.style.opacity = '1';
            btn.style.transform = 'translateX(0)';
        }, i * 80);
    });

    updateProgress();
}

// ===== SELECT OPTION =====
function selectOption(btn, type) {
    if (isTransitioning) return;
    optionsCont.querySelectorAll('.option-btn').forEach(b => b.classList.remove('selected'));
    btn.classList.add('selected');
    selectedOption = type;
    btnNext.disabled = false;
    btn.style.transform = 'translateX(4px) scale(1.01)';
    setTimeout(() => { btn.style.transform = 'translateX(4px)'; }, 150);
}

// ===== NEXT QUESTION =====
function nextQuestion() {
    if (!selectedOption || isTransitioning) return;
    isTransitioning = true;

    scores[selectedOption]++;

    const card = document.getElementById('question-card');
    card.style.transition = 'opacity 0.25s ease, transform 0.25s ease';
    card.style.opacity = '0';
    card.style.transform = 'translateX(-30px)';

    setTimeout(() => {
        currentQuestion++;
        if (currentQuestion >= QUESTIONS.length) {
            showLoadingThenNavigate();
        } else {
            card.style.transition = 'none';
            card.style.opacity = '0';
            card.style.transform = 'translateX(30px)';
            renderQuestion(true); // Push to history
            requestAnimationFrame(() => {
                card.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
                card.style.opacity = '1';
                card.style.transform = 'translateX(0)';
            });
            isTransitioning = false;
        }
    }, 280);
}

// ===== LOADING → NAVIGATE TO DEDICATED RESULT PAGE =====
function showLoadingThenNavigate() {
    showScreen('loading');
    progressFill.style.width = '100%';
    progressGlow.style.width = '100%';

    // INTERSTITIAL AD DELAY: 5 seconds
    setTimeout(() => {
        const winner = Object.entries(scores).sort((a, b) => b[1] - a[1])[0][0];
        const params = new URLSearchParams({
            winner,
            a: scores.A,
            b: scores.B,
            c: scores.C,
            d: scores.D
        });
        window.location.href = `${RESULT_PAGES[winner]}?${params.toString()}`;
    }, 5000);
}

// ===== EVENT LISTENERS =====
document.getElementById('btn-start').addEventListener('click', () => {
    currentQuestion = 0;
    renderQuestion(true);
    showScreen('quiz');
});

btnNext.addEventListener('click', nextQuestion);

window.addEventListener('popstate', (event) => {
    if (event.state && event.state.q !== undefined) {
        currentQuestion = event.state.q;
        renderQuestion(false); // No push on back button
        showScreen('quiz');
    } else {
        showScreen('intro');
    }
});

// INITIALIZE
handleUrlOnLoad();
