<script setup lang="ts">
import { ref, onMounted } from "vue";
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
import {
  OrderEntity,
  getOrderList,
  ConditionOrder
} from "@/api/activity/order";
import { getStoreUser } from "@/api/utils";

const router = useRouter();
const searchText = ref("");
const selected = ref("全部");
const options = ref([
  { value: "全部", label: "全部" },
  { value: "待接单", label: "待接单" },
  { value: "进行中", label: "进行中" },
  { value: "待验收", label: "待验收" },
  { value: "已完成", label: "已完成" }
  // ...其他选项
]);

onMounted(() => {
  onSearchClick();
});

const onSearchClick = () => {
  // 这里可以添加搜索逻辑
  console.log("搜索内容:", searchText.value);
  console.log("选择的选项:", selected.value);
  const storeUser = getStoreUser();
  console.log(storeUser);
  const co = new ConditionOrder();
  co.page = pageIndex.value;
  co.limit = pageSize.value;
  co.status = selected.value;
  // 如果是普通用户, 只能查看自己的订单
  if (storeUser.role === "user") {
    co.userId = storeUser.id;
  }
  // 获取order
  getOrderList(co).then(res => {
    console.log(res);
    tableData.value = res.data.list;
    totalPage.value = res.data.totalCount;
  });
};

// 示例数据
const tableData = ref<Array<OrderEntity>>([]);

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

const pageIndex = ref(1);
const pageSize = ref(10);
const totalPage = ref(0);

// 每页数
const sizeChangeHandle = val => {
  pageSize.value = val;
  pageIndex.value = 1;
  // getDataList(className.value);
};
// 当前页
const currentChangeHandle = val => {
  pageIndex.value = val;
  // getDataList(className.value);
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
      <el-table-column prop="id" label="订单编号" width="120" />
      <el-table-column prop="demandStore" label="需求门店" width="100" />
      <el-table-column prop="actName" label="活动名称" width="100" />
      <el-table-column prop="material" label="物料类型" width="100" />
      <el-table-column prop="orderTime" label="创建时间" width="160" />
      <el-table-column prop="demandTime" label="需求时间" width="160" />
      <el-table-column prop="finishTime" label="完成时间" width="100" />
      <el-table-column prop="status" label="状态" width="160" />
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
    </el-table>
    <el-pagination
      @size-change="sizeChangeHandle"
      @current-change="currentChangeHandle"
      :current-page="pageIndex"
      :page-sizes="[10, 20, 50, 100]"
      :page-size="pageSize"
      :total="totalPage"
      layout="total, sizes, prev, pager, next, jumper"
    />
  </div>
</template>

<style lang="scss" scoped></style>
