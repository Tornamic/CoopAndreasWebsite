// Loading Screen
window.addEventListener('load', () => {
    const loader = document.getElementById('loader');
    setTimeout(() => {
        loader.classList.add('hidden');
        setTimeout(() => {
            loader.style.display = 'none';
        }, 500);
    }, 1500);
});

// Mobile Navigation Toggle
const mobileToggle = document.getElementById('mobile-toggle');
const navLinks = document.querySelector('.nav-links');
const navbar = document.getElementById('navbar');
let lastScroll = 0;

// Update navbar blur based on scroll and menu state
function updateNavbarBlur() {
    const currentScroll = window.pageYOffset;
    const isMenuOpen = navLinks.classList.contains('active');
    const isMobile = window.innerWidth <= 950;

    // If mobile menu is open, always show blur
    if (isMobile && isMenuOpen) {
        navbar.style.background = 'rgba(0, 0, 0, 0.3)';
        navbar.style.backdropFilter = 'blur(5px)';
        navbar.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 1)';
        return;
    }

    // Normal scroll behavior
    if (currentScroll > 100) {
        navbar.style.background = 'rgba(0, 0, 0, 0.3)';
        navbar.style.backdropFilter = 'blur(5px)';
        navbar.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 1)';
    } else {
        navbar.style.background = 'transparent';
        navbar.style.backdropFilter = 'none';
        navbar.style.boxShadow = 'none';
    }

    lastScroll = currentScroll;
}

// Toggle mobile menu
if (mobileToggle) {
    mobileToggle.addEventListener('click', () => {
        const willBeActive = !mobileToggle.classList.contains('active');

        mobileToggle.classList.toggle('active');
        navLinks.classList.toggle('active');
        toggleBodyScroll(willBeActive);
        updateNavbarBlur();
    });
}

// Close mobile menu when clicking on a link
const navLinkItems = document.querySelectorAll('.nav-links a');
navLinkItems.forEach(link => {
    link.addEventListener('click', () => {
        if (window.innerWidth <= 950) {
            mobileToggle.classList.remove('active');
            navLinks.classList.remove('active');
            toggleBodyScroll(false);
            updateNavbarBlur();
        }
    });
});

// Smooth Scrolling
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));

        if (target) {
            const offsetTop = target.offsetTop - 80;
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// Navbar Background on Scroll
window.addEventListener('scroll', updateNavbarBlur);

// Intersection Observer for Feature Cards
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('aos-animate');
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe all feature cards
document.querySelectorAll('[data-aos]').forEach(el => {
    observer.observe(el);
});

// Prevent body scroll when mobile menu is open
function toggleBodyScroll(shouldLock) {
    document.body.style.overflow = shouldLock ? 'hidden' : '';
}

// Handle window resize
let resizeTimer;
window.addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
        if (window.innerWidth > 950) {
            navLinks.classList.remove('active');
            mobileToggle.classList.remove('active');
            toggleBodyScroll(false);
            updateNavbarBlur();
        }
    }, 250);
});

// Dynamic Copyright Year
window.addEventListener('load', () => {
    const startYear = 2025;
    const currentYear = new Date().getFullYear();
    const copyrightEl = document.getElementById('copyright');

    if (copyrightEl) {
        let yearString = startYear.toString();
        if (currentYear > startYear) {
            yearString = `${startYear} - ${currentYear}`;
        }
        copyrightEl.innerHTML = `&copy; ${yearString} CoopAndreas. Not affiliated with Rockstar Games. Grand Theft Auto and GTA are trademarks of Take-Two Interactive Software.`;
    }
});