<script setup lang="ts">
import { ref, onMounted } from "vue";
import { ElImage } from "element-plus";

const testObj = {
  id: 1,
  picture:
    "https://feigebuge.oss-cn-beijing.aliyuncs.com/QQ%E5%9B%BE%E7%89%8720230819130111.gif",
  name: "18k金钻石截至",
  desc: "这是一段很长的描述",
  brand: "老凤祥",
  material: "素金",
  style: "手镯",
  finishQuality: "5G",
  number: 10,
  // 素金金重
  vegetarianGoldWeight: "15g",
  // 珠宝价值
  jewellerWeight: "-",
  // 尺寸
  size: "60圈口",
  remark: "-"
};

const documentList = ref([testObj, testObj, testObj]); // 存放文档列表数据

onMounted(async () => {});
</script>

<template>
  <div v-for="obj in documentList" :key="obj.id" class="document-item">
    <el-card class="box-card">
      <el-row>
        <el-col :span="12" style="margin-right: 25px">
          <el-carousel :interval="4000" type="card" height="400px">
            <el-carousel-item v-for="item in 6" :key="item">
              <h3 text="2xl" justify="center">{{ item }}</h3>
            </el-carousel-item>
          </el-carousel>
        </el-col>
        <el-col :span="10">
          <el-card class="product-card">
            <div class="product-header">
              <h2>{{ obj.name }}</h2>
              <div class="price">¥ --</div>
            </div>
            <el-row :gutter="20">
              <el-col :span="12">
                <div class="product-info">
                  <!-- <p>
                    <strong>产品编号：{{ obj.id }} </strong>
                  </p> -->
                  <p>
                    <el-text>品牌：{{ obj.brand }}</el-text>
                  </p>
                  <p>
                    <el-text>成色：{{ obj.finishQuality }}</el-text>
                  </p>
                  <p>
                    <el-text>款式：{{ obj.style }}</el-text>
                  </p>
                </div>
              </el-col>
              <el-col :span="12">
                <div class="product-meta">
                  <p>
                    <el-text>产品编号：{{ obj.id }}</el-text>
                  </p>
                  <p><el-text>厂商：-</el-text></p>
                  <p>
                    <el-text>成色：{{ obj.finishQuality }}</el-text>
                  </p>
                </div>
              </el-col>
            </el-row>
            <div class="product-attributes">
              <p>
                <el-text>重量:</el-text>
                <el-select
                  v-model="selectedAttribute"
                  placeholder="请选择"
                  size="small"
                >
                  <el-option label="选择属性" value="" />
                  <!-- 属性选项 -->
                </el-select>
              </p>
              <p>
                <el-text>尺寸:</el-text>
                <el-select
                  v-model="selectedAttribute"
                  placeholder="请选择"
                  size="small"
                >
                  <el-option label="选择属性" value="" />
                </el-select>
              </p>
              <p>
                <el-text>配送至:</el-text>
                <el-select
                  v-model="selectedAttribute"
                  placeholder="请选择"
                  size="small"
                >
                  <el-option label="选择属性" value="" />
                </el-select>
              </p>
              <div class="product-quantity">
                <el-text>数量:</el-text>
                <el-input-number
                  v-model="obj.number"
                  :min="1"
                  label="数量"
                  size="small"
                /><br />
                <el-text>备注: </el-text>
                <el-input
                  v-model="obj.remark"
                  style="width: 200px"
                  size="small"
                />
              </div>
            </div>
            <el-button type="primary">加入购物车</el-button>
          </el-card>
        </el-col>
      </el-row>
    </el-card>
  </div>
</template>

<style lang="scss" scoped>
.product-card {
  margin: 20px;
  width: 100%;
}

.product-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}

.product-header h2 {
  font-size: 20px;
  color: #333;
  margin: 0;
}

.price {
  color: red;
  font-size: 24px;
}

.product-info p,
.product-meta p {
  margin: 0;
  line-height: 1.6;
}

.product-attributes {
  margin: 20px 0;
}

.product-sizes {
  margin: 20px 0;
}

.product-quantity {
  margin: 20px 0;
}

.product-quantity .el-input-number__original {
  padding: 10px 0;
}

.el-carousel__item h3 {
  color: #475669;
  opacity: 0.75;
  line-height: 200px;
  margin: 0;
  text-align: center;
}

.el-carousel__item:nth-child(2n) {
  background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n + 1) {
  background-color: #d3dce6;
}

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
