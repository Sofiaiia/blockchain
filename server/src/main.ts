import * as express from 'express';
import * as http from 'http';
import * as WebSocket from 'ws';
import { BlockchainServer } from './blockchain-server';

//porten som ska användas
const PORT = 3000;
//express används 
const app = express();

//app listen to port 3000 and when its's started print it in console
const httpServer: http.Server = app.listen(PORT, () => {
    if(process.env.NODE_ENV !== 'production'){
        console.log(`Listening on http://localhost:${PORT}`);
    }
});

//start webserver
const wsServer = new WebSocket.Server({server: httpServer});
//start the blockchain server 
new BlockchainServer(wsServer); 