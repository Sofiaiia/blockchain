import * as WebSocket from 'ws';
import { MessageServer } from './message-server';
import { Message, MessageTypes, UUID } from './messages';

type Replies = Map<WebSocket, Message>;

export class BlockchainServer extends MessageServer<Message>{

    protected handleMessage(sender: WebSocket, message: Message): void {
        switch(message.type){

        }
    }
    
    private handleGetLongestChainRequest(requestor: WebSocket, message: Message): void {

    }

    private handleGetLongestChainResponse(sender: WebSocket, message: Message): void{

    }

    private handleAddTransactionsRequest(requestor:WebSocket, message: Message): void{

    }

    private handleNewBlockAnnouncement(requestor:WebSocket, message:Message): void{

    }

    private everyoneReplied(sender:WebSocket, message: Message): boolean{

    }

    private selectTheLongestChain(currentlyLongest: Message, current: Message, index: number){

    }

    private get clientIsNotAlone(): boolean{
        
    }
}