<template>
    <div class="drag_word">
        <div class="drag_content">
            <layout :data-index="i" v-for="k, i in Object.keys(res)" 
                    @drop="drop(i, false)" 
                    @dragover.prevent
                    @cancel="cancelLayout(i)" 
                    @wordClick="wordDel(i, $event)"
                    @changeTitle="changeTitle(i, $event)"
                    :title="k" :words="res[k]"></layout>
            <layoutAdd @drop="drop(0, true)" @dragover.prevent></layoutAdd>
        </div>
        <div class="drag_contain">
            <!-- 右侧选词的 -->
            <word v-if="words.length > 0" v-for="w in words" :word="w"
                  draggable="true"
                  @dragstart="dragstart"
                  @dragend="dragend"></word>
            <div class="button" @click="emits('endExp', toRaw(res));" v-else>结束</div>
        </div>
    </div>
</template>

<script setup>
import word from './components/word.vue';
import layout from './components/layout.vue';
import layoutAdd from './components/layoutAdd.vue';
import { provide, reactive, ref, toRaw } from 'vue';

const emits = defineEmits(["endExp"]);

const res = reactive({}); // 结果放置
const words = ref(["这是一个七个字"]); // 存开头的语句
for (let i = 0; i < 5; i++) {
    words.value.push(i.toString());    
};

const cancelLayout = function(i) {
    const arr = res[Object.keys(res)[i]];
    arr.forEach(v => {
        words.value.push(v);
    });
    delete res[Object.keys(res)[i]];
}
const wordDel = function(i, j) {
    const k = Object.keys(res)[i];
    const r = res[k].splice(j,1);
    words.value.push(r[0]);

    if(res[k].length < 1) {
        delete res[k];
    }
}
const changeTitle = function(i, title) {
    const keys = Object.keys(res);
    // 如果冲突，则不修改
    if(keys.indexOf(title) >= 0) return 0;
    res[title] = res[keys[i]];
    delete res[keys[i]];
}

let _new_i = 0;
let chos = "";
const drop = function(i, _new = false) {
    if(chos.length > 0) {
        // 删除已存在的
        if(words.value.indexOf(chos) >= 0) words.value.splice(words.value.indexOf(chos), 1);
        if(_new) {
            res[`title${_new_i++}`] = [chos];
        } else {
            res[Object.keys(res)[i]].push(chos);
        }
    }
};

const dragstart = (e) => {
    chos = e.target.innerText;
};
const dragend = (e) => {
    chos = "";
};
</script>

<style scoped>
.drag_word {
    display: flex;
    width: 1200px;
    height: 720px;
    flex-direction: row;
}

.drag_content {
    display: flex;
    width: 80%;
    height: 100%;
    justify-content: flex-start;
    align-items: flex-start;
    flex-wrap: wrap;
    overflow-y: auto;
}

.drag_contain {
    display: block;
    width: 20%;
    height: 100%;
    flex-direction: column;
    overflow-y: auto;
    overflow-x: hidden;
}
.drag_contain .button {
    display: block;
    height: 64px;
    font-size: 32px;
    line-height: 64px;
    border: 1px solid #e3e3e3;
    border-radius: 24px;
    user-select: none;
    cursor: pointer;
}
</style>