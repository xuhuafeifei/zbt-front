<script setup lang="ts">
import { ref } from "vue";
import { ElTable, ElTableColumn, ElButton, ElImage } from "element-plus";

// 示例数据，请根据实际情况调整
const tableData = ref([
  {
    id: "01",
    picture:
      "https://feigebuge.oss-cn-beijing.aliyuncs.com/QQ%E5%9B%BE%E7%89%8720230819130111.gif",
    giftName: "迪奥口红",
    giftBrand: "迪奥",
    classify: "美妆",
    // 款式
    style: "滋润款",
    use: "满赠",
    price: "50-100元",
    remark: "-"
  }
  // ... 其他行数据
]);

const editItem = item => {
  console.log("编辑项:", item);
  // 编辑操作逻辑
};
</script>

<template>
  <div>
    <el-table :data="tableData" style="width: 100%">
      <el-table-column type="selection" width="55" />
      <el-table-column prop="id" label="序号" />
      <el-table-column label="礼品图片">
        <template #default="scope">
          <el-image
            style="width: 50px; height: 50px"
            :src="scope.row.image"
            fit="cover"
          />
        </template>
      </el-table-column>
      <el-table-column prop="giftName" label="礼品名称" />
      <el-table-column prop="giftBrand" label="品牌" />
      <el-table-column prop="classify" label="分类" />
      <el-table-column prop="style" label="款式" />
      <el-table-column prop="use" label="用途" />
      <el-table-column prop="price" label="价格" />
      <el-table-column prop="remark" label="备注" />
      <el-table-column label="操作" width="120" fixed="right">
        <template #default="scope">
          <el-button type="text" @click="editItem(scope.row)">编辑</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<style lang="scss" scoped></style>
