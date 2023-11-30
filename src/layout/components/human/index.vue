<script setup lang="ts">
import Human from "@iconify-icons/ep/avatar";
</script>

<template>
  <div
    class="search-container w-[40px] h-[48px] flex-c cursor-pointer navbar-bg-hover"
  >
    <Icon icon="" />
    <IconifyIconOffline :icon="Human" />
  </div>
  <!-- <SearchModal v-model:value="show" /> -->
</template>
