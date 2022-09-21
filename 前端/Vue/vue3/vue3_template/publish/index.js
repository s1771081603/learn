const ora = require('ora')
const chalk = require('chalk')

var EventEmitter = require('events').EventEmitter; 
const fs = require('fs')
const path = require('path')
const superagent = require('superagent');
const JSEncrypt = require('nodejs-jsencrypt').default;

var event = new EventEmitter(); 
let spinner = null

const LOGIN_PUBLIC_KEY = 'MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQCMvVdLjn+eVYkNEx5HUmMcmOkXwLh9AOAcMdiPYE9Bga/JLURX87xnDHT5cbIso6ySnVvogN5s8TABFkpzsPt2ClyBizLrBilGpZJ5FPv8belNAGqqMQCicBZ0Lt4gW+wzb0yoPsSbrr0l7d9WdnTAqe6+3CIQGtVPS/Bv4isuxwIDAQAB';

const loginData = {
    username: 'moguangyong',
    password: '123456',
    code: '1',
    timestamp: '',
}

let token = ''

const encrypt = (encryptData) => {
    let jsEncrypt = new JSEncrypt();
    jsEncrypt.setPublicKey(LOGIN_PUBLIC_KEY);
    return {
        data: jsEncrypt.encrypt(JSON.stringify(encryptData))
    };
};

// 获取文件大小
const getFileSize = (url) => {
    return new Promise((resolve, reject) => {
        fs.stat(path.join(__dirname, url), async (err, stats) => {
            if (err) {
                event.emit('error',new Error(err));
                reject(err)
                return
            }
            //可以访问 `stats` 中的文件属性
            resolve(stats.size)
        })
    })
}

// 初始化操作
const init = () => {
    // spinner = ora('正在发布到测试服务器...')
    spinner = ora('正在发布到测试服务器...\n').start()
    superagent
        .get('http://wap1.caiyun.feixin.10086.cn/cy201906aq/common/timestamp.do')
        .end(async (err, res) => {

            loginData.timestamp = res.body.result.timestamp;
            // console.log(loginData)
            const data = encrypt(loginData)
            // console.log(data.data)
            token = await login(data)

            spinner.text = '登录成功....';

            const size = await getFileSize('../portal.zip')

            spinner.text = '开始预部署....';

            const res01 = await deploy({
                https: false,
                fileName: 'portal.zip',
                length: size,
            })

            // console.log('==============================', res01)
            const redirectionUrl = res01.uploadResult.redirectionUrl;
            spinner.text = '开始上传文件....';
            await upload(redirectionUrl)
            spinner.text = '上传文件成功，开始正式部署....';
            const res02 = await finishDeploy(res01.uploadResult.newContentIDList[0].newContent);
            spinner.stop()
            console.log(chalk.green(chalk.hex("#a54af7").bold('***************** 测试线部署成功 ******************')))
            

        })
}

// 登录操作
const login = (data) => {
    return new Promise((resolve, reject) => {
        superagent
            .post(`http://wap1.caiyun.feixin.10086.cn/cy201906aq/admin/auth/login.do`)
            // .set('Accept-Language', 'zh-CN,zh;q=0.9,en-US;q=0.8,en;q=0.7')
            // .set('Accept', '*/*')
            // .set('Referer', 'http://wap1.caiyun.feixin.10086.cn')
            // .set('User-Agent', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/103.0.0.0 Safari/537.36')
            .query(`data=${encodeURIComponent(data.data)}`)
            .end((err, res) => {
                // console.log(res.body)                
                if (res.body.code == 0) {                    
                    // console.log(chalk.green(chalk.hex("#a54af7").bold('登录成功')))
                    resolve(res.body.result.token)
                } else {
                    event.emit('error',new Error(res.body.msg));
                    // throw new Error(res.body.msg)
                }

            })
    })

}

// 前部署操作
const deploy = (data) => {
    return new Promise((resolve) => {
        superagent
            .post(`http://wap1.caiyun.feixin.10086.cn/cy201906aq/admin/ose/upload/deployUpload.do`)
            .send(data)
            .set('Authorization', token)
            .end((err, res) => {
                if (res.body.code == 0) {
                    // console.log(chalk.green(chalk.hex("#a54af7").bold('预部署成功')))
                    resolve(res.body.result)
                } else {
                    event.emit('error',new Error(res.body.msg));
                    // throw new Error(res.body.msg)
                }

            })
    })

}

// 上传操作
const upload = (url) => {
    return new Promise((resolve, reject) => {
        superagent
            .post(url)
            .type('form')
            .set('Authorization', token)
            .accept('application/json')
            .field('file', fs.createReadStream(path.join(__dirname, `../portal.zip`)))
            .end((err, res) => {
                if (err) {
                    event.emit('error',new Error(err));
                    reject(err)
                    return
                }
                // console.log(chalk.green(chalk.hex("#a54af7").bold('上传文件成功')))
                resolve()
            })
    })

}

// 最终部署操作
const finishDeploy = (data) => {
    return new Promise((resolve) => {
        superagent
            .post(`http://wap1.caiyun.feixin.10086.cn/cy201906aq/admin/ose/upload/deploy.do`)
            .send(data)
            .set('Authorization', token)
            .end((err, res) => {
                if (res.body.code == 0) {
                    // console.log(chalk.green(chalk.hex("#a54af7").bold('部署测试线成功')))
                    resolve()
                } else {
                    event.emit('error',new Error(res.body.msg));
                    // throw new Error(res.body.msg)
                }

            })
    })

}

event.on('error', function(err){
    throw err
 });

module.exports = { init };