# Dialog 对话框

对话框用于页面的浮层显示，使用函数式进行浮层的切换

---

### Props

- 混合：[组件混合表](docs/components/mixins/Components.md)
- 自有：

| name | type   | require | default | desc         |
| ---- | ------ | ------- | ------- | ------------ |
| name | String | true    |         | 对话框的名称 |

### Slot

Dialog 的 slot 即对话框的内容。

### 调用

每一个 Dialog 都需要 name 参数，当设定 name 参数后将挂载在全局 vue 上，默认为：this.\$dialogs，可在挂载时进行设置：[安装](docs/guide/Install.md#挂载参数)

而每一个对话框的提供两个方法：

- open
- close

#### Dialog.open(options)

options

| name    | type           | require | default | desc                                                       |
| ------- | -------------- | ------- | ------- | ---------------------------------------------------------- |
| data    | Any            | false   | {}      | 传递给此 Dialog 的数据，通过 scope.data 获取               |
| attrs   | Object         | false   | {}      | 将设置 Dialog 的 v-bind 的属性，将覆盖 template 定义的属性 |
| options | options Object | false   | {}      | Dialog 的一些可选项                                        |
| onclose | Function       | false   | ()=>{}  | 此 Dialog 在关闭后的将执行的回调                           |

options Object

| name    | type    | require | default | desc                       |
| ------- | ------- | ------- | ------- | -------------------------- |
| bgClose | Boolean | false   | false   | 背景朦层是否可以关闭对话框 |

> 该方法返回一个 Promise，将在对话框开启的动画结束后 resolve

> 该方法支持多次调用，新开对话框位于前一个之上

示例：

```html
<a-dialog name="rule" top="45%" background-image="bg-rule.png">
  <div>活动规则</div>
</a-dialog>

<a-dialog name="pay" top="45%" background-image="bg-pay.png">
  <template slot-scope="scope" v-if="scope.data">
    <div>充值浮层：</div>
    <div>当前充值用户：{{ scope.data.user }}</div>
  </template>
</a-dialog>
```

```js
this.$dialogs.rule
  .open({
    attrs: { top: '30%' }, // 此参数会覆盖 template 上的 top="45%"
    options: { bgClose: true }
  })
  .then(() => {
    console.log('open rule')
  })

await this.$dialogs.pay.open({
  data: { user: '张三' }
})
console.log('open pay')
```

#### Dialog.close([options])

options

| name  | type         | require | default | desc                                     |
| ----- | ------------ | ------- | ------- | ---------------------------------------- |
| all   | Boolean      | false   | false   | 是否关闭所有对话框                       |
| other | String/Array | false   | {}      | 关闭其他对话框，值为对框框名称或名称数组 |

> 该方法返回一个 Promise，将在对话框开启的动画结束后 resolve

示例：

```js
this.$dialogs.rule.close().then(() => {
  console.log('close rule')
})

await this.$dialogs.pay.close({ all: true })

await this.$dialogs.pay.close({ other: ['rule] })
```

### 示例

<vuep template="#example" :options="{ theme: 'neo' }"></vuep>

<script v-pre type="text/x-template" id="example">
<template>
  <a-section w="250px" h="200px" bg-c="#ddd">
    <a-section @a-tap="$dialogs.rule.open()">开启rule</a-section>
    <a-section @a-tap="$dialogs.pay.open({ data: { user: '张三' } })">开启pay</a-section>

    <a-dialog name="rule" top="45%" wh="500px" bg-c="#fff">
      <a-section>活动规则</a-section>
      <a-section @a-tap="$dialogs.rule.close()">关闭</a-section>
      <a-section @a-tap="$dialogs.pay.open({ data: { user: '张三' } })">开启pay</a-section>
    </a-dialog>

    <a-dialog name="pay" top="45%" wh="500px" bg-c="#fff">
      <template slot-scope="scope" v-if="scope.data">
        <div>充值浮层：</div>
        <div>当前充值用户：{{ scope.data.user }}</div>
        <a-section @a-tap="$dialogs.rule.close({ all: true })">关闭</a-section>
      </template>
    </a-dialog>
  </a-section>
</template>

<script>
  export default {}
</script>
</script>
