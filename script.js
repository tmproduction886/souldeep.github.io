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