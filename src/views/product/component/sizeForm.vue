<script setup lang="ts">
import { ref } from "vue";

const title = ref("");

const obj = {
  name: "",
  status: ""
};

const formData = ref(obj);

const dialogVisible = ref(false);

// 处理父组件传递数据给子组件
function init(newData) {
  dialogVisible.value = true;
  if (newData === null || newData === undefined) {
    title.value = "新增表单";
    formData.value = obj;
  } else {
    title.value = "编辑表单";
    formData.value = newData;
  }
  console.log(formData.value);
}

// 使用 defineExpose 暴露子组件的方法
defineExpose({ init });
</script>

<template>
  <div>
    <el-dialog
      :title="title"
      v-model="dialogVisible"
      align-center
      center
      style="width: 400px"
    >
      <el-form :model="formData">
        <el-form-item label="名称">
          <el-input v-model="formData.name" />
        </el-form-item>
        <el-form-item label="上传时间">
          <el-input v-model="formData.uploadDate" />
        </el-form-item>
        <el-form-item label="状态">
          <el-input v-model="formData.status" />
        </el-form-item>
      </el-form>
      <el-button type="primary">提交</el-button>
    </el-dialog>
  </div>
</template>

<style lang="scss" scoped></style>
