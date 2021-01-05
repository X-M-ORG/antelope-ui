# Bullet 弹幕

滚动播放的广播、弹幕效果。

---

### Props

- 混合：[组件混合表](docs/components/mixins/Components.md)
- 自有：

| name     | type                     | require | default | desc                                                       |
| -------- | ------------------------ | ------- | ------- | ---------------------------------------------------------- |
| items    | Array                    | true    | []      | 弹幕的数组，每一项为弹幕文案，支持 v-html                  |
| mode     | String: 'text' or 'slot' | true    | 'text'  | 渲染模式                                                   |
| duration | String、Number           | false   | '20'    | 弹幕动画时间，并非从出现到消失的时间，可以根据实际效果微调 |
| between  | String、Number           | false   | '50'    | 两个弹幕之间的间隔，区间值用 - ，例如：50-100              |

#### mode

允许进行 slot 自定义轮播元素，并且提供两个方法去控制播放暂停

- 暂停： \$refs.bullet.pauseAnimation()
- 播放： \$refs.bullet.playAnimation()

### 示例

若设定样式，给 .bullet-item 进行设置即可。

<vuep template="#example" :options="{ theme: 'neo' }"></vuep>

<script v-pre type="text/x-template" id="example">
<template>
  <a-section w="250px" h="200px" bg-c="#ddd">
    <a-bullet
      position
      top="0"
      left="0"
      right="0"
      height="48px"
      :items="bullet"
    ></a-bullet>

     <a-bullet
      ref="bullet"
      mode="slot"
      position
      bottom="0"
      left="0"
      right="0"
      height="48px"
      :items="bullet"
    >
      <a-section slot-scope="scope" @a-tap="test(scope.data)">slot:{{ scope.data }}</a-section>
    </a-bullet>
  </a-section>
</template>

<script>
  export default {
    data() {
      return {
        bullet: [
          '啦啦啦啦啦啦啦啦啦啦啦啦啦啦啦',
          '哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈',
          '呀呀呀呀呀呀呀呀呀呀呀呀呀呀呀',
          '哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈',
          '呀呀呀呀呀呀呀呀呀呀呀呀呀呀呀'
        ]
      }
    },

    mounted() {
      let i = true

      setInterval(()=> {
        const ref = this.$refs.bullet

        if (i) {
          ref.pauseAnimation()
        } else {
          ref.playAnimation()
        }

        i = !i
      }, 5000)
    }
  }
</script>

<style>
  .bullet-item {
    display: inline-block;
    padding: 0 30px;
    font-size: 22px;
    font-weight: 500;
    background-color: rgba(137, 0, 144, 0.8);
    color: #ffffff;
    white-space: nowrap;
    border-radius: 24px;
    line-height: 48px;
  }
</style>
</script>

> 若 items 更新，则下一个弹幕是新 items 的第一项

> 如果需要关闭弹幕，可以将其挂载在 \$refs 上，调用实例的 endAnimation() 方法停止弹幕
