# Position 定位块

Position 和 Section 没有什么大的区别，唯一的区别是它默认启动 position 模式。

---

### Props

- 混合：[组件混合表](docs/components/mixins/Components.md)
- 自有：

| name     | type   | require | default  | desc                   |
| -------- | ------ | ------- | -------- | ---------------------- |
| position | String | false   | absolute | 默认开启 position 模式 |

### 示例

```html
<a-section
  width="7.5rem"
  height="4rem"
  background-color="#ffffff"
  background-image="bg.png"
  @a-tap="tapEvent()"
>
  <a-position
    top="2rem"
    right="0"
    width="1rem"
    height="2rem"
    background-image="button.png"
    @a-tap="tapButton()"
  ></a-position>
</a-section>
```
