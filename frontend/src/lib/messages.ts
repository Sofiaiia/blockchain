//samma som finns i server filen 

//alias type for UUID
export type UUID = string;

//custom message type
export interface Message {
  correlationId: UUID;
  type: string;
  //optional
  payload?: any;
}

//set of constants
export enum MessageTypes {
  GetLongestChainRequest  = 'GET_LONGEST_CHAIN_REQUEST',
  GetLongestChainResponse = 'GET_LONGEST_CHAIN_RESPONSE',
  NewBlockRequest         = 'NEW_BLOCK_REQUEST',
  NewBlockAnnouncement    = 'NEW_BLOCK_ANNOUNCEMENT'
}