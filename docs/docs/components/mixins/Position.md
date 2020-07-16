# Position

大多数组件都混合了定位属性，但只有 Position 组件默认激活

---

## Props

| name     | quick | type   | require | default | desc                                                               |
| -------- | ----- | ------ | ------- | ------- | ------------------------------------------------------------------ |
| position | p     | String | false   |         | 定位模式，同 css 中 position 的属性值，存在此属性则默认为 absolute |
| z-index  | pz    | String | false   |         | 同 css 写法                                                        |
| top      | pt    | String | false   |         | 同 css 写法                                                        |
| bottom   | pb    | String | false   |         | 同 css 写法                                                        |
| left     | pl    | String | false   |         | 同 css 写法                                                        |
| right    | pr    | String | false   |         | 同 css 写法                                                        |
| center   | pc    | String | false   |         | x:水平居中 y:垂直居中 存在或其他值:垂直水平                        |

> quick 为简写属性，与 name 作用相同

## 自动激活

一般会使用 position 去激活 box 的定位模式，但传递以下几种属性会自动激活定位模式：

- top
- bottom
- left
- right
- center

> 激活定位模式后，默认为 absolute 定位，需要使用其他定位则可传递参数 position="fixed"、position="relative"

```html
<a-button position top="1.2rem"></a-button>

<!-- 速写属性 + 自动激活 -->
<a-button pt="1.2rem"></a-button>
```
