var sliderWidth = 96; // 需要设置slider的宽度，用于计算中间位置

Page({
  data: {
    tabs: ["有商业保单", "无商业保单"],
    activeIndex: 0,
    sliderOffset: 0,
    sliderLeft: 0,

    array1: ["缴费期2年以内", "缴费期满2-3年", "缴费期3年以上"],
    index1: -1,
    worthTotal: "",
    monthlyPay: "",

    times: [0, 1, 3],  

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
    if (this.data.activeIndex == 0 && this.data.index1 >= 0) {
      money += this.data.times[this.data.index1]
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
      total: 0
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
    this.calAndShowMoney()
  },
  bindArray1Change: function (e) {
    this.setData({
      index1: e.detail.value
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
  }
});