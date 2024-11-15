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
