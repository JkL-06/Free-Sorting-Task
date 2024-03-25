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
    font-size: 24px;
    line-height: 32px;
    user-select: none;
    cursor: pointer;
}
</style>