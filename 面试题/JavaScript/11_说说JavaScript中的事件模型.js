/**
 * 事件与事件流
 * JavaScript 中的事件，可以里阿杰就是在 HTML 文档或者浏览器中发生的一种交互操作，
 * 是的网页具备互动性，常见的有加载事件，鼠标事件，自定义事件等
 * 
 * 由于DOM是一个树结构，如果在父子节点绑定事件时候，当触发子节点的时候，
 * 就存在一个顺序问题，这就是涉及到事件的概念。
 * 
 * 事件流都会经历三个阶段：
 *      事件捕获阶段
 *      处于目标阶段
 *      事件冒泡阶段
 * 
 * 事件冒泡是一种从下往上的传播方式，由最具体的元素（触发节点）然后逐渐向上传播到最不具体的那个节点，也就是DOM中最高层的父节点。
 */

/**
 * 事件模型
 * 事件模型可以分为三种：
 *      原始时事件模型（DOM 0级）
 *      标准事件模型（DOM 2级）
 *      IE事件模型（基本不用）
 * 
 * 原始事件模型
 * 事件绑定监听函数比较简单，有两种方式：
 *      HTML代码中直接绑定
 *      通过JS代码绑定
 * 特性：
 *      绑定速度快。
 *      只支持冒泡，不支持捕获。
 *      同一个类型的事件只能绑定一次。
 * 
 * 标准事件模型
 *      在该事件模型中，一次事件共有三个过程
 *      事件捕获阶段：事件从 document 一直向下传播到目标元素，依次检查经过的节点是否绑定了事件监听函数，如果有则执行。
 *      事件处理阶段：事件到达目标元素，触发目标元素的监听函数。
 *      事件冒泡阶段：事件从目标元素冒泡到 document，依次检查经过的节点是否绑定了事件监听函数，如果有则执行。
 * 
 * 事件绑定监听函数的方式如下:
 * addEventListener(eventType, handler, useCapture)
 * 事件移除监听函数的方式如下:
 * removeEventListener(eventType, handler, useCapture)
 * 参数如下：
 *      eventType：指定事件类型(不要加on)
 *      handler：是事件处理函数
 *      useCapture：是一个boolean用于指定是否在捕获阶段进行处理，一般设置为false与IE浏览器保持一致
 */