<script setup lang="ts">
import { ref, nextTick } from "vue";
import {
  ElTable,
  ElTableColumn,
  ElButton,
  ElSelect,
  ElOption,
  ElRow,
  ElCol,
  ElImage
} from "element-plus";

import ActivityForm from "./component/activityForm.vue";

const filters = ref({
  department: ""
});

const obj = {
  id: "1",
  picture:
    "https://feigebuge.oss-cn-beijing.aliyuncs.com/QQ%E5%9B%BE%E7%89%8720230819130111.gif",
  activityName: "双十一大促",
  materialType: "海报",
  use: "-",
  festival: "-",
  specialTopic: "双11",
  brand: "通用",
  applicableGrade: "黄金会员",
  uploadUser: "运营部门",
  uploadDate: "2023/10/21",
  sourceFile: "无"
};

const tableData = ref([obj, obj]);

// 指向子组件
const activityFormRef = ref(null);

const handleEdit = row => {
  dialogVisible.value = true;
  // nextTick保证父组件拥有指向子组件的对象
  nextTick(() => {
    console.log(row);
    // 调用子组件的引用, 使用被暴露的方法, 进行子组件数据初始化
    activityFormRef.value.init(row);
  });
};

const handleDelete = row => {
  // 处理删除逻辑
  console.log("删除", row);
};

const dialogVisible = ref(false);

const handleAdd = () => {
  dialogVisible.value = true;
  nextTick(() => {
    activityFormRef.value.init();
  });
};
</script>

<template>
  <div>
    <div>
      <!-- 表格 -->
      <el-row :gutter="20" style="margin-bottom: 10px; margin-top: 10px">
        <el-col :span="18">
          <!-- 筛选器：省略了实际的筛选逻辑 -->
          <el-select v-model="filters.department" placeholder="部门筛选">
            <el-option label="全部部门" value="" />
            <!-- 部门选项 -->
          </el-select>
          <!-- 可以添加更多的筛选器 -->
        </el-col>
        <el-col :span="6" class="text-right">
          <el-button type="primary" @click="handleAdd">添加</el-button>
        </el-col>
      </el-row>
      <el-table :data="tableData" border stripe>
        <el-table-column prop="id" label="序号" width="80" />
        <el-table-column prop="picture" label="活动图片" width="100">
          <template #default="scope">
            <el-image
              style="width: 50px; height: 50px"
              :src="scope.row.picture"
              fit="cover"
            />
          </template>
        </el-table-column>
        <el-table-column prop="activityName" label="活动名称" width="120" />
        <el-table-column prop="materialType" label="物料类型" />
        <el-table-column prop="use" label="用途" />
        <el-table-column prop="festival" label="节日" />
        <el-table-column prop="specialTopic" label="专题" />
        <el-table-column prop="brand" label="品牌" />
        <el-table-column prop="applicableGrade" label="适用等级" width="100" />
        <el-table-column prop="uploadUser" label="上传用户" width="100" />
        <el-table-column prop="uploadDate" label="上传时间" width="100" />
        <el-table-column prop="sourceFile" label="源文件" />
        <el-table-column label="操作" fixed="right" width="100">
          <template #default="{ row }">
            <el-button type="text" @click="handleEdit(row)">编辑</el-button>
            <el-button type="text" @click="handleDelete(row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div>
      <ActivityForm v-if="dialogVisible" ref="activityFormRef" />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.text-right {
  text-align: right;
}

.upload-demo .el-upload__tip {
  font-size: 12px;
  color: #999;
}
.dialog-footer {
  text-align: right;
}

.m-2 {
  width: 150px;
}

.upload-area {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  padding: 20px;
  text-align: center;
  cursor: pointer;
}
.el-icon-plus {
  font-size: 32px;
  color: #999;
}
.el-upload__tip {
  font-size: 14px;
  color: #999;
}
</style>
