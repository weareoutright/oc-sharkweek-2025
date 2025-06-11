// Ocean Conservancy Shark Week - Main JavaScript

document.addEventListener('DOMContentLoaded', function() {
    
    // Smooth scrolling for navigation links
    const navLinks = document.querySelectorAll('.nav-link[href^="#"]');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);
            
            if (targetElement) {
                const headerHeight = document.querySelector('.header').offsetHeight;
                const targetPosition = targetElement.offsetTop - headerHeight - 20;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Header background opacity on scroll
    const header = document.querySelector('.header');
    function updateHeaderOpacity() {
        const scrollY = window.scrollY;
        const opacity = Math.min(0.95, 0.7 + (scrollY / 500));
        header.style.background = `rgba(27, 54, 93, ${opacity})`;
    }
    
    // Parallax effect for hero background image
    const heroImage = document.querySelector('.hero-image');
    
    // Check if device supports parallax (disable on mobile for performance)
    const supportsParallax = !window.matchMedia('(prefers-reduced-motion: reduce)').matches && 
                            window.innerWidth > 768;
    
    function updateParallax() {
        if (!supportsParallax) return;
        
        const scrollY = window.scrollY;
        const heroSection = document.querySelector('.hero');
        
        if (heroSection && heroImage) {
            const heroRect = heroSection.getBoundingClientRect();
            const heroHeight = heroSection.offsetHeight;
            
            // Only apply parallax when hero is visible or just leaving viewport
            if (heroRect.bottom > -100) {
                // Calculate scroll progress through hero section (0 to 1)
                const scrollProgress = Math.max(0, Math.min(1, scrollY / heroHeight));
                
                // Enhanced vertical parallax - move down (positive direction)
                const verticalSpeed = 1.2;
                const yPos = scrollY * verticalSpeed;
                
                // More pronounced horizontal drift - move left (negative direction)
                const horizontalDrift = -scrollProgress * 240; // Max 240px drift left
                
                // More dramatic zoom effect
                const baseScale = 1.1; // Start more zoomed
                const zoomAmount = scrollProgress * 0.25; // Additional 0.25 scale
                const scale = baseScale + zoomAmount;
                
                // Apply combined transform
                heroImage.style.transform = `translate3d(${horizontalDrift}px, ${yPos}px, 0) scale(${scale})`;
            }
        }
    }
    
    // Throttled scroll handler for performance
    let ticking = false;
    function handleScroll() {
        if (!ticking) {
            requestAnimationFrame(() => {
                updateHeaderOpacity();
                updateParallax();
                ticking = false;
            });
            ticking = true;
        }
    }
    
    window.addEventListener('scroll', handleScroll);
    updateHeaderOpacity(); // Initial call
    updateParallax(); // Initial call
    
    // Video accessibility and performance optimization
    const video = document.querySelector('.promo-video');
    if (video) {
        // Remove any autoplay attributes for accessibility compliance
        video.removeAttribute('autoplay');
        video.autoplay = false;
        video.muted = false; // Ensure audio is available when user chooses to play
        
        // Video requires user interaction to play (WCAG 2.1 compliance)
        
        // Video error handling
        video.addEventListener('error', function() {
            console.log('Video failed to load');
            const videoWrapper = this.closest('.video-wrapper');
            if (videoWrapper) {
                videoWrapper.innerHTML = `
                    <div style="background: var(--light-blue); padding: 2rem; text-align: center; border-radius: var(--border-radius-lg);">
                        <p>Video content temporarily unavailable</p>
                    </div>
                `;
            }
        });
    }
    
    // Form handling removed - simplified footer without newsletter signup
    
    // CTA button tracking (placeholder for analytics)
    const ctaButtons = document.querySelectorAll('.cta-button');
    ctaButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            const ctaType = this.closest('.cta-card').id || 'unknown';
            const buttonText = this.textContent.trim();
            
            // Placeholder for analytics tracking
            console.log(`CTA clicked: ${ctaType} - ${buttonText}`);
            
            // For now, prevent default action since we don't have real URLs
            if (this.getAttribute('href') === '#') {
                e.preventDefault();
                alert(`This would redirect to the ${buttonText} page. Links will be configured during deployment.`);
            }
        });
    });
    
    // Intersection Observer for scroll animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const animateOnScroll = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    // Apply scroll animations to sections
    const animatedElements = document.querySelectorAll('.video-section, .conservation-section, .cta-card');
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        animateOnScroll.observe(el);
    });
    
    // Social media hashtag copying
    const socialTags = document.querySelectorAll('.hashtag, .tag');
    socialTags.forEach(tag => {
        tag.addEventListener('click', function() {
            const text = this.textContent;
            navigator.clipboard.writeText(text).then(() => {
                // Visual feedback
                const originalText = this.textContent;
                this.textContent = 'Copied!';
                setTimeout(() => {
                    this.textContent = originalText;
                }, 1000);
            }).catch(() => {
                console.log('Copy to clipboard not supported');
            });
        });
        
        // Add cursor pointer style
        tag.style.cursor = 'pointer';
        tag.title = 'Click to copy';
    });
    
    // Performance monitoring
    window.addEventListener('load', function() {
        // Log page load performance
        if (window.performance && window.performance.timing) {
            const loadTime = window.performance.timing.loadEventEnd - window.performance.timing.navigationStart;
            console.log(`Page loaded in ${loadTime}ms`);
        }
    });
    
    // Error handling for images
    const images = document.querySelectorAll('img');
    images.forEach(img => {
        img.addEventListener('error', function() {
            console.log(`Failed to load image: ${this.src}`);
            this.style.background = 'var(--light-blue)';
            this.style.display = 'flex';
            this.style.alignItems = 'center';
            this.style.justifyContent = 'center';
            this.alt = 'Image temporarily unavailable';
        });
    });
    
});

// Utility functions
function isElementInViewport(el) {
    const rect = el.getBoundingClientRect();
    return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
}

// Export for potential use in other modules
window.SharkWeekApp = {
    isElementInViewport: isElementInViewport
};