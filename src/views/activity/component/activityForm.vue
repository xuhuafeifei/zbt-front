<script setup lang="ts">
import { ref, reactive } from "vue";
import { onMounted, nextTick } from "vue";
import FullText from "@/components/FullText/fullText.vue";
import {
  ActivityDto,
  getActivityOptionSelectDto,
  ActivityFileEntity,
  saveActivity,
  updateActivity
} from "@/api/activity/activity";
import { ElMessage } from "element-plus";
import UploadPict from "@/components/Pict/uploadPict.vue";
import UploadFile from "@/components/File/uploadFile.vue";
import { uploadFileList } from "@/api/activity/file";
import { fileType, pictType, sleep } from "@/api/utils";

const dialogVisible = ref(false);

const imageList = ref<Array<ActivityFileEntity>>([]);
const fileList = ref<Array<ActivityFileEntity>>([]);

const materialList = ref([]);
const useList = ref([]);
const festivalList = ref([]);
const specialTopicList = ref([]);
const brandList = ref([]);

onMounted(() => {
  getActivityOptionSelectDto().then(res => {
    console.log(res);
    materialList.value = res.data.materialList;
    useList.value = res.data.useList;
    festivalList.value = res.data.festivalList;
    specialTopicList.value = res.data.topicList;
    brandList.value = res.data.brandList;
  });
});

const gradeList = ["白银会员", "黄金会员", "钻石会员"];
const obj = new ActivityDto();
const formData = reactive(obj);

const title = ref("");

const uploadPictRef = ref(null);
const uploadFileRef = ref(null);
const fullTextRef = ref(null);

// 处理父组件传递数据给子组件
function init(newData) {
  dialogVisible.value = true;
  // 清空父组件所有数据
  imageList.value = [];
  fileList.value = [];
  // 清空子组件数据

  if (newData === null || newData === undefined) {
    title.value = "新增表单";
    formData.setValueFromEntity(new ActivityDto());
    nextTick(() => {
      uploadFileRef.value.setData([]);
      uploadPictRef.value.setData([]);
      fullTextRef.value.setData("");
    });
  } else {
    title.value = "编辑表单";
    formData.setValueFromEntity(newData);
    // 为子组件赋值, 需要编辑的数据
    nextTick(() => {
      console.log(formData.picturesUrl);
      // 更新图片数据
      uploadPictRef.value.setData(formData.picturesUrl);
      // 更新文件数据
      uploadFileRef.value.setData(formData.sourcefilesUrl);
      // 更新文本数据
      fullTextRef.value.setData(formData.schemeIntro);
    });
  }
  console.log(formData);
}

// 使用 defineExpose 暴露子组件的方法
defineExpose({ init });

const submitForm = async () => {
  console.log(formData);
  if (formData.id === undefined || formData.id === null) {
    // save
    const res = await saveActivity(formData.toEntity());
    // 为formData赋值id
    formData.id = res.data;
    console.log(res);
    if (res.code === 0) {
      ElMessage.success("表单提交成功");
      dialogVisible.value = false;
    } else {
      ElMessage.error("表单提交失败:" + res.msg);
    }
  } else {
    // update
    const res = await updateActivity(formData.toEntity());
    console.log(res);
    if (res.code === 0) {
      ElMessage.success("表单修改成功");
      dialogVisible.value = false;
    } else {
      ElMessage.error("表单修改失败:" + res.msg);
    }
  }
  // 提交图片
  submitPict();
  // 提交文件
  submitFile();
  // 点击提交按钮后, 确保窗口不会被关闭
  // 表单需要手动关闭, 以保证以同步的方式触发父组件的数据更新
  // 不建议修改此处逻辑, 否则picturesUrl, sourcefilesUrl可能无法显示最新数据
  dialogVisible.value = true;
};

// 定义发射的事件
const emit = defineEmits(["refreshDataList"]);

const submitPict = async () => {
  // 提取未被上传的图片数据
  const imageListNeedUpload = ref([]);
  imageList.value.forEach(item => {
    // 如果id为null 或者 undefined, 表明当前图片没有被存储过, 需要被存储
    if (item.id === undefined || item.id === null) {
      imageListNeedUpload.value.push(item);
    }
  });
  if (imageListNeedUpload.value.length === 0) {
    console.log("无需上传图片");
    return true;
  }
  // 创建formData
  console.log("图片上传服务器");
  console.log(imageListNeedUpload.value);
  const data = new FormData();
  for (let i = 0; i < imageListNeedUpload.value.length; ++i) {
    data.append("fileList", imageListNeedUpload.value[i].raw);
  }
  const res = await uploadFileList(data, formData.id, pictType);
  console.log(res);
  if (res.code === 0) {
    ElMessage.success("上传成功");
    return true;
  } else {
    ElMessage.error("图片上传失败:" + res.msg);
    return false;
  }
};

const submitFile = async () => {
  // 提取未被上传的文件数据
  const fileListNeedUpload = ref([]);
  fileList.value.forEach(item => {
    // id为undefined, 说明文件没有存储过, 需要存储
    if (item.id === undefined || item.id === null) {
      fileListNeedUpload.value.push(item);
    }
  });

  if (fileListNeedUpload.value.length === 0) {
    console.log("无需上传文件");
    return true;
  }
  // 创建formData
  console.log("文件上传服务器");
  console.log(fileListNeedUpload);
  const data = new FormData();
  for (let i = 0; i < fileListNeedUpload.value.length; ++i) {
    data.append("fileList", fileListNeedUpload.value[i].raw);
  }
  const res = await uploadFileList(data, formData.id, fileType);
  console.log(res);
  if (res.code === 0) {
    ElMessage.success("上传成功");
    return true;
  } else {
    ElMessage.error("文件上传失败:" + res.msg);
    return false;
  }
};

// 关闭表单前, 刷新父组件数据
const beforeClose = async (done: () => void) => {
  // 通知父组件刷新数据列表
  emit("refreshDataList");
  sleep(300);
  // 关闭表单
  done();
};
</script>

<template>
  <div>
    <!-- 新增表单 -->
    <el-dialog
      :title="title"
      v-model="dialogVisible"
      style="width: 600px; align-center: true"
      :before-close="beforeClose"
      align-center
      center
    >
      <el-form :model="formData">
        <el-row>
          <el-col :span="10" style="margin-right: 30px">
            <el-form-item label="活动名称">
              <el-input v-model="formData.name" />
            </el-form-item>
          </el-col>
          <!-- <el-col :span="10">
            <el-form-item label="上传时间">
              <el-date-picker
                v-model="formData.uploadTime"
                type="datetime"
                placeholder="上传时间"
              />
            </el-form-item>
          </el-col> -->
        </el-row>
        <!-- 5个下拉框 -->
        <el-form-item>
          <el-select
            v-model="formData.material"
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
            v-model="formData.useCol"
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
            v-model="formData.topic"
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
          <UploadPict v-model:pictList="imageList" ref="uploadPictRef" />
        </el-form-item>
        <el-form-item label="方案介绍">
          <FullText v-model:html="formData.schemeIntro" ref="fullTextRef" />
        </el-form-item>
        <el-form-item label="源文件">
          <UploadFile v-model:fileList="fileList" ref="uploadFileRef" />
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
