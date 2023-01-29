function greet(name: string) {
    console.log(("hello," + name + "!!!").toUpperCase())
}
greet('宋利生')

function getFavoriteNumber01(): number {
    return 26
}
function getFavoriteNumber02(){
    return 26
}

let names = ["宋利生", "蔡露", "结婚"]
names.forEach((item)=>{
    console.log(item.toUpperCase());
})