const http = require('http'); // Imports the Node.js http module.
const fs = require('fs');   // Imports the Node.js file system module.
const path = require('path'); // Imports the Node.js path module for handling file paths.

const PORT = 3000;

// Create the server
const server = http.createServer((req, res) => {
  console.log(`Request made for URL: ${req.url}`);
  let filePath = '';
    
    if (req.url === '/' || req.url === '/home') {
        filePath = 'index.html';
    } else if (req.url === '/about') {
        filePath = path.join(__dirname, 'about.html');
    } else {
        filePath = path.join(__dirname, '404.html');
    }

    fs.readFile(filePath, (err, data) => {
    if (err) {
        // Handle file not found or permission errors
        res.writeHead(500, { 'Content-Type': 'text/plain' });
        res.end('Server Error: Could not load the page.');
        return;
    }
    
    // 3. Send the HTML content to the browser
    res.writeHead(req.url === '/about' || req.url === '/' ? 200 : 404, { 
        'Content-Type': 'text/html' 
    });
    res.end(data);
});
});

// Start the server
server.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}/`);
});