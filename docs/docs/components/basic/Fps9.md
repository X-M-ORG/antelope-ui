# Fps9 九帧图

九帧图即背景图片分为九宫格，每一格为一个动画帧。

---

### Props

- 混合：[组件混合表](docs/components/mixins/Components.md)
- 自有：无

> 此组件会自动加载宽高，300\*300 的资源图则设定元素的宽高则是 100\*100

### 示例

<vuep template="#example" :options="{ theme: 'neo' }"></vuep>

<script v-pre type="text/x-template" id="example">
<template>
  <a-section w="250px" h="200px" bg-c="#ddd">
    <a-fps9 bg-i="https://wxflag.afunapp.com/FpagBCGZiUnR32O_DD1Bj3055Lan"></a-fps9>
    <a-fps9 w="50px" h="50px" bg-i="https://wxflag.afunapp.com/FpagBCGZiUnR32O_DD1Bj3055Lan"></a-fps9>
  </a-section>
</template>

<script>
  export default {}
</script>
</script>
