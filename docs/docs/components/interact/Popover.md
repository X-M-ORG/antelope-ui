# Popover 弹出口

用于礼盒道具的基本显示和内容显隐控制，常用于查看某个宝箱/盒子的奖品内容。

---

### Props

- 混合：[组件混合表](docs/components/mixins/Components.md)
- 自有：

| name         | type   | require | default | desc                                                          |
| ------------ | ------ | ------- | ------- | ------------------------------------------------------------- |
| content-attr | Object | false   |         | 常规内容的传递参数，同 a-section 的传递参数，暂不支持绑定事件 |
| popover-attr | Object | false   |         | 弹出内容的传递参数，同 a-section 的传递参数，暂不支持绑定事件 |

### Slot

存在两个 slot：

- content 常规内容，比如宝箱的 UI
- popover 弹出内容，比如显示宝箱的内容有哪些

### 示例

<vuep template="#example" :options="{ theme: 'neo' }"></vuep>

<script v-pre type="text/x-template" id="example">
<template>
  <a-section w="250px" h="200px" bg-c="#ddd">
    <a-popover>
      <a-section slot="content" bg-c="red">content</a-section>
      <a-section slot="popover">popover</a-section>
    </a-popover>
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
