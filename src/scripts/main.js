import styles from './main.scss';
import { disableBodyScroll, enableBodyScroll } from 'body-scroll-lock';
import SmoothScroll from 'smooth-scroll';
import FontAwesome from '@fortawesome/fontawesome-pro/js/all.js';
import Swiper, { Scrollbar, Navigation } from 'swiper';

Swiper.use([Scrollbar, Navigation]);

var scroll = new SmoothScroll('a[href*="#"]');

const bodyTag = document.body;
const headerContainer = document.getElementById("header-container");
const mobileMenuWithChildren = document.querySelectorAll('.mobile-menu-with-children');
const mobileMenuToggle = document.getElementById("mobile-menu-toggle");
const mobileMenuBox = document.getElementById("mobile-menu");
const mobileMenuItems = document.getElementById("mobile-items");
const mobileMenuClose = document.getElementById("mobile-menu-close");
const siteCopyright = document.getElementById('copyright-date');

for (var i = 0; i < mobileMenuWithChildren.length; i++) {
  mobileMenuWithChildren[i].addEventListener('click', e => {
      e.target.querySelector('.mobile-menu-children').classList.toggle('h-0');
      e.target.querySelector('.mobile-menu-children').classList.toggle('invisible');
      e.target.querySelector('.mobile-menu-children').classList.toggle('pt-0');
      e.target.querySelector('.mobile-menu-children').classList.toggle('pt-8');
      e.target.classList.toggle('font-bold');
      e.target.querySelector('.mobile-children-icon').classList.toggle('mobile-icon-active');
  });
}

mobileMenuToggle.addEventListener('click', e => {
  mobileMenuBox.classList.toggle('mobile-menu-collaspe');
  mobileMenuBox.scrollTop = 0;
  mobileMenuItems.classList.toggle('mobile-items-collaspe');
  mobileMenuItems.scrollTop = 0;
  mobileMenuClose.classList.toggle('mobile-menu-close-collaspe');
  if (e.target.getAttribute('status') == "closed") {
    e.target.src = "https://inside.saallen.com/wp-content/uploads/2021/09/mobile-menu-icon-close.png";
    e.target.setAttribute('status', 'open');
  } else {
    e.target.src = "https://inside.saallen.com/wp-content/uploads/2021/09/mobile-menu-icon.png";
    e.target.setAttribute('status', 'closed');
  }
  if (document.body.style.overflow == "hidden") {
    enableBodyScroll('body');
  } else {
    disableBodyScroll('body');
  }
});

mobileMenuClose.addEventListener('click', e => {
  mobileMenuBox.classList.toggle('mobile-menu-collaspe');
  mobileMenuBox.scrollTop = 0;
  mobileMenuItems.classList.toggle('mobile-items-collaspe');
  mobileMenuItems.scrollTop = 0;
  mobileMenuClose.classList.toggle('mobile-menu-close-collaspe');
  mobileMenuToggle.src = "https://inside.saallen.com/wp-content/uploads/2021/09/mobile-menu-icon.png";
  mobileMenuToggle.setAttribute('status', 'closed');
  enableBodyScroll('body');
});

var today = new Date();
var yyyy = today.getFullYear();

today = yyyy;
siteCopyright.innerText = today;

const observer = new IntersectionObserver( 
    ([e]) => {
      e.target.classList.toggle('isSticky', e.intersectionRatio < 1)
    },
    {threshold: [1]}
);

observer.observe(headerContainer);

const swiper = new Swiper('.swiper', {
  slidesPerView: 1,
  spaceBetween: 20,
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
  scrollbar: {
    el: '.swiper-scrollbar',
  },
  breakpoints: {
    576: {
      slidesPerView: 2,
    },
    768: {
      slidesPerView: 3,
    },
    1200: {
      slidesPerView: 4,
    },
  },
});