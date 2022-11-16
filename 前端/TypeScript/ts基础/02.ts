function demo01(a:number,b:number,c?:number):number {
    return a + b
}
console.log(demo01(1,2));
console.log(demo01(2,3,4));

let fun02:(a:number,b:number,c?:number) => number = (n1,n2) => n1 * n2;
console.log(fun02(3,9));

let nums:number[] = [1,2,3,5,4,6,8,9,7,31,25,11,24];
nums.sort((a:number,b:number):number => a-b );
console.log(nums);