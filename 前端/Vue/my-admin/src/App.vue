<script setup lang="ts">
// import { onMounted } from 'vue';
// import { useI18n } from 'vue-i18n';
// import Cookies from 'js-cookie';

// // 定义语言命令的类型
// type LanguageCommand = 'zh-CN' | 'zh-TW' | 'en';

// // 初始化 i18n
// const { t, locale: i18nLocale } = useI18n();

// // 从 Cookie 中获取语言设置
// onMounted(() => {
//   const savedLocale = Cookies.get('locale') as LanguageCommand | undefined;
//   if (savedLocale) i18nLocale.value = savedLocale;
// });

// // 处理语言切换逻辑
// const handleCommand = (command: LanguageCommand) => {
//   i18nLocale.value = command; // 动态切换语言
//   Cookies.set('locale', command); // 将语言设置保存到 Cookie 中
// };
</script>

<template>
  <router-view />
  <div>
    <!-- <el-dropdown trigger="click" @command="handleCommand">
      <span class="el-dropdown-link cursor-pointer color-primary">
        {{ t('common.switchLanguage') }}
        <el-icon class="el-icon--right">
          <arrow-down />
        </el-icon>
      </span>
      <template #dropdown>
        <el-dropdown-menu>
          <el-dropdown-item command="zh-CN">{{ t('common.cn') }}</el-dropdown-item>
          <el-dropdown-item command="zh-TW">{{ t('common.tw') }}</el-dropdown-item>
          <el-dropdown-item command="en">{{ t('common.en') }}</el-dropdown-item>
        </el-dropdown-menu>
      </template>
    </el-dropdown> -->
  </div>
</template>

<style scoped lang="scss">
</style>