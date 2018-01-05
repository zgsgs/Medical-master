// pages/Personal/IntegrationDetails/IntegrationDetails.js
var appInstance = getApp();
var requestApi = require('../../../utils/requestApi.js');
Page({
  /**
   * 页面的初始数据
   */
  data: {
    Details:[],
    offset: 0,
    isloadmore: true,
    isMore: false,
    RefreshNode: Date.parse(new Date()) / 1000
  },
  lower:function(res){
    console.log(res)
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    getIntegrationDetails(this, appInstance)
  },
  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function (res) {
    if ((Date.parse(new Date()) / 1000) - this.data.RefreshNode >= 5) {
      this.setData({
        isloadmore: true,
      })
      getIntegrationDetails(this, appInstance)
    }
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  }
})
//积分明细
function getIntegrationDetails(that, appInstance) {
  wx.request({
    url: 'https://xcx.yzw0525.com/api/getIntegrationDetails',
    data: {
      openid: appInstance.globalData.openid,
      offset: that.data.offset,
      limit: 11
    },
    method: "POST",
    header: {
      'content-type': 'application/json',
      'Verification': appInstance.globalData.VERIFICATION,
    },
    success: function (res) {
      setTimeout(function(){
        var resData = res.data;
        if (resData.errCode == 200) {
          if (resData.item.length > 0) {
            var newDetails = resData.item;
            var Details = that.data.Details;
            if (Details.length > 0) {
              that.data.Details = that.data.Details.concat(newDetails)
            } else {
              that.data.Details = newDetails
            }
            console.info(that.data.Details)
            that.setData({
              isloadmore: false,
              Details: that.data.Details,
              offset: that.data.offset + newDetails.length
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
            // success: function () {
            //   setTimeout(function () {
            //     wx.redirectTo({
            //       url: '/pages/user/user'
            //     })
            //   }, 1000)
            // }
          })

        }
      },1500)
    }
  })
}