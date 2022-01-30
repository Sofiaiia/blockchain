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

    private get url(): string{

    }

    connect(messagesCallback: (messages: Message)=> void): Promise<WebSocket>{

    }

    disconnect(){

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