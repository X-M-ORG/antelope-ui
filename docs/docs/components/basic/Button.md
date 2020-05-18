# Button 按钮

按钮，常用的组件，活动中经常需要点击效果，由它来实现。

---

### Props

- 混合：[组件混合表](docs/components/mixins/Components.md)
- 自有：

| name   | type   | require | default | desc                        |
| ------ | ------ | ------- | ------- | --------------------------- |
| move-x | String | false   |         | touch 时，背景图 x 轴偏移量 |
| move-y | String | false   |         | touch 时，背景图 y 轴偏移量 |

### 示例

按钮的背景图，应该是一个精灵图，以避免点击时加载两张图的闪烁，例如：

![confirm](./static/confirm.png)

默认是未点击状态，点击后为点击状态，设置偏移量以及可以实现点击效果。

### 示例

<vuep template="#example" :options="{ theme: 'neo' }"></vuep>

<script v-pre type="text/x-template" id="example">
<template>
  <div>
    <a-button w="422px" h="143px" bg-i="/docs/components/basic/static/confirm.png" move-x="-426px"></a-button>
  </div>
</template>

<script>
  export default {}
</script>
</script>
