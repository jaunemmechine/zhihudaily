Page({

  /**
   * 页面的初始数据
   */
  data: {
    dataList: {},
    content: "",
    more_question: "",
    flag: false,
    shortArr: [],
    longArr: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    let id = options.id;
    this.setData({
      id: id
    })
    //let id = 9704683;
    let _this = this;
    wx.request({
      url: 'https://zhihu-agent.herokuapp.com/get?api=/4/news/' + id,
      header: {
        'content-type': 'application/json' // 默认值
      },
      success(res) {
        if (res.statusCode == 200 && res.data.type == 0) {
          var b = /<a([\s]+|[\s]+[^<>]+[\s]+)href=(\"([^<>"\']*)\"|\'([^<>"\']*)\')[^<>]*>/gi;
          var s = res.data.body.toLowerCase().match(b);
          let links;
          for (var i = 0; i < s.length; i++) {
            var ss = s[i].toLowerCase().match(b);
            links = RegExp.$3 + RegExp.$4;
          }

          let cnt = res.data.body.replace(/<script[^>]*>(?:.*?)<\/script>/, " ").replace(/<a[^>]*>(?:.*?)<\/a>/gi, " ")
          _this.setData({
            dataList: res.data,
            content: cnt,
            more_question: links,
            flag: true
          })
        }

      }
    })

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  getMore: function() {
    let id = this.data.id;
    let _this = this;
    wx.request({
      url: 'http://news-at.zhihu.com/api/4/story/' + id + '/short-comments',
      header: {
        'content-type': 'application/json' // 默认值
      },
      success(res) {
        if (res.statusCode == 200 && res.data.comments.length > 0) {
          _this.setData({ shortArr: res.data.comments})
        }
      }
    })
    wx.request({
      url: 'http://news-at.zhihu.com/api/4/story/' + id + '/long-comments',
      header: {
        'content-type': 'application/json' // 默认值
      },
      success(res) {
        if (res.statusCode == 200 && res.data.comments.length > 0) {
          _this.setData({ longArr: res.data.comments })
        }
      }
    })
  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})