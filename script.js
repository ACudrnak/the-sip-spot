document.addEventListener("DOMContentLoaded", function () {
  /* Hamburger menu */
  window.toggleMenu = function () {
    const navLinks = document.getElementById("nav-links");
    if (navLinks) {
      navLinks.classList.toggle("show");
    }
  };

  /* Referencie */
  let currentSlide = 0;
  const slides = document.querySelectorAll(".slide");

  function showSlide(index) {
    if (!slides.length) return;
    slides.forEach((slide, i) => {
      slide.classList.toggle("active", i === index);
    });
  }

  window.nextSlide = function () {
    if (!slides.length) return;
    currentSlide = (currentSlide + 1) % slides.length;
    showSlide(currentSlide);
  };

  window.prevSlide = function () {
    if (!slides.length) return;
    currentSlide = (currentSlide - 1 + slides.length) % slides.length;
    showSlide(currentSlide);
  };

  /* Eventy */
  let currentEvent = 0;
  const eventSlides = document.querySelectorAll(".event-slide");

  function showEvent(index) {
    if (!eventSlides.length) return;
    eventSlides.forEach((slide, i) => {
      slide.classList.toggle("active", i === index);
    });
  }

  window.nextEvent = function () {
    if (!eventSlides.length) return;
    currentEvent = (currentEvent + 1) % eventSlides.length;
    showEvent(currentEvent);
  };

  window.prevEvent = function () {
    if (!eventSlides.length) return;
    currentEvent = (currentEvent - 1 + eventSlides.length) % eventSlides.length;
    showEvent(currentEvent);
  };

  /* Cookies */
  const cookieBanner = document.getElementById("cookie-banner");

  // Skryť banner ak už bol súhlas udelený
  if (cookieBanner && localStorage.getItem("cookiesAccepted")) {
    cookieBanner.style.display = "none";
  }

  function resetCheckboxes() {
    const analytics = document.getElementById("checkbox-analytics");
    const marketing = document.getElementById("checkbox-marketing");
    if (analytics) analytics.checked = false;
    if (marketing) marketing.checked = false;
  }

  function openCookieBanner() {
  if (cookieBanner) {
    const savedAnalytics = localStorage.getItem("cookiesAnalytics") === "true";
    const savedMarketing = localStorage.getItem("cookiesMarketing") === "true";
    const analytics = document.getElementById("checkbox-analytics");
    const marketing = document.getElementById("checkbox-marketing");
    if (analytics) analytics.checked = savedAnalytics;
    if (marketing) marketing.checked = savedMarketing;
    cookieBanner.style.display = "flex";
  }
}

  // Prijať všetky
  const acceptAllBtn = document.getElementById("accept-cookies");
  if (acceptAllBtn && cookieBanner) {
    acceptAllBtn.addEventListener("click", function () {
      localStorage.setItem("cookiesAccepted", "all");
      cookieBanner.style.display = "none";
    });
  }

  // Odmietnuť všetky
  const rejectBtn = document.getElementById("reject-cookies");
  if (rejectBtn && cookieBanner) {
    rejectBtn.addEventListener("click", function () {
      localStorage.setItem("cookiesAccepted", "rejected");
      cookieBanner.style.display = "none";
    });
  }

  // Prijať vybrané
  const acceptSelectedBtn = document.getElementById("accept-selected");
  if (acceptSelectedBtn && cookieBanner) {
    acceptSelectedBtn.addEventListener("click", function () {
      const analytics = document.getElementById("checkbox-analytics")?.checked || false;
      const marketing = document.getElementById("checkbox-marketing")?.checked || false;
      localStorage.setItem("cookiesAccepted", "selected");
      localStorage.setItem("cookiesAnalytics", analytics ? "true" : "false");
      localStorage.setItem("cookiesMarketing", marketing ? "true" : "false");
      cookieBanner.style.display = "none";
    });
  }

  // Nastavenia cookies v pätičke — znovu otvorí banner
  const cookieSettingsLink = document.getElementById("open-cookie-settings");
  if (cookieSettingsLink) {
    cookieSettingsLink.addEventListener("click", function (e) {
      e.preventDefault();
      localStorage.removeItem("cookiesAccepted");
      localStorage.removeItem("cookiesAnalytics");
      localStorage.removeItem("cookiesMarketing");
      openCookieBanner();
    });
  }
});
