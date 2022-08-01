let timer: number | null = null;
let scrollTop: number = 0;
export default {
    mounted(el, binding) {
        el.addEventListener("focus", () => {
            if (timer) {
                clearTimeout(timer);
                timer = null;
            }
            scrollTop = window.pageYOffset;
            el.addEventListener("blur", delayHandle);
        });
        function handle() {
            window.scrollTo(0, scrollTop); //回滚到前面读取的位置
            el.removeEventListener("blur", delayHandle); //滚完了再删除
            // 需要注意的是，EventListener可以多次添加同一事件，如果不删除就会累加调用的次数
        }
        function delayHandle() {
            timer = setTimeout(() => {
                handle();
                if(timer){
                    clearTimeout(timer);
                    timer = null;
                }
            }, 100);
            el.removeEventListener("blur", delayHandle);
        }
    },
};
