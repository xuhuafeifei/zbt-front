<script setup lang="ts">
import { ref, defineProps, watch, defineEmits } from "vue";
import { Plus } from "@element-plus/icons-vue";
import type { UploadProps } from "element-plus";
import { ElMessage, ElMessageBox } from "element-plus";
import { deleteFile } from "@/api/activity/file";
import { ActivityFileEntity } from "@/api/activity/activity";

const props = defineProps({
  pictList: {
    type: Array,
    default: () => []
  },
  limit: {
    type: Number,
    default: 20
  }
});

// 将父组件传递的pictList作为本地数据
const multipartFileList = ref(props.pictList);

// 直接观察 props 中的 pictList
watch(
  multipartFileList,
  newValue => {
    emits("update:pictList", newValue);
  },
  {
    deep: true
  }
);

const emits = defineEmits(["update:pictList"]);

const dialogImageUrl = ref("");
const dialogVisible = ref(false);

const handleRemove: UploadProps["onRemove"] = (uploadFile, uploadFiles) => {
  console.log(uploadFile, uploadFiles);
};

const handlePictureCardPreview: UploadProps["onPreview"] = uploadFile => {
  dialogImageUrl.value = uploadFile.url!;
  dialogVisible.value = true;
};

const uploadFile = file => {
  multipartFileList.value.push(file);
};

const httpRequest = () => {
  console.log(multipartFileList);
};

const handleExceed: UploadProps["onExceed"] = (files, uploadFiles) => {
  ElMessage.warning(`文件限制是 4, 选择了的文件数量是${files.length}`);
};

const beforeRemove: UploadProps["beforeRemove"] = (uploadFile, uploadFiles) => {
  console.log(uploadFile);
  console.log(uploadFiles);
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
function setData(value) {
  console.log(value);
  multipartFileList.value = value;
}

defineExpose({ setData });
</script>

<template>
  <el-upload
    v-model:file-list="multipartFileList"
    list-type="picture-card"
    :on-preview="handlePictureCardPreview"
    :on-remove="handleRemove"
    :on-change="uploadFile"
    multiple
    :http-request="httpRequest"
    :before-remove="beforeRemove"
    :limit="4"
    :on-exceed="handleExceed"
  >
    <el-icon><Plus /></el-icon>
  </el-upload>

  <el-dialog v-model="dialogVisible">
    <img w-full :src="dialogImageUrl" alt="Preview Image" />
  </el-dialog>
</template>

<style lang="scss" scoped></style>
