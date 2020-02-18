# Svga 道具块

我们活动中经常会用到 svga 资源，每次写加载方法太麻烦，所以此组件用来加载 svga。

---

## require

依赖插件：

- svgaplayerweb

## Props

| name | type   | require | default | desc                                 |
| ---- | ------ | ------- | ------- | ------------------------------------ |
| id   | String | true    |         | id 名，同 dom 的，页面不得有相同的   |
| url  | String | true    |         | svga 资源的 url 地址，不支持本地文件 |
