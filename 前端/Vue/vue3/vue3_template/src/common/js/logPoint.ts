/* 
*埋点方法
*/
import api from "@/api/common";

interface params {
    optkeyword: string;
    sourceid: string;
    marketName?: string;
    flag?: string | number;
}
export default function logPoint(optkeyword,sourceid,marketName?,flag?) {
    let url = "/portal/journaling";
    let data = {
        module: "uservisit",
        optkeyword: optkeyword,
        sourceid: sourceid,
    } as any;
    if (marketName) {
        data.marketName = marketName;
    }
    if (flag) {
        data.flag = flag;
    }
    api.logPoint(data);
}
