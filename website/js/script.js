// ===== Mobile Menu Toggle =====
const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
const mobileMenu = document.querySelector('.mobile-menu');
const closeBtn = document.querySelector('.close-btn');

if (mobileMenuBtn) {
  mobileMenuBtn.addEventListener('click', () => {
    mobileMenu.classList.add('active');
    document.body.style.overflow = 'hidden';
  });
}

if (closeBtn) {
  closeBtn.addEventListener('click', () => {
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

// ===== Form Validation =====
const bookingForm = document.getElementById('booking-form');

if (bookingForm) {
  bookingForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const phone = document.getElementById('phone').value;
    const service = document.getElementById('service').value;
    const vehicle = document.getElementById('vehicle').value;
    const date = document.getElementById('date').value;
    const time = document.getElementById('time').value;

    if (!name || !email || !phone || !service || !vehicle || !date || !time) {
      alert('Please fill in all required fields.');
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      alert('Please enter a valid email address.');
      return;
    }

    alert('Thank you for your booking request! We will contact you shortly to confirm your appointment.');
    bookingForm.reset();
  });
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

// |||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||
// Detailing Popup Functionality (NEW CODE ADDED HERE)
const detailingTrigger = document.querySelector('.mobile-detailing-trigger');
const detailingPopup = document.querySelector('.detailing-popup');
const closePopupBtn = document.querySelector('.close-popup');
const popupLinks = document.querySelectorAll('.popup-links a');

if (detailingTrigger && detailingPopup && closePopupBtn && popupLinks.length > 0) {
    detailingTrigger.addEventListener('click', () => {
        detailingPopup.style.display = 'flex';
        document.body.style.overflow = 'hidden'; // Prevent scrolling behind the popup
    });

    closePopupBtn.addEventListener('click', () => {
        detailingPopup.style.display = 'none';
        document.body.style.overflow = 'auto'; // Re-enable scrolling
    });

    popupLinks.forEach(link => {
        link.addEventListener('click', () => {
            detailingPopup.style.display = 'none';
            document.body.style.overflow = 'auto'; // Re-enable scrolling after choosing an option
        });
    });

    // Close popup if user clicks outside the popup content
    window.addEventListener('click', (event) => {
        if (event.target === detailingPopup) {
            detailingPopup.style.display = 'none';
            document.body.style.overflow = 'auto';
        }
    });
}