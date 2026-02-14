// ============================================
// Portfolio - Dr. Strange Mystic Theme JavaScript
// ============================================

document.addEventListener('DOMContentLoaded', function() {
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
        'Full-Stack Developer',
        'Web Developer',
        'React Developer',
        'Python Developer'
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

    // Start typewriter
    typeWriter();

    // ============================================
    // MOBILE MENU TOGGLE
    // ============================================
    function toggleMobileMenu() {
        hamburger?.classList.toggle('active');
        navMenu?.classList.toggle('active');
        document.body.style.overflow = navMenu?.classList.contains('active') ? 'hidden' : '';
        
        if (navMenu?.classList.contains('active')) {
            document.body.classList.add('menu-open');
        } else {
            document.body.classList.remove('menu-open');
        }
    }

    hamburger?.addEventListener('click', toggleMobileMenu);

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

    // Attach smooth scroll to all nav links
    document.querySelectorAll('a[href^="#"]').forEach(function(link) {
        link.addEventListener('click', smoothScroll);
    });

    // ============================================
    // UPDATE ACTIVE NAV LINK ON SCROLL
    // ============================================
    function updateActiveNavLink(activeId) {
        navLinks.forEach(function(link) {
            link.classList.remove('active');
            if (link.getAttribute('href') === activeId) {
                link.classList.add('active');
            }
        });
    }

    function updateActiveNavFromScroll() {
        const sections = document.querySelectorAll('section[id]');
        const scrollPosition = window.scrollY + 150;

        sections.forEach(function(section) {
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
        
        const animationObserver = new IntersectionObserver(function(entries) {
            entries.forEach(function(entry) {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        });

        animatedElements.forEach(function(el) {
            animationObserver.observe(el);
        });
    }

    // ============================================
    // CARD HOVER EFFECTS WITH GLOW
    // ============================================
    function initCardEffects() {
        const cards = document.querySelectorAll('.project-card, .service-card, .skill-category, .contact-item, .highlight');
        
        cards.forEach(function(card) {
            // Mouse enter - add glow effect
            card.addEventListener('mouseenter', function() {
                // Create glow effect element
                const glow = document.createElement('div');
                glow.className = 'card-glow';
                glow.style.cssText = 'position: absolute; top: 0; left: 0; right: 0; bottom: 0; border-radius: inherit; pointer-events: none; opacity: 0; transition: opacity 0.3s ease;';
                this.style.position = 'relative';
                this.appendChild(glow);
                
                // Trigger reflow
                void glow.offsetHeight;
                
                // Fade in glow
                glow.style.opacity = '1';
            });
            
            // Mouse leave - remove glow
            card.addEventListener('mouseleave', function() {
                const glow = this.querySelector('.card-glow');
                if (glow) {
                    glow.style.opacity = '0';
                    setTimeout(function() { glow.remove(); }, 300);
                }
            });
            
            // Touch support for mobile
            card.addEventListener('touchstart', function() {
                this.style.transform = 'translateY(-5px)';
            }, { passive: true });
            
            card.addEventListener('touchend', function() {
                this.style.transform = 'translateY(0)';
            }, { passive: true });
        });
    }

    // ============================================
    // BUTTON RIPPLE & HOVER EFFECTS
    // ============================================
    function initButtonEffects() {
        const buttons = document.querySelectorAll('.hire-btn, .cta-btn, .about-btn, .submit-btn, .project-link');
        
        buttons.forEach(function(button) {
            // Ripple effect on click
            button.addEventListener('click', function(e) {
                const ripple = document.createElement('span');
                const rect = this.getBoundingClientRect();
                const size = Math.max(rect.width, rect.height);
                const x = e.clientX - rect.left - size / 2;
                const y = e.clientY - rect.top - size / 2;
                
                ripple.style.cssText = 'position: absolute; width: ' + size + 'px; height: ' + size + 'px; left: ' + x + 'px; top: ' + y + 'px; background: rgba(255, 255, 255, 0.3); border-radius: 50%; transform: scale(0); animation: ripple 0.6s linear; pointer-events: none;';
                
                this.style.position = 'relative';
                this.style.overflow = 'hidden';
                this.appendChild(ripple);
                
                setTimeout(function() { ripple.remove(); }, 600);
            });
            
            // Magnetic effect on hover (desktop only)
            if (window.matchMedia('(min-width: 769px)').matches) {
                button.addEventListener('mousemove', function(e) {
                    const rect = this.getBoundingClientRect();
                    const x = e.clientX - rect.left - rect.width / 2;
                    const y = e.clientY - rect.top - rect.height / 2;
                    
                    this.style.transform = 'translate(' + (x * 0.1) + 'px, ' + (y * 0.1) + 'px)';
                });
                
                button.addEventListener('mouseleave', function() {
                    this.style.transform = 'translate(0, 0)';
                });
            }
        });

        // Add ripple animation keyframes
        const style = document.createElement('style');
        style.textContent = '@keyframes ripple { to { transform: scale(4); opacity: 0; } }';
        document.head.appendChild(style);
    }

    // ============================================
    // BUTTON CLICK HANDLER
    // ============================================
    function handleButtonClick(event) {
        const button = event.currentTarget;
        
        // Handle Download CV button
        if (button.textContent.includes('Download CV') || button.querySelector('.fa-download')) {
            const link = document.createElement('a');
            link.href = '/assets/resume/resume.pdf';
            link.download = 'Gunasekar_Resume.pdf';
            link.click();
            
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

    // Attach button handlers
    document.querySelectorAll('.hire-btn, .cta-btn, .about-btn').forEach(function(btn) {
        btn.addEventListener('click', handleButtonClick);
    });

    // ============================================
    // NOTIFICATION SYSTEM
    // ============================================
    function showNotification(message) {
        const existing = document.querySelector('.notification-toast');
        if (existing) existing.remove();
        
        const notification = document.createElement('div');
        notification.className = 'notification-toast';
        notification.innerHTML = '<div class="notification-icon"><i class="fas fa-check-circle"></i></div><div class="notification-content"><span class="notification-message">' + message + '</span></div><button class="notification-close"><i class="fas fa-times"></i></button>';
        
        document.body.appendChild(notification);
        
        // Animate in
        setTimeout(function() {
            notification.classList.add('show');
        }, 100);
        
        // Close button handler
        notification.querySelector('.notification-close').addEventListener('click', function() {
            notification.classList.remove('show');
            setTimeout(function() { notification.remove(); }, 400);
        });
        
        // Auto remove after 3 seconds
        setTimeout(function() {
            if (notification.parentElement) {
                notification.classList.remove('show');
                setTimeout(function() { notification.remove(); }, 400);
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

        // Floating label effect & validation
        formGroups.forEach(function(group) {
            const input = group.querySelector('input, textarea');
            if (!input) return;

            input.addEventListener('focus', function() {
                group.classList.add('focused');
            });

            input.addEventListener('blur', function() {
                if (!input.value) {
                    group.classList.remove('focused');
                }
            });

            // Real-time validation
            input.addEventListener('input', function() {
                if (input.checkValidity()) {
                    input.style.borderColor = '#22C55E';
                } else {
                    input.style.borderColor = '#DC2626';
                }
            });
        });

        // Form submission
        form.addEventListener('submit', function(e) {
            e.preventDefault();

            const formData = new FormData(this);
            const data = Object.fromEntries(formData);

            // Simple validation
            if (!data.name || !data.email || !data.message) {
                showNotification('Please fill in all required fields!');
                return;
            }

            // Show success message
            const button = this.querySelector('button[type="submit"]');
            const originalHTML = button.innerHTML;
            button.innerHTML = '<span>Message Sent!</span> <i class="fas fa-check"></i>';
            button.style.background = '#22C55E';
            
            setTimeout(function() {
                button.innerHTML = originalHTML;
                button.style.background = '';
            }, 3000);
            
            this.reset();
            
            // Remove validation styles
            formGroups.forEach(function(group) {
                const input = group.querySelector('input, textarea');
                if (input) input.style.borderColor = '';
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

    window.addEventListener('scroll', handleScroll, { passive: true });

    // ============================================
    // PARALLAX EFFECT FOR HERO (Subtle)
    // ============================================
    function initParallax() {
        const homeSection = document.querySelector('.home');
        const homeImage = document.querySelector('.home-image');
        
        if (!homeSection || !homeImage) return;
        
        window.addEventListener('scroll', function() {
            const scrolled = window.scrollY;
            if (scrolled < window.innerHeight) {
                homeImage.style.transform = 'translateY(' + (scrolled * 0.05) + 'px)';
            }
        }, { passive: true });
    }

    // ============================================
    // SOCIAL ICONS HOVER EFFECT
    // ============================================
    function initSocialEffects() {
        const socialIcons = document.querySelectorAll('.social-icon');
        
        socialIcons.forEach(function(icon, index) {
            icon.style.opacity = '0';
            icon.style.transform = 'translateY(20px)';
            
            setTimeout(function() {
                icon.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
                icon.style.opacity = '1';
                icon.style.transform = 'translateY(0)';
            }, 500 + (index * 150));
            
            icon.addEventListener('mouseenter', function() {
                this.style.transform = 'translateY(-8px) scale(1.1)';
            });
            
            icon.addEventListener('mouseleave', function() {
                this.style.transform = 'translateY(0) scale(1)';
            });
        });
    }

    // ============================================
    // CLOSE MENU ON OUTSIDE CLICK
    // ============================================
    document.addEventListener('click', function(event) {
        if (navMenu?.classList.contains('active') &&
            !navMenu.contains(event.target) &&
            !hamburger?.contains(event.target)) {
            toggleMobileMenu();
        }
    });

    // ============================================
    // ESCAPE KEY TO CLOSE MENU
    // ============================================
    document.addEventListener('keydown', function(event) {
        if (event.key === 'Escape' && navMenu?.classList.contains('active')) {
            toggleMobileMenu();
        }
    });


    // ============================================
    // SECTION REVEAL ANIMATIONS
    // ============================================
    function initSectionReveal() {
        const sections = document.querySelectorAll('.section');
        
        const sectionObserver = new IntersectionObserver(function(entries) {
            entries.forEach(function(entry) {
                if (entry.isIntersecting) {
                    entry.target.classList.add('section-visible');
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '0px 0px -100px 0px'
        });

        sections.forEach(function(section) {
            section.style.opacity = '0';
            section.style.transform = 'translateY(30px)';
            section.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
            sectionObserver.observe(section);
        });

        // Add class when visible
        const style = document.createElement('style');
        style.textContent = '.section-visible { opacity: 1 !important; transform: translateY(0) !important; }';
        document.head.appendChild(style);
    }

    // ============================================
    // IMAGE HOVER ZOOM
    // ============================================
    function initImageEffects() {
        const images = document.querySelectorAll('.project-image img, .profile-image, .about-img');
        
        images.forEach(function(img) {
            img.style.willChange = 'transform';
        });
    }

    // ============================================
    // SMOOTH SCROLL FOR INTERNAL LINKS
    // ============================================
    function initSmoothScroll() {
        document.querySelectorAll('a[href^="#"]').forEach(function(anchor) {
            anchor.addEventListener('click', function(e) {
                const href = this.getAttribute('href');
                if (href !== '#') {
                    e.preventDefault();
                    const target = document.querySelector(href);
                    if (target) {
                        const headerOffset = 80;
                        const elementPosition = target.getBoundingClientRect().top;
                        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                        window.scrollTo({
                            top: offsetPosition,
                            behavior: 'smooth'
                        });
                    }
                }
            });
        });
    }

    // ============================================
    // NAVIGATION LINK HIGHLIGHT
    // ============================================
    function initNavHighlight() {
        const sections = document.querySelectorAll('section');
        
        window.addEventListener('scroll', function() {
            let current = '';
            
            sections.forEach(function(section) {
                const sectionTop = section.offsetTop;
                const sectionHeight = section.clientHeight;
                
                if (window.pageYOffset >= (sectionTop - 200)) {
                    current = section.getAttribute('id');
                }
            });
            
            navLinks.forEach(function(link) {
                link.classList.remove('active');
                if (link.getAttribute('href') === '#' + current) {
                    link.classList.add('active');
                }
            });
        }, { passive: true });
    }

    // ============================================
    // INITIALIZE ALL FUNCTIONS
    // ============================================
    initScrollAnimations();
    initCardEffects();
    initButtonEffects();
    initContactForm();
    initParallax();
    initSocialEffects();
    initCursorGlow();
    initSectionReveal();
    initImageEffects();
    initSmoothScroll();
    initNavHighlight();
    handleScroll(); // Initial call

    console.log('✨ Portfolio - Dr. Strange Mystic Theme Initialized ✨');
});
