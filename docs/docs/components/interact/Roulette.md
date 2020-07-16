# Roulette 轮盘

轮盘本质就是修改激活块，有序修改是转盘，无序修改是跑马灯，暂时只支持有序修改。

---

### 思路

Roulette 的思路是生成一个大的区域，每一项进行定位，根据激活状态渲染数据。

### Props

- 混合：[组件混合表](docs/components/mixins/Components.md)
- 自有：

| name    | type                 | require | default | desc                                                                                              |
| ------- | -------------------- | ------- | ------- | ------------------------------------------------------------------------------------------------- |
| items   | Array\<item object\> | true    | []      | 每项的定位属性配置，可参考：[Position 定位块](docs/components/basic/Position.md)                  |
| options | Object               | false   |         | 每项的默认参数，item 为 position 组件，参考：[Position 定位块](docs/components/basic/Position.md) |

### slot-scope object

每一项可以通过 slot-scope="scope" 取到以下参数：

| name         | type    | require | default | desc             |
| ------------ | ------- | ------- | ------- | ---------------- |
| scope.index  | Number  | false   | false   | 当前项的索引     |
| scope.active | Boolean | false   | false   | 当前项的激活状态 |

### 操作

Roulette 实例提供两个方法以供调用：

- init 初始化轮盘
- run 启动轮盘

#### Roulette.init()

初始化轮盘的状态。

#### Roulette.run(runOptions)

**runOptions：**

| name    | type   | require | default        | desc                                       |
| ------- | ------ | ------- | -------------- | ------------------------------------------ |
| result  | Number | true    | 0              | 轮盘结束时的项的索引                       |
| steps   | Number | false   | items 的长度   | 轮盘将要进行的步数，如果想永久，就传大一点 |
| options | Object | false   | options object | 设置执行时的参数                           |

> 根据现有需求，会计算出初始位置，然后走 steps 步，最后到达索引为 result 的项

options object：

| name      | type   | require | default       | desc               |
| --------- | ------ | ------- | ------------- | ------------------ |
| func      | String | false   | 'ease-in-out' | 速度曲线，下面详解 |
| maxSpeed  | Number | false   | 30            | 最快的速度到下一个 |
| minSpeed  | Number | false   | 960           | 最慢的速度到下一个 |
| toMaxStep | Number | false   | 4             | 几步到达最快速度   |

func value：

- ease-in-out：默认值，以慢速开始和结束
- ease-in：以慢速开始
- ease-out：以慢速结束

> 该方法返回一个 Promise，将在轮盘结束后 resolve

示例：

```html
<a-roulette
  ref="roulette"
  width="2rem"
  height="2rem"
  :items="items"
  :options="{ height: '1rem', width: '1rem' }"
>
  <a-section height="3.07rem" width="2.99rem" slot-scope="scope">
    active：{{ scope.active }}
  </a-section>
</a-roulette>
```

```js
this.$refs.roulette.run().then(() => {
  console.log('轮盘结束了~')
})
```

### 示例

<vuep template="#example" :options="{ theme: 'neo' }"></vuep>

<script v-pre type="text/x-template" id="example">
<template>
  <a-section w="250px" h="200px" bg-c="#ddd">
    <a-section @a-tap="start()">点击开始</a-section>
    <a-roulette
      ref="roulette"
      width="200px"
      height="200px"
      :items="items"
      :options="{ height: '80px', width: '80px' }"
    >
      <a-section slot-scope="scope" :bg-c="scope.active ? 'blue' : 'red'">
        index：{{ scope.index }}
      </a-section>
    </a-roulette>
  </a-section>
</template>

<script>
  export default {
    data() {
      return {
        items: [
          { top: 0, left: 0 },
          { top: 0, right: 0 },
          { bottom: 0, right: 0 },
          { bottom: 0, left: 0 }
        ]
      }
    },
    methods: {
      start() {
        this.$refs.roulette.run({ steps: 15, result: 3 }).then(() => {
          alert('轮盘结束了~')
        })
      }
    }
  }
</script>
</script>
