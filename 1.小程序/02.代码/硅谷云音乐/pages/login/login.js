// pages/login/login.js
import req from '../../utils/req.js';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    phone:"17688197777",
    password:""
  },

  // 监视用户点击登录按钮
  async handleLogin(){
    // 1.收集数据
    const { phone , password } = this.data;

    // 2.前端表单校验
    if(!phone.trim()){
      wx.showToast({
        title:"请检查手机号,手机号不能为空",
        icon:"none"
      })
      return;
    }


    if (!password.trim()) {
      wx.showToast({
        title: "请检查密码,密码不能为空",
        icon: "none"
      })
      return;
    }

    // 3.发送请求
    let result = await req('/login/cellphone',{phone,password});
    /* 
      手机号错误
        该账号不存在 501
        帐号格式错误 400
      密码错误  502
      成功  200
    */
    console.log('result', result)
    const code = result.code;
    // 4.成功做什么
    // 5.失败做什么
    // if(code===200){
    //   // 进入该处说明用户登陆成功
    //   // 弹窗提示用户登录成功,并将页面跳转回到个人中心页面
    //   wx.showToast({
    //     title: '登陆成功,即将跳转',
    //     icon:"none"
    //   })
    // } else if (code === 400) {
    //   wx.showToast({
    //     title: '该账号格式不对',
    //     icon: "none"
    //   })
    // } else if (code === 501) {
    //   wx.showToast({
    //     title: '该账号不存在',
    //     icon: "none"
    //   })
    // } else if (code === 502) {
    //   wx.showToast({
    //     title: '密码错误',
    //     icon: "none"
    //   })
    // }


    // 策略模式写法
    const codeFn={
      200(){
        wx.showToast({
          title: '登陆成功,即将跳转',
          icon:"none"
        });
        wx.setStorage({
          key: 'userInfo',
          data: JSON.stringify(result.profile)
        })
        wx.switchTab({
          url:"/pages/personal/personal"
        });
      },
      400(){
        wx.showToast({
          title: '该账号格式不对',
          icon: "none"
        })
      },
      501(){
        wx.showToast({
          title: '该账号不存在',
          icon: "none"
        })
      },
      502(){
        wx.showToast({
          title: '密码错误',
          icon: "none"
        })
      }
    }

    codeFn[code]&&codeFn[code]();
  },

  handlePhone(event){
    // 获取到当前input框中的内容,并更新到data中
    // 通过event.detail.value可以获取到当前input的内容
    // console.log('handlePhone', event)
    this.setData({
      phone: event.detail.value
    })
  },

  handlePassword(event) {
    // console.log('handlePassword')
    this.setData({
      password: event.detail.value
    })
  },

  // 用于处理用户修改手机号或者密码的操作
  handleInput(event) {
    // 小程序向事件回调函数内部传递数据比较麻烦
    // 需要通过event对象中的target或者currentTarget,配合标签属性实现传参
    // console.log('handleInput', event)

    // 用于获取当前触发该事件的标签身份
    const type = event.target.dataset.type;
    console.log(event)
    this.setData({
      [type]: event.detail.value
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