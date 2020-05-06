# Position

大多数组件都混合了定位属性，但只有 Position 组件默认激活，其他组件需为传递 position 属性激活，如：

```html
<a-button position top="1.2rem"></a-button>
```

> 激活定位属性后，默认为 absolute 定位，需要使用其他定位则可传递参数 position="fixed"

---

## Props

| name     | type   | require | default | desc                                                               |
| -------- | ------ | ------- | ------- | ------------------------------------------------------------------ |
| position | String | false   |         | 定位模式，同 css 中 position 的属性值，存在此属性则默认为 absolute |
| z-index  | String | false   |         | 同 css 写法                                                        |
| top      | String | false   |         | 同 css 写法                                                        |
| bottom   | String | false   |         | 同 css 写法                                                        |
| left     | String | false   |         | 同 css 写法                                                        |
| right    | String | false   |         | 同 css 写法                                                        |
| center   | String | false   |         | x:水平居中 y:垂直居中 存在或其他值:垂直水平                        |
