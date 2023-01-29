interface Print {
    x: number
    y: number
}
function printCoord03(pt: Print) {
    
}
printCoord03({
    x: 120,
    y: 35
})

// 接口扩展
interface a01 {
    name: string
}
interface a02 extends a01 {
    honey: boolean
}
const a03: a02 = {
    name: 'songlisheng',
    honey: false
}
console.log(a03);

//  别名扩展
type a04 = {
    name: string
}
type a05 = a04 & {
    honey: boolean
}
const a06: a05 = {
    name: 'cailu',
    honey: true
} 
console.log(a06);

// 向现有的类型添加字段
interface a07{
    count: number
}
interface a07{
    title: string
}
const a08: a07 = {
    count: 100,
    title: 'songlisheng'
}

// 别名类型创建后是不能更改的，不能用同一个别名名称
// type a09 = {
//     count: string
// }
// type a09 = {
//     title: number
// }