'use strict';
removePreloader();

//code for the Swiper.js
const progressCircle = document.querySelector('.autoplay-progress svg');
const progressContent = document.querySelector('.autoplay-progress span');
const heroSection = new Swiper('.hero__section', {
    spaceBetween: 0,
    centeredSlides: true,
    autoplay: {
        delay: 2500,
        disableOnInteraction: false,
    },
    // If we need pagination
    pagination: {
        el: '.swiper-pagination',
        clickable: true,
    },
    on: {
        autoplayTimeLeft(s, time, progress) {
            progressCircle.style.setProperty('--progress', 1 - progress);
            progressContent.textContent = `${Math.ceil(time / 1000)}s`;
        },
    },
    navigation: true,
    grabCursor: true,
});

// Treats swiper
const treats = new Swiper('.swiper1', {
    slidesPerView: 'auto',
    spaceBetween: 20,
    navigation: true,
    grabCursor: true,

    navigation: {
        nextEl: '.treats-next__arrow',
        prevEl: '.treats-button-prev',
    },
});

// ! Script for the treats menu functionality
const treatsMenu = document.querySelector('.treats__menu'),
    treatsItems = document.querySelectorAll('.treats__item'),
    sectionContainers = document.querySelectorAll('.section__container'),
    underline = document.querySelector('.line');

treatsMenu.addEventListener('click', e => {
    const clicked = e.target.closest('.treats__item');

    // Guard Clause
    if (!clicked) return;

    // adding the underline functionalities
    underline.style.width = clicked.offsetWidth + 'px';
    underline.style.left = clicked.offsetLeft + 'px';

    // resetting all the classes
    treatsItems.forEach(item => item.classList.remove('treats__item--active'));

    sectionContainers.forEach(container =>
        container.classList.remove('section__container--active')
    );

    // adding the classes
    document
        .querySelector(`.section__container--${clicked.dataset.item}`)
        .classList.add('section__container--active');

    clicked.classList.add('treats__item--active');
});

// Swiper for Testimonials
const testimonials = new Swiper('.wrapper', {
    effect: 'coverflow',
    grabCursor: true,
    centeredSlides: true,
    slidesPerView: 'auto',
    coverflowEffect: {
        rotate: 50,
        stretch: 0,
        depth: 100,
        modifier: 1,
        slideShadows: true,
    },
    navigation: {
        nextEl: '.testimonial-next__arrow',
        prevEl: '.testimonial-prev__arrow',
    },
});

// ! Functionality to handle navigation

const menu = document.querySelector('.nav__lists'),
    navItems = document.querySelectorAll('.nav__item'),
    navLinks = document.querySelectorAll('.nav__link'),
    submenus = document.querySelectorAll('.submenu'),
    linkIcons = document.querySelectorAll('.nav__link i');

const resetLinks = () => {
    // doing general resetting
    navLinks.forEach(navLink => navLink.classList.remove('link--active'));
    submenus.forEach(submenu => submenu.classList.remove('submenu--active'));
    linkIcons.forEach(icon => icon.classList.remove('link--active'));
    linkIcons.forEach(icon => (icon.style.transform = 'rotate(0)'));
};

// ! This code runs each time a click is made on the links with nav__item class
menu.addEventListener('click', event => {
    const clicked = event.target.closest('.nav__item');

    // using the guard clause
    if (!clicked) return;

    // selecting the elements involved
    const clickedLink = clicked.querySelector(
        `.nav__link--${clicked.dataset.page}`
    );

    const showSubmenu = clicked.querySelector(
        `.submenu--${clicked.dataset.page}`
    );

    const rotateIcon = clicked.querySelector(`.icon--${clicked.dataset.page}`);

    // this selects the main link inside the e.target
    const isLinkActive = clickedLink.classList.contains('link--active');

    // It checks if the link is already open, then does a general reset
    if (isLinkActive) resetLinks();

    // If not open, add these classes
    if (!isLinkActive) {
        // adding the necessary classes if the link isn't already active
        resetLinks();
        clickedLink.classList.add('link--active');
        showSubmenu.classList.add('submenu--active');
        rotateIcon.classList.add('link--active');
        rotateIcon.style.transform = 'rotate(180deg)';
    }
});

// a click even on the body to also close the submenu
const body = document.querySelector('body');
body.addEventListener('click', event => {
    if (!event.target.closest('.nav__item')) {
        resetLinks();
    }
});

// Functionality for revealing the sections as we scroll to them.
const allSections = document.querySelectorAll('.section');

const sectionCallback = function (entries) {
    const [entry] = entries;
    if (entry.isIntersecting) entry.target.classList.add('section--reveal');
};

const options = {
    root: null,
    threshold: 0.15,
};

const sectionObserver = new IntersectionObserver(sectionCallback, options);
allSections.forEach(section => sectionObserver.observe(section));

// functionality for removing preloader on page load

function removePreloader() {
    const preloader = document.querySelector('.preloader');

    window.addEventListener('load', () => {
        preloader.style.display = 'none';
    });
}
