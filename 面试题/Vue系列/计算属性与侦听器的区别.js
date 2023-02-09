/**区别
 * 1.功能：computed 是计算属性，watch是监听一个值的变化而执行对应的回调。
 * 2.是否调用缓存：computed 函数所以来的属性不变的时候会调用缓存；watch 每次监听的值发生变化都会调用回调。
 * 3.是否调用return：computed必须有；watch可以有可以没有。
 * 4.使用场景：computed当一个属性收到多个属性影响的时候；例如购物车商品结算；
 *      watch当一条数据影响多条数据的时候，例如搜索框、、、
 * 5.是否支持异步：computed函数不能有有异步；watch可以。
 * */
