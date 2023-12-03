<script setup lang="ts">
import { ref, nextTick } from "vue";
import {
  ElTable,
  ElTableColumn,
  ElRow,
  ElCol,
  ElSelect,
  ElOption,
  ElInput,
  ElButton,
  ElImage
} from "element-plus";

import GiftForm from "./component/giftForm.vue";

// 示例数据，请根据实际情况调整
const tableData = ref([
  {
    id: "01",
    picture:
      "https://feigebuge.oss-cn-beijing.aliyuncs.com/QQ%E5%9B%BE%E7%89%8720230819130111.gif",
    giftName: "迪奥口红",
    giftBrand: "迪奥",
    classify: "美妆",
    use: "满赠",
    price: "50-100元",
    giftStyle: "亚光款",
    applicableGrade: "黄金会员",
    uploader: "采购部门",
    // ...其他数据
    uploadDate: "2023/10/21"
  }
  // ...其他行数据
]);

const filters = ref({
  category: "",
  use: "",
  price: ""
});

const searchText = ref("");

const search = () => {
  console.log("搜索内容:", searchText.value);
  // 实现搜索逻辑
};

const editItem = item => {
  console.log("编辑项:", item);
  // 实现编辑逻辑
  nextTick(() => {
    giftFormRef.value.init(item);
  });
};

const deleteItem = item => {
  console.log("删除项:", item);
  // 实现删除逻辑
};

const dialogVisible = ref(false);

const add = () => {
  dialogVisible.value = true;
  nextTick(() => {
    giftFormRef.value.init();
  });
};

const giftFormRef = ref(null);
</script>

<template>
  <el-row :gutter="20" class="filter-row" style="margin-top: 20px">
    <el-col :span="6">
      <el-select v-model="filters.category" placeholder="分类">
        <el-option label="全部" value="全部" />
      </el-select>
    </el-col>
    <!-- 添加其他筛选器 -->
    <el-col :span="6">
      <el-select v-model="filters.use" placeholder="用途">
        <el-option label="全部" value="全部" />
      </el-select>
    </el-col>
    <el-col :span="6">
      <el-select v-model="filters.price" placeholder="价格">
        <el-option label="全部" value="全部" />
      </el-select>
    </el-col>

    <el-button @click="add" type="primary">添加</el-button>
  </el-row>

  <el-table :data="tableData" style="width: 95%" stripe>
    <el-table-column prop="id" label="序号" />
    <el-table-column prop="picture" label="礼品图片">
      <template #default="scope">
        <el-image
          style="width: 50px; height: 50px"
          :src="scope.row.picture"
          fit="cover"
        />
      </template>
    </el-table-column>
    <el-table-column prop="giftName" label="礼品名称" />
    <el-table-column prop="giftBrand" label="品牌" />
    <el-table-column prop="classify" label="分类" />
    <el-table-column prop="use" label="用途" />
    <el-table-column prop="price" label="价格" />
    <el-table-column prop="giftStyle" label="款式" />
    <el-table-column prop="applicableGrade" label="适用等级" />
    <el-table-column prop="uploader" label="上传用户" />
    <el-table-column prop="uploadDate" label="上传时间" />
    <!-- 操作列 -->
    <el-table-column label="操作" fixed="right" width="130">
      <template #default="scope">
        <el-button link @click="editItem(scope.row)" type="primary"
          >编辑</el-button
        >
        <el-button link @click="deleteItem(scope.row)" type="primary"
          >删除</el-button
        >
      </template>
    </el-table-column>
  </el-table>
  <GiftForm v-if="dialogVisible" ref="giftFormRef" />
</template>

<style lang="scss" scoped>
.filter-row {
  margin-bottom: 20px;
}
</style>
