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

// ===== Mobile Menu Dropdowns =====
const detailingParent = document.querySelector('.mobile-detailing-parent');
const locationParent = document.querySelector('.mobile-location-parent');

if (detailingParent) {
    detailingParent.addEventListener('click', (e) => {
        if (e.target.closest('a')) {
            detailingParent.classList.toggle('open');
        }
    });
}

if (locationParent) {
    locationParent.addEventListener('click', (e) => {
        if (e.target.closest('a')) {
            locationParent.classList.toggle('open');
        }
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

// ===== Dynamic Packages Based on Service (Modified for Add-ons) =====
const serviceSelect = document.getElementById('service');
const packagesGroup = document.getElementById('packages-group');
const packagesSelect = document.getElementById('package');
const addonsGroup = document.getElementById('addons-group');
const addonsContainer = document.getElementById('addons-container');

if (serviceSelect && packagesGroup && packagesSelect && addonsGroup && addonsContainer) {
    serviceSelect.addEventListener('change', () => {
        const selectedService = serviceSelect.value;

        // Clear existing package options
        packagesSelect.innerHTML = '<option value="">Select a Package</option>';
        packagesGroup.style.display = 'none';

        // Clear existing addon options
        addonsContainer.innerHTML = '';
        addonsGroup.style.display = 'none';

        if (selectedService === 'interior') {
            const interiorPackages = ['Interior Standard', 'Interior Premium', 'Interior Gold'];
            interiorPackages.forEach(packageOption => {
                const option = document.createElement('option');
                option.value = packageOption.toLowerCase().replace(/ /g, '-');
                option.textContent = packageOption;
                packagesSelect.appendChild(option);
            });
            packagesGroup.style.display = 'block';

            const interiorAddons = ['Headliner Shampoo', 'Pet Hair Removal', 'None'];
            interiorAddons.forEach(addon => {
                const checkbox = document.createElement('input');
                checkbox.type = 'checkbox';
                checkbox.id = `addon-${addon.toLowerCase().replace(/ /g, '-')}`;
                checkbox.name = 'addons'; // Use the same name for all addons
                checkbox.value = addon.toLowerCase().replace(/ /g, '-');

                const label = document.createElement('label');
                label.htmlFor = `addon-${addon.toLowerCase().replace(/ /g, '-')}`;
                label.textContent = addon;

                const div = document.createElement('div');
                div.appendChild(checkbox);
                div.appendChild(label);
                addonsContainer.appendChild(div);
            });
            addonsGroup.style.display = 'block';

            // Handle the "None" checkbox logic for Interior
            const noneCheckboxInterior = document.getElementById('addon-none');
            const otherCheckboxesInterior = Array.from(addonsContainer.querySelectorAll('input[type="checkbox"]:not(#addon-none)'));

            if (noneCheckboxInterior) {
                noneCheckboxInterior.addEventListener('change', () => {
                    if (noneCheckboxInterior.checked) {
                        otherCheckboxesInterior.forEach(cb => cb.checked = false);
                    }
                });
            }

            otherCheckboxesInterior.forEach(cb => {
                cb.addEventListener('change', () => {
                    if (noneCheckboxInterior && noneCheckboxInterior.checked) {
                        noneCheckboxInterior.checked = false;
                    }
                });
            });

        } else if (selectedService === 'exterior') {
            const exteriorPackages = ['Exterior Standard', 'Exterior Gold'];
            exteriorPackages.forEach(packageOption => {
                const option = document.createElement('option');
                option.value = packageOption.toLowerCase().replace(/ /g, '-');
                option.textContent = packageOption;
                packagesSelect.appendChild(option);
            });
            packagesGroup.style.display = 'block';

            const exteriorAddons = ['Headlight Restoration', 'None'];
            exteriorAddons.forEach(addon => {
                const checkbox = document.createElement('input');
                checkbox.type = 'checkbox';
                checkbox.id = `addon-${addon.toLowerCase().replace(/ /g, '-')}`;
                checkbox.name = 'addons';
                checkbox.value = addon.toLowerCase().replace(/ /g, '-');

                const label = document.createElement('label');
                label.htmlFor = `addon-${addon.toLowerCase().replace(/ /g, '-')}`;
                label.textContent = addon;

                const div = document.createElement('div');
                div.appendChild(checkbox);
                div.appendChild(label);
                addonsContainer.appendChild(div);
            });
            addonsGroup.style.display = 'block';

            // Handle the "None" checkbox logic for Exterior
            const noneCheckboxExterior = document.getElementById('addon-none');
            const otherCheckboxesExterior = Array.from(addonsContainer.querySelectorAll('input[type="checkbox"]:not(#addon-none)'));

            if (noneCheckboxExterior) {
                noneCheckboxExterior.addEventListener('change', () => {
                    if (noneCheckboxExterior.checked) {
                        otherCheckboxesExterior.forEach(cb => cb.checked = false);
                    }
                });
            }

            otherCheckboxesExterior.forEach(cb => {
                cb.addEventListener('change', () => {
                    if (noneCheckboxExterior && noneCheckboxExterior.checked) {
                        noneCheckboxExterior.checked = false;
                    }
                });
            });

        } else if (selectedService === 'complete') {
            const completePackages = ['Complete Premium', 'Complete Gold'];
            completePackages.forEach(packageOption => {
                const option = document.createElement('option');
                option.value = packageOption.toLowerCase().replace(/ /g, '-');
                option.textContent = packageOption;
                packagesSelect.appendChild(option);
            });
            packagesGroup.style.display = 'block';

            const completeAddons = ['Headliner Shampoo', 'Pet Hair Removal', 'Headlight Restoration', 'None'];
            completeAddons.forEach(addon => {
                const checkbox = document.createElement('input');
                checkbox.type = 'checkbox';
                checkbox.id = `addon-${addon.toLowerCase().replace(/ /g, '-')}`;
                checkbox.name = 'addons';
                checkbox.value = addon.toLowerCase().replace(/ /g, '-');

                const label = document.createElement('label');
                label.htmlFor = `addon-${addon.toLowerCase().replace(/ /g, '-')}`;
                label.textContent = addon;

                const div = document.createElement('div');
                div.appendChild(checkbox);
                div.appendChild(label);
                addonsContainer.appendChild(div);
            });
            addonsGroup.style.display = 'block';

            // Handle the "None" checkbox logic for Complete
            const noneCheckboxComplete = document.getElementById('addon-none');
            const otherCheckboxesComplete = Array.from(addonsContainer.querySelectorAll('input[type="checkbox"]:not(#addon-none)'));

            if (noneCheckboxComplete) {
                noneCheckboxComplete.addEventListener('change', () => {
                    if (noneCheckboxComplete.checked) {
                        otherCheckboxesComplete.forEach(cb => cb.checked = false);
                    }
                });
            }

            otherCheckboxesComplete.forEach(cb => {
                cb.addEventListener('change', () => {
                    if (noneCheckboxComplete && noneCheckboxComplete.checked) {
                        noneCheckboxComplete.checked = false;
                    }
                });
            });
        }
    });
}

// ===== Form Submission to Google Apps Script =====
const bookingForm = document.getElementById('booking-form');
const confirmationMessageDiv = document.getElementById('confirmation-message');

if (bookingForm && confirmationMessageDiv) {
    bookingForm.addEventListener('submit', function(event) {
        event.preventDefault(); // Prevent the default form submission

        const formData = new FormData(bookingForm);
        const formDataJSON = {};
        formData.forEach((value, key) => {
            if (formDataJSON[key]) {
                if (!Array.isArray(formDataJSON[key])) {
                    formDataJSON[key] = [formDataJSON[key]];
                }
                formDataJSON[key].push(value);
            } else {
                formDataJSON[key] = value;
            }
        });

        // Get the Web App URL you deployed
        const webAppUrl = 'https://script.google.com/macros/s/AKfycbxpVHjOCsRsTWYKH87i9bS93led-68PtAGXy79hB44G1PM40lUq__3LqFyOIpnueZO-CA/exec'; // Replace with your actual Web App URL

        fetch(webAppUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formDataJSON)
        })
        .then(response => response.json())
        .then(data => {
            if (data.result === 'success') {
                confirmationMessageDiv.textContent = data.message;
                confirmationMessageDiv.style.display = 'block';
                bookingForm.reset();
            } else {
                confirmationMessageDiv.textContent = 'Failed to submit booking. Please try again.';
                confirmationMessageDiv.style.display = 'block';
            }
        })
        .catch(error => {
            console.error('Error submitting form:', error);
            confirmationMessageDiv.textContent = 'An error occurred. Please try again later.';
            confirmationMessageDiv.style.display = 'block';
        });
    });
}