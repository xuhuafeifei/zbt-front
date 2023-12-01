<script setup lang="ts">
import { ref } from "vue";
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
  specailTopic: "双11",
  brand: "通用",
  applicableGrade: "黄金会员",
  uploadUser: "运营部门",
  uploadDate: "2023/10/21",
  sourceFile: "无"
};

const tableData = ref([obj, obj]);

const handleEdit = row => {
  // 处理编辑逻辑
  console.log("编辑", row);
};

const handleDelete = row => {
  // 处理删除逻辑
  console.log("删除", row);
};
</script>

<template>
  <div>
    <el-row :gutter="20">
      <el-col :span="18">
        <!-- 筛选器：省略了实际的筛选逻辑 -->
        <el-select v-model="filters.department" placeholder="部门筛选">
          <el-option label="全部部门" value="" />
          <!-- 部门选项 -->
        </el-select>
        <!-- 可以添加更多的筛选器 -->
      </el-col>
      <el-col :span="6" class="text-right">
        <el-button type="primary">添加</el-button>
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
      <el-table-column prop="specailTopic" label="专题" />
      <el-table-column prop="brand" label="品牌" />
      <el-table-column prop="applicableGrade" label="适用等级" width="100" />
      <el-table-column prop="uploadUser" label="上传用户" width="100" />
      <el-table-column prop="uploadDate" label="上传时间" width="100" />
      <el-table-column prop="sourceFile" label="源文件" />
      <el-table-column label="操作" fixed="right">
        <template #default="{ row }">
          <el-button type="text" @click="handleEdit(row)">编辑</el-button>
          <el-button type="text" @click="handleDelete(row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<style lang="scss" scoped>
.text-right {
  text-align: right;
}
</style>
