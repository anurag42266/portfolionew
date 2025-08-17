// Tab functionality
var tablinks = document.getElementsByClassName("tab-links");
var tabcontents = document.getElementsByClassName("tab-contents");

function opentab(tabname) {
    for(tablink of tablinks) {
        tablink.classList.remove("active-link");
    }
    for(tabcontent of tabcontents) {
        tabcontent.classList.remove("active-tab");
    }
    event.currentTarget.classList.add("active-link");
    document.getElementById(tabname).classList.add("active-tab");
}

// Mobile menu functionality
var sidemenu = document.getElementById("sidemenu");

function openmenu() {
    sidemenu.style.right = "0";
}

function closemenu() {
    sidemenu.style.right = "-200px";
}

// Form submission
document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('contact-form');
    const formMessage = document.getElementById('form-message');
    
    if (form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(form);
            const data = {
                name: formData.get('name'),
                email: formData.get('email'),
                subject: formData.get('subject'),
                message: formData.get('message')
            };
            
            // Show loading state
            const submitBtn = form.querySelector('.btn-submit');
            const originalText = submitBtn.innerHTML;
            submitBtn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Sending...';
            submitBtn.disabled = true;
            
            // Simulate form submission (replace with actual submission logic)
            setTimeout(() => {
                // Reset form
                form.reset();
                
                // Show success message
                showFormMessage('Thank you for your message! I\'ll get back to you soon.', 'success');
                
                // Reset button
                submitBtn.innerHTML = originalText;
                submitBtn.disabled = false;
            }, 2000);
        });
    }
});

function showFormMessage(message, type) {
    const formMessage = document.getElementById('form-message');
    formMessage.textContent = message;
    formMessage.className = type;
    formMessage.style.display = 'block';
    
    // Hide message after 5 seconds
    setTimeout(() => {
        formMessage.style.display = 'none';
    }, 5000);
}

// Smooth scrolling for navigation links
document.addEventListener('DOMContentLoaded', function() {
    const navLinks = document.querySelectorAll('nav ul li a[href^="#"]');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                targetSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
            
            // Close mobile menu if open
            if (window.innerWidth <= 768) {
                closemenu();
            }
        });
    });
});

// Add scroll effect to timeline items
function handleTimelineAnimation() {
    const timelineItems = document.querySelectorAll('.timeline-item');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });
    
    timelineItems.forEach(item => {
        item.style.opacity = '0';
        item.style.transform = 'translateY(50px)';
        item.style.transition = 'all 0.6s ease-out';
        observer.observe(item);
    });
}

// Initialize animations when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    handleTimelineAnimation();
    
    // Add loading animation to page
    document.body.style.opacity = '0';
    setTimeout(() => {
        document.body.style.transition = 'opacity 0.5s ease-in-out';
        document.body.style.opacity = '1';
    }, 100);
});

// Handle window resize for responsive behavior
window.addEventListener('resize', function() {
    if (window.innerWidth > 768) {
        sidemenu.style.right = '';
    }
});

// Add active states for navigation
window.addEventListener('scroll', function() {
    const sections = document.querySelectorAll('div[id]');
    const navLinks = document.querySelectorAll('nav ul li a[href^="#"]');
    
    let current = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop - 100;
        if (scrollY >= sectionTop) {
            current = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === '#' + current) {
            link.classList.add('active');
        }
    });
});

// Add typing effect to header text (optional enhancement)
function typeWriter(element, text, speed = 100) {
    let i = 0;
    element.innerHTML = '';
    
    function type() {
        if (i < text.length) {
            element.innerHTML += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    
    type();
}

// Initialize typing effect for header subtitle (optional)
document.addEventListener('DOMContentLoaded', function() {
    const headerSubtitle = document.querySelector('.header-subtitle');
    if (headerSubtitle) {
        const originalText = headerSubtitle.textContent;
        setTimeout(() => {
            typeWriter(headerSubtitle, originalText, 50);
        }, 1000);
    }
});

// Handle form validation
function validateForm(form) {
    const requiredFields = form.querySelectorAll('[required]');
    let isValid = true;
    
    requiredFields.forEach(field => {
        if (!field.value.trim()) {
            field.style.borderColor = 'hsl(0 100% 50%)';
            isValid = false;
        } else {
            field.style.borderColor = 'hsl(0 0% 25%)';
        }
    });
    
    // Email validation
    const emailField = form.querySelector('input[type="email"]');
    if (emailField && emailField.value) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(emailField.value)) {
            emailField.style.borderColor = 'hsl(0 100% 50%)';
            showFormMessage('Please enter a valid email address.', 'error');
            isValid = false;
        }
    }
    
    return isValid;
}

// Enhanced form submission with validation
document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('contact-form');
    
    if (form) {
        // Add real-time validation
        form.addEventListener('input', function(e) {
            if (e.target.hasAttribute('required')) {
                if (e.target.value.trim()) {
                    e.target.style.borderColor = 'hsl(146 87% 49%)';
                } else {
                    e.target.style.borderColor = 'hsl(0 0% 25%)';
                }
            }
        });
    }
});