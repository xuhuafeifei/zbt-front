<script setup lang="ts">
import { ActivityDto } from "@/api/activity/activity";
import { reactive, ref, nextTick } from "vue";
import Detail from "./detail.vue";

// let dataList = reactive([new ActivityDto()]);
const dataList = ref([]);
const dialogVisible = ref(false);
const detailSecRef = ref(null);

// 初始化组件数据
function init(newData: Array<ActivityDto>) {
  console.log(newData);
  dataList.value = newData;
  console.log(dataList);
}

defineExpose({ init });

const detail = item => {
  console.log(item);
  dialogVisible.value = true;
  nextTick(() => {
    detailSecRef.value.init([item]);
  });
};
</script>

<template>
  <div>
    <el-card>
      <el-row>
        <el-card v-for="(item, index) in dataList" :key="index" class="card">
          <img
            :src="item.picturesUrl.length === 0 ? '' : item.picturesUrl[0].url"
          />
          <div style="padding: 1px">
            <span>{{ item.name }}</span>
            <div class="time">{{ item.uploadTime }}</div>
            <div class="time">{{ item.applicableGrade }}</div>
            <el-button text type="primary" @click="detail(item)"
              >查看详情</el-button
            >
          </div>
        </el-card>
      </el-row>
    </el-card>
    <el-dialog v-model="dialogVisible" width="60%">
      <Detail v-if="dialogVisible" ref="detailSecRef" />
    </el-dialog>
  </div>
</template>

<style lang="scss" scoped>
.time {
  font-size: 12px;
  color: #999;
}

.card {
  width: 23%;
  height: 400px;
  margin-right: 19px;
  margin-bottom: 20px;
}

.button {
  padding: 0;
  min-height: auto;
}
</style>
