// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();

        const targetId = this.getAttribute('href');
        if (targetId === '#') return;

        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop - 80, // Adjust for header height
                behavior: 'smooth'
            });
        }
    });
});

// Add animation on scroll for new sections
const animateOnScroll = () => {
    const elements = document.querySelectorAll('.benefit-card, .screenshot, .stat-item, .testimonial-highlight, .download-feature');

    elements.forEach(element => {
        const elementPosition = element.getBoundingClientRect().top;
        const screenPosition = window.innerHeight / 1.3;

        if (elementPosition < screenPosition) {
            element.classList.add('animated');
        }
    });
};

// Run animation check on scroll
window.addEventListener('scroll', animateOnScroll);

// App Screenshots Carousel
const screenshotsContainer = document.querySelector('.screenshots-container');
if (screenshotsContainer) {
    // Handle scroll events for smooth scrolling
    screenshotsContainer.addEventListener('wheel', (e) => {
        e.preventDefault();
        screenshotsContainer.scrollLeft += e.deltaY;
    });

    // Add touch support for mobile
    let isDown = false;
    let startX;
    let scrollLeft;

    screenshotsContainer.addEventListener('mousedown', (e) => {
        isDown = true;
        screenshotsContainer.style.cursor = 'grabbing';
        startX = e.pageX - screenshotsContainer.offsetLeft;
        scrollLeft = screenshotsContainer.scrollLeft;
    });

    screenshotsContainer.addEventListener('mouseleave', () => {
        isDown = false;
        screenshotsContainer.style.cursor = 'grab';
    });

    screenshotsContainer.addEventListener('mouseup', () => {
        isDown = false;
        screenshotsContainer.style.cursor = 'grab';
    });

    screenshotsContainer.addEventListener('mousemove', (e) => {
        if (!isDown) return;
        e.preventDefault();
        const x = e.pageX - screenshotsContainer.offsetLeft;
        const walk = (x - startX) * 2;
        screenshotsContainer.scrollLeft = scrollLeft - walk;
    });
}

// FAQ Accordion functionality
document.addEventListener('DOMContentLoaded', function () {
    const accordionItems = document.querySelectorAll('.accordion-item');

    accordionItems.forEach(item => {
        const header = item.querySelector('.accordion-header');
        const content = item.querySelector('.accordion-content');
        const icon = item.querySelector('.accordion-icon i');

        header.addEventListener('click', () => {
            const isActive = item.classList.contains('active');

            // Close all other accordion items
            accordionItems.forEach(otherItem => {
                otherItem.classList.remove('active');
                const otherIcon = otherItem.querySelector('.accordion-icon i');
                if (otherIcon) {
                    otherIcon.className = 'fas fa-chevron-down';
                }
            });

            // Toggle current item
            if (!isActive) {
                item.classList.add('active');
                if (icon) {
                    icon.className = 'fas fa-chevron-up';
                }
            }
        });
    });

    // Add animation classes to CSS
    const style = document.createElement('style');
    style.textContent = `
        .benefit-card, .screenshot, .stat-item, .testimonial-highlight, .download-feature {
            opacity: 0;
            transform: translateY(30px);
            transition: opacity 0.8s ease, transform 0.8s ease;
        }
        
        .animated {
            opacity: 1;
            transform: translateY(0);
        }
        
        .screenshots-container {
            cursor: grab;
        }
        
        .screenshots-container:active {
            cursor: grabbing;
        }
        
        .accordion-content {
            max-height: 0;
            overflow: hidden;
            transition: max-height 0.3s ease;
        }
        
        .accordion-item.active .accordion-content {
            max-height: 200px;
        }
        
        .accordion-icon i {
            transition: transform 0.3s ease;
        }
        
        .accordion-item.active .accordion-icon i {
            transform: rotate(180deg);
        }
    `;
    document.head.appendChild(style);

    // Run initial animation check
    animateOnScroll();
});

// Track download button clicks for analytics
document.addEventListener('DOMContentLoaded', function () {
    const downloadButtons = document.querySelectorAll('a[href*="apps.apple.com"]');

    downloadButtons.forEach(button => {
        button.addEventListener('click', function () {
            // You can add analytics tracking here
            console.log('Download button clicked:', this.href);

            // Let the natural link behavior handle the navigation
            // No manual window.location.href to prevent double opening
        });
    });
});

// Add floating animation to app icon
const appIcon = document.querySelector('.app-icon img');
if (appIcon) {
    appIcon.style.animation = 'float 3s ease-in-out infinite';
}

