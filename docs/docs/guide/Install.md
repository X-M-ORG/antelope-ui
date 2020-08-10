# 安装

---

## 使用 npm 安装（推荐）

```npm
npm i antelope-ui -S
```

```js
import antelope from 'antelope-ui'

Vue.use(antelope)
```

> 若无需 svga 组件，可引入 antelope-ui/dist/antelope-ui.core.js 以减少体积

### 按需引入

```js
import { Button } from 'antelope-ui'

Vue.component('AButton', Button)
```

---

## 使用 src 引入

```html
<script src="vue.js"></script>
<script src="dist/antelope-ui.js"></script>
<script>
  Vue.use(window.antelope.default)
</script>
```

> 若无需 svga 组件，可引入 dist/antelope-ui.core.js 以减少体积

---

## 挂载参数

| name                | type     | require | default | desc                                                                              |
| ------------------- | -------- | ------- | ------- | --------------------------------------------------------------------------------- |
| componentPrefix     | String   | false   | 'A'     | 挂载后组件前缀                                                                    |
| imageSizeAutoLoader | Boolean  | false   | false   | 图片资源自动加载宽高（背景图）                                                    |
| imageSizeUnit       | String   | false   | 'px'    | 资源宽高的参数                                                                    |
| imageTimes          | Number   | false   | 1       | 图片倍数                                                                          |
| onTapAvatar         | Function | false   | ()=>{}  | 当 Avatar 组件被点击时的触发函数，参考：[Avatar](docs/components/basic/Avatar.md) |
