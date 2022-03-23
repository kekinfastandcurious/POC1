const http = require('http');
const fs = require('fs');

const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

function send404(response) {
    response.writeHead(404, {'Content-Type': 'text/plain'});
    response.end('404 Requested resource not found!');
}

function getCurrentDateTime(selectedDay) {
    const dateTimeObj = new Date();
    const hours = dateTimeObj.getHours();
    const minutes = dateTimeObj.getMinutes();
    const seconds = dateTimeObj.getSeconds();

    const index = daysOfWeek.map(d=>d.toLowerCase())
                    .findIndex(day => selectedDay.includes(day));

    const currentTimeStr = `${daysOfWeek[index]}, ${hours}:${minutes}:${seconds}`;                
    return currentTimeStr;        
}

const server = http.createServer((req, res) => {

    if (req.url === '/'){
        res.writeHead(200, {'Content-Type': 'text/html'});
        fs.readFile('./UI/index.html', (err, content) => {
            res.end(content);
        });
    }
    else if(req.url === '/index.css') {
        res.writeHead(200, {'Content-Type': 'text/css'});
        fs.readFile('./UI/index.css', (err, fileContent) => {
            res.end(fileContent);
        });
    }
    else if(daysOfWeek.map(d=>`/${d.toLowerCase()}`).includes(req.url)) {
        res.writeHead(200, {'Content-Type': 'text/plain'});
        const currentDateTime = getCurrentDateTime(req.url);
        res.write(`${currentDateTime}`);
        res.end();
    }
}).listen(8080);