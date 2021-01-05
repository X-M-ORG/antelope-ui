const config = {
  /**
   * system 系统级参数
   * componentPrefix 挂载后组件前缀
   * imageSizeAutoLoader 图片资源自动加载宽高（背景图）
   * imageTimes 图片倍数
   * imageSizeUnit 资源宽高的单位
   * boxUnit 盒模型和定位属性的单位：width、height、left、right、top、bottom
   * imagesPropertyName 挂载资源属性名
   * dialogPropertyName 挂载 dialog 的全局对象属性名
   */
  componentPrefix: 'A',
  imageSizeAutoLoader: false,
  imageTimes: 1,
  imageSizeUnit: 'px',
  boxUnit: 'rem',
  imagesPropertyName: 'aImagesMap',
  dialogPropertyName: '$dialogs',

  /**
   * button 组件参数
   * buttonImgSpace 按钮组件的默认间距，-1不启用
   */
  buttonImgSpace: -1,

  /**
   * avatar 组件参数
   * avatarOnTap 组件在点击时触发的事件
   */
  avatarOnTap: () => {}
}

export function setConfig(obj) {
  Object.keys(obj).forEach((key) => {
    if (config.hasOwnProperty(key)) {
      config[key] = obj[key]
    }
  })
  return config
}

export function getConfig(key) {
  return key ? (config.hasOwnProperty(key) ? config[key] : null) : config
}
