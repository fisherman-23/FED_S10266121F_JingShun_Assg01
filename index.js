fetch("products.json")
  .then((response) => response.json())
  .then((data) => {
    let productData = data.products;
    let product = [];

    for (let i = 3; i < Object.keys(productData).length; i++) {
      // add to product
      product.push(productData[i]);
    }
    // Initialize the grid with the initial set of images
    populateGrid(product);
    // Update the grid every 7 seconds
    setInterval(() => {
      updateGrid(product);
    }, 7000);
  });

// Function to shuffle an array
function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

// generate array of random numbers from 0 to n, where n is the length of the array, with exlcusion of items in the exclude array
function randomArray(n, exclude) {
  let arr = [];
  for (let i = 0; i < n; i++) {
    if (!exclude.includes(i)) {
      arr.push(i);
    }
  }
  return shuffle(arr);
}

// Reference to the grid container
const grid = document.getElementById("topsellers-grid");

// Function to populate grid with images
function populateGrid(products) {
  products = products.slice(0, 10);
  grid.innerHTML = ""; // Clear current images
  products.forEach((product) => {
    const img = document.createElement("img");
    img.src = "assets/images/" + product.image;
    img.classList.add("fade-in");
    let div = document.createElement("div");
    div.classList.add("topseller-item");
    div.onclick = () => {
      openProductPopUp(product.id);
    };
    div.appendChild(img);
    grid.appendChild(div);
  });
}

// Function to update the grid with a fade-out effect
function updateGrid(products) {
  const images = grid.querySelectorAll("img");

  // Add fade-out class to all images
  images.forEach((img) => img.classList.remove("fade-in"));
  images.forEach((img) => img.classList.add("fade-out"));

  // After the fade-out animation, replace images
  setTimeout(() => {
    // shuffle products
    products = shuffle(products);
    populateGrid(products); // Populate grid with new images
  }, 1000); // Matches the transition duration in CSS
}

// Enable for mobile, touch events for hover effect
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

// Add to cart function
function addToCart(id) {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];

  const existingItem = cart.find((item) => item.id === id);
  if (existingItem) {
    existingItem.qty++;
  } else {
    cart.push({ id, qty: 1 });
  }

  localStorage.setItem("cart", JSON.stringify(cart));
  console.log(JSON.parse(localStorage.getItem("cart")));
}

// Open and close product popup, called when clicking on a product
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

// Close product popup, called when clicking on background
function closeProductPopUp() {
  const background = document.querySelector(".popup-bg");
  background.classList.remove("active");
  const popup = document.querySelector(".product-popup");
  popup.classList.remove("active");
  console.log("Closing product popup");
}
// Add click event listener to the button
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

const cardBack = document.querySelectorAll(".card-back");
cardBack.forEach((card) => {
  const buyButton = card.querySelector(".buy-button");
  if (buyButton) {
    buyButton.ontouchstart = (event) => event.stopPropagation();
  }
});
