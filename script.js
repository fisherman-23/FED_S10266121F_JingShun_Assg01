const elements = document.querySelectorAll(".promotion-item");

elements.forEach((element) => {
  // Add touchstart event listener
  element.addEventListener("touchstart", () => {
    if (element.classList.contains("touch-hover-start")) {
      element.classList.remove("touch-hover-start");
      element.classList.add("touch-hover-end");
    } else {
      element.classList.remove("touch-hover-end");
      element.classList.add("touch-hover-start");
    }
    console.log("Touch event started");
  });
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
