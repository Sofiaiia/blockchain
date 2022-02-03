<template>
  <div>
    <h2>Current blocks</h2>
    <div class="blocks">
      <div class="blocksRibbon">
        <block v-for="(block, i) in blocks"
               :key="block.hash"
               :index="i"
               :block="block">
        </block>
      </div>
      <div class="blocksOverlay"> </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';
import BlockComponent from './Block.vue';
import { Prop } from 'vue-property-decorator';
import { Block } from '@/lib/blockchain-node';

@Options({
    components:{
        Block: BlockComponent
    }
})
export default class BlocksPanel extends Vue {
    //array of all the blocks, renders with a for loop
  @Prop({ type: Array, required: true }) readonly blocks: Block[] = [];
}
</script>

<style> 

  .blocks {
      position: relative;
  }

  .blocksRibbon {
      display: flex;
      overflow-y: auto;
  }

  .blocksOverlay {
      position: absolute;
      width: 80px;
      bottom: 0;
      right: 0;
      top: 0;
      background: linear-gradient(to right, rgba(255,255,255,0.5) 20%, rgba(255,255,255,0.5) 100%);
  }
</style>