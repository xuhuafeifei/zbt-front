<script setup lang="ts">
import { defineProps, ref, toRefs } from "vue";
import "@wangeditor/editor/dist/css/style.css";
import FullText from "@/components/FullText/fulltext.vue";
import {
  onBeforeUnmount,
  shallowRef,
  defineEmits,
  onMounted,
  watch,
  nextTick
} from "vue";
import { Editor, Toolbar } from "@wangeditor/editor-for-vue";
import {
  CommunicateRecordEntity,
  saveCommunicateRecord
} from "@/api/activity/communicateRecord";

const props = defineProps({
  operateRecord: {
    type: CommunicateRecordEntity,
    default: () => new CommunicateRecordEntity()
  }
});

// 定义发射的事件
const emit = defineEmits(["refreshDataList"]);

// 富文本框沟通内容
const valueHtml = ref("");

const fullTextRef = ref(null);

const dialogVisible = ref(false);

const reply = () => {
  console.log(localOperateRecord.value);
  valueHtml.value = "";
  nextTick(() => {
    fullTextRef.value.setData("");
  });
  dialogVisible.value = true;
};

// 提交回复
const submit = () => {
  submitReplyCommunicateRecord();
  dialogVisible.value = false;
};

// 记录当前用户
const currentUser = getStoreUser();

const submitReplyCommunicateRecord = () => {
  if (valueHtml.value.trim() === "") {
    ElMessage.error("沟通内容不能为空");
  } else {
    // 保存
    const entity = new CommunicateRecordEntity();
    entity.uploaderId = currentUser.id;
    entity.uploaderName = currentUser.username;
    entity.content = valueHtml.value;
    entity.orderId = localOperateRecord.value.orderId;
    // 设置父id
    entity.pid = localOperateRecord.value.id;
    console.log(entity);
    saveCommunicateRecord(entity).then(res => {
      console.log(res);
      if (res.code === 0) {
        ElMessage.success("提交成功");
        // 清空输入框
        valueHtml.value = "";
        nextTick(() => {
          fullTextRef.value.setData("");
        });
        // 刷新评论数据
        emit("refreshDataList");
        localOperateRecord.value.childrenList.push(entity);
      } else {
        ElMessage.error("提交失败: " + res.msg);
      }
    });
  }
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

import { User, Timer, ChatRound, CollectionTag } from "@element-plus/icons-vue";
import { ElMessage } from "element-plus";
import { getStoreUser } from "@/api/utils";
</script>

<template>
  <el-card style="margin-bottom: 10px">
    <el-descriptions
      class="margin-top"
      :column="3"
      size="large"
      direction="vertical"
      border
    >
      <el-descriptions-item>
        <template #label>
          <div class="cell-item">
            <el-icon :style="iconStyle">
              <CollectionTag />
            </el-icon>
            回复id
          </div>
        </template>
        <el-tag>{{ localOperateRecord.id }}</el-tag>
      </el-descriptions-item>
      <el-descriptions-item>
        <template #label>
          <div class="cell-item">
            <el-icon :style="iconStyle">
              <User />
            </el-icon>
            操作人
          </div>
        </template>
        {{ localOperateRecord.uploaderName }}
      </el-descriptions-item>
      <el-descriptions-item>
        <template #label>
          <div class="cell-item">
            <el-icon :style="iconStyle">
              <Timer />
            </el-icon>
            时间
          </div>
        </template>
        {{ localOperateRecord.uploadTime }}
      </el-descriptions-item>
      <el-descriptions-item>
        <template #label>
          <div class="cell-item">
            <el-icon :style="iconStyle">
              <ChatRound />
            </el-icon>
            动态
          </div>
        </template>
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
      </el-descriptions-item>
    </el-descriptions>
    <el-button type="text" icon="el-icon-chat-dot-round" @click="reply"
      >回复</el-button
    >
  </el-card>
  <!-- 子评论 -->
  <p v-for="child in localOperateRecord.childrenList" :key="child.id">
    <el-card
      style="
        margin-left: 50px;
        background-color: aliceblue;
        margin-bottom: 10px;
      "
    >
      <el-description>
        <el-description-item>{{ child.uploadTime }}</el-description-item
        ><br />
        <el-description-item @click="reply">
          {{ child.uploaderName }} 回复<el-text style="color: cornflowerblue"
            >@{{ localOperateRecord.uploaderName }}</el-text
          >
        </el-description-item>
        <el-description-item>
          <Editor
            :defaultConfig="editorConfig"
            :editor="editorRef"
            :mode="mode"
            v-model="child.content"
            :style="100"
            @onCreated="handleCreated"
            @onDestroyed="handleDestroyed"
            @customAlert="customAlert"
            @customPaste="customPaste"
          />
        </el-description-item>
        <el-description-item>
          <el-button type="text" icon="el-icon-chat-dot-round" @click="reply"
            >回复</el-button
          ></el-description-item
        >
      </el-description>
    </el-card>
  </p>
  <!-- 回复窗口 -->
  <el-dialog v-model="dialogVisible" title="回复" width="50%">
    <FullText high="200px" v-model:html="valueHtml" ref="fullTextRef" />
    <el-button @click="submit">提交</el-button>
  </el-dialog>
</template>

<style lang="scss" scoped></style>
