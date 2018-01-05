// pages/shopping/shoppinginfos.js
var WxParse = require('../../plug-ins/wxParse/wxParse.js');
var appInstance = new getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    isloadmore:true,
    isMore: false,
    loading:false,
    disabled: false,
    exchangebtn:"立即兑换",
    swiperW:0,
    integralbalance:0,
    ShoopingId:0,
    ShoopingInfo:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    if (options.id != undefined){
      this.setData({
        ShoopingId: options.id
      })
      getShoopingInfos(this, appInstance, options.id)
    }
  },
  MyfromSubmit:function(res){
    
    var postData = res.detail.value
    postData.openid = appInstance.globalData.openid
    this.setData({
      loading: true,
      disabled:true
    })
    addShoppingOrders(this,appInstance,postData)
  },
  onPullDownRefresh: function (res) {
    var ShoopingId = this.data.ShoopingId
    if (ShoopingId != 0) {
      getShoopingInfos(this, appInstance, ShoopingId)
    }
  },
  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  }
})
//获取商品详细信息
function getShoopingInfos(that, appInstance, ShoopingId){
  wx.request({
    url: 'https://xcx.yzw0525.com/api/GetShoppingInfos',
    data: {
      ShoopingId: ShoopingId
    },
    method: "POST",
    header: {
      'content-type': 'application/json',
      'Verification': appInstance.globalData.VERIFICATION,
    },
    success: function (res) {
      var resData = res.data;
      var swiperW=0;
      if (resData.errCode == 200) {
        if (resData.item != ''){
          wx.getSystemInfo({//获取页面宽度
            success: function (res) {
              swiperW = res.windowWidth
            }
          })
          var disabled = appInstance.globalData.userInfo.integral != undefined && (appInstance.globalData.userInfo.integral >= resData.item.integral) ? false : true;
          var exchangebtn = disabled ? "积分不足" : "立即兑换"
          that.setData({
            isloadmore:false,
            isMore:false,
            ShoopingId: ShoopingId,
            ShoopingInfo: resData.item,
            swiperW: swiperW,
            integralbalance: appInstance.globalData.userInfo.integral,
            disabled: disabled,
            exchangebtn: exchangebtn
          })
          
          WxParse.wxParse('article', 'html', resData.item.describe, that, 5);
        }else{
          that.setData({
            isMore: true,
            isloadmore:false
          })
        }
        wx.stopPullDownRefresh()//下拉回弹
      }else{
        wx.showToast({
          title: resData.errmsg,
          image: '/icon/icon_tips.svg',
          duration: 2000
        })
      }
    }
  })
}
//提交订单
function addShoppingOrders(that, appInstance, postData){
  wx.showLoading({
    title: '加载中',
  })
  wx.request({
    url: 'https://xcx.yzw0525.com/api/addShoppingOrders',
    data: postData,
    method: "POST",
    header: {
      'content-type': 'application/json',
      'Verification': appInstance.globalData.VERIFICATION,
    },
    success: function (res) {
      console.log(res)
      var resData = res.data;
      if (resData.errCode == 200) {
        wx.showToast({
          title: '恭喜！兑换成功',
          icon: 'success',
          duration: 2000
        })
        appInstance.globalData.userInfo.integral = resData.integralbalance
        wx.setStorageSync('userinfo', appInstance.globalData.userInfo)
        that.setData({
          loading: false,
          exchangebtn: "兑换成功",
          integralbalance: resData.integralbalance
        })
        setTimeout(function(){
          wx.navigateTo({
            url: '/pages/shopping/exchange/exchangesuccess?OrderNumber=' + resData.OrderNumber
          })
        },1500)
      } else {
        wx.showToast({
          title: res.errMsg,
          image: '/icon/icon_tips.svg',
          duration: 2000
        })
      }
    }
  })
}