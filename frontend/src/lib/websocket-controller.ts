import { Block, Transaction } from './blockchain-node';
import { uuid } from './cryptography';
import { Message, MessageTypes, UUID } from './messages';

//describes the type of object we are storing in messagesAwaitingReply map
interface PromiseExecutor<T> {
    resolve: (value?: T | PromiseLike<T>) => void;
    reject: (reason?: any) => void;
}  

export class WebsocketController{
    private websocket!: Promise<WebSocket>;
    private messagesCallback!: (messages: Message) => void;
    //store a messages correalation ID when its sent, executor knows which client is waiting for response
    private readonly messagesAwaitingReply = new Map<UUID, PromiseExecutor<Message>>();

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
            //assigns callbacks to websocket messages
            ws.addEventListener('open', () => resolve(ws));
            ws.addEventListener('error', err => reject(err));
            ws.addEventListener('message', this.onMessageReceived);
        });
    }

    //disconnect from server
    disconnect(){
        this.websocket.then(ws=>ws.close());
    }

    //handle incomming massages
    private readonly onMessageReceived = (event: MessageEvent) => {
        //deserialize message
        const message = JSON.parse(event.data) as Message;

        //check correalationID, returns true if message is response to another message
        if(this.messagesAwaitingReply.has(message.correlationId)){
            this.messagesAwaitingReply.get(message.correlationId)!.resolve(message);
            this.messagesAwaitingReply.delete(message.correlationId);
        }else{
            this.messagesCallback(message);
        }
    }

    /*
    async send(message: Partial<Message>, awaitForReply: boolean = false): Promise<Message> {
        return new Promise<Message>(async (resolve, reject) => {
          if (awaitForReply) {
              //stores messages that needs response 
            this.messagesAwaitingReply.set(message.correlationId!, { resolve, reject });
          }
          this.websocket.then(
            ws => ws.send(JSON.stringify(message)),
            () => this.messagesAwaitingReply.delete(message.correlationId!)
          );
        });
    }
    

    //SEND DIFFERENT TYPES OF MESSAGES 

    //get longest chain
    //return payload from reponse
    async requestLongestChain(): Promise<Block[]> {
        //call send mEthod and waits for response 
        const reply = await this.send({
            //first argument = message object 
          type: MessageTypes.GetLongestChainRequest,
          correlationId: uuid()
          //true= waiting for reply 
        }, true);
        return reply.payload;
    }

    //when a node start mining it sends message to invite other node to do the same
    //doesn't need a response 
    requestNewBlock(transactions: Transaction[]): void {
        this.send({
          type: MessageTypes.NewBlockRequest,
          correlationId: uuid(),
          payload: transactions
        });
    }

    //tells that mining is complete by sending message to other nodes and its block becomes candidate for adding to blockchain
    //doesn't need a response
    announceNewBlock(block: Block): void {
        this.send({
          type: MessageTypes.NewBlockAnnouncement,
          correlationId: uuid(),
          payload: block
        });
    }
    */
}