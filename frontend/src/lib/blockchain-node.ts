import { sha256 } from './cryptography';

const HASH_REQUIREMENT = '0000';

export interface Transaction{
    readonly sender: string;
    readonly recipient: string;
    readonly amount: number;
}

export interface Block{
    readonly hash: string;
    readonly nonce: number;
    readonly previousHash: string;
    readonly timestamp: number;
    readonly transactions: Transaction[];
}

export type Omit<T, K> = Pick<T, Exclude<keyof T, K>>;
export type WithoutHash<T> = Omit<T, 'hash'>;
export type NotMinedBlock = Omit<Block, 'hash' | 'nonce'>;

export class BlockchainNode{
    private _chain: Block[] = [];
    private _pendingTransactions: Transaction[] = [];
    private _isMining = false;

    //initialize with existing blocks
    initializeWith(blocks: Block[]): void{
        this._chain = [...blocks];
    }

    //initialize but does not have blocks from before, creating a block as genesis block instead 
    async initializeWithGenesisBlock(): Promise<void>{
        const genesisBlock = await this.mineBlock({previousHash: '0', timestamp: Date.now(), transactions:[]});
        this._chain.push(genesisBlock);
    }

    //calculate a hash that startswith 4x'0'
    async mineBlock(block:NotMinedBlock): Promise<Block>{
        this._isMining = true;
        let hash = '';
        let nonce = 0;

        //calling calculateHash function untill hash starts with '0000', evey time increase the nonce
        do{
            //increasing nonce every time it starts over 
            hash = await this.calculateHash({...block,nonce: ++nonce})
        }while(!hash.startsWith(HASH_REQUIREMENT));

        this._isMining = false;
        this._pendingTransactions = [];

        return {...block,hash,nonce};
    }

    //KOLLA när denna anropas 
    async mineBlockWith(transactions: Transaction[]): Promise<Block>{
        const block = {previousHash: this.latestBlock.hash, timestamp: Date.now(), transactions};
        return this.mineBlock(block);
    }

    //push new transaction to the array of pending transactions
    addTransaction(transaction: Transaction): void{
        this._pendingTransactions.push(transaction);
    }

    //Tries to add new block to blockchain, also have errorhandling
    async addBlock(newBlock: Block): Promise<void>{
        //line that goes before error message
        const errorMessagePrefix = `⚠️ Block "${newBlock.hash.substr(0, 8)}" is rejected`;

        //find block after which new block should be 
        const previousBlockIndex = this._chain.findIndex(b => b.hash === newBlock.previousHash);
        if(previousBlockIndex < 0){
            throw new Error(`${errorMessagePrefix} - there is no block in the chain with the specified previous hash "${newBlock.previousHash.substr(0, 8)}".`);
        }

        //LONGEST CHAIN RULE
        // The current node may already have one or more blocks generated (or received from other nodes in the network),
        // after the one we attempt to add. In this case the longest chain takes precedence and the new block is rejected.
        const tail = this._chain.slice(previousBlockIndex + 1);
        if(tail.length >= 1){
            throw new Error(`${errorMessagePrefix} - the longer tail of the current node takes precedence over the new block.`);
        }

        //check hash of the new block against hash of previous block 
        const newBlockHash = await this.calculateHash(newBlock);
        const previousBlockHash = this._chain[previousBlockIndex].hash;
        const newBlockValid = ( newBlockHash.startsWith(HASH_REQUIREMENT) && newBlock.previousHash === previousBlockHash && newBlock.hash === newBlockHash);
        if(!newBlockValid){
            throw new Error(`${errorMessagePrefix} - hash verification has failed.`);
        }

        //add new block to the end of the chain 
        this._chain = [...this._chain,newBlock];
    }

    //calculate hash together with sha-256 function
    private async calculateHash(block: WithoutHash<Block>): Promise<string>{
        const data = block.previousHash + block.timestamp + JSON.stringify(block.transactions) + block.nonce;
        return sha256(data);
    }

    //GETTERS

    //getter, check if block is mining
    get isMining(): boolean{
        return this._isMining;
    }

    //get all blocks in chain 
    get chain(): Block[]{
        return [...this._chain];
    }

    //getter, check if chain is empty 
    get chainIsEmpty(): boolean{
        return this._chain.length === 0;
    }

    //get latest block in chain
    get latestBlock(): Block{
        return this._chain[this._chain.length - 1];
    }

    //get all pending transactions
    get pendingTransactions(): Transaction[]{
        return [...this._pendingTransactions]
    }

    //getter, check if there are pending transactions
    get hasPendingTransactions(): boolean{
        return this.pendingTransactions.length > 0;
    }

    //getter, check if pening transactios is empty 
    get noPendingTransactions(): boolean{
        return this.pendingTransactions.length === 0;
    }
}
    //vad används denna till??
    export function randomDelay(maxMilliseconds:number = 100): Promise<void>{
        return new Promise((resolve) =>{
            setTimeout(()=> resolve(), Math.floor(Math.random() * Math.floor(maxMilliseconds)));
        });
    }
