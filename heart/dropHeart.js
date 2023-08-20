var slideIndex = 0;
var currentSlideIndex = 0;
var slideArray = [];

function Slide(title, subtitle, background) {
  this.title = title;
  this.subtitle = subtitle;
  this.background = background;
  this.id = "slide" + slideIndex;
  slideIndex++;
  slideArray.push(this);
}
var walkingDead = new Slide(
  "Tiến Chương * Thục Đoan",
  "24/10/2023",
  "../image/13662403df40419741a2858e38135a5c.jpg"
);

var bigBang = new Slide(
  "Tiến Chương * Thục Đoan",
  "24/10/2023",
  "../image/568603cbd1860c67bf8f6776cbe7f885.jpg"
);

var LastMan = new Slide(
  "Tiến Chương * Thục Đoan",
  "24/10/2023",
  "../image/Hinh-anh-binh-yen-nhat.jpg"
);

function buildSlider() {
  var myHTML;
  for (var i = 0; i < slideArray.length; i++) {
    myHTML +=
      "<div id='" +
      slideArray[i].id +
      "' class='singleSlide' style='background-image:url(" +
      slideArray[i].background +
      ");'>" +
      "<h1>" +
      slideArray[i].title +
      "</h1>" +
      "<h4>" +
      slideArray[i].subtitle +
      "</h4>" +
      "</div>";
  }
  document.getElementById("mySlider").innerHTML = myHTML;
  document.getElementById("slide" + currentSlideIndex).style.left = 0;
}

buildSlider();

function prevSlide() {
  var nextSlideIndex;
  if (currentSlideIndex === 0) {
    nextSlideIndex = slideArray.length - 1;
  } else {
    nextSlideIndex = currentSlideIndex - 1;
  }
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
  var nextSlideIndex;
  if (currentSlideIndex === slideArray.length - 1) {
    nextSlideIndex = 0;
  } else {
    nextSlideIndex = currentSlideIndex + 1;
  }

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
setInterval(()=> nextSlide(), 5000)

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