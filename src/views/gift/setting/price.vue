<script setup lang="ts">
import UploadPict from "@/components/Pict/uploadPict.vue";
import UploadFile from "@/components/File/uploadFile.vue";
import { ref } from "vue";
import { ActivityFileEntity } from "@/api/activity/activity";

const pictList = ref<Array<ActivityFileEntity>>([]);
</script>

<template>
  <div>test</div>
  <UploadFile v-model:fileList="pictList" :limit="1" />
</template>

<style lang="scss" scoped></style>
