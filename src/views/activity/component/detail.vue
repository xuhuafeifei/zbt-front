<script setup lang="ts">
import { ref, onMounted, reactive } from "vue";
import { ElImage } from "element-plus";
import { ActivityDto } from "@/api/activity/activity";
import { ElMessage } from "element-plus";
import { OrderEntity, saveOrder } from "@/api/activity/order";
import { sleep } from "@/api/utils";
import { useRouter } from "vue-router";

const router = useRouter();

const scrollContainer = ref(null); // 用于引用滚动容器的DOM元素

onMounted(async () => {});

const dataList = ref<Array<ActivityDto>>([]);
// 初始化组件数据
function init(newData: Array<ActivityDto>) {
  dataList.value = newData;
}

defineExpose({ init });

const chooseDialogVisible = ref(false);

const downloadDialogVisible = ref(false);

const handleChoose = () => {
  // 设置表单数据
  formData.setValueFromActivityDto(dataList.value[0]);
  console.log(formData);
  chooseDialogVisible.value = true;
};

const handleDownload = () => {
  downloadDialogVisible.value = true;
};

/** 下载文件 */
const download = () => {
  const data = dataList.value[0];
  ElMessage.info("下载源文件");
  data.sourcefilesUrl.forEach(item => {
    console.log(item);
    window.open(item.url);
  });
};

/** 下订单 */
const takeOrder = () => {
  console.log(formData);
  saveOrder(formData).then(res => {
    console.log(res);
    if (res.code === 0) {
      ElMessage.success("下单成功");
      sleep(500);
      router.push("/activity/order");
    } else {
      ElMessage.error("下单失败: " + res.msg);
    }
  });
};

const formData = reactive(new OrderEntity());
</script>

<template>
  <div class="document-container" ref="scrollContainer">
    <h2>双十一珠宝活动详情</h2>
    <el-divider />
    <!-- 文档列表开始 -->
    <div v-for="(item, index) in dataList" :key="index" class="document-item">
      <el-card class="box-card">
        <el-row>
          <el-image
            :src="item.picturesUrl.length === 0 ? '' : item.picturesUrl[0].url"
            fit="cover"
            style="document-image"
          />
          <div>
            <div style="document-meta p">
              <p><strong>活动名称：</strong>{{ item.name }}</p>
              <p><strong>物料类型：</strong>{{ item.material }}</p>
              <p><strong>用途：</strong>{{ item.useCol }}</p>
              <p><strong>节日：</strong>{{ item.festival }}</p>
              <p><strong>专题：</strong>{{ item.topic }}</p>
              <p><strong>品牌：</strong>{{ item.brand }}</p>
              <p><strong>上传时间：</strong>{{ item.uploadTime }}</p>
              <p><strong>上传者：</strong>{{ item.uploader }}</p>
              <p>
                <strong>源文件：</strong
                >{{ item.sourcefilesUrl.length == 0 ? "无" : "有" }}
              </p>
            </div>
            <div class="document-actions">
              <el-button type="primary" @click="handleChoose">选他</el-button>
              <el-button type="primary" @click="handleDownload"
                >下载源文件</el-button
              >
            </div>
          </div>
        </el-row>
      </el-card>
      <!-- 选他弹框 -->
      <el-dialog
        v-model="chooseDialogVisible"
        title="系统提示"
        width="30%"
        draggable
      >
        <el-text>是否选择该活动设计方案</el-text>
        <el-divider />
        <el-form :model="formData">
          <el-form-item label="订单时间">
            <el-date-picker
              type="datetime"
              v-model="formData.orderTime"
              disabled
            />
          </el-form-item>
          <el-form-item label="需求时间">
            <el-date-picker
              type="datetime"
              v-model="formData.demandTime"
              value-format="YYYY-MM-DD hh:mm:ss"
            />
          </el-form-item>
          <el-form-item label="需求门店">
            <el-input v-model="formData.demandStore" />
          </el-form-item>
          <el-form-item label="物料">
            <el-input v-model="formData.material" disabled />
          </el-form-item>
          <el-form-item label="用途">
            <el-input v-model="formData.useCol" disabled />
          </el-form-item>
          <el-form-item label="节日">
            <el-input v-model="formData.festival" disabled />
          </el-form-item>
          <el-form-item label="专题">
            <el-input v-model="formData.topic" disabled />
          </el-form-item>
          <el-form-item label="品牌">
            <el-input v-model="formData.brand" disabled />
          </el-form-item>
        </el-form>
        <template #footer>
          <span class="dialog-footer">
            <el-button @click="takeOrder">确定</el-button>
            <el-button type="primary" @click="chooseDialogVisible = false">
              取消
            </el-button>
          </span>
        </template>
      </el-dialog>
      <!-- 下载弹框 -->
      <el-dialog
        v-model="downloadDialogVisible"
        title="系统提示"
        width="30%"
        draggable
      >
        <span>是否下载该活动文件</span>
        <template #footer>
          <span class="dialog-footer">
            <el-button @click="download">确定</el-button>
            <el-button type="primary" @click="downloadDialogVisible = false">
              取消
            </el-button>
          </span>
        </template>
      </el-dialog>
    </div>
    <!-- 文档列表结束 -->
  </div>
</template>

<style lang="scss" scoped>
.document-container {
  max-height: 800px;
  overflow-y: auto;
}

.document-item {
  margin-bottom: 1em;
}

.document-image {
  width: 300px;
  height: 600px;
  margin-right: 1em;
}

.document-meta-actions {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.document-meta p {
  margin: 0.5em 0;
  line-height: 1.6;
}

.document-actions {
  text-align: right;
}

.box-card {
  width: auto;
  max-height: 600px; /* 根据需要调整 */
  overflow-y: auto;
}
</style>
