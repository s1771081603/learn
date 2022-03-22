// 1. join 转成字符串
let array = [1,2,3,4,5,6];
console.log(array.join()); // '1,2,3,4,5,6'
console.log(array); // [1,2,3,4,5,6]

/* 2. push 在尾部添加一个或者多个元素，并返回新的长度
      如果传入的是一个数组或者对象，也按一项添加
*/ 
console.log(array.push(7,[8,9])); // 8
console.log(array); // [1,2,3,4,5,6,7,[8,9]]

/* 3. pop 在尾部删除并返回数组的最后一个元素 */
console.log(array.pop()); // [8,9]
console.log(array); // [1,2,3,4,5,6,7]

/* 4. shift 把数组的第一个元素删除，并返回第一个元素 */
console.log(array.shift()); // 1
console.log(array); // [2,3,4,5,6,7]

/* 5. unshift 向数组的开头添加一个或者多个元素，并返回长度 */
console.log(array.unshift([0,1],1)); // 8
console.log(array); // [[0,1],1,2,3,4,5,6,7]

/* 6. sort 对数组的元素进行排序，并返回数组
      sort(compareFunction)
      compareFunction 可选。用来指定按某种顺序进行排序的函数
      如果省略，元素按照转换为字符串的各个字符的 unicode 位点进行排序
*/
array.shift();
console.log(array.sort((a,b)=> a - b)); //  [1,2,3,4,5,6,7]
console.log(array.sort((a,b)=> b - a)); //  [7,6,5,4,3,2,1]
console.log(array); // [7,6,5,4,3,2,1]

/* 7. reverse 反转数组，反转数组中元素的位置 */
console.log(array.reverse()); // [1,2,3,4,5,6,7]
console.log(array); // [1,2,3,4,5,6,7]

/* 8. concat 连接两个或者多个数组
      concat 不会改变现有的数组，而仅仅是返回被连接数组的一个副本
      在没有给 concat 方法传递参数的情况下，它只是复制当前数组并返回
      concat 只能将传入的数组当做其中的每一项添加到数组中，
      如果传入的数组中有一些项是数组，那么会把这一数组项当做一项添加到 arrCopy 中
*/
console.log(array.concat([101,102,103],[201,202,203],301,302,303)); // [1,2,3,4,5,6,7,101,102,103,201,202,203,301,302,303]
console.log(array.concat([101,102,103,[201,202,203,[301,302,303]]])); // [1,2,3,4,5,6,7,101,102,103,[201,202,203,[301,302,303]]]
console.log(array); // [1,2,3,4,5,6,7]

/* 9. slice 数组截取
      array.slice(start,end)
      start：必需。规定从何处开始截取，如果是负数，那么它规定从数组尾部开始算起。-1就是倒数第一，-2就是倒数第二。
      end：可选。规定从何处结束截取，该参数是数组片段结束处的数组下标。
          如果未指定，那么切分的数组包含从 start 到数组结束的所有元素。
          如果这个参数是负数，那么它规定的是从数组为不开始算起
*/
console.log(array.slice(0,3)); // [1,2,3,4]
console.log(array.slice(-1,7)); // [7]
console.log(array.slice(-6,5)); // [2,3,4,5]
console.log(array); // [1,2,3,4,5,6,7]

/* 10. splice 数组更新
      从数组中添加/删除元素，然后返回被删除的元素（不会改变原数组）。
      array.splice(index,howmang,item1,...,itemX)
      index：必须。整数，规定添加/删除的位置，使用负数则从数组的结尾处规定位置
      howmang：必须。要删除的元素数量，如果设置为0,则不会删除元素。如果为空，则默认删除到数组结尾。
      item1,...，itemX：可选。向数组中添加的新元素。
      返回值：含有被删除元素的数组，若没有删除元素则返回一个空值
*/
console.log(array.splice(1)); // [2,3,4,5,6,7]
console.log(array.splice(1,0,1,2,3,4,5,6,7)); // []
console.log(array.splice(1,2,[101,102,103],[201,202,203])); // []
console.log(array); // [1,[101,102,103],[201,202,203],3,4,5,6,7]

// 11. indexOf 从数组开头开始查找，返回要查找的元素在数组中的位置，如果没有找到返回-1
console.log(array.indexOf(5)); // 5
console.log(array.indexOf(101)); // -1

// 12. lastIndexOf 从数组结尾开始查找，返回要查找的元素在数组中的位置，如果没有找到返回-1
console.log(array.lastIndexOf(5)); // 5
console.log(array.indexOf(202)); // -1

/*
  5个迭代方法
  forEach、map、filter、some、every
  这几个方法语法和参数都一样，不会改变原数组
  array.___(function(currentValue,index,arr,thisValue){
    currentValue：必需。当前元素。
    index：可选。当前原属的索引值。
    arr：可选。当前原属所属的数组对象。
    thisValue：可选。传递给函数的值，一般用 “this” 值。如果这个参数为空的话，undefined 会传递给 “this” 值
  })
*/
// 13. array.forEach 对数组进行遍历，这个方法没有返回值。
array.forEach((currentValue,index,arr) => {
  console.log(index+'——'+currentValue+'——'+arr);
  // 0——1——1,101,102,103,201,202,203,3,4,5,6,7
  // 1——101,102,103——1,101,102,103,201,202,203,3,4,5,6,7
  // 2——201,202,203——1,101,102,103,201,202,203,3,4,5,6,7
  // 3——3——1,101,102,103,201,202,203,3,4,5,6,7
  // 4——4——1,101,102,103,201,202,203,3,4,5,6,7
  // 5——5——1,101,102,103,201,202,203,3,4,5,6,7
  // 6——6——1,101,102,103,201,202,203,3,4,5,6,7
});
// 14. map：指映射。方法返回一个新数组，数组中的元素为原始数组调用函数处理后的值。
console.log(array.map((currentValue,index,arr,thisValue) => currentValue*currentValue)); // [1,NaN,NaN,9,16,25,36,49]

