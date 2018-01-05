// pages/Personal/activity/activity.js
var appInstance = getApp();
Page({
  data: {
    isloadmore:true,
    isMore:false,
    activityList:[],
    offset:0,
    RefreshNode: Date.parse(new Date()) / 1000
  },
  onLoad: function (options) {
    getactivityList(this, appInstance)
  },
  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    if ((Date.parse(new Date()) / 1000) - this.data.RefreshNode >=5){
      this.setData({
        isMore: false,
        isloadmore: true
      })
      getactivityList(this, appInstance, 'onReachBottom')
    }
    
  },
  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  }
})
function getactivityList(that, appInstance, requesttype='onload'){
  wx.request({
    url: 'https://xcx.yzw0525.com/api/GetActivityList',
    data: {
      openid: appInstance.globalData.openid,
      offset: that.data.offset,
      limit: appInstance.globalData.limit
    },
    method: "POST",
    header: {
      'content-type': 'application/json',
      'Verification': appInstance.globalData.VERIFICATION,
    },
    success: function (res) {
      var resData = res.data;
      if (resData.errCode == 200) {
        if (resData.item.length > 0) {
          var newlist = resData.item;
          var list = that.data.activityList;
          list = list.concat(newlist)
          that.setData({
            isloadmore: false,
            activityList: list,
            offset: that.data.offset + newlist.length
          })
        } else {
          that.setData({
            isloadmore: false,
            isMore: true,
            RefreshNode: Date.parse(new Date()) / 1000 + 5
          })
        }
      } else {
        wx.showToast({
          title: resData.errmsg,
          image: '/icon/icon_tips.svg',
          duration: 2000
        })

      }

    },
    fail: function(){
      that.setData({
        isMore: true,
      })
    }
  })
}