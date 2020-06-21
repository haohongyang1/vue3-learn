// 目的：首页用到什么，就import 什么，天生的懒加载，webpack是全量打包，放在内存，
// 1.能够访问index.html 文件;
// 2.koa拦截请求；
const Koa = require("koa");
const app = new Koa();
const fs = require("fs");
const path = require("path");
const compilerSfc = require("@vue/compiler-sfc"); // 解析 单文件.vue
const compilerDom = require("@vue/compiler-dom"); // 解析 dom
// 在vite中是使用第三方库来分析import语法，
// 这里我们通过正则来判断不是通过./标识来进行引入，而是使用 import { createApp } from "/@module/vue"; 来进行引入的情况
function rewriteImport(content) {
  return content.replace(/from ['|"]([^'"]+)['|"]/g, function (s0, s1) {
    // console.log(s0);
    if (s1[0] !== "." && s1[1] !== "/") {
      return `from '/@modules/${s1}'`;
    } else {
      return s0;
    }
  });
}

// 这里的if - else 都是简单的实现原理，但是实际实现上需要拆分成中间件
app.use(async (ctx) => {
  ctx.body = "hello";
  const { request } = ctx;
  const { url } = request;
  //   在这里我们假设，想要读取到文件的都是通过 ./ 等标识来进行引入
  if (url === "/") {
    ctx.type = "text/html";
    ctx.body = fs.readFileSync("./index.html", "utf-8");
  } else if (url.endsWith(".js")) {
    console.log("这是一个js文件");
    // js 可能要做额外处理，不是简单的静态资源
    const p = path.resolve(__dirname, url.slice(1)); // 把文件读取出来，放在服务器上，然后返回
    ctx.type = "application/javascript";
    const ret = fs.readFileSync(p, "utf-8");
    ctx.body = rewriteImport(ret);
  } else if (url.startsWith("/@modules/")) {
    //   这是一个@module的东西，需要去node_module里面找，
    const prefix = path.resolve(
      __dirname,
      "node_modules",
      url.replace("/@modules/", "")
    );
    console.log(prefix);
    const module = require(prefix + "/package.json").module;
    const p = path.resolve(prefix, module);
    const ret = fs.readFileSync(p, "utf-8");
    ctx.type = "application/javascript";
    ctx.body = rewriteImport(ret);
  } else if (url.indexOf(".vue") >= -1) {
    const p = path.resolve(__dirname, url.split("?")[0].slice(1));
    const { descriptor } = compilerSfc.parse(fs.readFileSync(p, "utf-8"));
    if (!request.query.type) {
      ctx.type = "application/javascript";
      // 借用vue自带的compile框架，解析单文件组件，其实相当于vue-loader做的事情
      // npm install @vue/compiler-sfc
      // npm install @vue/compiler-dom
      ctx.body = `
        const __script = ${descriptor.script.content
          .replace("export default ", "")
          .replace(/\n/g, "")}
          import { render as _render } from "${url}?type=template";
          __script.render = __render
          export default __script
        `;
    } else if (request.query.type === "template") {
      // 模板内容
      const template = descriptor.template;
      //   要在server端把compiler做了
      const render = compilerDom.compile(template.content, { mode: "module" })
        .code;
      ctx.type = "applaction/script";
      ctx.body = render;
    }
  }
});

app.listen(3000, () => {
  console.log("success listen 3000");
});
