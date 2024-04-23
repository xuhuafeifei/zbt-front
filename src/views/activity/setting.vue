<script setup lang="ts">
import { ref, Ref, nextTick, reactive, onMounted, watch } from "vue";
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

const selectedRow = ref();

const deleteInfo = row => {
  console.log(row);
  selectedRow.value = row;
  deleteActivityDialogVisible.value = true;
};

const deleteActivityDialogVisible = ref(false);

const handleDelete = () => {
  const ids = [selectedRow.value.id];
  // 删除数据
  deleteActivityOption(ids).then(res => {
    if (res.code !== 0) {
      ElMessage.error("删除失败: " + res.msg);
    } else {
      ElMessage.success("删除成功");
      search();
    }
  });
  deleteActivityDialogVisible.value = false;
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

watch(typeName, (newValue, oldValue) => {
  if (newValue !== oldValue) {
    search();
  }
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
    <!-- <el-button style="margin-bottom: 9px" type="primary" @click="search"
      >查询</el-button
    > -->
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
    <option-add-or-update
      v-if="dialogVisible"
      @refreshDataList="search"
      ref="optionAddOrUpdateRef"
    />
    <!--确认删除弹框-->
    <el-dialog
      v-model="deleteActivityDialogVisible"
      title="系统提示"
      width="30%"
      draggable
    >
      <el-text>是否删除</el-text>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="handleDelete">确定</el-button>
          <el-button
            type="primary"
            @click="deleteActivityDialogVisible = false"
          >
            取消
          </el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<style lang="scss" scoped></style>
