# Position

大多数组件都混合了定位属性，但只有 Position 组件默认激活

---

## Props

| name         | quick | type           | require | default | desc                                                                                                           |
| ------------ | ----- | -------------- | ------- | ------- | -------------------------------------------------------------------------------------------------------------- |
| position     | p     | String         | false   |         | 定位模式，同 css 中 position 的属性值，存在此属性则默认为 absolute                                             |
| z-index      | pz    | String、Number | false   |         | 同 css 写法                                                                                                    |
| position-set | ps    | String         | false   |         | 元素定位，以空格连接，顺序为：上 右 下 左，简写规则同 css 的 margin、padding，若某个方向无需设置，可设置 unset |
| top          | pt    | String、Number | false   |         | 同 css 写法                                                                                                    |
| bottom       | pb    | String、Number | false   |         | 同 css 写法                                                                                                    |
| left         | pl    | String、Number | false   |         | 同 css 写法                                                                                                    |
| right        | pr    | String、Number | false   |         | 同 css 写法                                                                                                    |
| center       | pc    | String         | false   |         | x:水平居中 y:垂直居中 存在或其他值:垂直水平                                                                    |

> quick 为简写属性，与 name 作用相同

> 2.1.0 版本起，top、bottom、left、right 可以忽略单位，在[挂载](/docs/guide/Install?id=挂载参数)的时候进行设定相应单位

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

<!-- 速写属性 + 忽略单位 + 自动激活 -->
<a-button pt="1.2"></a-button>
```
