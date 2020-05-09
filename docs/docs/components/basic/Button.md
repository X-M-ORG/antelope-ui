# Button 按钮

按钮，常用的组件，活动中经常需要点击效果，由它来实现。

---

### Props

- 混合：[组件混合表](docs/components/mixins/Components.md)
- 自有：

| name   | type   | require | default | desc                        |
| ------ | ------ | ------- | ------- | --------------------------- |
| move-x | String | false   |         | touch 时，背景图 x 轴偏移量 |
| move-y | String | false   |         | touch 时，背景图 y 轴偏移量 |

### 示例

按钮的背景图，应该是一个精灵图，以避免点击时加载两张图的闪烁，例如：

![confirm](./static/confirm.png)

默认是未点击状态，点击后为点击状态，设置偏移量以及可以实现点击效果。

```html
<!-- btn.png 的宽度是 4.05rem，单个宽度2rem，间距 0.05rem，点击时 x 轴偏移 -2.05rem 到激活状态 -->
<a-button
  width="2rem"
  height="1rem"
  background-image="btn.png"
  move-x="-2.05rem"
  @a-tap="tapEvent()"
>
  去充值
</a-button>
```
