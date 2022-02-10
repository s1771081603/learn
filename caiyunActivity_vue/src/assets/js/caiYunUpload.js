(function (window) {
  var caiYunUpload = {
    data: {
        key: ''
    },
    upload4Base64: function (obj) {
      var self = this;
      if (!obj) {
        self.errorCallback();
        return;
      }
      obj.file = self.base642Blob(obj.base64);
      obj.base64 = undefined;
      self.upload4File(obj);
    },
    upload4Base64Multiple: function (obj) {
      var self = this;
      if (!obj) {
        self.errorCallback();
        return;
      }
      var uploadDTOList = obj.uploadDTOList;
      for(var index = 0; index < uploadDTOList.length; index++) {
        var uploadDTO = uploadDTOList[index];
        var file = self.base642Blob(uploadDTO.base64);
        uploadDTO.base64 = undefined;
        uploadDTO.file = file;
        uploadDTO.fileSize = file.size;
        uploadDTO.fileSuffix = file.type.split('/')[1];
        uploadDTOList[index] = uploadDTO;
      }
      self.upload4FileMultiple(obj);
    },
    upload: function (obj) {
      var self = this;
      var formData = new FormData();
      formData.append('file', obj.file, obj.contentName);
      $.ajax({
        url: obj.redirectionUrl,
        type: 'POST',
        data: formData,
        processData: false,
        contentType: false,
        success: function(res) {
          self.successCallback(obj);
        },
        error: function() {
          self.errorCallback();
        }
      });
    },
    upload4File: function (obj) {
      var self = this;
      var file = obj.file;
      obj.file = undefined;
      obj.fileSize = file.size;
      obj.fileSuffix = file.type.split('/')[1];
      obj.data = caiYunLoginJs.publicKeyEncrypt2({});
      $.ajax({
        type: 'POST',
        url: caiYunLoginJs.getBaseUrl() + 'ajax/common/uploadFile.action?op=createUpload',
        data: obj,
        async: false,
        success: function(res) {
          var result = self.getCreateUploadResult(res);
          var newContentIDList = result.newContentIDList[0];
          var contentID = newContentIDList.contentID;
          var contentName = newContentIDList.contentName;
          var redirectionUrl = result.redirectionUrl;
          self.upload({
            redirectionUrl: redirectionUrl, contentID: contentID,
            file: file, contentName: contentName,
            key: obj.key
          });
        },
        error: function(err) {
          self.errorCallback();
        }
      });
    },
    upload4FileMultiple: function (obj) {
      var self = this;
      var uploadDTOList = obj.uploadDTOList;
      var data = caiYunLoginJs.publicKeyEncrypt2({});
      $.ajax({
        type: 'POST',
        url: caiYunLoginJs.getBaseUrl() + 'ajax/common/uploadFile.action?op=createUploadMultiple' + '&data=' + encodeURIComponent(data),
        data: JSON.stringify(obj),
        headers: {'Content-Type': 'application/json'},
        async: false,
        success: function(res) {
          var resultArray = self.getCreateUploadResult(res);
          for(var index = 0; index < resultArray.length; index++) {
            var result = resultArray[index];
            var uploadDTO = uploadDTOList[index];
            var newContentIDList = result.newContentIDList[0];
            var contentID = newContentIDList.contentID;
            var contentName = newContentIDList.contentName;
            var redirectionUrl = result.redirectionUrl;
            self.upload({
              redirectionUrl: redirectionUrl, contentID: contentID,
              file: uploadDTO.file, contentName: contentName,
              key: uploadDTO.key
            });
          }
        },
        error: function(err) {
          self.errorCallback();
        }
      });
    },
    getCreateUploadResult: function(res) {
      var self = this;
      if (!res) {
        self.errorCallback();
        throw new Error('创建上传任务错误: res is null');
      }
      var msg = res.msg;
      if (res.code !== 10000) {
        self.errorCallback(msg);
        throw new Error('创建上传任务错误:' + msg);
      }
      var result = res.result;
      if (!result) {
        self.errorCallback(msg);
        throw new Error('创建上传任务错误:' + msg);
      }
      return result;
    },
    errorCallback: function (msg) {

    },
    successCallback: function (obj) {

    },
    /**
     * 读取 input 的标签 file 类型 文件 base64
     */
    readBase64: function (input, callback) {
      var file = document.getElementById(input).files[0];
      var fileReader = new FileReader();
      fileReader.onload = function (e) {
        var base64Str = e.target.result;
        callback(base64Str)
      };
      if (!file) {
        console.error('请选择文件')
        return;
      }
      fileReader.readAsDataURL(file)
    },
    /**
     * 将 base64 转换为 blob
     */
    base642Blob: function (base64Data) {
      var arr = base64Data.split(','), mime = arr[0].match(/:(.*?);/)[1], byteStr = atob(arr[1]),
        n = byteStr.length,
        u8arr = new Uint8Array(n);
      while (n--) {
        u8arr[n] = byteStr.charCodeAt(n);
      }
      if ('text/xml' === mime) {
        mime = "image/jpeg";
      }
      return new Blob([u8arr], {
        type: mime
      });
    },
    getCaiYunImgBase64: function(imageUrl, successCallback, errorCallback) {
      imageUrl = caiYunLoginJs.getBaseUrl() + 'ajax/tools/opRequest.action?op=getImage&imageUrl=' + imageUrl;
      this.getImgBase64(imageUrl, successCallback, errorCallback);
    },
    getImgBase64: function(imageUrl, successCallback, errorCallback) {
      var xhr = new XMLHttpRequest();
      xhr.open('GET', imageUrl, true);
      xhr.responseType = "blob";
      xhr.onload = function() {
        if (this.status !== 200) {
          console.log('获取图片失败: status:' + this.status);
          errorCallback();
          return;
        }
        var blob = this.response;
        var oFileReader = new FileReader();
        oFileReader.onloadend = function (e) {
          // 此处拿到的已经是 base64的图片了
          var base64 = e.target.result;
          if (!base64 || base64.length < 10) {
            errorCallback();
            return;
          }
          successCallback(base64);
        };
        oFileReader.readAsDataURL(blob);
      };
      xhr.send();
    },
    share: function (obj) {
      var iframe = document.createElement('iframe');
      iframe.style.display = 'none';
      var title = encodeURIComponent(obj.title);
      var desc = encodeURIComponent(obj.desc);
      var imgUrl = encodeURIComponent(obj.imgUrl);
      var linkUrl = encodeURIComponent(obj.linkUrl);
      if (navigator.userAgent.toLowerCase().indexOf('android'.toLowerCase()) > -1) {
        linkUrl = encodeURIComponent(encodeURIComponent(obj.linkUrl));
      }
      iframe.src = "mcloudshare://advert?title=" + title + "&desc=" + desc + "&link=" + linkUrl + "&imgUrl=" + imgUrl;
      document.body.appendChild(iframe);
      window.setTimeout(function() {
        document.body.removeChild(iframe);
      }, 1800);
    }
  }
  window.caiYunUpload = caiYunUpload;
})(window);