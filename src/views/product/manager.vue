<script setup lang="ts">
import { ref } from "vue";
import { ElTable, ElTableColumn, ElImage, ElButton } from "element-plus";
import ProductForm from "./component/productForm.vue";

// 示例数据，应根据实际后端数据格式调整
const tableData = ref([
  {
    id: "01",
    picture:
      "https://feigebuge.oss-cn-beijing.aliyuncs.com/QQ%E5%9B%BE%E7%89%8720230819130111.gif",
    name: "18k金钻石截至",
    brand: "老凤祥",
    material: "素金",
    style: "手镯",
    finishQuality: "5G",
    number: 10,
    vegetarianGoldWeight: "15g",
    jewellerWeight: "-",
    size: "60圈口",
    orderDate: "2023/10/21",
    scene: "日常销售"
  }
  // ...其他数据项
]);

const editItem = item => {
  console.log("编辑项:", item);
  // 编辑操作逻辑
};

const deleteItem = item => {
  console.log("删除项:", item);
  // 删除操作逻辑
};

const dialogVisible = ref(false);

const add = () => {
  dialogVisible.value = true;
};
</script>

<template>
  <el-row>
    <el-button @click="add" type="primary">添加</el-button>
  </el-row>
  <el-table :data="tableData" style="width: 95%">
    <el-table-column type="index" label="序号" />
    <el-table-column label="产品图片">
      <template #default="scope">
        <el-image
          style="width: 50px; height: 50px"
          :src="scope.row.picture"
          fit="cover"
        />
      </template>
    </el-table-column>
    <el-table-column prop="name" label="产品名称" />
    <el-table-column prop="brand" label="品牌" />
    <el-table-column prop="material" label="材质" />
    <el-table-column prop="finishQuality" label="成色" />
    <el-table-column prop="scene" label="场景" />
    <el-table-column prop="style" label="款式" />
    <el-table-column prop="vegetarianGoldWeight" label="金重" />
    <el-table-column prop="size" label="尺寸" />
    <el-table-column prop="jewellerWeight" label="珠宝价值" />
    <el-table-column prop="orderDate" label="上传时间" />
    <el-table-column label="操作" fixed="right" width="150">
      <template #default="scope">
        <el-button type="primary" link @click="editItem(scope.row)"
          >编辑</el-button
        >
        <el-button type="primary" link @click="deleteItem(scope.row)"
          >删除</el-button
        >
      </template>
    </el-table-column>
  </el-table>
  <ProductForm v-if="dialogVisible" />
</template>

<style lang="scss" scoped></style>
