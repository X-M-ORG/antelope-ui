# Slider 滑动块，用于内容的上下滑动显示

滑动块，用于内容的上下滑动显示。

---

## Props

- 混合：[组件混合表](docs/components/mixins/Components.md)
- 自有：

| name     | type                     | require | default | desc             |
| -------- | ------------------------ | ------- | ------- | ---------------- |
| value    | String、Number           | true    |         | 当前值           |
| duration | Number                   | false   | 500     | 滑动时间 ms      |
| mode     | String: 'text' or 'slot' | true    | 'text'  | 渲染模式         |
| items    | Array                    | true    | []      | 自定义滑动项名称 |

> value 更新后，将滚动到此值

## Slot

若 mode=slot，则可传递 items ，每一项名为一个 slot，value 修改为 slot 时，将会自动滚动至该 slot。

### 示例

<vuep template="#example" :options="{ theme: 'neo' }"></vuep>

<script v-pre type="text/x-template" id="example">
<template>
  <a-section w="250px" h="200px" bg-c="#ddd">
    <a-slider pl="0" pt="0" w="100px" h="50px" :value="value"></a-slider>

    <a-slider pl="0" pt="100px" w="100px" h="50px" :value="`n${value2}`" :items="['n0','n1','n2','n3','n4','n5','n6','n7','n8','n9']" mode="slot">
      <a-sprite v-for="(n) in 10" :key="n" :slot="`n${n-1}`" w="56px" h="45px" :x="-((n - 1) * 60) + 'px'" bg-i="/antelope-ui/docs/components/basic/static/num.png">
    </a-slider>
  </a-section>
</template>

<script>
  export default {
    data() {
      return {
        value: 0
      }
    },

    computed: {
      value2() {
        return this.value%10
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
