// pages/shopping/shopping.js
var appInstance=new getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    is_down:true,
    isloadmore: true,
    isMore: false,
    userinfos: null,
    shoppingList: [],
    shoppingRule:[],
    Screen:{},
    screenkey:'',
    offset: 0,
    RefreshNode: Date.parse(new Date()) / 1000,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(appInstance.globalData.userInfo)
    if (appInstance.count(appInstance.globalData.userInfo)>0){
      this.setData({
        userinfos: appInstance.globalData.userInfo
      })
    }
    getshoppingList(this, appInstance)
  },
  onUpdown:function(res){
    var is_down=this.data.is_down==true?false:true;
    this.setData({
      is_down: is_down
    })
  },
  onScreen:function(res){
    var Screen = res.target.dataset.screen == undefined ? '' : res.target.dataset.screen,
      screenkey = res.target.dataset.screenkey == undefined ? '' : res.target.dataset.screenkey;
    var ScreenData={
      "Screen": Screen
    }
    this.setData({
      is_down: true,
      isMore: false,
      isloadmore:true,
      offset:0,
      Screen: ScreenData,
      screenkey: screenkey
    })
    getshoppingList(this, appInstance, 'onScreen')
    console.log(res.target.dataset.screen)
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
      getshoppingList(this, appInstance, 'onReachBottom')
    }
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  }
})
function getshoppingList(that, appInstance, requesttype = 'onload', ) {
  wx.request({
    url: 'https://xcx.yzw0525.com/api/GetShoppingList',
    data: {
      offset: that.data.offset,
      limit: appInstance.globalData.limit,
      requesttype: requesttype,
      Screen: that.data.Screen
    },
    method: "POST",
    header: {
      'content-type': 'application/json',
      'Verification': appInstance.globalData.VERIFICATION,
    },
    success: function (res) {
      var resData = res.data;
      if (resData.errCode == 200) {
        if (requesttype=="onScreen"){//条件筛选
          var newlist = resData.item.shopping;
          var isMore = newlist.length > 0? false:true;
          that.setData({
            isloadmore: false,
            isMore: isMore,
            shoppingList: newlist,
            offset: that.data.offset + newlist.length
          })
        }else{//正常加载
          if (resData.item.shopping.length > 0) {
            var newlist = resData.item.shopping;
            var list = that.data.shoppingList;
            list = list.concat(newlist)
            if (requesttype == "onload"){
              that.setData({
                isloadmore: false,
                shoppingList: list,
                shoppingRule: resData.item.rule,
                offset: that.data.offset + newlist.length
              })
            }else{
              that.setData({
                isloadmore: false,
                shoppingList: list,
                offset: that.data.offset + newlist.length
              })
            }
          } else {
            that.setData({
              isloadmore: false,
              isMore: true,
              RefreshNode: Date.parse(new Date()) / 1000 + 5
            })
          }
        }
        
      } else {
        wx.showToast({
          title: resData.errmsg,
          image: '/icon/icon_tips.svg',
          duration: 2000
        })

      }

    },
    fail: function () {
      that.setData({
        isMore: true,
      })
    }
  })
}