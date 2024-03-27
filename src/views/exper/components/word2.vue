<template>
    <div class="display_word">
        {{ props.word }}
    </div>
</template>

<script setup>
const props = defineProps({
    word: {
        type: String,
        default: "词"
    }
});
</script>

<style scoped>
.display_word {
    width: 100%;
    margin: auto;
    border: 1px solid #e3e3e3;
    box-sizing: border-box;
    text-align: center;
    font-size: 16px;
    line-height: 24px;
    word-break: keep-all;
    user-select: none;
    cursor: pointer;
}
</style>