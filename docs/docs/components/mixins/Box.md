# Box

大多数组件都混合了盒子属性。

---

## Props

| name             | quick | type   | require | default | desc                                                            |
| ---------------- | ----- | ------ | ------- | ------- | --------------------------------------------------------------- |
| width            | w     | String | false   |         | 元素宽，不传值或留空则为默认流体的宽度                          |
| height           | h     | String | false   |         | 元素高，不传之或留空则由内部元素撑高                            |
| width-height     | wh    | String | false   |         | 元素宽高，以空格连接，顺序为：宽 高，若仅输入宽，则设置宽高相同 |
| background-color | bg-c  | String | false   |         | 背景色，同 css 写法                                             |
| background-image | bg-i  | String | false   |         | 背景图，下面详述                                                |

> quick 为速写属性，与 name 作用相同

> 2.1.0 版本起，width-height、width、height 可以忽略单位，在[挂载](/docs/guide/Install?id=挂载参数)的时候进行设定相应单位

> 若不对盒子设定宽高，则会依据 background-image 传递的资源大小进行自动计算，在[挂载](/docs/guide/Install?id=挂载参数)的时候进行设定相应参数

### background-image

背景图，同 css 写法。

请先阅读此文档来理解图片挂载： [准备](docs/guide/Ready.md?id=图片资源)

此属性传值，无需全部路径，传递值为该页面设定的资源目录下的路径路径，例如：

- 设置页面资源路径为：@/img/abc

| 资源路径                | 传值          |
| ----------------------- | ------------- |
| @/img/abc/aaaaaa/1.png  | aaaaaa/1.png  |
| @/img/abc/bbb.png       | bbb.png       |
| @/img/abc/a/b/c/d/1.png | a/b/c/d/1.png |
| ...                     | ...           |
