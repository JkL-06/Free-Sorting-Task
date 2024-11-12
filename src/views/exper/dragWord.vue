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
                    <div>Please (1) <strong>categorize</strong> the behavioral items by dragging them into the box and (2) <strong>name the category</strong> of behavioral items that the box represents.</div>
                    <p></p>
                    <div>A. Name the category with the words that <strong>best describe the core characteristics</strong> of the behavioral items</div>
                    <div>B. It is recommended that the items be divided into <strong>3-15 categories</strong> and <strong>No less than 6 behaviors per category</strong>.</div>
                    <div>C. Correctly categorize the non-behavioral objects(fruit) and beings(animal) that appear in the behavioral items, <strong>otherwise no participant fee will be given</strong>.</div>
                    <p></p>
                    <div>Operation instructions:</div>
                    <div class="text_title">(1) How do you add a new category?</div>
                    <div class="text_desc">To add a new category, drag the item onto the plus sign.</div>
                    <div class="text_title">(2) How do you name the box?</div>
                    <div class="text_desc">To name the box, please double-click on the top left corner of the box and type in the appropriate label that comes to mind. </div>
                    <div class="text_title">(3) What if you don't want to be categorized that way?</div>
                    <div class="text_desc">To put the item back from a category, click on the item.</div>
                </div>
            </div>
        </div>
        <div class="drag_contain">
            <!-- 右侧选词的 -->
            <word v-if="words.length > 0" v-for="w in words" :word="w" draggable="true" @dragstart="dragstart"
                @dragend="dragend"></word>
            <div class="button" @click="emits('endExp', toRaw(res));" v-else>END</div>
        </div>
    </div>
</template>

<script setup>
import word from './components/word.vue';
import layout from './components/layout.vue';
import layoutAdd from './components/layoutAdd.vue';
import { provide, reactive, ref, toRaw } from 'vue';

const emits = defineEmits(["endExp"]);
const props = defineProps({
    uu: {
        type: Boolean,
        default: true
    }
});

