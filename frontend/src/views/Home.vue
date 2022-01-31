<template>
  <main id="app">
      <h1> Blockchain node </h1>
      <aside><p> {{ status }} </p></aside>
      <p> SECTIONS </p>
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
import Component from 'vue-class-component';


const node = new BlockchainNode();
const server = new WebsocketController();


@Options({
  components: {
    BlocksPanel,
    PendingTransactionsPanel,
    TransactionForm
  }
})

export default class Home extends Vue {
  status: string = '';

  

}
</script>
