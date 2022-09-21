const path = require("path");
const CompressionPlugin = require("compression-webpack-plugin");
const FileManagerPlugin = require("./plugins/filemanager-webpack-plugin.cjs");
const {
  VantResolver
} = require("unplugin-vue-components/resolvers");
const ComponentsPlugin = require("unplugin-vue-components/webpack");
const deploy = require('./publish/index.js');

const configureArr = [
  ComponentsPlugin({
    resolvers: [VantResolver()],
  }),
  new CompressionPlugin({
    test: /\.js$|\.html$|\.css/,
    threshold: 10240,
  }),
  new FileManagerPlugin({
    events: {
      onEnd: {
        delete: ["./portal.zip"],
        archive: [{
          source: "./dist",
          destination: "./portal.zip",
          callback: () => {
            if (JSON.parse(process.env.npm_config_argv).cooked.includes("deploy")) {
              deploy.init();
            }

          }
        }],
      },
    },
  })
]




module.exports = {
  chainWebpack: (config) => {
    // image output config
    config.module
      .rule("images")
      .test(/\.(png|jpe?g|gif|webp)(\?.*)?$/)
      .use("url-loader")
      .loader("url-loader")
      .options({
        limit: 4096,
        fallback: {
          loader: "file-loader",
          options: {
            // name: 'public/img/[path][name].[hash:8].[ext]',
            name(resourcePath) {
              if (/src[\/|\\]views/.test(resourcePath)) {
                return "public/img/[path][name].[hash:8].[ext]";
              } else {
                return "public/img/[name].[hash:8].[ext]";
              }
            },
            context: path.resolve(__dirname, "src/views"),
          },
        },
      });

    config.module
      .rule("vue")
      .use("vue-loader")
      .tap((options) => ({
        ...options,
        compilerOptions: {
          // 忽略自定义标签警告 vue3 app.config.compilerOptions.isCustomElement 配置有问题
          isCustomElement: (tag) => {
            return tag.indexOf("wx-open-launch-") === 0;
          },
        }
      }));
  },
  configureWebpack: {
    resolve: {
      extensions: [".ts", ".tsx", ".js", ".vue", ".json", ".css", ".less"],
      alias: {
        "@": path.resolve(__dirname, "./src"),
        "@a": path.resolve(__dirname, "./src/assets"),
        "@c": path.resolve(__dirname, "./src/components"),
        "@v": path.resolve(__dirname, "./src/views"),
        "@api": path.resolve(__dirname, "./src/api"),
      },
    },
    plugins: process.env.NODE_ENV === 'production' ? configureArr : [
      ComponentsPlugin({
        resolvers: [VantResolver()],
      })
    ]
  },
  publicPath: "./", // 部署应用时的根路径(默认'/'),也可用相对路径(存在使用限制)
  outputDir: "dist/portal/vue3_template", // 运行时生成的生产环境构建文件的目录(默认''dist''，构建之前会被清除)
  assetsDir: "public", //放置生成的静态资源(s、css、img、fonts)的(相对于 outputDir 的)目录(默认'')
  indexPath: "index.html", //指定生成的 index.html 的输出路径(相对于 outputDir)也可以是一个绝对路径。
  pages: {
    //pages 里配置的路径和文件名在你的文档目录必须存在 否则启动服务会报错
    index: {
      //除了 entry 之外都是可选的
      entry: "src/main.ts", // page 的入口,每个“page”应该有一个对应的 JavaScript 入口文件
      template: "public/index.html", // 模板来源
      filename: "index.html", // 在 dist/index.html 的输出
    },
  },
  productionSourceMap: false, // 生产环境是否生成 sourceMap 文件
  css: {
    // extract: true, // 是否使用css分离插件 ExtractTextPlugin
    sourceMap: false, // 开启 CSS source maps
    // loaderOptions: {
    //   less: {
    //     prependData: `@import "~@/common/less/style.less";`,
    //   },
    // }, // css预设器配置项
    requireModuleExtension: true, // 启用 CSS modules for all css / pre-processor files.
  },
  //反向代理
  devServer: {
    https: false,
    hotOnly: false,
    open: true, //配置自动启动浏览器
    proxy: {
      "/portal": {
        // target: 'https://caiyun.feixin.10086.cn:7071',  //正式
        target: "http://wap1.caiyun.feixin.10086.cn", //测试
        pathRewrite: {
          "^/portal": "/portal",
        },
      },
      "/market": {
        // target: 'https://caiyun.feixin.10086.cn:7071',
        target: "http://wap1.caiyun.feixin.10086.cn",
        pathRewrite: {
          "^/market": "/market",
        },
      },
    },
  }
};