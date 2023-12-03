<script setup lang="ts">
import { onMounted, ref } from "vue";
import { ElSteps, ElStep, ElButton, ElScrollbar } from "element-plus";
import OperateRecord from "./component/operateRecord.vue";

const obj = {
  id: "1",
  operator: "采购员小兰",
  operateDate: "2023/10/31 18:20:20",
  dynamic: "部分礼品雀氏, 已找到替代款式, 请确认"
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
const activeStep = ref(2); // 激活的步骤
const stepsData = ref([
  { date: "2023/10/31", time: "15:20:20" },
  { date: "2023/10/31", time: "15:20:20" },
  { date: "", time: "" },
  { date: "", time: "" }
]);

const stepDescription = index => {
  const data = stepsData.value[index];
  return data.date ? `${data.date} ${data.time}` : "尚未开始";
};

// const prevStep = () => {
//   if (activeStep.value > 0) activeStep.value--;
// };

// const nextStep = () => {
//   if (activeStep.value < stepsData.value.length - 1) activeStep.value++;
// };

const handleClickAudit = () => {
  console.log("审核");
};

const startPurchase = () => {
  console.log("开始采购");
};

const startDelivery = () => {
  console.log("开始发货");
};

const checkAndAccept = () => {
  console.log("验收");
};

const shopInfo = {
  orderNumber: "123456789",
  demandShop: "正荣张万福",
  price: "50-100元",
  count: 50,
  giftName: "迪奥口红",
  giftBrand: "迪奥",
  orderDate: "2023/01/31 14:20:20",
  classify: "美妆",
  finishDate: "2023/01/31 14:20:20",
  remark: "色号999多一些",
  status: "待审核",
  use: "满赠",
  giftStyle: "通用",
  address: "大悦城老凤祥",
  expectedDeliveryDate: "2023/10/11",
  contactPhone: "12345678910"
};
</script>

<template>
  <div style="width: 1000px">
    <el-card style="margin-bottom: 20px">
      <div style="margin-bottom: 20px">
        <span style="font-weight: bold">订单状态</span>
      </div>
      <el-steps
        :active="activeStep"
        finish-status="success"
        process-status="finish"
      >
        <el-step title="待审核" :description="stepDescription(0)" />
        <el-step title="采购中" :description="stepDescription(1)" />
        <el-step title="待收货" :description="stepDescription(2)" />
        <el-step title="已完成" :description="stepDescription(3)" />
      </el-steps>
      <div class="step-actions">
        <el-button
          type="primary"
          v-if="activeStep === 0"
          @click="handleClickAudit"
          >审核</el-button
        >
        <el-button type="primary" v-if="activeStep === 1" @click="startPurchase"
          >开始采购</el-button
        >
        <el-button type="primary" v-if="activeStep === 1" @click="startDelivery"
          >开始发货</el-button
        >
        <el-button
          type="primary"
          v-if="activeStep === 2"
          @click="checkAndAccept"
          >验收</el-button
        >
      </div>
    </el-card>
    <el-card style="margin-bottom: 20px">
      <el-descriptions title="订单信息">
        <el-descriptions-item label="订单编号">{{
          shopInfo.orderNumber
        }}</el-descriptions-item>
        <el-descriptions-item label="礼品名称">{{
          shopInfo.giftName
        }}</el-descriptions-item>
        <el-descriptions-item label="礼品品牌">{{
          shopInfo.giftBrand
        }}</el-descriptions-item>
        <el-descriptions-item label="分类">
          <el-tag size="small">{{ shopInfo.classify }}</el-tag>
        </el-descriptions-item>
        <el-descriptions-item label="用途">{{
          shopInfo.use
        }}</el-descriptions-item>
        <el-descriptions-item lable="价格">
          {{ shopInfo.price }}
        </el-descriptions-item>
        <el-descriptions-item label="款式">
          {{ shopInfo.giftStyle }}</el-descriptions-item
        >
        <el-descriptions-item label="数量">
          {{ shopInfo.count }}
        </el-descriptions-item>
        <el-descriptions-item label="备注">
          {{ shopInfo.remark }}
        </el-descriptions-item>
      </el-descriptions>
    </el-card>

    <el-card style="margin-bottom: 20px">
      <el-descriptions title="收获信息">
        <el-descriptions-item label="收货地址">{{
          shopInfo.address
        }}</el-descriptions-item>
        <el-descriptions-item label="联系电话">{{
          shopInfo.contactPhone
        }}</el-descriptions-item>
        <el-descriptions-item label="期望交付日期">{{
          shopInfo.expectedDeliveryDate
        }}</el-descriptions-item>
      </el-descriptions>
    </el-card>

    <el-card style="margin-bottom: 20px">
      <div style="margin-bottom: 20px">
        <span style="font-weight: bold">动态记录</span>
      </div>
      <!-- 输入框 -->
      <div class="input-area" style="margin-bottom: 20px">
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
    <el-card style="height: 400px">
      <el-scrollbar height="400px">
        <div ref="innerRef" class="message-box">
          <p v-for="operateRecord in operateRecordList" :key="operateRecord.id">
            <OperateRecord :operate-record="operateRecord" />
            <el-divider />
          </p>
        </div>
      </el-scrollbar>
    </el-card>
  </div>
</template>

<style lang="scss" scoped>
.el-steps .el-steps__item {
  flex: 1;
}

.step-actions {
  margin-top: 20px;
  display: flex;
  justify-content: center;
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
