type Print01 = {
    x: number,
    y: number
}
function printCoord02(pt: Print01) {
    console.log("坐标的X值为：" + pt.x);
    console.log("坐标的Y值为：" + pt.y);
}

printCoord02({
    x: 100,
    y: 200
})

type ID01 = number | string
function printId02(id: ID01) {
    console.log(id);
}

type UserInputSanitizedString01 =  string
function sanitizedInput(str: string): UserInputSanitizedString01 {
    return str.slice(0, 5);
}
console.log(sanitizedInput('songlisheng'));
