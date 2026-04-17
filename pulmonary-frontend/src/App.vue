<template>
  <div>
    <el-menu mode="horizontal" router>
      <el-menu-item index="/">首页</el-menu-item>
      <el-menu-item index="/history">历史病例</el-menu-item>
    </el-menu>
    <!-- 路由匹配到的组件会显示在这里 -->
    <router-view />
  </div>
</template>

<script setup>
// 这里暂时不需要写额外逻辑，因为菜单使用了 router 属性，
// 会自动根据 index 跳转路由
</script>

<style>
/* 你可以在这里添加一些全局样式，比如让菜单固定在顶部等 */
body {
  margin: 0;
  font-family: 'Helvetica Neue', Helvetica, 'PingFang SC', 'Hiragino Sans GB',
    'Microsoft YaHei', '微软雅黑', Arial, sans-serif;
}
</style>