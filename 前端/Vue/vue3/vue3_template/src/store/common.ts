import { defineStore } from "pinia";

const useCommonStore = defineStore({
  id: "common",
  state: () => {
    return {
      showLoading: false,
      showLogin: false,
      loginServerNumber: "",
      isLogin: false,
      loadingText: "请稍候...",
    };
  },
  getters: {},
  actions: {
    showLoadingPop(flag: boolean) {
      this.showLoading = flag === false ? false : true;
      if (flag === false) {
        this.loadingText = "请稍候...";
      }
    },
    showLoginPop(flag: boolean) {
      this.showLogin = flag === false ? false : true;
    },
    setPhone(value: string) {
      this.loginServerNumber = value;
    },
    setLoginState(value: boolean) {
      this.isLogin = value;
    },
    setLoadingText(value: string) {
      this.loadingText = value;
    },
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
export default useCommonStore;