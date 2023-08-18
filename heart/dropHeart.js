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

  createHearts(numberHeart); // Số lượng trái tim rơi
  animate();