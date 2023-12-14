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
  id: "01",
  picture:
    "https://feigebuge.oss-cn-beijing.aliyuncs.com/QQ%E5%9B%BE%E7%89%8720230819130111.gif",
  name: "18k金钻石截至",
  brand: "老凤祥",
  material: "素金",
  style: "手镯",
  finishQuality: "5G",
  number: 10,
  vegetarianGoldWeight: "15g",
  jewellerWeight: "-",
  size: "60圈口",
  uploadDate: "2023/10/21",
  scene: "日常销售",
  uploader: "采购部门",
  color: "灰色"
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
    <el-dialog :title="title" v-model="dialogVisible" style="width: 650px">
      <el-form :model="formData" label-width="80px">
        <el-row>
          <!-- 商品名称 -->
          <el-form-item label="产品名称" style="margin-right: 20px">
            <el-input v-model="formData.name" />
          </el-form-item>
          <!-- 上架时间 -->
          <el-form-item label="上传时间">
            <el-date-picker
              v-model="formData.uploadDate"
              type="date"
              placeholder="选择日期"
            />
          </el-form-item>
        </el-row>
        <el-row>
          <el-form-item label="产品编号" style="margin-right: 20px">
            <el-input v-model="formData.id" />
          </el-form-item>
          <el-form-item label="上传用户">
            <el-input v-model="formData.uploader" />
          </el-form-item>
        </el-row>

        <el-row>
          <el-form-item>
            <el-select v-model="formData.material" placeholder="材质">
              <el-option
                v-for="item in classifyList"
                :label="item"
                :value="item"
                :key="item"
              />
            </el-select>
          </el-form-item>

          <el-form-item>
            <el-select v-model="formData.finishQuality" placeholder="成色">
              <el-option
                v-for="item in useList"
                :label="item"
                :value="item"
                :key="item"
              />
            </el-select>
          </el-form-item>

          <el-form-item>
            <el-select v-model="formData.style" placeholder="款式">
              <el-option
                v-for="item in priceList"
                :label="item"
                :value="item"
                :key="item"
              />
            </el-select>
          </el-form-item>

          <el-form-item>
            <el-select v-model="formData.brand" placeholder="品牌">
              <el-option
                v-for="item in priceList"
                :label="item"
                :value="item"
                :key="item"
              />
            </el-select>
          </el-form-item>

          <el-form-item>
            <el-select v-model="formData.brand" placeholder="场景">
              <el-option
                v-for="item in priceList"
                :label="item"
                :value="item"
                :key="item"
              />
            </el-select>
          </el-form-item>

          <el-form-item>
            <el-select v-model="formData.brand" placeholder="厂商">
              <el-option
                v-for="item in priceList"
                :label="item"
                :value="item"
                :key="item"
              />
            </el-select>
          </el-form-item>
        </el-row>

        <el-form-item>
          <el-select v-model="formData.size" placeholder="尺寸" />
          <el-select v-model="formData.jewellerWeight" placeholder="珠宝重量" />
          <el-select v-model="formData.color" placeholder="颜色" />
          <el-select
            v-model="formData.vegetarianGoldWeight"
            placeholder="金重"
          />
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
