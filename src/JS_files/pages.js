'use strict';

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

// functionality for the pagination
const previousBtn = document.querySelector('.previous__btn'),
    nextBtn = document.querySelector('.next__btn'),
    links = document.querySelectorAll('.pagination__link');

// A function to update the active page
const updateLink = () => {
    links.forEach(link => link.classList.remove('pagination__link--active'));
    links[currentPage - 1].classList.add('pagination__link--active');
};

//A function for the previous button
const loadPreviousPage = () => {
    previousBtn.href = `/src/products/birthday-cakes/page_${
        Number.parseInt(sessionStorage.getItem('currentPage')) - 1
    }.html`;
    updateLink();
    currentPage = Number.parseInt(sessionStorage.getItem('currentPage')) - 1;
    sessionStorage.setItem('currentPage', currentPage);
};

// A function for the next button
const loadnextPage = () => {
    nextBtn.href = `/src/products/birthday-cakes/page_${
        Number.parseInt(sessionStorage.getItem('currentPage')) + 1
    }.html`;
    updateLink();
    currentPage = Number.parseInt(sessionStorage.getItem('currentPage')) + 1;
    sessionStorage.setItem('currentPage', currentPage);
};

if (Number.parseInt(sessionStorage.getItem('currentPage')) === 1) {
    previousBtn.ariaDisabled = true;
    previousBtn.classList.add('page__link--disabled');
}

let currentPage = sessionStorage.getItem('currentPage');

if (currentPage === null) {
    currentPage = 1; //which means nothing has been set, hence the default value.
    sessionStorage.setItem('currentPage', currentPage);
}

links.forEach(link => {
    link.addEventListener('click', () => {
        currentPage = link.dataset.page;
        link.href = `/src/products/birthday-cakes/page_${currentPage}.html`;
        updateLink();
        sessionStorage.setItem('currentPage', currentPage);
    });
});

updateLink();

previousBtn.addEventListener('click', loadPreviousPage);
updateLink();

nextBtn.addEventListener('click', loadnextPage);
updateLink();

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
