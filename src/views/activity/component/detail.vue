<script setup lang="ts">
import { ref, onMounted, reactive, nextTick } from "vue";
import { ElImage } from "element-plus";
import { ActivityDto } from "@/api/activity/activity";
import { ElMessage } from "element-plus";
import { OrderEntity, saveOrder } from "@/api/activity/order";
import { getStoreUser, sleep, storeInfoType } from "@/api/utils";
import { useRouter } from "vue-router";
import {
  CommunicateRecordEntity,
  saveCommunicateRecord
} from "@/api/activity/communicateRecord";
import FullText from "@/components/FullText/fulltext.vue";

const router = useRouter();

const scrollContainer = ref(null); // 用于引用滚动容器的DOM元素

const role = ref("");

const demandStoreList = ref<Array<UserInfoEntity>>([]);

const userId = ref();

onMounted(async () => {
  role.value = getStoreUser().roles[0];
  userId.value = getStoreUser().id;
  console.log(role.value);
  getUserInfoOfDemandStore();
});

// 获取用户信息(需求店铺信息)
const getUserInfoOfDemandStore = () => {
  getUserInfoByUserId(userId.value, storeInfoType).then(res => {
    console.log(res);
    demandStoreList.value = res.data;
  });
};

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
const takeOrder = async () => {
  console.log(formData);
  const res = await saveOrder(formData);
  console.log(res);
  if (res.code === 0) {
    ElMessage.success("下单成功");
    sleep(500);
    router.push("/activity/order");
  } else {
    ElMessage.error("下单失败: " + res.msg);
  }
  // 保存recordOrder
  submitCommunicateRecord(res.data);
};

// 记录当前用户
const currentUser = getStoreUser();
const entity = new CommunicateRecordEntity();

const submitCommunicateRecord = (orderId: Number) => {
  if (valueHtml.value.trim() !== "") {
    // 保存
    entity.uploaderId = currentUser.id;
    entity.uploaderName = currentUser.username;
    entity.content = valueHtml.value;
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
  }
};

// 富文本框沟通内容
const valueHtml = ref("");

const formData = reactive(new OrderEntity());

import { ElInput } from "element-plus";
import { UserInfoEntity, getUserInfoByUserId, saveUserInfo } from "@/api/user";
const demandStoreDialogVisible = ref(false);

const inputValue = ref("");
const dynamicTags = ref(["Tag 1", "Tag 2", "Tag 3"]);
const inputVisible = ref(false);
const InputRef = ref<InstanceType<typeof ElInput>>();

const handleClose = (item: UserInfoEntity) => {
  // dynamicTags.value.splice(dynamicTags.value.indexOf(tag), 1);
};

const showInput = () => {
  inputVisible.value = true;
  nextTick(() => {
    InputRef.value!.input!.focus();
  });
};

const handleInputConfirm = () => {
  if (inputValue.value) {
    // dynamicTags.value.push(inputValue.value);
    const user = new UserInfoEntity();
    user.infoContent = inputValue.value;
    user.infoType = storeInfoType;
    user.userId = userId.value;
    saveUserInfo(user).then(res => {
      console.log(res);
      if (res.code === 0) {
        ElMessage.success("保存成功");
        getUserInfoOfDemandStore();
      } else {
        ElMessage.error("保存失败: " + res.msg);
      }
    });
  }
  inputVisible.value = false;
  inputValue.value = "";
};
</script>

