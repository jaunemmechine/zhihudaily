Page({

  data: {
    //图片地址
    imgList: [],
    //是否采用衔接滑动  
    circular: true,
    //是否显示画板指示点  
    indicatorDots: true,
    //选中点的颜色  
    indicatorcolor: "#000",
    //是否竖直  
    vertical: false,
    //是否自动切换  
    autoplay: true,
    //自动切换的间隔
    interval: 2500,
    //滑动动画时长毫秒  
    duration: 100,
    //所有图片的高度  
    imgheights: [],
    //图片宽度 
    imgwidth: 750,
    //默认  
    current: 0,
    count: 1,
    list:[]
  },
  imageLoad: function (e) {//获取图片真实宽度  
    var imgwidth = e.detail.width,
      imgheight = e.detail.height,
      //宽高比  
      ratio = imgwidth / imgheight;
    console.log(imgwidth, imgheight)
    //计算的高度值  
    var viewHeight = 500 / ratio;
    var imgheight = viewHeight;
    var imgheights = this.data.imgheights;
    //把每一张图片的对应的高度记录到数组里  
    imgheights[e.target.dataset.id] = imgheight;
    this.setData({
      imgheights: imgheights
    })
  },
  bindchange: function (e) {
    // console.log(e.detail.current)
    this.setData({ current: e.detail.current })
  },

  getinitTops: function (e) {
    let _this=this;
    wx.request({
      url: 'https://zhihu-agent.herokuapp.com/get?api=/4/news/latest', // 仅为示例，并非真实的接口地址
      header: {
        'content-type': 'application/json' // 默认值
      },
      success(res) {
        let newList=[]
        newList.push(res.data)
        _this.setData({ 
          imgList: res.data.top_stories, 
          list: newList
        })
        wx.hideNavigationBarLoading();
        // 停止下拉动作
        wx.stopPullDownRefresh();
      }
    })
  },
  gotodetailPage:function(){
    
  },
  onReady(){
    this.getinitTops() 
  },

  GetDate:function(Count) {
    var dd = new Date();
    dd.setDate(dd.getDate() + Count); //获取AddDayCount天后的日期
    var y = dd.getFullYear();
    var m = dd.getMonth() + 1; //获取当前月份的日期
    m = m >= 10 ? m : "0" + m
    var d = dd.getDate();
    d = d >= 10 ? d : "0" + d;
    return y + "" + m + "" + d;
  },
  // 下拉刷新
  onPullDownRefresh: function () {
    // 显示顶部刷新图标
    wx.showNavigationBarLoading();
    this.getinitTops()
    
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    var _this = this;
    // 显示加载图标
    wx.showLoading({
      title: '玩命加载中',
    })
    setTimeout(() => {
      _this.data.count--;

    }, 500)
    
    wx.request({
      url: "https://zhihu-agent.herokuapp.com/get?api=/4/news/before/" + this.GetDate(this.data.count-1),
      method: "GET",
      // 请求头部
      header: {
        'content-type': 'application/text'
      },
      success: function (res) {
        console.log(res.data)
        // 回调函数
        let newlist = _this.data.list;
        newlist.push(res.data)

        // 设置数据
        _this.setData({
          list: newlist
        })
        // 隐藏加载框
        wx.hideLoading();
      }
    })

  },

  
})



