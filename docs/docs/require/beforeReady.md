# 开发准备

尽管我是尽可能减少重复代码的复用，但是因为本人技术能力及某些特性，无法进行抽离，所以需要做一些准备。

---

## 图片资源

在没有合适的方案前，图片资源需要预先引用，生成 aImagesMap 对象挂载于 this.\$route.meta 上。

示例代码：

```js
function getImagesMap() {
  let filesPath = require.context('此处替换图片路径', true, /.*/)
  return filesPath.keys().reduce((map, name) => {
    map[name.replace('./', '')] = filesPath(name)
    return map
  }, {})
}

const route = {
  path: '/xxxxx',
  component: () => import('./index'),
  meta: {
    // ...some params

    aImagesMap: getImagesMap()
  }
}
```

> 将 getImagesMap 中的 "此处替换图片路径" 替换成页面的图片资源路径，例如：@/img/xxxx

这样，就可以在框架组件上使用 background-image 属性。
