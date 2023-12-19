<template>
  <el-row :gutter="20">
    <el-col :span="10" :xs="24">
      <!-- 海报图片 -->
      <el-card style="margin-bottom: 10px">
        <div class="image-wrapper">
          <el-image class="poster-image" :src="url" fit="contain" />
        </div>
        <div class="text-center" style="font-weight: bold">
          {{ orderForm.actName }}
        </div>
      </el-card>
      <!-- 订单表单 -->
      <el-card style="margin-bottom: 10px" class="box-card">
        <div class="text item">
          <span>订单编号：</span>
          <el-input v-model="orderForm.id" disabled />
        </div>
        <div class="text item">
          <span>订单时间：</span>
          <el-date-picker v-model="orderForm.orderTime" type="date" disabled />
        </div>
        <div class="text item">
          <span>需要门店：</span>
          <el-input v-model="orderForm.demandStore" disabled />
        </div>
        <div class="text item">
          <span>需求时间：</span>
          <el-date-picker v-model="orderForm.demandTime" type="date" disabled />
        </div>
        <div class="text item">
          <span>节日：</span>
          <el-input v-model="orderForm.festival" disabled />
        </div>
        <div class="text item">
          <span>用途：</span>
          <el-input v-model="orderForm.useCol" disabled />
        </div>
        <div class="text item">
          <span>专题：</span>
          <el-input v-model="orderForm.topic" disabled />
        </div>
        <div class="text item">
          <span>品牌：</span>
          <el-input v-model="orderForm.brand" disabled />
        </div>
        <div class="text item">
          <span>物料:</span>
          <el-input v-model="orderForm.material" disabled />
        </div>

        <div class="text item">
          <span class="info-label">订单状态：</span>
          <el-input v-model="orderForm.status" disabled />
        </div>
      </el-card>
      <!-- 接单表单 -->
      <el-card class="box-card">
        <div class="info-item">
          <span class="info-label">接单时间：</span>
          <el-input v-model="receiveForm.orderReceiveTime" disabled />
        </div>
        <div class="info-item">
          <span class="info-label">设计师：</span>
          <el-input v-model="receiveForm.designer" disabled />
        </div>
        <div class="text item">
          <span class="info-label">传初稿时间：</span>
          <el-date-picker v-model="receiveForm.firstDraftTime" disabled />
        </div>
        <div class="text item">
          <span class="info-label">传源文件时间：</span>
          <el-date-picker v-model="receiveForm.firstSourcefileTime" disabled />
        </div>
        <div class="info-item">
          <span class="info-label">完成时间：</span>
          <el-input v-model="receiveForm.finishTime" disabled />
        </div>
        <div class="info-item">
          <span class="info-label">联系人电话：</span>
          <el-input v-model="receiveForm.concatTelephone" disabled />
        </div>
      </el-card>
    </el-col>
    <el-col :span="13" :xs="24">
      <el-card style="margin-bottom: 20px">
        <div>
          <el-row>
            <div
              style="
                font-weight: bold;
                padding-bottom: 5%;
                padding-right: 2%;
                font-size: 2ch;
              "
            >
              订单状态
            </div>
            <div>
              <template v-if="orderForm.status === '待接单' && role !== 'user'">
                <el-button type="primary" @click="handleClickTakeOrder"
                  >接单</el-button
                >
              </template>
              <template v-if="orderForm.status !== '待接单' && role !== 'user'">
                <!-- 只允许接单的设计师传告, 以及操作员 -->
                <el-button type="primary" @click="handleClickPassDraft"
                  >传初稿</el-button
                >
                <!-- 只允许接单的设计师传告, 以及操作员 -->
                <el-button type="primary" @click="handleClickPassSouceFile"
                  >传源文件</el-button
                >
              </template>
              <template v-if="orderForm.status === '待验收' && role === 'user'">
                <el-button type="primary" @click="handleCheckAndAccept"
                  >验收</el-button
                >
              </template>
            </div>
          </el-row>
        </div>
        <div>
          <!-- 步骤条 -->
          <el-steps :active="activeStep" finish-status="success">
            <el-step title="待接单" />
            <el-step title="进行中" />
            <el-step title="待验收" />
            <el-step title="已完成" />
          </el-steps>
        </div>
        <el-divider />
        <div style="font-weight: bold; font-size: 2ch; padding-bottom: 0xp">
          沟通记录
        </div>
        <!-- 输入框 -->
        <FullText high="300px" v-model:html="valueHtml" />
        <!-- 操作按钮 -->
        <div class="action-buttons">
          <el-button type="primary" @click="submitCommunicateRecord"
            >提交</el-button
          >
        </div>
      </el-card>

      <!--回复消息展示-->
      <el-card style="height: 600px">
        <el-scrollbar height="550px">
          <div ref="innerRef" class="message-box">
            <p v-for="(operateRecord, index) in operateRecordList" :key="index">
              <OperateRecord :operate-record="operateRecord" />
              <el-divider />
            </p>
          </div>
        </el-scrollbar>
      </el-card>
    </el-col>
  </el-row>
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
    <UploadPict v-model:pictList="imageList" ref="uploadPictRef" />
    <el-button @click="submitPict">提交</el-button>
  </el-dialog>
  <!-- 传源文件dialog -->
  <el-dialog
    v-model="uploadSourcefileDialogVisible"
    title="系统提示"
    width="30%"
    draggable
  >
    <UploadFile v-model:fileList="fileList" ref="uploadFileRef" />
    <el-button @click="submitSourcefile">提交</el-button>
  </el-dialog>
