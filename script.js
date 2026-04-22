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

  // Pri načítaní stránky — skryť banner ak už bol súhlas udelený
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

  // Odmietnuť všetky
  const rejectBtn = document.getElementById("reject-cookies");
  if (rejectBtn && cookieBanner) {
    rejectBtn.addEventListener("click", function () {
      localStorage.setItem("cookiesAccepted", "rejected");
      localStorage.setItem("cookiesAnalytics", "false");
      localStorage.setItem("cookiesMarketing", "false");
      cookieBanner.style.display = "none";
    });
  }

  // Prijať vybrané
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

  // Prijať všetky — zaškrtne checkboxy a uloží
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

  // Nastavenia cookies v pätičke — znovu otvorí banner so uloženým stavom
  const cookieSettingsLink = document.getElementById("open-cookie-settings");
  if (cookieSettingsLink) {
    cookieSettingsLink.addEventListener("click", function (e) {
      e.preventDefault();
      openCookieBanner();
    });
  }

});
