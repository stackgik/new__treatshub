"use strict";
//code for the Swiper.js
const progressCircle = document.querySelector(".autoplay-progress svg");
const progressContent = document.querySelector(".autoplay-progress span");
const heroSection = new Swiper(".hero__section", {
  spaceBetween: 0,
  centeredSlides: true,
  autoplay: {
    delay: 2500,
    disableOnInteraction: false,
  },
  // If we need pagination
  pagination: {
    el: ".swiper-pagination",
    clickable: true,
  },
  on: {
    autoplayTimeLeft(s, time, progress) {
      progressCircle.style.setProperty("--progress", 1 - progress);
      progressContent.textContent = `${Math.ceil(time / 1000)}s`;
    },
  },
  navigation: true,
  grabCursor: true,
});

const birthdayCakes = new Swiper(".swiper1", {
  slidesPerView: "auto",
  spaceBetween: 20,
  navigation: true,
  grabCursor: true,
});

// ? Script for the treats menu functionality
const treatsMenu = document.querySelector(".treats__menu"),
  treatsItems = document.querySelectorAll(".treats__item"),
  sectionContainers = document.querySelectorAll(".section__container"),
  underline = document.querySelector(".line");

treatsMenu.addEventListener("click", (e) => {
  const clicked = e.target.closest(".treats__item");
  console.log(clicked);

  // Guard Clause
  if (!clicked) return;

  // adding the underline functionalities
  underline.style.width = clicked.offsetWidth + "px";
  underline.style.left = clicked.offsetLeft + "px";

  // resetting all the classes
  treatsItems.forEach((item) => item.classList.remove("treats__item--active"));

  sectionContainers.forEach((container) =>
    container.classList.remove("section__container--active")
  );

  // adding the classes
  document
    .querySelector(`.section__container--${clicked.dataset.item}`)
    .classList.add("section__container--active");

  clicked.classList.add("treats__item--active");
});
