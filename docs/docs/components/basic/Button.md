# Button 按钮

按钮，常用的组件，活动中经常需要点击效果，由它来实现。

---

### Props

- 混合：[组件混合表](docs/components/mixins/Components.md)
- 自有：

| name      | type           | require | default | desc                        |
| --------- | -------------- | ------- | ------- | --------------------------- |
| move-x    | String         | false   |         | touch 时，背景图 x 轴偏移量 |
| move-y    | String         | false   |         | touch 时，背景图 y 轴偏移量 |
| direction | String         | false   | x       | 偏移方向                    |
| space     | String、Number | false   | 6       | 两种状态的间隔              |

### 定位方式

按钮的背景图，应该是一个精灵图，以避免点击时加载两张图的闪烁，例如：

![confirm](./static/confirm.png)

所以提供两种定位方式：

- 1、设置宽高和偏移量
- 2、设置偏移方向和两种状态的间隔（推荐）

> 方法 2 会自动加载宽高，很方便，建议食用

### 示例

<vuep template="#example" :options="{ theme: 'neo' }"></vuep>

<script v-pre type="text/x-template" id="example">
<template>
  <div>
    <a-button w="422px" h="143px"  move-x="-426px" bg-i="/docs/components/basic/static/confirm.png"></a-button>

    <!-- 默认x轴间隔5px -->
    <a-button bg-i="/docs/components/basic/static/confirm.png"></a-button>
  </div>
</template>

<script>
  export default {}
</script>
</script>
