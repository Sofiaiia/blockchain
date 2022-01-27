import * as WebSocket from 'ws';
import { MessageServer } from './message-server';
import { Message, MessageTypes, UUID } from './messages';

type Replies = Map<WebSocket, Message>;

export class BlockchainServer extends MessageServer<Message>{
    
}