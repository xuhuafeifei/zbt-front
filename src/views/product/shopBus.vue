<script setup lang="ts">
import { ref } from "vue";
import { ElTable, ElTableColumn, ElButton, ElImage } from "element-plus";

const testObj = {
  id: "01",
  picture:
    "https://feigebuge.oss-cn-beijing.aliyuncs.com/QQ%E5%9B%BE%E7%89%8720230819130111.gif",
  name: "18k金钻石截至",
  desc: "这是一段很长的描述",
  brand: "老凤祥",
  material: "素金",
  style: "手镯",
  finishQuality: "5G",
  number: 10,
  vegetarianGoldWeight: "15g",
  jewellerWeight: "-",
  size: "60圈口",
  remark: "-",
  status: "待审核"
};

// 假设您有多个产品对象，这里我们创建了一个数组来模拟
const tableData = ref([
  { ...testObj },
  { ...testObj, id: "02" },
  { ...testObj, id: "03" }
  // 更多产品对象
]);

const deleteObj = product => {
  console.log("编辑产品", product);
  // 编辑产品的逻辑
};
</script>

<template>
  <el-table :data="tableData" class="table-style">
    <el-table-column type="selection" width="55" />
    <el-table-column prop="id" label="序号" width="120" />
    <el-table-column label="产品图片" width="150">
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
    <el-table-column prop="style" label="款式" />
    <el-table-column prop="finishQuality" label="成色" />
    <el-table-column prop="number" label="数量" />
    <el-table-column prop="vegetarianGoldWeight" label="素金金重" />
    <el-table-column prop="jewellerWeight" label="珠宝价值" />
    <el-table-column prop="size" label="尺寸" />
    <el-table-column prop="remark" label="备注" />
    <el-table-column prop="status" label="状态" />
    <el-table-column label="操作" fixed="right">
      <template #default="scope">
        <el-button type="text" @click="deleteObj(scope.row)">移除</el-button>
      </template>
    </el-table-column>
  </el-table>

  <div class="content-wrapper">
    <!-- <el-checkbox>全选</el-checkbox> -->
    <div class="info">
      <span>已选商品 2 件</span>
      <span class="price">合计: ￥20</span>
    </div>
    <el-button type="primary">添加至产品订单</el-button>
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
