<script setup lang="ts">
import { ref, toRefs } from "vue";
import { defineProps, onMounted } from "vue";

const props = defineProps({
  activiyFormData: {
    type: Object,
    default: () => ({
      id: "",
      picture: "",
      activityName: "",
      materialType: "",
      use: "",
      festival: "",
      specialTopic: "",
      brand: "",
      applicableGrade: "",
      uploadUser: "",
      uploadDate: "",
      sourceFile: "",
      // 方案介绍
      desc: ""
    })
  }
});

const activityFormData = toRefs(props);

const localActivityFormData = ref({ ...activityFormData.value });

const dialogVisible = ref(false);

const imageList = ref([]);

const materialList = [
  { label: "所有材料", value: "所有材料" },
  { label: "展架", value: "展架" },
  { label: "海报", value: "海报" },
  { label: "优惠卷", value: "优惠卷" },
  { label: "地推卡", value: "地推卡" },
  { label: "活动套系", value: "活动套系" }
];
const useList = [
  { label: "全部用途", value: "全部用途" },
  { label: "招聘", value: "招聘" },
  { label: "地推", value: "地推" },
  { label: "开业宣传", value: "开业宣传" },
  { label: "常规营销", value: "常规营销" },
  { label: "年终特惠", value: "年终特惠" }
];
const festivalList = [
  { label: "全部节日", value: "全部节日" },
  { label: "儿童节", value: "儿童节" },
  { label: "母亲节", value: "母亲节" },
  { label: "中秋节", value: "中秋节" },
  { label: "国庆节", value: "国庆节" },
  { label: "圣诞节", value: "圣诞节" }
];
const specialTopicList = [
  { label: "所有专题", value: "所有专题" },
  { label: "520", value: "520" },
  { label: "618", value: "618" },
  { label: "爱妻月", value: "爱妻月" },
  { label: "开学季", value: "开学季" },
  { label: "双11", value: "双11" }
];
const brandList = [
  { label: "通用品牌", value: "通用品牌" },
  { label: "周六福", value: "周六福" },
  { label: "周大生", value: "周大生" },
  { label: "周大福", value: "周大福" },
  { label: "老凤祥", value: "老凤祥" }
];

const gradeList = ["白银会员", "黄金会员", "钻石会员"];
// const dialogVisible = ref(false);
const obj = {
  id: "",
  picture: "",
  activityName: "",
  materialType: "",
  use: "",
  festival: "",
  specialTopic: "",
  brand: "",
  applicableGrade: "",
  uploadUser: "",
  uploadDate: "",
  sourceFile: "",
  // 方案介绍
  desc: ""
};
const formData = ref(obj);
const fileList = ref([]);

const title = ref("");

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

const handlePreview = file => {
  // 预览文件的逻辑
};

const handleRemove = (file, fileList) => {
  // 处理文件移除的逻辑
};

const handleExceed = (files, fileList) => {
  // 文件超出数量限制时的逻辑
  console.log("Exceed limit:", files, fileList);
};

const submitForm = () => {
  console.log("Submit form:", formData.value);
  // 提交表单的逻辑
};
</script>

<template>
  <div>
    <!-- 新增表单 -->
    <el-dialog
      :title="title"
      v-model="dialogVisible"
      style="width: 600px; align-center: true"
      align-center
      center
    >
      <el-form :model="formData">
        <el-row>
          <el-col :span="10" style="margin-right: 30px">
            <el-form-item label="活动名称">
              <el-input v-model="formData.activityName" />
            </el-form-item>
          </el-col>
          <el-col :span="10">
            <!-- 其他表单项 -->
            <el-form-item label="上传时间">
              <el-date-picker
                v-model="formData.uploadDate"
                type="datetime"
                placeholder="上传时间"
              />
            </el-form-item>
          </el-col>
        </el-row>
        <!-- 5个下拉框 -->
        <el-form-item>
          <el-select
            v-model="formData.materialType"
            placeholder="物料"
            class="m-2"
            size="large"
          >
            <el-option
              v-for="item in materialList"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
          <el-select
            v-model="formData.use"
            class="m-2"
            placeholder="用途"
            size="large"
          >
            <el-option
              v-for="item in useList"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
          <el-select
            v-model="formData.festival"
            class="m-2"
            placeholder="节日"
            size="large"
          >
            <el-option
              v-for="item in festivalList"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
          <el-select
            v-model="formData.specialTopic"
            class="m-2"
            placeholder="专题"
            size="large"
          >
            <el-option
              v-for="item in specialTopicList"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
          <el-select
            v-model="formData.brand"
            class="m-2"
            placeholder="品牌"
            size="large"
          >
            <el-option
              v-for="item in brandList"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </el-form-item>

        <!-- vip等级选择 -->
        <el-form-item label="适用等级">
          <el-radio-group v-model="formData.applicableGrade" :max="1">
            <el-radio v-for="grade in gradeList" :key="grade" :label="grade">{{
              grade
            }}</el-radio>
          </el-radio-group>
        </el-form-item>

        <el-form-item label="图片上传">
          <el-upload
            class="upload-demo"
            action="https://jsonplaceholder.typicode.com/posts/"
            :on-preview="handlePreview"
            :on-remove="handleRemove"
            multiple
            :limit="3"
            :on-exceed="handleExceed"
            :file-list="imageList"
          >
            <el-button size="small" type="primary" style="margin-right: 10px"
              >点击上传</el-button
            >
            <div class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
          </el-upload>
        </el-form-item>
        <el-form-item label="方案介绍">
          <el-input type="textarea" v-model="formData.desc" />
        </el-form-item>
        <el-form-item label="源文件">
          <el-upload
            class="upload-area"
            action="https://jsonplaceholder.typicode.com/posts/"
            drag
            :on-preview="handlePreview"
            :on-remove="handleRemove"
            :file-list="fileList"
            multiple
            :limit="3"
            :on-exceed="handleExceed"
            style="width: 10xp"
          >
            <i class="el-icon-plus" />
            <div class="el-upload__tip">点击或拖拽文件到此处上传</div>
          </el-upload>
        </el-form-item>
      </el-form>
      <div class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="submitForm">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<style lang="scss" scoped></style>
