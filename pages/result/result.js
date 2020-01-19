// pages/result/result.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    total:50,
    img1:"/img/company.png",
    img2:"/img/house.png",
    title1:"企业助贷",
    title2:"房产助贷",
    remark1:"可单签，不考察，审批快，中小企业长期资金助力",
    remark2:"条件限制宽松，通过率高，利息低，大额资金首选",
    rate1:"0.42% ~ 1.15%",
    rate2:"0.34% ~ 0.84%",
    time1:"12、36、48",
    time2:"1 ~ 20年",
    subtitle1:"可贷期限",
    subtitle2:"可贷期限" 
  },

setData1:function(){
  this.setData({
    img1: "/img/company.png",
    img2: "/img/house.png",
    title1: "企业助贷",
    title2: "房产助贷",
    remark1: "可单签，不考察，审批快，中小企业长期资金助力",
    remark2: "条件限制宽松，通过率高，利息低，大额资金首选",
    rate1: "0.42% ~ 1.15%",
    rate2: "0.34% ~ 0.84%",
    time1: "12、36、48",
    time2: "1 ~ 20年",
    subtitle1: "可贷期限",
    subtitle2: "可贷期限" 
  })
},
  setData2: function () {
    this.setData({
      img1: "/img/credit.png",
      img2: "/img/online.png",
      title1: "信用助贷",
      title2: "线上助贷",
      remark1: "无抵押，快至当天放款，工资、社保、公积金、保单均可申请",
      remark2: "无抵押，方便快捷，当天下款，有信用卡，打工资卡，社保，公积金，保单均可申请",
      rate1: "0.31% ~ 1.17%",
      rate2: "0.28% ~ 1.19%",
      time1: "12 ~ 60期",
      time2: "3 ~ 36期",
      subtitle1: "还款周期",
      subtitle2: "还款周期"
    })
  },
  showInfo: function(){
    wx.showToast({
      title: "稍后客服会与您联系，请保持电话的畅通",
      icon: "none",
      duration: 2e3
    });
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      total: options.total
    })
    if(this.data.total <= 15){
      this.setData1()
    }else{
      this.setData2()
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