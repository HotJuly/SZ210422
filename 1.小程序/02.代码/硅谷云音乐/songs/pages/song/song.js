// pages/song/song.js
const appInstance = getApp();

import PubSub from 'pubsub-js';
import moment from 'moment'

import req from '../../../utils/req.js';
// console.log('PubSub',PubSub)
Page({

  /**
   * 页面的初始数据
   */
  data: {
    isPlay:false,
    songObj:{},
    musicUrl:"",
    songId:"",
    currentTime:"00:00",
    durationTime:"--:--",
    currentWidth:0
  },

  // 用于绑定背景音频相关的事件监听
  addEvent(){
    // console.log('addEvent')

    // 用于监视背景音频播放
    this.backgroundAudioManager.onPlay(()=>{
      // console.log('onPlay')

      if (appInstance.globalData.audioId === this.data.songId) {
        this.setData({
          isPlay: true
        })
      }

      appInstance.globalData.playState = true;
    })


    // 用于监视背景音频暂停
    this.backgroundAudioManager.onPause(() => {
      // console.log('onPause')
      if (appInstance.globalData.audioId === this.data.songId){
        this.setData({
          isPlay: false
        })
      }
      appInstance.globalData.playState = false;
    })

    // 用于监视背景音频进度更新
    this.backgroundAudioManager.onTimeUpdate(()=>{

      // moment需要的是毫秒值
      const currentTime = moment(this.backgroundAudioManager.currentTime *1000).format('mm:ss');
      // console.log('onTimeUpdate', currentTime)

      const currentWidth = this.backgroundAudioManager.currentTime *100 / this.backgroundAudioManager.duration;

      this.setData({
        currentTime,
        currentWidth
      })
    })
  },

  // 用于监视用户点击上一首/下一首操作
  switchSong(){
    // console.log('switchSong')
    PubSub.publish('switchType',"next");
  },

  // 用于监视用户点击播放按钮操作
  async handlePlay(){
    // console.log('handlePlay')

    // const { data: [{ url }] } = await req('/song/url', { id: this.data.songId });
    if (!this.data.musicUrl) {
      await this.getMusicUrl();
    }
    // const backgroundAudioManager = wx.getBackgroundAudioManager();

    // 我们通过isPlay状态,记录当前页面是否正在播放
    // 如果isPlay状态为false,就代表当前页面没有播放或者歌曲暂停了
    // 如果isPlay状态为true,就代表当前页面正在播放歌曲
    if (!this.data.isPlay) {
      //能进入到这里,说明当前背景音频没有在播放
      this.backgroundAudioManager.src = this.data.musicUrl;
      this.backgroundAudioManager.title = this.data.songObj.name;

      // 将当前正在播放的歌曲id保存到app对象身上
      appInstance.globalData.audioId = this.data.songId;
      // 将当前背景音频的歌曲的状态保存到app对象身上
      appInstance.globalData.playState = true;

    } else {
      //能进入到这里,说明当前背景音频正在播放
      this.backgroundAudioManager.pause();

      // 此处不需要再次缓存当前歌曲id,因为能进入到这里,说明之前一定经过了上面的播放逻辑
      // 将当前背景音频的歌曲的状态保存到app对象身上
      appInstance.globalData.playState = false;
    }

    this.setData({
      isPlay:!this.data.isPlay
    })
  },

  // 专门用于请求歌曲详细信息
  async getMusicDetail(){
    const result = await req('/song/detail', { ids: this.data.songId });
    // console.log('result', result)
    this.setData({
      songObj: result.songs[0],
      durationTime: moment(result.songs[0].dt).format('mm:ss')
      // durationTime: moment(this.data.songObj.dt)
    })

    // 除了在app.json的window中或者每个页面的json文件中可以静态注入导航栏标题
    // 还可以通过该API动态修改当前页面导航栏标题
    wx.setNavigationBarTitle({
      title: this.data.songObj.name
    })
  },

  // 专门用于请求歌曲音频链接
  async getMusicUrl(){
    const result = await req('/song/url', { id: this.data.songId });
    const url = result.data[0].url;
    this.setData({
      musicUrl: url
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad:async function (options) {
    // 尝试读取app实例对象身上的msg数据
    // console.log('globalData1', appInstance.globalData.msg)
    // appInstance.globalData.msg="我是全局修改之后的数据"
    // console.log('globalData2', appInstance.globalData.msg)


    // console.log('options', options)
    // query传参是拼接在路径中的,而路径具有长度限制
    // 当前直接传递歌曲信息对象,由于对象体积太大,导致传输数据丢失
    const songId = options.songId;
    this.setData({
      songId
    })
    // console.log(songId)

    // 根据歌曲id,发送请求,获取当前歌曲详细信息,进行展示
    // const result = await req('/song/detail', { ids: songId});
    // // console.log('result', result)
    // this.setData({
    //   songObj:result.songs[0],
    //   songId
    // })

    // 除了在app.json的window中或者每个页面的json文件中可以静态注入导航栏标题
    // 还可以通过该API动态修改当前页面导航栏标题
    // wx.setNavigationBarTitle({
    //   title:this.data.songObj.name
    // })

    this.backgroundAudioManager = wx.getBackgroundAudioManager();

    this.getMusicDetail();

    // 当用户进入song页面时,如果背景音频正在播放的歌曲和当前页面是同一首歌,页面C3自动进入播放状态
    const {playState,audioId} = appInstance.globalData;
    if (playState && audioId===this.data.songId){
      this.setData({
        isPlay:true
      })
    }

    this.addEvent();

    this.sendIdToken = PubSub.subscribe('sendId', async (msg, songId) => {
      console.log('sendId', msg, songId)
      this.setData({
        songId
      });

      this.getMusicDetail();

      await this.getMusicUrl();

      // const backgroundAudioManager = wx.getBackgroundAudioManager();

      this.backgroundAudioManager.src = this.data.musicUrl;
      this.backgroundAudioManager.title = this.data.songObj.name;

      this.setData({
        isPlay: true
      })

      // 将当前正在播放的歌曲id保存到app对象身上
      appInstance.globalData.audioId = this.data.songId;
      // 将当前背景音频的歌曲的状态保存到app对象身上
      appInstance.globalData.playState = true;
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
    // 解绑当前页面绑定的消息订阅
    PubSub.unsubscribe(this.sendIdToken);
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