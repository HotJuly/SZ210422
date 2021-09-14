// pages/index/index.js
Page({

  /**
   * 页面的初始数据
   * 乞丐版深拷贝:JSON.parse(JSON.stringify(obj))
   */
  data: {
    msg:"我是初始化的数据"
  },

  handleClick(){
    console.log('handleClick')
  },

  handleParent() {
    console.log('handleParent')
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // console.log('msg',this.data.msg)
    // this.data.msg="我是修改之后的数据"
    this.setData({
      msg:"我是修改之后的数据"
    })
    // console.log('msg1', this.data.msg)
    this.setData({
      msg: "我是修改之后的数据1"
    })
    this.setData({
      msg: "我是修改之后的数据2"
    })
    this.setData({
      msg: "我是修改之后的数据3"
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