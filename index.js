// Initial set of images (replace these with your own URLs)
const initialImages = [
  "assets/images/image1.png",
  "assets/images/image2.png",
  "assets/images/image3.png",
  "assets/images/image4.png",
  "assets/images/image5.png",
  "assets/images/image6.png",
  "assets/images/image7.png",
  "assets/images/image8.png",
  "assets/images/image9.png",
  "assets/images/image10.png",
];

// Function to generate new images dynamically
const getNewImages = () => {
  // Replace with logic to fetch/generate new images
  return [
    "assets/images/image1.png",
    "assets/images/image2.png",
    "assets/images/image3.png",
    "assets/images/image4.png",
    "assets/images/image5.png",
    "assets/images/image6.png",
    "assets/images/image7.png",
    "assets/images/image8.png",
    "assets/images/image9.png",
    "assets/images/image10.png",
  ];
};

// Reference to the grid container
const grid = document.getElementById("topsellers-grid");

// Function to populate grid with images
function populateGrid(images) {
  grid.innerHTML = ""; // Clear current images
  images.forEach((src) => {
    const img = document.createElement("img");
    img.src = src;
    img.classList.add("fade-in");
    grid.appendChild(img);
  });
}

// Function to update the grid with a fade-out effect
function updateGrid() {
  const images = grid.querySelectorAll("img");

  // Add fade-out class to all images
  images.forEach((img) => img.classList.remove("fade-in"));
  images.forEach((img) => img.classList.add("fade-out"));

  // After the fade-out animation, replace images
  setTimeout(() => {
    const newImages = getNewImages(); // Get new set of images
    populateGrid(newImages); // Populate grid with new images
  }, 1000); // Matches the transition duration in CSS
}

// Initialize the grid with the initial set of images
populateGrid(initialImages);

// Update the grid every 7 seconds
setInterval(updateGrid, 7000);
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
