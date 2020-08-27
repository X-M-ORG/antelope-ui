# 更新日志

---

#### v2.0.5

日期: 尚未发布

细节：

- 新增 a-touchstart 和 a-touchend 的 \$emit
- 修改 Button 的间隔默认为 6 px
- 修复 Svga 在连续切换时因 dom 被销毁而导致的中断加载的错误

#### v2.0.4

日期: 2020-08-11

细节：

- 优化代码结构
- 修复 Bullet 在快速反复暂停和播放时导致的重叠问题
- 增加 Avatar 组件，参考：[Avatar](docs/components/basic/Avatar.md)

#### v2.0.3

日期: 2020-08-05

细节：

- 为 Roulette 做一个跳转的兼容

#### v2.0.2

日期: 2020-07-31

细节：

- 为 Box 混合添加 imageSuffix 参数（quick：iS）以实现背景图的动态切换
- 允许 position.left/top/right/bottom 传递 Number（针对传递 0 的情况）
- 更新 Bullet 的内部逻辑和渲染方式，允许自定义轮播元素，并提供对轮播暂停和继续的控制

#### v2.0.1

日期: 2020-07-20

细节：

- Roulette 传参保留之前的使用方式

#### v2.0.0

日期: 2020-07-16

细节：

- 改善速写属性和模板化，对于一些意外的错误进行了修复
- 基础工具进行了重写和优化
- 状态混合优化了逻辑，有一些逻辑修改，参考：[Status](docs/components/mixins/Status.md)
- 盒子混合删除了状态对于背景图加载的隐式后缀，参考：[Status](docs/components/mixins/Status.md)
- 定位混合更新了默认激活的条件，参考：[Position](docs/components/mixins/Position.md)
- 事件混合优化触发方式，增加 touch 的 class，参考：[Event](docs/components/mixins/Event.md)
- Button 现在可以根据素材自动设定宽高，自动确定偏移量，参考：[Button](docs/components/basic/Button.md)
- Fps9 现在可以根据素材自动设定宽高
- List 重写为 Scroll，使用 better-scroll 实现，封装一些方法，参考：[Scroll](docs/components/basic/Scroll.md)
- Box 重命名为 Popover
- Bullet 修复了一个触发时机的 bug
- NumSlider 重写为 Slider，支持任意内容的滚动，参考：[Slider](docs/components/interact/Slider.md)
- Popup 调整布局，优化结构
- Roulette 减少了不必要的传参，参考：[Roulette](docs/components/interact/Roulette.md)
- Timer 的 slot 传参完善，支持更细节的显示，参考：[Timer](docs/components/interact/Timer.md)

---

#### v1.5.7

日期: 2020-06-11

细节：

- 优化 Popup.open 的传参

#### v1.5.6

日期: 2020-05-19

细节：

- 优化：list 的 scroll-end 触发时机

#### v1.5.5

日期: 2020-05-19

细节：

- 优化：list 组件新增 \$emit('scroll-end') 来获取是否滚动到最底部

#### v1.5.4

日期: 2020-05-17

细节：

- 优化：svga 组件新增 props.autoplay 来控制是否自动播放

#### v1.5.3

日期: 2020-05-15

细节：

- 修复：多个 popup 开启可以点击到上一个 popup 的内容 bug
- 修复：更改 bg-i 时背景图不更新的 bug

#### v1.5.2

日期: 2020-05-14

细节：

- 修复：没有 \$route.meta.aImagesMap 的情况下网络图片不加载
- 修复：Popup 组件 props.options 不生效
- 修复：tpl 速写属性不生效
- 修复：props.status 不生效

#### v1.5.1

日期: 2020-05-12

细节：

- 优化：PC 端也将触发 @a-tap 事件，具体事件为：
- PC 端：mousedown/mousemove/mouseup
- 移动端：touchstart/touchmove/touchend

#### v1.5.0

日期: 2020-05-11

细节：

- 重写：Tab 更名为 [Tabs](docs/components/interact/Tabs.md)，改动较多，请查阅相关文档
- 优化：[Popup](docs/components/interact/Popup.md)、[Roulette](docs/components/interact/Roulette.md) 的传参优化，改动较多，请查阅相关文档
- 新增：混合的盒子属性和定位属性的相关 props 支持简写，请查阅相关文档
- 新增：只要存在定位属性中的任意 props 将自动开启定位模式

