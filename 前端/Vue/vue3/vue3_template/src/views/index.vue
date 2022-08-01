<template>
    <div>

    </div>
</template>
<script lang="ts" setup>
import utils from '@/common/js/utils'
import { onMounted } from 'vue'
import useCurrentInstance from "@/common/js/useCurrentInstance";
const { proxy } = useCurrentInstance();
onMounted(() => {
    let path = utils.getHashQueryString('path')
    if (path) {
        let params = getParams();
        console.log(params);
        proxy.$router.replace(
            {
                name: path,
                query: params
            })
    }
})

function getParams() {
    var globalCons:any = {};
    try {
        location.search.substr(1).split('&').forEach(function (item) {
            var s = item.split('=');
            globalCons[s[0]] = s[1];
        });
    } catch (e) {
        throw new Error(JSON.stringify(e));
    }
    console.log(globalCons)
    if (globalCons.path) {
        delete globalCons.path
        delete globalCons.token
        delete globalCons.account
        delete globalCons.sourceid
    }
    if (Object.keys(Object.keys(globalCons)).length > 0) {
        return globalCons;
    } else {
        return null
    }
}
</script>

