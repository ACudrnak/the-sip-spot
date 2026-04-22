function toggleMenu() {
  const navLinks = document.getElementById("nav-links");
  if (navLinks) {
    navLinks.classList.toggle("show");
  }
}

/* Referencie */
let currentSlide = 0;
const slides = document.querySelectorAll(".slide");

function showSlide(index) {
  if (!slides.length) return;

  slides.forEach((slide, i) => {
    slide.classList.toggle("active", i === index);
  });
}

function nextSlide() {
  if (!slides.length) return;

  currentSlide = (currentSlide + 1) % slides.length;
  showSlide(currentSlide);
}

function prevSlide() {
  if (!slides.length) return;

  currentSlide = (currentSlide - 1 + slides.length) % slides.length;
  showSlide(currentSlide);
}

/* Eventy */
let currentEvent = 0;
const eventSlides = document.querySelectorAll(".event-slide");

function showEvent(index) {
  if (!eventSlides.length) return;

  eventSlides.forEach((slide, i) => {
    slide.classList.toggle("active", i === index);
  });
}

function nextEvent() {
  if (!eventSlides.length) return;

  currentEvent = (currentEvent + 1) % eventSlides.length;
  showEvent(currentEvent);
}

function prevEvent() {
  if (!eventSlides.length) return;

  currentEvent = (currentEvent - 1 + eventSlides.length) % eventSlides.length;
  showEvent(currentEvent);
}

/* Cookies banner */
const cookieBanner = document.getElementById("cookie-banner");
const acceptCookiesBtn = document.getElementById("accept-cookies");

if (cookieBanner && localStorage.getItem("cookiesAccepted") === "true") {
  cookieBanner.style.display = "none";
}

if (acceptCookiesBtn) {
  acceptCookiesBtn.addEventListener("click", function () {
    localStorage.setItem("cookiesAccepted", "true");
    if (cookieBanner) {
      cookieBanner.style.display = "none";
    }
  });
}
