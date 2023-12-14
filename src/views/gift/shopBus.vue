<script setup lang="ts">
import { ref } from "vue";
import { ElTable, ElTableColumn, ElButton, ElImage } from "element-plus";

interface Shop {
  id: string;
  picture: string;
  giftName: string;
  giftBrand: string;
  classify: string;
  style: string;
  use: string;
  price: string;
  remark: "-";
}

// 示例数据，请根据实际情况调整
const obj: Shop = {
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
};

const obj1: Shop = {
  id: "02",
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
};

const tableData = ref<Shop[]>([obj, obj1]);

const multipleTableRef = ref<InstanceType<typeof ElTable>>();

const editItem = item => {
  console.log("编辑项:", item);
  // 编辑操作逻辑
};

const multipleSelection = ref<Object[]>([]);

const handleSelectionChange = (val: Object[]) => {
  multipleSelection.value = val;
  console.log(multipleSelection.value);
};
</script>

<template>
  <div>
    <el-table
      ref="multipleTableRef"
      :data="tableData"
      @selection-change="handleSelectionChange"
      select
      class="table-style"
    >
      <el-table-column type="selection" width="55" />
      <el-table-column prop="id" label="序号" />
      <el-table-column label="礼品图片">
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

    <div class="content-wrapper">
      <div class="info">
        <span>已选商品 2 件</span>
        <span class="price">合计: ￥20</span>
      </div>
      <el-button type="primary">添加至礼品订单</el-button>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.content-wrapper {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px;
  border: 1px solid #ffffff;
  background-color: #ffffff;
  border-top: 1px solid #eaeaea;
  left: 0; /* 与左边界对齐 */
  right: 0; /* 与右边界对齐 */
  bottom: 0; /* 与底部对齐 */
  box-shadow: 0 -2px 4px rgba(0, 0, 0, 0.1); /* 添加一些阴影效果 */
  margin-top: 20px;
  margin-left: 20px;
  width: 90%;
}

.info {
  display: flex;
  gap: 10px; /* 控制间距 */
}

.price {
  color: #ff4500; /* 控制价格的颜色 */
}

/* 调整按钮样式 */
.el-button {
  margin-left: auto; /* 推到容器的右边 */
}

.table-style {
  width: 90%;
  margin-left: 20px;
  margin-top: 20px;
}
</style>
