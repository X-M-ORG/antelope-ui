# Tabs 标签页

标签，控制不同内容显示。

---

### Props

- 混合：[组件混合表](docs/components/mixins/Components.md)
- 自有：

| name   | type               | require | default | desc                 |
| ------ | ------------------ | ------- | ------- | -------------------- |
| active | String             | false   |         | 激活的 slot name     |
| items  | Array\<slot name\> | false   | []      | slot name 名称的数组 |

### 示例

<vuep template="#example" :options="{ theme: 'neo' }"></vuep>

<script v-pre type="text/x-template" id="example">
<template>
  <a-section w="250px" h="200px" bg-c="#ddd">
    <a-section @a-tap="tabActive = 'tab1'">切换至 tab1</a-section>
    <a-section @a-tap="tabActive = 'tab2'">切换至 tab2</a-section>

    <a-tabs :active="tabActive" :items="['tab1', 'tab2']">
      <a-section slot="tab1" bg-c="red">tab1</a-section>
      <a-section slot="tab2" bg-c="blue">tab2</a-section>
    </a-tabs>
  </a-section>
</template>

<script>
  export default {
    data() {
      return {
        tabActive: 'tab1'
      }
    }
  }
</script>
</script>
