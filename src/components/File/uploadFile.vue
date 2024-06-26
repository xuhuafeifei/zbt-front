<script setup lang="ts">
import { ref, defineProps, watch, defineExpose } from "vue";
import { ElMessage, ElMessageBox } from "element-plus";
import { ActivityFileEntity } from "@/api/activity/activity";
import { deleteFile } from "@/api/activity/file";
import { getFilenameFromURL } from "@/api/utils";

const props = defineProps({
  fileList: {
    type: Array,
    dafeult: () => []
  },
  limit: {
    type: Number,
    default: 20
  }
});

// 将父组件传递的pictList作为本地数据
const multipartFileList = ref(props.fileList);

// 直接观察 props 中的 pictList
watch(
  multipartFileList,
  newValue => {
    emits("update:fileList", newValue);
  },
  {
    deep: true
  }
);

const emits = defineEmits(["update:fileList"]);

const uploadFile = file => {
  multipartFileList.value.push(file);
};

const httpRequest = () => {
  console.log(multipartFileList);
};

const handleExceed: UploadProps["onExceed"] = (files, uploadFiles) => {
  ElMessage.warning(
    `文件限制是 ${props.limit}, 选择了的文件数量是${files.length}`
  );
};

const beforeRemove: UploadProps["beforeRemove"] = (uploadFile, uploadFiles) => {
  return ElMessageBox.confirm(`删除 ${uploadFile.name} 吗 ?`).then(
    () => {
      const entity = new ActivityFileEntity();
      // 如果id不存在, 则表明该条数据不是来源于编辑页, 数据不存在于db中, 是用户通过网页添加的
      if (uploadFile.id === undefined || uploadFile.id === "") {
        return true;
      }
      entity.id = uploadFile.id;
      entity.url = uploadFile.url;

      deleteFile(entity).then(res => {
        console.log(res);
      });
      return true;
    },
    () => false
  );
};

// 暴露给父组件
function setData(value: Array<ActivityFileEntity>) {
  value.forEach(item => {
    item.name = getFilenameFromURL(item.url);
  });
  multipartFileList.value = value;
}

defineExpose({ setData });
</script>

<template>
  <el-upload
    v-model:file-list="multipartFileList"
    multiple
    class="upload-area"
    drag
    :on-change="uploadFile"
    :http-request="httpRequest"
    :before-remove="beforeRemove"
    :limit="limit"
    :on-exceed="handleExceed"
  >
    <i class="el-icon-plus" />
    <div class="el-upload__tip">点击或拖拽文件到此处上传</div>
  </el-upload>
</template>

<style lang="scss" scoped></style>
