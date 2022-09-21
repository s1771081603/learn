import { Ref } from "vue";
let timer:number | null = null;
export function useCountDown(time:Ref<number>) {
    if(timer){
        clearInterval(timer);
    }
    timer = setInterval(() => {
        if (time.value <= 0) {
            if(timer){
                clearInterval(timer);
            }
        }else{
            time.value--;
        }
    }, 1000);
}