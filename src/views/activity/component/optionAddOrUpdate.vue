<script setup lang="ts">
import {
  OptionEntity,
  saveActivityOption,
  updateActivityOption
} from "@/api/activity/setting";
import { ref, reactive, defineExpose, onMounted, onUnmounted } from "vue";
import { convertDateToString } from "@/api/utils";
import { ElMessage } from "element-plus";

const dialogVisible = ref(false);

const option = reactive(new OptionEntity());

const title = ref("");

onMounted(() => {
  //绑定监听事件
  window.addEventListener("keydown", keyDown);
});

onUnmounted(() => {
  //销毁事件
  window.removeEventListener("keydown", keyDown, false);
});

// 处理父组件传递的数据
function init(data: OptionEntity) {
  dialogVisible.value = true;
  // 获取类别选项数据
  option.setValueFromEntity(data);
  if (data.id === null || data.id === undefined) {
    title.value = "新增表单";
  } else {
    title.value = "修改表单";
  }
}

defineExpose({ init });

const submit = () => {
  if (title.value === "新增表单") {
    // debug
    console.log(option);
    option.uploadTime = convertDateToString(new Date());
    saveActivityOption(option).then(res => {
      console.log(res);
      if (res.code !== 0) {
        ElMessage.error("添加失败: " + res.msg);
      } else {
        ElMessage.success("添加成功");
      }
    });
  } else {
    updateActivityOption(option).then(res => {
      console.log(res);
      if (res.code !== 0) {
        ElMessage.error("修改失败: " + res.msg);
      } else {
        ElMessage.success("修改成功");
      }
    });
  }
};

//点击回车键登录
const keyDown = e => {
  if (e.keyCode == 13 || e.keyCode == 100) {
    submit();
  }
};
</script>

<template>
  <div>
    <el-dialog :title="title" v-model="dialogVisible" width="300px">
      <el-form :model="option">
        <el-form-item label="选项名">
          <el-input v-model="option.optionName" />
        </el-form-item>
        <el-form-item label="状态">
          <el-select v-model="option.status">
            <el-option label="启用" value="启用" />
            <el-option label="禁用" value="禁用" />
          </el-select>
        </el-form-item>
        <el-button @keydown.enter="keyDown()" @click="submit">提交</el-button>
      </el-form>
    </el-dialog>
  </div>
</template>

<style lang="scss" scoped></style>
