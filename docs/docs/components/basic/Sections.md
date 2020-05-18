# Sections 流体块列表

流体块列表，内部一般都是多个流体块，大多用于几块内容的拼接，主要解决大屏幕下的缝隙问题。

---

### Props

- 混合：[组件混合表](docs/components/mixins/Components.md)
- 自有：无

### 示例

<vuep template="#example" :options="{ theme: 'neo' }"></vuep>

<script v-pre type="text/x-template" id="example">
<template>
  <a-sections>
    <a-section w="100px" h="100px" bg-c="red" @a-tap="sayColor('red')"></a-section>
    <a-section w="100px" h="100px" bg-c="yellow" @a-tap="sayColor('yellow')"></a-section>
    <a-section w="100px" h="100px" bg-c="blue" @a-tap="sayColor('blue')"></a-section>
  </a-sections>
</template>

<script>
  export default {
    methods: {
      sayColor(color) {
        alert(color)
      }
    }
  }
</script>
</script>
