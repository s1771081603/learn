/* *
* 全局变量
*/
import { defineStore } from 'pinia';

const useGlobalStore = defineStore({
    id: "global",
    state: () => {
      return {
        sourceid:"" as null|string,
        isMp:false,
        isWeiXin:false,
        isApp:false
      };
    },
    getters: {},
    actions: {
        setSourceid(sourceid:null|string) {
            this.sourceid = sourceid;
        },
        setIsMp(flag:boolean) {
            this.isMp = flag;
        },
        setIsWeiXin(flag:boolean) {
            this.isWeiXin = flag;
        },
        setIsApp(flag:boolean) {
            this.isApp = flag;
        }
    },
    // 开启数据缓存
    /*  persist: {
          enabled: true,
          strategies:[
              {
                  storage:localStorage, // 默认为sessionStorage
                  // paths:[],//可以只选某些值做持久化
              }
          ]
      } */
  });
  export default useGlobalStore;