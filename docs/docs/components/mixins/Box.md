# Box

大多数组件都混合了盒子属性。

---

## Props

| name             | type   | require | default | desc                                   |
| ---------------- | ------ | ------- | ------- | -------------------------------------- |
| width            | String | false   |         | 元素宽，不传值或留空则为默认流体的宽度 |
| height           | String | false   |         | 元素高，不传之或留空则由内部元素撑高   |
| background-color | String | false   |         | 背景色，同 css 写法                    |
| background-image | String | false   |         | 背景图，下面详述                       |

### background-image

背景图，同 css 写法。

请先阅读此文档来理解图片挂载： [准备](docs/require/beforeReady.md)

再请阅读此文档来理解 status 属性对 background-image 的作用： [Status 组件状态](docs/components/mixins/Status.md)

此属性传值，无需全部路径，传递值为该页面设定的资源目录下的路径路径，例如：

- 设置页面资源路径为：@/img/abc

| 资源路径                | 传值          |
| ----------------------- | ------------- |
| @/img/abc/aaaaaa/1.png  | aaaaaa/1.png  |
| @/img/abc/bbb.png       | bbb.png       |
| @/img/abc/a/b/c/d/1.png | a/b/c/d/1.png |
| ...                     | ...           |
