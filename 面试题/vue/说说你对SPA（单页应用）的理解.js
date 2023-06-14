/**一、什么是 SPA
 * SPA（single-page-application），翻译过来就是单页应用。
 * SPA 是一种网络应用程序或网站模型，它通过动态重写当前页面来与用户交互，这种方法避免了页面之间切换打断用户体验，
 * 在单页应用中，所有必要的代码（HTML、JavaScript和CSS）都通过单个页面的加载而检索，或者根据需要（通常是为响应用户操作）
 * 动态装载适当的资源并添加到页面，页面在任何时间点都不会重新加载，也不会将控制转移到其他页面。
 * 举个例子来说就是一个杯子，早上装的是牛奶，中午装的是茶，晚上装的是咖啡，我们发现变的始终是杯子的内容，而杯子始终是那个杯子。
 * 我们熟知的 JS 框架 react、vue。angular、ember 都属于 SPA。
 * */

/**二、SPA 和 MPA 的区别
 * 上面大家已经对单页面有所了解，下面来讲讲多页应用MPA（MultiPage-page-application），翻译过来就是多页面应用。
 * 在 MPA 中，每个页面都是一个主页面，都是独立的。当我们在访问另一个页面的时候，都需要重新加载html、css、js文件，
 * 公共文件则根据需求按需加载。
 * */

/**单页应用与多页应用的区别
 * 单页面与多页面的区别
 *                    单页面应用（SPA）                   多页面应用（MPA）
 *      组成：         一个主页面与多个页面片段                多个主页面
 *      刷新方式：      局部刷新                             整页刷新
 *      url模式：      哈希模式                             历史模式
 *      SEO搜索引擎优化：难实现，可使用SSR方式改善              容易实现
 *      数据传递：       容易                             通过url、cookie、localStorage等传递
 *      页面切换：       速度快，用户体验良好               切换加载资源速度慢，用户体验差
 *      维护成本：       相对容易                        相对复杂
 *
 *  单页应用优缺点：
 *      优点：
 *          1.具有桌面应用的即时性、网站的可移植性和可访问性。
 *          2.用户体验好、快，内容的改变不需要重新加载整个页面。
 *          3.良好的前后盾分离，分工更明确。
 *      缺点：
 *          1.不利于搜索引擎的抓取。
 *          2.首次渲染速度相对较慢。
 * */

/**三、实现一个 SPA
 * 原理：
 *      1.监听地址栏中 hash 变化驱动界面变化。
 *      2.用 pushsate 记录浏览器的历史，驱动界面发送变化。
 * */
// 实现

// hash 模式
// 核心通过监听 url 中的 hash 来进行路由跳转
// 定义Router
class Router01 {
    constructor() {
        this.routes = {}; // 存放路由 path 以及 callback
        this.currentUrl = '';
        // 监听路由 change 调用相对应的路由回调
        window.addEventListener('load', this.refresh, false);
        window.addEventListener('hashchange',this.refresh,false);
    }
    route(path, callback){
        this.routes[path] = callback;
    }
    push(path){
        this.routes[path] && this.routes[path]()
    }
}
// 使用 router
window.miniRouter = new Router01();
miniRouter.route('/', () => console.log('page1'));
miniRouter.route('/page2', () => console.log('page2'));
miniRouter.push('/'); // page1
miniRouter.push('/page2'); // page2

// history模式
// history 模式核心借用 HTML5 history api，api 提供了丰富的 router 相关属性先了解一个几个相关的api
// history.pushState 浏览器历史纪录添加记录
// history.replaceState修改浏览器历史纪录中当前纪录
// history.popState 当 history 发生变化时触发
// 定义 Router  
class Router {
    constructor () {
        this.routes = {};
        this.listerPopState();
    }

    init(path) {
        history.replaceState({path: path}, null, path);
        this.routes[path] && this.routes[path]();
    }

    route(path, callback){
        this.routes[path] = callback;
    }

    push(path) {
        history.pushState({path: path}, null, path);
        this.routes[path] && this.routes[path]();
    }

    listerPopState() {
        window.addEventListener('popstate' , e => {
            const path = e.state && e.state.path;
            this.routers[path] && this.routers[path]();
        })
    }
}
// 使用 Router
window.miniRouter = new Router();
miniRouter.route('/', ()=> console.log('page1'));
miniRouter.route('/page2', ()=> console.log('page2'));
miniRouter.push('/page2')  // page2

