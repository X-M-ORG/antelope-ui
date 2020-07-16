# Popup 浮层

浮层是活动的核心功能，一个活动页面会有很多浮层，为一个页面写 N 个浮层 N 个属性控制开启关闭，不利维护。

所以由此组件的作用主要是管理浮层项，以优化活动页面对浮层的使用。

!> 全局只允许有一个 Popup，需通过 this.\$refs 调用。

---

### Props

- 混合：无
- 自有：

| name    | type               | require | default        | desc                                         |
| ------- | ------------------ | ------- | -------------- | -------------------------------------------- |
| items   | Array\<slot name\> | false   | []             | slot name 名称的数组                         |
| options | Object             | false   | options object | 设定浮层的初始属性，开启某个浮层时可传参覆盖 |

**options object：**

| name    | type    | require | default | desc                                        |
| ------- | ------- | ------- | ------- | ------------------------------------------- |
| bgClose | Boolean | false   | false   | 背景朦层是否可以关闭浮层                    |
| zIndex  | String  | false   | '2'     | 朦层的层级                                  |
| top     | String  | false   | '50%'   | 上定位                                      |
| left    | String  | false   | '50%'   | 左定位                                      |
| center  | String  | false   | '1'     | x:水平居中 y:垂直居中 存在或其他值:垂直水平 |

### 示例

简单看下 template 的使用方法

```html
<a-popup ref="popup" :items="['rule', 'pay']" :options="{ top: '40%' }">
  <a-section slot="rule">活动规则浮层</a-section>
  <a-section slot="pay">充值浮层</a-section>
</a-popup>
```

### slot-scope object

每一项可以通过 slot-scope="scope" 取到以下参数：

| name         | type    | require | default | desc                                   |
| ------------ | ------- | ------- | ------- | -------------------------------------- |
| scope.active | Boolean | false   | false   | 当前浮层的激活状态                     |
| scope.data   | Any     | false   |         | 当前浮层的数据，由 Popup.open 函数传递 |

### 操作

Popup 实例提供两个方法以供调用：

- open 开启浮层
- close 关闭浮层

#### Popup.open(openOptions | name string)

openOptions：

| name    | type   | require | default | desc                             |
| ------- | ------ | ------- | ------- | -------------------------------- |
| name    | String | true    |         | 开启的浮层项的名称，items 项     |
| options | Object | false   | {}      | 同 Props.options，将覆盖初始属性 |
| data    | Any    | false   |         | 传递给此浮层的数据               |

> 该方法返回一个 Promise，将在浮层开启的动画结束后 resolve

> 该方法支持多次调用，新开浮层位于前一个之上

> 可以传递字符串快速开启，等同于传递：{ name: string }

示例：

```html
<a-popup ref="popup" :items="['rule', 'pay']" :options="{ top: '40%' }">
  <a-section slot="rule">活动规则浮层</a-section>

  <a-section slot="pay" slot-scope="scope">
    <div>充值浮层：</div>
    <div>当前充值用户：{{ scope.data.user }}</div>
  </a-section>
</a-popup>
```

```js
this.$refs.popup
  .open({
    name: 'pay',
    data: {
      user: '张三'
    }
  })
  .then(() => {
    console.log('开启pay浮层~')
  })
```

#### Popup.close(undefined | String | Array)

根据传参数类型将执行不同操作

- undefined：不传参则关闭全部浮层，**默认**
- String：传递字符串，则关闭相应 name 的浮层
- Array：传递 name 的数组，则关闭相应的浮层

> 该方法返回一个 Promise，将在浮层关闭的动画结束后 resolve

示例：

```js
this.$refs.popup.close('pay').then(() => {
  console.log('关闭pay浮层~')
})

this.$refs.popup.close().then(() => {
  console.log('关闭所有浮层~')
})

this.$refs.popup.close(['pay', 'rule']).then(() => {
  console.log('关闭pay和rule浮层~')
})
```
