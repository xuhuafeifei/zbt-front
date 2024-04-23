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

import { Picture as IconPicture } from "@element-plus/icons-vue";
</script>

<template>
  <div>
    <el-card>
      <el-row>
        <el-card v-for="(item, index) in dataList" :key="index" class="card">
          <el-text>{{ item.name }}</el-text
          ><br />
          <el-image
            :src="item.picturesUrl.length === 0 ? '' : item.picturesUrl[0].url"
            @click="detail(item)"
            fit="cover"
            style="height: 350px"
          >
            <template #error>
              <div class="image-slot">
                <el-icon><icon-picture @click="detail(item)" /></el-icon>
              </div>
            </template>
          </el-image>
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

.demo-image__error .block {
  padding: 30px 0;
  text-align: center;
  border-right: solid 1px var(--el-border-color);
  display: inline-block;
  width: 49%;
  box-sizing: border-box;
  vertical-align: top;
}
.demo-image__error .demonstration {
  display: block;
  color: var(--el-text-color-secondary);
  font-size: 14px;
  margin-bottom: 20px;
}
.demo-image__error .el-image {
  padding: 0 5px;
  max-width: 300px;
  max-height: 200px;
  width: 100%;
  height: 200px;
}

.demo-image__error .image-slot {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  background: var(--el-fill-color-light);
  color: var(--el-text-color-secondary);
  font-size: 30px;
}

.demo-image__error .image-slot .el-icon {
  font-size: 30px;
}
</style>
