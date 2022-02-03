<template>
    <div>
        <h2> Pending transactions </h2>
        <pre class="pending-transactionsList">{{ formattedTransactions() || 'No pending transactions yet.' }}</pre>
        <div class="pending-transactionsForm">
            <button 
                class="ripple"
                type="button"
                :disabled="disabled"
                @click="generateBlock()"
            >
                GENERATE BLOCK
            </button>
    </div>
    <div class="clear"></div>
    </div>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';
import { Transaction } from '@/lib/blockchain-node';
import { Prop } from 'vue-property-decorator'

@Options({
    props:{
        disabled: {
            type: Boolean
        }
    }
})
export default class PendingTransactionsPanel extends Vue{

    //array og transactions
    @Prop({ type: Array, required: true }) readonly transactions!: Transaction[];

    //print all pending transactions 
    formattedTransactions(): string{
        return this.transactions.map((t: any) =>`${t.sender} → ${t.recipient}: $${t.amount}`).join('\n');
    }

    //start mining block
    generateBlock(){
        this.$emit('generate-block');
    }
}
</script>