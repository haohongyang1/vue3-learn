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
            <th></th>
            <th>名称</th>
            <th>价钱</th>
            <th>数量</th>
          </tr>
          <tr v-for="item in state.aCardList" :key="item.id">
            <td>
              <input
                type="checkbox"
                name="checkGood"
                id="check-good"
                @click="checkGoodItem(item.id)"
              />
            </td>
            <td>{{ item.name }}</td>
            <td>{{ item.price }}</td>
            <td>
              <strong class="add-count" @click="reduceCount(item.id)">
                -
              </strong>
              {{ item.count }}
              <strong class="add-count" @click="addCount(item.id)">
                +
              </strong>
            </td>
          </tr>
        </table>

        <div class="subtotal-money">
          <button @click="submit">结算</button>
          <span>{{ totalMoney }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { reactive, computed, onMounted, onUnmounted } from "vue";
import useGoodCountHandle from "./tools/goodCountHandle";
import goodList from ".././mock/good-list.json";
import cardList from ".././mock/card-list.json";
export default {
  setup() {
    onMounted(() => {
      console.log("onMounted");
    });
    onUnmounted(() => {
      console.log("onUnmounted");
    });
    const state = reactive({
      aGoodList: goodList,
      aCardList: cardList,
    });
    const totalMoney = computed(() => {
      let totalCount = 0;
      state.aCardList.forEach((item) => {
        if (item.isChecked) {
          totalCount += parseInt(item.price) * item.count;
        }
      });
      return totalCount;
    });
    function addShoppingCard(id) {
      let cardItemArr = state.aCardList.filter((item) => item.id === id);
      if (cardItemArr.length === 0) {
        let goodItemArr = state.aGoodList.filter((item) => item.id === id);
        state.aCardList.push({ ...goodItemArr[0], count: 1 });
      } else {
        state.aCardList = useGoodCountHandle("addcard", state.aCardList, id);
      }
    }
    function reduceCount(id) {
      state.aCardList = useGoodCountHandle("reduce", state.aCardList, id);
    }
    function addCount(id) {
      state.aCardList = useGoodCountHandle("add", state.aCardList, id);
    }
    function checkGoodItem(id) {
      let cardItemArr = state.aCardList.filter((item) => item.id === id);
      cardItemArr[0].isChecked = 1;
    }
    function submit() {
      console.log("结算总金额为：", totalMoney.value);
    }
    return {
      state,
      totalMoney,
      addShoppingCard,
      reduceCount,
      addCount,
      checkGoodItem,
      submit,
    };
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
  justify-content: space-around;
  min-height: 100vh;
}
.card-list-container {
  display: flex;
  flex-direction: column;
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
.subtotal-money {
  text-align: right;
  margin-top: auto;
  margin-bottom: 30vh;
}
</style>
