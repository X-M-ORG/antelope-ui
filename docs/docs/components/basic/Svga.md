# Svga 道具块

我们活动中经常会用到 svga 资源，每次写加载方法太麻烦，所以此组件用来加载 svga。

!> 此组件依赖 npm 包：svgaplayerweb

---

### Props

- 混合：[组件混合表](docs/components/mixins/Components.md)
- 自有：

| name | type   | require | default | desc                                 |
| ---- | ------ | ------- | ------- | ------------------------------------ |
| url  | String | true    |         | svga 资源的 url 地址，不支持本地文件 |

### 示例

```html
<a-svga height="1rem" width="1rem" url="xxxx.svga"></a-svga>
```
