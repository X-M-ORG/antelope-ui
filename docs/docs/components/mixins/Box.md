# Box

大多数组件都混合了盒子属性。

---

## Props

| name             | quick | type   | require | default | desc                                   |
| ---------------- | ----- | ------ | ------- | ------- | -------------------------------------- |
| template         | tpl   | String | false   |         | 模板名称，下面详述                     |
| width            | w     | String | false   |         | 元素宽，不传值或留空则为默认流体的宽度 |
| height           | h     | String | false   |         | 元素高，不传之或留空则由内部元素撑高   |
| background-color | bg-c  | String | false   |         | 背景色，同 css 写法                    |
| background-image | bg-i  | String | false   |         | 背景图，下面详述                       |

> quick 为速写属性，与 name 作用相同

> 若不对盒子设定宽高，则会依据 background-image 传递的资源大小进行自动计算，在[挂载](/docs/guide/Install?id=挂载参数)的时候进行设定相应参数

### template

通过辅助方法 createdTemplate 可以设定 template 来设定初始化的参数。

比如页面中很多按钮的格式都是一样的，可以设定一个 template，就无需再传递 props 了，看例子：

```html
<template>
  <div>
    <a-button template="m-button" top="1rem" @a-tap="tapEvent(1)"></a-button>
    <a-button template="m-button" top="2rem" @a-tap="tapEvent(2)"></a-button>
  </div>
</template>
```

```js
// 在 .vue 文件中

import antelope from 'antelope-ui'

antelope.utils.createdTemplate('m-button', {
  width: '2.39rem',
  height: '0.82rem',
  moveX: '-2.44rem',
  backgroundImage: 'btn.png'
})
```

!> createdTemplate 的参数不支持速写属性

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
