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
function openProductPopUp(id) {
  const background = document.querySelector(".popup-bg");
  const popup = document.querySelector(".product-popup");
  // fetch product data from products.json
  fetch("products.json")
    .then((response) => response.json())
    .then((data) => {
      let productData = data.products;
      let product = productData[id];
      console.log(product);
      const title = popup.querySelector("#product-title");
      title.textContent = product.name;
      const img = popup.querySelector("#product-image");
      img.src = "assets/images/" + product.image;
      const price = popup.querySelector("#product-price");
      price.textContent = "$" + product.price;
      const description = popup.querySelector("#product-description");
      description.textContent = product.description;
      const button = popup.querySelector("#popup-add-to-cart-button");
      button.onclick = () => {
        addToCart(product.id);
      };
    });
  popup.classList.add("active");
  background.classList.add("active");
  console.log("Opening product popup");
}

function closeProductPopUp() {
  const background = document.querySelector(".popup-bg");
  background.classList.remove("active");
  const popup = document.querySelector(".product-popup");
  popup.classList.remove("active");
  console.log("Closing product popup");
}
document.querySelectorAll(".buy-button").forEach((button) => {
  button.addEventListener("click", function () {
    console.log("Button clicked");
    button.textContent = "Added to cart!";
    this.classList.add("clicked"); // Add the class for the color change
    setTimeout(() => {
      button.textContent = "Add to cart"; // Change the text back after 1 second

      this.classList.remove("clicked"); // Remove the class after 1 second
    }, 1000); // Adjust duration to suit your effect
  });
});
