import { Block, Transaction } from './blockchain-node';
import { uuid } from './cryptography';
import { Message, MessageTypes, UUID } from './messages';

interface PromiseExecutor<T>{
    resolve: (value?: T | PromiseLike<T>) => void;
    reject: (reason?: any) => void;
}

export class WebsocketController{
    private websocket!: Promise<WebSocket>;
    private messagesCallback!: (messages: Message) => void;
    private readonly messagesAwitingReply = new Map<UUID, PromiseExecutor<Message>>();

    //URL to server 
    private get url(): string{
        const protocol = window.location.protocol === 'https:' ? 'wws' : 'ws';
        const hostname = process.env.VUE_APP_WS_PROXY_HOSTNAME || window.location.host; 
        return `${protocol}://${hostname}`;
    }

    //connect to server 
    connect(messagesCallback: (messages: Message)=> void): Promise<WebSocket>{
        this.messagesCallback = messagesCallback;
        return this.websocket = new Promise((resolve,reject) => {
            const ws = new WebSocket(this.url);
            ws.addEventListener('open', () => resolve(ws));
            ws.addEventListener('error', err => reject(err));
            ws.addEventListener('message', this.onMessageReceived);
        });
    }

    //disconnect from server
    disconnect(){
        this.websocket.then(ws=>ws.close());
    }

    private readonly onMessageReceived = (event: MessageEvent) => {

    }

    async send(message: Partial<Message>, awaitForReply: boolean = false): Promise<Message> {

    }

    async requestLongestChain(): Promise<Block[]> {

    }

    requestNewBlock(transactions: Transaction[]): void {

    }

    announceNewBlock(block: Block): void {

    }
}