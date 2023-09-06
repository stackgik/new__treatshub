"use strict";

// ! Functionality to handle navigation

const menu = document.querySelector(".nav__lists"),
  navItems = document.querySelectorAll(".nav__item"),
  navLinks = document.querySelectorAll(".nav__link"),
  submenus = document.querySelectorAll(".submenu"),
  linkIcons = document.querySelectorAll(".nav__link i");

const resetLinks = () => {
  // doing general resetting
  navLinks.forEach((navLink) => navLink.classList.remove("link--active"));
  submenus.forEach((submenu) => submenu.classList.remove("submenu--active"));
  linkIcons.forEach((icon) => icon.classList.remove("link--active"));
  linkIcons.forEach((icon) => (icon.style.transform = "rotate(0)"));
};

// ! This code runs each time a click is made on the links with nav__item class
menu.addEventListener("click", (event) => {
  const clicked = event.target.closest(".nav__item");

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
  const isLinkActive = clickedLink.classList.contains("link--active");

  // It checks if the link is already open, then does a general reset
  if (isLinkActive) resetLinks();

  // If not open, add these classes
  if (!isLinkActive) {
    // adding the necessary classes if the link isn't already active
    resetLinks();
    clickedLink.classList.add("link--active");
    showSubmenu.classList.add("submenu--active");
    rotateIcon.classList.add("link--active");
    rotateIcon.style.transform = "rotate(180deg)";
  }
});

// a click even on the body to also close the submenu
const body = document.querySelector("body");
body.addEventListener("click", (event) => {
  if (!event.target.closest(".nav__item")) {
    resetLinks();
  }
});

// functionality for the pagination
let currentPage = 1;

const paginationLists = document.querySelectorAll(".pagination__list"),
  pagination = document.querySelector(".pagination");

pagination.addEventListener("click", (event) => {
  const clicked = event.target.closest(".pagination__list");
  const clickedLink = clicked.querySelector(".page");

  if (clickedLink.classList.contains("previous__page") && currentPage > 1) {
    currentPage--;
    clickedLink.href = `/pages/products/birthday-cakes/page_${currentPage}.html`;
  }

  if (clickedLink.classList.contains("next__page") && currentPage < 3) {
    currentPage++;
    console.log(clickedLink.innerText);
    clickedLink.href = `/pages/products/birthday-cakes/page_${currentPage}.html`;
  }

  clickedLink.href = `/pages/products/birthday-cakes/page_${clicked.dataset.page}.html`;
});
