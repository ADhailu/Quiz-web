/* =====================================================
   SPONSOR ENGINE — VibeMetric.ai
   Global logic for Sponsor modal
   ===================================================== */

document.addEventListener('DOMContentLoaded', () => {
    const sponsorBtn = document.getElementById('btn-open-sponsor');
    const modal = document.getElementById('sponsor-modal');
    const closeBtn = document.getElementById('btn-close-sponsor-x');
    const closeAction = document.getElementById('btn-close-sponsor');

    if (!sponsorBtn || !modal) return;

    const openModal = () => {
        modal.classList.add('active');
        document.body.style.overflow = 'hidden'; // Prevent scroll
    };

    const closeModal = () => {
        modal.classList.remove('active');
        document.body.style.overflow = '';
    };

    sponsorBtn.onclick = (e) => {
        e.preventDefault();
        openModal();
    };

    if (closeBtn) closeBtn.onclick = closeModal;
    if (closeAction) closeAction.onclick = closeModal;

    // Close on backdrop click
    modal.onclick = (e) => {
        if (e.target === modal) closeModal();
    };
});
