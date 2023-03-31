/**深拷贝浅拷贝的区别？如何实现一个深拷贝？
 * 数据类型存储
 *      JavaScript中存在两大数据类型：
 *          1.基本类型
 *          2.引用类型
 *      基本类型数据保存在在栈内存中
 *      引用类型数据保存在堆内存中，引用数据类型的变量是一个指向堆内存中实际对象的引用
 *
 * 浅拷贝
 * 属性是基本类型，拷贝的就是基本类型的值。如果属性是引用类型，拷贝的就是内存地址。
 *      1.Object.assign(target, ...sources)
 *      参数： target ---> 目标对象
 *          source ---> 源对象
 *          返回值：target对象
 *      2.slice(start,end) // 传入 0 就可以简单实现浅拷贝
 *      3.Array.concat(a1,a2) // 不传参数则相当于浅拷贝
 *      4.拓展运算符 ...
 *
 * 深拷贝
 * 拷贝开辟一个新的栈，两个对象属完成相同，但是对应两个不同的地址，修改一个对象的属性，不会改变另一个对象的属性
 *      1. _.cloneDeep()
 *          const _ = require('lodash');
 *          const obj1 = {
 *              a: 1,
 *              b: { f: { g: 1 } },
 *              c: [1, 2, 3]
 *          };
 *          const obj2 = _.cloneDeep(obj1);
 *          console.log(obj1.b.f === obj2.b.f); // false
 *      2. Jquery.extend(deep,target,object1 [, objectN ])
 *          deep：可选。Boolean类型指是否深度合并对象，默认为 false。
 *          target：Object类型 目标对象，其他对象的成员属性将被附加到该对象上。
 *          object1：可选。 Object类型 第一个被合并的对象。
 *          objectN：可选。 Object类型 第N个被合并的对象。
 *      3. JSON.stringify()
 *          const obj2 = JSON.parse(JSON.stringify(obj1));
 *      4. 手写循环递归
 *          function deepClone(obj){
 *              let objClone = Array.isArray(obj)?[]:{};
 *              if(obj && typeof obj==="object"){
 *                  for(key in obj){
 *                      if(obj.hasOwnProperty(key)){
 *                          //判断 ojb 子元素是否为对象，如果是，递归复制
 *                          if(obj[key] && typeof obj[key] ==="object"){
 *                              objClone[key] = deepClone(obj[key]);
 *                          } else {
 *                              //如果不是，简单复制
 *                              objClone[key] = obj[key];
 *                          }
 *                      }
 *                  }
 *              }
 *              return objClone;
 *          }
 * */