<template>
  <div class="document-container" ref="scrollContainer">
    <h2>双十一珠宝活动详情</h2>
    <el-divider />
    <!-- 文档列表开始 -->
    <el-card v-for="(item, index) in dataList" :key="index">
      <el-row>
        <el-col :span="10">
          <el-image
            :src="item.picturesUrl.length === 0 ? '' : item.picturesUrl[0].url"
          />
        </el-col>
        <el-col :span="10" style="margin-left: 10px">
          <el-descriptions :column="1">
            <el-descriptions-item label="活动名称">{{
              item.name
            }}</el-descriptions-item>
            <el-descriptions-item label="物料类型">{{
              item.material
            }}</el-descriptions-item>
            <el-descriptions-item label="用途">{{
              item.useCol
            }}</el-descriptions-item>
            <el-descriptions-item label="节日">{{
              item.festival
            }}</el-descriptions-item>
            <el-descriptions-item label="专题">{{
              item.topic
            }}</el-descriptions-item>
            <el-descriptions-item label="品牌">{{
              item.brand
            }}</el-descriptions-item>
            <el-descriptions-item label="上传时间">{{
              item.uploadTime
            }}</el-descriptions-item>
            <el-descriptions-item label="上传者">{{
              item.uploader
            }}</el-descriptions-item>
            <el-descriptions-item label="源文件">{{
              item.sourcefilesUrl.length == 0 ? "无" : "有"
            }}</el-descriptions-item>
            <el-descriptions-item>
              <template v-if="role === 'user'">
                <el-button type="primary" @click="handleChoose"
                  >选他</el-button
                ></template
              >
            </el-descriptions-item>
            <el-descriptions-item>
              <template v-if="role !== 'user'">
                <el-button type="primary" @click="handleDownload"
                  >下载源文件</el-button
                ></template
              >
            </el-descriptions-item>
          </el-descriptions>
        </el-col>
      </el-row>
      <!-- <div>
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
        <template v-if="role === 'user'">
          <el-button type="primary" @click="handleChoose"
            >选他</el-button
          ></template
        >
        <template v-if="role !== 'user'">
          <el-button type="primary" @click="handleDownload"
            >下载源文件</el-button
          ></template
        >
      </div> -->
      <!-- 配置需求门店信息 -->
      <el-dialog v-model="demandStoreDialogVisible" title="需求门店列表">
        <el-tag
          v-for="item in demandStoreList"
          :key="item.id"
          class="mx-1"
          closable
          :disable-transitions="false"
          @close="handleClose(item)"
        >
          {{ item.infoContent }}
        </el-tag>
        <el-input
          v-if="inputVisible"
          ref="InputRef"
          v-model="inputValue"
          class="ml-1 w-20"
          size="small"
          @keyup.enter="handleInputConfirm"
          @blur="handleInputConfirm"
        />
        <el-button
          v-else
          class="button-new-tag ml-1"
          size="small"
          @click="showInput"
        >
          + 添加
        </el-button>
      </el-dialog>
    </el-card>
    <!-- 文档列表结束 -->
    <!-- 选他弹框 -->
    <el-dialog
      v-model="chooseDialogVisible"
      title="系统提示"
      width="50%"
      draggable
    >
      <el-text>是否选择该活动设计方案</el-text>
      <el-divider />
      <el-text style="font-size: large; font-weight: bold">订单信息</el-text>
      <el-form :model="formData" style="margin-top: 10px">
        <el-row>
          <el-form-item label="订单时间">
            <el-date-picker
              type="datetime"
              v-model="formData.orderTime"
              disabled
            />
          </el-form-item>
          <el-form-item label="需求时间" style="margin-left: 10px">
            <el-date-picker
              type="datetime"
              v-model="formData.demandTime"
              value-format="YYYY-MM-DD hh:mm:ss"
            />
          </el-form-item>
        </el-row>
        <el-form-item label="需求门店">
          <el-select
            v-model="formData.demandStore"
            value-key="id"
            placeholder="未选择门店"
          >
            <el-option
              v-for="item in demandStoreList"
              :key="item.id"
              :label="item.infoContent"
              :value="item.infoContent"
            />
          </el-select>
        </el-form-item>
        <el-button
          size="small"
          link
          type="primary"
          @click="demandStoreDialogVisible = true"
        >
          + 新增需求门店
        </el-button>
        <el-divider />
        <el-text style="font-size: large; font-weight: bold">基本信息</el-text>
        <el-descriptions
          class="margin-top"
          :column="2"
          :size="size"
          border
          style="margin-top: 10px"
        >
          <el-descriptions-item>
            <template #label>
              <div class="cell-item">
                <el-icon :style="iconStyle">
                  <user />
                </el-icon>
                物料
              </div>
            </template>
            {{ formData.material }}
          </el-descriptions-item>
          <el-descriptions-item>
            <template #label>
              <div class="cell-item">
                <el-icon :style="iconStyle">
                  <iphone />
                </el-icon>
                品牌
              </div>
            </template>
            {{ formData.brand }}
          </el-descriptions-item>
          <el-descriptions-item>
            <template #label>
              <div class="cell-item">
                <el-icon :style="iconStyle">
                  <location />
                </el-icon>
                用途
              </div>
            </template>
            {{ formData.useCol }}
          </el-descriptions-item>
          <el-descriptions-item>
            <template #label>
              <div class="cell-item">
                <el-icon :style="iconStyle">
                  <tickets />
                </el-icon>
                节日
              </div>
            </template>
            <!-- <el-tag size="small">{{ formData.festival }}</el-tag> -->
            {{ formData.festival }}
          </el-descriptions-item>
          <el-descriptions-item>
            <template #label>
              <div class="cell-item">
                <el-icon :style="iconStyle">
                  <office-building />
                </el-icon>
                专题
              </div>
            </template>
            {{ formData.topic }}
          </el-descriptions-item>
        </el-descriptions>
        <el-divider />
        <el-text style="font-size: large; font-weight: bold">修改意见</el-text>
        <!-- 输入框 -->
        <FullText high="200px" v-model:html="valueHtml" />
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

.img-style {
  width: 40%;
  height: 50%;
}
</style>
