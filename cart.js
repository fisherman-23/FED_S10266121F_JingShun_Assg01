let items11 = [
  { id: 0, qty: "1" },
  { id: 1, qty: "1" },
  { id: 2, qty: "1" },
];
let globalTotalCost = 0;
let promoCodeApplied = false;
localStorage.clear();

// Store each object in localStorage with a unique key
localStorage.setItem("cart", JSON.stringify(items11));

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

  items.forEach((item) => {
    const product = productData[item.id];
    const cartItem = document.createElement("div");
    cartItem.className = "cart-item";

    const img = document.createElement("img");
    img.src = `assets/images/${product.image}`;
    img.alt = `Product ${product.name}`;

    // Add product details
    const detailsDiv = document.createElement("div");

    const title = document.createElement("h3");
    title.textContent = product.name;

    const price = document.createElement("p");
    price.textContent = `$${product.price.toFixed(2)}`;

    const qty = document.createElement("input");
    qty.type = "number";
    qty.value = item.qty;
    qty.min = 1;
    qty.max = 10;
    qty.oninput = () => {
      qty.value = qty.value.replace(/[^0-9]/g, "");

      if (qty.value > 10) {
        qty.value = 10;
      }
    };
    qty.addEventListener("change", () => updateCart(productData));

    detailsDiv.appendChild(title);
    detailsDiv.appendChild(price);
    detailsDiv.appendChild(qty);

    // Combine elements
    cartItem.appendChild(img);
    cartItem.appendChild(detailsDiv);

    // Add to container
    cartContainer.appendChild(cartItem);
  });
}

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
