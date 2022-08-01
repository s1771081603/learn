const readline = require("readline").createInterface({
    input: process.stdin,
    output: process.stdout,
});
let fs = require("fs");
readline.question(`输入新活动名称(目录名称)：`, (name) => {
    let dirs = fs.readdirSync(`./src/views/`);
    if (dirs.indexOf(name) > -1) {
        console.log("活动名已被占用");
        readline.close();
        return;
    }
    fs.mkdirSync(`./src/views/${name}`);
    fs.mkdirSync(`./src/assets/${name}`);
    fs.mkdirSync(`./src/assets/${name}/img`);
    fs.mkdirSync(`./src/assets/${name}/less`);
    fs.mkdirSync(`./src/components/${name}`);
    fs.writeFileSync(`./src/assets/${name}/less/${name}.less`, "");
    // 页面
    let readData = fs.readFileSync("./template/index.vue").toString();
    let data = readData.replace(/\$\{name\}|\$\{Actname\}/g, name);
    fs.writeFileSync(`./src/views/${name}/${name}.vue`, data);
    // 登录组件
    fs.writeFileSync(
        `./src/assets/${name}/less/login.less`,
        fs
            .readFileSync("./template/login_less_template.less")
            .toString()
            .replace(/\$\{name\}/g, name)
    );
    //路由
    let routerinnerData = `const ${name} = () => import(/* webpackChunkName: "${name}" */ '@/views/${name}/${name}.vue');
export default [
    {
        path: '/${name}',
        name: '${name}',
        component: ${name},
        meta: {
            title: ''
        }
    },
]`;
    fs.writeFileSync(`./src/router/map/${name}.ts`, routerinnerData);
    let routerData = fs.readFileSync(`./src/router/map/index.ts`).toString().trim();
    routerData = `import ${name} from './${name}'\n` + routerData;
    routerData = routerData.slice(0, -1) + `...${name},\n]`;
    fs.writeFileSync(`./src/router/map/index.ts`, routerData);
    //api
    fs.writeFileSync(
        `./src/api/${name}.ts`,
        `import axios from "../common/js/fetch";
import qs from "qs";
/**
 *    headers:{
 *           showLoading:true  loading是否显示
            "content-Type":"application/json"   //post  json入参时使用，参数需要JSON.stringify ， 默认使用表单 需要qs
        }
 * */
export default {

}`
    );
    console.log('成功')
    readline.close();
});
