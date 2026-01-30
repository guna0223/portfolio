// Professional Portfolio JavaScript
document.addEventListener('DOMContentLoaded', function () {
    // DOM Elements
    const header = document.querySelector('header');
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');
    const heroSubtitle = document.getElementById('rotating-profession');

    // ============================================
    // TYPEWRITER EFFECT
    // ============================================
    const professions = [
        'Web Developer',
        'Frontend Developer',
        'React Developer',
        'UI/UX Designer'
    ];

    let professionIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typingSpeed = 100;

    function typeWriter() {
        if (!heroSubtitle) return;

        const currentProfession = professions[professionIndex];

        if (isDeleting) {
            heroSubtitle.textContent = currentProfession.substring(0, charIndex - 1) + '|';
            charIndex--;
            typingSpeed = 50;
        } else {
            heroSubtitle.textContent = currentProfession.substring(0, charIndex + 1) + '|';
            charIndex++;
            typingSpeed = 100;
        }

        if (!isDeleting && charIndex === currentProfession.length) {
            typingSpeed = 2000;
            isDeleting = true;
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            professionIndex = (professionIndex + 1) % professions.length;
            typingSpeed = 500;
        }

        setTimeout(typeWriter, typingSpeed);
    }

    // ============================================
    // MOBILE MENU TOGGLE
    // ============================================
    function toggleMobileMenu() {
        hamburger?.classList.toggle('active');
        navMenu?.classList.toggle('active');
        document.body.style.overflow = navMenu?.classList.contains('active') ? 'hidden' : '';
    }

    // ============================================
    // SMOOTH SCROLL NAVIGATION
    // ============================================
    function smoothScroll(event) {
        event.preventDefault();
        const targetId = this.getAttribute('href');
        
        if (targetId && targetId.startsWith('#')) {
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                const headerHeight = header?.offsetHeight || 70;
                const offsetTop = targetElement.offsetTop - headerHeight;
                
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });

                if (navMenu?.classList.contains('active')) {
                    toggleMobileMenu();
                }
            }
        }
    }

    // ============================================
    // UPDATE ACTIVE NAV LINK
    // ============================================
    function updateActiveNavLink(activeId) {
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === activeId) {
                link.classList.add('active');
            }
        });
    }

    // ============================================
    // SCROLL-BASED ACTIVE NAVIGATION
    // ============================================
    function updateActiveNavFromScroll() {
        const sections = document.querySelectorAll('section[id]');
        const scrollPosition = window.scrollY + 100;

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                const id = '#' + section.getAttribute('id');
                updateActiveNavLink(id);
            }
        });
    }

    // ============================================
    // SCROLL ANIMATIONS (Intersection Observer)
    // ============================================
    function initScrollAnimations() {
        const animatedElements = document.querySelectorAll('.animate-on-scroll');
        
        const animationObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animated');
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        });

        animatedElements.forEach(el => animationObserver.observe(el));
    }

    // ============================================
    // SKILL BARS ANIMATION
    // ============================================
    function initSkillBars() {
        const skillFills = document.querySelectorAll('.skill-fill');
        
        const skillObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const width = entry.target.style.width;
                    entry.target.style.width = '0%';
                    setTimeout(() => {
                        entry.target.style.width = width;
                    }, 100);
                    skillObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });

        skillFills.forEach(fill => skillObserver.observe(fill));
    }

    // ============================================
    // BUTTON CLICK HANDLER
    // ============================================
    function handleButtonClick(event) {
        const button = event.currentTarget;
        
        // Handle Download CV button
        if (button.textContent.includes('Download CV')) {
            const link = document.createElement('a');
            link.href = '/assets/resume/resume.pdf';
            link.download = 'Gunasekar_Resume.pdf';
            link.click();
        }
        
        // Handle Hire Me button - scroll to contact
        if (button.textContent.includes('Hire') || button.classList.contains('cta-btn')) {
            const contactSection = document.querySelector('#contact');
            if (contactSection) {
                const headerHeight = header?.offsetHeight || 70;
                window.scrollTo({
                    top: contactSection.offsetTop - headerHeight,
                    behavior: 'smooth'
                });
            }
        }
    }

    // ============================================
    // CONTACT FORM HANDLING
    // ============================================
    function initContactForm() {
        const form = document.getElementById('contactForm');
        if (!form) return;

        const formGroups = form.querySelectorAll('.form-group');

        // Floating label effect
        formGroups.forEach(group => {
            const input = group.querySelector('input, textarea');
            if (!input) return;

            input.addEventListener('focus', () => {
                group.classList.add('focused');
            });

            input.addEventListener('blur', () => {
                if (!input.value) {
                    group.classList.remove('focused');
                }
            });
        });

        // Form submission
        form.addEventListener('submit', function (e) {
            e.preventDefault();

            const formData = new FormData(this);
            const data = Object.fromEntries(formData);

            // Simple validation
            if (!data.name || !data.email || !data.message) {
                alert('Please fill in all required fields.');
                return;
            }

            // Show success message
            alert('Thank you for your message! I will get back to you soon.');
            this.reset();
        });
    }

    // ============================================
    // HEADER SCROLL EFFECT
    // ============================================
    function handleScroll() {
        if (window.scrollY > 50) {
            header?.classList.add('scrolled');
        } else {
            header?.classList.remove('scrolled');
        }
        updateActiveNavFromScroll();
    }

    // ============================================
    // CLOSE MENU ON OUTSIDE CLICK
    // ============================================
    document.addEventListener('click', (event) => {
        if (navMenu?.classList.contains('active') &&
            !navMenu.contains(event.target) &&
            !hamburger?.contains(event.target)) {
            toggleMobileMenu();
        }
    });

    // ============================================
    // ESCAPE KEY TO CLOSE MENU
    // ============================================
    document.addEventListener('keydown', (event) => {
        if (event.key === 'Escape' && navMenu?.classList.contains('active')) {
            toggleMobileMenu();
        }
    });

    // ============================================
    // EVENT LISTENERS
    // ============================================
    hamburger?.addEventListener('click', toggleMobileMenu);
    
    navLinks.forEach(link => {
        link.addEventListener('click', smoothScroll);
    });

    // Button clicks
    document.querySelectorAll('.hire-btn, .cta-btn, .about-btn').forEach(btn => {
        btn.addEventListener('click', handleButtonClick);
    });

    // Scroll events
    window.addEventListener('scroll', handleScroll, { passive: true });

    // ============================================
    // INITIALIZE
    // ============================================
    function init() {
        // Start typewriter effect
        if (heroSubtitle) {
            typeWriter();
        }

        // Initialize animations
        initScrollAnimations();
        initSkillBars();
        initContactForm();

        // Initial scroll check
        handleScroll();

        console.log('Portfolio initialized successfully!');
    }

    init();
});
