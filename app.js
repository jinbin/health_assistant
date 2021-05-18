//app.js

const utils = require('./utils/util.js')

//var App = require('./utils/xmadx_sdk.min.js').xmad(App,'App').xmApp;

var plugin = requirePlugin("chatbot")

App({
  articles: require('./data/articles/articles'),
  CC: require('./data/CC'),
  Paths: require('./data/Paths'),
  vols: require('./data/vols'),
  jokes: require('./data/jokes.js'),
  vols_pws: require('./data/vols_pws'),
  divideByPath: require('./data/divideByPath'),
  acronym: require('./data/acronym.js'),

  globalData: {
    userInfo: null,
    open_posts: [],
    activity_posts: [],
    private_posts: [],
    history: [],
    jifen: 0,
    openId: null
  },

  onLaunch: function () {

    // var chat = plugin.getChatComponent();
    // chat.setTextToSpeech(false)

    plugin.init({
      appid: "ufLBZImYnD8DsHC9gTYtCxeECCgFIP", //小程序示例账户，仅供学习和参考
      openid: "",//用户的openid，非必填，建议传递该参数
      success: () => {}, //非必填
      fail: error => {}, //非必填
      textToSpeech: false,
      guideList: ["头马", "演讲", "主席", "教育副主席", "会员副主席", "冠军", "Pathways", "教育路径", "DTM", "主持人", "即兴主持", "缩略词", "公众号"],
      historySize: 20,
      robotHeader: 'https://746d-tmassistant-5275ad-1258071577.tcb.qcloud.la/images/myface_round.png',
      userHeader: 'https://res.wx.qq.com/mmspraiweb_node/dist/static/miniprogrampageImages/talk/rightHeader.png',
      operateCardHeight: 60,
      guideCardHeight: 40,
      navHeight: 0,
    })

    var that = this
    wx.cloud.init({
      traceUser: true,
      env: 'production-a65b5c'
    })

    wx.cloud.callFunction({
      name: "getOpenid",
      success: res => {
        that.globalData.openId = res.result.openid
      }
    })
  },

  // 权限询问
  getRecordAuth: function () {
    wx.getSetting({
      success(res) {
        console.log("succ")
        console.log(res)
        if (!res.authSetting['scope.record']) {
          wx.authorize({
            scope: 'scope.record',
            success() {
              // 用户已经同意小程序使用录音功能，后续调用 wx.startRecord 接口不会弹窗询问
              console.log("succ auth")
            }, fail() {
              console.log("fail auth")
            }
          })
        } else {
          console.log("record has been authed")
        }
      }, fail(res) {
        console.log("fail")
        console.log(res)
      }
    })
  }
})
