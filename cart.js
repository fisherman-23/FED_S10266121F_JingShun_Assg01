let items = [
  { id: 0, qty: 1 },
  { id: 1, qty: 1 },
  { id: 2, qty: 1 },
];

localStorage.clear();

// Store each object in localStorage with a unique key
localStorage.setItem("cart", JSON.stringify(items));

// Retrieve all objects from localStorage
const cart = JSON.parse(localStorage.getItem("cart"));

console.log(cart);

// Read product data from products.json
fetch("products.json")
  .then((response) => response.json())
  .then((data) => {
    let productData = data.products;
    addCartItems(productData);
  });

// Add items to DOM
function addCartItems(productData) {
  const cartContainer = document.getElementById("cart-items");

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

    detailsDiv.appendChild(title);
    detailsDiv.appendChild(price);

    // Combine elements
    cartItem.appendChild(img);
    cartItem.appendChild(detailsDiv);

    // Add to container
    cartContainer.appendChild(cartItem);
  });
}
