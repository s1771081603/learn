import { defineStore } from "pinia";

const useCommonStore = defineStore({
  id: "common",
  state: () => {
    return {
      showLoading: false,
      loadingText: "请稍候...",
      loadingCount: 0,
      showLogin: false,
      isLogin: false,
      loginServerNumber: "",
       // 4G取号相关  start
      letLoginPop: false,
      letLoginPhone: "",
      showAutoLoginBtn:false,
       // 4G取号相关  end
      openTag:true //是否能使用微信开放标签 （需要的话可以根据这个提示它升级微信）
    };
  },
  getters: {},
  actions: {
    showLoadingPop(flag: boolean,errFlag?:boolean) {
      if (flag === false) {
        if(errFlag){
          this.loadingCount = 0;
        }else{
          this.loadingCount --;
        }
        if(this.loadingCount === 0){
          this.loadingText = "请稍候...";
          this.showLoading = false;
        }
      }else{
        this.loadingCount ++;
        this.showLoading = true;
      }
    },
    showLoginPop(flag: boolean) {
      this.showLogin = flag;
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
    // 4G取号相关  start
    showLetLoginPop(flag:boolean) {
      this.letLoginPop = flag;
    },
    setLetLoginPhone(phone:string) {
      this.letLoginPhone = phone;
    },
    showLetBtn(flag:boolean) {
      this.showAutoLoginBtn = flag;
    },
    // 4G取号相关  end
    setOpenTag(flag:boolean){
      this.openTag = flag
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
export default useCommonStore;