# 基础属性

基础属性是所有组件都存在的属性。

---

## Props

| name             | type    | require | default | desc                                 |
| ---------------- | ------- | ------- | ------- | ------------------------------------ |
| width            | String  | false   |         | 元素宽，不传值或留空则为默认宽度     |
| height           | String  | false   |         | 元素高，不传之或留空则由内部元素撑高 |
| background-color | String  | false   |         | 背景色，同 css 写法                  |
| background-image | String  | false   |         | 背景图，图片路径，下面重点说明       |
| disabled         | Boolean | false   | false   | 是否禁用状态，下面重点说明           |

### background-image

请先阅读此文档来理解图片挂载： [开发准备](docs/require/beforeReady.md)

此属性传值，无需全部路径，传递值为该页面设定的资源目录下的路径路径，例如：

- 设置页面资源路径为：@/img/abc

| 资源路径                | 传值          |
| ----------------------- | ------------- |
| @/img/abc/aaaaaa/1.png  | aaaaaa/1.png  |
| @/img/abc/bbb.png       | bbb.png       |
| @/img/abc/a/b/c/d/1.png | a/b/c/d/1.png |
| ...                     | ...           |

### disabled

是否禁用状态，为 true 时，执行以下操作：

- 若组件存在 background-image 属性，则图片名会追加 .disabled，如：aaaa.disabled.png
- 将不再触发 a-tap 事件
- Button touch 时背景图不再偏移
