// exchange.js
var appInstance = getApp();
Page({
  
  /**
   * 页面的初始数据
   */
  data: {
    Exchange: [],
    offset: 0,
    isloadmore: true,
    isMore: false,
    RefreshNode: Date.parse(new Date()) / 1000
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onShow: function (options) {
    getExchangeList(this, appInstance)
  },
  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    if ((Date.parse(new Date()) / 1000) - this.data.RefreshNode >= 5) {
      this.setData({
        isMore: false,
        isloadmore: true
      })
      getExchangeList(this, appInstance)
    }
  },
  ordersState:function(id){
    var data={
        "0": "未领取",
        "1": "已领取",
        "2": "超时未领取",
        "3": "已撤销",
      };
    return data[id];
  }
})
//积分明细
function getExchangeList(that, appInstance) {
  wx.request({
    url: 'https://xcx.yzw0525.com/api/queryOrdersList',
    data: {
      openid: appInstance.globalData.openid,
      offset: that.data.offset,
      limit: 6
    },
    method: "POST",
    header: {
      'content-type': 'application/json',
      'Verification': appInstance.globalData.VERIFICATION,
    },
    success: function (res) {
      setTimeout(function () {
        var resData = res.data;
        if (resData.errCode == 200) {
          if (resData.item.length > 0) {
            var newExchange = resData.item;
            var Exchange = that.data.Exchange;
            if (Exchange.length > 0) {
              Exchange = Exchange.concat(newExchange)
            } else {
              Exchange = newExchange
            }
            console.info(Exchange)
            that.setData({
              isloadmore: false,
              Exchange: Exchange,
              offset: that.data.offset + newExchange.length
            })
          } else {
            that.setData({
              isMore: true,
              isloadmore: false,
              RefreshNode: Date.parse(new Date()) / 1000 + 5
            })
          }
        } else {
          wx.showToast({
            title: resData.errmsg,
            image: '/icon/icon_tips.svg',
            duration: 2000,
          })
          that.setData({
            isMore: true,
            isloadmore: false,
            RefreshNode: Date.parse(new Date()) / 1000 + 5
          })
        }
      }, 1500)
    }
  })
}