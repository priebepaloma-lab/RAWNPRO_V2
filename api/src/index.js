// Minimal placeholder server entry (for future use)
const http = require('http');

const server = http.createServer((req, res) => {
  if (req.url === '/api/chat') {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ message: 'Chat endpoint placeholder' }));
    return;
  }
  res.writeHead(404);
  res.end();
});

const PORT = process.env.PORT || 4000;
server.listen(PORT, () => {
  console.log(`API placeholder listening on http://localhost:${PORT}`);
});
