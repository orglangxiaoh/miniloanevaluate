var sliderWidth = 96; // 需要设置slider的宽度，用于计算中间位置

Page({
  data: {
    tabs: ["上班族", "企业主", "个体户", "其他"],
    activeIndex: 0,
    sliderOffset: 0,
    sliderLeft: 0,
    
    array1: ["5000￥以下", "5000-10000￥", "10000-20000￥", "20000￥以上"],
    array2: ["有", "无"],
    array3: ["有", "无"],
    index1: -1,
    index2: -1,
    index3: -1
  },
  onLoad: function () {
    var that = this;
    wx.getSystemInfo({
      success: function (res) {
        that.setData({
          sliderLeft: (res.windowWidth / that.data.tabs.length - sliderWidth) / 2,
          sliderOffset: res.windowWidth / that.data.tabs.length * that.data.activeIndex
        });
      }
    });
  },
  tabClick: function (e) {
    this.setData({
      sliderOffset: e.currentTarget.offsetLeft,
      activeIndex: e.currentTarget.id
    });
  },
  bindArray1Change: function (e) {
    this.setData({
      index1: e.detail.value
    })
  },
  bindArray2Change: function (e) { 
    this.setData({
      index2: e.detail.value
    })
  },
  bindArray3Change: function (e) {
    this.setData({
      index3: e.detail.value
    })
  }
});