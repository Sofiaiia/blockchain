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
    
}