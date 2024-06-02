
const canvas = document.querySelector("canvas");
const stutterLinks = document.querySelectorAll(".stutter-item");

canvas.width = window.innerWidth * 2;
canvas.height = window.innerHeight * 2;

canvas.style.width = `${window.innerWidth}px`;
canvas.style.height = `${window.innerHeight}px`;

const context = canvas.getContext("2d");
context.scale(2, 2);

let goalX = null;
let goalY = null;
let mouseX = null;
let mouseY = null;

let newImage;
let newWidth;
let newHeight;

stutterLinks.forEach((link) => {
  const imageSource = link.getElementsByTagName("img")[0].src;

  link.addEventListener("mouseenter", () => {
    const image = document.createElement("img");
    image.src = imageSource;
    newImage = image;
    newWidth = 300;
    newHeight = 300;
  });

  link.addEventListener("mouseleave", () => {
    newWidth = 0;
    newHeight = 0;

    context.clearRect(0, 0, window.innerWidth, window.innerHeight);
  });
});

document.addEventListener("mousemove", (event) => {
  goalX = event.pageX;
  goalY = event.pageY;
  if (mouseX === null) {
    mouseX = event.pageX;
    mouseY = event.pageY;
  }
});

const stutter = () => {
  if (mouseX) {
    if (newImage) {
      context.drawImage(
        newImage,
        mouseX - 0.5 * newWidth,
        mouseY - 0.5 * newHeight,
        newWidth,
        newHeight
      );
    }

    mouseX = mouseX + (goalX - mouseX) * 0.1;
    mouseY = mouseY + (goalY - mouseY) * 0.1;
  }

  requestAnimationFrame(stutter);
};

stutter();
