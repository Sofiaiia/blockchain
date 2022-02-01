<template>
  <main id="app">
      <h1> Blockchain node </h1>
      <aside><p> {{ status }} </p></aside>
      <section>
        <transaction-form>
        </transaction-form>
      </section>
      <section>
        <pending-transactions-panel>
        </pending-transactions-panel>
      </section>
      <section>
        <blocks-panel>
        </blocks-panel>
      </section>
  </main>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';

import BlocksPanel from '@/components/BlocksPanel.vue';
import PendingTransactionsPanel from '@/components/PendingTransactionsPanel.vue';
import TransactionForm from '@/components/TransactionForm.vue';

import { Block, BlockchainNode, Transaction } from '@/lib/blockchain-node';
import { Message, MessageTypes } from '@/lib/messages';
import { WebsocketController } from '@/lib/websocket-controller';


const node = new BlockchainNode();
const server = new WebsocketController();

@Options({components:{TransactionForm,BlocksPanel,PendingTransactionsPanel}})
export default class Home extends Vue {
  status: string = '';

  

}
</script>
