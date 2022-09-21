## <font color="#07c160">1.总览</font>

Vue3+pinia+vant3+ts

Vue3和pinia  自己去学习一下 
ts的话不想用可以把生成的活动页面的lang=ts去掉就行。

Vue.config.js中的输出路径记得改

## <font color="#07c160">2.关于自动化</font>
1）创建新活动   （最好一直用这个创建新活动）

目录第一层 命令 node initAct  会提示输入活动名 （英文）  
会自动生成活动一系列文件夹和首页

2）创建一级路由页面  
目录第一层 命令 node initPage  先提示输入活动名 即创建活动时的名称，再输入你要的页面名称

注：若有手动改过路由结构可能出错，并且没有在整个工程去重，只在活动中去重
3）自动部署测试线

## <font color="#07c160">3.关于适配的方式  vw+rem+pxtorem插件</font>

限制了body最大宽度750;  
1rem = 100px;   
使用了px自动转rem，书写时可以写px也可写rem；  
行内样式中的px不会自动转换；  
文件中大写的PX不会进行自动转换（用于不想转换的）；  
1px不会进行自动转换；  

vant ui框架会进行转换，在postcss.config.js中设置，若之后有其它第三方需要进行转换，可在postcss.config.js中配置；  
关于vant 组件参数内用到px单位（如swipe的width），不会进行转换，请另行它法。。。

## <font color="#07c160">4.目录结构</font>

1）assets 活动各自资源（css,img,js等）  简写 @a   

2）api 各自活动的接口目录   

3）common  公共资源  
```
    Js/fetch  axios封装  
    js/getScheme  获取小程序scheme链接的方法  
    js/jsonp  jsonp请求方法  
    Js/letlogin  4G取号相关  
    Js/login  单点等登陆相关  
    Js/logPoint  埋点方法  
    Js/share.ts  分享方法
    Js/toLogin.ts  登陆通用方法  
    Js/useCurrentInstance  获取vue实例  
    Js/utils   一些工具类方法  
    Js/weiXin   微信的配置  
```

4）components  组件    
```
    Common:   
        CommonHeader  公用头部，不一定会用到
        LetLoginPop  4G授权弹窗  样式在创建活动时已经在assets目录对应的活动中创建了，可自定义
        LoginPop   登陆弹窗  样式在创建活动时已经在assets目录对应的活动中创建了，可自定义
        RuleTextBox  放置规则文案的盒子，运用了运营平台的样式
        WxOpen  微信环境跳转小程序方法
```

5）directives  自定义指令目录  

6）hooks   vue  hook目录  （可以理解成 可以使用生命周期，监听，计算属性，响应式数据的方法）
```
Common （下面两个我也不确定算不算hook，不过，管它呢，想放就放）
CountDown  倒计时
	publicImport  一些常用的快速导出 
```

7）lib  第三方插件

8）Router  路由

9）views  页面

10）store  pinia状态管理  活动需要自己的话创建文件

```
commonStore 和之前差不多
GlobalStore里面   sourceid   isApp   isMp  isWeiXin  
```

<font color="red">
    注意：        

    1.以上的公共文件最好不要独自修改。    
    2.最好公共文件都看一下，知道是啥。
    3.新工程大问题应该没有了，有问题及时提出

</font>