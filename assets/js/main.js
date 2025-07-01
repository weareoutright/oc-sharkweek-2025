// Ocean Conservancy Shark Week 2025 JavaScript
// =============================================

document.addEventListener('DOMContentLoaded', function() {
    // Shark fin scroll animation with GSAP
    const sharkFin = document.querySelector('.footer__shark-fin');
    
    if (sharkFin && typeof gsap !== 'undefined') {
        let finPosition = 0; // Start position (left edge of screen)
        let lastScrollY = window.pageYOffset;
        let animationSpeed = 0.8; // Pixels per scroll unit
        
        // Set initial position
        gsap.set(sharkFin, { 
            x: finPosition,
            y: 0, // Start below footer edge
            opacity: 0 
        });
        
        console.log('Shark fin animation initialized - starting at Y:', 0);
        
        function updateFinPosition() {
            const currentScrollY = window.pageYOffset;
            const scrollDelta = Math.abs(currentScrollY - lastScrollY);
            
            // Move fin right regardless of scroll direction
            if (scrollDelta > 0) {
                finPosition += scrollDelta * animationSpeed;
                
                const viewportWidth = window.innerWidth;
                
                // Calculate vertical position using vw units for responsive behavior
                // On 2000px viewport: 20vw = 400px, 25vw = 500px
                const emergenceDistanceVw = 20; // 20vw for emergence (increased from 15vw)
                const submersionDistanceVw = 25; // 25vw for submersion
                
                const emergenceDistance = (emergenceDistanceVw / 100) * viewportWidth;
                const submersionDistance = (submersionDistanceVw / 100) * viewportWidth;
                
                const startX = 0; // Starting X position (left edge)
                const startY = 0; // Starting Y position (below footer)
                const endY = -90; // Final Y position (fully emerged)
                
                let yPosition = startY; // Start below footer edge
                
                // Calculate submersion start point (25vw before going off-screen)
                const submersionStartX = viewportWidth - submersionDistance;
                
                // Emergence phase (first 20vw of movement)
                const emergenceProgress = Math.min(Math.max(finPosition - startX, 0), emergenceDistance);
                if (emergenceProgress > 0) {
                    // Calculate emergence progress (0 to 1)
                    const emergenceRatio = emergenceProgress / emergenceDistance;
                    // Smooth easing for emergence (ease-out)
                    const easedEmergence = 1 - Math.pow(1 - emergenceRatio, 3);
                    // Interpolate from startY (0px) to endY (-90px)
                    yPosition = startY + (endY - startY) * easedEmergence;
                }
                
                // Submersion phase (last 25vw before going off-screen)
                if (finPosition > submersionStartX) {
                    const submersionProgress = Math.min(finPosition - submersionStartX, submersionDistance);
                    const submersionRatio = submersionProgress / submersionDistance;
                    // Smooth easing for submersion (ease-in)
                    const easedSubmersion = Math.pow(submersionRatio, 3);
                    // Interpolate from endY (-90px) back to startY (0px)
                    yPosition = endY + (startY - endY) * easedSubmersion;
                }
                
                // Debug logging (remove in production)
                if (finPosition > -100 && finPosition < viewportWidth + 100) {
                    console.log(`Fin X: ${finPosition.toFixed(1)}, Y: ${yPosition.toFixed(1)}, Submersion start: ${submersionStartX.toFixed(1)}`);
                }
                
                // Check if fin has moved off-screen right (104px width)
                if (finPosition > viewportWidth + 104) {
                    // Hide the fin and reset to left edge
                    gsap.set(sharkFin, { 
                        opacity: 0,
                        x: 0,
                        y: 0 // Reset to starting position below footer edge
                    });
                    finPosition = 0;
                } else if (finPosition >= 0) {
                    // Fin is visible on screen
                    gsap.to(sharkFin, {
                        x: finPosition,
                        y: yPosition,
                        opacity: 1,
                        duration: 0.15,
                        ease: "none"
                    });
                } else {
                    // Fin is still off-screen left, keep hidden
                    gsap.to(sharkFin, {
                        x: finPosition,
                        y: yPosition,
                        opacity: 0,
                        duration: 0.15,
                        ease: "none"
                    });
                }
            }
            
            lastScrollY = currentScrollY;
        }
        
        // Use scroll event for immediate response
        let ticking = false;
        
        function requestTick() {
            if (!ticking) {
                requestAnimationFrame(updateFinPosition);
                ticking = true;
                setTimeout(() => ticking = false, 16); // ~60fps throttle
            }
        }
        
        window.addEventListener('scroll', requestTick, { passive: true });
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