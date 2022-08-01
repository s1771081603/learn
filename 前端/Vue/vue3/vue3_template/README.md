## 创建自动化
```
node initAct  //创建活动 （最好一直用这个创建活动）
node initPage //新建一级路由页面 （若有手动改过路由结构可能出错，并且没有在整个工程去重，只在活动中去重）
```
## 目录结构
```
api                 接口管理
assets              活动资源
common              公共图片，样式，js等
directives          全局指令
hooks               组合式函数（hooks）管理
lib                 第三方组件
router              路由
store               状态管理  pinia
views               页面

//现有的公共文件最好不要单独一个人改 ， 因为后续如果要改东西就可以改一个，其他人替换就行了
```

## 关于适配的方式  vw+rem+pxtorem插件
```
限制了body最大宽度750;
1rem = 100px; 
使用了px自动转rem，书写时可以写px也可写rem；
行内样式中的px不会自动转换；
文件中大写的PX不会进行自动转换（用于不想转换的）；
1px不会进行自动转换；

vant ui框架会进行转换，在postcss.config.js中设置，若之后有其它第三方需要进行转换，可在postcss.config.js中配置；
关于vant 组件参数内用到px单位（如swipe的width），不会进行转换，请另行它法。。。
```

## 状态管理
```
pinia  自己抽空去看下文档
```

## 关于ts
```
页面不想用直接把lang=ts去掉
```
