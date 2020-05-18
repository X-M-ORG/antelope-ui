# Svga 道具块

我们活动中经常会用到 svga 资源，每次写加载方法太麻烦，所以此组件用来加载 svga。

!> 此组件依赖 npm 包：svgaplayerweb

---

### Props

- 混合：[组件混合表](docs/components/mixins/Components.md)
- 自有：

| name | type   | require | default | desc                                 |
| ---- | ------ | ------- | ------- | ------------------------------------ |
| url  | String | true    |         | svga 资源的 url 地址，不支持本地文件 |

### 示例

<vuep template="#example" :options="{ theme: 'neo' }"></vuep>

<script v-pre type="text/x-template" id="example">
<template>
  <a-section w="250px" h="200px" bg-c="#ddd">
    <a-svga pl="0" pt="0" w="100px" h="100px" url="https://svga.io/assets/svga/index-response.svga"></a-svga>
    <a-svga pr="0" pt="0" w="100px" h="100px" url="https://svga.io/assets/svga/index-response.svga"></a-svga>
  </a-section>
</template>

<script>
  export default {}
</script>
</script>
