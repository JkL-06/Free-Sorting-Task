<template>
    <div id="exp"></div>
</template>

<script setup>
import { onMounted, h, render } from 'vue';
import { initJsPsych } from 'jspsych';
import { jsPsychHtmlKeyboardResponse } from '@/utils/jspsych/plugin_all_in_one.js';

import Naodao from '@/utils/naodao.js';
import dragWord from './dragWord.vue';

const naodao = new Naodao();

const jsPsych = initJsPsych({
    display_element: "exp",
    on_finish() {
        console.log(jsPsych.data.get().csv());
        jsPsych.data.get().localSave("csv", `${new Date().getTime()}.csv`);
        onCredamoEndTrialFinish(jsPsych.data.get().csv());
        naodao.save();
    }
});

naodao.getData = () => {
  return jsPsych.data.get().csv();
}

const timeline = [{
  timeline: [{
    type: jsPsychHtmlKeyboardResponse,
    choices: "NO_KEYS",
    stimulus: () => {
      return "请用本地浏览器打开";
    }
  }],
  conditional_function: () => {
    var ua = navigator.userAgent.toLowerCase();
    if (ua.match(/micromessenger/i) == "micromessenger") {
      return true;
    } else {
      return false;
    }
  }
}];

const uu = jsPsych.data.getURLVariable("uu");
timeline.push({
  type: jsPsychHtmlKeyboardResponse,
  choices: ["NO_KEYS"],
  stimulus: "<div id='main'></div>",
  on_load() {
    const dom = document.querySelector("#main");
    const start_time = new Date().getTime();
    console.log(uu)
    render(h(dragWord, {
      uu: uu == "good",
      onEndExp(e) {
        jsPsych.data.write({ ans: e });
        jsPsych.finishTrial({ rt: new Date().getTime() - start_time });
      }
    }), dom);
  }
});


onMounted(() => {
    jsPsych.run(timeline);
});
</script>