<script setup lang="ts">
import { ref } from "vue";
import InfoAll from "./component/infoAll.vue";
import Detail from "./component/detail.vue";

const isDetail = ref(false);

const materialList = [
  "素金",
  "黄金标价",
  "钻石",
  "铂金",
  "银饰",
  "K金",
  "钯金",
  "玉器",
  "名表",
  "其他"
];
const finishQualityList = ["全部", "3D硬金", "5G工艺", "古法", "镶嵌", "其他"];

const styleList = [
  "全部",
  "手镯",
  "手链",
  "戒指",
  "挂坠",
  "项链",
  "耳饰",
  "套链",
  "其他"
];

const brandList = [
  "通用",
  "张万福",
  "周大生",
  "老凤祥",
  "中国黄金",
  "周六福",
  "金六福",
  "中国珠宝",
  "人民金行",
  "金六福吉祥",
  "金大大"
];

const sceneList = [
  "全部",
  "线上引流",
  "预存活动",
  "限时秒杀",
  "系列套装",
  "日常销售",
  "其他"
];

const manufactureList = ["世纪黄金", "世纪珠宝", "老货仓"];

const checkboxMaterial = ref("全部");
const checkboxFinishQuality = ref("全部");
const checkboxStyle = ref("全部");
const checkboxBrand = ref("张万福");
const checkboxScene = ref("全部");
const checkboxManufacture = ref("世纪黄金");
</script>

<template>
  <div>
    <el-card>
      <div>
        <el-radio-group v-model="checkboxMaterial" size="default">
          <el-row :gutter="2" class="el-row">
            <el-button type="primary" class="button-style" plain size="small"
              >材料</el-button
            >
            <el-radio
              v-for="item in materialList"
              :key="item"
              :label="item"
              border
              size="small"
              class="radio-style"
            >
              {{ item }}
            </el-radio>
          </el-row>
        </el-radio-group>
      </div>
      <div class="demo-button-style">
        <el-radio-group v-model="checkboxFinishQuality" size="default">
          <el-row :gutter="2">
            <el-button type="primary" class="button-style" plain size="small"
              >成色</el-button
            >
            <el-radio
              v-for="item in finishQualityList"
              :key="item"
              :label="item"
              border
              class="radio-style"
              size="small"
              >{{ item }}</el-radio
            >
          </el-row>
        </el-radio-group>
      </div>
      <div class="demo-button-style">
        <el-radio-group v-model="checkboxStyle" size="default">
          <el-row>
            <el-button class="button-style" type="primary" plain size="small"
              >款式</el-button
            >
            <el-radio
              v-for="item in styleList"
              :key="item"
              :label="item"
              border
              size="small"
              class="radio-style"
              >{{ item }}</el-radio
            >
          </el-row>
        </el-radio-group>
      </div>
      <div class="demo-button-style">
        <el-radio-group v-model="checkboxBrand" size="default">
          <el-row>
            <el-button type="primary" class="button-style" plain size="small"
              >品牌</el-button
            >
            <el-radio
              v-for="item in brandList"
              :key="item"
              :label="item"
              border
              size="small"
              class="radio-style"
              >{{ item }}</el-radio
            >
          </el-row>
        </el-radio-group>
      </div>
      <div class="demo-button-style">
        <el-radio-group v-model="checkboxScene" size="default">
          <el-row>
            <el-button class="button-style" type="primary" plain size="small"
              >场景</el-button
            >
            <el-radio
              v-for="item in sceneList"
              :key="item"
              :label="item"
              border
              size="small"
              class="radio-style"
              >{{ item }}</el-radio
            >
          </el-row>
        </el-radio-group>
      </div>

      <div class="demo-button-style">
        <el-radio-group v-model="checkboxManufacture" size="default">
          <el-row>
            <el-button class="button-style" type="primary" plain size="small"
              >厂商</el-button
            >
            <el-radio
              v-for="item in manufactureList"
              :key="item"
              :label="item"
              border
              size="small"
              class="radio-style"
              >{{ item }}</el-radio
            >
          </el-row>
        </el-radio-group>
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

<style lang="scss" scoped>
.radio-style {
  margin-right: 10px;
}
.button-style {
  margin-right: 15px;
}
</style>
