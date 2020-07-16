# Timer 计时器

用于倒计时。

---

### Props

- 混合：[组件混合表](docs/components/mixins/Components.md)
- 自有：

| name   | type                   | require | default | desc                             |
| ------ | ---------------------- | ------- | ------- | -------------------------------- |
| start  | String\| Number\| Date | false   |         | 起点时间                         |
| end    | String \| Object       | false   |         | 终点时间                         |
| sec    | String                 | false   |         | 倒计时 N 毫秒，单位 ms           |
| manual | Boolean                | false   | false   | 手动控制倒计时，将不会侦听倒计时 |

### 计时方式：

提供计时方式方式：

- 1、设定开始和结束
- 2、设定固定时间的倒计时，单位 ms

> 因为 JS 的倒计时并不精准，所以提供手动控制倒计时

### Event

| name           | desc                                   |
| -------------- | -------------------------------------- |
| timer-reduce   | 倒计时中，每秒触发，抛出参数为剩余秒数 |
| countdown-over | 倒计时结束                             |

### Slot

该组件存在两个 slot：

- wait：等待时显示
- arrival：倒计时结束时显示

其中，wait 的 scope.data 对象：

| name | desc                                 |
| ---- | ------------------------------------ |
| all  | 总共还有 all 秒                      |
| dd   | 还有 dd 天，不足两位数补全           |
| HH   | 还有 HH 小时，包含天，不足两位数补全 |
| hh   | 还有 hh 小时，不含天，不足两位数补全 |
| mm   | 还有 mm 分钟，不足两位数补全         |
| ss   | 还有 ss 秒，不足两位数补全           |
| d    | 还有 d 天                            |
| H    | 还有 H 小时，包含天                  |
| h    | 还有 h 小时，不含天                  |
| m    | 还有 m 分钟                          |
| s    | 还有 s 秒                            |

> 所有类型都是 String

### 示例

<vuep template="#example" :options="{ theme: 'neo' }"></vuep>

<script v-pre type="text/x-template" id="example">
<template>
  <a-section w="250px" h="200px" bg-c="#ddd">
    <a-timer start="2020-02-01 12:00" end="2020-02-05 12:00">
      <template slot="wait" slot-scope="scope">
        <span>倒计时</span>
        <span>{{ scope.data.h }}</span>
        <span>时</span>
        <span>{{ scope.data.m }}</span>
        <span>分</span>
        <span>{{ scope.data.s }}</span>
        <span>秒</span>
      </template>

      <template slot="arrival"">
        啦啦啦啦，到时间了~
      </template>
    </a-timer>
  </a-section>
</template>

<script>
  export default {}
</script>
</script>
