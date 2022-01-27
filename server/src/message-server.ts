import * as WebSocket from 'ws';

export abstract class MessageServer<T>{
    constructor(private readonly wsServer: WebSocket.Server){
        this.wsServer.on('connection', this.subscribeToMessages);
        this.wsServer.on('error',this.cleanupDeadClients);
    }

    protected readonly subscribeToMessages = (ws: WebSocket): void => {

    };

    private readonly cleanupDeadClients = (): void => {

    };

    protected abstract handleMessage(sender: WebSocket, message: T): void;

    protected broadcastExcept(currentClient: WebSocket, message: Readonly<T>) : void{

    }

    protected replyTo(client: WebSocket, message: Readonly<T>): void{

    }

    protected get clients(): Set<WebSocket>{

    }

    private isAlive(client: WebSocket): boolean{

    }

    private isDead(client: WebSocket): boolean {
        
    }
}