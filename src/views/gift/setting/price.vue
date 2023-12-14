<script setup lang="ts">
import { computed, ref, watch, onMounted, reactive } from "vue";
// import type { ClassType } from "@/api/class";
import type { Ref } from "vue";
import { classCreateRequest } from "@/api/class";
import { handleEdit, handleCreate } from "@/hooks/useEditDialog";
import { getBase64 } from "@/utils/switchBase64";
import { ElMessage } from "element-plus";
import { uploadFileList } from "@/api/file";

const multipartFileList = ref([]);
const dialogImageUrl = ref("");
const dialogVisible = ref(false);
const handleRemove: UploadProps["onRemove"] = (uploadFile, uploadFiles) => {
  console.log(uploadFile, uploadFiles);
  multipartFileList.value.pop();
};
const fileList = ref<UploadUserFile[]>([]);

const uploadFile = file => {
  multipartFileList.value.push(file);
};
const httpRequest = data => {
  // debug
  console.log(fileList);
  // eslint-disable-next-line vue/no-mutating-props
  // props.data.classes.sportrait = data;
  // classes.value.sportrait = data;

  // 调用转方法base64
  // getBase64(data.file).then((resBase64: string) => {
  // eslint-disable-next-line vue/no-mutating-props
  // props.data.classes.sportrait = resBase64;
  // fileBase64.value = resBase64.split(",")[1];
  // classes.value.sportrait = fileBase64.value;
  // });
};
const handlePictureCardPreview: UploadProps["onPreview"] = uploadFile => {
  dialogImageUrl.value = uploadFile.url!;
  dialogVisible.value = true;
};

const submit = async () => {
  const data = new FormData();
  data.append("fileList", multipartFileList.value[0].raw);
  console.log(data);
  debugger;
  const res = await uploadFileList(data);
  console.log(res);
};
</script>

<template>
  <el-upload
    v-model:file-list="fileList"
    accept=".jpg, .jpeg, .png"
    list-type="picture-card"
    :on-preview="handlePictureCardPreview"
    :on-remove="handleRemove"
    :on-change="uploadFile"
    :http-request="httpRequest"
    :limit="1"
  >
    <IconifyIconOnline icon="material-symbols:add" width="60px" height="60px" />
    <template #tip>
      <div class="el-upload__tip">
        只能上传图片,且单张图片大小不能超过10MB,暂时无法上传
      </div>
    </template>
  </el-upload>
  <el-button @click="submit">提交</el-button>
</template>

<style lang="scss" scoped></style>
