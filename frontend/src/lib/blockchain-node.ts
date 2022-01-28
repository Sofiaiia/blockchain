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

    }

    async mineBlock(block:NotMinedBlock): Promise<Block>{

    }

    async mineBlockWith(transactions: Transaction[]): Promise<Block>{

    }

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

    addTransaction(transaction: Transaction): void{

    }

    async addBlock(newBlock: Block): Promise<void>{

    }

    private async calculateHash(block: WithoutHash<Block>): Promise<string>{

    }
}
    export function randomDelay(maxMilliseconds:number = 100): Promise<void>{

    }
