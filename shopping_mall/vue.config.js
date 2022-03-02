const path = require('path')
// const CompressionPlugin = require('compression-webpack-plugin');

function resolve(dir) {
	return path.join(__dirname, dir)
}

module.exports = {
	publicPath: "./", //部署应用包时的基本 URL， 用法和 webpack 本身的 output.publicPath 一致。
	outputDir: "./dist", // 输出文件目录，当运行 vue-cli-service build 时生成的生产环境构建文件的目录。
	assetsDir: "public", // 放置生成的静态资源 (js、css、img、fonts) 的目录。
	indexPath: "index.html", //指定生成的 index.html 的输出路径 (相对于 outputDir)。也可以是一个绝对路径。
	
	// 默认情况下，生成的静态资源在它们的文件名中包含了 hash 以便更好的控制缓存。
	// 然而，这也要求 index 的 HTML 是被 Vue CLI 自动生成的。如果你无法使用 Vue CLI 生成的 index HTML，你可以通过将这个选项设为 false 来关闭文件名哈希。
	filenameHashing: true,
	/*
		其值应该是一个对象，对象的 key 是入口的名字，value 是：
		一个指定了 entry, template, filename, title 和 chunks 的对象 (除了 entry 之外都是可选的)；
		或一个指定其 entry 的字符串。
	*/
	pages: {
		index: {
			entry: 'src/main.js', // page 的入口,每个“page”应该有一个对应的 JavaScript 入口文件
			template: 'public/index.html', // 模板来源
			filename: 'index.html', // 在 dist/index.html 的输出
		}
	},
	lintOnSave: true, // 是否在保存的时候使用 `eslint-loader` 进行检查。 
	runtimeCompiler: false, //是否使用包含运行时编译器的 Vue 构建版本。设置为 true 后你就可以在 Vue 组件中使用 template 选项了，但是这会让你的应用额外增加 10kb 左右。
	// transpileDependencies: [], //默认情况下 babel-loader 会忽略所有 node_modules 中的文件。如果你想要通过 Babel 显式转译一个依赖，可以在这个选项中列出来。
	productionSourceMap: false, //如果你不需要生产环境的 source map，可以将其设置为 false 以加速生产环境构建。
	crossorigin: undefined, // 设置生成的 HTML 中 <link rel="stylesheet"> 和 <script> 标签的 crossorigin 属性。

	//在生成的 HTML 中的 <link rel="stylesheet"> 和 <script> 标签上启用 Subresource Integrity (SRI)。
	// 如果你构建后的文件是部署在 CDN 上的，启用该选项可以提供额外的安全性。
	integrity: false, 

	configureWebpack: config => {
		/*
			Type: Object | Function
			如果这个值是一个对象，则会通过 webpack-merge 合并到最终的配置中。
			如果这个值是一个函数，则会接收被解析的配置作为参数。该函数及可以修改配置并不返回任何东西，也可以返回一个被克隆或合并过的配置版本。
		*/
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
				]
			}
		}
	},
	chainWebpack: () => {
		// 是一个函数，会接收一个基于 webpack-chain 的 ChainableConfig 实例。允许对内部的 webpack 配置进行更细粒度的修改。
	},
	css: {
		// Default: 生产环境下是 true，开发环境下是 false
		// 是否将组件中的 CSS 提取至一个独立的 CSS 文件中 (而不是动态注入到 JavaScript 中的 inline 代码)
		// 将组件内的 CSS 提取到一个单独的 CSS 文件（只用在生产环境中）
		// 也可以是一个传递给 `extract-text-webpack-plugin` 的选项
		extract: true,

		// Default: false
		// 是否为 CSS 开启 source map。设置为 true 之后可能会影响构建的性能。
		sourceMap: false,

		// 为预处理的 loader 传递自定义选项。比如传递给
		// Css-loader 时，使用 `Css: {...}`。
		// loaderOptions: {
		// 	scss: {
		// 		// 这里的选项会传递给 css-loader
		// 	},
		// 	postcss: {
		// 		// 这里的选项会传递给 postcss-loader
		// 	}
		// },

		// 为所有的 CSS 及预处理文件开启 CSS Modules。
		// 默认情况下，只有 *.module.[ext] 结尾的文件才会被视作 CSS Modules 模块。
		// 设置为 true 后你就可以去掉文件名中的 .module 并将所有的 *.(css|scss|sass|less|styl(us)?) 文件视为 CSS Modules 模块。
		requireModuleExtension: true,
	},
// 	/*
// 		如果你的前端应用和后端 API 服务器没有运行在同一个主机上，你需要在开发环境下将 API 请求代理到 API 服务器。
// 		这个问题可以通过 vue.config.js 中的 devServer.proxy 选项来配置。
// 	*/
	devServer: {
		open: true, //配置自动启动浏览器
		// host: '192.168.14.184',
		// port:7070,
		https: false,
		hotOnly: false,
		proxy: {
			"/api": {
				target: "https://api.shop.eduwork.cn/",
				pathRewrite: {
					"^/api": ""
				}
			}
		}
	}
}