/**四、题外话：如何给SPA做SEO
 * 下面给出基于Vue的SPA如何实现SEO的三种方式
 *      1.SSR服务端渲染
 *          将组件或页面通过服务器生成html，再返回给浏览器，如nuxt.js
 *
 *      2.静态化
 *          目前主流的静态化主要有两种：
 *          （1）一种是通过程序将动态页面抓取并保存为静态页面，这样的页面的实际存在于服务器的硬盘中。
 *          （2）另外一种是通过WEB服务器的 URL Rewrite的方式，它的原理是通过web服务器内部模块按
 *          一定规则将外部的URL请求转化为内部的文件地址，一句话来说就是把外部请求的静态地址转化为实际
 *          的动态页面地址，而静态页面实际是不存在的。这两种方法都达到了实现URL静态化的效果。
 *
 *      3.使用Phantomjs针对爬虫处理
 *          原理是通过Nginx配置，判断访问来源是否为爬虫，如果是则搜索引擎的爬虫请求会转发到一个
 *          node server，再通过PhantomJS来解析完整的HTML，返回给爬虫。
 * */


// 问：SPA（单页应用）首屏加载速度慢怎么解决？
/**一、什么是首屏加载
 * 首屏时间（First Contentful Paint），指的是浏览器从响应用户输入网址，到首屏美容渲染完成的时间，
 * 此时整个网页不一定要全部渲染完成，但需要展示当前视窗需要的内容。
 * 首屏加载可以说是用户体验中最重要的环节。
 * 关于计算首屏时间
 * 利用 performance.timing 提供的数据：
 * 通过 DOMContentLoad 或者 performance 来计算出首屏时间。
 * */
// 方案一：
document.addEventListener( 'DOMContentLoaded', (event) => {
    console.log('first contentful painting');
})
// 方案二：
performance.getEntriesByName('first-contentful-paint')[0].startTime
// performance.getEntriesByName("first-contentful-paint")[0]
// 会返回一个 PerformancePaintTiming的实例，结构如下：
let PerformancePaintTiming = {
    name: 'first-contentful-paint',
    entryType: 'paint',
    startTime: 507.80000002123415,
    duration: 0,
}

/**二、加载慢的原因
 * 在页面渲染的过程，导致加载速度慢的因素可能如下：
 *      1.网络延迟问题。
 *      2.资源文件体积是否过大。
 *      3.资源是否重复发送请求去加载了。
 *      4.加载脚本的时候，渲染内容堵塞了。
 * */

/**三、解决方案
 * 常见的几种 SPA 首屏优化方式
 *      1.减小入口文件积。
 *          1.常用的手段是路由懒加载，把不同路由对应的组件分割成不同的代码块，
 *          待路由被请求的时候会单独打包路由，使得入口文件变小，加载速度大大增加。
 *          2.以函数的形式加载路由，这样就可以把各自的路由文件分别打包，只有在解析给定的路由时，才会加载路由组件。
 *      2.静态资源本地缓存。
 *          1.后端返回资源问题：
 *              采用 HTTP 缓存，设置 Cache-Control，Last-Modified，Etag 等响应头
 *              采用 Service Worker 离线缓存
 *          2.前端合理利用 localStorage。
 *      3.UI 框架按需加载。
 *          1.在日常使用UI框架，例如 element-UI 或者 antd，我们经常性直接饮用整个 UI 库。
 *          但实际上我用到的组件只有按钮，分页，表格，输入与警告 所以我们要按需引用
 *      4.图片资源的压缩。
 *          图片资源虽然不在编码过程中，但它却是对页面性能影响最大的因素。
 *          对于所有的图片资源，我们可以进行适当的压缩。
 *          对页面上使用到的 icon，可以使用在线字体图标，或者雪碧图，
 *          将众多小图标合并到同一张图上，用以减轻 http 请求压力。
 *      5.组件重复打包。
 *          假设A.js文件是一个常用的库，现在有多个路由使用了A.js文件，这就造成了重复下载。
 *          解决方案：在 webpack 的 config 文件中，修改 CommonsChunkPlugin 的配置。
 *      6.开启GZip压缩。
 *          拆完包之后，我们再用gzip做一下压缩 安装compression-webpack-plugin。
 *          在 vue.congig.js 中引入并修改 webpack 配置。
 *      7.使用SSR。
 *          SSR（Server side ），也就是服务端渲染，组件或页面通过服务器生成 html 字符串，
 *          再发送到浏览器从头搭建一个服务端渲染是很复杂的，vue 应用建议使用 Nuxt.js 实现服务端渲染。
 *
 * 小结：
 *      减少首屏渲染时间的方法有很多，总的来讲可以分成两大部分 ：资源加载优化和页面渲染优化。
 *      下图是更为全面的首屏优化的方案
 *      https://camo.githubusercontent.com/ef75a121551745328a7ca2ea25dd1a29b2c5a06a4d0b6cb1c16a1a11f02b1c7c/68747470733a2f2f7374617469632e7675652d6a732e636f6d2f34666166653930302d336163632d313165622d383566362d3666616337376330633962332e706e67
 * */