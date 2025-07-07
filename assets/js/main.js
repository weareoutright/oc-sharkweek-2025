// Ocean Conservancy Shark Week 2025 JavaScript
// =============================================

document.addEventListener('DOMContentLoaded', function() {
    // Reset scroll position to top on page load
    window.scrollTo(0, 0);
    
    // Clean up any leftover spacer elements from previous sessions
    const oldSpacer = document.getElementById('scroll-spacer');
    if (oldSpacer) {
        oldSpacer.remove();
    }
    
    // Scroll-controlled splash video with GSAP
    const splashVideo = document.querySelector('.splash__video');
    const splashSection = document.querySelector('.splash');
    
    // Force complete video reset on page load
    if (splashVideo) {
        splashVideo.currentTime = 0;
        splashVideo.pause();
        splashVideo.load(); // Force reload from source
    }
    
    // Reset splash section visibility and opacity
    if (splashSection) {
        splashSection.style.display = '';
        splashSection.style.opacity = '1';
        splashSection.style.position = '';
        splashSection.style.zIndex = '';
    }
    
    // Reset navigation elements
    const navElement = document.querySelector('.nav');
    if (navElement) {
        navElement.style.position = '';
        navElement.style.zIndex = '';
        navElement.style.opacity = '1';
        
        const navLogo = navElement.querySelector('.nav__logo');
        if (navLogo) {
            navLogo.style.opacity = '';
            navLogo.classList.remove('nav-logo-hidden');
        }
    }
    
    // Reset main content positioning
    const mainElement = document.querySelector('.main');
    if (mainElement) {
        mainElement.style.position = '';
        mainElement.style.top = '';
        mainElement.style.zIndex = '';
    }
    
    
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
            
            // Track if cleanup has already been executed
            let cleanupExecuted = false;
            
            // Fix elements in place during animation
            gsap.set(splashSection, { position: "fixed", top: 0, left: 0, right: 0, zIndex: 1000 });
            if (navElement) {
                gsap.set(navElement, { position: "fixed", top: 0, left: 0, right: 0, zIndex: 1001 });
            }
            if (mainElement) {
                gsap.set(mainElement, { position: "fixed", top: 0, left: 0, right: 0, zIndex: 1 });
            }
            
            // Create invisible spacer for video scrubbing (controls scrub speed)
            const videoSpacer = document.createElement('div');
            videoSpacer.style.height = '400vh'; // Fixed reasonable scroll distance
            videoSpacer.style.width = '1px';
            videoSpacer.style.position = 'absolute';
            videoSpacer.style.top = '0';
            videoSpacer.style.left = '0';
            videoSpacer.style.pointerEvents = 'none';
            videoSpacer.style.zIndex = '-1';
            videoSpacer.id = 'video-spacer';
            document.body.appendChild(videoSpacer);
            
            // Track fade state
            let fadeStarted = false;
            
            // Video scrubbing ScrollTrigger - independent control
            let lastTargetTime = 0;
            let seekThrottle = 0;
            let problemAreaStart = 1.8;
            let problemAreaEnd = 2.3;
            
            ScrollTrigger.create({
                trigger: videoSpacer,
                start: "top top",
                end: "bottom top",
                scrub: 1,
                onUpdate: function(self) {
                    const scrollProgress = self.progress;
                    
                    // Use eased curve to accelerate video progress near the end
                    // This ensures we reach 100% video completion within reasonable scroll distance
                    const easedProgress = scrollProgress < 0.8 
                        ? scrollProgress * 1.25  // Normal speed for first 80% of scroll
                        : 0.8 * 1.25 + (scrollProgress - 0.8) * 5; // Accelerate for last 20%
                    
                    const targetTime = Math.min(easedProgress, 1) * splashVideo.duration;
                    const currentTime = splashVideo.currentTime;
                    const timeDifference = Math.abs(currentTime - targetTime);
                    const now = Date.now();
                    
                    // Check if we're in the problematic transition area
                    const inProblemArea = targetTime >= problemAreaStart && targetTime <= problemAreaEnd;
                    
                    // Adjust seeking behavior based on location in video
                    let minTimeDiff = inProblemArea ? 0.1 : 0.05;
                    let minTargetChange = inProblemArea ? 0.05 : 0.02;
                    let throttleTime = inProblemArea ? 33 : 16;
                    
                    // Keyframe-aware seeking logic
                    if (timeDifference > minTimeDiff && 
                        Math.abs(targetTime - lastTargetTime) > minTargetChange && 
                        now - seekThrottle > throttleTime) {
                        
                        try {
                            if (typeof splashVideo.fastSeek === 'function') {
                                splashVideo.fastSeek(targetTime);
                            } else {
                                if (inProblemArea && timeDifference < 0.2) {
                                    return;
                                }
                                splashVideo.currentTime = targetTime;
                            }
                        } catch (e) {
                            splashVideo.currentTime = targetTime;
                        }
                        
                        lastTargetTime = targetTime;
                        seekThrottle = now;
                    }
                    
                    // Trigger fade when video reaches 90% completion (based on actual video time)
                    if (splashVideo.currentTime >= splashVideo.duration * 0.9 && !fadeStarted) {
                        fadeStarted = true;
                        startFadeOut();
                    }
                }
            });
            
            // Function to start fade-out animation when video ends
            function startFadeOut() {
                const fadeTimeline = gsap.timeline();
                
                // Fade out splash and nav logo over 1 second
                fadeTimeline.to(splashSection, {
                    opacity: 0,
                    duration: 1,
                    ease: "power2.out"
                });
                
                
                // Trigger cleanup when fade is complete
                fadeTimeline.call(() => {
                    if (!cleanupExecuted) {
                        cleanupExecuted = true;
                        
                        // Get footer element to manage its z-index during transition
                        const footerElement = document.querySelector('footer');
                        
                        // Hide splash completely
                        gsap.set(splashSection, { display: "none" });
                        
                        // Temporarily lower footer z-index to prevent flash
                        if (footerElement) {
                            gsap.set(footerElement, { zIndex: -1 });
                        }
                        
                        if (navElement) {
                            // Keep nav fixed
                            gsap.set(navElement, { position: "fixed", zIndex: 1001 });
                        }
                        
                        // Remove video spacer
                        const existingVideoSpacer = document.getElementById('video-spacer');
                        if (existingVideoSpacer) existingVideoSpacer.remove();
                        
                        // Smooth transition to main content
                        if (mainElement) {
                            gsap.set(mainElement, { top: "0px", zIndex: 100 });
                            
                            setTimeout(() => {
                                if (footerElement) {
                                    gsap.set(footerElement, { visibility: "hidden" });
                                }
                                
                                gsap.set(mainElement, { 
                                    position: "relative", 
                                    zIndex: "auto",
                                    top: "auto" 
                                });
                                
                                setTimeout(() => {
                                    if (footerElement) {
                                        gsap.set(footerElement, { visibility: "visible", zIndex: 10 });
                                    }
                                    
                                    setupNavPositioning();
                                    setupCTADepthEffects();
                                    ScrollTrigger.refresh();
                                }, 50);
                            }, 50);
                        }
                    }
                });
            }
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
        const mainContent = document.querySelector('.main__content');
        const fixedHeader = document.getElementById('fixedHeader');
        
        if (navElement && mainContent && typeof gsap !== 'undefined') {
            
            // Get nav height to calculate when main content reaches the nav
            const navHeight = navElement.offsetHeight;
            
            // ScrollTrigger to make nav scroll with main content when main content reaches the nav
            ScrollTrigger.create({
                trigger: mainContent,
                start: `top ${navHeight}px`, // When main content top reaches bottom of nav
                end: `top top`, // When main content reaches top of viewport
                onEnter: () => {
                    // Switch nav from fixed to absolute positioning so it scrolls with content
                    gsap.set(navElement, {
                        position: "absolute",
                        top: window.pageYOffset + "px", // Position it where it currently appears
                        left: 0,
                        right: 0,
                        zIndex: 1001
                    });
                },
                onLeaveBack: () => {
                    // Return to fixed positioning when scrolling back up
                    gsap.set(navElement, {
                        position: "fixed",
                        top: 0,
                        left: 0,
                        right: 0,
                        zIndex: 1001
                    });
                }
            });
            
            // ScrollTrigger to fade in fixed header after nav has scrolled out of view
            if (fixedHeader) {
                ScrollTrigger.create({
                    trigger: mainContent,
                    start: `top ${-navHeight}px`, // Start fade when nav has scrolled its full height out of view
                    end: `top ${-navHeight - 60}px`, // Complete fade 60px later
                    onEnter: () => {
                        // Fade in fixed header quickly and keep it visible
                        fixedHeader.classList.add('show');
                    }
                    // No onLeaveBack - fixed header stays visible once shown
                });
            }
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

    // Shark fin self-animating back and forth with GSAP
    const sharkFin = document.querySelector('.footer__shark-fin');
    
    if (sharkFin && typeof gsap !== 'undefined') {
        const viewportWidth = window.innerWidth;
        
        // Animation parameters
        const emergenceDistanceVw = 20; // 20vw for emergence
        const submersionDistanceVw = 25; // 25vw for submersion
        const emergenceDistance = (emergenceDistanceVw / 100) * viewportWidth;
        const submersionDistance = (submersionDistanceVw / 100) * viewportWidth;
        const startY = 0; // Starting Y position (below footer)
        const endY = -90; // Final Y position (fully emerged)
        
        // Set initial position (start off-screen left)
        gsap.set(sharkFin, { 
            x: -104,
            y: startY,
            opacity: 0,
            scaleX: 1 // Facing right initially
        });
        
        // Function to calculate Y position based on X position
        function calculateYPosition(xPos, movingRight) {
            let yPosition = startY;
            
            if (movingRight) {
                // Moving right: emerge from left, submerge to right
                const emergenceProgress = Math.min(Math.max(xPos, 0), emergenceDistance);
                if (emergenceProgress > 0) {
                    const emergenceRatio = emergenceProgress / emergenceDistance;
                    const easedEmergence = 1 - Math.pow(1 - emergenceRatio, 3);
                    yPosition = startY + (endY - startY) * easedEmergence;
                }
                
                const submersionStartX = viewportWidth - submersionDistance;
                if (xPos > submersionStartX) {
                    const submersionProgress = Math.min(xPos - submersionStartX, submersionDistance);
                    const submersionRatio = submersionProgress / submersionDistance;
                    const easedSubmersion = Math.pow(submersionRatio, 3);
                    yPosition = endY + (startY - endY) * easedSubmersion;
                }
            } else {
                // Moving left: emerge from right, submerge to left
                const rightEdgePosition = viewportWidth - xPos;
                const emergenceProgress = Math.min(Math.max(rightEdgePosition, 0), emergenceDistance);
                if (emergenceProgress > 0) {
                    const emergenceRatio = emergenceProgress / emergenceDistance;
                    const easedEmergence = 1 - Math.pow(1 - emergenceRatio, 3);
                    yPosition = startY + (endY - startY) * easedEmergence;
                }
                
                const submersionStartX = submersionDistance;
                if (xPos < submersionStartX) {
                    const submersionProgress = Math.min(submersionStartX - xPos, submersionDistance);
                    const submersionRatio = submersionProgress / submersionDistance;
                    const easedSubmersion = Math.pow(submersionRatio, 3);
                    yPosition = endY + (startY - endY) * easedSubmersion;
                }
            }
            
            return yPosition;
        }
        
        // Create the continuous animation timeline - start immediately on page load
        const timeline = gsap.timeline({ repeat: -1 });
        
        // Move right across screen (9 seconds)
        timeline.to(sharkFin, {
            x: viewportWidth + 104,
            duration: 9,
            ease: "none",
            onUpdate: function() {
                const currentX = gsap.getProperty(sharkFin, "x");
                const yPos = calculateYPosition(currentX, true);
                const shouldShow = currentX >= 0 && currentX <= viewportWidth;
                
                gsap.set(sharkFin, {
                    y: yPos,
                    opacity: shouldShow ? 1 : 0
                });
            }
        })
        // Flip direction and move left across screen (9 seconds)
        .to(sharkFin, {
            scaleX: -1,
            duration: 0.1
        })
        .to(sharkFin, {
            x: -104,
            duration: 9,
            ease: "none",
            onUpdate: function() {
                const currentX = gsap.getProperty(sharkFin, "x");
                const yPos = calculateYPosition(currentX, false);
                const shouldShow = currentX >= 0 && currentX <= viewportWidth;
                
                gsap.set(sharkFin, {
                    y: yPos,
                    opacity: shouldShow ? 1 : 0
                });
            }
        })
        // Flip back to face right
        .to(sharkFin, {
            scaleX: 1,
            duration: 0.1
        });
    }
    
    // Fixed header starts invisible and fades in after nav scrolls out
    const fixedHeader = document.getElementById('fixedHeader');
    // Fixed header starts invisible - no need to add 'show' class
    
    // Main background and fixed header transition from fixed to scrolling when footer appears
    const mainBackground = document.querySelector('.main__background');
    const footer = document.querySelector('footer');
    const fixedHeaderForFooter = document.getElementById('fixedHeader');
    
    if (mainBackground && footer && typeof gsap !== 'undefined') {
        // Register ScrollTrigger plugin
        gsap.registerPlugin(ScrollTrigger);
        
        ScrollTrigger.create({
            trigger: footer,
            start: "top bottom", // When footer starts entering viewport
            end: "top top",     // When footer reaches top of viewport
            onEnter: () => {
                // Calculate current scroll position to maintain visual continuity
                const scrollY = window.pageYOffset;
                
                // Switch main background from fixed to absolute positioning
                gsap.set(mainBackground, {
                    position: "absolute",
                    top: scrollY + "px", // Position it where it currently appears
                    left: 0,
                    width: "100vw",
                    height: "100vh",
                    zIndex: -1
                });
                
                // Switch fixed header from fixed to absolute positioning at the same time
                if (fixedHeaderForFooter) {
                    // Calculate 20vh in pixels
                    const twentyVh = window.innerHeight * 0.2;
                    gsap.set(fixedHeaderForFooter, {
                        position: "absolute",
                        top: (scrollY + twentyVh) + "px", // Maintain 20vh offset from scroll position
                        left: 0,
                        right: 0,
                        zIndex: 1000
                    });
                }
            },
            onLeaveBack: () => {
                // Return both to fixed positioning when scrolling back up
                gsap.set(mainBackground, {
                    position: "fixed",
                    top: 0,
                    left: 0,
                    width: "100vw",
                    height: "100vh",
                    zIndex: -1
                });
                
                if (fixedHeaderForFooter) {
                    gsap.set(fixedHeaderForFooter, {
                        position: "fixed",
                        top: "20vh",
                        left: 0,
                        right: 0,
                        zIndex: 1000
                    });
                }
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

// Clean up on page unload to ensure fresh state on refresh
window.addEventListener('beforeunload', function() {
    // Kill all ScrollTriggers
    if (typeof ScrollTrigger !== 'undefined') {
        ScrollTrigger.killAll();
    }
    
    // Reset video state
    const splashVideo = document.querySelector('.splash__video');
    if (splashVideo) {
        splashVideo.currentTime = 0;
        splashVideo.pause();
    }
    
    // Reset scroll position
    window.scrollTo(0, 0);
});