# 准备

尽管我是尽可能减少重复代码的复用，但是因为本人技术能力及某些特性，无法进行抽离，所以需要做一些准备。

---

## 图片资源

在没有合适的方案前，图片资源需要预先引用，生成 aImagesMap 对象挂载于 this.\$route.meta 上。

- 示例代码：

```js
import bg3 from '@/img/bg3.png'

const route = {
  path: '/xxxxx',
  component: () => import('./index'),
  meta: {
    // ...some params

    aImagesMap: {
      'bg1.png': require('@/img/bg1.png'),
      'bg2.png': () => import('@/img/bg2.png'),
      'bg3.png': bg3
    }
  }
}
```

当资源多的时候很麻烦，所以提供一个辅助方法：antelope.utils.getImagesMap

示例代码：

```js
import antelope from 'antelope-ui'

const route = {
  path: '/xxxxx',
  component: () => import('./index'),
  meta: {
    // ...some params

    aImagesMap: antelope.utils.getImagesMap(
      require.context('@/img/', true, /.*/)
    )
  }
}
```

这样，就可以在框架组件上使用 background-image 属性。

当然，background-image 也可以直接传 url 链接。

---

## SVGA 资源

目前 svga 资源不支持本地加载，所以需要先上传到 cdn 上，使用 url 链接。
