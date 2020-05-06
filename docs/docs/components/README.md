# 组件

---

#### 混合特性

对于所有组件，都进行了相应的混合，混合后则拥有该部分的特性，主要分为以下几个部分：

- [Box 盒子属性](docs/components/mixins/Box.md)
- [Position 定位属性](docs/components/mixins/Position.md)
- [Event 事件监听](docs/components/mixins/Event.md)
- [Status 组件状态](docs/components/mixins/Status.md)

!> 并非所有的组件都混合了四种特性，混合程度查看该组件的文档

#### 基础组件

这些组件基本为构成页面的基础单元块，没有复杂功能。

- [Section 流体块，跟随文档流的布局块](docs/components/basic/Section.md)
- [Sections 流体块列表，解决多个流体块拼接的细微问题](docs/components/basic/Sections.md)
- [Position 定位块，脱离文档流的布局块](docs/components/basic/Position.md)
- [List 列表块，加载长列表，常用于隐藏滚动条](docs/components/basic/List.md)
- [Svga 道具块，加载 svga 动画](docs/components/basic/Svga.md)
- [Fps9 九帧图，加载九帧图动画](docs/components/basic/Fps9.md)
- [Sprite 雪碧图/精灵图，加载特殊数字或图案](docs/components/basic/Sprite.md)
- [Button 按钮，继承布局类，点击效果](docs/components/basic/Button.md)

#### 互动组件

这些组件通常存在某些特殊的互动效果，相较复杂。

- [Popup 页面统一的浮层，提供阴影、渐变的效果](docs/components/interact/Popup.md)
- [Bullet 弹幕，滚动播放的广播、弹幕效果](docs/components/interact/Bullet.md)
- [Timer 计时器，常用于倒计时](docs/components/interact/Timer.md)
- [Roulette 轮盘，转盘抽奖效果](docs/components/interact/Roulette.md)
- [Tab 标签页，切换控制标签](docs/components/interact/Tab.md)
- [NumSlider 滑动数字，切换数字的显示](docs/components/interact/NumSlider.md)
- [Box 盒子，用于礼盒道具的基本显示和内容显隐控制](docs/components/interact/Box.md)
