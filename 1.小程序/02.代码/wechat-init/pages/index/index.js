// pages/index/index.js
const citySelector = requirePlugin('citySelector');
Page({

  /**
   * 页面的初始数据
   * 乞丐版深拷贝:JSON.parse(JSON.stringify(obj))
   */
  data: {
    msg:"我是初始化的数据",
    userInfo:{},
    city:"",
    canIUse:false
  },

  getCity(){
    const key = 'BZ7BZ-QQWCU-DHWV2-BFJJG-B2JZF-KSBT3'; // 使用在腾讯位置服务申请的key
    const referer = '七月入栈'; // 调用插件的app的名称
    const hotCitys = '北京,上海,武汉,深圳,泉州'; // 用户自定义的的热门城市

    wx.navigateTo({
      url: `plugin://citySelector/index?key=${key}&referer=${referer}&hotCitys=${hotCitys}`,
    })
  },

  getUserProfile() {
    // console.log('getUserProfile')

    wx.getUserProfile({
      desc: "用于测试",
      success: (detail) => {
        // console.log('success', detail)
        this.setData({
          userInfo: detail.userInfo
        })
      }
    })
  },

  getUserInfo(event){
    console.log('getUserInfo', event)
    if(event.detail.userInfo){
      // 能进入这里,说明用户点击了允许获取授权
      this.setData({
        userInfo: event.detail.userInfo
      })
    }
  },

  changeMsg(){
    this.setData({
      msg:666
    })
  },

  handleClick(){
    // console.log('handleClick')
    wx.navigateTo({
      url: '/pages/log/log',
    })
    // wx.redirectTo({
    //   url: '/pages/log/log'
    // })
  },

  handleParent() {
    // console.log('handleParent')
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // debugger
    // console.log('msg',this.data.msg)
    // this.data.msg="我是修改之后的数据"
    // this.setData({
    //   msg:"我是修改之后的数据"
    // })
    // // console.log('msg1', this.data.msg)
    // this.setData({
    //   msg: "我是修改之后的数据1"
    // })
    // this.setData({
    //   msg: "我是修改之后的数据2"
    // })
    // this.setData({
    //   msg: "我是修改之后的数据3"
    // })


    // console.log('wx.getUserProfile', wx.getUserProfile)

    // console.log(wx.canIUse("getUserProfile"))
    const canIUse = wx.canIUse("getUserProfile");
    if (canIUse){
      this.setData({
        canIUse
      });

      // 能进入这里说明用户的微信基础库版本高于2.15.0
      // 获取本地存储Storage中的用户信息
    } else {
      // 能进入这里说明用户的微信基础库版本低于2.15.0
    // 通过js获取到用户的信息,并且更新到data中即可
      wx.getUserInfo({
        success:(detail)=>{
          // console.log('success', detail)
          this.setData({
            userInfo: detail.userInfo
          })
        }
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
    const selectedCity = citySelector.getCity();
    // console.log('selectedCity', selectedCity)
    if (selectedCity) {
      this.setData({
        city: selectedCity.name
      })
    }
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