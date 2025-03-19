// 导入 createI18n 函数用于创建 i18n 实例
import { createI18n } from 'vue-i18n'

// 导入不同语言的消息文件
import zhCn from './zh-Cn'
import zhTw from './zh-tw'
import en from './en'

// 创建 i18n 实例
const vueI18n = createI18n({
  legacy: false, // 使用 Composition API 模式
  locale: 'zh-CN', // 设置默认语言
  messages: {
    'zh-CN': {
      hello: '你好',
      ...zhCn, // 合并 zh-CN 语言的消息
    },
    'zh-TW': {
      hello: '你好',
      ...zhTw, // 合并 zh-Tw 语言的消息
    },
    'en': {
      hello: 'hello',
      ...en, // 合并 en 语言的消息
    }
  }
})

// 导出 i18n 实例
export default vueI18n;