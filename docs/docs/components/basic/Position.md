# Position 定位块

Position 和 Section 没有什么大的区别，唯一的区别是它默认启动 position 模式。

---

### Props

- 混合：[组件混合表](docs/components/mixins/Components.md)
- 自有：

| name     | type   | require | default  | desc                   |
| -------- | ------ | ------- | -------- | ---------------------- |
| position | String | false   | absolute | 默认开启 position 模式 |

### 示例

<vuep template="#example" :options="{ theme: 'neo' }"></vuep>

<script v-pre type="text/x-template" id="example">
<template>
  <a-section w="400px" h="300px" bg-c="red">
    <a-position pt="20px" pl="20px" w="60px" h="60px" bg-c="yellow">上20px.左20px</a-position>

    <a-position pt="50px" pc="x" w="60px" h="60px" bg-c="black">上50px.水平居中</a-position>

    <a-position pl="20px" pc="y" w="60px" h="60px" bg-c="white">左20px.垂直居中</a-position>

    <a-position pc w="60px" h="60px" bg-c="blue">垂直水平</a-position>

    <a-section pl="20px" pb="20px" w="60px" h="60px" bg-c="orange">左20px.下20px</a-section>
  </a-section>
</template>

<script>
  export default {}
</script>
</script>
