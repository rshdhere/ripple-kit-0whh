# Flappy Bird Game

This project implements a simple Flappy Bird game using Node.js and HTML5 Canvas. The game logic is handled in the client-side JavaScript, while the server provides a health check endpoint.

## Endpoints
- **GET /**: Serves the game UI.
- **GET /health**: Returns a JSON response indicating the server is running.

## How to Run
1. Install dependencies using `bun install`.
2. Start the server with `bun src/index.js`.
3. Open your browser and navigate to `http://localhost:3000`.