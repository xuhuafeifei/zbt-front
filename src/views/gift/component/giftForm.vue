<script setup lang="ts">
import { nextTick, ref } from "vue";
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
const obj = {
  id: "",
  picture: "",
  giftName: "",
  giftBrand: "",
  classify: "",
  use: "",
  price: "",
  // 购买链接
  taxonomist: "",
  demandDate: "",
  distributeTo: "",
  style: "",
  remark: "",
  uploadDate: "",
  desc: ""
};
const formData = ref(obj);

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
    formData.value = obj;
  } else {
    title.value = "编辑表单";
    formData.value = newData;
  }
  console.log(formData.value);
}

// 使用 defineExpose 暴露子组件的方法
defineExpose({ init });

const title = ref("");

const classifyList = ["所有分类", "日用品", "美妆", "配饰"];
const useList = ["全部", "预存", "引流", "满赠"];
const priceList = ["50-100元", "100-200元", "200-500元"];

const inputValue = ref("");
const dynamicTags = ref([]);
const inputVisible = ref(false);
const InputRef = ref<InstanceType<typeof ElInput>>();

const handleClose = (tag: string) => {
  dynamicTags.value.splice(dynamicTags.value.indexOf(tag), 1);
};

const showInput = () => {
  inputVisible.value = true;
  nextTick(() => {
    InputRef.value!.input!.focus();
  });
};

const handleInputConfirm = () => {
  if (inputValue.value) {
    dynamicTags.value.push(inputValue.value);
  }
  inputVisible.value = false;
  inputValue.value = "";
};

const purchaseList = ["淘宝", "京东"];
</script>

<template>
  <div>
    <el-dialog :title="title" v-model="dialogVisible">
      <el-form :model="formData" label-width="80px">
        <!-- 商品名称 -->
        <el-form-item label="礼品名称">
          <el-input v-model="formData.giftName" />
        </el-form-item>
        <!-- 上架时间 -->
        <el-form-item label="上传时间">
          <el-date-picker
            v-model="formData.uploadDate"
            type="date"
            placeholder="选择日期"
          />
        </el-form-item>
        <el-form-item label="礼品品牌">
          <el-input v-model="formData.giftBrand" />
        </el-form-item>

        <el-form-item label="分类">
          <el-select v-model="formData.classify" placeholder="分类">
            <el-option
              v-for="item in classifyList"
              :label="item"
              :value="item"
              :key="item"
            />
          </el-select>
        </el-form-item>

        <el-form-item label="用途">
          <el-select v-model="formData.use" placeholder="用途">
            <el-option
              v-for="item in useList"
              :label="item"
              :value="item"
              :key="item"
            />
          </el-select>
        </el-form-item>

        <el-form-item label="价格">
          <el-select v-model="formData.price" placeholder="价格">
            <el-option
              v-for="item in priceList"
              :label="item"
              :value="item"
              :key="item"
            />
          </el-select>
        </el-form-item>
        <!-- 标签 -->
        <el-form-item label="标签" style="font-weight: bold">
          <el-tag
            v-for="tag in dynamicTags"
            :key="tag"
            class="mx-1"
            closable
            :disable-transitions="false"
            @close="handleClose(tag)"
          >
            {{ tag }}
          </el-tag>
          <el-input
            v-if="inputVisible"
            ref="InputRef"
            v-model="inputValue"
            class="ml-1 w-20"
            size="small"
            @keyup.enter="handleInputConfirm"
            @blur="handleInputConfirm"
          />
          <el-button
            v-else
            class="button-new-tag ml-1"
            size="small"
            @click="showInput"
          >
            + New Tag
          </el-button>
        </el-form-item>

        <!-- 上传图片 -->
        <el-form-item label="上传图片" style="font-weight: bold">
          <el-upload
            class="upload-demo"
            action="https://jsonplaceholder.typicode.com/posts/"
            drag
            :on-preview="handlePreview"
            :on-remove="handleRemove"
            :file-list="fileList"
          >
            <i class="el-icon-upload" />
            <div class="el-upload__text" style="font-weight: lighter">
              将文件拖到此处，或<em>点击上传</em>
            </div>
          </el-upload>
        </el-form-item>

        <!-- 商品描述 -->
        <el-form-item label="商品描述">
          <el-input type="textarea" v-model="formData.desc" />
        </el-form-item>

        <el-form-item label="购买链接" style="font-weight: bold">
          <el-row>
            <el-select
              placeholder="选择平台"
              style="width: 100px; margin-right: 30px"
            >
              <el-option
                v-for="item in purchaseList"
                :key="item"
                :value="item"
                :label="item"
              />
            </el-select>
            <el-input v-model="formData.taxonomist" style="width: 200px" />
          </el-row>
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
