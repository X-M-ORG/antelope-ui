# Svga 道具块

我们活动中经常会用到 svga 资源，每次写加载方法太麻烦，所以此组件用来加载 svga。

!> 此组件依赖 npm 包：svga.lite

---

### Props

- 混合：[组件混合表](docs/components/mixins/Components.md)
- 自有：

| name     | type    | require | default | desc                                 |
| -------- | ------- | ------- | ------- | ------------------------------------ |
| url      | String  | true    |         | svga 资源的 url 地址，不支持本地文件 |
| autoplay | Boolean | false   | true    | 是否自动加载                         |

### 自定义功能

若有自定义的功能，可以设置 autoplay: false，使用 ref 获取到该组件，通过 player 去进行操作。

例如：

```html
<a-svga ref="svga" url="xxx" :autoplay="false"></a-svga>
```

```js
const { player, svgaData } = this.$refs.svga

/**
 * 初始化已经挂载过 svgaData，但可以对 svgaData 进行修改再次挂载，以达到动态素材的效果
 * 如果不需要修改，这两行代码是不需要的
 */
svgaData.images[key] = '某个图片'
await player.mount(svgaData)

player
  // 开始动画事件回调
  .$on('start', () => console.log('event start'))
  // 暂停动画事件回调
  .$on('pause', () => console.log('event pause'))
  // 停止动画事件回调
  .$on('stop', () => console.log('event stop'))
  // 动画结束事件回调
  .$on('end', () => console.log('event end'))
  // 清空动画事件回调
  .$on('clear', () => console.log('event clear'))
  // 动画播放中事件回调
  .$on('process', () => console.log('event process', player.progress))

// 开始播放动画
player.start()

// 暂停播放动画
// player.pause()

// 停止播放动画
// player.stop()

// 清空动画
// player.clear()
```

player 的 api 参考：[svga.lite 官方文档](https://github.com/svga/SVGAPlayer-Web-Lite)

### 示例

<vuep template="#example" :options="{ theme: 'neo' }"></vuep>

<script v-pre type="text/x-template" id="example">
<template>
  <a-section w="250px" h="200px" bg-c="#ddd">
    <a-svga pl="0" pt="0" w="100px" h="100px" url="https://svga.io/assets/svga/index-response.svga"></a-svga>
    <a-svga pr="0" pt="0" w="100px" h="100px" url="https://svga.io/assets/svga/index-response.svga"></a-svga>
  </a-section>
</template>

<script>
  export default {}
</script>
</script>
