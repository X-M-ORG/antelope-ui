# Popup 浮层

浮层是活动的核心功能，一个活动页面会有很多浮层，为一个页面写 N 个浮层 N 个属性控制开启关闭，不利维护。

所以由此组件的作用主要是管理浮层项，以优化活动页面对浮层的使用。

---

## Props

| name       | type  | require | default | desc                                       |
| ---------- | ----- | ------- | ------- | ------------------------------------------ |
| slot-names | Array | false   | []      | slot 名称数组，页面中 N 个浮层项的名称数组 |

## Emit

| name                  | desc           |
| --------------------- | -------------- |
| before-open           | 浮层开启前     |
| after-open            | 浮层开启后     |
| before-close          | 浮层关闭前     |
| after-close           | 浮层关闭后     |
| after-close-animation | 浮层动画结束后 |

## 调用

!> 全局只允许有一个 Popup，且必须由页面级组件配置。

Popup 会自动注册在页面组件的\$ref 上，通过 this.\$refs['a-popup'] 即可获取该组件实例。

Popup 实例提供两个方法以供调用， open、close，下面讲讲具体传参。

### open

open 顾名思义即开启浮层，传参 Object 格式，参数如下：

| name       | type     | require | default | desc                             |
| ---------- | -------- | ------- | ------- | -------------------------------- |
| name       | String   | true    |         | 开启的浮层项的名称               |
| options    | Object   | false   | {}      | 设置 Popup 的属性，下面详解      |
| row        | Object   | false   | {}      | 传给给浮层项内部的数据，下面详解 |
| beforeOpen | Function | false   |         | 开启浮层前的事件，同异步都可以   |
| afterOpen  | Function | false   |         | 开启浮层后的事件，同异步都可以   |

#### options object

Popup 存在一些属性，这个可以在开启的时候进行设置，如下：

| name    | type    | require | default | desc                                 |
| ------- | ------- | ------- | ------- | ------------------------------------ |
| bgClose | Boolean | false   | false   | 背景是否可以关闭浮层                 |
| zIndex  | String  | false   | '2'     | 层级                                 |
| top     | String  | false   | '50%'   | 上定位                               |
| left    | String  | false   | '50%'   | 左定位                               |
| center  | String  | false   | '1'     | 是否居中，同 Position 组件的参数效果 |

#### row 的使用方法

示例：

```js
this.$refs['a-popup'].open({
  name: 'sample',
  row: {
    name: '张三'
  }
})
```

```html
<a-popup :slot-names="['sample']">
  <a-section slot="sample" slot-scope="scope" width="6.19rem" height="6.89rem">
    <div>{{ scope.row.name }}</div>
  </a-section>
</a-popup>
```

> 可以多次 open，以开启多个浮层

### close

close 即关闭，参数较少，如下：

| name        | type     | require | default | desc                           |
| ----------- | -------- | ------- | ------- | ------------------------------ |
| name        | String   | false   |         | 关闭浮层的名称，不传则关闭所以 |
| beforeClose | Function | false   |         | 关闭浮层前的事件，同异步都可以 |
| afterClose  | Function | false   |         | 关闭浮层后的事件，同异步都可以 |

> afterClose 在 after-close-animation 事件抛出后触发

## Slot

数目和名称由传参设定
