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
            case MessageTypes.GetLongestChainRequest  : return this.handleGetLongestChainRequest(sender,message);
            case MessageTypes.GetLongestChainResponse : return this.handleGetLongestChainResponse(sender,message);
            case MessageTypes.NewBlockRequest         : return this.handleAddTransactionsRequest(sender,message);
            case MessageTypes.NewBlockAnnouncement    : return this.handleNewBlockAnnouncement(sender,message);
            default: {
                console.log(`Received message of unknown type: "${message.type}"`);
            }
        }
    }
    
    private handleGetLongestChainRequest(requestor: WebSocket, message: Message): void {
        //if client has more than one node
        if(this.clientIsNotAlone){
            //stores the client's request using the correlationId as key
            this.receivedMessagesAwaitingResponse.set(message.correlationId, requestor);
            //map accumulates replies from clients 
            this.sentMessagesAwaitingReply.set(message.correlationId, new Map());
            //broadcasts the message to other nodes, requesting their longest chain
            this.broadcastExcept(requestor,message);
        }/* if client only has one node*/else{
            this.replyTo(requestor,{
                type: MessageTypes.GetLongestChainResponse,
                correlationId: message.correlationId,
                //no longest chains in a single-node blockchain 
                payload: []
            });
        }
    }

    private handleGetLongestChainResponse(sender: WebSocket, message: Message): void{
        //find the client that requested longest chain 
        if(this.receivedMessagesAwaitingResponse.has(message.correlationId)){
            //gets the referece to cliets socket object 
            const requestor = this.receivedMessagesAwaitingResponse.get(message.correlationId);

            if(this.everyoneReplied(sender,message)){
                //set of replies from nodes
                const allReplies = this.sentMessagesAwaitingReply.get(message.correlationId).values();
                //finds the longest chain by turning the above into array and use reduce method
                const longestChain = Array.from(allReplies).reduce(this.selectTheLongestChain);
                //send the longest chain to the client that requested it
                this.replyTo(requestor, longestChain);
            }
        }
    }

    //a node has started mining, send message to invite other node to do the same
    private handleAddTransactionsRequest(requestor:WebSocket, message: Message): void{
        this.broadcastExcept(requestor,message);
    }

    //mining is completed, sending message to other nodes
    private handleNewBlockAnnouncement(requestor:WebSocket, message:Message): void{
        this.broadcastExcept(requestor,message);
    }

    //chechs if every node replied to the request
    private everyoneReplied(sender:WebSocket, message: Message): boolean{
        const repliedClients = this.sentMessagesAwaitingReply
                .get(message.correlationId)
                .set(sender,message);

        const awaitingForClients = Array.from(this.clients).filter(c => !repliedClients.has(c));

        //have all nodes except the orogginal requestor replied
        return awaitingForClients.length === 1;
    }

    //used while reducing the array of longest chains 
    private selectTheLongestChain(currentlyLongest: Message, current: Message, index: number){
        return index > 0 && current.payload.length > currentlyLongest.payload.length ? current : currentlyLongest;
    }

    //check if there is more than one node in blockchain
    private get clientIsNotAlone(): boolean{
        return this.clients.size > 1;
    }
}