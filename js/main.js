// DOM Elements
const ageVerificationPopup = document.getElementById('ageVerificationPopup');
const confirmAgeBtn = document.getElementById('confirmAge');
const rejectAgeBtn = document.getElementById('rejectAge');
const mobileContent = document.getElementById('mobileLanding');
const desktopContent = document.getElementById('desktopContent');

// Check if age verification was already done
const isAgeVerified = () => {
    return localStorage.getItem('ageVerified') === 'true';
};

// Age Verification Handlers
const handleAgeConfirmation = () => {
    localStorage.setItem('ageVerified', 'true');
    ageVerificationPopup.style.display = 'none';
    showAppropriateContent();
};

const handleAgeRejection = () => {
    window.location.href = 'https://www.google.com'; // Redirect to safe page
};

// Device Detection
const isMobile = () => {
    return window.innerWidth <= 992;
};

// Content Display Handler
const showAppropriateContent = () => {
    if (isMobile()) {
        if (mobileContent) {
            mobileContent.style.display = 'block';
        }
        if (desktopContent) {
            desktopContent.style.display = 'none';
        }
    } else {
        if (mobileContent) {
            mobileContent.style.display = 'none';
        }
        if (desktopContent) {
            desktopContent.style.display = 'block';
        }
    }
};

// Stats Tabs Functionality
const initializeStatsTabs = () => {
    const tabButtons = document.querySelectorAll('.tab-button');
    const statsContents = document.querySelectorAll('.stats-content');

    tabButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Remove active class from all buttons and contents
            tabButtons.forEach(btn => btn.classList.remove('active'));
            statsContents.forEach(content => {
                content.style.display = 'none';
                content.classList.remove('active');
            });

            // Add active class to clicked button and corresponding content
            button.classList.add('active');
            const tabId = button.getAttribute('data-tab');
            const content = document.getElementById(tabId);
            if (content) {
                content.style.display = 'grid';
                content.classList.add('active');
            }
        });
    });
};

// Mobile Menu Functionality
const initializeMobileMenu = () => {
    const menuBtn = document.querySelector('.mobile-menu-btn');
    const navMenu = document.querySelector('nav ul');

    if (menuBtn && navMenu) {
        menuBtn.addEventListener('click', () => {
            menuBtn.classList.toggle('active');
            navMenu.style.display = navMenu.style.display === 'flex' ? 'none' : 'flex';
            
            // Add slide animation
            if (navMenu.style.display === 'flex') {
                navMenu.style.animation = 'slideDown 0.3s ease forwards';
            } else {
                navMenu.style.animation = 'slideUp 0.3s ease forwards';
            }
        });

        // Close menu when clicking outside
        document.addEventListener('click', (e) => {
            if (!menuBtn.contains(e.target) && !navMenu.contains(e.target) && navMenu.style.display === 'flex') {
                menuBtn.classList.remove('active');
                navMenu.style.display = 'none';
            }
        });
    }
};

// Tournament Carousel Functionality
const initializeCarousel = () => {
    const carousel = document.querySelector('.tournament-cards');
    const prevBtn = document.querySelector('.carousel-control.prev');
    const nextBtn = document.querySelector('.carousel-control.next');

    if (carousel && prevBtn && nextBtn) {
        let scrollAmount = 0;
        const cardWidth = carousel.querySelector('.tournament-card').offsetWidth + 20; // Width + gap

        prevBtn.addEventListener('click', () => {
            scrollAmount = Math.max(scrollAmount - cardWidth, 0);
            carousel.scrollTo({
                left: scrollAmount,
                behavior: 'smooth'
            });
        });

        nextBtn.addEventListener('click', () => {
            scrollAmount = Math.min(scrollAmount + cardWidth, carousel.scrollWidth - carousel.clientWidth);
            carousel.scrollTo({
                left: scrollAmount,
                behavior: 'smooth'
            });
        });
    }
};

// Initialize on page load
document.addEventListener('DOMContentLoaded', () => {
    // Event Listeners
    if (confirmAgeBtn) {
        confirmAgeBtn.addEventListener('click', handleAgeConfirmation);
    }
    if (rejectAgeBtn) {
        rejectAgeBtn.addEventListener('click', handleAgeRejection);
    }

    // Check age verification
    if (!isAgeVerified()) {
        if (ageVerificationPopup) {
            ageVerificationPopup.style.display = 'flex';
        }
    } else {
        showAppropriateContent();
    }

    // Initialize components
    showAppropriateContent();
    initializeStatsTabs();
    initializeMobileMenu();
    initializeCarousel();

    // Handle resize events
    window.addEventListener('resize', showAppropriateContent);
});

// Handle back button and page refresh
window.addEventListener('popstate', () => {
    if (!isAgeVerified()) {
        if (ageVerificationPopup) {
            ageVerificationPopup.style.display = 'flex';
        }
    }
});

// Prevent form resubmission on page refresh
if (window.history.replaceState) {
    window.history.replaceState(null, null, window.location.href);
} 