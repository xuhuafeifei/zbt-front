<script setup lang="ts">
import { nextTick, ref } from "vue";
import {
  ElRow,
  ElCol,
  ElInput,
  ElSelect,
  ElOption,
  ElButton,
  ElTable,
  ElTableColumn,
  ElMessage
} from "element-plus";
import SizeForm from "../component/sizeForm.vue";

// 示例数据，您应该根据实际数据格式调整
const tableData = ref([
  {
    id: "01",
    name: "秒杀",
    date: "2023/10/21 20:20:20",
    status: "启用"
  },
  {
    id: "02",
    name: "引流",
    date: "2023/10/21 20:20:20",
    status: "启用"
  }
  // ... 其他行数据
]);

const dialogVisible = ref(false);

const sizeFormRef = ref(null);

const addItem = () => {
  dialogVisible.value = true;
  nextTick(() => {
    sizeFormRef.value.init();
  });
};

const editItem = item => {
  // 编辑操作逻辑
  dialogVisible.value = true;
  nextTick(() => {
    console.log("编辑项:", item);
    sizeFormRef.value.init(item);
  });
};

const deleteItem = item => {
  // 删除操作逻辑
  console.log("删除项:", item);
};
</script>

<template>
  <div style="margin-bottom: 10px; margin-top: 10px">
    <el-button type="primary" plain @click="addItem">新增</el-button>
  </div>
  <el-table :data="tableData" stripe style="width: 95%">
    <el-table-column prop="id" label="序号" />
    <el-table-column prop="name" label="名称" />
    <el-table-column prop="date" label="上传时间" />
    <el-table-column prop="status" label="状态" />
    <el-table-column label="操作" fixed="right">
      <template #default="scope">
        <el-button link type="primary" @click="editItem(scope.row)"
          >编辑</el-button
        >
        <el-button link type="primary" @click="deleteItem(scope.row)"
          >删除</el-button
        >
      </template>
    </el-table-column>
  </el-table>
  <SizeForm v-if="dialogVisible" ref="sizeFormRef" />
</template>

<style lang="scss" scoped></style>
