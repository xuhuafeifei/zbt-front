<script setup lang="ts">
import { ref } from "vue";
import InfoAll from "./component/infoAll.vue";
import Detail from "./component/detail.vue";

const checkboxMaterial = ref(["全部"]);
const checkboxUse = ref(["招聘"]);
const checkboxFestival = ref(["中秋节"]);
const checkboxSpecialTopic = ref(["双11预热"]);
const checkboxBrand = ref(["通用"]);

// 判断是否是详细展示界面
const isDetail = ref(false);

// 物料
const materials = [
  "全部",
  "展架",
  "海报",
  "优惠劵",
  "地推卡",
  "预存卡",
  "活动套系"
];
// 用途
const uses = [
  "全部",
  "招聘",
  "地推",
  "开业宣传",
  "常规营销",
  "周年店庆",
  "会员日"
];
// 节日
const festivals = ["全部", "中秋节", "国庆节", "圣诞节", "元旦节"];
// 专题
const specialTopics = ["全部", "双11预热", "双十一", "双十二", "年终大促"];
// 品牌
const brands = ["通用", "周大福", "周大生", "老凤祥"];

const obj = {
  id: 1,
  sportrait:
    "https://feigebuge.oss-cn-beijing.aliyuncs.com/QQ%E5%9B%BE%E7%89%8720230819130111.gif"
};

const value1 = ref(true);
const List = ref([obj, obj, obj, obj, obj, obj, obj, obj, obj, obj, obj, obj]);
const dataList = ref([]);
const pageIndex = ref(1);
const pageSize = ref(10);
const totalPage = ref(0);

const getDataList = val => {
  console.log(val);
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
    <br />
    <InfoAll v-show="!isDetail" />
    <Detail v-show="isDetail" />
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
