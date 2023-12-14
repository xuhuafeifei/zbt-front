<script setup lang="ts">
import { ref, onMounted, nextTick } from "vue";
import InfoAll from "./component/infoAll.vue";
import Detail from "./component/detail.vue";
import { ActivityDto, getActivityOptionDto } from "@/api/activity/activity";
import { ElMessage } from "element-plus";
import {
  ConditionActivity,
  getActivityPageList,
  getActivityPageListWithCondition
} from "@/api/activity/manage";

const checkboxMaterial = ref([""]);
const checkboxUse = ref([""]);
const checkboxFestival = ref([""]);
const checkboxSpecialTopic = ref([""]);
const checkboxBrand = ref([""]);

// 判断是否是详细展示界面
const isDetail = ref(false);

// 物料
const materials = ref([]);
// 用途
const uses = ref([]);
// 节日
const festivals = ref([]);
// 专题
const specialTopics = ref([]);
// 品牌
const brands = ref([]);
const pageIndex = ref(1);
const pageSize = ref(10);
const totalPage = ref(0);

const dataList = ref<Array<ActivityDto>>([]);

/** 获取选项数据 */
const getOptionList = async () => {
  const res = await getActivityOptionDto();
  console.log(res);
  if (res.code !== 0) {
    ElMessage.error("获取数据错误: " + res.msg);
  } else {
    const optionDto = res.data;
    materials.value = optionDto.materialList;
    uses.value = optionDto.useList;
    festivals.value = optionDto.festivalList;
    specialTopics.value = optionDto.topicList;
    brands.value = optionDto.brandList;
  }
  console.log(materials);
};

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

onMounted(() => {
  getOptionList();
  getDataList();
});

const getDataList = async () => {
  const ca = new ConditionActivity();
  ca.page = pageIndex.value;
  ca.limit = pageSize.value;
  ca.brand = checkboxBrand.value;
  ca.material = checkboxMaterial.value;
  ca.useCol = checkboxUse.value;
  ca.festival = checkboxFestival.value;
  ca.topic = checkboxSpecialTopic.value;

  console.log(ca);
  const res = await getActivityPageListWithCondition(ca);
  console.log(res);
  if (res.code === 0) {
    dataList.value = res.data.list;
    nextTick(() => {
      detailRef.value.init(dataList.value);
      infoAllRef.value.init(dataList.value);
    });
  } else {
    ElMessage.error("数据获取失败: " + res.msg);
  }
};

const infoAllRef = ref(null);
const detailRef = ref(null);
</script>

<template>
  <div>
    <el-card>
      <div>
        <el-checkbox-group v-model="checkboxMaterial" size="default">
          <el-row :gutter="2" class="el-row">
            <el-col :span="2">
              <el-button type="primary" plain size="small">物料</el-button>
            </el-col>
            <el-col :span="30">
              <el-checkbox
                v-for="material in materials"
                :key="material"
                :label="material"
                border
                size="small"
              >
                {{ material }}
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
                v-for="use in uses"
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
        <el-checkbox-group v-model="checkboxFestival" size="default">
          <el-row>
            <el-col :span="2">
              <el-button type="primary" plain size="small">节日</el-button>
            </el-col>
            <el-col :span="30">
              <el-checkbox
                v-for="festival in festivals"
                :key="festival"
                :label="festival"
                border
                size="small"
                >{{ festival }}</el-checkbox
              >
            </el-col>
          </el-row>
        </el-checkbox-group>
      </div>
      <div class="demo-button-style">
        <el-checkbox-group v-model="checkboxSpecialTopic" size="default">
          <el-row>
            <el-col :span="2">
              <el-button type="primary" plain size="small">专题</el-button>
            </el-col>
            <el-col :span="30">
              <el-checkbox
                v-for="specialTopic in specialTopics"
                :key="specialTopic"
                :label="specialTopic"
                border
                size="small"
                >{{ specialTopic }}</el-checkbox
              >
            </el-col>
          </el-row>
        </el-checkbox-group>
      </div>
      <div class="demo-button-style">
        <el-checkbox-group v-model="checkboxBrand" size="default">
          <el-row>
            <el-col :span="2">
              <el-button type="primary" plain size="small">品牌</el-button>
            </el-col>
            <el-col :span="30">
              <el-checkbox
                v-for="brand in brands"
                :key="brand"
                :label="brand"
                border
                size="small"
                >{{ brand }}</el-checkbox
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
    <el-button @click="getDataList">查询</el-button>
    <br />
    <div>
      <InfoAll v-show="!isDetail" ref="infoAllRef" />
    </div>
    <div>
      <Detail v-show="isDetail" ref="detailRef" />
    </div>
    <el-pagination
      @size-change="sizeChangeHandle"
      @current-change="currentChangeHandle"
      :current-page="pageIndex"
      :page-sizes="[10, 20, 50, 100]"
      :page-size="pageSize"
      :total="totalPage"
      layout="total, sizes, prev, pager, next, jumper"
    />
  </div>
</template>

<style lang="scss" scoped>
.demo-button-style {
  margin-top: 10px;
}

// .el-row {
//   margin-bottom: 20px;
//   display: flex;
//   flex-wrap: wrap;
//   height: 10px;
// }
</style>
