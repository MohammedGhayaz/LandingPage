// ==================== Mobile Menu Toggle ====================
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

function toggleMenu() {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
    
    // Prevent body scroll when menu is open on mobile
    if (navMenu.classList.contains('active')) {
        document.body.style.overflow = 'hidden';
    } else {
        document.body.style.overflow = '';
    }
}

hamburger.addEventListener('click', toggleMenu);

// Close mobile menu when a nav link is clicked
const navLinks = document.querySelectorAll('.nav-link');

navLinks.forEach(link => {
    link.addEventListener('click', () => {
        if (navMenu.classList.contains('active')) {
            toggleMenu();
        }
    });
});

// Close mobile menu when clicking outside
document.addEventListener('click', (e) => {
    if (navMenu.classList.contains('active') && 
        !navMenu.contains(e.target) && 
        !hamburger.contains(e.target)) {
        toggleMenu();
    }
});

// ==================== Smooth Scroll ====================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        
        if (targetElement) {
            const navHeight = document.querySelector('.navbar').offsetHeight;
            const targetPosition = targetElement.offsetTop - navHeight - 20;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// ==================== Email Signup Form ====================
const signupForm = document.getElementById('signupForm');
const emailInput = document.getElementById('emailInput');
const successMessage = document.getElementById('successMessage');

signupForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Validate email
    if (emailInput.value && emailInput.validity.valid) {
        // Get the email value
        const email = emailInput.value;
        
        // Here you would typically send the email to your backend
        // For now, we'll just log it and show success message
        console.log('Email submitted:', email);
        
        // Show success message
        successMessage.classList.add('show');
        
        // Clear the input
        emailInput.value = '';
        
        // Hide message after 5 seconds
        setTimeout(() => {
            successMessage.classList.remove('show');
        }, 5000);
        
        // Optional: Send to backend
        // sendEmailToBackend(email);
    }
});

// ==================== Navbar Scroll Effect ====================
let lastScroll = 0;
const navbar = document.querySelector('.navbar');

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    // Add shadow on scroll
    if (currentScroll > 50) {
        navbar.style.boxShadow = '0 4px 20px rgba(62, 39, 35, 0.15)';
    } else {
        navbar.style.boxShadow = '0 2px 20px rgba(62, 39, 35, 0.1)';
    }
    
    lastScroll = currentScroll;
});

// ==================== Active Nav Link Highlight ====================
const sections = document.querySelectorAll('section[id], header[id]');

function highlightNavOnScroll() {
    const scrollPosition = window.scrollY + 100;
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        const sectionId = section.getAttribute('id');
        
        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${sectionId}`) {
                    link.classList.add('active');
                }
            });
        }
    });
}

window.addEventListener('scroll', highlightNavOnScroll);

// ==================== Handle Window Resize ====================
let windowWidth = window.innerWidth;

window.addEventListener('resize', () => {
    // Close mobile menu if window is resized to desktop size
    if (window.innerWidth > 992 && navMenu.classList.contains('active')) {
        toggleMenu();
    }
    
    // Reset body overflow if resizing
    if (window.innerWidth > 992) {
        document.body.style.overflow = '';
    }
    
    windowWidth = window.innerWidth;
});

// ==================== Optional: Backend Integration ====================
/*
// Example function to send email to backend
async function sendEmailToBackend(email) {
    try {
        const response = await fetch('YOUR_BACKEND_ENDPOINT', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email: email })
        });
        
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        
        const data = await response.json();
        console.log('Success:', data);
    } catch (error) {
        console.error('Error:', error);
        // You might want to show an error message to the user here
    }
}
*/

// ==================== Initialize ====================
// Run on page load
document.addEventListener('DOMContentLoaded', () => {
    console.log('Royal Chai website loaded successfully');
    highlightNavOnScroll();
});
