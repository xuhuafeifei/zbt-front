<script setup lang="ts">
import { ref } from "vue";
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
import router from "@/router";

const searchText = ref("");

const statusList = ["待审核", "采购中", "待验收", "已完成"];

const selectStatus = ref("待审核");

const filterText = ref("");
const selectedStatus = ref("");
// 示例数据，您应该根据实际数据格式调整
const tableData = ref([
  {
    orderNumber: "12345610",
    demandStore: "正荣张方福",
    number: "50件",
    vegetarianGoldWeight: "25.9g",
    jewellerWeight: "50000元",
    orderDate: "2023/10/31 14:20:20",
    finishDate: "-",
    size: "60圈口",
    remark: "-",
    status: "待审核"
  }
  // ...其他行数据
]);

const search = () => {
  console.log("搜索:", filterText.value, "状态:", selectedStatus.value);
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

const handleClickView = row => {
  console.log("click");
  router.push(`/product/orderDetail/${row.id}`);
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
    <el-row style="margin-bottom: 20px">
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
        <el-button icon="el-icon-search" @click="search" type="primary"
          >搜索</el-button
        >
      </el-col>
    </el-row>

    <el-table :data="tableData" style="width: 95%" border>
      <el-table-column prop="orderNumber" label="订单编号" />
      <el-table-column prop="demandStore" label="需求门店" />
      <el-table-column prop="number" label="数量" />
      <el-table-column prop="vegetarianGoldWeight" label="素金金重" />
      <el-table-column prop="jewellerWeight" label="珠宝价值" />
      <el-table-column prop="orderDate" label="创建时间" />
      <el-table-column prop="finishDate" label="完成时间" />
      <el-table-column prop="remark" label="备注" />
      <el-table-column prop="status" label="状态" />
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
.filter-row {
  margin-bottom: 20px;
}
</style>
