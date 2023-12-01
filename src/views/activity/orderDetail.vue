<template>
  <el-row :gutter="20">
    <el-col :span="10" :xs="24">
      <!-- 海报图片 -->
      <el-card style="margin-bottom: 10px">
        <div class="image-wrapper">
          <el-image class="poster-image" :src="posterUrl" fit="contain" />
        </div>
        <div class="text-center" style="font-weight: bold">双十一大促海报</div>
      </el-card>
      <!-- 订单表单 -->
      <el-card style="margin-bottom: 10px" class="box-card">
        <div class="text item">
          <span>证件编号：</span>
          <el-input v-model="orderForm.idNumber" disabled />
        </div>
        <div class="text item">
          <span>提交时间：</span>
          <el-date-picker
            v-model="orderForm.submissionDate"
            type="date"
            disabled
          />
        </div>
        <div class="text item">
          <span>需要门店：</span>
          <el-input v-model="orderForm.demandDate" disabled />
        </div>
        <div class="text item">
          <span>需求时间：</span>
          <el-date-picker v-model="orderForm.demandDate" type="date" disabled />
        </div>
        <div class="text item">
          <span>节日：</span>
          <el-input v-model="orderForm.festival" disabled />
        </div>
        <div class="text item">
          <span>用途：</span>
          <el-input v-model="orderForm.usage" disabled />
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
      </el-card>
      <!-- 接单表单 -->
      <el-card class="box-card">
        <div class="info-item">
          <span class="info-label">接单时间：</span>
          <el-input v-model="receiveForm.orderReceiptDate" disabled />
        </div>
        <div class="info-item">
          <span class="info-label">设计师：</span>
          <el-input v-model="receiveForm.designer" disabled />
        </div>
        <div class="text item">
          <span class="info-label">传初稿时间：</span>
          <el-date-picker v-model="receiveForm.firstDraftDate" disabled />
        </div>
        <div class="text item">
          <span class="info-label">传终稿时间：</span>
          <el-date-picker v-model="receiveForm.finalDraftDate" disabled />
        </div>
        <div class="info-item">
          <span class="info-label">完成时间：</span>
          <el-input v-model="receiveForm.completionDate" disabled />
        </div>
        <div class="info-item">
          <span class="info-label">联系人电话：</span>
          <el-input v-model="receiveForm.contactPhone" disabled />
        </div>
        <div class="info-item">
          <span class="info-label">订单状态：</span>
          <el-input v-model="receiveForm.orderStatus" disabled />
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
              <el-button link type="primary" plain size="large"
                >更新状态</el-button
              >
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
        <div class="input-area">
          <el-input
            type="textarea"
            :rows="5"
            placeholder="请输入文本（自定义文本）"
          />
        </div>

        <!-- 操作按钮 -->
        <div class="action-buttons">
          <el-button type="primary">提交</el-button>
        </div>
      </el-card>

      <!--回复消息展示-->
      <el-card style="height: 800px">
        <el-scrollbar ref="scrollbarRef" height="400px" always @scroll="scroll">
          <div ref="innerRef" class="message-box">
            <p
              v-for="operateRecord in operateRecordList"
              :key="operateRecord.id"
            >
              <OperateRecord :operate-record="operateRecord" />
              <el-divider />
            </p>
          </div>
        </el-scrollbar>
        <el-slider
          v-model="value"
          :max="max"
          :format-tooltip="formatTooltip"
          @input="inputSlider"
        />
      </el-card>
    </el-col>
  </el-row>
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue";
import { ElImage } from "element-plus";
import { ElCard, ElInput, ElDatePicker } from "element-plus";

import { ElScrollbar } from "element-plus";
import OperateRecord from "./utils/operateRecord.vue";

const obj = {
  id: "1",
  operator: "王某某万福",
  operateDate: "2023/10/31 18:20:20",
  dynamic: "提出需要水果速度快点"
};

// 操作记录集合
const operateRecordList = [obj, obj, obj, obj, obj, obj, obj, obj, obj];

const max = ref(0);
const value = ref(0);
const innerRef = ref<HTMLDivElement>();
const scrollbarRef = ref<InstanceType<typeof ElScrollbar>>();

onMounted(() => {
  max.value = innerRef.value!.clientHeight - 380;
});

const inputSlider = (value: number) => {
  scrollbarRef.value!.setScrollTop(value);
};
const scroll = ({ scrollTop }) => {
  value.value = scrollTop;
};
const formatTooltip = (value: number) => {
  return `${value} px`;
};
const activeStep = ref(2); // 活跃的步骤，可以根据需要动态改变
const orderForm = ref({
  idNumber: "12345678910", // 证件编号
  submissionDate: "2023/10/31", // 提交时间
  demandStore: "正荣张万福", // 需要门店
  demandDate: "2023/11/05", // 需求时间
  festival: "-", // 节日
  usage: "线上引流", // 用途
  topic: "双十一", // 专题
  brand: "通用", // 品牌
  material: "活动海报" // 活动海报
});

const receiveForm = ref({
  orderReceiptDate: "2023/10/31",
  designer: "小兰",
  firstDraftDate: "2023/10/31",
  finalDraftDate: "2023/10/31",
  completionDate: "-",
  contactPhone: "18548526541",
  orderStatus: "待验收"
});

// 你可以将这个URL替换成你的海报图片地址
const posterUrl = ref(
  "https://feigebuge.oss-cn-beijing.aliyuncs.com/QQ%E5%9B%BE%E7%89%8720230819130111.gif"
);

interface Order {
  id: string;
  submitTime: string;
  username: string;
  // 根据需要添加其他属性
}

const order = ref<Order>({
  id: "",
  submitTime: "",
  username: ""
  // 初始化其他属性
});

const submitForm = () => {
  // 在这里实现表单提交逻辑
  console.log(order.value);
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
