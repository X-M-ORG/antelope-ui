# Status

大多数组件都混合了组件状态，其作用是赋予组件一些状态，可以通过修改状态达到相应的变化。

---

## Props

| name     | type    | require | default | desc     |
| -------- | ------- | ------- | ------- | -------- |
| disabled | Boolean | false   | 1       | 禁用状态 |

### disabled

当 props.disabled 为 true 时，会存在一些特性的效果：

- Button 组件设定 tap 偏移不会生效
- 不会触发 a-tap 事件（Avatar 组件亦是）
- Popover 不会弹出窗口
