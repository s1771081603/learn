let textString = 'songlisheng'
textString = 'cailu'

const constString = 'songlisheng'
// constString = 'cailu';

function printText01(name: string, alignment: 'left' | 'right' | 'center') {
    console.log(name, alignment);
}
printText01('songlisheng', 'center')
printText01('cailu', 'left')

function compare(a: string, b: string): -1 | 0 | 1 {
    return a === b ? 0 : a > b ? -1 : 1
}

interface Options01 {
    width: number
}
 function configure(x: Options01 | 'auto') {
    console.log(x);
 }
 configure({
    width: 100
 })
 configure('auto')