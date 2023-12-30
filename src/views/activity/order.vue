<script setup lang="ts">
import { ref, onMounted, nextTick } from "vue";
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
import { fileType, getStoreUser, pictType } from "@/api/utils";
import { ReceOrderEntity, saveReceOrder } from "@/api/activity/receiveOrder";
import UploadPict from "@/components/Pict/uploadPict.vue";
import UploadFile from "@/components/File/uploadFile.vue";
import { ActivityFileEntity } from "@/api/activity/activity";
import { uploadFirstDraft, uploadFirstSourcefile } from "@/api/activity/file";
import {
  CommunicateRecordEntity,
  saveCommunicateRecord
} from "@/api/activity/communicateRecord";

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

const role = ref("");
const currentUserId = ref<Number>();

onMounted(() => {
  onSearchClick();
  role.value = getStoreUser().roles[0];
  currentUserId.value = parseInt(getStoreUser().id);
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
// 选中的数据行
const selectedRow = ref<OrderEntity>();

const handleClickView = row => {
  console.log("click");
  router.push(`/activity/orderDetail/${row.id}`);
};

const handleClickPassDraft = row => {
  selectedRow.value = row;
  console.log(row);
  // 清除数据
  imageList.value = [];
  uploadFirstDraftDialogVisible.value = true;
  nextTick(() => {
    uploadPictRef.value.setData([]);
  });
};

/** 传源文件button触发事件 */
const handleClickPassSouceFile = row => {
  selectedRow.value = row;
  console.log(row);
  // 清除数据
  fileList.value = [];
  uploadSourcefileDialogVisible.value = true;
  nextTick(() => {
    uploadFileRef.value.setData([]);
  });
};

/** 接单button触发事件 */
const handleClickTakeOrder = row => {
  console.log(row);
  selectedRow.value = row;
  // ElMessage.error("暂无原型图");
  takeOrderDialogVisible.value = true;
};

const pageIndex = ref(1);
const pageSize = ref(10);
const totalPage = ref(0);
const takeOrderDialogVisible = ref(false);

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

/** 接单 */
const receiveOrder = async () => {
  console.log(selectedRow.value);
  const data = new ReceOrderEntity(selectedRow.value.id);
  console.log(data);
  const res = await saveReceOrder(data);
  console.log(res);
  if (res.code === 0) {
    ElMessage.success("接单成功");
  } else {
    ElMessage.error("接单失败: " + res.msg);
  }
  takeOrderDialogVisible.value = false;
  onSearchClick();
};

/** 查看按钮是否启用判断函数 */
const viewButtonDisabled = row => {
  console.log(row);
  console.log(currentUserId.value);

  // 订单状态为待接单, 不允许查看
  // if (row.status === "待接单") {
  //   return true;
  // }
  if (role.value === "operator") {
    // 对operator开放一切查看权限
    return false;
  }
  // 订单不是当前登录用户接单, 或当前用户订单, 不允许查看
  if (row.receUserId === currentUserId.value) {
    return false;
  } else if (row.userId === currentUserId.value) {
    return false;
  } else {
    return true;
  }
};

/** 接单按钮是否启用判断函数 */
const takeOrderButtonDisabled = row => {
  // 订单状态不是待接单, 不允许接单
  return row.status !== "待接单";
};

/** 传初稿按钮是否启用判断函数 */
const uploadFirstDraftButtonDisabled = row => {
  // 当前用户是操作员, 允许传初稿
  if (role.value === "operator") {
    return false;
  }
  // 订单状态为待接单, 不允许传初稿
  // 订单不是当前登录用户接单, 不允许传初稿
  return row.status === "待接单" || row.receUserId !== currentUserId.value;
};

/** 传源文件按钮是否启用判断函数 */
const uploadSourcefileButtonDisabled = row => {
  // 当前用户是操作员, 允许传源文件
  if (role.value === "operator") {
    return false;
  }
  // 订单状态为待接单, 不允许传源文件
  // 订单不是当前登录用户接单, 不允许传源文件
  return row.status === "待接单" || row.receUserId !== currentUserId.value;
};

const imageList = ref<Array<ActivityFileEntity>>([]);
const fileList = ref<Array<ActivityFileEntity>>([]);

const uploadPictRef = ref(null);
const uploadFileRef = ref(null);

const uploadFirstDraftDialogVisible = ref(false);
const uploadSourcefileDialogVisible = ref(false);

const submitPict = async () => {
  console.log("图片上传服务器");
  console.log(imageList.value);
  const data = new FormData();
  for (let i = 0; i < imageList.value.length; ++i) {
    data.append("file", imageList.value[i].raw);
  }
  debugger;
  const res = await uploadFirstDraft(
    data,
    selectedRow.value.actId,
    pictType,
    selectedRow.value.id
  );
  console.log(res);
  if (res.code === 0) {
    ElMessage.success("上传成功");
    // 提交到communicateRecord
    const valueHtml = getPictValueHtml(res.data);
    submitCommunicateRecordByPict(selectedRow.value.id, valueHtml);
    return true;
  } else {
    ElMessage.error("图片上传失败:" + res.msg);
    return false;
  }
};

// 根据图片url, 返回对应的html标签内容
const getPictValueHtml = (url: String) => {
  return '<p><img src="' + url + '" alt="" data-href="" style=""/></p>';
};

// 记录当前用户
const currentUser = getStoreUser();
const entity = new CommunicateRecordEntity();

const submitCommunicateRecordByPict = (orderId: Number, valueHtml: String) => {
  // 保存
  entity.uploaderId = currentUser.id;
  entity.uploaderName = currentUser.username;
  entity.content = valueHtml;
  entity.orderId = orderId;
  console.log(entity);
  saveCommunicateRecord(entity).then(res => {
    console.log(res);
    if (res.code === 0) {
      ElMessage.success("提交成功");
    } else {
      ElMessage.error("提交失败: " + res.msg);
    }
  });
};

const limitNumber = 1;

const submitSourcefile = async () => {
  // 创建formData
  console.log("文件上传服务器");
  console.log(fileList);
  const data = new FormData();
  for (let i = 0; i < fileList.value.length; ++i) {
    data.append("file", fileList.value[i].raw);
  }
  const res = await uploadFirstSourcefile(
    data,
    selectedRow.value.actId,
    fileType,
    selectedRow.value.id
  );
  console.log(res);
  if (res.code === 0) {
    ElMessage.success("上传成功");
    return true;
  } else {
    ElMessage.error("文件上传失败:" + res.msg);
    return false;
  }
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
      <!-- 设计师视角 -->
      <el-table-column prop="status" label="状态" width="160" />
      <el-table-column fixed="right" label="操作" width="250">
        <template #default="scope">
          <!-- 只允许接单的设计师查看 -->
          <el-button
            link
            type="primary"
            size="small"
            @click="handleClickView(scope.row)"
            :disabled="viewButtonDisabled(scope.row)"
            >查看</el-button
          >
          <template v-if="role !== 'user'">
            <!-- 处于待接单的订单, 才能被接单 -->
            <el-button
              link
              type="primary"
              size="small"
              :disabled="takeOrderButtonDisabled(scope.row)"
              @click="handleClickTakeOrder(scope.row)"
              >接单</el-button
            >
            <!-- 只允许接单的设计师传告, 以及操作员 -->
            <el-button
              link
              type="primary"
              size="small"
              @click="handleClickPassDraft(scope.row)"
              :disabled="uploadFirstDraftButtonDisabled(scope.row)"
              >传初稿</el-button
            >
            <!-- 只允许接单的设计师传告, 以及操作员 -->
            <el-button
              link
              type="primary"
              size="small"
              @click="handleClickPassSouceFile(scope.row)"
              :disabled="uploadSourcefileButtonDisabled(scope.row)"
              >传源文件</el-button
            >
          </template>
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
    <!-- 接单dialog -->
    <el-dialog
      v-model="takeOrderDialogVisible"
      title="系统提示"
      width="30%"
      draggable
    >
      <el-text>是否选接下该订单</el-text>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="receiveOrder">确定</el-button>
          <el-button type="primary" @click="takeOrderDialogVisible = false">
            取消
          </el-button>
        </span>
      </template>
    </el-dialog>
    <!-- 传初稿dialog -->
    <el-dialog
      v-model="uploadFirstDraftDialogVisible"
      title="系统提示"
      width="30%"
      draggable
    >
      <UploadPict
        v-model:pictList="imageList"
        ref="uploadPictRef"
        v-model:limit="limitNumber"
      />
      <el-button @click="submitPict">提交</el-button>
    </el-dialog>
    <!-- 传源文件dialog -->
    <el-dialog
      v-model="uploadSourcefileDialogVisible"
      title="系统提示"
      width="30%"
      draggable
    >
      <UploadFile
        v-model:fileList="fileList"
        ref="uploadFileRef"
        v-model:limit="limitNumber"
      />
      <el-button @click="submitSourcefile">提交</el-button>
    </el-dialog>
  </div>
</template>

<style lang="scss" scoped></style>
