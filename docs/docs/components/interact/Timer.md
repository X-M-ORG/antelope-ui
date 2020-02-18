# Timer 计时器

用于倒计时。

---

## Props

| name   | type                   | require | default | desc                   |
| ------ | ---------------------- | ------- | ------- | ---------------------- |
| start  | String\| Number\| Date | false   |         | 起点时间               |
| end    | String \| Object       | false   |         | 终点时间               |
| second | String                 | false   |         | 倒计时 N 毫秒，单位 ms |

!> start 和 end 必须同时存在，start+end 和 second 二选一，同时存在应用前者

## Emit

| name         | desc                                   |
| ------------ | -------------------------------------- |
| timer-reduce | 倒计时中，每秒触发，抛出参数为剩余秒数 |
| timer-end    | 倒计时结束                             |

## Slot

无

---

> 可以随时更新参数，参数更新时倒计时会实时更新
