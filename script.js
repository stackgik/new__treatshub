"use strict";
const swiper = new Swiper(".header", {
  // If we need pagination
  pagination: {
    el: ".swiper-pagination",
    clickable: true,
  },

  autoplayDelay: "2500",
  autoplayDisableOnInteraction: "false",
});

console.log(swiper);
