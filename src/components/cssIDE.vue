<template>
  <div>
    <codemirror
      v-model="code"
      placeholder="CSS Code..."
      class="html-editor"
      :autofocus="true"
      :indent-with-tab="true"
      :tab-size="2"
      :extensions="extensions"
      @ready="handleReady"
      @update:modelValue="updated"
    />
  </div>
</template>

<script>
import { defineComponent, ref, shallowRef } from "vue";
import { Codemirror } from "vue-codemirror";
import { css } from "@codemirror/lang-css";
import { oneDark } from "@codemirror/theme-one-dark";
export default defineComponent({
  components: {
    Codemirror,
  },
  props: ["defaultCode"],
  setup(props, context) {
    const code = ref(`${props.defaultCode ? props.defaultCode : ""}`);
    const extensions = [css(), oneDark];

    // Codemirror EditorView instance ref
    const view = shallowRef();
    const handleReady = (payload) => {
      view.value = payload.view;
    };
    const updated = function (value) {
      console.log(value);
      context.emit("code-updated", value);
    };
    return {
      code,
      extensions,
      handleReady,
      log: console.log,
      updated,
    };
  },
});
</script>

<style>
.cm-editor {
  text-align: left;
  height: 100%;
}
</style>
