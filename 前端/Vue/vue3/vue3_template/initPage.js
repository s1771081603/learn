const readline = require("readline").createInterface({
    input: process.stdin,
    output: process.stdout,
});
let fs = require("fs");
readline.question(`输入要加路由的活动名称(目录名称)：`, (ActName) => {
    let dirs = fs.readdirSync(`./src/views/`);
    if (dirs.indexOf(ActName) === -1) {
        console.log("活动不存在");
        readline.close();
        return;
    }
    readline.question(`输入路由名：`,name=>{
        let files = fs.readdirSync(`./src/views/${ActName}`);
        if (files.indexOf(name) > -1) {
            console.log("已有该页面");
            readline.close();
            return;
        }
        // 页面
        let readData = fs.readFileSync("./template/index.vue").toString();
        let data = readData.replace(/\$\{name\}/g, name);
        data = data.replace(/\$\{Actname\}/g, ActName);
        fs.writeFileSync(`./src/views/${ActName}/${name}.vue`, data);
        fs.writeFileSync(`./src/assets/${ActName}/less/${name}.less`, "");
        // 路由
        let routerinnerData = `const ${name} = () => import(/* webpackChunkName: "${ActName}" */'@/views/${ActName}/${name}.vue')`;
        let routerEndData = `,
    {
        path: '/${name}',
        name: '${name}',
        component: ${name},
        meta: {
            title: ''
        }
    },
];`
        let rData = fs.readFileSync(`./src/router/map/${ActName}.ts`).toString().trim();
        rData = routerinnerData + '\r\n' + rData;
        let reg = /,\s](;?)$/;
        if(reg.test(rData)){
            rData = rData.replace(reg,routerEndData);
            fs.writeFileSync(`./src/router/map/${ActName}.ts`,rData)
            console.log('成功')
        }else{
            console.log("你可能需要自己去路由文件加了");
        }
        readline.close();
    })
});
