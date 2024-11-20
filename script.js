// Universal scripts to be run on all pages
function toggleMobileMenu(menu) {
  menu.classList.toggle("open");
}

// Select the navbar and landing screen
const navbar = document.querySelector(".navbar");
const landingScreen = document.querySelector(".landing");

// Get the height of the landing screen
const landingHeight = landingScreen.offsetHeight;

// Listen for the scroll event
window.addEventListener("scroll", () => {
  if (window.scrollY > landingHeight) {
    navbar.classList.add("fixed"); // Add the fixed class when scrolled past the landing screen
  } else {
    navbar.classList.remove("fixed"); // Remove the fixed class when above the landing screen
  }
});

const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
let interval = null;

// Add the hackedTextEffect when the page loads
document.addEventListener("DOMContentLoaded", () => {
  const h1 = document.querySelector("h1");

  // Trigger the effect on initial load
  hackedTextEffect({ target: h1 });

  // Add event listener for mouseover after initial load
  h1.onmouseover = (event) => hackedTextEffect(event);
});

function hackedTextEffect(event) {
  let iteration = 0;

  clearInterval(interval);

  interval = setInterval(() => {
    event.target.innerText = event.target.innerText
      .split("")
      .map((letter, index) => {
        if (index < iteration) {
          return event.target.dataset.value[index];
        }

        return letters[Math.floor(Math.random() * 26)];
      })
      .join("");

    if (iteration >= event.target.dataset.value.length) {
      clearInterval(interval);
    }

    iteration += 1 / 3;
  }, 30);
}
