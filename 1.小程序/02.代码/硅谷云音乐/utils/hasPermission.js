export default function(){
  const cookie = wx.getStorageSync("cookie");
  if (!cookie) {
    wx.showModal({
      title: '请先登录',
      content: '该功能需要登陆之后才能使用',
      confirmText: "去登陆",
      cancelText: "回到首页",
      success({ confirm }) {
        // console.log('success', res)
        if (confirm) {
          // 能进入这里,说明用户点击了确定按钮
          wx.navigateTo({
            url: '/pages/login/login',
          })
        } else {
          // 能进入这里,说明用户点击了取消按钮
          wx.switchTab({
            url: '/pages/index/index',
          })
        }
      }
    })
    return false;
  }
  return true;
}