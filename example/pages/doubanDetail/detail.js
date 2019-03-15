Page({
  data: {
    film: {},
    showLoading: true,
    options: null,
    islike:false,
    isStar:false,
    isShowRating:false,
    isShowPlay:false,
    isauto:true,
    value:"",
  
  },
  onLoad: function (options) {
    var that = this
    wx.setNavigationBarTitle({
      title: options.title
    })
    wx.request({
      url: 'https://douban.uieee.com/v2/movie/subject/' + options.id,
      header: {
        'content-type': 'json'
      },
      success: function (res) {
        var data = res.data
        that.setData({
          film: data,
          showLoading: false
        })
      }
    })
  },
  onLike:function(){
    let islike=this.data.islike;
    islike ? this.setData({ islike: false }) : this.setData({ islike: true })

  },
  onRating:function(){
    this.setData({ isShowRating:true})
  },
  onChange(event) {
    this.setData({
      value: event.detail
    });
  },
  onConfirm: function(){
    this.setData({ isShowRating: false, isStar:true})
  },
  onCancel: function () {
    this.setData({ isShowRating: false })
  },

  //视频播放
  onShouPlay:function(){
    this.setData({ isShowPlay: true, isauto:true})
  },
  onClosePlay:function(){
    this.setData({ isShowPlay: false, isauto:false })
  }




})