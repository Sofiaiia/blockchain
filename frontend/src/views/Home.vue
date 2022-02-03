<template>
  <main id="app">
      <button @click="signOutGoogle" class="googleLogout"> Logout </button>
      <h1> Blockchain node </h1>
      <aside><p> {{ status }} </p></aside>
      <section>
        <transaction-form
          :disabled="shouldDisableForm()"
          @add-transaction="addTransaction"
        >
        </transaction-form>
      </section>
      <section>
        <pending-transactions-panel
          :transactions="transactions()"
          :disabled="shouldDisableGeneration()"
          @generate-block="generateBlock"
        >
        </pending-transactions-panel>
      </section>
      <section>
        <blocks-panel
          :blocks="blocks()"
        >
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

import { getAuth, signOut} from "firebase/auth";
import { initializeApp } from "firebase/app";


const node = new BlockchainNode();
const server = new WebsocketController();

@Options({components:{TransactionForm,BlocksPanel,PendingTransactionsPanel}})
export default class Home extends Vue {
  status: string = '';

  //connect to server 
  created() {
    this.updateStatus();
    server
      .connect(this.handleServerMessages.bind(this))
      .then(this.initializeBlockchainNode.bind(this));
  }

  //disconnect from server
  destroyed() {
    server.disconnect();
  }

  //Status messages
  updateStatus() {
    this.status = node.chainIsEmpty          ? '⏳ Initializing the blockchain...' :
                  node.isMining              ? '⏳ Mining a new block...' :
                  node.noPendingTransactions ? '📩 Add one or more transactions.' :
                                               `✅ Ready to mine a new block (transactions: ${node.pendingTransactions.length}).`;
  }

  //initialize blockchain 
  async initializeBlockchainNode(): Promise<void> {
    
    const blocks = await server.requestLongestChain();
    if (blocks.length > 0) {
      node.initializeWith(blocks);
    } else {
      await node.initializeWithGenesisBlock();
    }
    this.updateStatus();
  }

  //start blocks - used in section 3
  blocks(): Block[] {
    return node.chain;
  }

  //switch for different messages
  handleServerMessages(message: Message) {
    switch (message.type) {
      case MessageTypes.GetLongestChainRequest: return this.handleGetLongestChainRequest(message);
      case MessageTypes.NewBlockRequest       : return this.handleNewBlockRequest(message);
      case MessageTypes.NewBlockAnnouncement  : return this.handleNewBlockAnnouncement(message);
      default: {
        console.log(`Received message of unknown type: "${message.type}"`);
      }
    }
  }

  handleGetLongestChainRequest(message: Message): void {
    server.send({
      type: MessageTypes.GetLongestChainResponse,
      correlationId: message.correlationId,
      payload: node.chain
    });
  }
  
  async handleNewBlockRequest(message: Message): Promise<void> {
    const transactions = message.payload as Transaction[];
    const miningProcessIsDone = node.mineBlockWith(transactions);
    this.updateStatus();
    const newBlock = await miningProcessIsDone;
    this.addBlock(newBlock);
  }

  handleNewBlockAnnouncement(message: Message): void {
      const newBlock = message.payload as Block;
      this.addBlock(newBlock, false);
  }

  async addBlock(block: Block, notifyOthers = true): Promise<void> {
    try {
      await node.addBlock(block);
      if (notifyOthers) {
        server.announceNewBlock(block);
      }
    } catch (error) {
      console.log(error.message);
    }
    this.updateStatus();
  }

  /* SECTION 1 */
  shouldDisableForm(): boolean {
      return node.isMining || node.chainIsEmpty;
  }
  
  addTransaction(transaction: Transaction): void {
    node.addTransaction(transaction);
    this.updateStatus();
  }

  /* SECTION 2 */
  transactions(): Transaction[] {
    return node.pendingTransactions;
  }

  async generateBlock(): Promise<void> {
    server.requestNewBlock(node.pendingTransactions);
    const miningProcessIsDone = node.mineBlockWith(node.pendingTransactions);
    this.updateStatus();
    const newBlock = await miningProcessIsDone;
    this.addBlock(newBlock);
  }

  shouldDisableGeneration(): boolean {
    return node.isMining || node.noPendingTransactions;
  }

  /* google logout */

  firebaseConfig = {
      apiKey: "AIzaSyClOAWOszA0Ldqqs6wym4HETDXojifqU6A",
      authDomain: "ts-course-e1637.firebaseapp.com",
      projectId: "ts-course-e1637",
      storageBucket: "ts-course-e1637.appspot.com",
      messagingSenderId: "775940375456",
      appId: "1:775940375456:web:fc4c2c9769b4a9f1109ac5"
  };

  app = initializeApp(this.firebaseConfig);

  signOutGoogle(){
    const auth = getAuth(this.app);
    signOut(auth).then(() => {
      this.$router.push('/login');
    }).catch((error) => {
      console.log(error.message);
    });
  }
}
</script>

