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
  bindValidateInput: function(e){
    this.setData({
      validateCode: e.detail.value
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
    console.log("发送短信");
    if ("" === this.data.name || this.data.index1 < 0 || "" === this.data.phoneNum) wx.showToast({
      title: "请完善信息",
      icon: "none",
      duration: 2e3
    }) 
    else if (/^1(3|4|5|6|7|8|9)\d{9}$/.test(this.data.phoneNum)) {
      var t = this;
      t.setData({
        flag: false,
        word: t.data.countDownNum + "s"
      })
      this.sendValidateCode(t, this.data.phoneNum)
    } 
    else wx.showToast({
      title: "请填写正确的手机号码",
      icon: "none",
      duration: 2e3
    });
  },
  sendValidateCode:function(t,phoneNumber){
    console.log("请求发送短信接口");
    wx.request({
      url: app.globalData.url + "/Home/SendMessage",
      data: {
        phone: phoneNumber
      },    
      header: {
        'content-type': 'application/x-www-form-urlencoded' // 默认值
      }, 
      method: "get",
      success: function (e) {
        if(true === e.data.isSuccess) {
          wx.showToast({
            title: e.data.message,
            icon: "success",
            duration: 2e3
          })
        }
        else{
          wx.showToast({
            title: e.data.message,
            icon: "none",
            duration: 2e3
          })
        } 
        t.countDown()
      },
      fail: function (t) {
        wx.showModal({
          title: "提示",
          content: t.data.message,
          success: function (t) {
            t.confirm ? console.log("用户点击确定") : t.cancel && console.log("用户点击取消");
          }
        });
      }
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
    console.log(this.data.isAgree)
    if ("" === this.data.name || this.data.index1 < 0 || "" === this.data.phoneNum || this.data.validateCode === ""){
      wx.showToast({
        title: "请完善信息",
        icon: "none",
        duration: 2e3
      })
    }
    else if(!this.data.isAgree){
      wx.showToast({
        title: "同意《相关条款》后才能提交结果",
        icon: "none",
        duration: 2e3
      })
    }  
    else{
      var t = app.globalData.sets
      t.Name = this.data.name
      t.PhoneNumber = this.data.phoneNum
      t.ValidateCode = this.data.validateCode
      t.Region = this.data.array1[this.data.index1]
      console.log(t)
      wx.request({
        url: app.globalData.url + '/Home/AddClientInfo',
        data: t,
        method: "post",
        success: function (e) {
          console.log(e.data)
          if(true === e.data.isSuccess){
            var money = Math.ceil(e.data.total)
            wx.navigateTo({
              url: '../result/result?total='+ money,
            })
          }else{
            wx.showToast({
              title: e.data.message,
              icon: "none",
              duration: 2e3
            })
          }
        },
        fail: function (t) {
          wx.showModal({
            title: "提示",
            content: t.data.message,
            success: function (t) {
              t.confirm ? console.log("用户点击确定") : t.cancel && console.log("用户点击取消");
            }
          });
        }
      });
    } 
  },
 
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    this.setData({
      isAgree: app.globalData.isAgree
    })
  }
})