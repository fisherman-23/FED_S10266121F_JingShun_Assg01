let index = 0;

const showrooms = [
  {
    name: "Kitchen",
    images: [
      "assets/images/ikea-kitchen.png",
      "assets/images/ikea-kitchen-tap.png",
    ],
    description:
      "In this open kitchen, soft muted brown-beige sets the stage for playful contrasts and dashes of colour. It’s a look that oozes personality and flows seamlessly into the living room, making it a fun and flexible meeting point. Perfect for sharing many moments with loved ones – while easily keeping an eye on the kids.",
  },
  {
    name: "Living Room",
    images: [
      "assets/images/ikea-living-room.png",
      "assets/images/ikea-toy-storage.png",
    ],
    description:
      "This living room is designed for a family who loves to entertain. The large sofa is perfect for movie nights and the open shelving makes it easy to grab a book or board game. The room is filled with personal touches, like the gallery wall and the plants, which make it feel like home.",
  },
  {
    name: "Bedroom",
    images: [
      "assets/images/ikea-bedroom.png",
      "assets/images/ikea-pillow-cover.png",
    ],
    description:
      "This bedroom is a dream for anyone who loves to sleep in. The large bed is perfect for lazy Sundays and the open wardrobe makes it easy to find your favourite clothes. The room is filled with personal touches, like the gallery wall and the plants, which make it feel like home.",
  },
];

function next() {
  index++;
  if (index >= showrooms.length) {
    index = 0;
  }
  updateShowroom();
}

function previous() {
  index--;
  if (index < 0) {
    index = showrooms.length - 1;
  }
  updateShowroom();
}

function updateShowroom() {
  var h2 = document.getElementById("showroom-name");
  h2.innerText = showrooms[index].name;

  var sr = document.getElementById("showroom");
  sr.style.backgroundImage = `url(${showrooms[index].images[0]})`;

  var featuredImage = document.getElementById("featured-image");
  featuredImage.src = showrooms[index].images[1];

  var p = document.getElementById("showroom-desc");
  p.innerText = showrooms[index].description;
}

function updateInfoBar() {
  var infoBar = document.getElementById("info-bar");
  let width = window.innerWidth;
  if (width > 850) {
    infoBar.style.height = "20%";
    return;
  }
  let height = window.innerHeight;
  let image_height = (width / 16) * 9;
  infoBar.style.height = `${height - image_height}px`;
}
// bind to onresize event
window.onresize = updateInfoBar;
