<template>
    <div class="block">
        <div>
            <span>#{{ index }}</span>
            <span>{{ timestamp() }}</span>
        </div>
        <div>
            <div>
                <div> ← PREV HASH </div>
                <div> {{ block.previousHash }}</div>
            </div>
            <div>
                <div> THIS HASH </div>
                <div> {{ block.hash }}</div>
            </div>
        </div>
        <div> 
            <div> TRANSACTIONS </div>
            <pre>{{ formattedTransactions() || 'No transactions' }}</pre>
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