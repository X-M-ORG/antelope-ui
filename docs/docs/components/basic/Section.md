# Section 流体块

流体块，即最基本的模块，可以用来替代 div 以触发 a-tap 事件。

---

### Props

- 混合：[组件混合表](docs/components/mixins/Components.md)
- 自有：无

### 示例

<vuep template="#example" :options="{ theme: 'neo' }"></vuep>

<script v-pre type="text/x-template" id="example">
<template>
  <a-section w="100px" h="100px" bg-c="red">
    <a-section w="50px" h="50px" bg-c="yellow" @a-tap="sayHello">
      哈喽~
    </a-section>
  </a-section>
</template>

<script>
  export default {
    methods: {
      sayHello() {
        alert('Hello!')
      }
    }
  }
</script>
</script>
