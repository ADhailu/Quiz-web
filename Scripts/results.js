/* =====================================================
   RESULTS ENGINE — VibeMetric.ai
   Standalone logic for dedicated results page
   ===================================================== */

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

let currentWinner = null;

function renderResult(winner) {
    const p = PERSONALITIES[winner];
    if (!p) {
        window.location.href = 'index.html';
        return;
    }
    currentWinner = winner;

    document.documentElement.style.setProperty('--result-accent', p.accentColor);

    const titleEl = document.getElementById('result-title');
    titleEl.textContent = p.title;
    titleEl.style.opacity = '0';
    titleEl.style.transform = 'translateY(10px)';

    requestAnimationFrame(() => {
        titleEl.style.transition = 'all 0.8s cubic-bezier(0.22, 1, 0.36, 1)';
        titleEl.style.opacity = '1';
        titleEl.style.transform = 'translateY(0)';
    });

    document.getElementById('result-burn').textContent = p.theBurn;
    document.getElementById('result-flex').textContent = p.theFlex;

    // Fixed mock score for results page
    document.getElementById('stat-score').textContent = `10/10`;
    document.getElementById('stat-pct').textContent = `${p.matchPct}%`;
    document.getElementById('stat-rank').textContent = p.rank;

    const traitsEl = document.getElementById('result-traits');
    traitsEl.innerHTML = p.traits.map(t => `<span class="trait-tag">${t}</span>`).join('');

    // Sharing Links
    const shareUrl = window.location.href;
    const shareText = `I got ${p.title} on VibeMetric.ai! ${p.emoji} Beat my score!`;
    document.getElementById('copy-link-input').value = shareUrl;

    animateEngagementModule();
    launchConfetti();
    refreshAds();
}

function refreshAds() {
    try {
        if (window.adsbygoogle) {
            (adsbygoogle = window.adsbygoogle || []).push({});
        }
    } catch (e) {
        console.warn("Ads failed reset", e);
    }
}

function animateEngagementModule() {
    // Sequential Entrance
    document.querySelectorAll('.engagement-card').forEach(card => {
        card.classList.remove('reveal-card');
        void card.offsetWidth; // Force reflow
        card.classList.add('reveal-card');
    });

    // Mock distribution
    const stats = { A: 15, B: 28, C: 42, D: 15 };
    setTimeout(() => {
        document.getElementById('bar-a').style.width = stats.A + '%';
        document.getElementById('bar-b').style.width = stats.B + '%';
        document.getElementById('bar-c').style.width = stats.C + '%';
        document.getElementById('bar-d').style.width = stats.D + '%';
    }, 500);

    // Poll Logic
    const pollContainer = document.getElementById('poll-container');
    const questionView = pollContainer.querySelector('.poll-question-view');
    const resultsView = pollContainer.querySelector('.poll-results-view');
    const pollButtons = pollContainer.querySelectorAll('.poll-opt');

    pollButtons.forEach(btn => {
        btn.onclick = () => {
            const vote = btn.dataset.vote;
            questionView.classList.add('slide-hidden');
            setTimeout(() => {
                questionView.style.display = 'none';
                resultsView.classList.remove('slide-hidden');
                resultsView.classList.add('slide-visible');
                const yesPct = vote === 'yes' ? 68 : 64;
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
            width: ${Math.random() * 8 + 4}px; height: ${Math.random() * 8 + 4}px;
            animation: confettiFall ${Math.random() * 2 + 1.5}s linear forwards;
        `;
        container.appendChild(piece);
    }
}

// Share Button Logic
document.getElementById('btn-challenge-whatsapp').onclick = () => {
    // Reconstruct full URL for viral sharing
    const fullUrl = window.location.protocol + "//" + window.location.host + window.location.pathname + '?winner=' + currentWinner;
    const msg = `I got ${PERSONALITIES[currentWinner].title} on VibeMetric.ai! ${PERSONALITIES[currentWinner].emoji} Challenge me: ${fullUrl}`;
    window.open(`https://api.whatsapp.com/send?text=${encodeURIComponent(msg)}`, '_blank');
};

document.getElementById('btn-copy-link').onclick = () => {
    const fullUrl = window.location.protocol + "//" + window.location.host + window.location.pathname + '?winner=' + currentWinner;
    navigator.clipboard.writeText(fullUrl).then(() => {
        const btn = document.getElementById('btn-copy-link');
        btn.textContent = 'Copied!';
        setTimeout(() => btn.textContent = 'Copy Link', 2000);
    });
};

// Initial Load
window.onload = () => {
    const params = new URLSearchParams(window.location.search);
    let winner = params.get('winner');

    // Stealth Mode: If winner in URL, store it and clean the bar
    if (winner) {
        winner = winner.toUpperCase();
        sessionStorage.setItem('last_quiz_winner', winner);

        // Clean the URL bar (Remove ?winner=X, and .html if on web server)
        let cleanUrl = window.location.protocol + "//" + window.location.host + window.location.pathname;
        if (window.location.protocol.startsWith('http')) {
            cleanUrl = cleanUrl.replace('.html', '');
        }
        window.history.replaceState(null, '', cleanUrl);
    } else {
        // Try to recover from session if user refreshed
        winner = sessionStorage.getItem('last_quiz_winner');
    }

    if (winner && PERSONALITIES[winner]) {
        renderResult(winner);
    } else {
        window.location.href = 'index.html';
    }
};
