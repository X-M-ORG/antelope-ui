# Button 按钮

按钮，常用的组件，活动中经常需要点击效果，由它来实现。

---

## Props

| name   | type   | require | default | desc                        |
| ------ | ------ | ------- | ------- | --------------------------- |
| move-x | String | false   |         | touch 时，背景图 x 轴偏移量 |
| move-y | String | false   |         | touch 时，背景图 y 轴偏移量 |

## Slot

默认 slot

## 建议

按钮的背景图，应该是一个精灵图，以避免点击时加载两张图的闪烁，例如：

![confirm](./static/confirm.png)

默认是未点击状态，点击后为点击状态，设置偏移量以及可以实现点击效果。