// 15. filter：过滤。会创建一个新数组，其包含通过提函数测试的所有元素。
console.log(array.filter(item=>item>1));

// 16. every 判断数组中的每一个元素是否都满足条件，返回值 true false
console.log(array.every(item=>item>1)); // false

// 17. some 判断数组中是否有满足条件的元素
console.log(array.some(item=>item>1)); // true

/* 
    两个归并方法
    reduce    reduceRight
    这两个方法都会迭代数组中的所有元素，然后生成一个最终的返回值。
    他们都接收两个参数：
    第一个参数是每个元素调用的函数，函数接收四个参数（初始值total、当前值item、索引值index、当前数组arr），函数会返回一个值，这个值会在下一次迭代中作为初始值。
    第二个参数是迭代的初始值，参数可选。如果缺省，初始值为数组的第一个元素，从数组的第一项开始叠加，缺省参数要比正常传参少一次运算。
 */
console.log(array.splice(1,2)); //[[101,102,103],[201,202,203]]

// 18. reduce 从数组第一个元素开始遍历到最后一个元素
console.log(array.reduce((total,item,index,arr)=>{
  return total + item
},0)); // 26
console.log(array); // [1,3,4,5,6,7]

// 19. reduceRight 从数组最后一个元素开始遍历到第一个元素
console.log(array.reduceRight((total,item,index,arr)=>{
  return total + item
},0)); // 26
console.log(array); // [1,3,4,5,6,7]

// 20. Array.from() 用于遍历数组的对象和可遍历对象转换为真正的数组。
let json01 ={
  '0':'卢',
  '1':'本',
  '2':'伟',
  '4':'全体起立',
  length:4
}
console.log(Array.from(json01)); // [ '卢', '本', '伟', undefined ]
let json02 ={
  '0':'卢',
  '1':'本',
  '2':'伟',
  '3':'全体起立',
  length:4
}
console.log(Array.from(json02)); // [ '卢', '本', '伟', '全体起立' ]

// 21. Array.of() 将一组值转未数组，参数部分类型，之分数量，数量为0则返回空数组。
console.log(Array.of(1,2,3,4,[5,6,7])); // [1,2,3,4,[5,6,7]]

/*
  22. find
      通过函数内的判断的数组的第一个元素的值。
      为数组中的每一个元素都调勇一次函数执行，当数组中的元素在测试条件是返回 true 时，find() 返回符合条件的元素，之后得知不会再调用执行函数。
      如果没有符合条件的元素，返回undefined
      回调函数可以接收三个参数：当前的值（currentValue）、当前的位置（index）、原数组（arr）
*/
console.log(array); // [1,3,4,5,6,7]
console.log(array.find(currentValue => currentValue > 3)); // 4
console.log(array.find(currentValue => currentValue < 1)); // undefined

// 23. findIndex 和 find 的用法差不多，不过 findIndex 返回的是索引，没有符合条件的元素返回 -1
console.log(array.findIndex(item => item > 6)); // 5
console.log(array.findIndex(item => item < 1)); // -1

/* 
  24. fill
      用一个固定值填充一个数组，从起始索引到终止索引内的全部元素，不包括终止索引。
      array.fill(value，start,end)
      value：必需。填充的值。
      start：可选。开始填充的位置，如果这个参数是负数，呢么他规定的是从数组的尾部开始算起
      end：可选。停止填充的位置，默认是数组的长度。
*/
console.log(array.fill(0,2,5)); // [1,3,0,0,0,7]
console.log(array.fill(1,-2,2)); // [1,3,0,0,0,7]
console.log(array.fill(1,-5,5)); // [1,1,1,1,1,7]

/* 
  25. keys() / values() / entries()
      这三个方法都是返回一个遍历器对象，可用for ... of
      唯一区别:keys() 是对键名的遍历
              values()是对键值的遍历
              entries()是对键值对的遍历
*/
for (const i of array.keys()) {
  console.log(i); // 0 1 2 3 4 5
}
for (const i of array.values()) {
  console.log(i); // 1 1 1 1 1 7
}
for (const i of array.entries()) {
  console.log(i); // [0,1] [1,1] [2,1] [3,1] [4,1] [5,7]
}

/*
  26. includes 用来判断一个数组是否包含一个指定的值。返回 true false
      array.includes(searchElement,fromIndex)
      searchElement：必需。需要查找的元素值。
      fromIndex：可选。从该索引处开始查找 searchElement 如果为负数，则从尾部开始查找。
*/
console.log(array.includes(1)); // true
console.log(array.includes(1,5)); // false
console.log(array.includes(1,-2)); // true
console.log(array.includes(1,-1)); // false