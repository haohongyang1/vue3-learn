<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->


- [Vue3 study](#vue3-study)
  - [前言：](#%E5%89%8D%E8%A8%80)
      - [用.html 体验语法 或者 要运行/root/source/exercise/**\***.html：](#%E7%94%A8html-%E4%BD%93%E9%AA%8C%E8%AF%AD%E6%B3%95-%E6%88%96%E8%80%85-%E8%A6%81%E8%BF%90%E8%A1%8Crootsourceexercise%5Chtml)
      - [建立 Vue3 体验的项目：](#%E5%BB%BA%E7%AB%8B-vue3-%E4%BD%93%E9%AA%8C%E7%9A%84%E9%A1%B9%E7%9B%AE)
      - [创建 vite 体验的项目：](#%E5%88%9B%E5%BB%BA-vite-%E4%BD%93%E9%AA%8C%E7%9A%84%E9%A1%B9%E7%9B%AE)
  - [一 用法：如何用 Vue3 ?](#%E4%B8%80-%E7%94%A8%E6%B3%95%E5%A6%82%E4%BD%95%E7%94%A8-vue3-)
      - [1. Composition API](#1-composition-api)
      - [2. 按需引入](#2-%E6%8C%89%E9%9C%80%E5%BC%95%E5%85%A5)
      - [3. ts 支持](#3-ts-%E6%94%AF%E6%8C%81)
      - [4. vite](#4-vite)
      - [最后附录实践源码](#%E6%9C%80%E5%90%8E%E9%99%84%E5%BD%95%E5%AE%9E%E8%B7%B5%E6%BA%90%E7%A0%81)
  - [二 优化点](#%E4%BA%8C-%E4%BC%98%E5%8C%96%E7%82%B9)
      - [1. 数据响应式：](#1-%E6%95%B0%E6%8D%AE%E5%93%8D%E5%BA%94%E5%BC%8F)
      - [2. 静态节点标记：](#2-%E9%9D%99%E6%80%81%E8%8A%82%E7%82%B9%E6%A0%87%E8%AE%B0)
      - [3. 重写 VDom---区块树](#3-%E9%87%8D%E5%86%99-vdom---%E5%8C%BA%E5%9D%97%E6%A0%91)
      - [4. 初始化组件更高效---按需引入](#4-%E5%88%9D%E5%A7%8B%E5%8C%96%E7%BB%84%E4%BB%B6%E6%9B%B4%E9%AB%98%E6%95%88---%E6%8C%89%E9%9C%80%E5%BC%95%E5%85%A5)
      - [实践总结](#%E5%AE%9E%E8%B7%B5%E6%80%BB%E7%BB%93)
  - [三 原理](#%E4%B8%89-%E5%8E%9F%E7%90%86)
      - [1. 用 proxy 实现数据响应式](#1-%E7%94%A8-proxy-%E5%AE%9E%E7%8E%B0%E6%95%B0%E6%8D%AE%E5%93%8D%E5%BA%94%E5%BC%8F)
      - [2. Vite 原理](#2-vite-%E5%8E%9F%E7%90%86)
  - [四 缺点---当前 beta 版本的缺点](#%E5%9B%9B-%E7%BC%BA%E7%82%B9---%E5%BD%93%E5%89%8D-beta-%E7%89%88%E6%9C%AC%E7%9A%84%E7%BC%BA%E7%82%B9)
  - [附录](#%E9%99%84%E5%BD%95)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

# Vue3 study

## 前言：

非常高兴读者可以打开我的文章，嘿嘿嘿，我为什么想要写这篇文章，首先是我自己最近在学习 Vue3，有了很多的收获，相对于 Vue2 来讲，它的性能是全面覆盖了 Vue2，更进一步完美的实现了 MVVM 的思想，是完全值得去借鉴学习、丰富自己知识的一本教科书，另外是对于企业级项目来讲，Vue3 在性能方面一个质的飞跃，它一定能在今年流行起来，我们需要提前的去了解学习它，才能在它被流行起来的时候，去更好的应用它。
---------------------项目目录介绍前言分割线-------------------------------------------------
首先介绍一下目录结构，根目录下分成 4 个文件夹，

1. source：是本次研究 Vue 源码的重头戏；

- exercise：练习文件记录；
- static：静态资源存放（读者可忽略）；
- vite ：vite 源码位置；
- vue-next：Vue3 源码位置；

2. vite-demo：vite 源码以及自己实现的简易版 vite 的存放位置；
3. vue-demo：是使用 vue-next 的版本，进行开发项目的实践，包含了 dom 初始化比对功能和购物车功能的实现（待更新，希望自己以后可以练习更多的项目）；
4. vue2-demo：主要是为了做和 Vue3 的 VDom 初始化比对而搭建，自然包含的功能就是实现了 dom 初始化比对；

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

#### 创建 vite 体验的项目：

- npm install vite-app vite-demo
- cd vite-demo
- npm install
- npm run dev

---------------------项目目录介绍前言分割线结束-------------------------------------------------

那么开始我们今天的正题：

在技术社区当中也有很多人看过 Vue3 的源码，我经常会刷到很多文章来讲 Vue3 的某个点或者是对他的一些见解，我觉得大家如果去很碎片的去学习 Vue3，没有一个整体的思路，可能理解起来会有一些片面，所以我按照自己的理解系统化的把 Vue3 给大家分享一下，主要是分成以下几点：
使用方式、突出优化点、部分功能实现原理、以及当前 beta 版本的不足
都是带着问号来一一解答。

## 一 用法：如何用 Vue3 ?

前言：对于怎么使用这里呢，我最初是想拿着 Vue2 和 Vue3 的 api 去对比，做一个一一映射，这样可能会更好理解，但是由于 Vue3 和 Vue2 差距还挺大，不能完全的进行一对一的对比，怕会误导大家，所以我们更注重讲一下更改点。

#### 1. Composition API

不知道大家在使用 vue2 的时候会有哪些感觉很不得劲的地方，或者很想吐槽的地方，我有一点呢就是，在做一个组件，超过 500 行的时候，就会觉得里面的方法和变量啥的，跳来跳去的很不方便，往往找个东西要自己去打点，比如这样：（进入 duck-trubo 项目里面看一下支付页面的组件长度，已经定义）

然而在 Vue3 中呢，是不用去担心这种情况了，在 Vue3 中使用了 Compostion API，这一点在社区中也是被很多人吐槽越来越像 React Hooks 的那个，但是其实我并不反感这一点，因为好的东西就是要被借鉴，况且他们只是使用起来比较像，原理是完全不同的，

我们看一下在比较大的组件里面，使用 Vue2 和 Vue3 写出来的代码结构对比图，Options API 是按照 data/methods/components 以及各种生命周期函数组成，而右边的 Compostion API 是以功能逻辑为单位，生成一块一块的代码体，避免了在代码中反复横跳，很明显是右边的代码可读性更好一点，也就是 React 为什么比较适合大型项目的一个原因，但是我觉得 Vue3 正式上线后，完全可以和 React 去抗衡。
当然，在 Vue3 中更改了代码结构，对于曾经使用过 React 的人来说会非常容易上手。

我这边看到过一篇文章写的挺好的，我们可以一起来看一下。

https://www.josephxia.com/vue3/%E5%AE%9E%E6%88%98.html#%E5%85%A8%E5%AE%B6%E6%A1%B6%E5%AE%9E%E6%88%98

（由于我自己没有使用 React 开发过项目，不会从 React 方面进行对比的，所以给自己立个 TODO，等我把 React 学完了回来更新这里）

- [ ] TODO（了解一下 Vue3 和 ReactHooks 原理及实现上的区别点）----待更新

#### 2. 按需引入

这里不多说，直接看上一部分的代码，使用起来很简单，像是 import 一个组件一样，代码位置如下：

> vue-demo\src\components\CardList.vue

#### 3. ts 支持

因为我们的项目里面没有用到 ts，所以这里我简单带过，其实 ts 也是值得大家去学习的，我学了 ts 后我感觉特别像是 Java，有一种前后端归一的感觉，但是我目前并不是很喜欢 ts，因为我觉得他失去了 js 的优势，我们简单的看一下源码吧，看一下源码对 ts 的支持，源码位置如下：

> source\vue-next\packages

#### 4. vite

首先什么是 vite，是尤大神自己创的一个词，意思是 新一代的开发工具，其实就是 webpack，在使用 webpack 开发环境打包的时候，尤其是项目越大的时候，我们每次修改一部分代码，哪怕是一个文案，都会重新打包构建到 dist 文件夹下，尽管在 webpack 中，为了提高这个效率，也对这个做了很多优化，比如把 dist 放在内存中提升速度等等，但是尤大神依然觉得这种方式不够满足我，我还是觉得你慢，所以，我不用你给我在开发环境打包了，所以 vite 出现了。等会讲原理的时候会再给大家说一下 vite 的实现，并且会尤一个简单的 viet 实现的 demo 分享给大家。

Vu3 中，开发模式下，使用 vite 替代 webpack 提升编译打包效率，在服务器端按需拿当前文件的更新，会非常快。

#### 最后附录实践源码

希望自己以后多多更新，写出新的功能

> vue-demo\src\components\CardList.vue

## 二 优化点

前言：最开始的时候说 Vue3 肯定会流行起来的原因之一，是因为他的优化点真的很突出，那么究竟有哪些优化点，我们一个一个的来看一下；

#### 1. 数据响应式：

说到 Vue3，其中一个最简单，也是最众所周知的优化，就是使用 Proxy 替代 Object.defineProperty；

| -                   | -                                   | - Proxy 和 definePropery 优缺点对比 - | -                            | -                                            |
| ------------------- | ----------------------------------- | ------------------------------------- | ---------------------------- | -------------------------------------------- |
| defineProperty 优点 | 兼容性较好,支持 ie9                 |                                       |
| Proxy 缺点          | ie 兼容性较不好                     |                                       |
| defineProperty 缺点 | 无法做 Object 中新增属性的 get 拦截 | 无法监控到数组变化                    | 对每个对象的每个属性进行遍历 |
| Proxy 优点          | 多种拦截方法（共 13 种）            | 可以直接监听数组元素                  | 可以直接监听对象而非属性     | 作为新标准将受到浏览器厂商重点持续的性能优化 |

defineProperty 缺点：

- 无法监控到数组变化 ：我们都知道在 Vue2 中，是通过 7 个操作数组方法(push,pop,slice,shift,unshift,sort,reverse)来监听响应式对象数组的 set，除 6 个方法外的其他改变数组元素的情况，需要通过调用\$set 来实现；
- 无法做 Object 中新增属性的 get 拦截：如果我们在初始化时定义的对象属性之外再定义新增属性时，无法监听到其变化，需要手动调用\$set 来添加响应式；
- 对每个对象的每个属性进行遍历：defineProperty 在拦截过程中，需要对每个对象属性进行遍历，而 Proxy 是以对象为单位，整体拦截；

defineProperty 优点：

反之，上述缺点都是 Proxy 的优点，然后除了这些优点外，Proxy 是 es6 属性，是浏览器原生支持的，要比 defineProperty 好很多；

- 可以直接监听对象而非属性；
- 可以直接监听数组元素；
- 13 种拦截方法；
- Proxy 作为新标准将受到浏览器厂商重点持续的性能优化；

#### 2. 静态节点标记：

Vdom 是各大主流框架中老生常谈的问题，其中 React、Anguler、Vue 等，在 Vdom 的处理上都会有不同的思路，今天我们先聊一下 Vue3 对于 Vu2 的 Dom 操作都做了哪些优化，其中最重要的一点是对于静态节点的标记，据说在 Vdom 上的优化比 Vue2 快了 1~2 倍，如果静态节点越多，优化的速度会更明显。
（在这里插入一句，为什么我们的小程序要用 uni-app 框架，先抛开社区中对 uni-app 的吐槽，其实我最喜欢的一点是，在原生小程序中，如果你操作更新 dom，他会直接更新整个页面，不会做 dom-diff，uni-app 会做 dom-diff，大大提高了操作 dom 对于页面显示及用户体验的影响)

所谓的编译模板就是我们平时写的 template 中的内容，虽然看起来写的像是 html，但是实际上我们都是在写 js 代码，那么我们写的 template 中的内容，是如何转换成最终在页面上渲染的 DOM 呢，首先要进行编译模板解析，解析成 AST，那么静态节点标记，就是在这个编译过程中进行优化的，我们看一下这里，最终我们写的代码会被编译成什么（大概 1 分钟时间）
其实这个是我在网页中测试的截图，当然这个也可以随意更改，我们操作一下看看会发生什么，什么变化，我标记什么，

[Vue3 节点标记转换](https://vue-next-template-explorer.netlify.app/#%7B%22src%22%3A%22%3Cdiv%20id%3D%5C%22app%5C%22%3E%5Cr%5Cn%20%20%3Ch1%3E%E6%A0%87%E9%A2%98%3C%2Fh1%3E%5Cr%5Cn%20%20%7B%7B%20msg%20%7D%7D%5Cr%5Cn%20%20%3Cp%20%3Aid%3D%5C%22p-test%5C%22%3E%7B%7Btext%7D%7D%3C%2Fp%3E%5Cr%5Cn%20%20%3C%2Fdiv%3E%22%2C%22options%22%3A%7B%22mode%22%3A%22module%22%2C%22prefixIdentifiers%22%3Afalse%2C%22optimizeBindings%22%3Afalse%2C%22hoistStatic%22%3Afalse%2C%22cacheHandlers%22%3Afalse%2C%22scopeId%22%3Anull%7D%7D)

#### 3. 重写 VDom---区块树

区块树的引入，解决了传统 VDom 的实现瓶颈，在传统 VDom 比对中，会依次去遍历树中节点，如图所示：

![传统 VDom 的实现瓶颈](.\source\static\image\trandition_vdom.png)

虽然在 Vue2 中能够保证触发更新的组件最小化，但在单个组件内部依然需要遍历该组件的整个 dom 树，在 Vue2 中会去标记新老 dom 树的首元素尾元素，然后分别比对其是否相同，来尽可能的在层层遍历 dom 树前，猜测到当前 dom 可能的所有操作，比如倒置，但是都无法保证最坏情况下，对树的层层遍历；
Vue3 中最让人惊讶的是，在 Vdom-diff 中又进行了优化，达到了极致，就像是当年排序算法中大家都无法突破的时间复杂度 O(n^2) ，但是快排算法却达到了 O(nlogn)，场景如此类似；
我们来看看什么是区块树？

![区块树](.\source\static\image\block_tree.png)

在图中可以看出，其实思想是有一点类似与 es6 的块级作用域

为什么说 Vue3 把性能又优化到了极致呢，其实是在 Vdom 中的优化是可以体现出来的，它呢，不仅仅在编译过程优化，在执行过程中也会去优化。
如果觉得以上说的都太抽象了，那么就上一张容易理解的图：
![dom-diff](.\source\static\image\dom_diff.png)
从图中可以清晰的看出在区块树中，会完全的忽略掉你的静态节点，如果你亲自去对比一下，不难发现，当你的模板中静态 dom 越多，性能优化会越明显。
据说 Vue3 的节点标记采用了位运算，位运算是采用二进制的，但是我在项目中却没有去实际使用过，所以在这里再给自己立个 TODO，如果学完了再来更新这篇文章，

- [ ] 位运算的实践

#### 4. 初始化组件更高效---按需引入

在 Vue2 的使用中呢，大家都知道是用 webpack 进行打包的，在 webpack 中打包后会输出一个 bundle.js 出口文件，这个文件当中默认会把第三方的库还有我们的业务代码打包到一个出口文件中，这样会导致打包的时间很长，并且出口文件资源体积很大，如果是在单页应用中，首页需要加载的资源会很多，所以会有很多优化的方式，比如用 tree-shaking 插件、DllPlugin 打包第三方库、或者是进行代码分割等等，但是无疑都是在此基础上打补丁的在解决问题，所以在 Vue3 中支持了按需引入。

按需引入这里呢，我们先来看两张图片对比：

![hello world compare](.\source\static\image\hello_world_compare.png)

同样是 Vue2 和 Vue3 实现的 Hello world ，右边是采用按需引入的方式，如果在 Vue2 中单纯的写一个 Hello world，都要打出几兆的包，但是在 Vue3 中就只有几十 K 的大小，大大减少了出口文件的体积。
在打包上的优势是很明显的，如果大家感兴趣的话，可以自己跑一个项目尝试一下。

#### 实践总结

但是其实说到这里呢，大家应该会觉得比较枯燥，
所以我这边呢，也做了一下 VDom 在 Vue2 和 Vue3 中的对比，我们来真实的看一下，这个性能的优化到底有多么可怕。
我们先来看一下这两个项目，package.json 中 vue 的版本，这个是 3.0.0-beta，这个是 2.6.11

我这边也写了一个 dom 对比 Vue3 和 Vue2，思路是对 1000 个动态节点和 1000 个静态节点进行初始化操作，然后读取 window.performance.time 所得到的时间差，Vue2 和 Vue3 的代码位置分别在：

> vue-demo\src\components\LargeNumberNodeTest.vue，
> vue2：vue2-demo\src\App.vue；

**运行指南：**
如果本地运行，可以分别进入到 vue-demo 和 vue2-demo 项目根目录下执行 npm run serve 即可；
如果懒得运行，可以直接看下面截图的结果对比。
**比对结果截图如下：**
![Vue3](.\source\static\image\vue3_dom_init_time.png)
![Vue2](.\source\static\image\vue2_dom_init_time.png)
虽然每次刷新不是一个准确的时间差，但是我们可以看到，相对比 Vue2 的初始化来说，Vue3 在性能方面非常的占据优势，并且在静态节点越多的情况下，会更占据优势。如果大家感兴趣的化，可以自己更改节点的比例，或者写一个 dom-diff 的比对，都会发现 Vue3 在性能方面远远超过了 Vue2；

## 三 原理

#### 1. 用 proxy 实现数据响应式

我这边用 Proxy 实现了一个简易版的数据响应式，先来看一下效果，实现这么一个简单的功能，可以直接在浏览器中运行这部分代码：

> source\exercise\composition-test.html

再看一下原理实现的代码，其实很简单，在 composition-test.html，用 reactive 方法注册响应式对象后，当响应式对象中的值发生变化时，触发 effect 函数，来更新 dom，然后我们看一下代码实现，

> source\exercise\vue3.js

demo 原理实现思路图如下：是我手写的，大家不要嫌弃；

![proxy实现数据响应式原理图](.\source\static\image\proxy-reactivity-img.jpg)

我是非常强烈的建议大家自己手敲一下 proxy 实现数据响应式这部分的 demo，一定会有很多收获；

#### 2. Vite 原理

vite 原理这里，我也是写了一个 demo，大家可以一起来看一下，其实原理就非常简单，是在你本地跑一个服务，监听你请求本地服务拿的文件，也就是在代码中通过 import \* from XX，通过文件的内容去本地代码中找文件的位置，放在接口返回值中返回；
代码实现的位置在：

> vite-demo\server.js

其实你看了之后就会发现是一个特别 low 的代码，用一堆 if-else 来匹配当前引入文件的文件名。
所以在项目中提供了 vite 源码，感兴趣的可以直接读源码：

> source\vite

## 四 缺点---当前 beta 版本的缺点

企业级的开发中，可能不会因为技术升级，而放弃系统的稳定性来升级框架，虽然说是平滑过渡，完全兼容，但既然是两个版本，一定会有他们的差异，

- 不兼容 ie：首先是 ie 兼容问题，看一下 Proxy 以及其属性在浏览器上的兼容性，这对于一些需要兼容 ie 的项目来说，可能不会敢于尝试升级，但是尤大神说他会在正式版上线前专门写一个工具来解决这个问题；
  ![B站讲解视频](.\source\static\image\compatibility_of_proxy.png)
- 并不是真正的完全兼容 Vue2：在目前 beta 版的 Vue3 来看，对于 Vue2 项目直接升级到 Vue3 会有一些风险存在，据说在社区中正在有人在写工具解决这个问题，一切还是要等到正式版发布才会揭晓；

但是 Vue3 还是值得我们学习的，在 MVVM 框架思想上更进一步的实现和性能的优化升级等等，而且也说不定，在正式版本发布之前，社区中就会有从 Vue2 平滑升级到 Vue3 的工具，那么我们就可以直接升级 Vue 框架，既不担心系统稳定性，又可以享受到性能的优化，所以还是主推大家去学习的。

## 附录

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
- [ ] 位运算的实践
