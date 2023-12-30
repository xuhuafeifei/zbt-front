<template>
  <div>
    <ul>
      <li v-for="item in items" :key="item.id">{{ item.text }}</li>
    </ul>
    <button @click="updateItems">修改数据</button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      items: [
        { id: 1, text: "Item 1" },
        { id: 2, text: "Item 2" },
        { id: 3, text: "Item 3" }
      ]
    };
  },
  methods: {
    updateItems() {
      // 修改数据源，会触发重新渲染
      this.items = [
        { id: 1, text: "Item 1" },
        { id: 2, text: "Item 2" },
        { id: 3, text: "Item 3" },
        { id: 4, text: "Item 4" }
      ];
    }
  }
};
</script>
