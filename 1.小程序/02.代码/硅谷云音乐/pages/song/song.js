// pages/song/song.js
import req from '../../utils/req.js';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    isPlay:false,
    songObj:{},
    musicUrl:"",
    songId:""
  },

  // 用于监视用户点击播放按钮操作
  async handlePlay(){
    console.log('handlePlay')

    // const { data: [{ url }] } = await req('/song/url', { id: this.data.songId });
    const result = await req('/song/url', { id: this.data.songId });
    const url = result.data[0].url;
    const backgroundAudioManager = wx.getBackgroundAudioManager();

    // 我们通过isPlay状态,记录当前页面是否正在播放
    // 如果isPlay状态为false,就代表当前页面没有播放或者歌曲暂停了
    // 如果isPlay状态为true,就代表当前页面正在播放歌曲
    if (!this.data.isPlay) {
      backgroundAudioManager.src = url;
      backgroundAudioManager.title = this.data.songObj.name;
    }else{
      backgroundAudioManager.pause();
    }

    this.setData({
      isPlay:!this.data.isPlay,
      musicUrl: url
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad:async function (options) {
    // console.log('options', options)
    // query传参是拼接在路径中的,而路径具有长度限制
    // 当前直接传递歌曲信息对象,由于对象体积太大,导致传输数据丢失
    const songId = options.songId;
    // console.log(songId)

    // 根据歌曲id,发送请求,获取当前歌曲详细信息,进行展示
    const result = await req('/song/detail', { ids: songId});
    // console.log('result', result)
    this.setData({
      songObj:result.songs[0],
      songId
    })

    // 除了在app.json的window中或者每个页面的json文件中可以静态注入导航栏标题
    // 还可以通过该API动态修改当前页面导航栏标题
    wx.setNavigationBarTitle({
      title:this.data.songObj.name
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