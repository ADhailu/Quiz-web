/* =====================================================
   RESULT PAGE SHARED SCRIPT
   Reads URL params, renders personality result,
   handles confetti + sharing + WhatsApp challenge
   ===================================================== */

const PERSONALITIES = {
    A: {
        emoji: "🤖",
        title: "The AI Overlord",
        subtitle: "90-100% Match: You are the machine.",
        description: "You're living in 2035 while everyone else is stuck in 2024. You have AI agents for your AI agents, your prompts have prompts, and you've probably already automated reading this result. You are the future — and honestly? It's a little terrifying. In the best way.",
        traits: ["Hyper-Efficient", "Prompt Wizard", "Early Adopter", "Automation King", "Future-Native"],
        matchPct: 97,
        rank: "#1 Rarest",
        accentColor: "#a855f7",
        accentGlow: "rgba(168,85,247,0.4)",
        badgeClass: "badge--fire",
        shareEmoji: "🤖",
        shareCaption: "I just took the 2026 AI-Vibe Check and I’m officially an AI Overlord. 🤖 My aura is basically digital at this point. If the robots take over, I’m the manager. Can you beat my score or are you still a Muggle? 💅 #AI2026 #VibeCheck #FutureProof"
    },
    B: {
        emoji: "💻",
        title: "The Prompt Engineer",
        subtitle: "60-89% Match: You speak fluent Robot.",
        description: "You're not obsessed with AI, but you're not scared of it either. You've figured out exactly where it fits in your workflow and you use it with surgical precision. You're the person in the room who actually gets things done while everyone else is still arguing about whether AI is good or bad.",
        traits: ["Fluent in Robot", "Surgical Precision", "Pragmatic", "Efficient", "Vibe-Locked"],
        matchPct: 81,
        rank: "#2 Rare",
        accentColor: "#22d3ee",
        accentGlow: "rgba(34,211,238,0.4)",
        badgeClass: "badge--ice",
        shareEmoji: "💻",
        shareCaption: "I’m a Prompt Engineer! 💻 I speak fluent Robot. My prompts are so clean the AI never hallucinations. Check your AI status here before you get left behind in 2025! 🚀 #PromptMaster #2026Tech #AI"
    },
    C: {
        emoji: "📸",
        title: "The AI Tourist",
        subtitle: "30-59% Match: Just here for the memes.",
        description: "You've heard all the hype, you've seen the demos, and you're still not sold. You type your own emails, you Google your own questions, and you're proud of it. The good news? Your healthy skepticism keeps you grounded. The bad news? The robots are coming and they don't care about your feelings.",
        traits: ["Homework Helper", "Meme Maker", "Part-Time AI", "Grounded", "Human-ish"],
        matchPct: 54,
        rank: "#3 Uncommon",
        accentColor: "#f59e0b",
        accentGlow: "rgba(245,158,11,0.4)",
        badgeClass: "badge--lightning",
        shareEmoji: "📸",
        shareCaption: "I’m an AI Tourist. 📸 I use GPT to do my homework and make memes, but I’m still 100% human (I think). See where you land on the 2026 AI scale! #AIVibe #2026"
    },
    D: {
        emoji: "🛖",
        title: "The AI Muggle",
        subtitle: "0-29% Match: Living in 2012.",
        description: "In a world going full robot, you're doubling down on what makes us human. Empathy, connection, presence — these are your weapons. And here's the secret the tech bros don't want you to know: the most valuable skill in an AI world isn't prompting. It's being genuinely, deeply human. You've already won.",
        traits: ["Analog Original", "Authentic Human", "Cloud Skeptic", "Unc Energy", "Offline Legend"],
        matchPct: 18,
        rank: "#4 Common",
        accentColor: "#ec4899",
        accentGlow: "rgba(236,72,153,0.4)",
        badgeClass: "badge--star",
        shareEmoji: "🛖",
        shareCaption: "Help... I’m an AI Muggle. 🛖 I still think 'The Cloud' is for rain. Apparently, I’m living in 2012 while everyone else is in 2026. Take the test and see if you’re as 'Unc' as I am. 😂 #AIFail #BoomerEnergy #MuggleLife"
    }
};

// ===== READ URL PARAMS =====
const params = new URLSearchParams(window.location.search);
const winner = params.get('winner') || 'A';
const scoreA = parseInt(params.get('a') || 0);
const scoreB = parseInt(params.get('b') || 0);
const scoreC = parseInt(params.get('c') || 0);
const scoreD = parseInt(params.get('d') || 0);
const total = scoreA + scoreB + scoreC + scoreD || 10;
const myScore = { A: scoreA, B: scoreB, C: scoreC, D: scoreD }[winner];

const p = PERSONALITIES[winner];

// ===== RENDER RESULT =====
document.addEventListener('DOMContentLoaded', () => {
    // Set accent color CSS var
    document.documentElement.style.setProperty('--result-accent', p.accentColor);
    document.documentElement.style.setProperty('--result-glow', p.accentGlow);

    document.getElementById('result-emoji').textContent = p.emoji;
    document.getElementById('result-title').textContent = p.title;
    document.getElementById('result-subtitle').textContent = p.subtitle;
    document.getElementById('result-description').textContent = p.description;
    document.getElementById('stat-score').textContent = `${myScore}/${total}`;
    document.getElementById('stat-pct').textContent = `${p.matchPct}%`;
    document.getElementById('stat-rank').textContent = p.rank;

    // Traits
    const traitsEl = document.getElementById('result-traits');
    traitsEl.innerHTML = p.traits.map(t => `<span class="trait-tag">${t}</span>`).join('');

    // Share setup
    const shareText = p.shareCaption;
    const shareUrl = window.location.origin + '/index.html';
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
        const label = document.getElementById('copy-btn-text');
        navigator.clipboard.writeText(input.value).then(() => {
            btn.classList.add('copied');
            label.textContent = 'Copied!';
            setTimeout(() => { btn.classList.remove('copied'); label.textContent = 'Copy Link'; }, 2500);
        }).catch(() => { input.select(); document.execCommand('copy'); });
    });

    // Retake logic
    document.getElementById('btn-retake').addEventListener('click', () => {
        window.location.href = 'index.html';
    });

    // Wait 0.5s before showing interactions to simulate the "loading" feeling/ad clearing
    // Content is already rendered, but we want the user to process the result first.
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
