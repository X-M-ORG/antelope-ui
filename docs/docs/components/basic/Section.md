# Section 流体块

流体块，即最基本的模块，可以用来替代 div 以触发 a-tap 事件。

---

### Props

- 混合：[组件混合表](docs/components/mixins/Components.md)
- 自有：无

### 示例

```html
<a-section
  width="7.5rem"
  height="4rem"
  background-color="#ffffff"
  background-image="bg.png"
  @a-tap="tapEvent()"
>
  <a-section @a-tap="tap()">点我</a-section>
</a-section>
```
