// Mobile Navigation Toggle
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    });
});

// Header scroll effect
const header = document.querySelector('.header');
window.addEventListener('scroll', () => {
    if (window.scrollY > 100) {
        header.style.backgroundColor = 'rgba(255, 255, 255, 0.98)';
        header.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
    } else {
        header.style.backgroundColor = 'rgba(255, 255, 255, 0.95)';
        header.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
    }
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const headerOffset = 80;
            const elementPosition = target.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// Skill bar animation
function animateSkillBars() {
    const skillBars = document.querySelectorAll('.skill-progress');
    skillBars.forEach(bar => {
        const width = bar.getAttribute('data-width');
        bar.style.width = width;
    });
}

// Intersection Observer for animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animated');
            
            // Animate skill bars when skills section is visible
            if (entry.target.closest('#skills')) {
                setTimeout(animateSkillBars, 300);
            }
            
            // Animate cards when they come into view
            const cards = entry.target.querySelectorAll('.skill-category, .project-card, .different-item');
            cards.forEach((card, index) => {
                setTimeout(() => {
                    card.classList.add('animate');
                }, index * 100);
            });
        }
    });
}, observerOptions);

// Observe all sections for animations
document.querySelectorAll('section').forEach(section => {
    observer.observe(section);
});

// Form submission handling
const contactForm = document.getElementById('contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form data
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const message = document.getElementById('message').value;
        
        // Simple validation
        if (name && email && message) {
            // Show success message
            alert('Thank you for your message! I will get back to you soon.');
            
            // Reset form
            contactForm.reset();
        } else {
            alert('Please fill in all fields.');
        }
    });
}

// Project card hover effect enhancement
const projectCards = document.querySelectorAll('.project-card');
projectCards.forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-15px)';
    });
    
    card.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0)';
    });
});

// Header link active state
const sections = document.querySelectorAll('section');
const navLinks = document.querySelectorAll('.nav-link');

window.addEventListener('scroll', () => {
    let current = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (pageYOffset >= (sectionTop - 200)) {
            current = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
});

// Add active class to CSS for current nav link
const style = document.createElement('style');
style.innerHTML = `
    .nav-link.active {
        color: var(--primary-color);
    }
    .nav-link.active::after {
        width: 100%;
    }
    .animated .section-title,
    .animated .section-line {
        opacity: 1;
        transform: translateY(0) scaleX(1);
    }
    .animated {
        animation: fadeInUp 0.6s ease-out;
    }
    @keyframes fadeInUp {
        from {
            opacity: 0;
            transform: translateY(30px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
    .hero-titles h3 {
        animation: fadeIn 1s ease-in-out infinite alternate;
    }
    .hero-titles h3:nth-child(1) {
        animation-delay: 0s;
    }
    .hero-titles h3:nth-child(2) {
        animation-delay: 0.3s;
    }
    .hero-titles h3:nth-child(3) {
        animation-delay: 0.6s;
    }
    @keyframes fadeIn {
        from { opacity: 0.6; }
        to { opacity: 1; }
    }
`;
document.head.appendChild(style);

// Add scroll progress indicator
const progressIndicator = document.createElement('div');
progressIndicator.className = 'scroll-progress';
progressIndicator.style.cssText = `
    position: fixed;
    top: 0;
    left: 0;
    width: 0%;
    height: 3px;
    background: linear-gradient(90deg, var(--primary-color), var(--secondary-color));
    z-index: 9999;
    transition: width 0.1s ease;
`;
document.body.appendChild(progressIndicator);

window.addEventListener('scroll', () => {
    const scrollTop = window.scrollY;
    const docHeight = document.body.offsetHeight - window.innerHeight;
    const scrollPercent = (scrollTop / docHeight) * 100;
    progressIndicator.style.width = scrollPercent + '%';
});

// Feature detection for object-fit support
function checkObjectFitSupport() {
    const testImg = document.createElement('img');
    testImg.style.objectFit = 'cover';
    
    if (testImg.style.objectFit !== 'cover') {
        document.body.classList.add('no-object-fit');
    }
}

// Add loading animation
window.addEventListener('load', () => {
    document.body.classList.add('loaded');
    checkObjectFitSupport();
});

// Add CSS for loading animation
const loadingStyle = document.createElement('style');
loadingStyle.innerHTML = `
    body:not(.loaded) {
        overflow: hidden;
    }
    body:not(.loaded)::before {
        content: '';
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: linear-gradient(135deg, var(--primary-color), var(--secondary-color));
        z-index: 9999;
        display: flex;
        align-items: center;
        justify-content: center;
    }
    body:not(.loaded)::after {
        content: 'Loading...';
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        color: white;
        font-size: 24px;
        font-weight: 600;
        z-index: 10000;
        animation: pulse 1.5s ease-in-out infinite;
    }
    @keyframes pulse {
        0%, 100% { opacity: 1; }
        50% { opacity: 0.5; }
    }
`;
document.head.appendChild(loadingStyle);

// Type effect for hero titles
function typeWriter() {
    const titles = document.querySelectorAll('.hero-titles h3');
    let currentTitle = 0;
    
    function showNextTitle() {
        titles.forEach((title, index) => {
            if (index === currentTitle) {
                title.style.opacity = '1';
                title.style.transform = 'scale(1.05)';
            } else {
                title.style.opacity = '0.6';
                title.style.transform = 'scale(1)';
            }
        });
        
        currentTitle = (currentTitle + 1) % titles.length;
    }
    
    setInterval(showNextTitle, 2000);
}

// Initialize animations after page load
window.addEventListener('load', () => {
    setTimeout(() => {
        document.body.classList.add('loaded');
        typeWriter();
    }, 1000);
});

// Add fade-in effect to elements
document.addEventListener('DOMContentLoaded', function() {
    const fadeElements = document.querySelectorAll('.skill-category, .project-card, .different-item');
    
    fadeElements.forEach((element, index) => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(30px)';
        element.style.transition = `opacity 0.5s ease ${(index * 0.1)}s, transform 0.5s ease ${(index * 0.1)}s`;
        
        setTimeout(() => {
            element.style.opacity = '1';
            element.style.transform = 'translateY(0)';
        }, 100);
    });
});