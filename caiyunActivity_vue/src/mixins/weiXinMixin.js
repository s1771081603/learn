import wx from 'weixin-js-sdk'
import $ from 'jquery'
export default {
	data() {
		return {
			debugMode: this.getQueryString(window.location.href, "debugMode") || "",
			retryTime: 1,
			shareDataObj: undefined,
		};
	},
	created() {
		if (typeof wx == "object" || this.isWeiXin || this.isQQ) {
			this.startConfig();
		}
	},
	mounted() {
		// 获取调试模式;
		if (typeof wx == "object" || this.isWeiXin || this.isQQ) {
			this.wxReady();
		}
	},
	methods: {
		startConfig() {
			let _this = this;
			$.ajax({
				url: "https://caiyun.feixin.10086.cn:7071/portal/auth/weixinLogin.action?op=sign4jsonp",
				dataType: "jsonp",
				data: {
					referer: location.href.split("#")[0] + "",
				},
				success: (data) => {
					console.log("data----", data);
					_this.shareDataObj = data;
					wx.config({
						// debug: true, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
						appId: data.appId, // 必填，公众号的唯一标识
						timestamp: data.timestamp, // 必填，生成签名的时间戳
						nonceStr: data.nonceStr, // 必填，生成签名的随机串
						signature: data.signature, // 必填，签名
						jsApiList: [ "chooseImage", "updateAppMessageShareData", "updateTimelineShareData" ], // 必填，随意一个接口即可
						openTagList: ["wx-open-launch-weapp"], // 填入打开小程序的开放标签名
					});
				},
				error: function (err) {
					console.log("ajax error: ", err);
					if (this.debugMode === "error") {
						alert("请求接口发生错误" + JSON.stringify(err));
					}
				},
				complete: function (data) {
					console.log("ajax data: ", data);
					if (this.debugMode === "error") {
						alert("请求接口返回结果" + JSON.stringify(data));
					}
				},
			});
		},
		wxReady() {
			wx.ready(function (e) {
				// config信息验证后会执行ready方法，所有接口调用都必须在config接口获得结果之后，config是一个客户端的异步操作，所以如果需要在页面加载时就调用相关接口，则须把相关接口放在ready函数中调用来确保正确执行。对于用户触发时才调用的接口，则可以直接调用，不需要放在ready函数中
				console.log("ready: ", e);
			});
			wx.error(function (res) {
				// config信息验证失败会执行error函数，如签名过期导致验证失败，具体错误信息可以打开config的debug模式查看，也可以在返回的res参数中查看，对于SPA可以在这里更新签名
				console.log("error: ", res);
				if (this.debugMode === "error") {
					// alert("配置按钮发生错误" + JSON.stringify(res));
				}
				if (this.retryTime > 0) {
					this.retryTime--;
					this.startConfig();
				}
			});
		},
		/**  获取URl中的参数
		 * @para url
		 * @para name 参数名 */
		getQueryString(url, name) {
			if (url.indexOf("?") === -1) {
				return "";
			}
			var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
			var r = url.split("?")[1].match(reg);
			if (r !== null) {
				return unescape(r[2]);
			}
			return "";
		},
		getBaseUrl: function () {
			var a = location.href.split("/");
			var b = [a[0], a[1], a[2], a[3]];
			return b.join("/") + "/";
		},
		wxShare(data) {
			if ( typeof wx !== "object" || !(this.isWeiXin || this.isQQ) || !data) {
				return;
			}
			var baseUrl = this.getBaseUrl();
			data.link =
				"http://" +
				location.hostname +
				"/portal/" +
				"CaiyunAuthServlet?isShare=true&url=" +
				encodeURIComponent(data.link);
			var imgUrl = data.imgUrl;
			if (imgUrl.indexOf("http") !== 0) {
				data.imgUrl = baseUrl + imgUrl;
			}
			this.shareData({...this.shareDataObj, ...data});
		},
		shareData(data) {
			wx.ready(function () {
				//需在用户可能点击分享按钮前就先调用
				wx.updateAppMessageShareData({
					//自定义“分享给朋友”及“分享到QQ”按钮的分享内容（1.4.0）
					title: data.title, // 分享标题
					desc: data.desc, // 分享描述
					link: data.link, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
					imgUrl: data.imgUrl, // 分享图标
					success: function () {
						// alert('调用微信分享成功updateAppMessageShareData')
					},
				});
				wx.updateTimelineShareData({
					//自定义“分享到朋友圈”及“分享到QQ空间”按钮的分享内容（1.4.0）
					title: data.title, // 分享标题
					desc: data.desc, // 分享描述
					link: data.link, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
					imgUrl: data.imgUrl, // 分享图标
					success: function () {
						// alert('调用微信分享成功updateTimelineShareData')
					},
				});
			});
			// alert('调用微信分享成功')
		},
	},
};
