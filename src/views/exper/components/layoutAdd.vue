<template>
    <div class="layout_add">
        <div class="content">
            <div class="icon"><cha></cha></div>
        </div>
    </div>
</template>

<script setup>
import cha from './cha.vue';
</script>

<style scoped>
.layout_add {
    width: 25%;
    height: 25%;
    padding: 16px;
    margin: 16px;
    background-color: #e3e3e3;
    color: black;
    border-radius: 20px;
}

.layout_add .content {
    display: flex;
    width: 100%;
    height: calc(100%);
    justify-content: center;
    align-items: center;
    overflow-y: auto;
}
.layout_add .content .icon {
    width: 64px;
    height: 64px;
}
</style>