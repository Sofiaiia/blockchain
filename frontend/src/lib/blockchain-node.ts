//import { sha256 } from './cryptography';

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

    initializeWith(blocks: Block[]): void{
        this._chain = [...blocks];
    }

    async initializeWithGenesisBlock(): Promise<void>{
        const genesisBlock = await this.mineBlock({previousHash: '0', timestamp: Date.now(), transactions:[]});
        this._chain.push(genesisBlock);
    }

    async mineBlock(block:NotMinedBlock): Promise<Block>{
        this._isMining = true;
        let hash = '';
        let nonce = 0;

        do{
            hash = await this.calculateHash({...block,nonce: ++nonce})
        }while(!hash.startsWith(HASH_REQUIREMENT));

        this._isMining = false;
        this._pendingTransactions = [];

        return {...block,hash,nonce};
    }

    async mineBlockWith(transactions: Transaction[]): Promise<Block>{
        const block = {previousHash: this.latestBlock.hash, timestamp: Date.now(), transactions};
        return this.mineBlock(block);
    }

    addTransaction(transaction: Transaction): void{

    }

    async addBlock(newBlock: Block): Promise<void>{

    }

    private async calculateHash(block: WithoutHash<Block>): Promise<string>{

    }

    //GETTERS
    get isMining(): boolean{
        
    }

    get chain(): Block[]{

    }

    get chainIsEmpty(): boolean{

    }

    get latestBlock(): Block{

    }

    get pendingTransactions(): Transaction[]{

    }

    get hasPendingTransactions(): boolean{

    }

    get noPendingTransactions(): boolean{

    }
}
    export function randomDelay(maxMilliseconds:number = 100): Promise<void>{

    }
