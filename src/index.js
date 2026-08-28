const http = require("http");

const port = Number(process.env.PORT || 3000);

const server = http.createServer((req, res) => {
  const url = new URL(req.url || "/", "http://127.0.0.1");
  if (url.pathname === "/health") {
    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ ok: true }));
    return;
  }
  res.writeHead(200, { "Content-Type": "text/html; charset=utf-8" });
  res.end(`<!doctype html>\n<html lang="en">\n<head>\n  <meta charset="utf-8" />\n  <meta name="viewport" content="width=device-width, initial-scale=1" />\n  <title>Flappy Bird Game</title>\n  <style>\n    body { margin: 0; overflow: hidden; }\n    canvas { display: block; margin: auto; background: #70c5ce; }\n  </style>\n</head>\n<body>\n  <canvas id="gameCanvas" width="320" height="480"></canvas>\n  <script>\n    const canvas = document.getElementById('gameCanvas');\n    const ctx = canvas.getContext('2d');\n    const bird = { x: 50, y: 150, width: 20, height: 20, gravity: 0.6, lift: -15, velocity: 0 };\n    let pipes = [];\n    let frame = 0;\n\n    function drawBird() {\n      ctx.fillStyle = 'yellow';\n      ctx.fillRect(bird.x, bird.y, bird.width, bird.height);\n    }\n\n    function addPipe() {\n      const pipeHeight = Math.random() * (canvas.height - 20);\n      pipes.push({ x: canvas.width, height: pipeHeight });\n    }\n\n    function drawPipes() {\n      ctx.fillStyle = 'green';\n      pipes.forEach(pipe => {\n        ctx.fillRect(pipe.x, 0, 20, pipe.height);\n        ctx.fillRect(pipe.x, pipe.height + 100, 20, canvas.height - pipe.height - 100);\n      });\n    }\n\n    function updateGame() {\n      ctx.clearRect(0, 0, canvas.width, canvas.height);\n      drawBird();\n      drawPipes();\n      bird.velocity += bird.gravity;\n      bird.y += bird.velocity;\n\n      if (frame % 75 === 0) addPipe();\n      pipes.forEach(pipe => {\n        pipe.x -= 2;\n      });\n      frame++;\n    }\n\n    document.addEventListener('keydown', () => {\n      bird.velocity += bird.lift;\n    });\n\n    setInterval(updateGame, 1000 / 60);\n  <\/script>\n</body>\n</html>`);
});

server.listen(port, "0.0.0.0", () => {
  console.log("listening on :" + port);
});
