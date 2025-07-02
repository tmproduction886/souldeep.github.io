// Simple countdown timer
function updateCountdown() {
    const countdownElements = {
        days: document.querySelector('.countdown-item:nth-child(1) .countdown-number'),
        hours: document.querySelector('.countdown-item:nth-child(2) .countdown-number'),
        minutes: document.querySelector('.countdown-item:nth-child(3) .countdown-number'),
        seconds: document.querySelector('.countdown-item:nth-child(4) .countdown-number')
    };
    
    let days = parseInt(countdownElements.days.textContent);
    let hours = parseInt(countdownElements.hours.textContent);
    let minutes = parseInt(countdownElements.minutes.textContent);
    let seconds = parseInt(countdownElements.seconds.textContent);
    
    // Update countdown
    seconds--;
    
    if (seconds < 0) {
        seconds = 59;
        minutes--;
        
        if (minutes < 0) {
            minutes = 59;
            hours--;
            
            if (hours < 0) {
                hours = 23;
                days--;
                
                if (days < 0) {
                    // Reset countdown when it reaches zero
                    days = 2;
                    hours = 12;
                    minutes = 45;
                    seconds = 30;
                }
            }
        }
    }
    
    // Update DOM
    countdownElements.days.textContent = days.toString().padStart(2, '0');
    countdownElements.hours.textContent = hours.toString().padStart(2, '0');
    countdownElements.minutes.textContent = minutes.toString().padStart(2, '0');
    countdownElements.seconds.textContent = seconds.toString().padStart(2, '0');
}

// Update countdown every second
setInterval(updateCountdown, 1000);

// Add smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);
        
        if (targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop - 80, // Offset for header
                behavior: 'smooth'
            });
        }
    });
});

// Add animation on scroll
const animateOnScroll = () => {
    const elements = document.querySelectorAll('.feature, .problem-card, .testimonial-card, .price-card, .faq-item');
    
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

// Run once on page load
document.addEventListener('DOMContentLoaded', () => {
    animateOnScroll();
    
    // Add animation classes to CSS
    const style = document.createElement('style');
    style.textContent = `
        .feature, .problem-card, .testimonial-card, .price-card, .faq-item {
            opacity: 0;
            transform: translateY(20px);
            transition: opacity 0.6s ease, transform 0.6s ease;
        }
        
        .animated {
            opacity: 1;
            transform: translateY(0);
        }
    `;
    document.head.appendChild(style);
});

document.addEventListener('DOMContentLoaded', function() {
    // Countdown Timer
    function updateCountdown() {
        const now = new Date();
        const endDate = new Date();
        endDate.setDate(now.getDate() + 2); // 2 days from now
        endDate.setHours(now.getHours() + 12); // plus 12 hours
        endDate.setMinutes(now.getMinutes() + 45); // plus 45 minutes
        
        const diff = endDate - now;
        
        if (diff <= 0) {
            // Reset the countdown if it's expired
            const days = document.querySelector('.countdown-item:nth-child(1) .countdown-number');
            const hours = document.querySelector('.countdown-item:nth-child(2) .countdown-number');
            const minutes = document.querySelector('.countdown-item:nth-child(3) .countdown-number');
            const seconds = document.querySelector('.countdown-item:nth-child(4) .countdown-number');
            
            if (days && hours && minutes && seconds) {
                days.textContent = '00';
                hours.textContent = '00';
                minutes.textContent = '00';
                seconds.textContent = '00';
            }
            return;
        }
        
        const days = Math.floor(diff / (1000 * 60 * 60 * 24));
        const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((diff % (1000 * 60)) / 1000);
        
        const daysEl = document.querySelector('.countdown-item:nth-child(1) .countdown-number');
        const hoursEl = document.querySelector('.countdown-item:nth-child(2) .countdown-number');
        const minutesEl = document.querySelector('.countdown-item:nth-child(3) .countdown-number');
        const secondsEl = document.querySelector('.countdown-item:nth-child(4) .countdown-number');
        
        if (daysEl && hoursEl && minutesEl && secondsEl) {
            daysEl.textContent = days < 10 ? '0' + days : days;
            hoursEl.textContent = hours < 10 ? '0' + hours : hours;
            minutesEl.textContent = minutes < 10 ? '0' + minutes : minutes;
            secondsEl.textContent = seconds < 10 ? '0' + seconds : seconds;
        }
    }
    
    // Initialize countdown
    if (document.querySelector('.countdown')) {
        updateCountdown();
        setInterval(updateCountdown, 1000);
    }
    
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
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
    
    // App Screenshots Carousel
    const screenshotsContainer = document.querySelector('.screenshots-container');
    const screenshotDots = document.querySelectorAll('.screenshot-dot');
    let currentScreenshot = 0;
    
    if (screenshotsContainer && screenshotDots.length > 0) {
        // Handle dot navigation
        screenshotDots.forEach((dot, index) => {
            dot.addEventListener('click', () => {
                currentScreenshot = index;
                updateScreenshotCarousel();
            });
        });
        
        // Handle scroll events to update active dot
        screenshotsContainer.addEventListener('scroll', () => {
            if (!screenshotsContainer) return;
            
            const scrollPosition = screenshotsContainer.scrollLeft;
            const screenshots = document.querySelectorAll('.screenshot');
            const containerWidth = screenshotsContainer.offsetWidth;
            
            if (screenshots.length > 0) {
                const screenshotWidth = screenshots[0].offsetWidth + 20; // Width + gap
                currentScreenshot = Math.round(scrollPosition / screenshotWidth);
                
                if (currentScreenshot >= screenshots.length) {
                    currentScreenshot = screenshots.length - 1;
                }
                
                updateActiveDot();
            }
        });
        
        // Initialize screenshot carousel
        function updateScreenshotCarousel() {
            const screenshots = document.querySelectorAll('.screenshot');
            if (screenshots.length > 0 && currentScreenshot < screenshots.length) {
                const screenshotWidth = screenshots[0].offsetWidth + 20; // Width + gap
                screenshotsContainer.scrollTo({
                    left: currentScreenshot * screenshotWidth,
                    behavior: 'smooth'
                });
                
                updateActiveDot();
            }
        }
        
        function updateActiveDot() {
            screenshotDots.forEach((dot, index) => {
                if (index === currentScreenshot) {
                    dot.classList.add('active');
                } else {
                    dot.classList.remove('active');
                }
            });
        }
        
        // Auto-advance screenshots every 5 seconds
        setInterval(() => {
            const screenshots = document.querySelectorAll('.screenshot');
            if (screenshots.length > 0) {
                currentScreenshot = (currentScreenshot + 1) % screenshots.length;
                updateScreenshotCarousel();
            }
        }, 5000);
    }
    
    // FAQ Accordion
    const accordionItems = document.querySelectorAll('.accordion-item');
    
    if (accordionItems.length > 0) {
        accordionItems.forEach(item => {
            const header = item.querySelector('.accordion-header');
            
            if (header) {
                header.addEventListener('click', () => {
                    // Close all other items
                    accordionItems.forEach(otherItem => {
                        if (otherItem !== item && otherItem.classList.contains('active')) {
                            otherItem.classList.remove('active');
                        }
                    });
                    
                    // Toggle current item
                    item.classList.toggle('active');
                });
            }
        });
        
        // Open first accordion item by default
        if (accordionItems[0]) {
            accordionItems[0].classList.add('active');
        }
    }
    
    // iOS Notification Animation
    function animateNotification() {
        const notification = document.querySelector('.ios-notification');
        if (notification) {
            notification.style.opacity = '0';
            setTimeout(() => {
                notification.style.opacity = '1';
                notification.style.animation = 'slideIn 0.5s ease-out';
            }, 500);
        }
    }
    
    // Animate notification every 10 seconds
    if (document.querySelector('.ios-notification')) {
        setInterval(animateNotification, 10000);
    }
    
    // Scroll animations
    const animateOnScroll = () => {
        const elements = document.querySelectorAll('.value-card, .screenshot, .testimonial-card, .pricing-card, .step');
        
        elements.forEach(element => {
            const elementPosition = element.getBoundingClientRect().top;
            const screenPosition = window.innerHeight / 1.3;
            
            if (elementPosition < screenPosition) {
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
            }
        });
    };
    
    // Set initial state for animated elements
    document.querySelectorAll('.value-card, .screenshot, .testimonial-card, .pricing-card, .step').forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(20px)';
        element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    });
    
    // Run animation on scroll
    window.addEventListener('scroll', animateOnScroll);
    
    // Run once on page load
    animateOnScroll();
});

