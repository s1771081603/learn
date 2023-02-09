/**css选择器有哪些
 * 一、常用的 css 基本选择器
 *      1. 标签选择器
 *      2.类选择器
 *      3. id选择器
 *      4.通配符选择器
 * 二、复合选择器
 *      1.交集选择器
 *      2.并集选择器
 * 三、属性选择器
 *      1.选择含有指定属性的元素。
 *          语法：[属性名]{}
 *          选择属性名为title,设置字体颜色红色
 *          [title]{
 *              color:red;
 *          }
 *      2.选择含有指定属性及指定属性值的元素。
 *          语法：[属性名=属性值]{}
 *          选择属性名为title和属性值为ab的元素 ,设置字体颜色绿色
 *          [title=ab]{
 *              color: green;
 *          }
 *      3.选择含有指定属性及指定属性之开头的元素。
 *          语法：[属性名^=属性值]{}
 *          选择属性名为title和属性值以ab开头的元素，设置背景色黄色
 *          [title^=ab]{
 *              background-color: yellow;
 *          }
 *      4.选择含有指定属性及指定属性值结尾的元素。
 *          语法：[属性名$=属性值]
 *          选择属性名为title和属性值以ab结尾的元素，设置字体为30px
 *          [title$=ab]{
 *              font-size: 30px;
 *          }
 *      5.选择含有指定属性，只要含有某个属性值的元素。
 *          语法：[属性值*=属性名]{}
 *          选择属性名为title和属性值含有c的元素，设置背景色为绿色
 *          [title*=c]{
 *             background-color: green;
 *          }
 * 四、关系选择器
 *      1.父子选择 ，单个
 *          div > span{
 *              color: blue;
 *              font-size: 40px;
 *          }
 *      2.祖先后代选择，全部
 *          div span{
 *              color: red;
 *          }
 *      3.必须相邻兄弟选择，是兄弟但不相邻，不选择
 *          div + span{
 *              color: greenyellow;
 *          }
 *      4.全兄弟选择
 *          p ~ span{
 *              color: black;
 *          }
 *          p ~ *{
 *              color: white;
 *          }
 * 五、伪类选择器
 *      1.元素选择伪类选择器
 *          1、:first-child 第一个子元素
 *          2、:last-child 最后一个子元素
 *          3、:nth-child(n) 选中第n个元素，
 *              关于:nth-child( )的特殊值，n 第n个 n的范围0到正无穷（全选）
 *              even 或 2n 选中偶数位的元素
 *              odd 或 2n+1 选中奇数位得到元素
 *          4、:first-of-type 第一个子元素
 *          5、:last-of-type 最后一个子元素
 *          6、:nth-of-type(n) 选中第n个元素
 *      2.否定伪类选择器
 *          :not( ) 将符号条件的元素去除
 *          不支持组合使用 :not(div .one) 不支持
 *      3.特殊应用的伪类
 *          以下两个伪类是所有标签都可以使用
 *              1.:hover 鼠标移入后元素的状态
 *              2.:active 鼠标点击后，元素的状态
 *          以下两个伪类是超链接所独有的
 *              1.:link 表示未访问过的 a 标签
 *              2.:visited 表示访问过的 a 标签
 * 六、伪元素选择器
 *      1.::first-letter 表示第一个字母
 *      2.::first-line 表示第一行
 *      3.::selection 表示选中的元素
 *      4.::before 元素开始的位置前
 *      5.::after 元素结束的位置后
 * */