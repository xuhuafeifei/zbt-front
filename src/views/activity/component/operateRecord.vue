<script setup lang="ts">
import { defineProps, ref, toRefs } from "vue";
import "@wangeditor/editor/dist/css/style.css";
import {
  onBeforeUnmount,
  shallowRef,
  defineEmits,
  onMounted,
  watch,
  nextTick
} from "vue";
import { Editor, Toolbar } from "@wangeditor/editor-for-vue";
import { CommunicateRecordEntity } from "@/api/activity/communicateRecord";

const props = defineProps({
  operateRecord: {
    type: CommunicateRecordEntity,
    default: () => new CommunicateRecordEntity()
  }
});

const reply = () => {
  console.log(localOperateRecord.value);
};

// 使用 toRefs 创建对 prop 的响应式引用
const { operateRecord } = toRefs(props);

// 定义一个本地的响应式数据属性来存储 prop 的副本
const localOperateRecord = ref({ ...operateRecord.value });

// 编辑器实例，必须用 shallowRef，重要！
const editorRef = shallowRef();

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
const handleDestroyed = editor => {
  console.log("destroyed", editor);
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

onMounted(() => {
  // 只读
  nextTick(() => {
    const editor = editorRef.value;
    editor.disable();
  });
});
</script>

<template>
  <div class="message-header">
    <span class="message-date"
      >操作人:{{ localOperateRecord.uploaderName }}</span
    >
    <!-- <el-input v-model="localOperateRecord.operator" disabled /> -->
  </div>
  <div class="message-content">
    <span class="message-date">
      时间: {{ localOperateRecord.uploadTime }}
      <!-- <el-date-picker v-model="localOperateRecord.operateDate" disabled /> -->
    </span>
  </div>
  <div class="message-content">
    <span class="message-date"
      >动态:
      <Editor
        :defaultConfig="editorConfig"
        :editor="editorRef"
        :mode="mode"
        v-model="localOperateRecord.content"
        :style="100"
        @onCreated="handleCreated"
        @onDestroyed="handleDestroyed"
        @customAlert="customAlert"
        @customPaste="customPaste"
      />
    </span>
    <!-- <el-input v-model="localOperateRecord.dynamic" /> -->
  </div>
  <div class="message-footer">
    <el-button type="text" icon="el-icon-chat-dot-round" @click="reply"
      >回复</el-button
    >
  </div>
</template>

<style lang="scss" scoped>
/* 卡牌 */
.message-box {
  background-color: #211e1e55; /* 灰色背景 */
  border-radius: 10px; /* 圆角边框 */
  padding: 20px; /* 内边距 */
}

.message-header {
  display: flex;
  justify-content: space-between; /* 两端对齐 */
  margin-bottom: 15px; /* 底部间距 */
}

.message-title {
  font-weight: bold; /* 加粗字体 */
}

.message-date {
  color: #2a2828; /* 灰色字体 */
}

.message-content {
  margin-bottom: 15px; /* 底部间距 */
}

.message-footer {
  text-align: right; /* 右对齐 */
}
</style>
