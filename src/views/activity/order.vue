<script setup lang="ts">
import { ref } from "vue";
import {
  ElForm,
  ElFormItem,
  ElInput,
  ElSelect,
  ElOption,
  ElButton,
  ElTable,
  ElTableColumn,
  ElMessage
} from "element-plus";
import { useRouter } from "vue-router";

const router = useRouter();
const searchText = ref("");
const selected = ref("");
const options = ref([
  { value: "全部", label: "全部" },
  { value: "待接单", label: "待接单" },
  { value: "进行中", label: "进行中" },
  { value: "待验收", label: "待验收" },
  { value: "已完成", label: "已完成" }
  // ...其他选项
]);

const onSearchClick = () => {
  // 这里可以添加搜索逻辑
  console.log("搜索内容:", searchText.value);
  console.log("选择的选项:", selected.value);
};

// 示例数据
const tableData = ref([
  {
    orderId: "12345678910",
    customer: "王小虎",
    activityType: "双十一大促",
    materialType: "海报",
    creationDate: "2023/10/31 14:20:20",
    completionDate: "-",
    status: "待接单"
  }
  // ...其他数据项
]);

const handleClickView = row => {
  console.log("click");
  router.push(`/activity/orderDetail/${row.id}`);
};

const handleClickPassDraft = row => {
  console.log(row);
  ElMessage.error("暂无原型图");
};

const handleClickPassSouceFile = row => {
  console.log(row);
  ElMessage.error("暂无原型图");
};

const handleClickTakeOrder = row => {
  console.log(row);
  ElMessage.error("暂无原型图");
};
</script>

<template>
  <div>
    <el-form inline>
      <el-form-item>
        <el-input placeholder="请输入搜索内容" v-model="searchText" />
      </el-form-item>
      <el-form-item>
        <el-select v-model="selected" placeholder="请选择">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSearchClick">搜索</el-button>
      </el-form-item>
    </el-form>
    <el-table
      :data="tableData"
      style="width: 100%"
      border
      stripe
      :header-cell-style="{ 'text-align': 'center' }"
      :cell-style="{ 'text-align': 'center' }"
    >
      <el-table-column prop="orderId" label="订单编号" width="120" />
      <el-table-column prop="customer" label="顾客/门店" width="100" />
      <el-table-column prop="activityType" label="活动类型" width="100" />
      <el-table-column prop="materialType" label="物料类型" width="100" />
      <el-table-column prop="creationDate" label="创建时间" width="160" />
      <el-table-column prop="completionDate" label="完成时间" width="160" />
      <el-table-column fixed="right" label="操作" width="250">
        <template #default="scope">
          <el-button
            link
            type="primary"
            size="small"
            @click="handleClickView(scope.row)"
            >查看</el-button
          >
          <el-button
            link
            type="primary"
            size="small"
            @click="handleClickTakeOrder(scope.row)"
            >接单</el-button
          >
          <el-button
            link
            type="primary"
            size="small"
            @click="handleClickPassDraft(scope.row)"
            >传初稿</el-button
          >
          <el-button
            link
            type="primary"
            size="small"
            @click="handleClickPassSouceFile(scope.row)"
            >传源文件</el-button
          >
        </template>
      </el-table-column>
      <el-table-column prop="status" label="完成时间" width="100" />
    </el-table>
  </div>
</template>

<style lang="scss" scoped></style>
