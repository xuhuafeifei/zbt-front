<script setup lang="ts">
import { ref, Ref, nextTick, reactive, onMounted } from "vue";
import { ElTable, ElTableColumn, ElButton } from "element-plus";
import {
  OptionEntity,
  deleteActivityOption,
  getActivityOptionListByTypeName
} from "@/api/activity/setting";
import OptionAddOrUpdate from "./component/optionAddOrUpdate.vue";
import { updateActivityOption } from "@/api/activity/setting";
import { ElMessage } from "element-plus";

const tableData: Ref<Array<OptionEntity>> = ref<Array<OptionEntity>>([]);

const dialogVisible = ref(false);

const optionAddOrUpdateRef = ref(null);

const edit = row => {
  console.log(row);
  dialogVisible.value = true;
  nextTick(() => {
    optionAddOrUpdateRef.value.init(row);
  });
};

const deleteInfo = row => {
  console.log(row);
  const ids = [row.id];
  // 删除数据
  deleteActivityOption(ids).then(res => {
    if (res.code !== 0) {
      ElMessage.error("删除失败: " + res.msg);
    } else {
      search();
    }
  });
};

const handleAdd = () => {
  console.log("点击了新增按钮");
  dialogVisible.value = true;
  const entity = new OptionEntity();
  entity.setValueFromValues(libraryName.value, typeName.value);
  // 这里可以添加新增逻辑
  nextTick(() => {
    console.log(entity);
    optionAddOrUpdateRef.value.init(entity);
  });
};

const typeName = ref("物料");
const libraryName = ref("活动库");
const typeNameList = ["物料", "用途", "节日", "专题", "品牌"];

const search = () => {
  getActivityOptionListByTypeName(typeName.value).then(res => {
    console.log(res.data);
    if (res.code !== 0) {
      ElMessage.error("数据获取错误: " + res.code);
    }
    if (res.data === undefined || res.data === null) return;
    tableData.value = res.data;
  });
};

onMounted(() => {
  search();
});
</script>

<template>
  <div>
    <el-select v-model="typeName">
      <el-option
        v-for="item in typeNameList"
        :label="item"
        :key="item"
        :value="item"
      />
    </el-select>
    <el-button style="margin-bottom: 9px" type="primary" @click="search"
      >查询</el-button
    >
    <el-button style="margin-bottom: 9px" type="primary" @click="handleAdd"
      >新增{{ typeName }}</el-button
    >
    <el-table
      style="width: 95%"
      :data="tableData"
      :header-cell-style="{ 'text-align': 'center' }"
      :cell-style="{ 'text-align': 'center' }"
    >
      <el-table-column prop="libraryName" label="库名" />
      <el-table-column prop="typeName" label="类型" />
      <el-table-column prop="id" label="序号" />
      <el-table-column prop="optionName" label="名称" />
      <el-table-column prop="uploadTime" label="上传时间" />
      <el-table-column prop="status" label="状态" />
      <el-table-column label="操作" fixed="right">
        <template #default="scope">
          <el-button type="primary" @click="edit(scope.row)" link
            >编辑</el-button
          >
          <el-button type="primary" @click="deleteInfo(scope.row)" link
            >删除</el-button
          >
        </template>
      </el-table-column>
    </el-table>
    <option-add-or-update v-if="dialogVisible" ref="optionAddOrUpdateRef" />
  </div>
</template>

<style lang="scss" scoped></style>
