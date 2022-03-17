"use strict";

const linkMain = document.querySelector(".btn-main");
const linkHero = document.querySelector(".btn-hero");
const linkEnd = document.querySelector(".btn-cta-end");
const overlay = document.querySelector(".overlay");
const form = document.querySelector("form");
const iconForm = document.querySelector(".icon-form");
const buttonForm = document.querySelector(".btn-form");
const header = document.querySelector("header");
const headerNav = document.querySelector(".header-nav");
const sectionHero = document.querySelector(".hero-section");

// Active nav bar
const formAppear = function (e) {
  e.preventDefault();
  overlay.classList.toggle("hidden");
  form.classList.toggle("hidden");
};

const heightNav = headerNav.getBoundingClientRect().height;
console.log(heightNav);

const obsCallback = function (entries, observer) {
  const [entry] = entries;
  // console.log(entries);
  // console.log(entry.isIntersecting);
  if (!entry.isIntersecting) headerNav.classList.add("sticky");
  else headerNav.classList.remove("sticky");
  // console.log("lag qua");
};

const obsOptions = {
  root: null,
  threshold: 0,
  rootMargin: `-${heightNav}px`,
};

const observer = new IntersectionObserver(obsCallback, obsOptions);
observer.observe(sectionHero);

// Active form
linkHero.addEventListener("click", formAppear);
linkMain.addEventListener("click", formAppear);
iconForm.addEventListener("click", formAppear);
linkEnd.addEventListener("click", formAppear);

// Lazy Loading Images
const imgTargets = document.querySelectorAll(".feature-img[data-src]");
console.log(imgTargets);

const loadImg = function (entries, observer) {
  const [entry] = entries;
  console.log(entry);
  if (!entry.isIntersecting) return;
  entry.target.src = entry.target.dataset.src;
  entry.target.addEventListener("load", function () {
    entry.target.classList.remove("lazy-img");
  });
  observer.unobserve(entry.target);
};

const imgObserver = new IntersectionObserver(loadImg, {
  root: null,
  threshold: 0,
  rootMargin: "100px",
});

imgTargets.forEach((img) => imgObserver.observe(img));

// Testimonial hover
const figure = document.querySelectorAll("figure");
const feedback = document.querySelector(".feedback");

// const zoom = function (e, opa, sca) {
//   if (e.target.classList.contains("figure")) {
//     const figureHover = e.target;
//     console.log(figureHover);
//     const figureOthers = figureHover
//       .closest(".feedback")
//       .querySelectorAll(".figure");
//     console.log(figureOthers);
//     figureOthers.forEach((ele) => {
//       if (ele !== figureHover) ele.style.opacity = opa;
//     });
//     figureHover.style.transform = `scale(${sca})`;
//   }
// };
// feedback.addEventListener("mouseover", function (e) {
//   zoom(e, 0.3, 1.15);
// });

// feedback.addEventListener("mouseout", function (e) {
//   zoom(e, 1, 1);
// });

const zoomOptions = function (e, opa, sca, cla) {
  if (e.target.classList.contains(`${cla}`)) {
    const figureHover = e.target.closest(".figure");
    console.log(figureHover);
    const figureOthers = figureHover
      .closest(".feedback")
      .querySelectorAll(".figure");
    console.log(figureOthers);
    figureOthers.forEach((ele) => {
      if (ele !== figureHover) ele.style.opacity = opa;
    });
    figureHover.style.transform = `scale(${sca})`;
  }
};

feedback.addEventListener("mouseover", function (e) {
  zoomOptions(e, 0.3, 1.15, "figure");
});
feedback.addEventListener("mouseover", function (e) {
  zoomOptions(e, 0.3, 1.15, "heading-feedback");
});
feedback.addEventListener("mouseover", function (e) {
  zoomOptions(e, 0.3, 1.15, "quote");
});
feedback.addEventListener("mouseover", function (e) {
  zoomOptions(e, 0.3, 1.15, "customer-img");
});

feedback.addEventListener("mouseout", function (e) {
  zoomOptions(e, 1, 1, "figure");
  zoomOptions(e, 1, 1, "quote");
});

// Responsive
const btnNav = document.querySelector(".btn-mobile-nav");
const btnOpenNav = document.querySelector(
  ".icon-mobile-nav[name='menu-outline']"
);
const btnCloseNav = document.querySelector(
  ".icon-mobile-nav[name='close-outline']"
);
const navOptions = document.querySelector(".nav-options");
const animationNav = function (trans, opa) {
  btnOpenNav.classList.toggle("hidden");
  btnCloseNav.classList.toggle("hidden");
  navOptions.style.transform = `translateX(${trans}%)`;
  navOptions.style.opacity = opa;
};
btnOpenNav.addEventListener("click", function () {
  animationNav(0, 1);
});

btnCloseNav.addEventListener("click", function () {
  animationNav(120, 0);
});

// Implement Smooth Scrolling
const allLinks = document.querySelectorAll("a");
// const navOptionLink = document.querySelectorAll(".nav-option-link");
console.log(allLinks);
allLinks.forEach((link) =>
  link.addEventListener("click", function (e) {
    e.preventDefault();
    const href = link.getAttribute("href");
    if (href === "#")
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    if (href !== "#" && href.startsWith("#")) {
      const sectionLink = document.querySelector(href);
      sectionLink.scrollIntoView({ behavior: "smooth" });
    }
    if (link.classList.contains("nav-option-link")) animationNav(120, 0);
  })
);

///////////////////////////////////////////////////////////
// Fixing flexbox gap property missing in some Safari versions
function checkFlexGap() {
  var flex = document.createElement("div");
  flex.style.display = "flex";
  flex.style.flexDirection = "column";
  flex.style.rowGap = "1px";

  flex.appendChild(document.createElement("div"));
  flex.appendChild(document.createElement("div"));

  document.body.appendChild(flex);
  var isSupported = flex.scrollHeight === 1;
  flex.parentNode.removeChild(flex);
  console.log(isSupported);

  if (!isSupported) document.body.classList.add("no-flexbox-gap");
}
checkFlexGap();
