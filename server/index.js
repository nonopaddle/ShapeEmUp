import http from 'http';
import express from 'express';

const app = express();
const httpServer = http.createServer( app );

let port = process.env.PORT;
if(port == undefined) port = 8000;
httpServer.listen(port, () => {
    console.log(`Server running at http://localhost:${port}/`);
});

app.use(express.static('client/public'));
