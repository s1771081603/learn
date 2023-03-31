/**字符串的常用方法有哪些？
 *      1.slice(start，end) // 从 start 开始截取到 end 结束，end 如果小于 start 则返回空字符串
 *      2.substring(start,end) // 从 start 开始截取到 end 结束，end 比 start 则从 end 开始截取
 *      3.substr(start,length) // 从 start 开始截取 length 位字符串，length不填则截取全部
 *      4.trim()、trimLeft()、trimRight() // 删除前、后或前后所有空格符，再返回新的字符串
 *      5.repeat(number) // 将字符串复制 number 次，然后返回拼接所有副本后的结果
 *      6.padEnd(number,string) // 复制字符串，如果小于指定长度则填充 string 至满足长度
 *      7.toLowerCase()、 toUpperCase() // 大小写转化
 *      8.charAt(index) // 返回给定 index 的字符
 *      9.indexOf(string) // 从字符串开头去搜索传入的 string，并返回位置（如果没找到，则返回 -1 ）
 *      10.includes(string) // 从字符串中搜索传入的 string，并返回一个表示是否包含的布尔值
 *      11.split(any) // 把字符串按照指定的 any 分割符，拆分成数组中的每一项
 *      12.match(正则字符串或正则对象) // 接收一个正则表达式字符串或一个 RegExp 对象，返回数组
 *      13.search(正则字符串或正则对象) // 接收一个正则表达式字符串或一个 RegExp 对象，返回第一个匹配索引，没有则返回 -1
 *      14.replace(string1,string2) // 匹配 string1 替换成 string2，只替换最先匹配的
 * */