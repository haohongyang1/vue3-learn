<!--
实现大批量节点渲染，看一下时间
-->
<template>
  <div id="app">
    <h1>Vue3 Demo</h1>
    <large-number-node-test></large-number-node-test>
    <!-- <card-list></card-list> -->
  </div>
</template>

<script>
// import CardList from "./components/CardList";
import LargeNumberNodeTest from "./components/LargeNumberNodeTest";
export default {
  name: "App",
  components: {
    // CardList,
    LargeNumberNodeTest,
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
