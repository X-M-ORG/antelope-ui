# Tab 标签

标签，控制不同内容显示。

---

## Props

| name           | type   | require | default       | desc                     |
| -------------- | ------ | ------- | ------------- | ------------------------ |
| items          | Array  | true    | 'ease-in-out' | 每项的参数配置，下面详解 |
| default-active | String | false   |               | 默认展示的内容块         |

### items object

| name  | type   | require | default | desc                                             |
| ----- | ------ | ------- | ------- | ------------------------------------------------ |
| name  | String | true    | {}      | 此内容块的名称，不得为 tab-bar，下面 slot 中说明 |
| props | Object | false   | {}      | 此内容块的基本属性，参考 Position                |

!> props.height 和 props.width 将作用在标签根元素上，内容块以绝对定位填充全部。

## 调用

!> Tab 只能手动挂在\$ref 上，通过 this.\$refs.xxx 获取该组件实例。

Tab 实例提供两个方法以供调用， switchName、switchIndex，下面讲讲具体传参。

### switchName

switchName 接收一个 String 参数，即要切换至的内容块的名称。

### switchIndex

switchIndex 接收一个 Number|String 参数，即要切换至的内容块在 items 的索引。

## Slot

个数由传参设置。

!> 提供 name 为 tab-bar 的 slot 以供切换栏在 tab 内的情况，故 items 中，内容块名称不得为 tab-bar；此 slot 位于所有内容块之上。
