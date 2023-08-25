var slideIndex = 0;
var currentSlideIndex = 0;
var slideArray = [];
var listImage = ["../image/13662403df40419741a2858e38135a5c.jpg",
  "../image/568603cbd1860c67bf8f6776cbe7f885.jpg",
  "../image/Hinh-anh-binh-yen-nhat.jpg"
]

function Slide(title, subtitle, background) {
  this.title = title;
  this.subtitle = subtitle;
  this.background = background;
  this.id = "slide" + slideIndex;
  slideIndex++;
  slideArray.push(this);
}
for (let i in listImage) {
  new Slide(
    `Tiến Chương
    <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 512 512">
      <style>svg{fill:#FF0000}</style>
      <path d="M225.8 468.2l-2.5-2.3L48.1 303.2C17.4 274.7 0 234.7 0 192.8v-3.3c0-70.4 50-130.8 119.2-144C158.6 37.9 198.9 47 231 69.6c9 6.4 17.4 13.8 25 22.3c4.2-4.8 8.7-9.2 13.5-13.3c3.7-3.2 7.5-6.2 11.5-9c0 0 0 0 0 0C313.1 47 353.4 37.9 392.8 45.4C462 58.6 512 119.1 512 189.5v3.3c0 41.9-17.4 81.9-48.1 110.4L288.7 465.9l-2.5 2.3c-8.2 7.6-19 11.9-30.2 11.9s-22-4.2-30.2-11.9zM239.1 145c-.4-.3-.7-.7-1-1.1l-17.8-20c0 0-.1-.1-.1-.1c0 0 0 0 0 0c-23.1-25.9-58-37.7-92-31.2C81.6 101.5 48 142.1 48 189.5v3.3c0 28.5 11.9 55.8 32.8 75.2L256 430.7 431.2 268c20.9-19.4 32.8-46.7 32.8-75.2v-3.3c0-47.3-33.6-88-80.1-96.9c-34-6.5-69 5.4-92 31.2c0 0 0 0-.1 .1s0 0-.1 .1l-17.8 20c-.3 .4-.7 .7-1 1.1c-4.5 4.5-10.6 7-16.9 7s-12.4-2.5-16.9-7z"/>
    </svg> 
    Thục Đoan`,
    `24/10/2023`,
    listImage[i]
  )
}

function buildSlider() {
  var myHTML;
  for (var i = 0; i < slideArray.length; i++) {
    myHTML +=
      "<div id='" +
      slideArray[i].id +
      "' class='singleSlide' style='background-image:url(" +
      slideArray[i].background +
      ");'>" +
      "<h1 style='font-family:Pacifico, cursive;'>" +
      slideArray[i].title +
      "</h1>" +
      "<h4 style='font-family:Pacifico, cursive;'>" +
      slideArray[i].subtitle +
      "</h4>" +
      "</div>";
  }
  document.getElementById("mySlider").innerHTML = myHTML;
  document.getElementById("slide" + currentSlideIndex).style.left = 0;
}

buildSlider();

function prevSlide() {
  var nextSlideIndex = (currentSlideIndex === 0) ? slideArray.length - 1 : currentSlideIndex - 1;
  document.getElementById("slide" + nextSlideIndex).style.left = "-100%";
  document.getElementById("slide" + currentSlideIndex).style.left = 0;
  document
    .getElementById("slide" + nextSlideIndex)
    .setAttribute("class", "singleSlide slideInLeft");
  document
    .getElementById("slide" + currentSlideIndex)
    .setAttribute("class", "singleSlide slideOutRight");
  currentSlideIndex = nextSlideIndex;
}
function nextSlide() {
  var nextSlideIndex = (currentSlideIndex === slideArray.length - 1) ? 0 : currentSlideIndex + 1;

  document.getElementById("slide" + nextSlideIndex).style.left = "100%";
  document.getElementById("slide" + currentSlideIndex).style.left = 0;

  document
    .getElementById("slide" + nextSlideIndex)
    .setAttribute("class", "singleSlide slideInRight");
  document
    .getElementById("slide" + currentSlideIndex)
    .setAttribute("class", "singleSlide slideOutLeft");

  currentSlideIndex = nextSlideIndex;
}
setInterval(() => nextSlide(), 5000)

// canvas heart overlay
const canvas = document.getElementById('falling-hearts');
const ctx = canvas.getContext('2d');
let numberHeart = 10;

function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}

window.addEventListener('resize', resizeCanvas);
resizeCanvas();

const heartWidth = 15 + 0.005 * canvas.width;
const heartHeight = 15 + 0.005 * canvas.width;

const hearts = [];

class Heart {
  constructor() {
    this.x = Math.random() * canvas.width;
    this.y = -heartHeight;
    this.speedX = 1 + Math.random() * heartWidth / 12;
    this.speedY = 1 + Math.random() * heartHeight / 12;
    this.rotation = Math.random() * 360;
    this.rotationSpeed = Math.random() * 2;
    this.colorHeart = `rgb(${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)})`
  }

  update() {
    this.x -= this.speedX;
    this.y += this.speedY;
    this.rotation += this.rotationSpeed;

    if (this.y > canvas.height) {
      this.y = -heartHeight;
      this.x = Math.random() * canvas.width;
    }
  }

  draw() {
    ctx.save();
    ctx.translate(this.x, this.y);
    ctx.rotate((this.rotation * Math.PI) / 180);
    ctx.fillStyle = this.colorHeart;

    ctx.beginPath();
    ctx.moveTo(0, -heartHeight / 2);
    ctx.bezierCurveTo(heartWidth * 0.8, -heartHeight, heartWidth, -heartHeight / 5, 0, heartHeight * 0.6);
    ctx.closePath();
    ctx.fill();

    ctx.beginPath();
    ctx.moveTo(0, -heartHeight / 2);
    ctx.bezierCurveTo(-heartWidth * 0.8, -heartHeight, -heartWidth, -heartHeight / 5, 0, heartHeight * 0.6);
    ctx.closePath();
    ctx.fill();

    ctx.restore();
  }
}

function createHearts(numHearts) {
  for (let i = 0; i < numHearts; i++) {
    hearts.push(new Heart());
  }
}

function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  for (const heart of hearts) {
    heart.update();
    heart.draw();
  }
  requestAnimationFrame(animate);
}

createHearts(numberHeart);
animate();