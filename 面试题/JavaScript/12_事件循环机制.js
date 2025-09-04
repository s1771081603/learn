console.log('0号同步任务1');
new Promise(function (resolve) {
    console.log('0号同步任务2');
    resolve();
}).then(function () {
    // 1号微任务
    setTimeout(function () {
        console.log('1号微任务中的宏任务1');
    })
    console.log('1号微任务中的同步任务1')
    new Promise(function (resolve) {
        console.log('1号微任务中的同步任务2');
        resolve();
    }).then(function () {
        // 1.1号微任务
        console.log('1.1号微任务中的同步任务1')
        setTimeout(function () {
            console.log('1.1号微任务中的宏任务1');
        })
        console.log('1.1号微任务中的同步任务2')
        setTimeout(function () {
            console.log('1.1号微任务中的宏任务2');
        })
    })
    console.log('1号微任务中的同步任务3')
    setTimeout(function () {
        console.log('1号微任务中的宏任务2');
    })
})
setTimeout(function () {
    console.log('0号宏任务中的同步任务1');
    new Promise(function (resolve) {
        console.log('0号宏任务中的同步任务2');
        resolve();
    }).then(function () {
        // 0号宏任务中的1号微任务
        setTimeout(function () {
            console.log('0号宏任务中的1号微任务中的宏任务1');
        })
        console.log('0号宏任务中的1号微任务中的同步任务1')
        new Promise(function (resolve) {
            console.log('0号宏任务中的1号微任务中的同步任务2');
            resolve();
        }).then(function () {
            //  0号宏任务中的1.1号微任务
            console.log('0号宏任务中的1.1号微任务中的同步任务1')
            setTimeout(function () {
                console.log('0号宏任务中的1.1号微任务中的宏任务1');
            })
        })
        console.log('0号宏任务中的1号微任务中的同步任务3')
    })
})
new Promise(function (resolve) {
    console.log('0号同步任务3');
    resolve();
}).then(function () {
    // 2号微任务
    setTimeout(function () {
        console.log('2号微任务中的宏任务1');
    })
    console.log('2号微任务中的同步任务1')
    new Promise(function (resolve) {
        console.log('2号微任务中的同步任务2');
        resolve();
    }).then(function () {
        // 2.1号微任务
        console.log('2.1号微任务中的同步任务1')
        setTimeout(function () {
            console.log('2.1号微任务中的宏任务1');
        })
    })
    console.log('2号微任务中的同步任务3')
})
console.log('0号同步任务4');

/**
 * 执行结果：
 * 0号同步任务1
 * 0号同步任务2
 * 0号同步任务3
 * 0号同步任务4
 * 1号微任务中的同步任务1
 * 1号微任务中的同步任务2
 * 1号微任务中的同步任务3
 * 2号微任务中的同步任务1
 * 2号微任务中的同步任务2
 * 2号微任务中的同步任务3
 * 1.1号微任务中的同步任务1
 * 1.1号微任务中的同步任务2
 * 2.1号微任务中的同步任务1
 * 0号宏任务中的同步任务1
 * 0号宏任务中的同步任务2
 * 0号宏任务中的1号微任务中的同步任务1
 * 0号宏任务中的1号微任务中的同步任务2
 * 0号宏任务中的1号微任务中的同步任务3
 * 0号宏任务中的1.1号微任务中的同步任务1
 * 1号微任务中的宏任务1
 * 1号微任务中的宏任务2
 * 1.1号微任务中的宏任务1
 * 1.1号微任务中的宏任务2
 * 2号微任务中的宏任务1
 * 2.1号微任务中的宏任务1
 * 0号宏任务中的1号微任务中的宏任务1
 * 0号宏任务中的1.1号微任务中的宏任务1
 * 
 * 分析：
 * 1. 执行同步任务，遇到宏任务和微任务，先放入对应的队列
 * 2. 同步任务执行完毕后，开始执行微任务队列
 * 3. 微任务队列执行完毕后，开始执行宏任务队列
 * 4. 宏任务队列中的宏任务执行完毕后，再次执行微任务队列
 * 5. 重复 2、3、4 步骤，直到宏任务队列和微任务队列都为空
*/