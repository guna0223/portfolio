
const navToggle = document.getElementById("nav_toggle");
const listMenu = document.getElementById("list_menu");

navToggle.addEventListener("click", () => {
    listMenu.classList.toggle("show");

    // change icon (hamburger ↔ close)
    const icon = navToggle.querySelector("i");
    icon.classList.toggle("bi-list");
    icon.classList.toggle("bi-x");
});

// optional: close menu when user clicks a link
document.querySelectorAll(".item-link").forEach((link) => {
    link.addEventListener("click", () => {
        listMenu.classList.remove("show");
        const icon = navToggle.querySelector("i");
        icon.classList.add("bi-list");
        icon.classList.remove("bi-x");
    });
});

/*===== REMOVE MENU MOBILE =====*/
const navLink = document.querySelectorAll('.nav__link')

function linkAction() {
    const navMenu = document.getElementById('nav-menu')
    navMenu.classList.remove('show')
}
navLink.forEach(n => n.addEventListener('click', linkAction))

/*===== SCROLL SECTIONS ACTIVE LINK =====*/
const sections = document.querySelectorAll('section[id]')

window.addEventListener('scroll', scrollActive)

function scrollActive() {
    const scrollY = window.pageYOffset

    sections.forEach(current => {
        const sectionHeight = current.offsetHeight
        const sectionTop = current.offsetTop - 50;
        sectionId = current.getAttribute('id')

        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
            document.querySelector('.nav__menu a[href*=' + sectionId + ']').classList.add('active')
        } else {
            document.querySelector('.nav__menu a[href*=' + sectionId + ']').classList.remove('active')
        }
    })
}

/*===== SCROLL REVEAL ANIMATION =====*/
const sr = ScrollReveal({
    origin: 'top',
    distance: '80px',
    duration: 2000,
    reset: true
})

/*SCROLL HOME*/
sr.reveal('.home-title', {})
sr.reveal('.home-subtitle', { delay: 500 })
sr.reveal('.home-scroll', { delay: 200 })
sr.reveal('.home-img', { origin: 'top', delay: 400 })

/*SCROLL ABOUT*/
sr.reveal('.about-img', { delay: 500 })
sr.reveal('.about-subtitle', { delay: 300 })
sr.reveal('.about-profession', { delay: 400 })
sr.reveal('.about-text', { delay: 500 })
sr.reveal('.about-social', { delay: 600, interval: 200 })

/*SCROLL SKILLS*/
sr.reveal('.skills-subtitle', {})
sr.reveal('.skill-name', { distance: '20px', delay: 50, interval: 100 })
sr.reveal('.skill', { origin: "top", delay: 400 })


/*SCROLL PORTFOLIO*/
sr.reveal('.project-img', { interval: 200 })
sr.reveal('.project-img-down', { origin: "down", interval: 200 })

/*SCROLL CONTACT*/
sr.reveal('.contact-subtitle', {})
sr.reveal('.contact-text', { interval: 200 })
sr.reveal('.contact-input', { delay: 400 })
sr.reveal('.contact-button', { delay: 600 })