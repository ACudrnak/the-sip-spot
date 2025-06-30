function toggleMenu() {
  const navLinks = document.getElementById('nav-links');
  navLinks.classList.toggle('show');
}

let currentSlide = 0;
const slides = document.querySelectorAll(".slide");

function showSlide(index) {
  slides.forEach((slide, i) => {
    slide.classList.toggle("active", i === index);
  });
}

function nextSlide() {
  currentSlide = (currentSlide + 1) % slides.length;
  showSlide(currentSlide);
}

function prevSlide() {
  currentSlide = (currentSlide - 1 + slides.length) % slides.length;
  showSlide(currentSlide);
}

let currentEvent = 0;
const eventSlides = document.querySelectorAll(".event-slide");

function showEvent(index) {
  eventSlides.forEach((slide, i) => {
    slide.classList.toggle("active", i === index);
  });
}

function nextEvent() {
  currentEvent = (currentEvent + 1) % eventSlides.length;
  showEvent(currentEvent);
}

function prevEvent() {
  currentEvent = (currentEvent - 1 + eventSlides.length) % eventSlides.length;
  showEvent(currentEvent);
}

document.getElementById("kontakt-form").addEventListener("submit", async function (e) {
  e.preventDefault();

  const form = e.target;
  const formData = new FormData(form);

  try {
    const response = await fetch("https://formspree.io/f/xovwrenp", {
      method: "POST",
      body: formData,
      headers: {
        'Accept': 'application/json'
      }
    });

    if (response.ok) {
      form.reset();
      document.getElementById("thank-you-msg").style.display = "block";
    } else {
      alert("Vyskytla sa chyba pri odosielaní. Skúste znova.");
    }
  } catch (error) {
    alert("Chyba pripojenia.");
  }
});

