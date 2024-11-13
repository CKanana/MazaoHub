const http = require('http');
const fs = require('fs');

const server = http.createServer((req, res) => {
    if (req.method === 'POST') {
        let mpesaResponse = '';

        // Read the incoming data
        req.on('data', chunk => {
            mpesaResponse += chunk;
        });

        req.on('end', () => {
            // Log the response to a file
            const logFile = 'M_PESAConfirmationResponse.txt';
            fs.appendFile(logFile, mpesaResponse + '\n', err => {
                if (err) {
                    console.error('Error writing to log file:', err);
                }
            });

            // Send response
            res.writeHead(200, { 'Content-Type': 'application/json' });
            const response = {
                ResultCode: 0,
                ResultDesc: "Confirmation Received Successfully"
            };
            res.end(JSON.stringify(response));
        });
    } else {
        res.writeHead(405, { 'Content-Type': 'text/plain' });
        res.end('Method Not Allowed');
    }
});

server.listen(8000, () => {
    console.log('Server listening on port 8000');
});