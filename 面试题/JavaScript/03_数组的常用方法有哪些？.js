/**JavaScript 常用的数组方法有哪些？
 * 数组基本操作可以归纳为 增、删、改、查，需要留意的是哪些方法会对原数组产生影响，哪些方法不会
 *      1.push(a1,a2) // 接收任意数量的参数，并将它们添加到数组末尾，返回数组的最新长度。会影响原始数组。
 *      2.unshift(a1,a2) // 在数组开头添加任意多个值。会影响原始数组
 *      3.splice(start,length,a1,a2) // 传入三个参数，分别是开始位置、要删除的元素数量、插入的元素，返回空数组。会影响原始数组
 *      4.concat(a1,a2) // 创建一个当前数组的副本，然后再把它的参数添加到副本末尾，最后返回这个新构建的数组，不会影响原始数组
 *      5.pop() // 删除数组的最后一项，同时减少数组的 length 值，返回被删除的项,会影响原始数组
 *      6.shift() // 删除数组的第一项，同时减少数组的 length 值，返回被删除的项,会影响原始数组
 *      7.slice(start,end) // 创建一个包含原有数组中一个或多个元素的新数组，不会影响原始数组
 *      8.indexOf(a1) // 返回要查找的元素在数组中的位置，如果没找到则返回-1，不会影响原始数组
 *      9.includes() // 返回要查找的元素在数组中的位置，找到返回 true，否则 false，不会影响原始数组
 *      10.find((element, index, array) => element.value = value) // 返回第一个匹配的元素，不会影响原始数组
 *      11.reverse() // 反转数组，会影响原始数组
 *      12.sort() // 接受一个比较函数，用于判断哪个值应该排在前面，会影响原始数组
 *          let arr01 = [0,5,1,10,20,15];
 *          arr01.sort(function(value1,value2){
 *              if (value1 < value2) {
 *                  return -1;
 *              } else if (value1 > value2) {
 *                  return 1;
 *              } else {
 *                  return 0;
 *              }
 *          })
 *          console.log(arr01); // [0,1,5,10,15,20];
 *      13.join() // 接收一个参数，即字符串分隔符，返回包含所有项的字符串，会影响原始数组
 *      14.some() // 对数组每一项都运行传入的函数，如果有一项函数返回 true ，则这个方法返回 true，不会影响原始数组
 *      15.every() // 对数组每一项都运行传入的函数，如果对每一项函数都返回 true ，则这个方法返回 true，不会影响原始数组
 *      16.forEach() // 对数组每一项都运行传入的函数，没有返回值，不会影响原数组
 *      17.filter() // 对数组每一项都运行传入的函数，函数返回 true 的项会组成数组之后返回，不会影响原数组
 *      18.map() // 对数组每一项都运行传入的函数，返回由每次函数调用的结果构成的数组，不会影响原数组
 * */

/**
 * 遍历数组的方法：
 *    1.for 循环 可中断循环，遍历内容通过 arr[i] 获取
 *    2.for...in 循环 可中断循环，遍历内容通过 arr[key] 获取
 *    3.for...of 循环 可中断循环，遍历内容通过 arrItem 获取
 *    4.forEach() 方法
 *    5.map() 方法
 *    6.filter() 方法
 *    7.some() 方法
 *    8.every() 方法
 *    9.reduce() 方法
 *    10.reduceRight() 方法
 */
const fruits = ['apple', 'banana', 'orange'];

// 传统 for 循环
for (let i = 0; i < fruits.length; i++) {
  console.log(`${i}: ${fruits[i]}`);
}

// for...in (注意获取的是索引)
for (let index in fruits) {
  console.log(`${index}: ${fruits[index]}`);
}

// for...of (直接获取值)
for (let fruit of fruits) {
  console.log(fruit);
}

// forEach
fruits.forEach((fruit, index) => {
  console.log(`${index}: ${fruit}`);
});