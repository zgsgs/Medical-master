// pages/shopping/exchange/exchangesuccess.js
var appInstance = new getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    isMore:false,
    isloadmore:true,
    OrdersInfos:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options)
    if (options.OrderNumber == undefined){
      this.setData({
        isMore: true,
        isloadmore: false
      })
    }else{
      queryOrders(this, appInstance, options.OrderNumber)
    }
  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function (options) {
    if (appInstance.count(appInstance.globalData.userInfo) == 0) {
      wx.navigateTo({
        url: '/pages/login/login'
      })
    }
  },
})
function queryOrders(that, appInstance, OrderNumber){
  wx.request({
    url: 'https://xcx.yzw0525.com/api/queryOrders',
    data: {
      OrderNumber: OrderNumber
    },
    method: "POST",
    header: {
      'content-type': 'application/json',
      'Verification': appInstance.globalData.VERIFICATION,
    },
    success: function (res) {
      var resData = res.data;
      if (resData.errCode == 200) {
        if (appInstance.count(resData.item) > 0 ) {
          that.setData({
            isloadmore: false,
            isMore: false,
            OrdersInfos: resData.item
          })
        } else {
          that.setData({
            isMore: true,
            isloadmore: false
          })
        }
      } else {
        wx.showToast({
          title: resData.errmsg,
          image: '/icon/icon_tips.svg',
          duration: 2000
        })
      }
    }
  })
}