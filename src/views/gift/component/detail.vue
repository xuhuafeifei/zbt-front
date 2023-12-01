<script setup lang="ts">
import { ref, onMounted } from "vue";
import { ElImage } from "element-plus";

// 假设后端返回的数据格式如下
const obj = {
  id: "1",
  picture:
    "https://feigebuge.oss-cn-beijing.aliyuncs.com/QQ%E5%9B%BE%E7%89%8720230819130111.gif",
  giftName: "尔木萄洗脸巾",
  giftBrand: "AMORTALS/尔木萄",
  classify: "日用品",
  use: "引流",
  price: "50-100元",
  // 购买链接
  taxonomist: "www.baidu.com",
  demandDate: "2023/10/18",
  distributeTo: "大悦城老凤祥",
  style: "抽取式",
  number: 10,
  remark: ""
};
const fetchDocumentList = async () => {
  // 这里应该是异步调用API获取数据的代码
  // 暂时使用静态数据进行演示
  return [
    // ...更多的列表项
    obj,
    obj,
    obj
  ];
};

const documentList = ref([]); // 存放文档列表数据
const scrollContainer = ref(null); // 用于引用滚动容器的DOM元素

onMounted(async () => {
  documentList.value = await fetchDocumentList();
  // 如果需要对滚动容器进行额外的操作或滚动监听，可以在这里实现
});
</script>

<template>
  <div class="document-container" ref="scrollContainer">
    <h2>双十一珠宝活动详情</h2>
    <el-divider />
    <!-- 文档列表开始 -->
    <div
      v-for="document in documentList"
      :key="document.id"
      class="document-item"
    >
      <el-card class="box-card">
        <el-row>
          <el-image
            :src="document.picture"
            fit="fit"
            class="document-image"
            style="margin-right: 30px"
          />
          <div>
            <div style="document-meta p">
              <h3>{{ document.giftName }}</h3>
              <p><strong>礼品品牌：</strong>{{ document.giftBrand }}</p>
              <p><strong>分类：</strong>{{ document.classify }}</p>
              <p><strong>用途：</strong>{{ document.use }}</p>
              <p><strong>价格：</strong>{{ document.price }}</p>
              <p><strong>购买链接：</strong>{{ document.taxonomist }}</p>
              <p><strong>需求时间：</strong></p>
              <el-date-picker v-model="document.demandDate" />
              <!-- {{ document.demandDate }}</p> -->
              <p><strong>配送至：</strong>{{ document.uploadDate }}</p>
              <p><strong>数量：</strong>{{ document.number }}</p>
              <p><strong>备注：</strong></p>
              <el-input v-model="document.remark" />
            </div>
            <el-button>加入购物车</el-button>
          </div>
        </el-row>
      </el-card>
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
  height: 350px;
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
  max-height: 1000px; /* 根据需要调整 */
  overflow-y: auto;
}
</style>
