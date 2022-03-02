const path = require('path')
const CompressionPlugin = require('compression-webpack-plugin');
const FileManagerPlugin = require('filemanager-webpack-plugin');

function resolve(dir) {
  return path.join(__dirname, dir)
}

module.exports = {
  configureWebpack: config => {
    config.resolve = {
      extensions: ['.js', '.vue', '.json', ".css",".scss"],
      alias: {
        'vue$': 'vue/dist/vue.esm.js',
        '@': resolve('src'),
      }
    }
    if(process.env.NODE_ENV === 'production'){
      return{
        plugins:[
          new CompressionPlugin({
            test:/\.js$|\.html$|\.css/,
            threshold:10240,
            deleteOriginalAssets:false
          }),
          new FileManagerPlugin({
            events: {
              onEnd: {
                delete: [
                    './portal.zip'
                ],
                archive: [{
                  source: './dist',
                  destination: `./portal.zip`
                }]
              }
            }
          })
        ]
      }
    }
  },
  publicPath: './', // 部署应用时的根路径(默认'/'),也可用相对路径(存在使用限制)
  outputDir: './dist/portal/caiyunActivity', // 运行时生成的生产环境构建文件的目录(默认''dist''，构建之前会被清除)
  assetsDir: 'public', //放置生成的静态资源(s、css、img、fonts)的(相对于 outputDir 的)目录(默认'')
  indexPath: 'index.html', //指定生成的 index.html 的输出路径(相对于 outputDir)也可以是一个绝对路径。
  pages: {
    //pages 里配置的路径和文件名在你的文档目录必须存在 否则启动服务会报错
    index: {
      //除了 entry 之外都是可选的
      entry: 'src/main.js', // page 的入口,每个“page”应该有一个对应的 JavaScript 入口文件
      template: 'public/index.html', // 模板来源
      filename: 'index.html', // 在 dist/index.html 的输出
    }
  },
  lintOnSave: true, // 是否在保存的时候检查
  productionSourceMap: false, // 生产环境是否生成 sourceMap 文件
  css: {
    extract: true, // 是否使用css分离插件 ExtractTextPlugin
    sourceMap: false, // 开启 CSS source maps
    loaderOptions: {
      scss: {
        prependData: `@import "~@/assets/scss/style.scss";`
      },
    }, // css预设器配置项
    requireModuleExtension: true // 启用 CSS modules for all css / pre-processor files.
  },
  //反向代理
  devServer: {
    https: false,
    hotOnly: false,
    open: true, //配置自动启动浏览器
    hot: true,
    proxy: {
      '/portal': {
        target: 'http://wap1.caiyun.feixin.10086.cn',
        pathRewrite: {
          '^/portal': '/portal'
        }
      },
      '/market': {
        target: 'http://wap1.caiyun.feixin.10086.cn',
        pathRewrite: {
          '^/market': '/market'
        }
      }
    }
  },
  pluginOptions: {
    'style-resources-loader': {
      preProcessor: 'scss',
      patterns: [
        path.resolve(__dirname, './src/assets/scss/style.scss')
      ]
    }
  },
}
