// ===========================
// Navigation Scroll Effect
// ===========================
const navbar = document.getElementById('navbar');
const navToggle = document.getElementById('navToggle');
const navMenu = document.getElementById('navMenu');
const navLinks = document.querySelectorAll('.nav-link');

// Add scroll effect to navbar
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Mobile menu toggle
navToggle.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    
    // Animate hamburger icon
    const spans = navToggle.querySelectorAll('span');
    if (navMenu.classList.contains('active')) {
        spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
        spans[1].style.opacity = '0';
        spans[2].style.transform = 'rotate(-45deg) translate(7px, -6px)';
    } else {
        spans[0].style.transform = 'none';
        spans[1].style.opacity = '1';
        spans[2].style.transform = 'none';
    }
});

// Close mobile menu when clicking a link
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        const spans = navToggle.querySelectorAll('span');
        spans[0].style.transform = 'none';
        spans[1].style.opacity = '1';
        spans[2].style.transform = 'none';
    });
});

// ===========================
// Smooth Scrolling
// ===========================
navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        const href = link.getAttribute('href');
        
        // Only handle internal links
        if (href.startsWith('#')) {
            e.preventDefault();
            const targetId = href.substring(1);
            const targetSection = document.getElementById(targetId);
            
            if (targetSection) {
                const offsetTop = targetSection.offsetTop - 80; // Account for fixed navbar
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        }
    });
});

// ===========================
// Active Navigation Highlighting
// ===========================
const sections = document.querySelectorAll('section[id]');

function highlightNavigation() {
    const scrollPosition = window.scrollY + 100;

    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        const sectionId = section.getAttribute('id');
        const correspondingLink = document.querySelector(`.nav-link[href="#${sectionId}"]`);

        if (correspondingLink) {
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                correspondingLink.style.color = 'var(--primary-color)';
            } else {
                correspondingLink.style.color = '';
            }
        }
    });
}

window.addEventListener('scroll', highlightNavigation);
window.addEventListener('load', highlightNavigation);

// ===========================
// Intersection Observer for Fade-in Animations
// ===========================
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

// Special handling for problem cards with staggered animation
const problemCards = document.querySelectorAll('.problem-card');
const problemObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            const cards = Array.from(entry.target.parentElement.children);
            const index = cards.indexOf(entry.target);
            
            setTimeout(() => {
                entry.target.classList.add('animate-in');
                
                // Animate the icon with a bounce
                const icon = entry.target.querySelector('.problem-icon');
                if (icon) {
                    icon.style.animation = 'iconBounce 0.6s ease-out';
                }
            }, index * 150);
            
            problemObserver.unobserve(entry.target);
        }
    });
}, observerOptions);

problemCards.forEach(card => {
    problemObserver.observe(card);
});

// General fade-in elements
const fadeInElements = document.querySelectorAll('.service-card, .outcome-card, .why-card, .timeline-item, .engagement-card');

const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
            setTimeout(() => {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }, index * 100);
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Set initial state and observe
fadeInElements.forEach(element => {
    element.style.opacity = '0';
    element.style.transform = 'translateY(20px)';
    element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(element);
});

// ===========================
// Contact Form Handling
// ===========================
const contactForm = document.getElementById('contactForm');

contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    // Get form data
    const formData = {
        name: document.getElementById('name').value,
        email: document.getElementById('email').value,
        company: document.getElementById('company').value,
        message: document.getElementById('message').value
    };
    
    // Here you would typically send the form data to a server
    // For now, we'll just show a success message
    
    // Create success message
    const successMessage = document.createElement('div');
    successMessage.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: linear-gradient(135deg, #10b981, #059669);
        color: white;
        padding: 1.5rem 2rem;
        border-radius: 10px;
        box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
        z-index: 10000;
        animation: slideIn 0.3s ease;
    `;
    successMessage.innerHTML = `
        <strong>Message Sent!</strong><br>
        Thank you for your interest. We'll be in touch soon.
    `;
    
    // Add animation
    const style = document.createElement('style');
    style.textContent = `
        @keyframes slideIn {
            from {
                transform: translateX(400px);
                opacity: 0;
            }
            to {
                transform: translateX(0);
                opacity: 1;
            }
        }
        @keyframes slideOut {
            from {
                transform: translateX(0);
                opacity: 1;
            }
            to {
                transform: translateX(400px);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(style);
    
    document.body.appendChild(successMessage);
    
    // Remove message after 5 seconds
    setTimeout(() => {
        successMessage.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => {
            document.body.removeChild(successMessage);
            document.head.removeChild(style);
        }, 300);
    }, 5000);
    
    // Reset form
    contactForm.reset();
    
    // In a real implementation, you would send this data to your server:
    // fetch('/api/contact', {
    //     method: 'POST',
    //     headers: {
    //         'Content-Type': 'application/json',
    //     },
    //     body: JSON.stringify(formData)
    // })
    // .then(response => response.json())
    // .then(data => {
    //     // Show success message
    // })
    // .catch(error => {
    //     // Show error message
    // });
});

// ===========================
// Scroll to Top on Logo Click
// ===========================
const navBrand = document.querySelector('.nav-brand');

navBrand.addEventListener('click', (e) => {
    e.preventDefault();
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// ===========================
// Parallax Effect for Hero Background
// ===========================
const heroBackground = document.querySelector('.hero-background');

window.addEventListener('scroll', () => {
    const scrolled = window.scrollY;
    if (heroBackground && scrolled < window.innerHeight) {
        heroBackground.style.transform = `translateY(${scrolled * 0.5}px)`;
        heroBackground.style.opacity = `${1 - scrolled / 1000}`;
    }
});

// ===========================
// Stats Counter Animation
// ===========================
function animateCounter(element, target, duration = 2000) {
    const start = 0;
    const increment = target / (duration / 16);
    let current = start;
    
    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            element.textContent = target;
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(current);
        }
    }, 16);
}

// Animate stats when they come into view
const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const statNumber = entry.target.querySelector('.stat-number');
            const text = statNumber.textContent;
            
            // Check if it's a number we can animate
            const match = text.match(/\d+/);
            if (match) {
                const number = parseInt(match[0]);
                const prefix = text.substring(0, match.index);
                const suffix = text.substring(match.index + match[0].length);
                
                let current = 0;
                const increment = number / 50;
                const timer = setInterval(() => {
                    current += increment;
                    if (current >= number) {
                        statNumber.textContent = prefix + number + suffix;
                        clearInterval(timer);
                    } else {
                        statNumber.textContent = prefix + Math.floor(current) + suffix;
                    }
                }, 40);
            }
            
            statsObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

document.querySelectorAll('.stat').forEach(stat => {
    statsObserver.observe(stat);
});

// ===========================
// FAQ Accordion
// ===========================
const faqItems = document.querySelectorAll('.faq-item');

faqItems.forEach(item => {
    const question = item.querySelector('.faq-question');
    
    question.addEventListener('click', () => {
        // Close other items
        const isActive = item.classList.contains('active');
        
        faqItems.forEach(otherItem => {
            otherItem.classList.remove('active');
        });
        
        // Toggle current item
        if (!isActive) {
            item.classList.add('active');
        }
    });
});

// ===========================
// Initialize on Load
// ===========================
document.addEventListener('DOMContentLoaded', () => {
    // Add loaded class to body for any CSS transitions
    document.body.classList.add('loaded');
    
    // Preload critical images if any
    // This is where you'd preload hero images or important graphics
    
    console.log('Ronnie Barnard AI Consulting website loaded successfully');
});

// ===========================
// Handle External Links
// ===========================
document.querySelectorAll('a[href^="http"]').forEach(link => {
    link.setAttribute('target', '_blank');
    link.setAttribute('rel', 'noopener noreferrer');
});

