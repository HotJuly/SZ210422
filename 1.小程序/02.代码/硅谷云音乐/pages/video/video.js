// pages/video/video.js
import req from '../../utils/req.js';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // 导航栏区域列表数据
    navList:[],

    // videoList列表数据
    videoList:[],

    navId:null
  },

  // 用于监视用户点击导航区域操作,切换下划线效果
  changeNavId(event){
    // 此处具有的问题:event.target指向的是当前事件触发过程中,最内层的子元素
    // console.log('changeNavId', event.currentTarget.dataset.id)
    const navId = event.currentTarget.dataset.id;
    // 需要改变navId,从而控制下划线的显示
    // 1.组件通过自定义属性,将每个组件的id传入到当前事件回调函数内部
    // 2.获取每个组件的id,并更新到data中
    this.setData({
      navId
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow:async function () {
    /*
      此处注意:tabBar页面具有一个特点,就是加载过一次之后,不会销毁,所以选择生命周期需要慎重
     */

    let result = await req('/video/group/list');
    // console.log('result',result)
    this.setData({
      navList:result.data.slice(0,13),
      navId: result.data[0].id
    })


    let result1 = await req('/video/group',{id:this.data.navId});
    console.log('result1',result1)
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