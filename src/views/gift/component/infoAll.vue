<script setup lang="ts">
import { ref } from "vue";

const obj = {
  id: 1,
  picture:
    "https://feigebuge.oss-cn-beijing.aliyuncs.com/QQ%E5%9B%BE%E7%89%8720230819130111.gif",
  giftName: "尔木萄洗脸巾",
  desc: "这是一段很长的描述"
};

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
    <el-row :gutter="5" class="el-row">
      <el-card v-for="(item, index) in List" :key="item.id" class="item">
        <div style="document-meta p">
          <div class="img_box"><img :src="item.picture" alt="" /></div>
          <span style="font-size: 15px">{{ item.giftName }}</span>
          <p>
            <span style="font-size: 10px">{{ item.desc }}</span>
          </p>
          <p><span :style="{ color: 'red' }" /></p>
        </div>
      </el-card>
    </el-row>
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
.el-card {
  min-width: 100xp;
  min-height: 10xp;
  height: 100%;
  margin-right: 20px;
  transition: all 0.5s;
}

* {
  margin: 1;
  padding: 10;
  list-style: none;
}

body {
  background: #e3e4e5;
  margin: auto;
}

#app {
  width: 1000px;
  margin-left: auto;
  margin-right: auto;
  overflow: hidden;
}

.item {
  float: left;
  width: 200px;
  height: 250px;
  margin: 0 5px 8px;
  text-align: center;
  background: #fff;
}

.item .img_box {
  width: 120px;
  height: 120px;
  margin: 30px auto;
}

.img_box img {
  width: 100%;
  height: 100%;
}

.item p {
  font-size: 12px;
  line-height: 20px;
  height: 40px;
  padding: 0 10px;
  display: -webkit-box;
  overflow: hidden;
  text-overflow: ellipsis;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
}

.more2_info_self {
  background-color: #e1251b;
  border-radius: 2px;
  color: #fff;
  padding: 0 5px;
  margin-right: 4px;
  line-height: 16px;
  height: 16px;
  font-size: 12px;
  font-style: normal;
}

/*卡片文字css*/
.document-meta p {
  margin: 0.5em 0;
  line-height: 1.6;
}
</style>
