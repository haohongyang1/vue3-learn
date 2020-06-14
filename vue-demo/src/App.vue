<!--
实现一个购物车
-->

<template>
  <div id="app">
    <h2>欢迎来到图书商城</h2>
    <hr />
    <div class="shopping-market-container">
      <div class="good-list-container">
        请在此区域内选择商品
        <div class="good-list" v-for="item in state.aGoodList" :key="item.id">
          <span>序号: {{ item.id }}</span>
          <span>书名: {{ item.name }}</span>
          <span>价钱: {{ item.price }}</span>
          <button @click="addShoppingCard(item.id)">加入购物车</button>
        </div>
      </div>
      <div class="line"></div>
      <div class="card-list-container">
        购物车列表
        <table width="300px">
          <tr>
            <th>名称</th>
            <th>价钱</th>
            <th>数量</th>
          </tr>
          <tr v-for="item in state.aCardList" :key="item.id">
            <td>{{ item.name }}</td>
            <td>{{ item.price }}</td>
            <td>
              <strong class="add-count" @click="reduceCount">-</strong>
              {{ item.count }}
              <strong class="add-count" @click="addCount">+</strong>
            </td>
          </tr>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
import { reactive } from "vue";
import goodList from ".././mock/good-list.json";
import cardList from ".././mock/card-list.json";
export default {
  setup() {
    const state = reactive({
      aGoodList: goodList,
      aCardList: cardList,
    });
    function addShoppingCard(id) {
      let goodItem = state.aGoodList.filter((item) => item.id === id);
      state.aCardList.push(goodItem);
      console.log(state.aCardList);
    }
    return { state, addShoppingCard };
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
.shopping-market-container {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}
.line {
  border-right: 2px solid #999999;
  min-height: 100vh;
}
.good-list {
  margin-top: 30px;
}
.good-list button {
  margin-left: auto;
}
/* 加号 */
.add-count {
  display: inline-block;
  border: 1px solid #999999;
  width: 20px;
  height: 20px;
  border-radius: 50%;
}
</style>
