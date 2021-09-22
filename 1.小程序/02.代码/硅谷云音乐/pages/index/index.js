import req from '../../utils/req.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // 用于存储轮播图数据
    banners:[],

    // 用于存储推荐歌曲区域数据
    recommendList:[],

    // 用于存储排行榜区域数据
    topList:[]
  },

  // 用于监视用户点击每日推荐按钮,跳转每日推荐页面
  toRecommendSong(){
    wx.navigateTo({
      url: '/pages/recommendSong/recommendSong',
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad:async function (options) {
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
    // wx.request({
    //   url:"http://localhost:3000/banner",
    //   data:{
    //     type:2
    //   },
    //   success:(res)=>{
    //     // console.log('res', res)
    //     this.setData({
    //       banners: res.data.banners
    //     })
    //   }
    // })

    // 问题:Cannot read property 'mark' of undefined
    // 原因:当前微信小程序环境不支持async和await
    // 解决:

    //用于请求轮播图数据
    let result = req('/banner',{type:2});
    // console.log('result', result)
    result.then((res) => {
      this.setData({
        banners: res.banners
      })
    })


    //用于请求推荐歌曲数据
    let result1 = req('/personalized');
    result1.then((res) => {
      this.setData({
        recommendList: res.result
      })
    })

    // wx.request({
    //   url: "http://localhost:3000/personalized",
    //   success: (res) => {
    //     // console.log('res', res)
    //     this.setData({
    //       recommendList: res.data.result
    //     })
    //   }
    // })


    //用于请求排行榜数据
    const topList = [];
    const topArr=[1,2,6,23];
    let index=0;


    //发送请求一定是同步发送
    //接受响应,执行成功之后的回调函数,(默认是异步的,可以同步也可以异步)
    while (index<topArr.length) {
      let obj;
      let topPromise =req('/top/list', { idx: topArr[index++] });

      topPromise.then(({ playlist: { id, name, tracks } }) => {
        obj = {
          id,
          name,
          list: tracks.slice(0, 3).map((song)=>{
            return song.al
          })
        }
        topList.push(obj);
        this.setData({
          topList
        })
      })
    }
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