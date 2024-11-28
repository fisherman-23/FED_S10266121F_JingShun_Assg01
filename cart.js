// Define global variables
let globalTotalCost = 0;
let globalName = "User";
let promoCodeApplied = false;
// localStorage.clear();

// Store each object in localStorage with a unique key
//localStorage.setItem("cart", JSON.stringify(items11));

// Retrieve all objects from localStorage
const cart = JSON.parse(localStorage.getItem("cart"));

console.log(cart);

// Read product data from products.json
fetch("products.json")
  .then((response) => response.json())
  .then((data) => {
    let productData = data.products;
    addCartItems(productData);
    updateTotalCost(productData);
  });

// Add items to DOM
function addCartItems(productData) {
  const cartContainer = document.getElementById("cart-items");
  let items = JSON.parse(localStorage.getItem("cart"));

  // if there are no items in the cart, display a message
  if (items.length === 0) {
    const emptyCart = document.createElement("h2");
    emptyCart.textContent = "Your cart is empty!";
    cartContainer.appendChild(emptyCart);
    return;
  }

  items.forEach((item) => {
    // Get product details
    const product = productData[item.id];
    const cartItem = document.createElement("div");
    cartItem.className = "cart-item";

    // Add product image
    const img = document.createElement("img");
    img.src = `assets/images/${product.image}`;
    img.alt = `Product ${product.name}`;

    // Add product details
    const detailsDiv = document.createElement("div");

    const title = document.createElement("h3");
    title.textContent = product.name;

    const price = document.createElement("p");
    price.textContent = `$${product.price.toFixed(2)}`;

    // Add quantity input
    const qty = document.createElement("input");
    qty.type = "number";
    qty.value = item.qty;
    qty.min = 1;

    qty.onchange = () => {
      qty.value = qty.value.replace(/[^0-9]/g, "");

      if (qty.value < 1) {
        qty.value = 1;
      }
    };
    qty.addEventListener("change", () => updateCart(productData));
    // Add remove button
    const removeButton = document.createElement("button");
    removeButton.className = "remove-button";
    removeButton.onclick = () => {
      cartContainer.removeChild(cartItem);
      items = items.filter((cartItem) => cartItem.id !== item.id);
      localStorage.setItem("cart", JSON.stringify(items));
      updateTotalCost(productData);
      if (items.length === 0) {
        const emptyCart = document.createElement("h2");
        emptyCart.textContent = "Your cart is empty!";
        cartContainer.appendChild(emptyCart);
      }
    };

    detailsDiv.appendChild(title);
    detailsDiv.appendChild(price);
    detailsDiv.appendChild(qty);

    // Combine elements
    cartItem.appendChild(img);
    cartItem.appendChild(detailsDiv);
    cartItem.appendChild(removeButton);

    // Add to container
    cartContainer.appendChild(cartItem);
  });
}
// Update the cart, called when the quantity input changes, or when an item is removed, udpate to local storage
function updateCart(productData) {
  const cartItems = document.querySelectorAll(".cart-item");
  let items = JSON.parse(localStorage.getItem("cart"));

  cartItems.forEach((item, index) => {
    const qty = item.querySelector("input").value;
    items[index].qty = qty;
  });

  localStorage.setItem("cart", JSON.stringify(items));
  updateTotalCost(productData);

  // console.log(JSON.parse(localStorage.getItem("cart")));
}

// Update the total cost, called when the cart is loaded, or when the quantity input changes
function updateTotalCost(productData) {
  let items = JSON.parse(localStorage.getItem("cart"));
  const previousTotal = document.getElementById("previous-total");

  const totalCost = items.reduce((acc, item) => {
    const product = productData[item.id];
    return acc + product.price * item.qty;
  }, 0);

  const totalCostElement = document.getElementById("total-cost");
  globalTotalCost = totalCost;
  if (promoCodeApplied) {
    globalTotalCost = totalCost * 0.9;
    previousTotal.textContent = `$${(globalTotalCost / 0.9).toFixed(2)}`;
  }
  totalCostElement.textContent = `$${globalTotalCost.toFixed(2)}`;
}

// Apply promo code
function applyPromo() {
  const promoCode = document.getElementById("promo-code").value;
  const totalCostElement = document.getElementById("total-cost");
  const totalCost = globalTotalCost;
  //   const totalCost = parseFloat(totalCostElement.textContent.slice(1));
  const promoStatus = document.getElementById("promo-status");
  const previousTotal = document.getElementById("previous-total");
  previousTotal.textContent = "";
  promoStatus.textContent = "";
  // Promo code should not keep applying
  if (promoCode === "10OFF") {
    if (promoCodeApplied) {
      totalCostElement.textContent = `$${globalTotalCost.toFixed(2)}`;
      promoStatus.textContent = "Promo code applied! 10% Discount";
      previousTotal.textContent = `$${(globalTotalCost / 0.9).toFixed(2)}`;
      alert("Promo code already applied");
      return;
    } else {
      // Apply the promo code if it's not already applied
      globalTotalCost = totalCost * 0.9;
      totalCostElement.textContent = `$${globalTotalCost.toFixed(2)}`;
      promoStatus.textContent = "Promo code applied! 10% Discount";
      previousTotal.textContent = `$${(globalTotalCost / 0.9).toFixed(2)}`;
      promoCodeApplied = true;
    }
  }
}
document
  .querySelector("#checkout-form")
  .addEventListener("submit", function (e) {
    e.preventDefault();
    // print out the form values
    const formData = new FormData(e.target);
    console.log("Form submitted");
    console.log("Name: ", formData.get("name"));
    globalName = formData.get("name");

    openCheckoutPopUp();
    console.log("clicked");
    //   window.location.href = "checkout.html";
  });

// Add event listener to the form
document
  .querySelector("#payment-form")
  .addEventListener("submit", function (e) {
    e.preventDefault();
    const checkoutPopup = document.querySelector(".checkout-popup");
    checkoutPopup.classList.remove("active");
    // call lottie animation
    const lottiePlayer = document.getElementById("lottiePlayer");
    lottiePlayer.style =
      "width: 300px; height: 300px; display: block; z-index: 1002; position: fixed; top: 50%; left: 50%; transform: translate(-50%, -50%);"; // Display the Lottie animation
    // Add click event listener to the button
    lottiePlayer.play(); // Play the Lottie animation
    console.log("clicked");
    // wait for the animation to finish
    setTimeout(() => {
      // Redirect to the homepage
      //pause the animation
      lottiePlayer.pause(); // Pause the Lottie animation

      lottiePlayer.style = "display: none;"; // Hide the Lottie animation
      window.location.href = "index.html";
    }, 1500);

    //   window.location.href = "checkout.html";
  });

// Open and close product popup, called when clicking on a product
function openCheckoutPopUp() {
  const background = document.querySelector(".popup-bg");
  const popup = document.querySelector(".checkout-popup");
  const price = popup.querySelector("#checkout-price");
  const userName = popup.querySelector("#checkout-user");
  userName.textContent = "Hello, " + globalName;
  price.textContent = "Your Total: $" + globalTotalCost.toFixed(2);

  popup.classList.add("active");
  background.classList.add("active");
  console.log("Opening checkout popup");
}

// Close product popup, called when clicking on background
function closeCheckoutPopUp() {
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