</template>

<script setup lang="ts">
import { onMounted, ref, reactive, nextTick } from "vue";
import { ElImage } from "element-plus";
import { ElCard, ElInput, ElDatePicker } from "element-plus";

import { ElScrollbar } from "element-plus";
import OperateRecord from "./component/operateRecord.vue";
import FullText from "@/components/FullText/fulltext.vue";
import {
  OrderEntity,
  checkAndAccept,
  getOrderById
} from "@/api/activity/order";
import {
  ReceOrderEntity,
  getReceOrderById,
  saveReceOrder
} from "@/api/activity/receiveOrder";
import { useRoute } from "vue-router";
import { ElMessage } from "element-plus";
import {
  ActivityFileEntity,
  getActivityById,
  getFileByActId
} from "@/api/activity/activity";
import { fileType, getStoreUser, pictType } from "@/api/utils";
import { uploadFirstDraft, uploadFirstSourcefile } from "@/api/activity/file";
import UploadPict from "@/components/Pict/uploadPict.vue";
import UploadFile from "@/components/File/uploadFile.vue";
import {
  CommunicateRecordEntity,
  getCommunicateRecordByOrderId,
  saveCommunicateRecord
} from "@/api/activity/communicateRecord";

const route = useRoute();

// 富文本框沟通内容
const valueHtml = ref("");

const url = ref("");
// 记录当前用户
const currentUser = getStoreUser();
const entity = new CommunicateRecordEntity();

const submitCommunicateRecord = () => {
  if (valueHtml.value.trim() === "") {
    ElMessage.error("沟通内容不能为空");
  } else {
    // 保存
    entity.uploaderId = currentUser.id;
    entity.uploaderName = currentUser.username;
    entity.content = valueHtml.value;
    entity.orderId = orderForm.id;
    debugger;
    console.log(entity);
    saveCommunicateRecord(entity).then(res => {
      console.log(res);
      if (res.code === 0) {
        ElMessage.success("提交成功");
        // 跟新沟通数据
        getRecordData();
      } else {
        ElMessage.error("提交失败: " + res.msg);
      }
    });
  }
};

// 操作记录集合
const operateRecordList = ref<Array<CommunicateRecordEntity>>([]);

const max = ref(0);
const innerRef = ref<HTMLDivElement>();

const role = ref("user");

// orderId
const id = parseInt(route.params.id);

onMounted(async () => {
  max.value = innerRef.value!.clientHeight - 380;
  // 获取角色
  role.value = getStoreUser().roles[0];
  // 请求order
  const orderRes = await getOrderById(id);
  // 赋值ａｃｔｉｖｉｅＳｔｅａｐ
  const status = orderRes.data.status;
  if (status === "待接单") {
    activeStep.value = 0;
  } else if (status === "进行中") {
    activeStep.value = 1;
  } else if (status === "待验收") {
    activeStep.value = 2;
  } else if (status === "已完成") {
    activeStep.value = 4;
  }
  console.log(orderRes);
  if (orderRes.code !== 0) {
    ElMessage.error("订单数据获取失败: " + orderRes.msg);
  } else {
    orderForm.setValueFromEntity(orderRes.data);
  }
  // 请求rece_order
  getReceOrderById(id).then(res => {
    console.log(res);
    receiveForm.setValueFromEntity(res.data);
  });
  // 请求活动文件
  getFileByActId(orderRes.data.actId, pictType).then(res => {
    console.log(res);
    url.value = res.data[0].url;
  });
  // 查询沟通数据
  getRecordData();
});

