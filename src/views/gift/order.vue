<script setup lang="ts">
import { Search } from "@element-plus/icons-vue";
import { ref } from "vue";
import {
  ElTable,
  ElTableColumn,
  ElInput,
  ElButton,
  ElMessage
} from "element-plus";

import { useRouter } from "vue-router";
import router from "@/router";

const searchText = ref("");

// 示例数据，请根据实际情况调整
const tableData = ref([
  {
    orderNumber: "123456789",
    demandShop: "正荣张万福",
    count: 50,
    giftName: "迪奥口红",
    giftBrand: "迪奥",
    orderDate: "2023/01/31 14:20:20",
    finishDate: "2023/01/31 14:20:20",
    remark: "色号999多一些",
    status: "待审核"
  }
  // ... 更多数据
]);

const search = () => {
  console.log("搜索内容:", searchText.value);
  // 实现搜索逻辑
};

const editOrder = order => {
  console.log("编辑订单:", order);
  // 实现编辑订单逻辑
};

const deleteOrder = order => {
  console.log("删除订单:", order);
  // 实现删除订单逻辑
};

const statusList = ["待审核", "采购中", "待验收", "已完成"];

const selectStatus = ref("待审核");

const handleClickView = row => {
  console.log("click");
  router.push(`/gift/orderDetail/${row.id}`);
};

const handleClickAudit = row => {
  ElMessage.error("暂无原型图");
  console.log(row);
};

const handleClickPurchase = row => {
  ElMessage.error("暂无原型图");
  console.log(row);
};

const handleClickDelivery = row => {
  ElMessage.error("暂无原型图");
  console.log(row);
};
</script>

<template>
  <div>
    <!-- 搜索区域 -->
    <el-row>
      <el-col :span="5" style="margin-right: 50px">
        <el-input
          v-model="searchText"
          placeholder="输入订单编号搜索"
          class="search-input"
          style="width: 200px"
        />
      </el-col>

      <el-col :span="15">
        <el-text style="margin-right: 20px">订单状态</el-text>
        <el-select v-model="selectStatus" style="margin-right: 50px">
          <el-option
            v-for="item in statusList"
            :key="item"
            :label="item"
            :value="item"
        /></el-select>
        <el-button
          icon="el-icon-search"
          @click="search"
          type="primary"
          :icon="Search"
          >搜索</el-button
        >
      </el-col>
    </el-row>

    <!-- 表格区域 -->
    <el-table :data="tableData" style="width: 100%">
      <el-table-column prop="orderNumber" label="订单编号" width="100" />
      <el-table-column prop="demandShop" label="商品名称" width="130" />
      <el-table-column prop="count" label="数量" width="80" />
      <el-table-column prop="giftName" label="礼品名称" />
      <el-table-column prop="giftBrand" label="礼品品牌" />
      <el-table-column prop="orderDate" label="创建时间" width="160" />
      <el-table-column prop="finishDate" label="完成时间" width="160" />
      <el-table-column prop="remark" label="备注" />
      <el-table-column prop="status" label="待审核" />
      <!-- 操作列 -->
      <el-table-column label="操作" fixed="right" width="200">
        <template #default="scope">
          <el-button type="text" @click="handleClickView(scope.row)"
            >查看</el-button
          >
          <el-button type="text" @click="handleClickAudit(scope.row)"
            >审核</el-button
          >
          <el-button type="text" @click="handleClickPurchase(scope.row)"
            >采购</el-button
          >
          <el-button type="text" @click="handleClickDelivery(scope.row)"
            >发货</el-button
          >
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<style lang="scss" scoped>
.search-input {
  margin-bottom: 20px;
  width: 300px;
}

.el-table-column {
  text-align: center;
}
</style>
