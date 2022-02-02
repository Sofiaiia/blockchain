<template>
  <div>
    <h2>Current blocks</h2>
    <div>
      <div>
        <block v-for="(block, i) in blocks"
               :key="block.hash"
               :index="i"
               :block="block">
        </block>
      </div>
      <div> </div>
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