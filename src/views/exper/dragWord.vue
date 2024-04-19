<template>
    <div class="drag_word">
        <div class="drag_content">
            <layout :data-index="i" v-for="k, i in Object.keys(res)" @drop="drop(i, false)" @dragover.prevent
                @cancel="cancelLayout(i)" @wordClick="wordDel(i, $event)" @changeTitle="changeTitle(i, $event)"
                :title="k" :words="res[k]"></layout>
            <layoutAdd @drop="drop(0, true)" @dragover.prevent></layoutAdd>
            <div style="width: 100%; text-align: left;">
                <div style="width: 75%; margin: auto; text-indent: 2em; line-height: 1.5em; font-size: 16px;">
                    <div>请将网页右侧的违规行为条目拖动到方框中，并为该方框所代表的违规行为类别命名。</div>
                    <p></p>
                    <div>注意事项：</div>
                    <div>（1）若要添加新类别，请将条目拖动到加号上；若要将条目从某类别放回原处，请单击该条目； </div>
                    <div>（2）从第二个类别开始命名时，前一个类别的名称会留存在命名文本框内，请忽略该内容，并直接修改为当前类别所需的文字。</div>
                    <div>（3）需至少将行为条目分三类并命名清楚（能够体现该类别下行为的核心特征），否则将不予发放被试费。</div>
                    <div>（4）每个类别下需至少包含6个行为，否则将不予分发被试费。</div>
                </div>
            </div>
        </div>
        <div class="drag_contain">
            <!-- 右侧选词的 -->
            <word v-if="words.length > 0" v-for="w in words" :word="w" draggable="true" @dragstart="dragstart"
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

const cancelLayout = function (i) {
    const arr = res[Object.keys(res)[i]];
    arr.forEach(v => {
        words.value.push(v);
    });
    delete res[Object.keys(res)[i]];
}
const wordDel = function (i, j) {
    const k = Object.keys(res)[i];
    const r = res[k].splice(j, 1);
    words.value.push(r[0]);

    if (res[k].length < 1) {
        delete res[k];
    }
}
const changeTitle = function (i, title) {
    const keys = Object.keys(res);
    // 如果冲突，则不修改
    if (keys.indexOf(title) >= 0) return 0;
    res[title] = res[keys[i]];
    delete res[keys[i]];
}

let _new_i = 0;
let chos = "";
const drop = function (i, _new = false) {
    if (chos.length > 0) {
        // 删除已存在的
        if (words.value.indexOf(chos) >= 0) words.value.splice(words.value.indexOf(chos), 1);
        if (_new) {
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