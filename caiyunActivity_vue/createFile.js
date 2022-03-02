const readline = require('readline').createInterface({
  input: process.stdin,
  output: process.stdout
})
let fs = require('fs')
readline.question(`输入新活动名称：`, (name) => {
  let src = './src/views/';
  let dirs = fs.readdirSync(`${src}`);
  if(dirs.indexOf(name) > -1){
      console.log("活动名称已被占用");
      readline.close();
      return
  } else if (name == '') {
    console.log("活动名称不能为空");
    readline.close();
    return
  }
  // 新活动创建文件夹
  fs.mkdirSync(`${src}${name}`);
  fs.mkdirSync(`${src}${name}/components`);
  fs.mkdirSync(`${src}${name}/images`);
  fs.mkdirSync(`${src}${name}/scss`);
  fs.mkdirSync(`${src}${name}/service`);
  // 新活动创建公共文件
  fs.writeFileSync(`${src}${name}/components/common_pop.vue`, fs.readFileSync(`${src}template/components/common_pop.vue`).toString());
  fs.writeFileSync(`${src}${name}/components/login_pop.vue`, fs.readFileSync(`${src}template/components/login_pop.vue`).toString());
  fs.writeFileSync(`${src}${name}/components/rule_pop.vue`, fs.readFileSync(`${src}template/components/rule_pop.vue`).toString().replace(/\$\{name\}/g, name));
  fs.writeFileSync(`${src}${name}/scss/index.scss`, fs.readFileSync(`${src}template/scss/index.scss`).toString().replace(/\$\{name\}/g, name));
  fs.writeFileSync(`${src}${name}/index.vue`, fs.readFileSync(`${src}template/index.vue`).toString().replace(/\$\{name\}/g, name));
  // 创建 service 文件
  fs.writeFileSync(`${src}${name}/service/${name}Service.js`,`import axios from '@/services/index'
import qs from 'qs'
export default {
  createKlCodeInfo: params => axios.post("/portal/ajax/common/createKlCodeInfo.action",params,{
    headers:{
      showLoading: true,
      'Content-Type': 'application/json;charset=UTF-8'
    }
  }),
}`);
  // 创建路由文件
  fs.writeFileSync(`./src/router/map/${name}.js`, `export default [
  {
    path: '/${name}',
    name: '${name}',
    component: () => import('@/views/${name}/index'),
    meta: {
        title: ''
    }
  }
]`);
  // 导入路由文件
  fs.writeFileSync(`./src/router/map/index.js`,`import ${name} from './${name}'\n`+fs.readFileSync(`./src/router/map/index.js`).toString().trim().slice(0,-1)+`  ...${name},\n]`)
  readline.close();
})