<template>
  <main id="home">
      <h1> Blockchain node </h1>
      <aside><p> {{ status }} </p></aside>
      <p> SECTIONS </p>
  </main>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import BlocksPanel from '@/components/BlocksPanel.vue';
import PendingTransactionsPanel from '@/components/PendingTransactionsPanel.vue';
import TransactionForm from '@/components/TransactionForm.vue';
//import { Block, BlockchainNode, Transaction } from '@/lib/blockchain-node';
//import { Message, MessageTypes } from '@/lib/messages';
//import { WebsocketController } from '@/lib/websocket-controller';

@Component({
  components: {
    BlocksPanel,
    PendingTransactionsPanel,
    TransactionForm
  },
})
export default class Home extends Vue {
  status: string = '';


}
</script>
