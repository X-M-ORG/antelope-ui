# Sprite 雪碧图

雪碧图，又叫精灵图，一张图片通过修改定位来显示不同部分。

---

### Props

- 混合：[组件混合表](docs/components/mixins/Components.md)
- 自有：

| name | type   | require | default | desc         |
| ---- | ------ | ------- | ------- | ------------ |
| x    | String | false   |         | x 轴偏移数值 |
| y    | String | false   |         | y 轴偏移数值 |

### 示例

```html
<!-- sprite.png 的每个单位是变长 1rem 的正方形，间距 0.05rem -->
<a-sprite
  width="1rem"
  height="1rem"
  background-image="sprite.png"
  x="0"
></a-sprite>

<a-sprite
  width="1rem"
  height="1rem"
  background-image="sprite.png"
  x="-1.05rem"
></a-sprite>

<a-sprite
  width="1rem"
  height="1rem"
  background-image="sprite.png"
  x="-2.1rem"
></a-sprite>
```
