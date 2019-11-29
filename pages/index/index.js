//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    
  },
  clickTest: function(option){
    wx.navigateTo({
      url: '../infoprofession/infoprofession',
    })
  }
})
