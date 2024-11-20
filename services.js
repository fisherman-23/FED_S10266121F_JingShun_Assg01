// For IKEA Membership card 3d effect when hovered
const card = document.querySelector(".membership-card");

card.addEventListener("mousemove", (e) => {
  const rect = card.getBoundingClientRect();
  const x = e.clientX - rect.left; // Get cursor X position relative to card
  const y = e.clientY - rect.top; // Get cursor Y position relative to card

  // Calculate rotation values based on cursor position
  // Multiply by 20 and subtract 10 to get a range of -10 to +10 degrees
  const rotateY = (x / rect.width) * 20 - 10;
  const rotateX = (y / rect.height) * 20 - 10; // Corrected rotation

  // Apply the transformation
  card.style.transform = `perspective(1000px) rotateY(${rotateY}deg) rotateX(${-rotateX}deg)`;
});

// Reset card position when mouse leaves
card.addEventListener("mouseleave", () => {
  card.style.transform = "perspective(1000px) rotateX(0) rotateY(0)";
  card.style.transition = "transform 0.5s ease";
});

// Remove transition on mouse enter for smooth movement
card.addEventListener("mouseenter", () => {
  card.style.transition = "none";
});
