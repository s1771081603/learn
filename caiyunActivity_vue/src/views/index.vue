<template>
  <div></div>
</template>
<script>
import utils from "@/utils/utils";

export default {
  name: "index",
  data() {
    return {
      show: true,
    };
  },
  created() {},
  mounted() {
    // 重定向
    let path = utils.getHashQueryString("path");
    if (path) {
      let params = this.getParams();
      this.$router.replace({
        name: path,
        query: params,
      });
    }
  },
  methods: {
    getParams() {
      var globalCons = {};
      try {
        location.search
          .substr(1)
          .split("&")
          .forEach(function(item) {
            var s = item.split("=");
            globalCons[s[0]] = s[1];
          });
      } catch (e) {
        throw new Error(JSON.stringify(location.search));
      }
      if (globalCons.path) {
        delete globalCons.path;
        delete globalCons.token;
        delete globalCons.account;
        delete globalCons.sourceid;
      }
      if (Object.keys(Object.keys(globalCons)).length > 0) {
        return globalCons;
      } else {
        return null;
      }
    },
  },
};
</script>