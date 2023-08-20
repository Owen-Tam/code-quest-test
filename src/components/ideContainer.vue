<template>
  <div class="container">
    <div class="ide-container">
      <p class="instructions">Step {{ step }} {{ instruction }}</p>

      <html-IDE @code-updated="updateHTML" :defaultCode="htmlCode"></html-IDE>
      <css-IDE @code-updated="updateCSS" :defaultCode="cssCode"></css-IDE>
      <button @click="submitCode">Submit!</button>
      <p v-if="error" class="error">{{ error }}</p>
      <div class="complete-block" v-if="completeMessage">
        <p class="completeMessage">
          {{ completeMessage }}
        </p>
        <button v-if="!endOfQuest" @click="nextStep">Next Step</button>
        <button v-else>Next Quest</button>
      </div>
    </div>
    <ide-output ref="output" :code="compiled"></ide-output>
  </div>
</template>

<script setup>
import htmlIDE from "./htmlIDE.vue";
import cssIDE from "./cssIDE.vue";
import ideOutput from "./ideOutput.vue";
import aInfo from "../checks/a1.js";
const { levels } = aInfo;

import { ref, computed } from "vue";

const output = ref(null);
const step = ref(1);

const levelsObj = computed(() => {
  return levels[step.value - 1];
});

const htmlCode = ref(levelsObj.value.defaultCode.htmlCode);
const cssCode = ref(levelsObj.value.defaultCode.cssCode);
console.log(htmlCode.value, cssCode.value);
const updateHTML = function (newHtml) {
  htmlCode.value = newHtml;
};
const updateCSS = function (newCss) {
  cssCode.value = newCss;
};
let error = ref("");
let completeMessage = ref("");

const tests = computed(() => levelsObj.value.tests);

const instruction = computed(() => levelsObj.value.instruction);

const submitCode = function () {
  const doc = output.value.frame.contentWindow.document.body;
  let errorFound = false;
  for (const test of tests.value) {
    const testRes = test.testFunc(doc);
    if (!testRes) {
      error.value = test.error;
      completeMessage.value = "";
      errorFound = true;
      break;
    }
  }
  if (!errorFound) {
    error.value = "";
    completeMessage.value = "Success!";
  }
};
const nextStep = function () {
  step.value = step.value + 1;
  error.value = "";
  completeMessage.value = "";
};
const compiled = computed(() => {
  return `${htmlCode.value}<style>${cssCode.value}</style>`;
});

const endOfQuest = computed(() => {
  return step.value >= levels.length;
});
</script>

<style scoped>
.ide-container {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  width: 100%;
  flex: 1;
  height: 100%;
}
button {
  align-self: flex-start;
  padding: 0.5rem;
}
.container {
  padding: 1rem;
  gap: 2rem;

  display: flex;
  justify-content: space-around;
}
</style>
