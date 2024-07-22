const fs = require('fs');
const path = require('path');

// 匹配 style 的正则
const regStyle = /<style>[\s\S]*<\/style>/g;

// 匹配 script 的正则
const regScript = /<script>[\s\S]*<\/script>/g;

fs.readFile(path.join(__dirname,'./index.html'), 'utf-8', (err, data) => {
  if (err) return console.log("读取文件失败：" + err.message);
  resolveCss(data);
  resolveScript(data);
  resolveHtml(data);
})

const resolveCss = (data) => {
  const newCSS  = regStyle.exec(data)[0].replace('<style>', '').replace('</style>', '');
  fs.writeFile(path.join(__dirname, 'index.css'), newCSS, (err, data) => {
    if (err) return console.log(err.message);
    console.log("写入 css 样式成功");
  })
}

const resolveScript = (data) => {
  const newJS  = regScript.exec(data)[0].replace('<script>', '').replace('</script>', '');
  fs.writeFile(path.join(__dirname, 'index.js'), newJS, (err, data) => {
    if (err) return console.log(err.message);
    console.log("写入 script 样式成功");
  })
}

const resolveHtml = (data) => {
  const newHTML  = data.replace(regStyle, '<link href="./index.css" rel="stylesheet" />').replace(regScript, '<script src="./index.js"></script>');
  fs.writeFile(path.join(__dirname, 'index02.html'), newHTML, (err, data) => {
    if (err) return console.log(err.message);
    console.log("写入 html 样式成功");
  })
}