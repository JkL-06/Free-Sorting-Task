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
    text-align: center;
    font-size: 18px;
    line-height: 32px;
    border: 1px solid #000;
    box-sizing: border-box;
    user-select: none;
    cursor: pointer;
}
</style>