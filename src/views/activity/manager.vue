<script setup lang="ts">
import { ref, Ref, nextTick, onMounted } from "vue";
import {
  ElTable,
  ElTableColumn,
  ElButton,
  ElSelect,
  ElOption,
  ElRow,
  ElCol,
  ElImage,
  ElMessage
} from "element-plus";

import ActivityForm from "./component/activityForm.vue";
import { ActivityDto, deleteById } from "@/api/activity/activity";
import { getActivityPageList } from "@/api/activity/manage";

const filters = ref({
  department: ""
});

const tableData = ref<Array<ActivityDto>>([]);

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

// 删除行数据
const deleteRow = row => {
  console.log(row);
  deleteActivityDialogVisible.value = true;
  selectedRow.value = row;
};

const selectedRow = ref();

const deleteActivityDialogVisible = ref(false);

const handleDelete = () => {
  // 处理删除逻辑
  console.log("删除", selectedRow.value);
  deleteById(selectedRow.value.id).then(res => {
    if (res.code === 0) {
      ElMessage.success("删除成功");
      getDataList();
    } else {
      ElMessage.error("删除失败:" + res.msg);
    }
  });
  deleteActivityDialogVisible.value = false;
};

const dialogVisible = ref(false);

const handleAdd = () => {
  dialogVisible.value = true;
  nextTick(() => {
    activityFormRef.value.init();
  });
};

onMounted(() => {
  getDataList();
});

const pageIndex = ref(1);
const pageSize = ref(10);
const totalPage = ref(0);

const getDataList = () => {
  getActivityPageList(pageIndex.value, pageSize.value).then(res => {
    console.log(res);
    if (res.code !== 0) {
      ElMessage.error("数据获取失败:" + res.msg);
      return;
    }
    totalPage.value = res.data.totalPage;
    tableData.value = res.data.list;
  });
};

// 每页数
const sizeChangeHandle = val => {
  pageSize.value = val;
  pageIndex.value = 1;
};
// 当前页
const currentChangeHandle = val => {
  pageIndex.value = val;
  // getDataList(className.value);
};

const sourceFilesFormatter = (row, column, cellValue, index) => {
  if (cellValue.length === 0) {
    return "无";
  } else {
    return "有";
  }
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
        <el-table-column prop="picturesUrl" label="活动图片" width="100">
          <template #default="scope">
            <el-image
              style="width: 50px; height: 50px"
              :src="
                scope.row.picturesUrl[0] === undefined
                  ? ''
                  : scope.row.picturesUrl[0].url
              "
              fit="cover"
            />
          </template>
        </el-table-column>
        <el-table-column prop="name" label="活动名称" width="120" />
        <el-table-column prop="material" label="物料类型" />
        <el-table-column prop="useCol" label="用途" />
        <el-table-column prop="festival" label="节日" />
        <el-table-column prop="topic" label="专题" />
        <el-table-column prop="brand" label="品牌" />
        <el-table-column prop="applicableGrade" label="适用等级" width="100" />
        <el-table-column prop="uploader" label="上传用户" width="100" />
        <el-table-column prop="uploadTime" label="上传时间" width="100" />
        <el-table-column
          prop="sourcefilesUrl"
          label="源文件"
          :formatter="sourceFilesFormatter"
        />
        <el-table-column label="操作" fixed="right" width="100">
          <template #default="{ row }">
            <el-button type="text" @click="handleEdit(row)">编辑</el-button>
            <el-button type="text" @click="deleteRow(row)">删除</el-button>
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
    <div>
      <ActivityForm
        v-if="dialogVisible"
        ref="activityFormRef"
        @refreshDataList="getDataList"
      />
    </div>
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
