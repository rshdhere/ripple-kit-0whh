const http = require('http');

const port = Number(process.env.PORT || 3000);

const server = http.createServer((req, res) => {
  const url = new URL(req.url || '/', 'http://127.0.0.1');
  if (url.pathname === '/health') {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ ok: true }));
    return;
  }
  // Flappy Bird Game UI
  res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
  res.end(`<!doctype html>\n<html lang=\"en\">\n<head>\n    <meta charset=\"UTF-8\">\n    <meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\">\n    <title>Flappy Bird</title>\n    <style>\n        body { margin: 0; display: flex; justify-content: center; align-items: center; height: 100vh; background-color: #70c5ce; overflow: hidden; }\n        canvas { border: 2px solid #000; }\n    </style>\n</head>\n<body>\n    <canvas id=\"gameCanvas\" width=\"320\" height=\"480\"></canvas>\n    <script>\n        const canvas = document.getElementById('gameCanvas');\n        const context = canvas.getContext('2d');\n\n        // Game variables\n        let birdY = 150;\n        const gravity = 0.6;\n        let jumpStrength = -10;\n        let isJumping = false;\n\n        // Game loop\n        function gameLoop() {\n            context.clearRect(0, 0, canvas.width, canvas.height);\n            context.fillStyle = '#FFCC00';\n            context.fillRect(50, birdY, 30, 30); // Draw bird\n            if (isJumping) {\n                birdY += jumpStrength;\n                jumpStrength += gravity;\n            } else {\n                birdY += gravity;\n            }\n            requestAnimationFrame(gameLoop);\n        }\n\n        // Jump on click\n        window.addEventListener('click', () => {\n            isJumping = true;\n            jumpStrength = -10;\n        });\n\n        gameLoop();\n    </script>\n</body>\n</html>`);
});

server.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
