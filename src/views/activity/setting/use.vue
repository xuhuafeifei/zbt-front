<script setup lang="ts">
import { ref } from "vue";
import { ElTable, ElTableColumn, ElButton } from "element-plus";

const tableData = ref([
  { id: "01", name: "招聘", date: "2023/10/21 20:20:20", status: "启用" },
  { id: "02", name: "开业", date: "2023/10/21 20:20:20", status: "启用" },
  { id: "03", name: "日常宣传", date: "2023/10/21 20:20:20", status: "启用" },
  { id: "04", name: "地推", date: "2023/10/21 20:20:20", status: "停用" }
]);

const edit = row => {
  console.log(row);
};

const deleteInfo = row => {
  console.log(row);
};

const handleAdd = () => {
  console.log("点击了新增按钮");
  // 这里可以添加新增逻辑
};
</script>

<template>
  <div>
    <el-button style="margin-bottom: 9px" type="primary" @click="handleAdd"
      >新增用途</el-button
    >
    <el-table
      style="width: 95%"
      :data="tableData"
      :header-cell-style="{ 'text-align': 'center' }"
      :cell-style="{ 'text-align': 'center' }"
    >
      <el-table-column prop="id" label="序号" />
      <el-table-column prop="name" label="名称" />
      <el-table-column prop="date" label="上传时间" />
      <el-table-column prop="status" label="状态" />
      <el-table-column label="操作" fixed="right">
        <template #default="scope">
          <el-button size="mini" type="primary" @click="edit(scope.row)" link
            >编辑</el-button
          >
          <el-button
            size="mini"
            type="primary"
            @click="deleteInfo(scope.row)"
            link
            >删除</el-button
          >
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<style lang="scss" scoped></style>