const res = reactive({}); // 结果放置
// 善行
const g_words = ["Tailoring teaching to each student's strengths", 'Caring for sick friends', 'Treating everyone equally', 'Upholding justice', 'Supporting special education', 'Being eager to learn new things', "Praising others' strengths", 'Taking care of public property', "Forgiving others' mistakes", 'Living frugally', 'Being truthful and factual', 'Being independent', 'Valuing science', 'Yielding to pedestrians while driving', 'Appreciating fine art and music', 'Eating healthy', 'Donating blood', 'Praying to god', 'Helping others willingly', 'Offering condolences to the bereaved family', 'Returning lost property', 'Being understanding and empathetic', 'Lion', 'Taking the initiative to clean', 'Leading teams effectively', 'Listening attentively in class', 'Volunteering', 'Praying at a church or temple', 'Promoting traditional culture', 'Protecting the natural environment', 'Being honest towards friends', 'Conducting business with integrity', 'Showing love within a marriage', 'Offering seats to the elderly', 'Participating in emergency rescue', 'Adopting orphans', 'Cheering up a disheartened friend', 'Standing up for what is right bravely', 'Competing fairly', "Actively listening to others' suggestions", 'Cat', 'Bravely killing enemies', 'Reading widely', 'Being a team player', 'Respecting teachers and elders', 'Conserving water', 'Making an offering (in money) at a church or temple', "Loving one's country", 'Taking responsibility', 'Looking after elderly parents', 'Cherishing food', 'Being willing to contribute', 'Praying at a church or temple', 'Showing gratitude', "Being grateful for others' help", 'Practicing good online etiquette', 'Being financially responsible', 'Sacrificing oneself for others', 'Using renewable energy', 'Being considerate and attentive', "Prioritizing students' mental health", 'Forgiving past grievances', 'Being modest and eager to learn', 'Striving to achieve goals', 'Focusing energy on studying', 'Bravely stopping thieves', 'Greeting others politely', 'Exploring the unknown', 'Protecting wildlife', 'Caring for stray animals', 'Keeping promises', 'Deeply valuing personal bonds and righteousness', 'Advocating for equal rights', 'Providing charitable medical care', 'Studying diligently', 'Providing medical aid', 'Practicing self-discipline', 'Being humble and modest', 'Dedicating oneself to work', 'Having a good sense of humor', 'Recycling goods', 'Respecting intellectual property', 'Communicating effectively', 'Defending borders', 'Reflecting on oneself', 'Treating people with disabilities kindly', 'Persevering through challenges', 'Learning new things', 'Expressing sincere gratitude', 'Using eco-friendly packaging', 'Upholding the law impartially', 'Innovating in science and technology', "Respecting others' opinions", 'Spending time with family', 'Embracing diverse cultures', 'Safeguarding national secrets', 'Respecting elders', 'Exercising regularly', 'Learning from history', 'Enjoying the beauty of nature', 'Protecting the rights of vulnerable groups', 'Reading religious scripts', "Sponsoring children's education", 'Staying organized', 'Actively encouraging justice', 'Resolving conflicts peacefully', 'Planning ahead', 'Opposing discrimination', 'Upholding academic integrity', 'Being enthusiastic about public welfare', 'Preserving cultural heritage', 'Grape', 'Engaging in community service', "Serving one's country with supreme loyalty", "Staying true to one's beliefs no matter what", 'Adhering to principles', 'Facing difficulties with an optmistic mentality', 'Pig', "Admitting to and correcting one's mistakes", 'Sharing food', 'Being hopeful about life', 'Banana', 'Listening attentively', 'Bravely facing challenges', 'Providing wise advice', 'Approaching problems from multiple perspectives', "Praying for family's health", 'Imparting scientific knowledge', 'Elephant', 'Helping the elderly cross the street', 'Stepping up to help', 'Maintaining quiet in libraries', 'Obeying rules and regulations', "Respecting others' privacy", 'Watermelon', "Celebrating others' successes", 'Discerning right from wrong', 'Eagerly exploring the unknown', 'Empathizing with others', 'Being impartial and just', 'Being punctual', "Being dedicated to one's job", "Fulfilling one's duties", 'Orange', 'Speaking frankly', 'Valuing educating the youth', 'Stopping campus bullying', 'Valuing collective interests', 'Donating generously', 'Zebra', "Considering others' feelings", 'Helping strangers with directions', 'Sharing joys and sorrows', 'Pineapple', 'Providing disaster relief', 'Maintaining integrity as a politician'];
// 恶行
const b_words = ['Child marriage', 'Illegally crossing national borders', 'Deforestation', 'Manufacturing and trafficking illegal recreational drugs', 'Refusal to perform military service', 'Driving under the influence (dui)', 'Tardiness', 'Impersonating officials or military personnel', 'Corporal punishment of students', 'Extortion of confession by torture', 'Perjury', 'Harassment', 'Organizing the sale of human organs', 'Drug abuse', 'Illegally obtaining trade secrets', 'Exam cheating', 'Pig', 'Tax evasion', 'Money laundering', 'Organizing riots and prison breaks', 'Staying out all night', 'Concealing illegal obtained goods or money', 'Illegal trade of artifacts', 'Illegal assembly and demonstration', 'Voyeurism and secret filming', 'Grave robbing', 'Forging official seals', 'Gambling', 'Intentionally misleading others', 'Identity theft', 'Elephant', 'Running a red light', 'Employing child labor', 'Smoking in public places', 'Overcharging and scamming', 'Leaking user information', 'Online bullying', 'Making false accusations', 'Hacking', 'Embezzlement', 'Being opinionated', 'Infringing on trade secrets', 'Plagiarism', 'Impulsive spending', 'Forging identity documents', 'Embezzlement of public funds', 'Holding grudges', 'Academic dishonesty and fraud', 'Bribery', 'Unlawful entry into a dwelling', 'Inciting or assisting suicide', 'Illegally holding someone against their will', 'Snobbery and pretentiousness', 'Intimidation', 'Inciting evil or immoral behavior', 'Using counterfeit money', 'Causing explosions', 'Getting a tattoo as a minor', 'Arson', 'Robbery', 'Failing to help someone in life-threatening danger', 'Offering bribes', 'Smuggling', 'Engaging in a mass or group fight', 'Organizing a mafia', 'Patent infringement', 'Prostitution', 'Not returning borrowed items', 'Manipulating financial markets', 'Spreading sexually transmitted infections (stis)', 'Killing someone without intent (i.e. manslaughter)', 'Selling cigarettes and alcohol to minors', 'Racist speech', 'Engaging in espionage', 'Buying and selling personal information', 'Premarital sex', 'Producing and selling low-quality pharmaceutical drugs', 'Lion', 'Polluting water sources', 'Forging invoices', 'Speeding', 'Disobeying orders during wartime', 'Hit-and-run', 'Desecration of religious sites', 'Jealousy and belittling', 'Driving without a license', 'Abortion', 'Zebra', 'Doping in sports', 'Throwing objects from heights', 'Mocking people with disabilities', 'Spreading rumors', 'Same-sex marriage', 'Flattery', 'Inciting racial hate', 'Absenteeism from work', 'Arrogance', 'Buying and selling wild animals', 'Incest', 'Sexual harassment', 'Sexism', 'Electoral fraud', 'Counterfeiting currency', 'False advertising', 'Rudeness', 'Defamation', 'Giving up halfway', 'Buying and selling firearms', 'Vanity', 'Inflicting serious bodily harm without intent', 'Fraud', 'Unfair competition', 'Theft', 'Pineapple', 'Police brutality', 'Lying to friends', 'Banana', 'Human trafficking', 'Occupying fire lanes', 'Browsing porn', 'Abandoning children', 'Wage theft', 'Grape', 'Cutting in line', 'Orange', 'Self-harm', 'Laziness', 'Obstructing official duties', 'Killing pets', 'Refusing to admit or correct mistakes', 'Leaking national secrets', 'Damaging cultural artifiacts', 'Wiretapping', 'Operating a gambling establishment', 'Abuse', 'Rape', 'Shoplifting', 'Stubbornness', 'Skipping school', 'Premeditated murder', 'Kidnapping', 'Having sexuality intercourse with animals (bestiality)', 'Bullying', 'Insulting others', 'Making loud noises', 'Selling inferior goods as superior', 'Betrayal and deviation from a moral standard', 'Child molestation', 'Organizing exam cheating', 'Distributing obscene materials', 'Torturing animals', 'Wasting food', 'Fighting', 'Spitting on the ground and public urination', 'Air pollution', 'Marital infidelity', 'Littering', 'Suppressing freedom of speech', 'Creating and profiting from a cult', 'Organizing and leading pyramid schemes', 'Watermelon', 'Terrorist activities', 'Domestic violence', 'Assaulting a police officer', 'Failure to support parents', "Unauthorized use of another's account", 'Carelessness', 'Harboring fugitives', 'Defaulting on debts', 'Causing internal conflict within a group or organization', 'Extortion', 'Slacking off', 'Depriving someone of educational opportunities', 'Cat', 'Transportation hijacking', 'Cutting corners in construction projects', 'Cultural discrimination', 'Preparing last minute (i.e. cramming for an exam)', 'Copyright infringement', 'Hindering safe driving', 'Lending money with a very high interest rate (i.e. usury)', 'Organizing prostitution', 'Soliciting prostitution', 'Damaging public facilities', 'Emotional abuse', 'Binge eating', 'Engaging in unrestrained group sexual activity (i.e., an orgy)', 'Workplace bullying', 'Evading bills', 'Trespassing in military restricted zones'];

const words = ref(props.uu ? g_words : b_words);

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