/** 根据orderId查询沟通数据 */
const getRecordData = () => {
  getCommunicateRecordByOrderId(id).then(res => {
    console.log(res);
    if (res.code === 0) {
      operateRecordList.value = res.data;
    }
  });
};

const activeStep = ref(2); // 活跃的步骤，可以根据需要动态改变
const orderForm = reactive(new OrderEntity());

const receiveForm = reactive(new ReceOrderEntity());

const takeOrderDialogVisible = ref(false);

/** 接单button触发事件 */
const handleClickTakeOrder = row => {
  console.log(row);
  takeOrderDialogVisible.value = true;
};

/** 接单 */
const receiveOrder = async () => {
  const data = new ReceOrderEntity(orderForm.id);
  console.log(data);
  const res = await saveReceOrder(data);
  console.log(res);
  if (res.code === 0) {
    ElMessage.success("接单成功");
  } else {
    ElMessage.error("接单失败: " + res.msg);
  }
  takeOrderDialogVisible.value = false;
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
  const res = await uploadFirstDraft(
    data,
    orderForm.actId,
    pictType,
    orderForm.id
  );
  console.log(res);
  if (res.code === 0) {
    ElMessage.success("上传成功");
    return true;
  } else {
    ElMessage.error("图片上传失败:" + res.msg);
    return false;
  }
};

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
    orderForm.actId,
    fileType,
    orderForm.id
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

const handleClickPassDraft = () => {
  // 清除数据
  imageList.value = [];
  uploadFirstDraftDialogVisible.value = true;
  nextTick(() => {
    uploadPictRef.value.setData([]);
  });
};

/** 传源文件button触发事件 */
const handleClickPassSouceFile = () => {
  // 清除数据
  fileList.value = [];
  uploadSourcefileDialogVisible.value = true;
  nextTick(() => {
    uploadFileRef.value.setData([]);
  });
};

const handleCheckAndAccept = () => {
  console.log(orderForm);
  // 验收, 修改order
  checkAndAccept(orderForm.id).then(res => {
    if (res.code === 0) {
      ElMessage.success("验收成功");
      location.reload();
    } else {
      ElMessage.error("验收失败 " + res.msg);
    }
  });
};
</script>

<style scoped>
/* 样式可以根据您的设计进行调整 */
.box-center {
  margin: 0 auto;
  display: table;
}

.text-muted {
  color: #777;
}

.user-profile {
  .user-name {
    font-weight: bold;
  }

  .box-center {
    padding-top: 10px;
  }

  .user-role {
    font-weight: bold;
    padding-top: 10px;
    font-size: 18px;
  }

  .box-social {
    padding-top: 30px;

    .el-table {
      border-top: 1px solid #dfe6ec;
    }
  }

  .user-follow {
    padding-top: 20px;
  }
}

.user-bio {
  margin-top: 20px;
  color: #606266;

  span {
    padding-left: 4px;
  }

  .user-bio-section {
    font-size: 14px;
    padding: 15px 0;

    .user-bio-section-header {
      border-bottom: 1px solid #dfe6ec;
      padding-bottom: 10px;
      margin-bottom: 10px;
      font-weight: bold;
    }
  }
}

.image-wrapper {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 60vh; /* 或者根据您的需求设置高度 */
  background-color: #f5f5f5; /* 这是背景颜色 */
}

.poster-image {
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2); /* 为图片添加阴影效果 */
  max-width: 60%; /* 这是图片的最大宽度 */
  max-height: 80vh; /* 这是图片的最大高度 */
}

.box-card {
  width: 100%;
  margin: 30px 0;
}

.text.item {
  display: flex;
  align-items: center;
  margin-bottom: 12px;
}

.text.item span {
  margin-right: 10px;
}

.el-input,
.el-date-picker {
  flex: 1;
}

.info-card {
  width: 100%;
  margin: 30px 0;
}

.info-item {
  display: flex;
  justify-content: space-between;
  padding: 10px 0;
}

.info-label {
  /* font-weight: bold; */
}
.input-area {
  margin-top: 10px;
}

.action-buttons {
  margin-top: 20px;
  text-align: right;
}
.scrollbar-demo-item {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 50px;
  margin: 10px;
  text-align: center;
  border-radius: 4px;
  background: var(--el-color-primary-light-9);
  color: var(--el-color-primary);
}
.el-slider {
  margin-top: 20px;
}
</style>
