/* *
* 获取当前实例
*/
import { ComponentInternalInstance, getCurrentInstance } from 'vue'
export default function useCurrentInstance() {
    const { appContext } = getCurrentInstance() as ComponentInternalInstance
    const proxy = appContext.config.globalProperties
    return {
        proxy
    }
}