<template>
    <div class="drag_word">
        <div class="drag_content">
            <layout :data-index="i" v-for="k, i in Object.keys(res)" @drop="drop(i, false)" @dragover.prevent
                @cancel="cancelLayout(i)" @wordClick="wordDel(i, $event)" @changeTitle="changeTitle(i, $event)"
                :title="k" :words="res[k]"></layout>
            <layoutAdd @drop="drop(0, true)" @dragover.prevent></layoutAdd>
            <div style="width: 100%; text-align: left;">
                <div style="width: 75%; margin: auto; text-indent: 2em; line-height: 1.5em; font-size: 16px;">
                    <!-- <div>请将网页右侧的行为条目拖动到方框中，并为该方框所代表的行为类别命名。</div>
                    <p></p>
                    <div>操作说明：</div>
                    <div>（1）若要添加新类别，请将条目拖动到加号上；若要将条目从某类别放回原处，请单击该条目；</div>
                    <div>（2）从第二个类别开始命名时，前一个类别的名称会留存在命名文本框内，请忽略该内容，并直接修改为当前类别所需的文字。</div>
                    <div>（3）请将数字单独归为一类.</div>
                    <div style="font-weight: 700;">特别注意事项！！！</div>
                    <div>（4）需至少将行为条目分三类并命名清楚（能够体现该类别下行为的核心特征），否则将不予发放被试费，建议分类不超过15类。</div>
                    <div>（5）每个类别下需至少包含6个行为，否则将不予分发被试费。</div> -->
                    <div>Please (1) <strong>categorize</strong> the behavior entries by dragging them into the box and (2) <strong>naming the category</strong> of behavior that the box represents.</div>
                    <p></p>
                    <div>A. Name the category with the words that <strong>best describe the core characteristics</strong> of the behavior</div>
                    <div>B. It is recommended that the items be divided into <strong>3-15 categories</strong> and <strong>No less than 6 behaviors per category</strong>.</div>
                    <div>C. Correctly categorize the non-behavioral objects(fruit) and beings(animal) that appear in the behavioral items, <strong>otherwise no participant fee will be given</strong>.</div>
                    <p></p>
                    <div>Operation instructions:</div>
                    <div class="text_title">(1) How to add a new category?</div>
                    <div class="text_desc">To add a new category, drag the item onto the plus sign.</div>
                    <div class="text_title">(2) What if I don't want to be categorized that way?</div>
                    <div class="text_desc">To put the item back from a category, click on the item.</div>
                    <div class="text_title">(3) Why does the name of the first category appear when naming the second category?</div>
                    <div class="text_desc">please ignore the content and modify it directly to the text required for the current category. </div>
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
// const words = ref(["临阵磨枪","自残行为","诬告陷害","组织利用邪教","不赡养父母","未成年人纹身","传播性病","聚众淫乱","买卖野生动物","隐瞒犯罪所得","生产销售劣药","乱收费","不正当竞争","传播谣言","传播淫秽物品","倒卖文物","盗墓","赌博","妨害公务","非法集会游行","聚众斗殴","开设赌场","滥伐林木","冒充官员军人","损毁文物","偷越国境","伪造公章","伪造身份证件","窝藏包庇","污染水源","制造贩卖毒品","组织暴动越狱","组织考试作弊","组织黑社会","组织卖淫","作伪证","战时违抗命令","闯入军事禁区","参与传销活动","放高利贷","侵犯商业机密","使用假币","偷税逃税","伪造发票","伪造货币","洗钱","虚假广告","诈骗","走私","组织领导传销","操纵金融市场","盗版","侵犯专利权","剽窃他人作品","泄露用户信息","抢劫","敲诈勒索","盗用他人账号","杀害宠物","商店行窃","盗窃","绑架","非法拘禁","非法侵入住宅","诽谤","故意杀人","雇用童工","过失致人死亡","过失致人重伤","恐吓他人","买卖个人信息","买卖人口","虐待他人","强奸","强制猥亵","煽动民族仇恨","侮辱他人","刑讯逼供","组织出卖器官","警察暴力执法","冒用他人身份","性侵未成年人","家暴","袭警","煽动协助自杀","投票舞弊","受贿","贪污","行贿","挪用公款","超速","妨碍安全驾驶","工程偷工减料","劫持交通工具","破坏公共设施","引发爆炸","占用消防通道","肇事逃逸","买卖持有枪支","纵火","醉酒驾驶","拒服兵役","从事间谍活动","泄露国家机密","恐怖主义活动","剥夺教育机会","向青少年卖烟酒","剥夺言论自由","卖淫","窃听","偷窥偷拍","无证驾驶","遗弃儿童","嫖娼","黑客攻击","逃避账单","吸毒","打架斗殴","虐待动物","公共场所吸烟","大声喧哗","插队","随地吐痰便溺","高空抛物","污染空气","乱扔垃圾","同性婚姻","婚前性行为","童婚","婚内出轨","乱伦","精神虐待","借东西不还","欠债不还","闯红灯","以次充好","指使他人作恶","取笑残疾人","性别歧视","种族主义言论","骚扰他人","浏览色情信息","性侵动物","网络暴力","夜不归宿","学术作假","考试作弊","霸凌","体罚学生","运动员服用禁药","旷工","拖欠工资","职场霸凌","亵渎宗教场所","堕胎","暴饮暴食","顽固不化","盲目消费","懒惰懈怠","敷衍塞责","恶意误导他人","见死不救","搅局内讧","粗心大意","计较报复","阿谀奉承","迟到拖延","固执己见","文化歧视","妒忌贬低","粗鲁无礼","对朋友撒谎","知错不改","附庸风雅","半途而废","浪费食物","背信弃义","待人傲慢","爱慕虚荣","逃学"]); // 存开头的语句
// 善行
// const words = ref(["Actively encouraging justice","Actively listening to others' suggestions","Adhering to principles","Admitting to and correcting one's mistakes","Adopting orphans","Advocating for equal rights","Appreciating fine art and music","Approaching problems from multiple perspectives","banana","Being a team player","Being considerate and attentive","Being dedicated to one's job","Being eager to learn new things","Being enthusiastic about public welfare","Being financially responsible","Being grateful for others' help","Being honest  towards friends","Being hopeful about life","Being humble and modest","Being impartial and just","Being independent","Being modest and eager to learn","Being punctual","Being truthful and factual","Being understanding and empathetic","Being willing to contribute","Bravely facing challenges","Bravely killing enemies","Bravely stopping thieves","Caring for sick friends","Caring for stray animals","cat","Celebrating others' successes","Cheering up a disheartened friend","Cherishing food","Communicating effectively","Competing fairly","Conducting business with integrity","Conserving water","Considering others' feelings","Dedicating oneself to work","Deeply valuing personal bonds and righteousness","Defending borders","Discerning right from wrong","Donating blood","Donating generously","Eagerly exploring the unknown","Eating healthy","elephant","Embracing diverse cultures","Empathizing with others","Engaging in community service","Enjoying the beauty of nature","Exercising regularly","Exploring the unknown","Expressing sincere gratitude","Facing difficulties with an optmistic mentality","Focusing energy on studying ","Forgiving others' mistakes","Forgiving past grievances","Fulfilling one's duties","grape","Greeting others politely","Having a good sense of humor","Helping others willingly","Helping strangers with directions","Helping the elderly cross the street","Imparting scientific knowledge","Innovating in science and technology","Keeping promises","Leading teams effectively","Learning from history","Learning new things","lion","Listening attentively","Listening attentively in class","Living frugally","Looking after elderly parents","Loving one's country","Maintaining integrity as a politician","Maintaining quiet in libraries","Making an offering (in money) at a church or temple","Obeying rules and regulations","Offering condolences to the bereaved family","Offering seats to the elderly","Opposing discrimination","orange","Participating in emergency rescue","Persevering through challenges","pig","pineapple","Planning ahead","Practicing good online etiquette","Practicing self-discipline","Praising others' strengths","Praying at a church or temple","Praying at a church or temple","Praying for family's health","Praying to God","Preserving cultural heritage","Prioritizing students' mental health","Promoting traditional culture","Protecting the natural environment","Protecting the rights of vulnerable groups","Protecting wildlife","Providing charitable medical care","Providing disaster relief","Providing medical aid","Providing wise advice","Reading religious scripts","Reading widely","Recycling goods","Reflecting on oneself","Resolving conflicts peacefully","Respecting elders","Respecting intellectual property","Respecting others' opinions","Respecting others' privacy","Respecting teachers and elders","Returning lost property","Sacrificing oneself for others","Safeguarding national secrets","Serving one's country with supreme loyalty","Sharing food","Sharing joys and sorrows","Showing gratitude","Showing love within a marriage","Speaking frankly","Spending time with family","Sponsoring children's education","Standing up for what is right bravely","Staying organized","Staying true to one's beliefs no matter what","Stepping up to help","Stopping campus bullying","Striving to achieve goals","Studying diligently","Supporting special education","Tailoring teaching to each student's strengths","Taking care of public property","Taking responsibility","Taking the initiative to clean","Treating everyone equally","Treating people with disabilities kindly","Upholding academic integrity","Upholding justice","Upholding the law impartially","Using eco-friendly packaging","Using renewable energy","Valuing collective interests","Valuing educating the youth","Valuing science","Volunteering","watermelon","Yielding to pedestrians while driving","zebra"]);
// 恶行
const words = ref(["Abandoning children","Abortion","Absenteeism from work","Abuse","Academic dishonesty and fraud","Air pollution","Arrogance","Arson","Assaulting a police officer","banana","Being opinionated","Betrayal and deviation from a moral standard","Binge eating","Bribery","Browsing porn","Bullying","Buying and selling firearms","Buying and selling personal information","Buying and selling wild animals","Carelessness","cat","Causing explosions","Causing internal conflict within a group or organization","Child marriage","Child molestation","Concealing illegal obtained goods or money","Copyright infringement","Corporal punishment of students","Counterfeiting currency","Creating and profiting from a cult","Cultural discrimination","Cutting corners in construction projects","Cutting in line","Damaging cultural artifiacts","Damaging public facilities","Defamation","Defaulting on debts","Deforestation","Depriving someone of educational opportunities","Desecration of religious sites","Disobeying orders during wartime","Distributing obscene materials","Domestic violence","Doping in sports","Driving under the influence (DUI)","Driving without a license","Drug abuse","Electoral fraud","elephant","Embezzlement","Embezzlement of public funds","Emotional abuse","Employing child labor","Engaging in a mass or group fight","Engaging in espionage","Engaging in unrestrained group sexual activity (i.e., an orgy)","Evading bills","Exam cheating","Extortion","Extortion of confession by torture","Failing to help someone in life-threatening danger","Failure to support parents","False advertising","Fighting","Flattery","Forging identity documents","Forging invoices","Forging official seals","Fraud","Gambling","Getting a tattoo as a minor","Giving up halfway","grape","Grave robbing","Hacking","Harassment","Harboring fugitives","Having sexuality intercourse with animals (bestiality)","Hindering safe driving","Hit-and-run","Holding grudges","Human trafficking","Identity theft","Illegal assembly and demonstration","Illegal trade of artifacts","Illegally crossing national borders","Illegally holding someone against their will","Illegally obtaining trade secrets","Impersonating officials or military personnel","Impulsive spending","Incest","Inciting evil or immoral behavior","Inciting or assisting suicide","Inciting racial hate","Inflicting serious bodily harm without intent","Infringing on trade secrets","Insulting others","Intentionally misleading others","Intimidation","Jealousy and belittling","Kidnapping","Killing pets","Killing someone without intent (i.e. manslaughter)","Laziness","Leaking national secrets","Leaking user information","Lending money with a very high interest rate (i.e. usury)","lion","Littering","Lying to friends","Making false accusations","Making loud noises","Manipulating financial markets","Manufacturing and trafficking illegal recreational drugs","Marital infidelity","Mocking people with disabilities","Money laundering","Not returning borrowed items","Obstructing official duties","Occupying fire lanes","Offering bribes","Online bullying","Operating a gambling establishment","orange","Organizing a mafia","Organizing and leading pyramid schemes","Organizing exam cheating","Organizing prostitution","Organizing riots and prison breaks","Organizing the sale of human organs","Overcharging and scamming","Patent infringement","Perjury","pig","pineapple","Plagiarism","Police brutality","Polluting water sources","Premarital sex","Premeditated murder","Preparing last minute (i.e. cramming for an exam)","Producing and selling low-quality pharmaceutical drugs","Prostitution","Racist speech","Rape","Refusal to perform military service","Refusing to admit or correct mistakes","Robbery","Rudeness","Running a red light","Same-sex marriage","Self-harm","Selling cigarettes and alcohol to minors","Selling inferior goods as superior","Sexism","Sexual harassment","Shoplifting","Skipping school","Slacking off","Smoking in public places","Smuggling","Snobbery and pretentiousness","Soliciting prostitution","Speeding","Spitting on the ground and public urination","Spreading rumors","Spreading sexually transmitted infections (STIs)","Staying out all night","Stubbornness","Suppressing freedom of speech","Tardiness","Tax evasion","Terrorist activities","Theft","Throwing objects from heights","Torturing animals","Transportation hijacking","Trespassing in military restricted zones","Unauthorized use of another's account","Unfair competition","Unlawful entry into a dwelling","Using counterfeit money","Vanity","Voyeurism and secret filming","Wage theft","Wasting food","watermelon","Wiretapping","Workplace bullying","zebra"]);

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

.text_title {
    font-weight: 700;
}
.text_desc {
    text-indent: 4em;
}
</style>