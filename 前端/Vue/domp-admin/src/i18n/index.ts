import {createI18n} from 'vue-i18n'
import Cookies from 'js-cookie'
import zhCNLocale from 'element-plus/es/locale/lang/zh-cn'
import zhTWLocale from 'element-plus/es/locale/lang/zh-tw'
import enLocale from 'element-plus/es/locale/lang/en'
import zhCN from './zh-CN.ts'
import zhTW from './zh-TW.ts'
import enUS from './en-US.ts'

export const messages = {
  'zh-CN': {
    _lang: '简体中文',
    ...zhCN,
    ...zhCNLocale
  },
  'zh-TW': {
    _lang: '繁體中文',
    ...zhTW,
    ...zhTWLocale
  },
  'en-US': {
    _lang: 'English',
    ...enUS,
    ...enLocale
  }
};

const i18n: any = createI18n ({
  locale: Cookies.get ('language') || 'zh-CN',
  messages
});

export default i18n