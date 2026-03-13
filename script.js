/**
 * Inmedi-k - Interactive Logic
 */

document.addEventListener('DOMContentLoaded', () => {

    // 1. Footer Year
    const yearEl = document.getElementById('currentYear');
    if (yearEl) {
        yearEl.textContent = new Date().getFullYear();
    }

    // 2. Interactive Map Logic
    const branchItems = document.querySelectorAll('.branch-item');
    const mapIframe = document.getElementById('map-iframe');

    if (mapIframe && branchItems.length > 0) {
        branchItems.forEach(item => {
            item.addEventListener('click', function() {
                // Remove active class from all items
                branchItems.forEach(i => i.classList.remove('active'));
                
                // Add active class to clicked item
                this.classList.add('active');

                // Get location and update map
                const location = this.getAttribute('data-location');
                if (location) {
                    const encodedLocation = encodeURIComponent(location);
                    const newSrc = `https://maps.google.com/maps?q=${encodedLocation}&output=embed`;
                    mapIframe.src = newSrc;
                }

                // Scroll to map for mobile users
                if (window.innerWidth < 992) {
                    mapIframe.scrollIntoView({ behavior: 'smooth', block: 'center' });
                }
            });
        });
    }

    // 3. Mobile Flip Cards
    const flipCards = document.querySelectorAll('.flip-card');
    flipCards.forEach(card => {
        card.addEventListener('click', function() {
            if (window.innerWidth < 992) {
                // If the clicked card is not already flipped, close all other flipped cards
                if (!this.classList.contains('flipped')) {
                    flipCards.forEach(c => c.classList.remove('flipped'));
                }
                // Toggle the current card
                this.classList.toggle('flipped');
            }
        });
    });
});
