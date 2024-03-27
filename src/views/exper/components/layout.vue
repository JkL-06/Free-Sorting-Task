<template>
    <div class="layout">
        <div class="top">
            <div v-if="!isEditing" @dblclick="isEditing = true" class="title">{{ props.title }}</div>
            <input v-else class="title-input" v-model="tit" 
                   @blur="isEditing = false" 
                   @keyup.enter="isEditing = false" 
                   autofocus />
            <div class="icon" @click="emits('cancel', $event);"><cha></cha></div>
        </div>
        <div class="content">
            <div @click.stop="emits('wordClick', i)" v-for="w, i in props.words"><word :word="w"></word></div>
        </div>
    </div>
</template>

<script setup>
import { ref, watch } from 'vue';
import cha from './cha.vue';
import word from './word2.vue';

const emits = defineEmits(["wordClick", "cancel", "changeTitle"]);

const props = defineProps({
    title: {
        type: String,
        default: "title"
    },
    words: {
        type: Array,
        default: []
    }
});

const tit = ref(props.title);
const isEditing = ref(false);
watch(isEditing, (n,o) => {
    if(!n) {
        emits('changeTitle', tit.value);
    }
});
</script>

<style scoped>
.layout {
    width: 25%;
    height: 25%;
    padding: 16px;
    margin: 16px;
    background-color: #e3e3e3;
    color: black;
    border-radius: 20px;
}

.layout .top {
    display: flex;
    justify-content: space-between;
}
.layout .top .title {
    font-size: 16px;
    line-height: 24px;
    user-select: none;
    cursor: pointer;
}
.layout .top .icon {
    width: 24px;
    height: 24px;
    transform: rotate(45deg);
    cursor: pointer;
}

.layout .content {
    display: flex;
    width: 100%;
    height: calc(100% - 24px);
    margin: 10px 0 0 0;
    justify-content: space-between;
    align-items: flex-start;
    flex-wrap: wrap;
    overflow-y: auto;
}
.layout .content>div {
    max-width: 128px;
}
</style>