---

#### v1.4.2

日期: 2020-05-11

细节：

- 修复：上一个版本导致图片状态失效的 bug

#### v1.4.1

日期: 2020-05-11

细节：

- 修复：复用图片因任务队列问题无法加载的 bug

#### v1.4.0

日期: 2020-05-11

细节：

- 优化：Sprite 组件的内部结构，无需再传递 props.size
- 优化：Popup 组件，改动较多，请查阅：[Popup 浮层](docs/components/interact/Popup.md)
- 优化：Bullet 组件的传参，设定样式无需在传递 props.itemStyle
- 文档：同步现有组件

---

#### v1.3.3

日期: 2020-05-08

细节：

- 新增：支持创建组件模板，详细使用方法：[Box 盒子属性](docs/components/mixins/Box.md#template)

#### v1.3.2

日期: 2020-05-07

细节：

- 优化：SVGA 组件无需再传递 props.id
- 优化：源码结构，使用 @ 进行引用

#### v1.3.1

日期: 2020-05-06

细节：

- 优化文档的结构，补全更新日志
- 更新挂载的参数，整理 config

#### v1.3.0

日期: 2020-04-27

细节：

- 使用 stylus 来编译 css
- 将 basicMixins 优化为 box、event、position、status，组件按需混合
- 新增 config 配置文件，Vue.use 在挂载时传参，具体参数见：[安装](docs/guide/Install.md)
- 若不传递宽高或只传某一个，可通过 background-image 来自动设定宽高；需在挂载时开启，见：[安装](docs/guide/Install.md)

---

#### v1.2.1

日期: 2020-04-15

细节：

- 优化 svga 的加载，将依次加载并且不会加载重复的资源
- Popup 的 slot 可以通过 scope.active 以得到当前激活的值

#### v1.2.0

日期: 2020-04-03

细节：

- 更新编译任务，修改 antelope-ui.not-svga 为 antelope-ui.core

---

#### v1.1.14

日期: 2020-03-19

细节：

- Tab 的 tab-bar 可以通过 scope.active 以得到当前激活的值

#### v1.1.13

日期: 2020-03-19

细节：

- 修改 a-page 为 a-sections

#### v1.0.12

日期: 2020-03-19

细节：

- Popup 支持开启多个

#### v1.0.11

日期: 2020-03-16

细节：

- 新增 Box 组件，文档整理

#### v1.0.10

日期: 2020-03-10

细节：

- 优化 Popup 的代码，解决关闭后迅速开启导致浮层丢失的 bug

#### v1.0.9

日期: 2020-03-10

细节：

- 新增 Fps9 组件，文档整理

#### v1.0.8

日期: 2020-03-02

细节：

- 修复 Roulette 组件在长度溢出的而导致轮盘结果不准确的问题

#### v1.0.7

日期: 2020-03-01

细节：

- 修复 vue-loader 没有对 .vue 文件进行 es6 转 es5 的 bug
- Popup.open 的传参由 params 改为 options

#### v1.0.6

日期: 2020-02-24

细节：

- 新增 antelope-ui.not-svga.js 以供不需要 svga 的情况

#### v1.0.5

日期: 2020-02-20

细节：

- 更新文档
- basicMixins 增加对 this.\$route 的判断
- webpack.config.js 新增 output.library

#### v1.0.4

日期: 2020-02-20

细节：

- 更新文档
- 支持 Vue.use 在挂载时传参，目前为可传递 prefix：自定义组件挂载前缀

#### v1.0.3

日期: 2020-02-20

细节：

- 增加 getImagesMap 辅助方法

#### v1.0.2

日期: 2020-02-19

细节：

- 更新文档
- 将 mixins/basic、mixins/position 合并为 utils/basicMixins，并合并一些代码
- 优化 NumSlider、Tab、Bullet 组件的样式，新增 Page 组件
- 构建任务优化

#### v1.0.1

日期: 2020-02-18

细节：

- 拷贝本地代码：文档、组件，发布正式版本

#### v1.0.0

日期: 2020-02-16

细节：

- 初始化 npm ，发布空的包
