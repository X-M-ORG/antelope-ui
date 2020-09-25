# 准备

尽管我是尽可能减少重复代码的复用，但是因为本人技术能力及某些特性，无法进行抽离，所以需要做一些准备。

---

## 图片资源

在没有合适的方案前，图片资源需要预先引用，使用 require.context 预加载资源并挂载于 data.aImagesMap 上。

- 示例代码：

index.vue

```vue
<script>
export default {
  data() {
    return {
      aImagesMap: require.context('@/img/', true, /.*/)
    }
  }
}
</script>
```

这样，就可以在框架组件上使用 background-image 属性。

当然，background-image 也可以直接传 url 链接。

---

## SVGA 资源

目前 svga 资源不支持本地加载，所以需要先上传到 cdn 上，使用 url 链接。
