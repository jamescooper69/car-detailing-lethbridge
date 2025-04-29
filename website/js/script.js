// ===== Mobile Menu Toggle =====
const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
const mobileMenu = document.querySelector('.mobile-menu');
const closeMobileMenuBtn = document.querySelector('.close-btn');

if (mobileMenuBtn) {
    mobileMenuBtn.addEventListener('click', () => {
        mobileMenu.classList.add('active');
        document.body.style.overflow = 'hidden';
    });
}

if (closeMobileMenuBtn) {
    closeMobileMenuBtn.addEventListener('click', () => {
        mobileMenu.classList.remove('active');
        document.body.style.overflow = 'auto';
    });
}

// ===== FAQ Accordion =====
const faqItems = document.querySelectorAll('.faq-item');

faqItems.forEach(item => {
    const question = item.querySelector('.faq-question');

    question.addEventListener('click', () => {
        const isActive = item.classList.contains('active');

        faqItems.forEach(faqItem => faqItem.classList.remove('active'));

        if (!isActive) {
            item.classList.add('active');
        }
    });
});

// ===== Testimonial Slider =====
const testimonials = document.querySelectorAll('.testimonial');
let currentTestimonial = 0;

function showTestimonial(index) {
    testimonials.forEach((testimonial, i) => {
        testimonial.style.display = i === index ? 'block' : 'none';
    });
}

if (testimonials.length > 0) {
    showTestimonial(currentTestimonial);

    setInterval(() => {
        currentTestimonial = (currentTestimonial + 1) % testimonials.length;
        showTestimonial(currentTestimonial);
    }, 5000);
}

// ===== Smooth Scrolling for Anchor Links =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();

        const targetId = this.getAttribute('href');
        if (targetId === '#') return;

        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop - 100,
                behavior: 'smooth'
            });

            if (mobileMenu.classList.contains('active')) {
                mobileMenu.classList.remove('active');
                document.body.style.overflow = 'auto';
            }
        }
    });
});

// ===== Animation on Scroll =====
const animateElements = document.querySelectorAll('.service-card, .feature-card, .value-card, .team-member, .pricing-card, .gallery-item');

function checkScroll() {
    animateElements.forEach(element => {
        const elementPosition = element.getBoundingClientRect().top;
        const screenPosition = window.innerHeight / 1.2;

        if (elementPosition < screenPosition) {
            element.style.opacity = '1';
            element.style.transform = 'translateY(0)';
        }
    });
}

if (animateElements.length > 0) {
    animateElements.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(20px)';
        element.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    });

    window.addEventListener('load', checkScroll);
    window.addEventListener('scroll', checkScroll);
}

// ===== Dynamic Copyright =====
const yearElement = document.querySelector('.footer-bottom p');

if (yearElement) {
    const currentYear = new Date().getFullYear();
    yearElement.innerHTML = yearElement.innerHTML.replace('2025', currentYear);
}

// ===== Dynamic Packages Based on Service =====
const serviceSelect = document.getElementById('service');
const packagesGroup = document.getElementById('packages-group');
const packagesSelect = document.getElementById('package');

if (serviceSelect && packagesGroup && packagesSelect) {
    serviceSelect.addEventListener('change', () => {
        const selectedService = serviceSelect.value;

        // Clear any existing options in the packages dropdown
        packagesSelect.innerHTML = '<option value="">Select a Package</option>';
        packagesGroup.style.display = 'none'; // Hide the packages dropdown initially

        if (selectedService === 'interior') {
            const interiorPackages = ['Interior Basic', 'Interior Premium', 'Interior Ultimate'];
            interiorPackages.forEach(packageOption => {
                const option = document.createElement('option');
                option.value = packageOption.toLowerCase().replace(/ /g, '-'); // Create a machine-readable value
                option.textContent = packageOption;
                packagesSelect.appendChild(option);
            });
            packagesGroup.style.display = 'block'; // Show the packages dropdown for Interior
        } else if (selectedService === 'exterior') {
            const exteriorPackages = ['Exterior Basic', 'Exterior Premium'];
            exteriorPackages.forEach(packageOption => {
                const option = document.createElement('option');
                option.value = packageOption.toLowerCase().replace(/ /g, '-');
                option.textContent = packageOption;
                packagesSelect.appendChild(option);
            });
            packagesGroup.style.display = 'block'; // Show for Exterior
        } else if (selectedService === 'complete') {
            const completePackages = ['Complete Basic', 'Complete Premium', 'Complete Ultimate'];
            completePackages.forEach(packageOption => {
                const option = document.createElement('option');
                option.value = packageOption.toLowerCase().replace(/ /g, '-');
                option.textContent = packageOption;
                packagesSelect.appendChild(option);
            });
            packagesGroup.style.display = 'block'; // Show for Complete
        }
    });
}

// ===== Form Submission with Inline Confirmation =====
const bookingForm = document.getElementById('booking-form');
const confirmationMessageDiv = document.getElementById('confirmation-message');

if (bookingForm && confirmationMessageDiv) {
    bookingForm.addEventListener('submit', async (e) => {
        e.preventDefault(); // Prevent the default form submission

        const formData = new FormData(bookingForm);

        try {
            const response = await fetch(bookingForm.action, {
                method: 'POST',
                body: formData,
                headers: {
                    'Accept': 'application/json' // Request JSON response
                }
            });

            if (response.ok) {
                // Form submission was successful
                confirmationMessageDiv.innerHTML = '<span style="color: green;"><i class="fas fa-check"></i> Booking confirmed</span>';
                confirmationMessageDiv.style.display = 'block';

                // Optionally reset the form after a short delay
                setTimeout(() => {
                    bookingForm.reset();
                    confirmationMessageDiv.style.display = 'none';
                }, 3000); // Adjust the display time as needed
            } else {
                // Form submission failed
                const error = await response.json();
                console.error("Form submission error:", error);
                confirmationMessageDiv.innerHTML = '<span style="color: red;">Oops! Something went wrong. Please try again.</span>';
                confirmationMessageDiv.style.display = 'block';
                setTimeout(() => {
                    confirmationMessageDiv.style.display = 'none';
                }, 3000);
            }
        } catch (error) {
            console.error("Network error:", error);
            confirmationMessageDiv.innerHTML = '<span style="color: red;">Network error. Please check your connection.</span>';
            confirmationMessageDiv.style.display = 'block';
            setTimeout(() => {
                confirmationMessageDiv.style.display = 'none';
            }, 3000);
        }
    });
}