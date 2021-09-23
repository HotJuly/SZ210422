// pages/recommendSong/recommendSong.js
import PubSub from 'pubsub-js';

import hasPermission from '../../../utils/hasPermission.js'
import req from '../../../utils/req.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    day:"--",
    month:"--",
    recommendList:[],
    currentIndex:null
  },

  // 用于监视用户点击歌曲列表之后,跳转song页面操作
  toSong(event){
    // console.log('event', event);
    // const song = event.currentTarget.dataset.song

    // 注意:自定义属性大写无效,他会自动将属性名转为小写
    const songId = event.currentTarget.dataset.songid;

    // 在跳转之前获取到当前歌曲的下标,方便后续切换歌曲使用
    const currentIndex = event.currentTarget.dataset.index;

    this.setData({
      currentIndex
    })

    wx.navigateTo({
      url: '/songs/pages/song/song?songId=' + songId
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad:async function (options) {
    // 检测用户是否已经登录,如果没有登录弹出模态对话框
    if (!hasPermission())return;

    const date = new Date();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    this.setData({
      month,
      day
    });

    const recommendData = await req('/recommend/songs');
    this.setData({
      recommendList: recommendData.recommend
    })

    PubSub.subscribe('switchType',(msg,data)=>{
      // console.log('switchType', msg, data)
      let {currentIndex,recommendList} = this.data;
      if (data === "next") {
        // 能进入这里说明用户想要的是下一首歌的数据
        if (currentIndex===recommendList.length-1){
          currentIndex=0;
        } else {
          currentIndex += 1;
        }
      } else {
        // 能进入这里说明用户想要的是上一首歌的数据
        if (currentIndex === 0) {
          currentIndex = recommendList.length - 1;
        } else {
          currentIndex -= 1;
        }
      }
      const newSong = recommendList[currentIndex];
      // console.log(newSong)
      this.setData({
        currentIndex
      })
      PubSub.publish('sendId',newSong.id);
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