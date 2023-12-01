<script setup lang="ts">
import { ref, onMounted } from "vue";
import { ElImage } from "element-plus";

// 假设后端返回的数据格式如下
const obj = {
  id: "1",
  picture:
    "https://feigebuge.oss-cn-beijing.aliyuncs.com/QQ%E5%9B%BE%E7%89%8720230819130111.gif",
  activityName: "双十一大促",
  materialType: "海报",
  use: "-",
  festival: "-",
  specialTopic: "双11",
  brand: "通用",
  uploadUser: "运营部门",
  uploadDate: "2023/10/21"
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
            fit="cover"
            style="document-image"
          />
          <div>
            <div style="document-meta p">
              <p><strong>活动名称：</strong>{{ document.activityName }}</p>
              <p><strong>物料类型：</strong>{{ document.materialType }}</p>
              <p><strong>用途：</strong>{{ document.use }}</p>
              <p><strong>节日：</strong>{{ document.festival }}</p>
              <p><strong>专题：</strong>{{ document.specailTopic }}</p>
              <p><strong>品牌：</strong>{{ document.brand }}</p>
              <p><strong>上传时间：</strong>{{ document.uploadDate }}</p>
              <p><strong>上传者：</strong>{{ document.uploadUser }}</p>
            </div>
            <div class="document-actions">
              <el-button type="primary">选他</el-button>
              <el-button>下载源文件</el-button>
            </div>
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
  max-height: 1000px; /* 根据需要调整 */
  overflow-y: auto;
}
</style>
