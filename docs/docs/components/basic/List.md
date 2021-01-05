# List 列表块

因为移动端的滚动会出现滚动条，所以使用用此组件来消除滚动条。

---

### Props

- 混合：[组件混合表](docs/components/mixins/Components.md)
- 自有：

| name      | type    | require | default | desc                 |
| --------- | ------- | ------- | ------- | -------------------- |
| direction | String  | false   | y       | 滚动方向             |
| nested    | Boolean | false   | false   | 是否是嵌套的滚动区域 |

> 启用 nested 后，当滚动到顶部/底部区域后，将自动释放 touchmove 的 preventDefault，以启用外层的滚动

!> 设计时，请尽量避免嵌套的滚动区域，因为会有不确定的 bug。

### 示例

```html
<a-list height="6rem" width="3rem">
  <a-section height="12rem" width="3rem" background-image="rule.png"></a-section>
</a-list>
```
