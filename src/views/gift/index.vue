<script setup lang="ts">
import { ref } from "vue";
import InfoAll from "./component/infoAll.vue";
import Detail from "./component/detail.vue";

const classifyList = ["全部", "日用品", "美妆", "配饰"];
const useList = ["全部", "预存", "引流", "满赠"];
const priceList = [
  "1-5元",
  "5-20元",
  "20-100元",
  "100-200元",
  "200-500元",
  "500-1000元",
  "1000-2000元",
  "2000-3000元",
  "3000元以上"
];

const checkboxClassify = ["全部"];
const checkboxUse = ["全部"];
const checkboxPrice = ["1-5元"];

const isDetail = ref(false);
</script>

<template>
  <div>
    <el-card>
      <div>
        <el-checkbox-group v-model="checkboxClassify" size="default">
          <el-row :gutter="2" class="el-row">
            <el-col :span="2">
              <el-button type="primary" plain size="small">分类</el-button>
            </el-col>
            <el-col :span="30">
              <el-checkbox
                v-for="classify in classifyList"
                :key="classify"
                :label="classify"
                border
                size="small"
              >
                {{ classify }}
              </el-checkbox>
            </el-col>
          </el-row>
        </el-checkbox-group>
      </div>
      <div class="demo-button-style">
        <el-checkbox-group v-model="checkboxUse" size="default">
          <el-row :gutter="1">
            <el-col :span="2">
              <el-button type="primary" plain size="small">用途</el-button>
            </el-col>
            <el-col :span="30">
              <el-checkbox
                v-for="use in useList"
                :key="use"
                :label="use"
                border
                size="small"
                >{{ use }}</el-checkbox
              >
            </el-col>
          </el-row>
        </el-checkbox-group>
      </div>
      <div class="demo-button-style">
        <el-checkbox-group v-model="checkboxPrice" size="default">
          <el-row>
            <el-col :span="2">
              <el-button type="primary" plain size="small">节日</el-button>
            </el-col>
            <el-col :span="30">
              <el-checkbox
                v-for="price in priceList"
                :key="price"
                :label="price"
                border
                size="small"
                style="margin-right: 5px"
                >{{ price }}</el-checkbox
              >
            </el-col>
          </el-row>
        </el-checkbox-group>
      </div>
    </el-card>
    <el-switch
      v-model="isDetail"
      class="mb-2"
      active-text="详细展示"
      inactive-text="简略展示"
    />
    <br />
    <InfoAll v-show="!isDetail" />
    <Detail v-show="isDetail" />
  </div>
</template>

<style lang="scss" scoped></style>
