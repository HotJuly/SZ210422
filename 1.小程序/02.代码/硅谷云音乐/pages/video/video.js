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

    navId:null,

    // 用于控制scroll-view组件,下拉动画的开关
    isTrigger:false,

    // 用于控制页面上video组件的显示隐藏
    currentId:null
  },

  // 用于监视用户点击图片操作,并切换对应的视频标签进行显示播放
  handleImgTap(event){
    console.log('handleImgTap')

    // 1.将对应的video标签显示出来
    const vid = event.currentTarget.id;

    // setData可以传入第二个实参,数据类型是函数
    // 该函数会在页面更新结束之后才执行
    this.setData({
      currentId:vid
    },()=>{
      // 通过image的id属性,找到页面上显示的对应的video组件,并控制他自动播放
      const videoContext = wx.createVideoContext(vid);
      videoContext.play();
    })

    
  },

  // 用于监视用户上拉scroll-view组件触底操作
  handlerScrollToLower(){
    // console.log('handlerScrollToLower')
    setTimeout(()=>{

      let newVideoList = [...this.data.videoList, ...this.data.videoList.slice(0, 8)];

      this.setData({
        videoList: newVideoList
      })

    },2000)
  },

  // 用于监视用户下拉scroll-view组件操作
  async handlePullDown(){
    // console.log('handlePullDown')
    await this.getVideoList();
    this.setData({
      isTrigger:false
    })
  },

  // 用于测试暂停播放视频的API的效果
  testApi(){
    // console.log('testApi')
    // 当用户点击logo图片,停止第一个视频的播放
    /*
      1.通过wx.createVideoContext创建一个video上下文对象
      2.通过调用video上下文对象的pause方法,可以暂停对应视频的播放
     */
    const videoContext = wx.createVideoContext('C3928EB0C3B2EC853927376EE4132BE0');
    videoContext.pause();
  },

  // 用于监视用户播放视频操作
  handlePlay(event){
    // console.log('handlePlay', event.currentTarget.id)

    // console.log('old',this.oldVId)

    // 通过event.currentTarget.id,可以获取到当前正在播放视频的video的id属性
    const id = event.currentTarget.id;

    if (this.oldVId&&this.oldVId!==id) {
      // 如果当前是第一次播放视频,就没有上一次,不需要停止上一次的视频
      // 如果当前这次视频和上一次的视频是同一个,也不需要暂停视频
      const videoContext = wx.createVideoContext(this.oldVId);
      videoContext.pause();
    }

    // setTimeout(() => {
    //   const videoContext = wx.createVideoContext(id);
    //   videoContext.pause();
    // },2000)

    this.oldVId = id;
  },

  // 用于请求对应的标签下的视频列表数据
  async getVideoList(){
    let result1 = await req('/video/group', { id: this.data.navId });
    // console.log(2)
    this.setData({
      videoList: result1.datas.map((item) => {
        return item.data
      })
    })
  },

  // 用于监视用户点击导航区域操作,切换下划线效果
  async changeNavId(event){
    // 此处具有的问题:event.target指向的是当前事件触发过程中,最内层的子元素
    // console.log('changeNavId', event.currentTarget.dataset.id)
    const navId = event.currentTarget.dataset.id;
    // 需要改变navId,从而控制下划线的显示
    // 1.组件通过自定义属性,将每个组件的id传入到当前事件回调函数内部
    // 2.获取每个组件的id,并更新到data中
    this.setData({
      navId,
      videoList:[]
    })

    wx.showLoading({
      title:"正在加载..."
    })
    // console.log(1)
    await this.getVideoList();
    // console.log(3)
    wx.hideLoading();
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

    this.getVideoList();
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
    console.log('onPullDownRefresh')
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    console.log('onReachBottom')
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})