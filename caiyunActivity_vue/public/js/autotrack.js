(function(para) {
    var p = para.sdk_url,
        n = para.name,
        w = window,
        d = document,
        s = 'script',
        x = null,
        y = null;
    if (typeof(w['sensorsDataAnalytic201505']) !== 'undefined') {
        return false;
    }
    w['sensorsDataAnalytic201505'] = n;
    w[n] = w[n] || function(a) {
        return function() {
            (w[n]._q = w[n]._q || []).push([a, arguments]);
        }
    };
    var ifs = ['track', 'quick', 'register', 'registerPage', 'registerOnce', 'trackSignup', 'trackAbtest', 'setProfile', 'setOnceProfile', 'appendProfile', 'incrementProfile', 'deleteProfile', 'unsetProfile', 'identify', 'login', 'logout', 'trackLink', 'clearAllRegister', 'getAppStatus', 'putPhoneNumberInfo'];
    for (var i = 0; i < ifs.length; i++) {
        w[n][ifs[i]] = w[n].call(null, ifs[i]);
    }
    if (!w[n]._t) {
        x = d.createElement(s), y = d.getElementsByTagName(s)[0];
        x.async = 1;
        x.src = p;
        x.setAttribute('charset', 'UTF-8');
        w[n].para = para;
        y.parentNode.insertBefore(x, y);
    }
})({
    sdk_url: 'js/sensorsdata.full.js', // sdk源码
    heatmap_url: 'js/heatmap.full.js', // 点击图源码
    name: 'sensors',
    server_url: 'https://datacenter.mail.10086.cn/datacenter/', // 服务器接收地址
    show_log: false, // 日志打印
    heatmap: {
        // 开启页面点击事件($WebClick)
        clickmap: 'default',
        //开启视区停留事件($WebStay)
        scroll_notice_map: 'default'
    },
    send_type: 'ajax',
});


// 注册为页面级属性(平台根据自己的平台填写web、pc、wap、activity_marketing、member_center)
// sensors.registerPage({
//     platForm: '',
//     activityName: ''
// });

//开启页面浏览事件($pageview) 
// sensors.quick('autoTrack'); 
//vue
// sensors.quick('autoTrackSinglePage');