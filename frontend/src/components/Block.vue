<template>
    <div class="block">
        <div class="blockHeader">
            <span class="blockIndex">#{{ index }}</span>
            <span class="blockTimestamp">{{ timestamp() }}</span>
        </div>
        <div class="blockHashes">
            <div class="blockHash">
                <div class="blockLabel"> ← PREV HASH </div>
                <div class="blockHashValue"> {{ block.previousHash }}</div>
            </div>
            <div class="blockHash">
                <div class="blockLabel"> THIS HASH </div>
                <div class="blockHashValue"> {{ block.hash }}</div>
            </div>
        </div>
        <div> 
            <div class="blockLabel"> TRANSACTIONS </div>
            <pre class="blockTransactions">{{ formattedTransactions() || 'No transactions' }}</pre>
        </div>
    </div>
</template>

<script lang="ts">

import { Vue } from 'vue-class-component';
import { Prop } from 'vue-property-decorator'
import { Block as ChainBlock, Transaction } from '@/lib/blockchain-node';

//display a single block 
export default class Block extends Vue {

@Prop(Number) readonly index!: number;
@Prop({ type: Object, required: true }) readonly block!: ChainBlock;

//timestamp shown as index 
timestamp(){
    return new Date(this.block.timestamp).toLocaleTimeString();
}

//print the transactions that beleongs to block 
formattedTransactions(): string{
     return this.block.transactions.map((t: Transaction) =>`${t.sender} → ${t.recipient}: $${t.amount}`).join('\n');
}
}
</script>

