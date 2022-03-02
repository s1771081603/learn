function CyApp() {
  this.data = {
    redirectUrl: "http://caiyun.feixin.10086.cn:7070/portal/clientDL/index.jsp",
    timeout: 3000
  };

  this.encodeObj = function (obj) {
    return this.encodeBase64(JSON.stringify(obj));
  };
  this.encodeBase64 = function (input) {
    var output = "";
    var _keyStr = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/="
    var chr1, chr2, chr3, enc1, enc2, enc3, enc4;
    var i = 0;

    input = this.utf8Encode(input);
    while (i < input.length) {
      chr1 = input.charCodeAt(i++);
      chr2 = input.charCodeAt(i++);
      chr3 = input.charCodeAt(i++);
      
      enc1 = chr1 >> 2;
      enc2 = ((chr1 & 3) << 4) | (chr2 >> 4);
      enc3 = ((chr2 & 15) << 2) | (chr3 >> 6);
      enc4 = chr3 & 63;
      if (isNaN(chr2)) {
        enc3 = enc4 = 64;
      } else if (isNaN(chr3)) {
        enc4 = 64;
      }
      output = output + _keyStr.charAt(enc1) + _keyStr.charAt(enc2) + _keyStr.charAt(enc3) + _keyStr.charAt(enc4);
    }
    return output;
  }

  this.utf8Encode = function (string) {
    string = string.replace(/\r\n/g, "\n");
    var utftext = "";
    for (var n = 0; n < string.length; n++) {
      var c = string.charCodeAt(n);
      if (c < 128) {
        utftext += String.fromCharCode(c);
      } else if ((c > 127) && (c < 2048)) {
        utftext += String.fromCharCode((c >> 6) | 192);
        utftext += String.fromCharCode((c & 63) | 128);
      } else {
        utftext += String.fromCharCode((c >> 12) | 224);
        utftext += String.fromCharCode(((c >> 6) & 63) | 128);
        utftext += String.fromCharCode((c & 63) | 128);
      }
    }
    return utftext;
  }
}

CyApp.prototype.setRedirectUrl = function (url) {
  this.data.redirectUrl = url;
};

CyApp.prototype.setTimeOut = function (millisecond) {
  this.data.timeout = millisecond;
};

CyApp.prototype.pull = function (src) {
  var _this = this;
  window.location.href = src;
  // window.setTimeout(function () {
  //     var url = _this.data.redirectUrl;
  //     if (url) {
  //         window.location.href = url;
  //     }
  // }, _this.data.timeout);
};
/**
 * 跳转至共享群列表界面
 */
CyApp.prototype.shareGroup = function () {
  var src = "mcloud://sharegroups";
  this.pull(src);
};
/**
 * 跳转至云换机界面
 */
CyApp.prototype.cloudChange = function () {
  var src = "mcloud://cloudchange";
  this.pull(src);
};

/**
 * 跳转至公开外链分享
 * @param link 外链
 * @param pwd 密码
 * @param category 路径
 * @param name 名称
 * @param account 号码
 * @param linkId 外链id
 * @param other 其他
 */
CyApp.prototype.publicLinks = function (link, pwd, category, name, account, linkId, other) {
  var src = "mcloud://publicLinks?linkInfo=";
  var obj = {
    "link": link,
    "pwd": pwd,
    "category": category,
    "name": name,
    "account": account,
    "linkId": linkId,
    "other": other
  };
  src += this.encodeObj(obj);
  this.pull(src);
};

/**
 * 跳转至加密外链分享
 * @param link 外链
 * @param pwd 密码
 * @param category 路径
 * @param name 界面名称
 * @param account 号码
 */
CyApp.prototype.outLinks = function (link, pwd, category, name, account) {
  var src = "mcloud://outLinks?outlink=";
  var obj = {
    "link": link,
    "pwd": pwd,
    "category": category,
    "name": name,
    "account": account
  };
  src += this.encodeObj(obj);
  this.pull(src);
};
/**
 * 跳转至某文件列表查看界面
 * @param linkId 外链id
 * @param category 路径
 * @param name 文件夹名称
 * @param account 号码
 * @param fileId 目录id
 */
CyApp.prototype.directoryFiles = function (linkId, category, name, account, fileId) {
  var src = "mcloud://directoryFiles?params=";
  var obj = {
    "linkId": linkId,
    "category": category,
    "name": name,
    "account": account,
    "fileID": fileId
  };
  src += this.encodeObj(obj);
  this.pull(src);
};
/**
 * ShareExtension选择图片相册或者视频到app进行转存
 */
// CyApp.prototype.shareExtension = function () {
//     var src = "mcloud://extension.share?groupId=xxx&&fileList=xxx";
//     this.pull(src);
// };
/**
 * 跳转至某共享群首页
 * @param groupId 共享群id
 * @param name 共享群名称
 * @param account 号码
 */
CyApp.prototype.groupHome = function (groupId, name, account) {
  var src = "mcloud://sharegroup/groupHome?shareGroupInfo=";
  var obj = {
    "groupId": groupId,
    "name": name,
    "account": account
  };
  src += this.encodeObj(obj);
  this.pull(src);
};

/**
 * 跳转至家庭页（家庭云邀请wap拉起app，进入家庭页）
 * @param cloudId 家庭云id
 * @param name 家庭云名称
 * @param account 号码
 */
