// pages/infouser/infouser.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    array1:['成都','南京','合肥','贵阳','长沙'],
    index1:-1,
    phoneNum:"",
    name:"",
    validateCode:"",
    isAgree:false,
    timer: "",
    countDownNum: "30",
    flag: true,
    word: "获取验证码"
  },
  bindArray1Change: function (e) {
    this.setData({
      index1: e.detail.value
    })
  },
  bindNameInput: function(e){
    this.setData({
      name: e.detail.value
    })
  },
  bindPhoneInput:function(e){
    this.setData({
      phoneNum: e.detail.value
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(app.globalData.sets)
  },
  bindAgreeChange: function (e) {
    this.setData({
      isAgree: !!e.detail.value.length
    });
  },
  bindAgreeClick: function (e) {

  },
  bindGetValidateCode: function () {
    if (!this.data.flag) return;
    if ("" === this.data.name || this.data.index1 < 0 || "" === this.data.phoneNum) wx.showToast({
      title: "请完善信息",
      icon: "none",
      duration: 2e3
    }); else if (/^1(3|4|5|6|7|8|9)\d{9}$/.test(this.data.phoneNum)) {
      var t = this;
      t.setData({
        flag: false,
        word: t.data.countDownNum + "s"
      })
      t.countDown();
    } else wx.showToast({
      title: "请填写正确的手机号码",
      icon: "none",
      duration: 2e3
    });
  },
  countDown: function () {
    var t = this
    var e = t.data.countDownNum;
    t.setData({
      timer: setInterval(function () {
        e-- ,  t.setData({
          word: e + "s"
        }), e <= 0 && (t.setData({
          word: "获取验证码",
          flag: true
        }), clearInterval(t.data.timer));
      }, 1e3)
    });
  },
  bindSubmit: function(){

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
    this.setData({
      isAgree: app.globalData.isAgree
    })
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