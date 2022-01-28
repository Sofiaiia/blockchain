<template>
    <div>
    </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import BlockComponent from './Block.vue';

@Component({
    components:{
        Block: BlockComponent
    }
})
export default class BlocksPanel extends Vue{
    
}
</script>