// Add hover effects for interactive elements
document.addEventListener('DOMContentLoaded', function () {
    // Add hover effects to benefit cards
    const benefitCards = document.querySelectorAll('.benefit-card');
    benefitCards.forEach(card => {
        card.addEventListener('mouseenter', function () {
            this.style.transform = 'translateY(-10px) scale(1.02)';
        });

        card.addEventListener('mouseleave', function () {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });

    // Add pulse animation to download buttons
    const downloadButtons = document.querySelectorAll('.btn-primary');
    downloadButtons.forEach(button => {
        button.addEventListener('mouseenter', function () {
            this.style.animation = 'pulse 1s infinite';
        });

        button.addEventListener('mouseleave', function () {
            this.style.animation = 'none';
        });
    });
});

// Add CSS for pulse animation
const pulseStyle = document.createElement('style');
pulseStyle.textContent = `
    @keyframes pulse {
        0% {
            transform: scale(1);
        }
        50% {
            transform: scale(1.05);
        }
        100% {
            transform: scale(1);
        }
    }
    
    @keyframes float {
        0%, 100% {
            transform: translateY(0px);
        }
        50% {
            transform: translateY(-10px);
        }
    }
`;
document.head.appendChild(pulseStyle);

// iOS-specific interactions and behaviors
document.addEventListener('DOMContentLoaded', function () {
    // Add iOS-style haptic feedback simulation
    function simulateHapticFeedback() {
        if ('vibrate' in navigator) {
            navigator.vibrate(10); // Light haptic feedback
        }
    }

    // Add iOS-style button interactions
    const iosButtons = document.querySelectorAll('.ios-button, .ios-download-button, .ios-get-button');
    iosButtons.forEach(button => {
        button.addEventListener('touchstart', function () {
            simulateHapticFeedback();
            this.style.transform = 'scale(0.95)';
        });

        button.addEventListener('touchend', function () {
            this.style.transform = 'scale(1)';
        });

        button.addEventListener('click', function () {
            simulateHapticFeedback();
        });
    });

    // iOS-style smooth scrolling with momentum
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();

            const targetId = this.getAttribute('href');
            if (targetId === '#') return;

            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                // iOS-style smooth scrolling
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // iOS-style screenshot carousel with momentum scrolling
    const screenshotsContainer = document.querySelector('.screenshots-container');
    if (screenshotsContainer) {
        let isScrolling = false;
        let startX;
        let scrollLeft;

        screenshotsContainer.addEventListener('touchstart', function (e) {
            isScrolling = true;
            startX = e.touches[0].pageX - screenshotsContainer.offsetLeft;
            scrollLeft = screenshotsContainer.scrollLeft;
            this.style.cursor = 'grabbing';
        });

        screenshotsContainer.addEventListener('touchmove', function (e) {
            if (!isScrolling) return;
            e.preventDefault();
            const x = e.touches[0].pageX - screenshotsContainer.offsetLeft;
            const walk = (x - startX) * 2;
            screenshotsContainer.scrollLeft = scrollLeft - walk;
        });

        screenshotsContainer.addEventListener('touchend', function () {
            isScrolling = false;
            this.style.cursor = 'grab';
        });

        // Add momentum scrolling for desktop
        screenshotsContainer.addEventListener('wheel', function (e) {
            e.preventDefault();
            this.scrollLeft += e.deltaY;
        });
    }

    // iOS-style accordion with smooth animations
    const accordionItems = document.querySelectorAll('.accordion-item');

    accordionItems.forEach(item => {
        const header = item.querySelector('.accordion-header');
        const content = item.querySelector('.accordion-content');
        const icon = item.querySelector('.accordion-icon i');

        header.addEventListener('click', () => {
            simulateHapticFeedback();
            const isActive = item.classList.contains('active');

            // Close all other accordion items
            accordionItems.forEach(otherItem => {
                otherItem.classList.remove('active');
                const otherIcon = otherItem.querySelector('.accordion-icon i');
                if (otherIcon) {
                    otherIcon.className = 'fas fa-chevron-down';
                }
            });

            // Toggle current item
            if (!isActive) {
                item.classList.add('active');
                if (icon) {
                    icon.className = 'fas fa-chevron-up';
                }
            }
        });
    });

    // iOS-style scroll animations
    const animateOnScroll = () => {
        const elements = document.querySelectorAll('.benefit-card, .screenshot, .stat-item, .testimonial-highlight, .download-feature');

        elements.forEach(element => {
            const elementPosition = element.getBoundingClientRect().top;
            const screenPosition = window.innerHeight / 1.3;

            if (elementPosition < screenPosition) {
                element.classList.add('animated');
            }
        });
    };

    // Add iOS-style CSS animations
    const style = document.createElement('style');
    style.textContent = `
        .benefit-card, .screenshot, .stat-item, .testimonial-highlight, .download-feature {
            opacity: 0;
            transform: translateY(30px);
            transition: opacity 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94), 
                        transform 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94);
        }
        
        .animated {
            opacity: 1;
            transform: translateY(0);
        }
        
        .screenshots-container {
            cursor: grab;
            -webkit-overflow-scrolling: touch;
            scroll-behavior: smooth;
        }
        
        .screenshots-container:active {
            cursor: grabbing;
        }
        
        .accordion-content {
            max-height: 0;
            overflow: hidden;
            transition: max-height 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94);
        }
        
        .accordion-item.active .accordion-content {
            max-height: 200px;
        }
        
        .accordion-icon i {
            transition: transform 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94);
        }
        
        .accordion-item.active .accordion-icon i {
            transform: rotate(180deg);
        }

        /* iOS-style button animations */
        .ios-button, .ios-download-button, .ios-get-button {
            transition: all 0.2s cubic-bezier(0.25, 0.46, 0.45, 0.94);
        }

        /* iOS-style hover effects */
        .benefit-card:hover {
            transform: translateY(-8px) scale(1.02);
        }

        .screenshot:hover img {
            transform: scale(1.03);
        }

        /* iOS-style focus states */
        .ios-button:focus, .ios-download-button:focus, .ios-get-button:focus {
            outline: 2px solid var(--ios-blue);
            outline-offset: 2px;
        }
    `;
    document.head.appendChild(style);

    // Run initial animation check
    animateOnScroll();
    window.addEventListener('scroll', animateOnScroll);

    // Add iOS-style loading animation
    window.addEventListener('load', function () {
        document.body.classList.add('loaded');
    });

    // iOS-style app card interactions
    const appCard = document.querySelector('.ios-app-card');
    if (appCard) {
        appCard.addEventListener('touchstart', function () {
            this.style.transform = 'scale(0.98)';
        });

        appCard.addEventListener('touchend', function () {
            this.style.transform = 'scale(1)';
        });
    }

    // Track download button clicks for analytics
    const downloadButtons = document.querySelectorAll('a[href*="apps.apple.com"]');

    downloadButtons.forEach(button => {
        button.addEventListener('click', function () {
            simulateHapticFeedback();
            console.log('Download button clicked:', this.href);

            // Optional: Add a small delay to ensure the click is registered
            setTimeout(() => {
                window.location.href = this.href;
            }, 100);
        });
    });

    // Add floating animation to app icon
    const appIcon = document.querySelector('.app-icon img');
    if (appIcon) {
        appIcon.style.animation = 'float 3s ease-in-out infinite';
    }

    // iOS-style pulse animation for download buttons
    const downloadButtons2 = document.querySelectorAll('.ios-download-button');
    downloadButtons2.forEach(button => {
        button.addEventListener('mouseenter', function () {
            this.style.animation = 'iosPulse 1s infinite';
        });

        button.addEventListener('mouseleave', function () {
            this.style.animation = 'none';
        });
    });
});

// Add CSS for iOS-style animations
const iosStyle = document.createElement('style');
iosStyle.textContent = `
    @keyframes iosPulse {
        0% {
            transform: scale(1);
        }
        50% {
            transform: scale(1.02);
        }
        100% {
            transform: scale(1);
        }
    }
    
    @keyframes float {
        0%, 100% {
            transform: translateY(0px);
        }
        50% {
            transform: translateY(-8px);
        }
    }

    /* iOS-style loading animation */
    body:not(.loaded) {
        opacity: 0;
        transition: opacity 0.3s ease;
    }

    body.loaded {
        opacity: 1;
    }

    /* iOS-style focus visible for accessibility */
    .ios-button:focus-visible,
    .ios-download-button:focus-visible,
    .ios-get-button:focus-visible {
        outline: 2px solid var(--ios-blue);
        outline-offset: 2px;
    }

    /* iOS-style selection */
    ::selection {
        background: var(--ios-blue);
        color: white;
    }

    /* iOS-style scrollbar */
    ::-webkit-scrollbar {
        width: 8px;
    }

    ::-webkit-scrollbar-track {
        background: var(--ios-light-gray);
    }

    ::-webkit-scrollbar-thumb {
        background: var(--ios-gray);
        border-radius: 4px;
    }

    ::-webkit-scrollbar-thumb:hover {
        background: var(--ios-blue);
    }
`;
document.head.appendChild(iosStyle);

// Carousel functionality
document.addEventListener('DOMContentLoaded', function () {
    const carousel = document.querySelector('.hero-carousel');
    const track = document.querySelector('.carousel-track');
    const slides = document.querySelectorAll('.carousel-slide');
    const dots = document.querySelectorAll('.carousel-dot');

    if (!carousel || !track || slides.length === 0) return;

    let currentSlide = 0;
    let autoPlayInterval;
    const totalSlides = slides.length;

    // Initialize carousel
    function initCarousel() {
        // Set initial position
        goToSlide(0);

        // Start auto-play (always running)
        startAutoPlay();

        // Add event listeners
        addEventListeners();
    }

    // Go to specific slide
    function goToSlide(slideIndex) {
        currentSlide = slideIndex;

        // Update track position
        const slideWidth = slides[0].offsetWidth;
        track.style.transform = `translateX(-${slideIndex * slideWidth}px)`;

        // Update dots
        updateDots();
    }

    // Update dot indicators
    function updateDots() {
        dots.forEach((dot, index) => {
            dot.classList.toggle('active', index === currentSlide);
        });
    }

    // Next slide
    function nextSlide() {
        const next = (currentSlide + 1) % totalSlides;
        goToSlide(next);
    }

    // Previous slide
    function prevSlide() {
        const prev = (currentSlide - 1 + totalSlides) % totalSlides;
        goToSlide(prev);
    }

    // Start auto-play (always running)
    function startAutoPlay() {
        if (autoPlayInterval) clearInterval(autoPlayInterval);
        autoPlayInterval = setInterval(() => {
            nextSlide();
        }, 3000);
    }

    // Add all event listeners
    function addEventListeners() {
        // Dot navigation
        dots.forEach((dot, index) => {
            dot.addEventListener('click', () => {
                goToSlide(index);
                // Auto-play continues running
            });
        });

        // Touch/swipe support
        let startX = 0;
        let startY = 0;
        let isDragging = false;

        track.addEventListener('touchstart', (e) => {
            startX = e.touches[0].clientX;
            startY = e.touches[0].clientY;
            isDragging = true;
            // Auto-play continues running
        });

        track.addEventListener('touchmove', (e) => {
            if (!isDragging) return;
            e.preventDefault();
        });

        track.addEventListener('touchend', (e) => {
            if (!isDragging) return;

            const endX = e.changedTouches[0].clientX;
            const endY = e.changedTouches[0].clientY;
            const diffX = startX - endX;
            const diffY = startY - endY;

            // Only trigger if horizontal swipe is more significant than vertical
            if (Math.abs(diffX) > Math.abs(diffY) && Math.abs(diffX) > 50) {
                if (diffX > 0) {
                    nextSlide();
                } else {
                    prevSlide();
                }
            }

            isDragging = false;
            // Auto-play continues running
        });

        // Mouse hover (no pause)
        carousel.addEventListener('mouseenter', () => {
            // Auto-play continues running
        });

        carousel.addEventListener('mouseleave', () => {
            // Auto-play continues running
        });

        // Keyboard navigation
        document.addEventListener('keydown', (e) => {
            if (e.key === 'ArrowLeft') {
                prevSlide();
                // Auto-play continues running
            } else if (e.key === 'ArrowRight') {
                nextSlide();
                // Auto-play continues running
            }
        });

        // Handle window resize
        window.addEventListener('resize', () => {
            setTimeout(() => {
                goToSlide(currentSlide);
            }, 100);
        });
    }

    // Wait for images to load before initializing
    let loadedImages = 0;
    const totalImages = slides.length;

    slides.forEach(slide => {
        const img = slide.querySelector('img');
        if (img) {
            if (img.complete) {
                loadedImages++;
                if (loadedImages === totalImages) {
                    initCarousel();
                }
            } else {
                img.addEventListener('load', () => {
                    loadedImages++;
                    if (loadedImages === totalImages) {
                        initCarousel();
                    }
                });
                img.addEventListener('error', () => {
                    loadedImages++;
                    if (loadedImages === totalImages) {
                        initCarousel();
                    }
                });
            }
        } else {
            loadedImages++;
            if (loadedImages === totalImages) {
                initCarousel();
            }
        }
    });

    // Fallback: initialize if all images are already loaded
    if (loadedImages === totalImages) {
        initCarousel();
    }
}); 