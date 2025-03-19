// 手动声明模块以解决类型问题
declare module '@element-plus/icons-vue' {
  const icons: Record<string, import('vue').Component>;
  export default icons;
}