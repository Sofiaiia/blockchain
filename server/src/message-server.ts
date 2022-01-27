import * as WebSocket from 'ws';

export abstract class MessageServer<T>{
    constructor(private readonly wsServer: WebSocket.Server){
        //subscribe to new connected clients messages
        this.wsServer.on('connection', this.subscribeToMessages);
        //clean up disconnected clients 
        this.wsServer.on('error',this.cleanupDeadClients);
    }

    
    protected readonly subscribeToMessages = (ws: WebSocket): void => {
        //message from client arrives 
        ws.on('message',(data:WebSocket.Data) => {
            if(typeof data === 'string'){
                //send message to handler 
                this.handleMessage(ws,JSON.parse(data));
            }else{
                //if message type doesn't exist in message enum 
                console.log('Recieved data of unsupported type!')
            }
        });
    };

    //removes disconnected clients
    private readonly cleanupDeadClients = (): void => {
        this.wsServer.clients.forEach(client => {
            if(this.isDead(client)){
                this.wsServer.clients.delete(client);
            }
        });
    };

    //implementation in blockchain-server file = function abstract 
    protected abstract handleMessage(sender: WebSocket, message: T): void;

    protected broadcastExcept(currentClient: WebSocket, message: Readonly<T>) : void{
        this.wsServer.clients.forEach(client => {
            if(this.isAlive(client) && client !== currentClient){
                client.send(JSON.stringify(message));
            }
        });
    }

    //send message to a single node 
    protected replyTo(client: WebSocket, message: Readonly<T>): void{
        client.send(JSON.stringify(message));
    }

    protected get clients(): Set<WebSocket>{
        return this.wsServer.clients;
    }

    private isAlive(client: WebSocket): boolean{
        return !this.isDead(client);
    }

    //check if a client is disconnected 
    private isDead(client: WebSocket): boolean {
        return(
            client.readyState === WebSocket.CLOSING ||
            client.readyState === WebSocket.CLOSED
        );
    }
}