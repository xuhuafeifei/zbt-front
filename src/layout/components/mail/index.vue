<script setup lang="ts">
import Mail from "@iconify-icons/material-symbols/mail-outline";
</script>

<template>
  <div
    class="search-container w-[40px] h-[48px] flex-c cursor-pointer navbar-bg-hover"
  >
    <Icon icon="" />
    <IconifyIconOffline :icon="Mail" />
  </div>
  <!-- <SearchModal v-model:value="show" /> -->
</template>
