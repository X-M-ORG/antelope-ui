/*
  框架的基础配置
  componentPrefix 挂载后组件前缀
  buttonImgSpace 按钮组件的默认间距，-1不启用
  imageSizeAutoLoader 图片资源自动加载宽高（背景图）
  imageSizeUnit 资源宽高的参数
  imageTimes 图片倍数
  onTapAvatar 点击头像时的触发事件
*/
export default {
  componentPrefix: 'A',
  buttonImgSpace: -1,
  imageSizeAutoLoader: false,
  imageSizeUnit: 'px',
  imageTimes: 1,
  onTapAvatar: () => {}
}
