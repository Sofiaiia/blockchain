<template>
    <div>
    </div>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';
import BlockComponent from './Block.vue';

@Options({
    components:{
        Block: BlockComponent
    }
})
export default class BlocksPanel extends Vue{
    
}
</script>