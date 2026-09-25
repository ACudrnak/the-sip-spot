document.addEventListener("DOMContentLoaded", function () {

  /* Header scroll state */
  const header = document.getElementById("site-header");
  if (header) {
    window.addEventListener("scroll", function () {
      header.classList.toggle("scrolled", window.scrollY > 20);
    }, { passive: true });
  }

  /* Hamburger menu */
  window.toggleMenu = function () {
    const navLinks = document.getElementById("nav-links");
    const toggle = document.querySelector(".nav-toggle");
    if (navLinks) {
      const isOpen = navLinks.classList.toggle("show");
      if (toggle) toggle.setAttribute("aria-expanded", isOpen);
    }
  };

  // Close menu on nav link click (mobile)
  document.querySelectorAll("#nav-links a").forEach(function (link) {
    link.addEventListener("click", function () {
      const navLinks = document.getElementById("nav-links");
      const toggle = document.querySelector(".nav-toggle");
      if (navLinks) {
        navLinks.classList.remove("show");
        if (toggle) toggle.setAttribute("aria-expanded", "false");
      }
    });
  });

  /* Referencie slider */
  let currentSlide = 0;
  const slides = document.querySelectorAll(".slide");

  function showSlide(index) {
    if (!slides.length) return;
    slides.forEach((slide, i) => slide.classList.toggle("active", i === index));
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

  /* Event slider */
  let currentEvent = 0;
  const eventSlides = document.querySelectorAll(".event-slide");
  const eventCurrent = document.getElementById("event-current");
  const eventTotal = document.getElementById("event-total");

  if (eventTotal) eventTotal.textContent = eventSlides.length;

  function showEvent(index) {
    if (!eventSlides.length) return;
    eventSlides.forEach((slide, i) => slide.classList.toggle("active", i === index));
    if (eventCurrent) eventCurrent.textContent = index + 1;
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

  function applyCheckboxState(analytics, marketing) {
    const analyticsBox = document.getElementById("checkbox-analytics");
    const marketingBox = document.getElementById("checkbox-marketing");
    if (analyticsBox) analyticsBox.checked = analytics;
    if (marketingBox) marketingBox.checked = marketing;
  }

  function getSavedCheckboxState() {
    return {
      analytics: localStorage.getItem("cookiesAnalytics") === "true",
      marketing: localStorage.getItem("cookiesMarketing") === "true"
    };
  }

  if (cookieBanner) {
    if (localStorage.getItem("cookiesAccepted")) {
      cookieBanner.style.display = "none";
    } else {
      applyCheckboxState(false, false);
    }
  }

  function openCookieBanner() {
    if (cookieBanner) {
      const saved = getSavedCheckboxState();
      applyCheckboxState(saved.analytics, saved.marketing);
      cookieBanner.style.display = "flex";
    }
  }

  const rejectBtn = document.getElementById("reject-cookies");
  if (rejectBtn && cookieBanner) {
    rejectBtn.addEventListener("click", function () {
      localStorage.setItem("cookiesAccepted", "rejected");
      localStorage.setItem("cookiesAnalytics", "false");
      localStorage.setItem("cookiesMarketing", "false");
      cookieBanner.style.display = "none";
    });
  }

  const acceptSelectedBtn = document.getElementById("accept-selected");
  if (acceptSelectedBtn && cookieBanner) {
    acceptSelectedBtn.addEventListener("click", function () {
      const analytics = document.getElementById("checkbox-analytics")?.checked || false;
      const marketing = document.getElementById("checkbox-marketing")?.checked || false;
      if (!analytics && !marketing) {
        alert("Prosím zaškrtnite aspoň jednu možnosť, alebo zvoľte \"Odmietnuť všetky\".");
        return;
      }
      localStorage.setItem("cookiesAccepted", "selected");
      localStorage.setItem("cookiesAnalytics", analytics ? "true" : "false");
      localStorage.setItem("cookiesMarketing", marketing ? "true" : "false");
      cookieBanner.style.display = "none";
    });
  }

  const acceptAllBtn = document.getElementById("accept-cookies");
  if (acceptAllBtn && cookieBanner) {
    acceptAllBtn.addEventListener("click", function () {
      applyCheckboxState(true, true);
      localStorage.setItem("cookiesAccepted", "all");
      localStorage.setItem("cookiesAnalytics", "true");
      localStorage.setItem("cookiesMarketing", "true");
      cookieBanner.style.display = "none";
    });
  }

  const cookieSettingsLink = document.getElementById("open-cookie-settings");
  if (cookieSettingsLink) {
    cookieSettingsLink.addEventListener("click", function (e) {
      e.preventDefault();
      openCookieBanner();
    });
  }

});
