// Ocean Conservancy Shark Week 2025 JavaScript
// =============================================

document.addEventListener('DOMContentLoaded', function() {
    // Clean up any leftover spacer elements from previous sessions
    const oldSpacer = document.getElementById('scroll-spacer');
    if (oldSpacer) {
        oldSpacer.remove();
    }
    
    // Scroll-controlled splash video with GSAP
    const splashVideo = document.querySelector('.splash__video');
    const splashSection = document.querySelector('.splash');
    
    
    if (splashVideo && splashSection && typeof gsap !== 'undefined') {
        // Register ScrollTrigger plugin first
        gsap.registerPlugin(ScrollTrigger);
        
        // Disable autoplay and ensure video is ready
        splashVideo.removeAttribute('autoplay');
        splashVideo.currentTime = 0;
        splashVideo.preload = 'metadata';
        
        // Force load the video
        splashVideo.load();
        
        function setupScrollTrigger() {
            
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
            spacer.style.height = '500vh';
            spacer.style.width = '1px';
            spacer.style.position = 'absolute';
            spacer.style.top = '0';
            spacer.style.left = '0';
            spacer.style.pointerEvents = 'none';
            spacer.style.zIndex = '-1';
            spacer.id = 'scroll-spacer'; // Add ID for easier tracking
            document.body.appendChild(spacer);
            
            // Create timeline for video scrubbing and splash fade
            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: spacer,
                    start: "top top",
                    end: "bottom top",
                    scrub: 1,
                    markers: false, // Disable debug markers
                    onUpdate: function(self) {
                        // When animation reaches ~75% (during splash fade), clean up and enable normal scrolling
                        if (self.progress >= 0.75) {
                            
                            // Get footer element to manage its z-index during transition
                            const footerElement = document.querySelector('footer');
                            
                            // Hide splash completely
                            gsap.set(splashSection, { display: "none" });
                            
                            // Temporarily lower footer z-index to prevent flash
                            if (footerElement) {
                                gsap.set(footerElement, { zIndex: -1 });
                            }
                            
                            if (navElement) {
                                const navLogo = navElement.querySelector('.nav__logo');
                                // Keep nav fixed until CTA1 reaches the bottom of nav
                                gsap.set(navElement, { position: "fixed", zIndex: 1001 });
                                // Keep nav logo hidden after cleanup using both GSAP and CSS class
                                if (navLogo) {
                                    gsap.set(navLogo, { opacity: 0 });
                                    navLogo.classList.add('nav-logo-hidden');
                                }
                            }
                            
                            // More robust spacer removal
                            const existingSpacer = document.getElementById('scroll-spacer');
                            if (existingSpacer) {
                                existingSpacer.remove();
                            }
                            
                            // Instead of changing positioning immediately, smoothly transition
                            if (mainElement) {
                                // First, move main element to the top while still fixed
                                gsap.set(mainElement, { top: "0px", zIndex: 100 }); // Ensure main is on top during transition
                                
                                // Reset scroll position BEFORE changing position to prevent footer flash
                                window.scrollTo(0, 0);
                                
                                // Then transition to relative positioning after a brief moment
                                setTimeout(() => {
                                    // Hide footer during transition to prevent flash
                                    if (footerElement) {
                                        gsap.set(footerElement, { visibility: "hidden" });
                                    }
                                    
                                    gsap.set(mainElement, { 
                                        position: "relative", 
                                        zIndex: "auto",
                                        top: "auto" 
                                    });
                                    
                                    // Restore footer visibility and z-index after main element is properly positioned
                                    setTimeout(() => {
                                        if (footerElement) {
                                            gsap.set(footerElement, { visibility: "visible", zIndex: 10 });
                                        }
                                        
                                        // Set up nav positioning ScrollTrigger after splash cleanup
                                        setupNavPositioning();
                                        
                                        // Set up CTA depth blur effects
                                        setupCTADepthEffects();
                                        
                                        ScrollTrigger.refresh();
                                    }, 50); // Additional delay to ensure smooth transition
                                }, 50); // Shorter initial delay since scroll is already reset
                            }
                            
                            // Kill this ScrollTrigger to prevent further callbacks
                            this.kill();
                        }
                    },
                    onComplete: function() {
                        // Fallback cleanup in case onUpdate doesn't trigger
                        const existingSpacer = document.getElementById('scroll-spacer');
                        if (existingSpacer) {
                            existingSpacer.remove();
                        }
                    }
                }
            });
            
            // Video scrubbing (0% - 65% of scroll range) with keyframe-aware seeking
            let lastTargetTime = 0;
            let seekThrottle = 0;
            let problemAreaStart = 1.8; // Start of transition area
            let problemAreaEnd = 2.3;   // End of transition area
            
            tl.to(splashVideo, {
                currentTime: splashVideo.duration,
                ease: "none",
                duration: 0.65, // Takes up 65% of timeline
                onUpdate: function() {
                    const scrollProgress = this.progress();
                    const targetTime = scrollProgress * splashVideo.duration;
                    const currentTime = splashVideo.currentTime;
                    const timeDifference = Math.abs(currentTime - targetTime);
                    const now = Date.now();
                    
                    // Check if we're in the problematic transition area
                    const inProblemArea = targetTime >= problemAreaStart && targetTime <= problemAreaEnd;
                    
                    // Adjust seeking behavior based on location in video
                    let minTimeDiff = inProblemArea ? 0.1 : 0.05;  // Larger threshold in problem area
                    let minTargetChange = inProblemArea ? 0.05 : 0.02; // Larger change required in problem area
                    let throttleTime = inProblemArea ? 33 : 16; // Slower seeking in problem area (~30fps vs 60fps)
                    
                    
                    // Keyframe-aware seeking logic
                    if (timeDifference > minTimeDiff && 
                        Math.abs(targetTime - lastTargetTime) > minTargetChange && 
                        now - seekThrottle > throttleTime) {
                        
                        // Try fastSeek if available, fallback to regular seeking
                        try {
                            if (typeof splashVideo.fastSeek === 'function') {
                                splashVideo.fastSeek(targetTime);
                            } else {
                                // In problem area, allow larger tolerance to avoid micro-seeks
                                if (inProblemArea && timeDifference < 0.2) {
                                    // Skip seeking if we're close enough in problem area
                                    return;
                                }
                                splashVideo.currentTime = targetTime;
                            }
                        } catch (e) {
                            // Fallback to basic seeking
                            splashVideo.currentTime = targetTime;
                        }
                        
                        lastTargetTime = targetTime;
                        seekThrottle = now;
                    }
                }
            });
            
            // Splash fade out (65% - 100% of scroll range)
            tl.to(splashSection, {
                opacity: 0,
                ease: "power2.out",
                duration: 0.35 // Takes up remaining 35% of timeline
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

    // Function to set up nav positioning after splash cleanup
    function setupNavPositioning() {
        const navElement = document.querySelector('.nav');
        const cta1 = document.querySelector('.cta-video'); // First CTA element
        
        if (navElement && cta1 && typeof gsap !== 'undefined') {
            
            // Get nav height to calculate when CTA1 reaches bottom of nav
            const navHeight = navElement.offsetHeight;
            
            ScrollTrigger.create({
                trigger: cta1,
                start: `top ${navHeight}px`, // When CTA1 top reaches bottom of nav
                end: `top ${navHeight - 50}px`, // Fade over 50px range
                scrub: true, // Smooth animation tied to scroll
                onUpdate: (self) => {
                    // Fade out nav as CTA1 approaches the bottom of nav
                    const opacity = 1 - self.progress;
                    gsap.to(navElement, { opacity: opacity, duration: 0.1 });
                },
                onEnter: () => {},
                onLeaveBack: () => {}
            });
        }
    }

    // Function to set up CTA depth blur effects
    function setupCTADepthEffects() {
        const ctas = document.querySelectorAll('.cta');
        
        if (ctas.length > 0 && typeof gsap !== 'undefined') {
            
            ctas.forEach((cta, index) => {
                // Get individual elements within each CTA
                const ctaImage = cta.querySelector('.cta__image, .cta__video');
                const ctaContent = cta.querySelector('.cta__content');
                
                // Set initial blur state for image (deep underwater)
                if (ctaImage) {
                    gsap.set(ctaImage, { 
                        filter: "blur(10px)",
                        opacity: 0.6,
                        scale: 1.08 // Images appear larger when deep
                    });
                }
                
                // Set initial blur state for content (slightly less blurred, like closer to surface)
                if (ctaContent) {
                    gsap.set(ctaContent, { 
                        filter: "blur(6px)",
                        opacity: 0.75,
                        scale: 1.03, // Text appears slightly larger when deep
                        y: 10 // Text starts slightly lower, like floating up
                    });
                }
                
                // Separate ScrollTrigger for images (faster clearing)
                if (ctaImage) {
                    ScrollTrigger.create({
                        trigger: cta,
                        start: "top bottom", // When CTA starts entering viewport
                        end: "top 50%", // When CTA is half visible
                        scrub: true,
                        onUpdate: (self) => {
                            const progress = self.progress;
                            
                            // Image blur decreases from 10px to 0px
                            const imageBlur = 10 * (1 - progress);
                            // Image opacity increases from 0.6 to 1
                            const imageOpacity = 0.6 + (0.4 * progress);
                            // Image scale decreases from 1.08 to 1
                            const imageScale = 1.08 - (0.08 * progress);
                            
                            gsap.to(ctaImage, {
                                filter: `blur(${imageBlur}px)`,
                                opacity: imageOpacity,
                                scale: imageScale,
                                duration: 0.1,
                                ease: "none"
                            });
                        }
                    });
                }
                
                // Separate ScrollTrigger for text (slower clearing for better visibility)
                if (ctaContent) {
                    ScrollTrigger.create({
                        trigger: cta,
                        start: "top 80%", // When CTA is 20% into viewport (more visible)
                        end: "top 20%", // When CTA is 80% visible (nearly fully in view)
                        scrub: true,
                        onUpdate: (self) => {
                            const progress = self.progress;
                            
                            // Text blur decreases from 6px to 0px
                            const textBlur = 6 * (1 - progress);
                            // Text opacity increases from 0.75 to 1
                            const textOpacity = 0.75 + (0.25 * progress);
                            // Text scale decreases from 1.03 to 1
                            const textScale = 1.03 - (0.03 * progress);
                            // Text floats up from y: 10 to y: 0
                            const textY = 10 * (1 - progress);
                            
                            gsap.to(ctaContent, {
                                filter: `blur(${textBlur}px)`,
                                opacity: textOpacity,
                                scale: textScale,
                                y: textY,
                                duration: 0.1,
                                ease: "none"
                            });
                        },
                        onEnter: () => {},
                        onLeaveBack: () => {}
                    });
                }
            });
        }
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
                    }
                } else {
                    // Moving left: check if we've gone off-screen left
                    if (finPosition < -104) {
                        // Flip direction and start moving right from left edge
                        movingRight = true;
                        finPosition = -104;
                        gsap.set(sharkFin, { scaleX: 1 }); // Flip back to normal
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
                fixedHeader.classList.add('show');
            },
            onLeave: () => {
                fixedHeader.classList.remove('show');
            },
            onEnterBack: () => {
                fixedHeader.classList.add('show');
            },
            onLeaveBack: () => {
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