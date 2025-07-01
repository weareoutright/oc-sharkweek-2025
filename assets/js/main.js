// Ocean Conservancy Shark Week 2025 JavaScript
// =============================================

document.addEventListener('DOMContentLoaded', function() {
    // Shark fin scroll animation
    const sharkFin = document.querySelector('.footer__fin-animation');
    const footer = document.querySelector('.footer');
    
    if (sharkFin && footer) {
        window.addEventListener('scroll', function() {
            const scrolled = window.pageYOffset;
            const rate = scrolled * -0.5;
            
            // Move shark fin left to right based on scroll position
            const finPosition = Math.min(Math.max(rate % window.innerWidth, -100), window.innerWidth + 100);
            sharkFin.style.transform = `translateX(${finPosition}px)`;
        });
    }
    
    // Smooth scroll for shark tooth arrow
    const scrollArrow = document.querySelector('.splash__arrow');
    if (scrollArrow) {
        scrollArrow.addEventListener('click', function() {
            document.querySelector('.main').scrollIntoView({
                behavior: 'smooth'
            });
        });
    }
    
    // Newsletter form submission
    const newsletterForm = document.querySelector('.footer__form');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const email = this.querySelector('input[type="email"]').value;
            if (email) {
                alert('Thank you for subscribing to our newsletter!');
                this.reset();
            }
        });
    }
});