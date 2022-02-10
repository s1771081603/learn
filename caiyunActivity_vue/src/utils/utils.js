class utils{
  // 获取session
  session(key, value) {
    if (value === void(0)) {
      var lsVal = sessionStorage.getItem(key);
      if (lsVal && lsVal.indexOf('autostringify-') === 0) {
        return JSON.parse(lsVal.split('autostringify-')[1])
      } else {
        return lsVal
      }
    } else {
      if (typeof(value) === "object" || Array.isArray(value)) {
        value = 'autostringify-' + JSON.stringify(value)
      }
      return sessionStorage.setItem(key, value)
    }
  }
  //生成随机数
  getUUID(len) {
    len = len || 6;
    len = parseInt(len, 10);
    len = isNaN(len) ? 6 : len;
    var seed = "0123456789abcdefghijklmnopqrstubwxyzABCEDFGHIJKLMNOPQRSTUVWXYZ";
    var seedLen = seed.length - 1;
    var uuid = "";
    while (len--) {
      uuid += seed[Math.round(Math.random() * seedLen)]
    }
    return uuid
  }
  // 深拷贝
  deepcopy(source) {
    if (!source) {
      return source
    }
    let sourceCopy = source instanceof Array ? [] : {};
    for (let item in source) {
      sourceCopy[item] = typeof source[item] === 'object' ? this.deepcopy(source[item]) : source[item]
    }
    return sourceCopy
  }
//时间戳转时间
timetrans(date) {
  var date = new Date(date.toString().length !== 13 ? date * 1000 : date);//如果date为13位不需要乘1000
  var Y = date.getFullYear() + '-';
  var M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-';
  var D = (date.getDate() < 10 ? '0' + (date.getDate()) : date.getDate()) + ' ';
  var h = (date.getHours() < 10 ? '0' + date.getHours() : date.getHours()) + ':';
  var m = (date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes()) + ':';
  var s = (date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds());
  return Y + M + D + h + m + s;
}
//时间格式化
Format(date,fmt) { //author: meizz
  var o = {
    "M+": date.getMonth() + 1, //月份
    "d+": date.getDate(), //日
    "H+": date.getHours(), //小时
    "m+": date.getMinutes(), //分
    "s+": date.getSeconds(), //秒
    "q+": Math.floor((date.getMonth() + 3) / 3), //季度
    "S": date.getMilliseconds() //毫秒
  };
  if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (date.getFullYear() + "").substr(4 - RegExp.$1.length));
  for (var k in o)
      if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
  return fmt
}
  // 获取url参数
getQueryString(name) { 
  var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i"); 
  var r = window.location.search.substr(1).match(reg); //获取url中"?"符后的字符串并正则匹配
  var context = ""; 
  if (r != null) context = r[2]; 
  reg = null; 
  r = null; 
  return context == null || context == "" || context == "undefined" ? "" : context; 
}
getHashQueryString(name){
  return decodeURIComponent((new RegExp('[?|&]' + name + '=' + '([^&;]+?)(&|#|;|$)').exec(location.href) || [, ""])[1].replace(/\+/g, '%20')) || null
}
// 设置cookie
setCookie(key, value, t) {
  var oDate = new Date();  //创建日期对象
  oDate.setDate( oDate.getDate() + t ); //设置过期时间
  document.cookie = key + '=' + value + ';expires=' + oDate.toGMTString();  //设置cookie的名称，数值，过期时间
}
// 获取cookie
getCookie(key) {
  var arr1 = document.cookie.split('; '); //将cookie按“; ”分割，数组元素为： cookie名=cookie值
  for (var i=0; i<arr1.length; i++) {  //分割数组里的每个元素
    var arr2 = arr1[i].split('='); //按照“=”分割
    if ( arr2[0] == key ) { //如果数组的第一个元素等于给定的cookie名称
      return decodeURI(arr2[1]);  //返回翻译编码后的cookie值
    }
  }
}
// 删除cookie
removeCookie(key) {
  setCookie(key, '', -1);  //cookie的过期时间设为昨天
}
//下载base64图片
downloadFile(content, fileName) {
  var base64ToBlob = function(code) {
    var parts = code.split(';base64,');
    var contentType = parts[0].split(':')[1];
    var raw = window.atob(parts[1]);
    var rawLength = raw.length;
    var uInt8Array = new Uint8Array(rawLength);
    for(var i = 0; i < rawLength; ++i) {
      uInt8Array[i] = raw.charCodeAt(i);
    }
    return new Blob([uInt8Array], {
      type: contentType
    });
  };
  var aLink = document.createElement('a');
  var blob = base64ToBlob(content); //new Blob([content]);
  var evt = document.createEvent("HTMLEvents");
  evt.initEvent("click", true, true); //initEvent 不加后两个参数在FF下会报错  事件类型，是否冒泡，是否阻止浏览器的默认行为
  aLink.download = fileName;
  aLink.href = URL.createObjectURL(blob);
  aLink.click();
  }
  publicKeyEncrypt(data) {
    if (!data || typeof JSEncrypt === String(undefined)) {
      return {};
    }
    var encrypt = new JSEncrypt();
    encrypt.setPublicKey(caiYunLoginJs.getPublicKey());
    if(typeof data === 'object'){
      return encrypt.encrypt(JSON.stringify(data));
    }else{
      return encrypt.encrypt(data);
    }
  }
  async judgeHeic(event,url) {
    if (/\.heic$/i.test(event)) {
      let img = new Image()
      let flag = true
      img.src = url;
      await new Promise((resolve,reject)=>{
        img.onload = () =>{
          resolve()
        }
        img.onerror = () => {
          reject()
        }
      }).catch(()=>{
        flag = false
      })
      return flag
    }
    return true
  }
}
export default new utils()