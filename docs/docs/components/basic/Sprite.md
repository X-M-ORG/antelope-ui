# Sprite 雪碧图

雪碧图，又叫精灵图，一张图片通过修改定位来显示不同部分。

---

### Props

- 混合：[组件混合表](docs/components/mixins/Components.md)
- 自有：

| name | type   | require | default | desc         |
| ---- | ------ | ------- | ------- | ------------ |
| x    | String | false   |         | x 轴偏移数值 |
| y    | String | false   |         | y 轴偏移数值 |

### 图片

![confirm](https://x-m-org.github.io/antelope-ui/docs/components/basic/static/num.png)

### 示例

<vuep template="#example" :options="{ theme: 'neo' }"></vuep>

<script v-pre type="text/x-template" id="example">
<template>
  <div style="background-color: red">
    <a-sprite w="56px" h="45px" v-for="i in 10" :key="i" :x="-((i - 1) * 60) + 'px'" bg-i="https://x-m-org.github.io/antelope-ui/docs/components/basic/static/num.png"></a-sprite>
  </div>
</template>

<script>
  export default {}
</script>
</script>
