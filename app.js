//app.js
var GetUser = require('./utils/getuserinfo.js');
App({
  onLaunch: function (cb) {
    var that = this
    var openid = wx.getStorageSync('openid'),
      userInfo = wx.getStorageSync('userinfo');
    wx.checkSession({
      success: function (res) {
        if (!openid == "") {
          that.globalData.openid = openid
          that.globalData.userInfo = userInfo

        } else {
          that.userLogin()
        }
      },
      fail: function (res) {
        that.userLogin()
      }
    })
  },
  userLogin: function () {
    var that = this
    //调用登录接口
    wx.login({
      success: function (login) {
        var code = login.code;
        wx.getUserInfo({
          success: function (res) {
            console.log(res)
            GetUser.getuserinfo(code, JSON.stringify(res), that)

          }
        })
      },
      fail: function (faildata) {

        console.log(faildata)
      }
    })
  },
  globalData: {
    urlpath: "https://xcx.xxxx.com",
    VERIFICATION: "yvQPqgsN8KhzWuph",
    limit: 5,
    userInfo: {},
    openid: null,
    sexarray: ['-', '男', '女'],
    satisfied: ['satisfied1', 'satisfied2', 'satisfied3'],
    yebotel: 'xxx-xxxxxxxx',
  },
  formatTime: function (date) {
    var year = date.getFullYear()
    var month = date.getMonth() + 1
    var day = date.getDate()

    var hour = date.getHours()
    var minute = date.getMinutes()
    var second = date.getSeconds()

    return year + "-" + month + "-" + day;
  },
  count: function (obj) {
    var objType = typeof obj;
    if (objType == "string") {
      return obj.length;
    } else if (objType == "object") {
      var objLen = 0;
      for (var i in obj) {
        objLen++;
      }
      return objLen;
    }
    return false;
  }
})
