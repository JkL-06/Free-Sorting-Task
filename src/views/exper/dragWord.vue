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
const words = ref(["乱搭建筑物","传播性病","传播谣言","传播淫秽物品","代替考试","倒卖文物","盗墓","赌博","妨害公务","非法集会游行","聚众斗殴","聚众闹事","聚众淫乱","开设赌场","滥伐林木","冒充官员、军人","强迫卖淫","买卖野生动物","随意殴打他人","损毁名胜古迹","损毁文物","偷越国（边）境","伪造公章","伪造身份证件","窝藏包庇","污染水源","引诱教唆吸毒","引诱介绍卖淫","隐瞒犯罪所得","制造贩卖毒品","组织暴动越狱","组织考试作弊","组织利用邪教","组织黑社会","组织卖淫","作伪证","战时违抗命令","闯入军事禁区","不赡养父母","参与传销活动","放高利贷","侵犯商业机密","使用假币","偷税逃税","伪造发票","伪造货币","洗钱","虚假广告","诈骗","走私","组织领导传销","操纵金融市场","盗版","非法使用商标","侵犯专利权","剽窃他人作品","泄露用户信息","生产销售劣药","抢劫","敲诈勒索","盗用他人账号","杀害宠物","商店行窃","盗窃","绑架","非法拘禁","非法侵入住宅","诽谤","故意杀人","雇用童工","过失致人死亡","过失致人重伤","奸淫幼女","恐吓他人","买卖个人信息","买卖人口","虐待他人","强奸","强制猥亵","煽动民族仇恨","猥亵儿童","诬告陷害","侮辱他人","刑讯逼供","组织出卖器官","警察暴力执法","冒用他人身份","性侵未成年人","家暴","袭警","挪用公款","超速","超载","妨碍安全驾驶","工程偷工减料","劫持交通工具","破坏公共设施","投放危险物质","引发爆炸","占用消防通道","肇事逃逸","买卖持有枪支","纵火","醉酒驾驶","拒服兵役","从事间谍活动","投敌叛变","武装叛乱暴乱","泄露国家机密","恐怖主义活动","剥夺教育机会","向青少年卖烟酒","剥夺言论自由","卖淫","窃听","偷窥、偷拍","无证驾驶","遗弃儿童","嫖娼","黑客攻击","逃避账单","吸毒","打架斗殴","遗弃宠物","不清理狗粪","虐待动物","观影随意走动","在电影院交谈","公共场所吸烟","大声喧哗","插队","随地吐痰便溺","高空抛物","噪音污染","污染空气","乱扔垃圾","同性婚姻","婚前性行为","童婚","婚内出轨","乱伦","精神虐待","借东西不还","欠债不还","闯红灯","乱收费","以次充好","指使他人作恶","取笑残疾人","性别歧视","种族主义言论","骚扰他人","浏览色情信息","性侵动物","借图书馆书不还","网络暴力","未成年人纹身","在家不听话","夜不归宿","离家出走","未成年人性行为","学术作假","考试作弊","霸凌","在学校不听话","逃学","体罚学生","约会性行为","运动员服用禁药","旷工","拖欠工资","职场霸凌","自残行为","亵渎宗教场所","堕胎","煽动协助自杀","投票舞弊","受贿","贪污","行贿"]); // 存开头的语句
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