# 更新日志

---

<!-- #### v1.4.0

日期: 2020-05-11

细节：

- 优化 Sprite 组件的内部结构，无需再传递 props.size
- 优化 Popup 组件，改动较多，请查阅：[Popup 浮层](docs/components/interact/Popup.md)
- 优化 Bullet 组件的传参，设定样式无需在传递 props.itemStyle
- 文档同步

--- -->

#### v1.3.3

日期: 2020-05-08

细节：

- 支持创建组件模板，详细使用方法：[Box 盒子属性](docs/components/mixins/Box.md#template)

#### v1.3.2

日期: 2020-05-07

细节：

- 优化 SVGA 组件，无需再传递 props.id
- 优化源码结构，使用 @ 进行引用

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
