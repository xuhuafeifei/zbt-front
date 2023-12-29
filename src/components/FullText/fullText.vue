<template>
  <div>
    <!-- <div>
      <button @click="insertText">insert text</button>
      <button @click="printHtml">print html</button>
      <button @click="disable">disable</button>
    </div> -->
    <div style="border: 1px solid #ccc; margin-top: 10px">
      <Toolbar
        :editor="editorRef"
        :defaultConfig="toolbarConfig"
        :mode="mode"
        style="border-bottom: 1px solid #ccc"
      />
      <Editor
        :defaultConfig="editorConfig"
        :mode="mode"
        v-model="valueHtml"
        :style="{
          height: high
        }"
        @onCreated="handleCreated"
        @onChange="handleChange"
        @onDestroyed="handleDestroyed"
        @onFocus="handleFocus"
        @onBlur="handleBlur"
        @customAlert="customAlert"
        @customPaste="customPaste"
      />
    </div>
    <!-- <div style="margin-top: 10px">
      <textarea
        v-model="valueHtml"
        readonly
        style="width: 100%; height: 200px; outline: none"
      />
    </div> -->
  </div>
</template>

<script setup lang="ts">
import "@wangeditor/editor/dist/css/style.css";
import {
  onBeforeUnmount,
  ref,
  shallowRef,
  defineEmits,
  onMounted,
  defineProps,
  watch
} from "vue";
import { Editor, Toolbar } from "@wangeditor/editor-for-vue";
import { IEditorConfig } from "@wangeditor/editor";
import { activityUrlApi } from "@/api/utils";

// 控制组件高度
const props = defineProps({
  // 控制组件高度
  high: {
    type: String,
    default: "200px"
  },
  html: {
    type: String,
    default: "<p>hello</p>"
  }
});

// 将父组件传递的 valueHtml 作为本地数据进行处理
const valueHtml = ref(props.html);

// 当本地数据变化时，触发 update:valueHtml 事件，将数据传递给父组件
watch(valueHtml, newValue => {
  emits("update:html", newValue);
});

const emits = defineEmits(["update:html"]);

// 编辑器实例，必须用 shallowRef，重要！
const editorRef = shallowRef();

// 模拟 ajax 异步获取内容
onMounted(() => {});

const toolbarConfig = {};
// 初始化 MENU_CONF 属性
const editorConfig: Partial<IEditorConfig> = {
  MENU_CONF: {}
};

// 配置图片上传地址
editorConfig.MENU_CONF["uploadImage"] = {
  server: activityUrlApi("file/fullTextImage")
};

// 配置视频上传地址
editorConfig.MENU_CONF["uploadVideo"] = {
  server: activityUrlApi("file/fullTextImage")
};

// 组件销毁时，也及时销毁编辑器，重要！
onBeforeUnmount(() => {
  const editor = editorRef.value;
  if (editor == null) return;

  editor.destroy();
});

// 编辑器回调函数
const handleCreated = editor => {
  console.log("created", editor);
  editorRef.value = editor; // 记录 editor 实例，重要！
};
const handleChange = editor => {
  // console.log("change:", editor.getHtml());
};
const handleDestroyed = editor => {
  console.log("destroyed", editor);
};
const handleFocus = editor => {
  console.log("focus", editor);
};
const handleBlur = editor => {
  console.log("blur", editor);
};
const customAlert = (info, type) => {
  alert(`&#8203;``【oaicite:0】``&#8203;${type} - ${info}`);
};
const customPaste = (editor, event, callback) => {
  console.log("ClipboardEvent 粘贴事件对象", event);

  // 自定义插入内容
  editor.insertText("xxx");

  // 返回值（注意，vue 事件的返回值，不能用 return）
  callback(false); // 返回 false ，阻止默认粘贴行为
  // callback(true) // 返回 true ，继续默认的粘贴行为
};

const insertText = () => {
  const editor = editorRef.value;
  if (editor == null) return;

  editor.insertText("hello world");
};

const printHtml = () => {
  const editor = editorRef.value;
  if (editor == null) return;
  console.log(editor.getHtml());
};

const disable = () => {
  const editor = editorRef.value;
  if (editor == null) return;
  editor.disable();
};

const mode = "default"; // 或 'simple'

// 暴露给父组件
function setData(value: string) {
  valueHtml.value = value;
}
defineExpose({ setData });
</script>
