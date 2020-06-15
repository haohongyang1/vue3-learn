/**
 * 操作购物车列表
 * @param {*} type  addcard(加入购物车) || add (增加数量) || reduce (减少数量)
 * @param {*} aCardListInState 购物车列表
 */
export default function(type = "addcard", aCardListInState, id) {
  let result = aCardListInState;
  result.forEach((item) => {
    if (item.id === id) {
      if (type === "addcard" || type === "add") {
        item.count++;
      } else if (type === "reduce") {
        if (item.count === 0) {
          result = result.filter((item) => {
            console.log(item);
            console.log(item.id !== id);
            return item.id !== id;
          });
          console.log(result);
        } else {
          item.count--;
        }
      }
    }
  });
  return result;
}
