var sliderWidth = 96; // 需要设置slider的宽度，用于计算中间位置
const app = getApp()
Page({
  data: {
    tabs: ["有", "无"],
    activeIndex: 0,
    sliderOffset: 0,
    sliderLeft: 0,

    array1: ["按揭车", "全款车"],  
    index1: -1, 
    worthTotal: "",
    monthlyPay: "",

    initTotal: 0,  //初始金额

    total: 0,  //计算出的总金额
    value2: 0,  //千位
    value3: 0,  //百位
    value4: 0,  //十位
    value5: 0,  //个位 

    showDialog: false
  },
  /*计算可贷款总金额 */
  calTotalMoney: function () {
    var money = this.data.initTotal * 1
    if(this.data.activeIndex == 0){
      if (this.data.index1 == 0 && this.data.monthlyPay != "") {  //按揭房
        money += 30 * this.data.monthlyPay / 1e4
      } else if (this.data.index1 == 1 && this.data.worthTotal != "") {
        money += .7 * this.data.worthTotal;
      } else {

      }
    }
    return money
  },
  /*显示顶部的总金额数字 */
  showMoney: function () {
    var t = "" + Math.round(this.data.total);
    1 === t.length ? this.setData({
      value2: 0,
      value3: 0,
      value4: 0,
      value5: t
    }) : 2 === t.length ? this.setData({
      value2: 0,
      value3: 0,
      value4: t[0],
      value5: t[1]
    }) : 3 === t.length ? this.setData({
      value2: 0,
      value3: t[0],
      value4: t[1],
      value5: t[2]
    }) : 4 === t.length && this.setData({
      value2: t[0],
      value3: t[1],
      value4: t[2],
      value5: t[3]
    })
  },

  calAndShowMoney: function () {
    var totalMoney = this.calTotalMoney()
    this.setData({
      total: totalMoney
    })
    this.showMoney()
  },
  clearInputs: function () {
    this.setData({
      index1: -1,
      total: 0,
      worthTotal: "",
      monthlyPay: ""
    })
  },
 
  onLoad: function (options) {
    this.setData({
      initTotal: options.total
    })
    var that = this;
    wx.getSystemInfo({
      success: function (res) {
        that.setData({
          sliderLeft: (res.windowWidth / that.data.tabs.length - sliderWidth) / 2,
          sliderOffset: res.windowWidth / that.data.tabs.length * that.data.activeIndex
        });
      }
    });
    this.calAndShowMoney()
  },
  tabClick: function (e) {
    this.setData({
      sliderOffset: e.currentTarget.offsetLeft,
      activeIndex: e.currentTarget.id
    });
    this.clearInputs()
    this.calAndShowMoney()
  },
  bindArray1Change: function (e) {
    this.setData({
      index1: e.detail.value
    })
    this.calAndShowMoney()
  },
  bindWorthTotalInput: function (t) {
    if (t.detail.value > 1e3) {
      wx.showToast({
        title: "车产价值额度不允许超过1000万",
        icon: "none",
        duration: 1e3
      });
      return 1e3
    }

    this.setData({
      worthTotal: t.detail.value
    })
    this.calAndShowMoney()
  },
  bindMoneyPayInput: function (t) {
    if (t.detail.value > 5e4) {
      wx.showToast({
        title: "月供金额不允许超过5万",
        icon: "none",
        duration: 1e3
      });
      return 5e4
    }
    this.setData({
      monthlyPay: t.detail.value
    })
    this.calAndShowMoney()
  },
  //打开提示框
  openConfirm: function () {
    wx.showModal({
      title: '提示',
      content: '请完善信息',
      confirmText: "确定",
      cancelText: "取消",
      success: function (res) {
      }
    });
  },
  onBtnClick: function (e) {
    switch (this.data.activeIndex) {
      case 0:      
        if (this.data.index1 < 0 
          || (this.data.index1 == 0 && this.data.monthlyPay == "") 
          || (this.data.index1 == 1 && this.data.worthTotal == "")) {
          this.openConfirm()
        } else {
         this.navigateToNext()
        }
        break
      default:
       this.navigateToNext()
        break
    }
  },
  navigateToNext: function(){ 
    var t = app.globalData.sets
    t.hasCar = this.data.tabs[this.data.activeIndex] 
    t.carType = this.data.index1 >= 0 ? this.data.array1[this.data.index1] : ""
    t.carMonthly = this.data.index1 == 0 ? this.data.monthlyPay * 1 : 0
    t.carWorth = this.data.index1 == 1 ? this.data.worthTotal * 1 : 0
   
    t.total = this.data.total
    wx.navigateTo({
      url: '../infoinsurance/infoinsurance?total=' + this.data.total,
    })
  }
});