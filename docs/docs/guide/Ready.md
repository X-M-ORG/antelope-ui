# 准备

尽管我是尽可能减少重复代码的复用，但是因为本人技术能力及某些特性，无法进行抽离，所以需要做一些准备。

---

## 图片资源

在没有合适的方案前，图片资源需要预先引用，使用 require.context 预加载资源。

- 示例代码：

index.vue

```vue
<script>
export default {
  assets: require.context('@/img/', true, /.*/),

  data() {
    return {
      // 兼容旧的写法，但建议挂载在根对象上，毕竟资源没必要挂载在 data 上
      // assets: require.context('@/img/', true, /.*/)
    }
  }

  // some code ...
}
</script>
```

这样，就可以在框架组件上使用 background-image 属性。

当然，background-image 也可以直接使用 url 链接。

> 可以在挂载时设置 assetsProperty 自定义字段，默认是 assets，参考：[安装](docs/guide/Install.md#挂载参数)
