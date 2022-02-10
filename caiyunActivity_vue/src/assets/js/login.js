var caiYunLoginJsExports = {};
(function(exports){
  if (typeof limitedAccount === String(undefined)) {
      window.limitedAccount = '';
  }
  var caiYunLoginJs = {
    errorMessage: {
      'j101': '参数过期',
      '-10001': '参数过期',
      'j001': '请输入正确的手机号码',
      'j002': '请输入正确的手机号码',
      9103: '请输入正确的手机号码',
      9430: '账号不存在，请注册后再登录！',
      9431: '号码不可用，请重新输入号码',
      9432: '密码不正确',
      9435: '验证码无效, 请重新输入',
      9441: '验证码错误，请重新获取',
      9442: '验证码已失效，请重新获取',
      9445: '重复登录次数太多了, 请明天再试',
      200000504: '获取验证码已达上限',
      200050437: '操作太频繁，请稍后再试！',
      200050432: '您已关闭和彩云业务，如需使用请重新开启',
      200059505: '用户已被锁定，请联系管理员',
      200050500: '服务器操作失败',
      200059508: '获取短信密码次数已达上限',
      1809099999: '获取验证码失败，请稍后再试！',
      200050436: '拒绝登录'
    },
    account: undefined,
    isEncrypt: false,
    isCheckMobile: false,
    sessionStorageAccountKey: 'accountResult',
    showTips4Login: function (msg) {
      $(".tips").text(msg);
      $('.tips').addClass('show');
      $('.tips').removeClass('hide');
    },
    hideTips4Login: function () {
      $(".tips").text('');
      $('.tips').addClass('hide');
      $('.tips').removeClass('show');
    },
    getDynamicPassword: function (isCheckMobile,options) {
      this.isEncrypt = true;
      GET_SMS_CODE_URL = this.getLoginBaseUrl() + 'smsVerificationCode.action';
      this.isCheckMobile = isCheckMobile;
      loginUser.getDyncPasswd(options);
    },
    login: function () {
      this.isEncrypt = true;
      LOGIN_URL = this.getLoginUrl();
      return loginUser.login();
    },
    getLoginUrl: function () {
      return this.getLoginBaseUrl() + 'encryptDataLogin.action';
    },
    publicKeyEncrypt: function (data) {
      if (!data || typeof JSEncrypt === String(undefined)) {
        return {};
      }
      var encrypt = new JSEncrypt();
      encrypt.setPublicKey(this.getPublicKey());
      if (data.encryptTime) {
        return encrypt.encrypt(JSON.stringify(data));
      }
      var dataExtend = $.extend(data, this.getEncryptTime());
      return encrypt.encrypt(JSON.stringify(dataExtend));
    },
    publicKeyEncrypt2: function (data) {
      if (!data || typeof JSEncrypt === String(undefined)) {
        return {};
      }
      var encrypt = new JSEncrypt();
      encrypt.setPublicKey(this.getPublicKey2());
      if (data.encryptTime) {
        return encrypt.encrypt(JSON.stringify(data));
      }
      var dataExtend = $.extend(data, this.getEncryptTime());
      return encrypt.encrypt(JSON.stringify(dataExtend));
    },
    getPublicKey: function () {
      return '-----BEGIN PUBLIC KEY-----' +
          'MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQDEdVKnXpmib/xkN/SYguTHTTd4f1N3K8L/QmcWLKtyrdoFwENaaAZC1v471+ge9y3cAgsSZJNbW9LmPD/7W0KZ3K1HXLS5PBMAGFW/CybJ8nE8+xCH6ypOhFMq504q9mDujhtOI54XvDC1BZnDvA5J1OpxeJuOtRAQar/7BgU1nwIDAQAB' +
          '-----END PUBLIC KEY-----';
    },
    getPublicKey2: function () {
      return 'MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQCJ6kiv4v8ZcbDiMmyTKvGzxoPR3fTLj/uRuu6dUypy6zDW+EerThAYON172YigluzKslU1PD9+PzPPHLU/cv81q6KYdT+B5w29hlKkk5tNR0PcCAM/aRUQZu9abnl2aAFQow576BRvIS460urnju+Bu1ZtV+oFM+yQu04OSnmOpwIDAQAB';
    },
    privateDecrypt: function (data) {
      if (typeof JSEncrypt === String(undefined)) {
        return '';
      }
      var encrypt = new JSEncrypt();
      encrypt.setPrivateKey(this.getPrivateKey());
      return encrypt.decrypt(data);
    },
    getPrivateKey: function () {
      return 'MIICdgIBADANBgkqhkiG9w0BAQEFAASCAmAwggJcAgEAAoGBAJQ2f38Gu6bEeT17bPagnN5meP2RxX9/OByQLqW8xQXn6dPZ53kxkODlIc9eQ5wEC+XXYzRqJIiF3i+cT7L4m37EMSXDsSOtDbkIUvpg6ZiQ/ugzQULJZnJ1p5mm1ySTG9hrIOol0KgHDiyh3dRiS/dfttot2UxYCSitpzIyjdIlAgMBAAECgYBWPG9qhYxhuCei8lGwHjun24/CWjLDwE3xsKKzpGYuzYVr0nmwNnrJoAhQE9Tazi/uB6idMrUXCm0A3r4wsB4odz+y65uLKMZ4s6VW86qNz+R+wEIxEc2fvkJKRDAQBO0OMoJBx8R2p+6bgqSPuwh3XIAE/Q02bE57dPRlzF2Q8QJBAPXUhIRkYJeSmrpvQtXULNd8AamLKSKciRw8fs4egjljJcXOiUkFAnerkeUOdXNCLn3rscgAGeWsuSRnHU8YlyMCQQCaWChT9gE43RlZUM7D7HVZTfQRPNF3v8bzMrUv7XtMSYceRQDKtSdQ/qFjksyHKlDWdx8SgWNB20TlR75OSaoXAkEAmELZEWdarIcRbwgazXZtj8ou/WRERjvOcL7Hi8M5xXGzo6EZRzDjJlwOMWGTPaBwS24A32+wmqEwy2tSq/r/IQJAVHSK1K6XKptpZIMgMPsxl0VdmRUTdZg98BO+K1SilDLjub9+WG1Z7yr1+rt4KToRc9lI6mJcgsvN3jwsuT/7zwJAA9JZeqJp2vNo4ZhIgVA/cPXtojDlpoL9G6sA4Fp28t2jpV1AoZC2s7MsYcCsOSJK/r135fLqPO1QiOj91q6Fow==';
    },
    getEncryptTime: function () {
      var time = new Date().getTime();
      var self = this;
      $.ajax({
        url: self.getBaseUrl() + 'ajax/tools/opRequest.action',
        type: 'POST',
        async: false,
        data: {
          op: 'currentTimeMillis'
        },
        success: function (result) {
          time = result.result;
        }
      });
      return {encryptTime: time};
    },
    addJsEncrypt: function () {
      var script = document.createElement("script");
      script.type = "text/javascript";
      script.src = this.getBaseUrl() + 'js/jsencrypt.js';
      var elementsByTagNameElement = document.getElementsByTagName("head")[0];
      elementsByTagNameElement.appendChild(script);
    },
    loginClean: function() {
      sessionStorage.removeItem(this.sessionStorageAccountKey);
    },
    accountSaveSessionStorage: function (accountResult, isLogin) {
      var account = this.privateDecrypt(accountResult);
      if (!account || account.length !== 11) {
        this.getAccountCallback();
        return;
      }
      this.account = account;
      this.getAccountCallback(account, isLogin);
      sessionStorage.setItem(this.sessionStorageAccountKey, accountResult);
    },
    accountGetSessionStorage: function () {
      var accountResult = sessionStorage.getItem(this.sessionStorageAccountKey);
      if (!accountResult) {
        return false;
      }
      var account = this.privateDecrypt(accountResult);
      this.account = account;
      return account;
    },
    getAccount: function () {
      var account = this.getHashQueryString('account');
      var token = this.getHashQueryString('token');
      if (account && token) {
        this.tokenLogin({'account':account,'token':token});
        return;
      }
      this.getAccount2();
    },
    getAccount2: function () {
      var self = this;
      $.ajax({
        url: self.getLoginUrl(),
        data: {op: 'getAccount'},
        success: function (res) {
          if (!res) {
            self.getAccountCallback();
            return;
          }
          if (res.code !== 10000) {
            self.getAccountCallback();
            return;
          }
          /**
           * 新增统一认证单点登陆
           * @time 20210805
           * @loginType 获取url中单点登陆的标识
           */
          var loginType = self.getQueryObj().loginType;
          self.accountSaveSessionStorage(res.result, loginType === "ssoToken" ? true : false);
        }
      });
    },
    getAccountCallback: function (account) {
    },
    tokenLogin: function (paramObj) {
      var self = this;
      var account = paramObj;
      var token = paramObj;
      if (paramObj) {
        account = paramObj.account;
        token = paramObj.token;
      } else {
        account = this.getHashQueryString('account');
        token = this.getHashQueryString('token');
      }
      if (!token || !account) {
        self.getAccountCallback();
        return;
      }
      var formData = {account: account};
      var obj = $.extend(formData, self.getEncryptTime());
      formData = {
        data: self.publicKeyEncrypt(obj),
        token: token,
        op: 'tokenLogin'
      };
      $.ajax({
        url: self.getLoginUrl(),
        data: formData,
        type: 'POST',
        success: function (res) {
          if (!res) {
            self.getAccount2();
            return;
          }
          var resResult = res.result;
          if (res.code !== 10000 || !resResult) {
            self.getAccount2();
            return;
          }
          self.accountSaveSessionStorage(resResult, true);
        }
      });
    },
    isCaiYunApp: function () {
      var userAgent = navigator.userAgent.toLowerCase();
      return userAgent.indexOf('MCloudApp'.toLowerCase()) > -1 || userAgent.indexOf('iOSAmber'.toLowerCase()) > -1; // 解决 IOS 被改成咪咕问题
    },
    semiAutomaticLogin: function () {
      var semiAutomatic = this.getHashQueryString('semiAutomatic');
      if (!semiAutomatic) {
        return;
      }
      limitedAccount = this.privateDecrypt(semiAutomatic);
      return limitedAccount;
    },
    hideMobilePhone: function (mobilePhone) {
      if (!mobilePhone) {
        return mobilePhone;
      }
      return mobilePhone.replace(/(\d{3})\d{4}(\d{4})/, "$1****$2");
    },
    // 兼容hash的url参数获取方法
    getHashQueryString:function(name){
      return decodeURIComponent((new RegExp('[?|&]' + name + '=' + '([^&;]+?)(&|#|;|$)').exec(location.href) || [, ""])[1].replace(/\+/g, '%20')) || null
    },
    getQueryObj: function () {
      var obj = {};
      var query = location.search.substring(1);
      if (!query || query.length < 1) {
        return obj;
      }
      var querySplit = query.split("&");
      for (var i = 0; i < querySplit.length; i++) {
        var split = querySplit[i].split("=");
        var key = decodeURIComponent(split[0]);
        obj[key] = decodeURIComponent(split[1]);
      }
      return obj;
    },
    getBaseUrl: function () {
      return location.origin + '/portal/'
    },
    getLoginBaseUrl: function () {
      return this.getBaseUrl() + 'auth/';
    },
    init: function () {
      this.addJsEncrypt();
      this.accountGetSessionStorage();
    },
  };
  window.caiYunLoginJs = caiYunLoginJs;
  caiYunLoginJs.init();

  var GET_SMS_CODE_URL = caiYunLoginJs.getLoginBaseUrl() + "getDyncPasswd.action";
  var LOGIN_URL = caiYunLoginJs.getLoginBaseUrl() + "newMarketLogin.action";

  var phone;
  var smsAjaxing;
  var loginAjaxing;
  var getCodeFlag = false;
  var countDownFlag = false;
  var itime; // 定时器

  /*
  * 倒计时
  */
  function countDown(time) {
    if (!countDownFlag) {
      $('.getcode').html('获取验证码');
      return;
    }
    if (time <= 0) {
      $('.getcode').html('获取验证码');
      countDownFlag = false;
    } else {
      $('.getcode').html(time + 's');
      time--;
      itime = setTimeout(function () {
        countDown(time);
        if (time === 0) {
          clearTimeout(itime);
        }
      }, 1000)
    }
  };

  function clearTipes() {
    caiYunLoginJs.showTips4Login('');
    $('#phoneNumber').val('');
    $('#codeNumber').val('');
    countDown(0);
  }

  var loginUser = {
    loginphone: null,
    loginSuccess: null,
    getDyncPasswd: function (options) {
      if (smsAjaxing) {
        return false;
      }
      if (countDownFlag) {
        return false;
      }
      $('#codeNumber').val('');
      caiYunLoginJs.showTips4Login('');
      //参数校验
      phone = $.trim($('#phoneNumber').val());
      if (!checkPhone(phone)) {
        caiYunLoginJs.showTips4Login('请输入正确的手机号');
        // options.error&&options.error('请输入正确的手机号')
        return false;
      } else {
        caiYunLoginJs.hideTips4Login();
      }
      if (caiYunLoginJs.isCheckMobile && !checkMobileNum(phone)) {
        caiYunLoginJs.showTips4Login('本活动仅限中国移动用户参与');
        // options.error&&options.error('本活动仅限中国移动用户参与')
        return false;
      }
      var formData = {userName: phone};
      if (caiYunLoginJs.isEncrypt) {
        var obj = $.extend(formData, caiYunLoginJs.getEncryptTime());
        formData = {encryptData: caiYunLoginJs.publicKeyEncrypt(obj)};
      }
      smsAjaxing = $.ajax({
        url: GET_SMS_CODE_URL,
        type: 'post',
        data: formData,
        success: function (data) {
          if (data === undefined) {
            caiYunLoginJs.showTips4Login('系统繁忙，请稍后再试！');
            // options.error&&options.error('系统繁忙，请稍后再试！')
            return;
          }
          if (String(data) !== '0') {
            var message = caiYunLoginJs.errorMessage[data];
            caiYunLoginJs.showTips4Login(message == null ? '系统繁忙，请稍后再试！' : message);
            // options.error&&options.error(message == null ? '系统繁忙，请稍后再试！' : message)
            return;
          }
          //获取验证码成功后按钮60秒倒计时
          countDownFlag = true;
          getCodeFlag = true;
          countDown(60);
        },
        error: function (err) {
          clearTipes();
          caiYunLoginJs.showTips4Login('网络异常，请稍后再试');
          // options.error&&options.error('网络异常，请稍后再试')

        },
        complete: function () {
          smsAjaxing = null;
        }
      })
    },

    login: function () {
      return new Promise((resolve,reject)=>{
        if (loginAjaxing) {
          return false;
        }
        //参数校验
        phone = $.trim($('#phoneNumber').val());
        if (!checkPhone(phone)) {
          caiYunLoginJs.showTips4Login('请输入正确的手机号');
          reject('请输入正确的手机号')
          return false;
        }
        if (caiYunLoginJs.isCheckMobile && !checkMobileNum(phone)) {
          caiYunLoginJs.showTips4Login('本活动仅限中国移动用户参与');
          reject('本活动仅限中国移动用户参与')
          return false;
        }
        if (!getCodeFlag) {
          caiYunLoginJs.showTips4Login('请先获取验证码');
          reject('请先获取验证码')
          return false;
        }
        var codeReg = new RegExp(/^\d{6}$/);
        var code = $.trim($('#codeNumber').val());
        if (!codeReg.test(code)) {
          caiYunLoginJs.showTips4Login('请输入正确验证码');
          reject('请输入正确验证码')
          return false;
        }
        var formData = {uname: phone, upwd: code, pType: 8};
        if (caiYunLoginJs.isEncrypt) {
          var obj = $.extend(formData, caiYunLoginJs.getEncryptTime());
          formData = {encryptData: caiYunLoginJs.publicKeyEncrypt(obj)};
        }
        var keySourceId = 'sourceId'.toLowerCase();
        // formData[keySourceId] = caiYunLoginJs.getQueryObj()[keySourceId];
        formData[keySourceId] = caiYunLoginJs.getHashQueryString(keySourceId);
        loginAjaxing = $.ajax({
          url: LOGIN_URL,
          type: 'post',
          data: formData,
          success: function (data) {
            if (data === undefined) {
              caiYunLoginJs.showTips4Login('系统繁忙，请稍后再试');
              reject('系统繁忙，请稍后再试')
              return;
            }
            var code = data.code;
            if (String(code) !== '0') {
              var message = caiYunLoginJs.errorMessage[code];
              caiYunLoginJs.showTips4Login(message == null ? '系统繁忙，请稍后再试！' : message);
              reject(message == null ? '系统繁忙，请稍后再试！' : message)
              return;
            }
            if (typeof loginphone === String(undefined)) {
              window.loginphone = phone;
            }
            clearTipes();
            resolve(phone)
            if ('function' === typeof (loginUser.loginphone)) {
              loginUser.loginphone();
            }
            if ('function' === typeof (loginUser.loginSuccess)) {
              loginUser.loginSuccess(phone);
            }
          },
          error: function (err) {
            clearTipes();
            caiYunLoginJs.showTips4Login('网络异常，请稍后再试');
            reject('网络异常，请稍后再试')
          },
          complete: function () {
            loginAjaxing = null;
          }
        });
      })
    }
  };


  /**
   * 查询是否手机号
   * @param phone
   * @returns
   */
  function checkPhone(phone) {
    var pattern = /0?(1)[0-9]{10}/;
    return pattern.test(phone);
  }

  /**
   * 查询是否中国移动手机号
   * @param phone
   * @returns
   */
  function checkMobileNum(phone) {
    var mobileReg = new RegExp("[+]{0,1}[0-9]{0,2}1((3[4-9])|4([7])|(5[0-27-9])|(78)|8[23478]|(98))[0-9]{8}$", "");
    return mobileReg.test(phone);
  }
  exports.caiYunLoginJs = caiYunLoginJs;
})(caiYunLoginJsExports);
(function (global, factory) {
  if (typeof exports === 'object' && typeof module !== 'undefined') {
    module.exports = factory;
  } else if (typeof define === 'function' && define.amd) {
    define(factory);
  } else {
    global.caiYunLoginJs = factory;
  }
}(this, caiYunLoginJsExports.caiYunLoginJs));