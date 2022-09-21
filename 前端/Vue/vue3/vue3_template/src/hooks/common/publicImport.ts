import useCommonStore from "@/store/common";
import useGlobalStore from "@/store/global";
import { storeToRefs } from "pinia";
import useCurrentInstance from "@/common/js/useCurrentInstance";
export function publicImport() {
    const commonStore = useCommonStore();
    const globalStore = useGlobalStore();
    const { proxy } = useCurrentInstance(); // 获取当前实例
    return { commonStore, globalStore, storeToRefs, proxy };
}
