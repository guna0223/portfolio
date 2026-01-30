// Enhanced Professional Portfolio JavaScript
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
        
        // Add/remove body class for mobile menu open state
        if (navMenu?.classList.contains('active')) {
            document.body.classList.add('menu-open');
        } else {
            document.body.classList.remove('menu-open');
        }
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
                    
                    // Add stagger delay for child elements
                    const siblings = entry.target.parentElement?.querySelectorAll('.animate-on-scroll');
                    if (siblings && siblings.length > 1) {
                        const index = Array.from(siblings).indexOf(entry.target);
                        entry.target.style.transitionDelay = `${index * 0.1}s`;
                    }
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
    // CARD HOVER EFFECTS
    // ============================================
    function initCardEffects() {
        const cards = document.querySelectorAll('.project-card, .service-card, .skill-category');
        
        cards.forEach(card => {
            card.addEventListener('mouseenter', function() {
                this.style.transform = 'translateY(-10px)';
            });
            
            card.addEventListener('mouseleave', function() {
                this.style.transform = 'translateY(0)';
            });
            
            // Touch support for mobile
            card.addEventListener('touchstart', function() {
                this.style.transform = 'translateY(-10px)';
            });
            
            card.addEventListener('touchend', function() {
                this.style.transform = 'translateY(0)';
            });
        });
    }

    // ============================================
    // BUTTON RIPPLE EFFECT
    // ============================================
    function initRippleEffect() {
        const buttons = document.querySelectorAll('.hire-btn, .cta-btn, .about-btn, .contact-form button[type=\"submit\"]');
        
        buttons.forEach(button => {
            button.addEventListener('click', function(e) {
                const ripple = document.createElement('span');
                const rect = this.getBoundingClientRect();
                const size = Math.max(rect.width, rect.height);
                const x = e.clientX - rect.left - size / 2;
                const y = e.clientY - rect.top - size / 2;
                
                ripple.style.cssText = `
                    position: absolute;
                    width: ${size}px;
                    height: ${size}px;
                    left: ${x}px;
                    top: ${y}px;
                    background: rgba(255, 255, 255, 0.3);
                    border-radius: 50%;
                    transform: scale(0);
                    animation: ripple 0.6s linear;
                    pointer-events: none;
                `;
                
                this.style.position = 'relative';
                this.style.overflow = 'hidden';
                this.appendChild(ripple);
                
                setTimeout(() => ripple.remove(), 600);
            });
        });

        // Add ripple animation
        const style = document.createElement('style');
        style.textContent = `
            @keyframes ripple {
                to {
                    transform: scale(4);
                    opacity: 0;
                }
            }
        `;
        document.head.appendChild(style);
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
            
            // Show styled notification
            showNotification('Resume downloaded successfully! ✓');
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
    // NOTIFICATION SYSTEM
    // ============================================
    function showNotification(message) {
        // Remove existing notification
        const existing = document.querySelector('.notification-toast');
        if (existing) existing.remove();
        
        const notification = document.createElement('div');
        notification.className = 'notification-toast';
        notification.innerHTML = `
            <div class="notification-icon">
                <i class="fas fa-check-circle"></i>
            </div>
            <div class="notification-content">
                <span class="notification-message">${message}</span>
            </div>
            <button class="notification-close"><i class="fas fa-times"></i></button>
        `;
        
        // Add notification styles
        notification.style.cssText = `
            position: fixed;
            top: 100px;
            right: 20px;
            background: white;
            border-radius: 12px;
            padding: 16px 20px;
            display: flex;
            align-items: center;
            gap: 12px;
            box-shadow: 0 10px 40px rgba(0, 0, 0, 0.15);
            z-index: 10000;
            transform: translateX(120%);
            transition: transform 0.4s cubic-bezier(0.68, -0.55, 0.265, 1.55);
            max-width: 350px;
        `;
        
        const icon = notification.querySelector('.notification-icon');
        icon.style.cssText = `
            width: 40px;
            height: 40px;
            background: linear-gradient(135deg, #10b981, #059669);
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            color: white;
            font-size: 1.2rem;
            flex-shrink: 0;
        `;
        
        const content = notification.querySelector('.notification-content');
        content.style.cssText = `
            flex: 1;
        `;
        
        const messageEl = notification.querySelector('.notification-message');
        messageEl.style.cssText = `
            color: #1a1a2e;
            font-weight: 500;
            font-size: 0.95rem;
        `;
        
        const closeBtn = notification.querySelector('.notification-close');
        closeBtn.style.cssText = `
            background: none;
            border: none;
            color: #999;
            cursor: pointer;
            padding: 5px;
            font-size: 1rem;
            transition: color 0.2s;
        `;
        
        closeBtn.addEventListener('click', () => {
            notification.style.transform = 'translateX(120%)';
            setTimeout(() => notification.remove(), 400);
        });
        
        document.body.appendChild(notification);
        
        // Animate in
        setTimeout(() => {
            notification.style.transform = 'translateX(0)';
        }, 100);
        
        // Auto remove after 3 seconds
        setTimeout(() => {
            if (notification.parentElement) {
                notification.style.transform = 'translateX(120%)';
                setTimeout(() => notification.remove(), 400);
            }
        }, 3000);
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

            // Real-time validation
            input.addEventListener('input', () => {
                if (input.checkValidity()) {
                    group.style.borderColor = '#10b981';
                } else {
                    group.style.borderColor = '#ef4444';
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

            // Show success message with animation
            const button = this.querySelector('button[type=\"submit\"]');
            const originalText = button.textContent;
            button.textContent = 'Message Sent! ✓';
            button.style.background = '#10b981';
            
            setTimeout(() => {
                button.textContent = originalText;
                button.style.background = '';
            }, 3000);
            
            this.reset();
            
            // Remove validation styles
            formGroups.forEach(group => {
                group.style.borderColor = '';
            });
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
    // PARALLAX EFFECT FOR HERO
    // ============================================
    function initParallax() {
        const homeSection = document.querySelector('.home');
        const homeImage = document.querySelector('.home-image');
        
        if (!homeSection || !homeImage) return;
        
        window.addEventListener('scroll', () => {
            const scrolled = window.scrollY;
            if (scrolled < window.innerHeight) {
                homeImage.style.transform = `translateY(${scrolled * 0.1}px)`;
            }
        }, { passive: true });
    }

    // ============================================
    // SOCIAL ICONS PULSE EFFECT
    // ============================================
    function initSocialPulse() {
        const socialIcons = document.querySelectorAll('.social-icon');
        
        socialIcons.forEach((icon, index) => {
            icon.style.animationDelay = `${index * 0.2}s`;
            
            icon.addEventListener('mouseenter', function() {
                this.style.transform = 'translateY(-5px) scale(1.1)';
            });
            
            icon.addEventListener('mouseleave', function() {
                this.style.transform = 'translateY(0) scale(1)';
            });
        });
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
    // KEYBOARD NAVIGATION
    // ============================================
    function initKeyboardNav() {
        navLinks.forEach(link => {
            link.addEventListener('keydown', (e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    link.click();
                }
            });
        });
    }

    // ============================================
    // PROJECT CARD OVERLAY TOGGLE (Mobile)
    // ============================================
    function initProjectOverlay() {
        const projectCards = document.querySelectorAll('.project-card');
        
        projectCards.forEach(card => {
            card.addEventListener('click', function(e) {
                // Only on mobile
                if (window.innerWidth <= 768) {
                    const overlay = this.querySelector('.project-overlay');
                    if (overlay) {
                        overlay.style.opacity = overlay.style.opacity === '1' ? '0' : '1';
                    }
                }
            });
        });
    }

    // ============================================
    // SMOOTH SCROLL TO TOP BUTTON
    // ============================================
    function initScrollToTop() {
        const scrollBtn = document.createElement('button');
        scrollBtn.className = 'scroll-to-top';
        scrollBtn.innerHTML = '<i class=\"fas fa-arrow-up\"></i>';
        scrollBtn.style.cssText = `
            position: fixed;
            bottom: 30px;
            right: 30px;
            width: 50px;
            height: 50px;
            background: var(--highlight);
            color: white;
            border: none;
            border-radius: 50%;
            font-size: 1.2rem;
            cursor: pointer;
            opacity: 0;
            visibility: hidden;
            transition: all 0.3s ease;
            z-index: 1000;
            box-shadow: 0 4px 15px rgba(233, 69, 96, 0.3);
        `;
        
        document.body.appendChild(scrollBtn);
        
        scrollBtn.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
        
        window.addEventListener('scroll', () => {
            if (window.scrollY > 300) {
                scrollBtn.style.opacity = '1';
                scrollBtn.style.visibility = 'visible';
            } else {
                scrollBtn.style.opacity = '0';
                scrollBtn.style.visibility = 'hidden';
            }
        }, { passive: true });
    }

    // ============================================
    // PRELOADER
    // ============================================
    function initPreloader() {
        const preloader = document.createElement('div');
        preloader.className = 'preloader';
        preloader.innerHTML = `
            <div class=\"preloader-content\">
                <div class=\"preloader-spinner\"></div>
                <div class=\"preloader-text\">Loading...</div>
            </div>
        `;
        preloader.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: #1a1a2e;
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 99999;
            transition: opacity 0.5s ease, visibility 0.5s ease;
        `;
        
        const spinner = preloader.querySelector('.preloader-spinner');
        spinner.style.cssText = `
            width: 50px;
            height: 50px;
            border: 3px solid rgba(255, 255, 255, 0.1);
            border-top: 3px solid #e94560;
            border-radius: 50%;
            animation: spin 1s linear infinite;
        `;
        
        const text = preloader.querySelector('.preloader-text');
        text.style.cssText = `
            color: white;
            margin-top: 20px;
            font-family: 'Inter', sans-serif;
            font-size: 1rem;
        `;
        
        // Add spin animation
        const style = document.createElement('style');
        style.textContent = '@keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }';
        document.head.appendChild(style);
        
        document.body.appendChild(preloader);
        
        window.addEventListener('load', () => {
            setTimeout(() => {
                preloader.style.opacity = '0';
                preloader.style.visibility = 'hidden';
                setTimeout(() => preloader.remove(), 500);
            }, 500);
        });
    }

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
        // Initialize preloader
        initPreloader();
        
        // Start typewriter effect
        if (heroSubtitle) {
            typeWriter();
        }

        // Initialize animations and effects
        initScrollAnimations();
        initCardEffects();
        initRippleEffect();
        initContactForm();
        initParallax();
        initSocialPulse();
        initKeyboardNav();
        initProjectOverlay();
        initScrollToTop();

        // Initial scroll check
        handleScroll();

        console.log('Portfolio initialized successfully!');
    }

    init();
});
