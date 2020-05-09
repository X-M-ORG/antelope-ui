# Roulette 轮盘

适用于抽奖等场景。

---

## Props

- 混合：[组件混合表](docs/components/mixins/Components.md)
- 自有：

| name       | type   | require | default       | desc                                                        |
| ---------- | ------ | ------- | ------------- | ----------------------------------------------------------- |
| items      | Array  | true    | 'ease-in-out' | 每项的参数配置，下面详解                                    |
| item-style | Object | false   |               | 项的初始样式，可参照[基础属性](docs/require/BasicParams.md) |
| audio      | String | false   |               | 转动开始到结束时的整体音效                                  |

### items object

| name     | type   | require | default | desc                                   |
| -------- | ------ | ------- | ------- | -------------------------------------- |
| position | Object | false   | {}      | 定位参数，可以参考 Position 组件的参数 |
| row      | Object | false   | {}      | 传递给每一项的数据                     |

## Emit

| name         | desc       |
| ------------ | ---------- |
| before-start | 轮盘开始前 |
| after-start  | 轮盘开始后 |
| before-end   | 轮盘停止前 |
| after-end    | 轮盘停止后 |

## 调用

!> Roulette 只能手动挂在\$ref 上，通过 this.\$refs.xxx 获取该组件实例。

Roulette 实例提供两个方法以供调用， start、init，下面讲讲具体传参。

### start

start 顾名思义即开始轮盘，传参 Object 格式，参数如下：

| name        | type     | require | default      | desc                                                    |
| ----------- | -------- | ------- | ------------ | ------------------------------------------------------- |
| options     | Object   | false   | {}           | 设置 Roulette 的属性，下面详解                          |
| steps       | Number   | true    | items 的长度 | 轮盘将要进行的步数，如果想永久，那就 999 咯             |
| result      | Number   | false   | 0            | 规定结束时的 index，起点 0，根据 steps 以计算具体的步数 |
| beforeStart | Function | false   |              | 开始轮盘前的事件，同异步都可以                          |
| afterStart  | Function | false   |              | 开始轮盘后的事件，同异步都可以                          |
| afterEnd    | Function | false   |              | 停止轮盘后的事件，同异步都可以                          |

#### options object

Roulette 存在一些属性，这个可以在开始前进行设置，如下：

| name      | type   | require | default       | desc               |
| --------- | ------ | ------- | ------------- | ------------------ |
| func      | String | false   | 'ease-in-out' | 速度曲线，下面详解 |
| maxSpeed  | Number | false   | 30            | 最快的速度到下一个 |
| minSpeed  | Number | false   | 960           | 最慢的速度到下一个 |
| toMaxStep | Number | false   | 4             | 几步到达最快速度   |

!> maxSpeed、minSpeed 的单位是 ms

##### func

速度模式，可选值：

- ease-in-out：默认值，以慢速开始和结束
- ease-in：以慢速开始
- ease-out：以慢速结束

### init

init 会初始轮盘上的显示状态和 Roulette 属性

## Slot

个数由传参设置，项接收以下值：

- index 当前的 index
- active 当前是否为激活状态
- row items 中传递的 row

示例：

```js
const rouletteItems = [
  { row: { name: '张三' } },
  { row: { name: '李四' } },
  { row: { name: '王五' } },
  { row: { name: '赵六' } }
]
```

```html
<a-roulette
  :items="rouletteItems"
  :itemStyle="{ height: '1.88rem', width: '1.66rem' }"
>
  <a-section slot-scope="scope">
    <div>index: {{ scope.index }}</div>
    <div>active: {{ scope.active }}</div>
    <div>name: {{ scope.row.name }}</div>
  </a-section>
</a-roulette>
```
