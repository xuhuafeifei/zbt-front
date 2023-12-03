<script setup lang="ts">
import { defineProps, ref, toRefs } from "vue";

const props = defineProps({
  operateRecord: {
    type: Object,
    default: () => ({ id: "", operator: "", operateDate: "", dynamic: "" })
  }
});

const reply = () => {
  console.log(localOperateRecord.value);
};

// 使用 toRefs 创建对 prop 的响应式引用
const { operateRecord } = toRefs(props);

// 定义一个本地的响应式数据属性来存储 prop 的副本
const localOperateRecord = ref({ ...operateRecord.value });
</script>

<template>
  <div class="message-header">
    <span class="message-date">操作人:{{ localOperateRecord.operator }}</span>
    <!-- <el-input v-model="localOperateRecord.operator" disabled /> -->
  </div>
  <div class="message-content">
    <span class="message-date">
      时间: {{ localOperateRecord.operateDate }}
      <!-- <el-date-picker v-model="localOperateRecord.operateDate" disabled /> -->
    </span>
  </div>
  <div class="message-content">
    <span class="message-date">动态: {{ localOperateRecord.dynamic }}</span>
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
  background-color: #5f5c5c55; /* 灰色背景 */
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
  color: #999; /* 灰色字体 */
}

.message-content {
  margin-bottom: 15px; /* 底部间距 */
}

.message-footer {
  text-align: right; /* 右对齐 */
}
</style>
