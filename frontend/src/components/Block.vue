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

import { Options, Vue } from 'vue-class-component';
import { Prop } from 'vue-property-decorator'
import { Block as ChainBlock, Transaction } from '@/lib/blockchain-node';

export default class Block extends Vue {

@Prop(Number) readonly index!: number;
@Prop({ type: Object, required: true }) readonly block!: ChainBlock;

timestamp(){
    return new Date(this.block.timestamp).toLocaleTimeString();
}

formattedTransactions(): string{
     return this.block.transactions.map((t: Transaction) =>`${t.sender} → ${t.recipient}: $${t.amount}`).join('\n');
}
}
</script>