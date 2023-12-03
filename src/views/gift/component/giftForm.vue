<script setup lang="ts">
import { ref } from "vue";
import {
  ElDialog,
  ElForm,
  ElFormItem,
  ElInput,
  ElDatePicker,
  ElSelect,
  ElOption,
  ElButton,
  ElUpload
} from "element-plus";

const dialogVisible = ref(true);
const fileList = ref([]); // 上传的文件列表
const formData = ref({
  productName: "",
  availableDate: "",
  endDate: "",
  priceRange: "",
  tags: [],
  description: ""
});

function handlePreview(file) {
  // 预览文件的逻辑
}

function handleRemove(file, fileList) {
  // 移除文件的逻辑
}

function submitForm() {
  console.log("提交的表单数据:", formData.value);
  // 提交表单的逻辑
}

// 处理父组件传递数据给子组件
function init(newData) {
  dialogVisible.value = true;
  if (newData === null || newData === undefined) {
    title.value = "新增表单";
    // formData.value = obj;
  } else {
    title.value = "编辑表单";
    formData.value = newData;
  }
  console.log(formData.value);
}

// 使用 defineExpose 暴露子组件的方法
defineExpose({ init });

const title = ref("");
</script>

<template>
  <div>
    <el-dialog :title="title" v-model:visible="dialogVisible">
      <el-form :model="formData" label-width="80px">
        <!-- 商品名称 -->
        <el-form-item label="商品名称">
          <el-input v-model="formData.productName" />
        </el-form-item>

        <!-- 上架时间 -->
        <el-form-item label="上架时间">
          <el-date-picker
            v-model="formData.availableDate"
            type="date"
            placeholder="选择日期"
          />
        </el-form-item>

        <!-- 下架时间 -->
        <el-form-item label="下架时间">
          <el-date-picker
            v-model="formData.endDate"
            type="date"
            placeholder="选择日期"
          />
        </el-form-item>

        <!-- 价格区间 -->
        <el-form-item label="价格区间">
          <el-select v-model="formData.priceRange" placeholder="选择价格区间">
            <el-option label="50-100元" value="50-100" />
            <el-option label="100-200元" value="100-200" />
            <el-option label="200-500元" value="200-500" />
          </el-select>
        </el-form-item>

        <!-- 标签 -->
        <el-form-item label="标签">
          <el-select v-model="formData.tags" multiple placeholder="添加标签">
            <el-option label="热销" value="hot" />
            <el-option label="新品" value="new" />
            <el-option label="促销" value="sale" />
          </el-select>
        </el-form-item>

        <!-- 上传图片 -->
        <el-form-item label="上传图片">
          <el-upload
            class="upload-demo"
            action="https://jsonplaceholder.typicode.com/posts/"
            drag
            :on-preview="handlePreview"
            :on-remove="handleRemove"
            :file-list="fileList"
          >
            <i class="el-icon-upload" />
            <div class="el-upload__text">
              将文件拖到此处，或<em>点击上传</em>
            </div>
          </el-upload>
        </el-form-item>

        <!-- 商品描述 -->
        <el-form-item label="商品描述">
          <el-input type="textarea" v-model="formData.description" />
        </el-form-item>
      </el-form>
      <span class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="submitForm">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<style lang="scss" scoped>
.upload-demo .el-upload__text em {
  color: #409eff;
}
.dialog-footer {
  text-align: right;
}
</style>
