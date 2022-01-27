import * as WebSocket from 'ws';
import { MessageServer } from './message-server';
import { Message, MessageTypes, UUID } from './messages';

//replies from blockchain nodes
type Replies = Map<WebSocket, Message>;

//class extends message server 
export class BlockchainServer extends MessageServer<Message>{

    //Collection of client messages waiting for response 
    private readonly receivedMessagesAwaitingResponse = new Map<UUID, WebSocket>();

    //Used as accumulator for replies from clients 
    private readonly sentMessagesAwaitingReply = new Map<UUID, Replies>(); 

    //Handler for all message types
    protected handleMessage(sender: WebSocket, message: Message): void {
        //switch based on message type, enum in message file 
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
        return index > 0 && current.payload.length > currentlyLongest.payload.length ? current : currentlyLongest;
    }

    private get clientIsNotAlone(): boolean{
        return this.clients.size > 1;
    }
}