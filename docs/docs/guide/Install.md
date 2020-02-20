# 安装

使用 npm 或 src

```npm
npm i antelope-ui -S
```

```html
<script src="dist/antelope-ui.js"></script>
```

# 挂载

```js
import antelope from 'antelope-ui'

Vue.use(antelope)
```

或者按需引入

```js
import { Button } from 'antelope-ui'

Vue.component('AButton', Button)
```

src 引入挂载

```html
<script src="vue.js"></script>
<script src="dist/antelope-ui.js"></script>
<script>
  Vue.use(window.antelope.default)
</script>
```

#### 可选参数

| name   | type   | require | default | desc                                           |
| ------ | ------ | ------- | ------- | ---------------------------------------------- |
| prefix | String | false   | 'A'     | 组件前缀，默认 a 开头，如 a-position、a-button |
