<!--
实现大批量节点渲染，看一下时间
-->
<template>
  <div id="app">
    <h1>Vue3 VDom {{ total }}节点测试</h1>
    <h1>时间为：{{ timeDiff }}</h1>
    <div>
      <ul>
        <li v-for="i in staticTotal" :key="i">hhy</li>

        <li v-for="item in list" :key="item.id">
          id：{{ item.id }} random：{{ item.item }}
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
const TOTAL = 1000;
let LIST = [];
for (let i = 0; i < TOTAL; i++) {
  LIST.push({
    id: i,
    item: String(Math.random()).slice(0.5),
  });
}
let s = window.performance.now();
export default {
  name: "App",
  data() {
    return {
      staticTotal: 1000,
      total: TOTAL,
      timeDiff: 0,
      list: LIST,
    };
  },
  mounted() {
    this.timeDiff = window.performance.now() - s;
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
