# Status

大多数组件都混合了组件状态，其作用是赋予组件一些状态，可以通过修改状态达到相应的变化。

---

## Props

| name   | type                    | require | default | desc     |
| ------ | ----------------------- | ------- | ------- | -------- |
| status | String、Number、Boolean | false   | 1       | 组件状态 |

下面详述一下各个 props 的作用。

### status

status 代表该组件的状态，不同的 status 值对组件有不同的影响：

- 逻辑“真”：会触发 a-tap 事件，Button 组件设定 tap 偏移会生效
- 逻辑“假”：不会触发 a-tap 事件，Button 组件设定 tap 偏移不会生效
- 数值 1 和 布尔值 true：对于传入的 background-image 属性值正常处理
- 数值 0 和 布尔值 false：对于传入的 background-image 属性值会添加 .disabled 的后缀，例如：

```html
<!-- 以下组件实际上渲染的背景图为 test.disabled.png -->
<a-section background-image="test.png" :status="0"></a-section>
```

- 字符串：对于传入的 background-image 属性值会添加 .xxx 的后缀，例如：

```html
<!-- 以下组件实际上渲染的背景图为 test.done.png -->
<a-section background-image="test.png" status="done"></a-section>
```

> 此属性主要是为了解决一个按钮的不同状态，后续或有更好的解决方案
