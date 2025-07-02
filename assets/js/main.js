// Ocean Conservancy Shark Week 2025 JavaScript
// =============================================

document.addEventListener('DOMContentLoaded', function() {
    // Scroll-controlled splash video with GSAP
    const splashVideo = document.querySelector('.splash__video');
    const splashSection = document.querySelector('.splash');
    
    console.log('Video element found:', !!splashVideo);
    console.log('Splash section found:', !!splashSection);
    console.log('GSAP available:', typeof gsap !== 'undefined');
    
    if (splashVideo && splashSection && typeof gsap !== 'undefined') {
        // Register ScrollTrigger plugin first
        gsap.registerPlugin(ScrollTrigger);
        console.log('ScrollTrigger registered');
        
        // Disable autoplay and ensure video is ready
        splashVideo.removeAttribute('autoplay');
        splashVideo.currentTime = 0;
        splashVideo.preload = 'metadata';
        
        // Force load the video
        splashVideo.load();
        
        function setupScrollTrigger() {
            console.log('Setting up ScrollTrigger - Video duration:', splashVideo.duration);
            
            const navElement = document.querySelector('.nav');
            const mainElement = document.querySelector('.main');
            
            // Fix elements in place during animation
            gsap.set(splashSection, { position: "fixed", top: 0, left: 0, right: 0, zIndex: 1000 });
            if (navElement) {
                gsap.set(navElement, { position: "fixed", top: 0, left: 0, right: 0, zIndex: 1001 });
            }
            if (mainElement) {
                gsap.set(mainElement, { position: "fixed", top: 0, left: 0, right: 0, zIndex: 1 });
            }
            
            // Create invisible spacer to enable scrolling without moving content
            const spacer = document.createElement('div');
            spacer.style.height = '800vh';
            spacer.style.width = '1px';
            spacer.style.position = 'absolute';
            spacer.style.top = '0';
            spacer.style.left = '0';
            spacer.style.pointerEvents = 'none';
            spacer.style.zIndex = '-1';
            document.body.appendChild(spacer);
            
            // Create timeline for video scrubbing and splash fade
            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: spacer,
                    start: "top top",
                    end: "bottom top",
                    scrub: 1,
                    markers: true,
                    onUpdate: function(self) {
                        console.log('Animation progress:', self.progress);
                        
                        // When animation reaches ~87% (since that seems to be max), clean up and enable normal scrolling
                        if (self.progress >= 0.85) {
                            console.log('Animation complete - cleaning up at progress:', self.progress);
                            gsap.set(splashSection, { display: "none" }); // Hide splash completely
                            if (navElement) {
                                const navLogo = navElement.querySelector('.nav__logo');
                                gsap.set(navElement, { position: "absolute", zIndex: 1001 });
                                // Keep nav logo hidden after cleanup using both GSAP and CSS class
                                if (navLogo) {
                                    gsap.set(navLogo, { opacity: 0 });
                                    navLogo.classList.add('nav-logo-hidden');
                                }
                            }
                            if (mainElement) {
                                gsap.set(mainElement, { position: "relative", zIndex: "auto" });
                            }
                            // Remove spacer and reset scroll position
                            if (document.body.contains(spacer)) {
                                document.body.removeChild(spacer);
                            }
                            window.scrollTo(0, 0);
                            // Refresh ScrollTrigger to recalculate after layout changes
                            ScrollTrigger.refresh();
                        }
                    }
                }
            });
            
            // Video scrubbing (0% - 75% of scroll range)
            tl.to(splashVideo, {
                currentTime: splashVideo.duration,
                ease: "none",
                duration: 0.75 // Takes up 75% of timeline
            });
            
            // Splash fade out (75% - 100% of scroll range)
            tl.to(splashSection, {
                opacity: 0,
                ease: "power2.out",
                duration: 0.25 // Takes up remaining 25% of timeline
            })
            // Hide nav logo at the same time as splash fades out
            .to(navElement ? navElement.querySelector('.nav__logo') : null, {
                opacity: 0,
                ease: "power2.out",
                duration: 0.25
            }, "-=0.25"); // Start at same time as splash fade
        }
        
        // Wait for video metadata to load
        splashVideo.addEventListener('loadedmetadata', setupScrollTrigger);
        
        // Also try after a short delay in case metadata is already loaded
        setTimeout(() => {
            if (splashVideo.readyState >= 1 && splashVideo.duration) {
                setupScrollTrigger();
            }
        }, 500);
    }

    // Shark fin scroll animation with GSAP
    const sharkFin = document.querySelector('.footer__shark-fin');
    
    if (sharkFin && typeof gsap !== 'undefined') {
        let finPosition = 0; // Start position (left edge of screen)
        let lastScrollY = window.pageYOffset;
        let animationSpeed = 0.8; // Pixels per scroll unit
        let movingRight = true; // Direction of movement
        
        // Set initial position
        gsap.set(sharkFin, { 
            x: finPosition,
            y: 0, // Start below footer edge
            opacity: 0,
            scaleX: 1 // Facing right initially
        });
        
        console.log('Shark fin animation initialized - starting at Y:', 0);
        
        function updateFinPosition() {
            const currentScrollY = window.pageYOffset;
            const scrollDelta = Math.abs(currentScrollY - lastScrollY);
            
            // Move fin based on direction
            if (scrollDelta > 0) {
                if (movingRight) {
                    finPosition += scrollDelta * animationSpeed;
                } else {
                    finPosition -= scrollDelta * animationSpeed;
                }
                
                const viewportWidth = window.innerWidth;
                
                // Calculate vertical position using vw units for responsive behavior
                const emergenceDistanceVw = 20; // 20vw for emergence
                const submersionDistanceVw = 25; // 25vw for submersion
                
                const emergenceDistance = (emergenceDistanceVw / 100) * viewportWidth;
                const submersionDistance = (submersionDistanceVw / 100) * viewportWidth;
                
                const startY = 0; // Starting Y position (below footer)
                const endY = -90; // Final Y position (fully emerged)
                
                let yPosition = startY;
                let actualPosition = finPosition;
                
                // Handle direction changes and flipping
                if (movingRight) {
                    // Moving right: check if we've gone off-screen
                    if (finPosition > viewportWidth + 104) {
                        // Flip direction and start moving left from right edge
                        movingRight = false;
                        finPosition = viewportWidth + 104;
                        gsap.set(sharkFin, { scaleX: -1 }); // Flip horizontally
                        console.log('Flipping to move left');
                    }
                } else {
                    // Moving left: check if we've gone off-screen left
                    if (finPosition < -104) {
                        // Flip direction and start moving right from left edge
                        movingRight = true;
                        finPosition = -104;
                        gsap.set(sharkFin, { scaleX: 1 }); // Flip back to normal
                        console.log('Flipping to move right');
                    }
                }
                
                // Calculate emergence/submersion based on distance from edges
                if (movingRight) {
                    // Moving right: emerge from left, submerge to right
                    const emergenceProgress = Math.min(Math.max(finPosition, 0), emergenceDistance);
                    if (emergenceProgress > 0) {
                        const emergenceRatio = emergenceProgress / emergenceDistance;
                        const easedEmergence = 1 - Math.pow(1 - emergenceRatio, 3);
                        yPosition = startY + (endY - startY) * easedEmergence;
                    }
                    
                    const submersionStartX = viewportWidth - submersionDistance;
                    if (finPosition > submersionStartX) {
                        const submersionProgress = Math.min(finPosition - submersionStartX, submersionDistance);
                        const submersionRatio = submersionProgress / submersionDistance;
                        const easedSubmersion = Math.pow(submersionRatio, 3);
                        yPosition = endY + (startY - endY) * easedSubmersion;
                    }
                } else {
                    // Moving left: emerge from right, submerge to left
                    const rightEdgePosition = viewportWidth - finPosition;
                    const emergenceProgress = Math.min(Math.max(rightEdgePosition, 0), emergenceDistance);
                    if (emergenceProgress > 0) {
                        const emergenceRatio = emergenceProgress / emergenceDistance;
                        const easedEmergence = 1 - Math.pow(1 - emergenceRatio, 3);
                        yPosition = startY + (endY - startY) * easedEmergence;
                    }
                    
                    const submersionStartX = submersionDistance;
                    if (finPosition < submersionStartX) {
                        const submersionProgress = Math.min(submersionStartX - finPosition, submersionDistance);
                        const submersionRatio = submersionProgress / submersionDistance;
                        const easedSubmersion = Math.pow(submersionRatio, 3);
                        yPosition = endY + (startY - endY) * easedSubmersion;
                    }
                }
                
                // Show fin when it's within reasonable bounds
                if (finPosition >= -104 && finPosition <= viewportWidth + 104) {
                    const shouldShow = finPosition >= 0 && finPosition <= viewportWidth;
                    gsap.to(sharkFin, {
                        x: finPosition,
                        y: yPosition,
                        opacity: shouldShow ? 1 : 0,
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
    
    // Fixed header visibility on scroll
    const fixedHeader = document.getElementById('fixedHeader');
    const mainContent = document.querySelector('.main');
    
    if (fixedHeader && mainContent && typeof gsap !== 'undefined') {
        // Create ScrollTrigger for fixed header visibility
        gsap.registerPlugin(ScrollTrigger);
        
        ScrollTrigger.create({
            trigger: mainContent,
            start: "top center", // Show header when main content reaches center of viewport
            end: "bottom bottom",
            onEnter: () => {
                console.log('Showing fixed header');
                fixedHeader.classList.add('show');
            },
            onLeave: () => {
                console.log('Hiding fixed header (scrolled past main)');
                fixedHeader.classList.remove('show');
            },
            onEnterBack: () => {
                console.log('Showing fixed header (scrolled back into main)');
                fixedHeader.classList.add('show');
            },
            onLeaveBack: () => {
                console.log('Hiding fixed header (scrolled back above main)');
                fixedHeader.classList.remove('show');
            }
        });
    }
    
    // Smooth scroll for shark tooth arrow - disabled during video scrubbing
    const scrollArrow = document.querySelector('.splash__arrow');
    if (scrollArrow) {
        // Remove click functionality since splash is now fixed during video playback
        // scrollArrow.addEventListener('click', function() {
        //     document.querySelector('.main').scrollIntoView({
        //         behavior: 'smooth'
        //     });
        // });
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