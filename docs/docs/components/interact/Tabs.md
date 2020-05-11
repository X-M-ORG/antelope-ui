# Tabs 标签

标签，控制不同内容显示。

---

### Props

- 混合：[组件混合表](docs/components/mixins/Components.md)
- 自有：

| name   | type               | require | default | desc                 |
| ------ | ------------------ | ------- | ------- | -------------------- |
| active | String             | false   |         | 默认激活的 slot name |
| items  | Array\<slot name\> | false   | []      | slot name 名称的数组 |

### 示例

```html
<a-tabs :active="tabActive" :items="['tab1', 'tab2']">
  <a-section slot="tab1">tab1</a-section>
  <a-section slot="tab2">tab2(默认显示)</a-section>
</a-tabs>

<script>
  export default {
    data() {
      return {
        tabActive: 'tab2'
      }
    }
  }
</script>
```
