# Svga 道具块

我们活动中经常会用到 svga 资源，每次写加载方法太麻烦，所以此组件用来加载 svga。

!> 此组件依赖 npm 包：svga.lite

---

### Props

- 混合：[组件混合表](docs/components/mixins/Components.md)
- 自有：

| name     | type    | require | default | desc                                                    |
| -------- | ------- | ------- | ------- | ------------------------------------------------------- |
| url      | String  | true    |         | svga 资源的 url 地址，支持本地文件，同 background-image |
| autoplay | Boolean | false   | true    | 是否自动加载                                            |
| params   | Object  | false   | {}      | svga player 的参数                                      |

### 自定义功能

若有自定义的功能，可以设置 autoplay: false，使用 ref 获取到该组件，通过 player 去进行操作。

例如：

```html
<a-svga ref="svga" url="xxx" :autoplay="false"></a-svga>
```

player 的 api 参考：[svga.lite 官方文档](https://github.com/svga/SVGAPlayer-Web/blob/master/README.zh.md)

### 示例

<vuep template="#example" :options="{ theme: 'neo' }"></vuep>

<script v-pre type="text/x-template" id="example">
<template>
  <a-section w="250px" h="200px" bg-c="#ddd">
    <a-svga pl="0" pt="0" w="100px" h="100px" url="https://x-m-org.github.io/antelope-ui/docs/components/basic/static/demo.svga"></a-svga>
    <a-svga pr="0" pt="0" w="100px" h="100px" url="https://x-m-org.github.io/antelope-ui/docs/components/basic/static/demo.svga"></a-svga>
  </a-section>
</template>

<script>
  export default {}
</script>
</script>
