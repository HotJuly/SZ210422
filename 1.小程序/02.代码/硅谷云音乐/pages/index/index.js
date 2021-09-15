Page({

  /**
   * 页面的初始数据
   */
  data: {
    banners:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    /*
      发送请求三个问题:
        1.在哪发
          如果是Vue,我们会考虑在created或者mounted中发送请求
        2.怎么发
          小程序全局对象是wx,没有window,所以没法发送ajax请求
          wx.request(Object object)
        3.往哪发
          发送请求三要素:地址,请求方式,参数
          看接口文档
     */
    wx.request({
      url:"http://localhost:3000/banner",
      data:{
        type:2
      },
      success:(res)=>{
        // console.log('res', res)
        this.setData({
          banners: res.data.banners
        })
      }
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
    
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
    
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    
  }
})