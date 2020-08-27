# Avatar 头像块

因为活动中的头像都会进行通用处理，所以此组件以处理通用代码

---

### Props

- 混合：无
- 自有：

| name         | type   | require | default | desc                                                        |
| ------------ | ------ | ------- | ------- | ----------------------------------------------------------- |
| frame        | String | false   |         | 头像框的地址，支持 svga，地址的协议会转换成功当前站点的协议 |
| frame-params | Object | false   |         | 设置头像框的一些属性                                        |

!> 虽然无混合属性，但其由 Section 组件实现，可以传递 Section 支持的参数

### 挂载配置

此组件支持挂载时参数配置：onTapAvatar，此函数会在组件 tap 时触发

```js
Vue.use(antelope, {
  imageSizeAutoLoader: true,
  imageSizeUnit: 'rem',
  imageTimes: 0.01,

  onTapAvatar: ($attrs) => {
    // do some code ...
  }
})
```

!> onTapAvatar 的参数为使用 Avatar 组件时传递的 \$attrs

当 Avatar 定义 @a-tap，会忽略 onTapAvatar 的执行，而自定义的 a-tap 函数接收两个参数

```js
// a-tap
function aTap($attrs, onTapAvatar) {}
```

### 示例

**install**

```js
Vue.use(antelope, {
  onTapAvatar: ($attrs) => {
    console.log('onTapAvatar - $attrs', $attrs)
  }
})
```

**vue**

<vuep template="#example" :options="{ theme: 'neo' }"></vuep>

<script v-pre type="text/x-template" id="example">
<template>
  <div>
    <a-avatar w="100px" h="100px" bg-c="blue"></a-avatar>
    <a-avatar w="100px" h="100px" bg-c="red" @a-tap="test"></a-avatar>
  </div>
</template>

<script>
  export default {
    methods: {
      test($attrs, onTapAvatar) {
        // log: { w: '100px', h: '100px', 'bg-c': 'red' }
        console.log($attrs)

        // log: onTapAvatar - $attrs { w: '100px', h: '100px', 'bg-c': 'red' }
        onTapAvatar($attrs)
      }
    }
  }
</script>
</script>
