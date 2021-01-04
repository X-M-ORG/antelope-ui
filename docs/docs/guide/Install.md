# 安装

---

## 使用 npm 安装（推荐）

**install**

```npm
npm i antelope-ui -S
```

**use**

```js
// 完全引入
import antelope from 'antelope-ui'
Vue.use(antelope)

// 按需引入
import { Button } from 'antelope-ui'
Vue.component('AButton', Button)
```

> 若无需 svga 组件，可引入 antelope-ui/dist/antelope-ui.core.js 以减少体积

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
| imageTimes          | Number   | false   | 1       | 图片倍数                                                                          |
| imageSizeUnit       | String   | false   | 'px'    | 资源宽高的单位                                                                    |
| boxUnit             | String   | false   | 'rem'   | 盒模型和定位属性的单位：width、height、left、right、top、bottom                   |
| buttonImgSpace      | Number   | false   | -1      | 按钮组件的默认间距，-1 不启用                                                     |
| avatarOnTap         | Function | false   | ()=>{}  | 当 Avatar 组件被点击时的触发函数，参考：[Avatar](docs/components/basic/Avatar.md) |