CyApp.prototype.cloudHome = function (cloudId, name, account) {
  var src = "mcloud://family/cloudHome?cloudInfo=";
  var obj = {
    "cloudId": cloudId,
    "name": name,
    "account": account
  };
  src += this.encodeObj(obj);
  this.pull(src);
};

/**
 * 短链接跳转
 * @param id 短链接id
 */
CyApp.prototype.shortLink = function (id) {
  var src = "mcloud://shortLink?params=";
  var obj = {
    "id": id
  };
  src += this.encodeObj(obj);
  this.pull(src);
};

/**
 * 跳转至首页上传界面
 */
CyApp.prototype.uploadView = function () {
  var src = "mcloud://main/uploadView";
  this.pull(src);
};

/**
 * 跳转至首页“所有服务”页面
 */
CyApp.prototype.featureServices = function () {
  var src = "mcloud://main/featureServices";
  this.pull(src);
};
/**
 * json中字段与营销平台接口getAdvert返回的advertInfo一致，其中linkUrl、title是必选字段：
 * base64EncodeStr = base64({
 *	"linkUrl": "0|1009",
 *  "title": "保险箱",
 *  ......
     })
 * @param title 标题
 * @param linkUrl 链接 (0|1009)
 */
CyApp.prototype.featureService = function (title, linkUrl) {
  var src = "mcloud://main/featureServices?params=";
  var obj = {
    "linkUrl": linkUrl,
    "title": title,
  };
  src += this.encodeObj(obj);
  this.pull(src);
};
/**
 * 跳转至主tab一级页面（首页tab、个人云tab、家庭云tab、发现、我的）
 * @param index tab 下标
 */
CyApp.prototype.tab = function (index) {
  var src = "mcloud://main/tab?params=";
  var obj = {
    "index": index
  };
  src += this.encodeObj(obj);
  this.pull(src);
};

/**
 * 跳转至首页签到活动界面
 */
CyApp.prototype.signActivity = function () {
  var src = "mcloud://main/signActivity";
  this.pull(src);
};

/**
 * 跳转至端内指定H5页面
 * @param title 标题
 * @param linkUrl 链接
 */
CyApp.prototype.webView = function (title, linkUrl) {
  var src = "mcloud://main/webView?params=";
  var obj = {
    title: title,
    linkUrl: linkUrl
  };
  src += this.encodeObj(obj);
  this.pull(src);
};

/**
 * 跳转至家庭相册
 * @param cloudId 家庭云id
 * @param name 家庭云名称
 * @param account 号码
 */
CyApp.prototype.familyAlbum = function (cloudId, name, account) {
  var src = "mcloud://family/album?params=";
  var obj = {
    "cloudId": cloudId,
    "name": name,
    "account": account
  };
  src += this.encodeObj(obj);
  this.pull(src);
};


/**
 * 跳转至家庭文件
 * @param cloudId 家庭云id
 * @param name 家庭云名称
 * @param account 号码
 */
CyApp.prototype.familyFile = function (cloudId, name, account) {
  var src = "mcloud://family/file?params=";
  var obj = {
    "cloudId": cloudId,
    "name": name,
    "account": account
  };
  src += this.encodeObj(obj);
  this.pull(src);
};

/**
 * 跳转至家庭乐园
 * @param cloudId 家庭云id
 * @param name 家庭云名称
 * @param account 号码
 */
CyApp.prototype.familyParadise = function (cloudId, name, account) {
  var src = "mcloud://family/paradise?params=";
  var obj = {
    "cloudId": cloudId,
    "name": name,
    "account": account
  };
  src += this.encodeObj(obj);
  this.pull(src);
};

/**
 * 跳转至发现tab-推荐页任意广告位
 * @param advertId 广告id  advertId字段与营销平台接口getSectionInfo返回的advertInfo中的id一致
 */
CyApp.prototype.recommend = function (advertId) {
  var src = "mcloud://discovery/recommend?params=";
  var obj = {
    "advertId": "广告ID"
  };
  src += this.encodeObj(obj);
  this.pull(src);
};
/**
 * 跳转至发现栏目-xx栏目内，某个指定内容的详情页
 * @param catalogId 栏目id
 * @param linkUrl 指定内容的详情页链接地址
 */
CyApp.prototype.catalog = function (catalogId, linkUrl) {
  var src = "mcloud://discovery/catalog?params=";
  var obj = {
    "catalogId": catalogId,
    "linkUrl": linkUrl
  };
  src += this.encodeObj(obj);
  this.pull(src);
};
/**
 * 在线换卡成功：跳转至sim盾登录页
 */
CyApp.prototype.simActivateLogin = function () {
  var src = "mcloud://safebox/simActivateLogin";
  this.pull(src);
};

/**
 * 跳转影集制作页面
 */
CyApp.prototype.videoCollection = function () {
  var src = "mcloud://main/videoCollection";
  this.pull(src);
};

/**
 * 微信浏览器拉起小程序 - H5活动页面
 * @param sourceid
 * @param link
 */
CyApp.prototype.openLaunch = function(sourceid,link){
  let adlink = this.encodeBase64(encodeURIComponent(link));
  return 'pages/home/main.html?fromSource=' + sourceid + '&isEncoded=1&adlink=' + adlink;
};

export default new CyApp()
