const http = require('http');
const fs = require('fs');
const path = require('path');

const hostname = '127.0.0.1';
const port = 3000;

const server = http.createServer((req, res) => {
    let filePath;
    let content_type;

    console.log("Request received from: ", req.url)

    const req_type = req.url.toString().split('.').at(-1)
    console.log("Switching: ", req_type)
    switch (req_type) {
      case "/":
        filePath = path.join(__dirname, `html/index.html`);
        content_type = "text/html"
        break;
      case "ico":
        filePath = path.join(__dirname, `images${req.url}`);
        content_type = "image/x-icon";
        break;
      case "js":
        filePath = path.join(__dirname, `js${req.url}`);
        content_type = 'text/javascript';
        break;
      case 'css':
        filePath = path.join(__dirname, `css${req.url}`);
        content_type = 'text/css';
        break;
    }
    
    fs.readFile(filePath, (err, data) => {
        if (err) {
            res.statusCode = 500;
            res.end('Error loading index.html');
        } else {
            res.statusCode = 200;
            res.setHeader('Content-Type', content_type);
            res.end(data);
        }
    });
});

server.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
});