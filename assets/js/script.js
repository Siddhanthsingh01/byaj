// Navigation Menu Toggle
const menuToggle = document.querySelector('.menu-toggle');
const navLinks = document.querySelector('.nav-links');

if (menuToggle) {
    menuToggle.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        menuToggle.classList.toggle('active');
    });
}

// Close menu when link is clicked
if (navLinks) {
    navLinks.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('active');
            menuToggle?.classList.remove('active');
        });
    });
}

// Smooth scroll to section
function scrollToSection(sectionId) {
    const element = document.getElementById(sectionId);
    if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
    }
}

// Modal functionality
const contactModal = document.getElementById('contact-modal');

if (contactModal) {
    // Close modal when clicking outside
    window.addEventListener('click', (event) => {
        if (event.target === contactModal) {
            contactModal.style.display = 'none';
        }
    });
}

// Submit contact form
function submitContactForm() {
    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const message = document.getElementById('message').value.trim();

    if (!name || !email || !message) {
        alert('Please fill in all fields');
        return;
    }

    if (!isValidEmail(email)) {
        alert('Please enter a valid email address');
        return;
    }

    // Show success message
    alert(`Thank you, ${name}! Your message has been received. We'll get back to you shortly.`);

    // Clear form
    document.getElementById('contact-form').reset();

    // Close modal
    if (contactModal) {
        contactModal.style.display = 'none';
    }
}

// Email validation
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Delete Account Form
const deleteAccountForm = document.getElementById('delete-account-form');
if (deleteAccountForm) {
    deleteAccountForm.addEventListener('submit', (e) => {
        e.preventDefault();
        handleDeleteAccountSubmission();
    });
}

function handleDeleteAccountSubmission() {
    const name = document.getElementById('full-name').value.trim();
    const email = document.getElementById('email').value.trim();
    const phone = document.getElementById('phone').value.trim();
    const reason = document.getElementById('reason').value;
    const additionalInfo = document.getElementById('additional-info').value.trim();
    const understand = document.getElementById('understand').checked;
    const consent = document.getElementById('consent').checked;

    if (!name || !email || !phone || !understand || !consent) {
        alert('Please fill in all required fields and confirm your understanding');
        return;
    }

    if (!isValidEmail(email)) {
        alert('Please enter a valid email address');
        return;
    }

    // Prepare mailto link with form data
    const subject = encodeURIComponent('BYAJ Account Deletion Request');
    const body = encodeURIComponent(
        `Full Name: ${name}\n` +
        `Email: ${email}\n` +
        `Phone: ${phone}\n` +
        `Reason: ${reason || 'Not specified'}\n` +
        `Additional Information: ${additionalInfo || 'None'}\n\n` +
        `Submitted on: ${new Date().toLocaleString()}\n\n` +
        `Please process this account deletion request as per our privacy policy.`
    );

    window.location.href = `mailto:support@yourdomain.com?subject=${subject}&body=${body}`;

    // Show confirmation message
    alert('Please complete the email to submit your deletion request. You will receive a confirmation email once your request is processed.');

    // Reset form after short delay
    setTimeout(() => {
        deleteAccountForm.reset();
    }, 500);
}

// Contact form submission
const contactFormElement = document.getElementById('contact-form');
if (contactFormElement) {
    contactFormElement.addEventListener('submit', (e) => {
        e.preventDefault();
        submitContactForm();
    });
}

// Contact page form
const contactPageForm = document.getElementById('contact-form');
if (contactPageForm && contactPageForm !== contactFormElement) {
    contactPageForm.addEventListener('submit', (e) => {
        e.preventDefault();
        handleContactPageSubmission();
    });
}

function handleContactPageSubmission() {
    const name = document.getElementById('contact-name')?.value.trim();
    const email = document.getElementById('contact-email')?.value.trim();
    const phone = document.getElementById('contact-phone')?.value.trim() || 'Not provided';
    const subject = document.getElementById('contact-subject')?.value;
    const message = document.getElementById('contact-message')?.value.trim();
    const newsletter = document.getElementById('contact-newsletter')?.checked || false;

    if (!name || !email || !subject || !message) {
        alert('Please fill in all required fields');
        return;
    }

    if (!isValidEmail(email)) {
        alert('Please enter a valid email address');
        return;
    }

    // Prepare mailto link
    const mailtoSubject = encodeURIComponent(`${subject} - Contact Form Submission`);
    const mailtoBody = encodeURIComponent(
        `Name: ${name}\n` +
        `Email: ${email}\n` +
        `Phone: ${phone}\n` +
        `Subject: ${subject}\n` +
        `Newsletter: ${newsletter ? 'Yes' : 'No'}\n\n` +
        `Message:\n${message}\n\n` +
        `Submitted on: ${new Date().toLocaleString()}`
    );

    window.location.href = `mailto:support@yourdomain.com?subject=${mailtoSubject}&body=${mailtoBody}`;

    alert('Thank you for reaching out! Your message will be sent to our support team.');

    // Reset form
    setTimeout(() => {
        document.getElementById('contact-form').reset();
    }, 500);
}

// Active navigation link on page load
window.addEventListener('load', () => {
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    document.querySelectorAll('.nav-links a').forEach(link => {
        const href = link.getAttribute('href');
        if (href === currentPage || (currentPage === '' && href === 'index.html')) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });
});

// Intersection Observer for fade-in animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.animation = 'fadeInUp 0.8s ease forwards';
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe all feature cards and other elements
document.querySelectorAll('.feature-card, .faq-card, .resource-card').forEach(element => {
    element.style.opacity = '0';
    observer.observe(element);
});

// Escape key to close modals
document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') {
        if (contactModal) {
            contactModal.style.display = 'none';
        }
    }
});

// Handle checkbox logic for delete account form
const understandCheckbox = document.getElementById('understand');
const consentCheckbox = document.getElementById('consent');

if (understandCheckbox) {
    understandCheckbox.addEventListener('change', () => {
        if (understandCheckbox.checked && consentCheckbox && !consentCheckbox.checked) {
            consentCheckbox.focus();
        }
    });
}

// Smooth scroll behavior for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Add loading state to forms
function addFormLoadingState() {
    const forms = document.querySelectorAll('form');
    forms.forEach(form => {
        form.addEventListener('submit', function() {
            const buttons = this.querySelectorAll('button[type="submit"]');
            buttons.forEach(button => {
                button.disabled = true;
                button.style.opacity = '0.6';
                button.style.cursor = 'not-allowed';
            });
        });
    });
}

addFormLoadingState();

// Validate phone number format
const phoneInputs = document.querySelectorAll('input[type="tel"]');
phoneInputs.forEach(input => {
    input.addEventListener('blur', function() {
        const phoneRegex = /^[+]?[(]?[0-9]{3}[)]?[-\s.]?[0-9]{3}[-\s.]?[0-9]{4,6}$/;
        if (this.value && !phoneRegex.test(this.value.replace(/\s/g, ''))) {
            // Only warn, don't prevent submission
            console.warn('Phone number format may be incorrect');
        }
    });
});

// Log page analytics (placeholder for actual analytics)
window.addEventListener('load', () => {
    const pagePath = window.location.pathname;
    const pageTitle = document.title;
    console.log(`Page loaded: ${pageTitle} (${pagePath})`);
});

// Handle unload event
window.addEventListener('beforeunload', () => {
    // Clean up if needed
    navLinks?.classList.remove('active');
    menuToggle?.classList.remove('active');
});