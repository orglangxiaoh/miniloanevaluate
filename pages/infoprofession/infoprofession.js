var sliderWidth = 96; // 需要设置slider的宽度，用于计算中间位置
const app = getApp()
Page({
  data: {
    tabs: ["上班族", "企业主", "个体户", "其他"],
    activeIndex: 0,  //当前选中的tab
    sliderOffset: 0,
    sliderLeft: 0,
    
    array1: ["5000￥以下", "5000-10000￥", "10000-20000￥", "20000￥以上"],  //收入等级
    array2: ["有", "无"],  //社保状态
    array3: ["有", "无"],  //公积金状态
    index1: -1,   
    index2: -1,
    index3: -1,

    basicArray: [3,5,3,2],  //每种身份初始金额
    increaseArray1:[1,2,5,10],  //每种收入增加金额
    increaseArray2:[2,0],  //有社保增加金额
    increaseArray3:[2,0],  //有公积金增加金额
   
    total: 0,  //计算出的总金额
    value2: 0,  //千位
    value3: 0,  //百位
    value4: 0,  //十位
    value5: 0,  //个位   

    showDialog: false
  },
  /*计算可贷款总金额 */
  calTotalMoney: function () {
     var money = this.data.basicArray[this.data.activeIndex];   
     if(this.data.index1 >= 0){
       money += this.data.increaseArray1[this.data.index1] * 1
     }
     if(this.data.index2 >= 0){
       money += this.data.increaseArray2[this.data.index2] * 1
     }
     if(this.data.index3 >= 0){
       money += this.data.increaseArray3[this.data.index3] * 1
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
      value5: this.data.total
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
    console.log(this.data.value5)
  },
  
  calAndShowMoney: function(){
    var totalMoney = this.calTotalMoney()
    this.setData({
      total: totalMoney
    })
    this.showMoney()
  },
  clearInputs: function(){
    this.setData({
      index1: -1,
      index2: -1,
      index3: -1,
      total: 0
    })
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
  bindArray2Change: function (e) { 
    this.setData({
      index2: e.detail.value
    })
    this.calAndShowMoney()
  },
  bindArray3Change: function (e) {
    this.setData({
      index3: e.detail.value
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
  /* 点击下一步操作 */
  onBtnClick: function(e){
    if (this.data.activeIndex == 0 || this.data.activeIndex == 2 || this.data.activeIndex == 3)
      {
        if(this.data.index1 < 0 || this.data.index2 < 0 || this.data.index3 < 0){
          this.openConfirm()
        }else{
          this.navagateToHoseInfo()
        }
      }
      else{
        if (this.data.index1 < 0) {
          this.openConfirm()
        } else {
          this.navagateToHoseInfo()
        }
     }    
  },
  closeDialog: function () {
    this.setData({
      istrue: false
    })
  },
  navagateToHoseInfo: function(){
    var t = app.globalData.sets
    t.profession = this.data.tabs[this.data.activeIndex]
    t.income = this.data.index1 >= 0 ? this.data.array1[this.data.index1] : ""
    t.socialSecurity = this.data.index2 >= 0 ? this.data.array2[this.data.index2] : ""
    t.accumulationFund = this.data.index3 >= 0 ? this.data.array3[this.data.index3] : ""
    t.total = this.data.total
    wx.navigateTo({
      url: '../infohouse/infohouse?total='+this.data.total
    })
  },
  
});