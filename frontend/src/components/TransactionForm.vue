<template>
    <div>
       <form class="add-transaction-form" @submit.prevent="handleFormSubmit">
            <input
                type="text"
                name="sender"
                placeholder="Sender"
                autoComplete="off"
                v-model.trim="formValue.sender"
                :disabled="disabled"
            >

      <span class="hidden-xs">→</span>

            <input
                type="text"
                name="recipient"
                placeholder="Recipient"
                autoComplete="off"
                :disabled="disabled"
                v-model.trim="formValue.recipient"
            >

            <input
                type="number"
                name="amount"
                placeholder="Amount"
                :disabled="disabled"
                v-model.number="formValue.amount"
            >

            <button 
                type="submit"
                class="ripple"
                :disabled="!isValid() || disabled"
            >
                ADD TRANSACTION
            </button>
       </form>
    </div>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';
import { Transaction } from '../lib/blockchain-node';

@Options({
    props:{
        disabled: {
            type: Boolean
        }
    }
})
//form to add new transactions
export default class TransactionForm extends Vue{

    formValue: Transaction = this.defaultFormValue();

    //check that form is valid(all fields filled) before button is activated
    isValid(){
        return(
            this.formValue.sender && this.formValue.recipient && this.formValue.amount > 0
        );
    }

    //add new transactions
    handleFormSubmit(){
        this.$emit('add-transaction',{...this.formValue});

        this.formValue = this.defaultFormValue();
    }

    //fieldnames and default values for form 
    private defaultFormValue(): Transaction{
        return{
            sender: '',
            recipient: '',
            amount: 0
        };
    }
}
</script>