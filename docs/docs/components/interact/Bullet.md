# Bullet 弹幕

滚动播放的广播、弹幕效果。

---

## Props

| name       | type             | require | default | desc                                                              |
| ---------- | ---------------- | ------- | ------- | ----------------------------------------------------------------- |
| items      | Array            | true    | []      | 弹幕的数组，每一项为弹幕文案                                      |
| item-style | String \| Object | false   |         | 弹幕文案的样式，可以使用内联 style，也可以使用 vue 的 styleObject |
| duration   | String           | false   | '20'    | 弹幕动画时间，并非从出现到消失的时间，可以根据实际效果微调        |
| between    | String           | false   | '50'    | 两个弹幕之间的间隔，区间值用 - ，例如：50-100                     |

## Slot

无

---

> 若 items 更新，则下一个弹幕是新 items 的第一项

> 如果需要关闭弹幕，可以将其挂载在 \$refs 上，调用实例的 endAnimation() 方法停止弹幕
