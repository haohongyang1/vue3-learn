# Vue3 study

## 前言：

这篇文章是本人学习 Vue3 后的一点小总结，也记录了自己的学习过程。
拉取代码到本地后

#### 用.html 体验语法 或者 要运行/root/source/exercise/**\***.html：

- git submodule add https://github.com/vuejs/vue-next source/vue-next
- git submodule update --init --recursive
- 修改镜像
  yarn config set registry https://registry.npm.taobao.org --global
  yarn config set disturl https://npm.taobao.org/dist --global

- yarn --ignore-scripts
- yarn install
- yarn dev

#### 建立 Vue3 体验的项目：

- npm update -g @vue/cli
- vue create vue3demo
- vue add vue-next

Vue3 的使用相对于 Vue2 来说，其实差距还是挺大的，还好能完全兼容 Vue2，其实我最开始的想法是拿着 Vue2 和 Vue3 的 api 进行一对一的映射对比，这样大家的理解会更好一点，但是不是这样的，主要在 Composition 中所提供的属性和用法，不能完全和 Vue2 相对比，所以不能用一一映射的这种思路来误导大家。所以我会把 Vue2 和 Vue3 拆开来讲。

## 一 用法-------\^.^-------如何用 Vue3 ?

1.  Composition API
    在社区中，对于 Compostion API 有很多讨论，有些人是在吐槽，Vue3 的写法越来越像 React Hooks 了，但是我倒是认为吐槽 Vue3 Composition API 的人都不是非常了解 Vue3 和 React Hooks 原理，其实他们的底层原理是完全不同的；

        - [ ] TODO（了解一下 Vue3 和 ReactHooks 原理及实现上的区别点）----待更新

2.  按需引入
    开发者为了解决 webpack 打包文件体积过大，会有很多实践方法，比如会做一些代码压缩、代码分割、提取一些第三方库等等，但是其实都是在绕弯路，没有解决直接的问题，所以在 Vue3 使用中，支持按需引入，可以减少打包体积的同时，首屏依赖第三方无用资源变少，自然会提升加载速度；

3.  ts 支持
    完全支持 ts（因为我们当前项目未使用 ts，我就不多说这里了，可以给大家简单的看一下源码，ts 其实会很方便我们去看源码）
4.  vite
    我们都知道即使 webpack 在打包这方面做的很好了已经 ， 但是在项目非常大的时候，我们本地每修改一个文件，都会重新打包更新到 dist 文件夹下，即使只是修改一个组件中的文案，也会更新 dist 文件夹

        - [ ] （待确定。是不是整个都更新啊 TODO ）

        Vu3 中，开发模式下，使用 vite 替代 webpack 提升编译打包效率，在服务器端按需拿当前文件的更新，会非常快。

    > 我这边也练习了一下 Vue3，感兴趣的可以移步这里 vue-demo\src\components\CardList.vue，是一个简单的购物车示例；

那么我们回到最初的话题，当前项目正在使用的 Vue2 为什么要升级为 Vue3？

- 首先要说的就是，Vue3 是完全完全完全兼容 Vue2 的，不升白不升，升级后又不影响项目正常进行，并且如果你想使用 Vue3 的新特性，直接就能用，这不香吗？
- 其次，升级为 Vue3 后，底层对 数据响应式 和 VDOM 的优化，开发者不用重构代码，不用做任何更改，即可享受到;
- 最后，升级为 Vue3 后，可以使用 vite 开发工具，提升开发效率。

## 二 优点-------\^.^-------Vue3 性能优化点有哪些？

#### 1. 数据响应式：

说到 Vue3，其中一个最简单，也是最众所周知的优化，就是使用 Proxy 替代 Object.defineProperty；
defineProperty 缺点：

- 不能支持数据元素：我们都知道在 Vue2 中，是通过 7 个操作数组方法(push,pop,slice,shift,unshift,sort,reverse)来监听响应式对象数组的 set，除 6 个方法外的其他改变数组元素的情况，需要通过调用\$set 来实现；

反之，上述缺点都是 Proxy 的优点，然后除了这些优点外，Proxy 是 es6 属性，是浏览器原生支持的，要比 defineProperty 好很多；

#### 2. 静态节点标记：

Vdom 是各大主流框架中老生常谈的问题，其中 React、Anguler、Vue 等，在 Vdom 的处理上都会有不同的思路，今天我们先聊一下 Vue3 对于 Vu2 的 Dom 操作都做了哪些优化，其中最重要的一点是对于静态节点的标记，据说在 Vdom 上的优化比 Vue2 快了 1~2 倍，如果静态节点越多，优化的速度会更明显，其中我也做了一下对比，思路是对 500 个 dom 进行随机重排，然后打印执行时间差，可以很明显的看到，在使用 Vue2 和 Vue3 的差距是非常大的。

> 我这边也写了一个 dom 对比 vue3：vue-demo\src\components\LargeNumberNodeTest.vue，vue2：vue2-demo\src\App.vue

（在这里插入一句，为什么我们的小程序要用 uni-app 框架，先抛开社区中对 uni-app 的吐槽，其实我最喜欢的一点是，在小程序中，如果你操作更新 dom，他会直接更新整个页面，不会做 dom-diff，uni-app 会做 dom-diff，大大提高了操作 dom 对于页面显示及用户体验的影响)

- [ ] （TODO 待证实）

## 三 示例-------\^.^-------具体该怎么用呢？

#### 1.API 使用列表

> source\vue-next\packages\reactivity\src\index.ts

- reactive: 创建响应式对象；

| ---  | 定义响应式对象   | 计算属性             |
| ---- | ---------------- | -------------------- |
| VUE2 | Options API data | Options API computed |
| VUE3 | reactive         | computed             |

## 四 原理-------\^.^-------是怎么实现的？

- proxy 实现数据响应式原理

- [ ] TODO 实现一个简单版本的 Proxy 数据响应式

- vite 原理

- [ ] TODO 实现一个简单版本的 vite

## 五 附录-------\^.^-------从哪学来的？

详细看 Vue3 可以推荐给大家的文章：

- 首推源码，毕竟源码才是一切的开始 [Vue3 源码地址](https://github.com/vuejs/vue-next)

- 另，想了解 Vue3 必然首推的是作者尤大神的专题 [B 站讲解视频地址](https://juejin.im/post/5e9dada151882573c46794b8)

- 看完尤大神的专题介绍，你一定想知道我们该如何来使用 Vue3，然后在心里默默的跟现在的 Vue2 对比一下到底有啥区别，该篇文章写得不错，[搭建 Vue3 项目示例](https://www.josephxia.com/Vue3/)，这篇文章的作者还在 B 站上搭配了一段讲解视频，，搜索【带你入坑 Vue3】，
  ![B站讲解视频](./source/static/image/study-video-screen-from-B.jpg)
- 文章推荐 1 ：[vdom 性能分析](https://juejin.im/post/5e9faa8fe51d4546fe263eda)
- 文章推荐 2 ：[proxy](https://juejin.im/post/5d9c0a0d518825095e3d7376) [数据侦测](https://juejin.im/post/5d99be7c6fb9a04e1e7baa34)
- 文章推荐 3 ：[composition api](https://juejin.im/post/5d836458f265da03d871f6e9)

**还需要学习的 TODO list**

- [ ] tiny 编译原理
- [ ] React Hooks 原理比较

- [x] 已选中
- [ ] 未选中
