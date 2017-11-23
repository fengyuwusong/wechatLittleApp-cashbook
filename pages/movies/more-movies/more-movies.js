// pages/movies/more-movies/more-movies.js
let utils=require("../../../utils/util.js");
let app=getApp();
Page({

    /**
     * 页面的初始数据
     */
    data: {

    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        // 设置导航栏标题
        wx.setNavigationBarTitle({
            title: options.type,
        });
        //设置获取dataUrl
        let dataUrl="";
        switch (options.type) {
            case "正在热映":
                dataUrl = app.globalData.baseUrl + "/v2/movie/in_theaters";
                break;
            case "即将上映":
                dataUrl = app.globalData.baseUrl + "/v2/movie/coming_soon";            
                break;
            case "Top250":
                dataUrl =  app.globalData.baseUrl + "/v2/movie/top250";
                break;
        };

        utils.http(dataUrl, this.processDoubanData);
        
    },

    processDoubanData: function (data) {
        let movies = [];
        for (let idx in data.subjects) {
            let subject = data.subjects[idx];
            //标题
            let title = subject.title;
            //评分
            let average = subject.rating.average;
            //图片
            let imgUrl = subject.images.small;
            //星星
            let stars = utils.convertToStarsArray(subject.rating.stars);
            if (title.length > 6) {
                title = title.substring(0, 6) + "...";
            }
            //id
            let id = subject.id;
            let temp = {
                title: title,
                average: average,
                imgUrl: imgUrl,
                movieId: subject.id,
                stars: stars,
                id:id
            };
            movies.push(temp);
        }
        this.setData({
            movies: movies,
        });
    },

    //点击电影详情
    movieDetail: function (event) {
        wx.navigateTo({
            url: "/pages/movies/movie-detail/movie-detail?id=" + event.currentTarget.dataset.id
        })
    }
})