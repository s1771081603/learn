(function (window) {
  /**
   * 4G 取号登录
   */
  var letLoginJs = {
    data: {
      '2': {
        appId: '300011941130',
        version: '1.2'
      },
      '3': {
        appId: '300011973178',
        version: '1.2'
      },
      '4': {
        appId: '300011980198',
        version: '1.2'
      },
      '5': {
        appId: '300011999053',
        version: '1.2'
      },
      apiVersion: 2,
      contextPath: ''
    },
    init: function () {
      console.log('letLoginJs init');
      this.addMeta();
    },
    getConfig: function () {
      return this.data[this.data.apiVersion]
    },
    getContextPath: function () {
      return location.origin + '/portal/'
    },
    getSignUrl: function () {
      return this.getContextPath() + 'auth/getSign.action';
    },
    getTokenValidateUrl: function () {
      return this.getContextPath() + 'auth/tokenValidate.action';
    },
    getNumber: function (apiVersion) {
      if (apiVersion) {
        this.data.apiVersion = apiVersion;
      }
      var config = this.getConfig();
      var preSign = YDRZ.getSign(config.appId, config.version);
      this.getSign(preSign);
    },
    getSign: function (preSign) {
      var self = this;
      var data = {
        preSign: preSign
      };
      this.postRequest(this.getSignUrl(), data, function (response) {
        if (response.code == 0) {
          self.getTokenInfo(response.result)
        } else {
          self.errorCallBack();
        }
      })
    },
    getTokenInfo: function (sign) {
      var self = this;
      var config = self.getConfig();
      //3、通过jssdk获取token
      YDRZ.getTokenInfo({
        data: {
          version: config.version,
          appId: config.appId,
          sign: sign,
          openType: '0',
          expandParams: '',
          isTest: '1'
        }, success: function (res) {
          console.log(res);
          //4、成功返回token,调用后台接口校验token并登录
          if (res.code === '000000') {
            self.tokenValidate(res.token, res.userInformation)
          }
        }, error: function (res) {
          self.errorCallBack();
          //没有成功获取token，不作处理
          console.log(res);
        }
      });
    },
    tokenValidate: function (token, userInformation) {
      var self = this;
      var data = {
        type: 1,
        token: token,
        userInformation: userInformation,
        version: self.data.apiVersion
      };
      this.postRequest(this.getTokenValidateUrl(), data, function (response) {
        if (response.code === 0) {
          self.successCallBack(response);
        } else {
          self.errorCallBack();
        }
      });
    },
    successCallBack: function (response) {
      // TODO 取号成功回调, 请覆盖该方法
    },
    errorCallBack: function () {
      // 回调, 请覆盖该方法
    },
    getRequest: function (url, data, successCall, errorCall) {
      this.ajax(url, data, successCall, errorCall, 'GET');
    },
    postRequest: function (url, data, successCall, errorCall) {
      this.ajax(url, data, successCall, errorCall, 'POST');
    },
    postJson: function (url, data, successCall, errorCall) {
      this.ajax(url, JSON.stringify(data), successCall, errorCall, 'POST', {'Content-Type': 'application/json'});
    },
    ajax: function (url, data, successCall, errorCall, type, headers) {
      var ajaxObject = {
        type: type,
        url: url,
        data: data,
        success: function (response) {
          if (typeof successCall === 'function') {
            successCall(response);
          }
        },
        error: function (response) {
          if (typeof errorCall === 'function') {
            errorCall(response);
          }
        },
        complete: function () {
        }
      };
      if (headers) {
        ajaxObject.headers = headers
      }
      $.ajax(ajaxObject);
    },
    addScript: function (src, id) {
      var script = document.createElement("script");
      script.type = "text/javascript";
      script.src = src;
      script.id = id;
      var elementsByTagNameElement = document.getElementsByTagName("head")[0];
      var oldScript = document.getElementById(id);
      if (oldScript) {
        elementsByTagNameElement.replaceChild(script, oldScript)
      } else {
        elementsByTagNameElement.appendChild(script);
      }
    },
    addMeta: function () {
      var meta = document.createElement("meta");
      meta.content = 'always';
      meta.name = 'referrer';
      var elementsByTagNameElement = document.getElementsByTagName('head')[0];
      elementsByTagNameElement.appendChild(meta);
    }
  }
  window.letLoginJs = letLoginJs;
  letLoginJs.init();
})(window)