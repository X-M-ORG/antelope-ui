# Scroll 滚动块

滚动块，一般用于长列表，封装了 better-scroll，新增了一些特性

!> 此组件依赖 npm 包：better-scroll

---

### Props

- 混合：[组件混合表](docs/components/mixins/Components.md)
- 自有：

| name           | type   | require | default                                          | desc                                                                                              |
| -------------- | ------ | ------- | ------------------------------------------------ | ------------------------------------------------------------------------------------------------- |
| options        | object | false   | { probeType: 2, bounce: false, momentum: false } | 初始化参数，[官方文档](https://better-scroll.github.io/docs/zh-CN/guide/base-scroll-options.html) |
| expand-options | object | false   | {}                                               | 拓展参数，对于封装的功能用到的                                                                    |

**expand-options object：**

| name   | type   | require | default | desc                                                   |
| ------ | ------ | ------- | ------- | ------------------------------------------------------ |
| coming | number | false   | 200     | 滚动时，将到到达时顶部和底部时的一个判断阈值，下面详解 |

### Event

可以使用 better-scroll 所有的事件，[官方文档](http://ustbhuangyi.github.io/better-scroll/doc/events.html)

封装了两个自定义的：

| name          | desc                 |
| ------------- | -------------------- |
| coming-top    | 将要滚动至顶部时触发 |
| coming-bottom | 将要滚动至底部时触发 |

> 这个触发的阈值为 expandOptions.coming ，一般使用默认值就行

> 触发上述两个事件时，将执行相应函数，若执行函数返回 Promise，则会在异步函数执行后再触发，一般为加载列表的更多信息

### 示例

<vuep template="#example" :options="{ theme: 'neo' }"></vuep>

<script v-pre type="text/x-template" id="example">
<template>
  <div>
    <a-scroll w="300px" h="200px" style="border: solid 1px #ddd" @coming-bottom="onComingBottom()">
      <div v-for="i in 100">{{ i }}</div>
    </a-scroll>
  </div>
</template>

<script>
  export default {
    methods: {
      onComingBottom() {
        console.log('on-coming-bottom')
      }
    }
  }
</script>
</script>
