import { toggleSubmenu, revealSections } from './main.js';

toggleSubmenu();
revealSections();

// *************************************

// refactor to class
class Pagination {
    constructor() {}
}

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