// Waitlist form handling
document.addEventListener('DOMContentLoaded', function() {
    const waitlistForm = document.getElementById('waitlistForm');
    
    if (waitlistForm) {
        waitlistForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const email = this.querySelector('input[name="email"]').value;
            
            // Here you would normally send the email to your server
            // For now, we'll just show a success message
            
            // Save to local storage to remember the user signed up
            localStorage.setItem('waitlistEmail', email);
            
            // Replace form with success message
            waitlistForm.innerHTML = `
                <div class="success-message">
                    <i class="fas fa-check-circle"></i>
                    <h3>Thank you for joining our waitlist!</h3>
                    <p>We'll notify you at <strong>${email}</strong> when Soul Deep launches.</p>
                </div>
            `;
        });
    }
    
    // Check if user already signed up
    const savedEmail = localStorage.getItem('waitlistEmail');
    if (savedEmail && waitlistForm) {
        waitlistForm.innerHTML = `
            <div class="success-message">
                <i class="fas fa-check-circle"></i>
                <h3>You're on our waitlist!</h3>
                <p>We'll notify you at <strong>${savedEmail}</strong> when Soul Deep launches.</p>
            </div>
        `;
    }
});

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            window.scrollTo({
                top: target.offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// Accordion functionality for FAQ
document.querySelectorAll('.accordion-header').forEach(header => {
    header.addEventListener('click', function() {
        this.classList.toggle('active');
        const content = this.nextElementSibling;
        
        if (content.style.maxHeight) {
            content.style.maxHeight = null;
        } else {
            content.style.maxHeight = content.scrollHeight + 'px';
        }
    });
});

// Animation on scroll
document.addEventListener('scroll', function() {
    const elements = document.querySelectorAll('.fade-in-element');
    
    elements.forEach(element => {
        const position = element.getBoundingClientRect();
        
        // Check if element is in viewport
        if (position.top < window.innerHeight && position.bottom >= 0) {
            element.classList.add('visible');
        }
    });
}); 