# Slider 滑动块，用于内容的上下滑动显示

滑动块，用于内容的上下滑动显示。

---

## Props

- 混合：[组件混合表](docs/components/mixins/Components.md)
- 自有：

| name     | type           | require | default | desc        |
| -------- | -------------- | ------- | ------- | ----------- |
| value    | String、Number | true    |         | 当前值      |
| duration | Number         | false   | 500     | 滑动时间 ms |

> value 更新后，将滚动到此值

## Slot

无

### 示例

<vuep template="#example" :options="{ theme: 'neo' }"></vuep>

<script v-pre type="text/x-template" id="example">
<template>
  <a-section w="250px" h="200px" bg-c="#ddd">
    <a-slider pl="0" pt="0" w="100px" h="50px" :value="value"></a-slider>
  </a-section>
</template>

<script>
  export default {
    data() {
      return {
        value: 0
      }
    },

    mounted() {
      setInterval(()=> {
        this.value++
      }, 1000)
    }
  }
</script>
</script>
