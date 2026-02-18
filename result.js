/* =====================================================
   RESULT ENGINE — AI-Vibe Check 2026
   Handles dynamic rendering, sharing, and viral effects
   ===================================================== */

// Personality Data (Merged with the dark-mesh aesthetic)
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

// URL State
const urlParams = new URLSearchParams(window.location.search);
const winner = urlParams.get('winner') || 'A';
const myScore = urlParams.get(winner.toLowerCase()) || 0;
const total = 10; // Total questions

const p = PERSONALITIES[winner];

// ===== RENDER RESULT =====
document.addEventListener('DOMContentLoaded', () => {
    // Set accent color CSS var
    document.documentElement.style.setProperty('--result-accent', p.accentColor);

    document.getElementById('result-emoji').textContent = p.emoji;
    document.getElementById('result-title').textContent = p.title;
    document.getElementById('result-burn').textContent = p.theBurn;
    document.getElementById('result-flex').textContent = p.theFlex;

    document.getElementById('stat-score').textContent = `${myScore}/${total}`;
    document.getElementById('stat-pct').textContent = `${p.matchPct}%`;
    document.getElementById('stat-rank').textContent = p.rank;

    // Traits
    const traitsEl = document.getElementById('result-traits');
    traitsEl.innerHTML = p.traits.map(t => `<span class="trait-tag">${t}</span>`).join('');

    // Share setup
    const shareUrl = window.location.origin + '/index.html';
    const shareText = `I got ${p.title} on the AI-Vibe Check! ${p.emoji} Beat my score if you're not an AI Muggle.`;

    document.getElementById('copy-link-input').value = shareUrl;

    // TikTok share
    document.getElementById('btn-share-tiktok').onclick = () => {
        const url = `https://www.tiktok.com/share?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent(shareText)}`;
        window.open(url, '_blank', 'noopener');
    };

    // Instagram share
    document.getElementById('btn-share-instagram').onclick = () => {
        navigator.clipboard.writeText(`${shareText} ${shareUrl}`).then(() => {
            alert('Link copied! Open Instagram and paste it in your story or bio.');
        }).catch(() => {
            window.open('https://www.instagram.com/', '_blank', 'noopener');
        });
    };

    // WhatsApp Challenge
    document.getElementById('btn-challenge-whatsapp').onclick = () => {
        const challengeMsg = `Hey, I got ${p.title} on the AI-Vibe Check. Bet you can't beat me: ${shareUrl}`;
        const url = `https://api.whatsapp.com/send?text=${encodeURIComponent(challengeMsg)}`;
        window.open(url, '_blank', 'noopener');
    };

    // Copy Link logic
    document.getElementById('btn-copy-link').addEventListener('click', () => {
        const input = document.getElementById('copy-link-input');
        const btn = document.getElementById('btn-copy-link');
        navigator.clipboard.writeText(input.value).then(() => {
            btn.textContent = 'Copied!';
            setTimeout(() => { btn.textContent = 'Copy Link'; }, 2500);
        });
    });

    // Retake logic
    document.getElementById('btn-retake').addEventListener('click', () => {
        window.location.href = 'index.html';
    });

    launchConfetti();
});

// ===== CONFETTI =====
function launchConfetti() {
    const container = document.getElementById('confetti-container');
    const colors = ['#a855f7', '#22d3ee', '#ec4899', '#f59e0b', '#10b981', '#fff', p.accentColor];
    for (let i = 0; i < 70; i++) {
        const piece = document.createElement('div');
        piece.className = 'confetti-piece';
        piece.style.cssText = `
            left: ${Math.random() * 100}%;
            top: ${Math.random() * -20}%;
            background: ${colors[Math.floor(Math.random() * colors.length)]};
            width: ${Math.random() * 10 + 4}px;
            height: ${Math.random() * 10 + 4}px;
            border-radius: ${Math.random() > 0.5 ? '50%' : '2px'};
            animation: confettiFall ${Math.random() * 2.5 + 1.5}s ${Math.random() * 1.5}s linear forwards;
            transform: rotate(${Math.random() * 360}deg);
        `;
        container.appendChild(piece);
    }
    setTimeout(() => { container.innerHTML = ''; }, 6000);
}
