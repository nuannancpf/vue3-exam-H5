<template>
    <div v-if="showSelect" class="popover fw pf" :class="[!showSelect ? 'dn' : '']">
        <slot></slot>
    </div>
</template>
<script lang="ts" setup name="Propover">
import { defineProps } from 'vue'
defineProps({
    showSelect: Boolean
})
</script>
<style lang="less" scoped>
.popover {
    height: 100%;
    top: 0;
    left: 0;
    z-index: 99998;
    background-color: rgba(0, 0, 0, 0.7);
}

.fw {
    width: 100%;
}

.pf {
    position: fixed;
}

.dn {
    display: none;
}
</style>
