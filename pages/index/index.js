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
  },
  onLoad: function(){
    wx.getSystemInfo({
      success: function (res) {
        let clientHeight = res.windowHeight;
        let clientWidth = res.windowWidth;
        let changeHeight = 750 / clientWidth;
        let height = clientHeight * changeHeight;
        console.log(height)
      }
    })
  }
})
