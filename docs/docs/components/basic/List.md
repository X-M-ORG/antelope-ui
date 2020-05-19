# List 列表块

因为移动端的滚动会出现滚动条，所以使用用此组件来消除滚动条。

---

### Props

- 混合：[组件混合表](docs/components/mixins/Components.md)
- 自有：

| name      | type   | require | default | desc     |
| --------- | ------ | ------- | ------- | -------- |
| direction | String | false   | y       | 滚动方向 |

### Event

| name       | desc             |
| ---------- | ---------------- |
| scroll-end | 滚动到最后时触发 |

### 示例

```html
<a-list height="6rem" width="3rem">
  <a-section
    height="12rem"
    width="3rem"
    background-image="rule.png"
  ></a-section>
</a-list>
```
