//alias type for UUID
export type UUID = string;

//custom message type
export interface Message{
    correlationId: UUID;
    type: string;
    //optional
    payload?: any;
}

//set of constants 
export enum MessageTypes{
    //find the longest chain
    GetLongestChainRequest = 'GET_LONGEST_CHAIN_REQUEST',
    //get the longest chain 
    GetLongestChainResponse = 'GET_LONGEST_CHAIN_RESPONSE',
    //when a node start mining it sends message to invite other node to do the same
    NewBlockRequest         = 'NEW_BLOCK_REQUEST',
    //tells that mining is complete by sending message to other nodes and its block becomes candidate for adding to blockchain
    NewBlockAnnouncement    = 'NEW_BLOCK_ANNOUNCEMENT'
}