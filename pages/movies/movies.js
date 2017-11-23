let utils = require('../../utils/util.js');

let app = getApp();

Page({
    data: {
        inTheaters: {},
        comingSoon: {},
        top250: {},
    },


    onLoad: function (event) {
        // 正在热映
        let inTheatersUrl = app.globalData.baseUrl + "/v2/movie/in_theaters?start=0&&count=3";
        // 准备上映
        let comingSoonUrl = app.globalData.baseUrl + "/v2/movie/coming_soon?start=0&&count=3";
        //top250
        let top250Url = app.globalData.baseUrl + "/v2/movie/top250?start=0&&count=3";

        this.getMovieListData(inTheatersUrl, "inTheaters", "正在热映");
        this.getMovieListData(comingSoonUrl, "comingSoon", "即将上映");
        this.getMovieListData(top250Url, "top250", "Top250");
    },

    getMovieListData: function (url, keyworld, name) {
        let that = this;
        wx.request({
            url: url,
            data: {},
            method: 'GET',
            success: function (res) {
                console.log(res);
                that.processDoubanData(res.data, keyworld, name);
            },
            header: {
                "Content-Type": "application/xml"
            },
            fail: function () {
                console.log("fail");
            },
            complete: function () {
                console.log("complete");
            }
        })
    },

    processDoubanData: function (data, keyworld, name) {
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
            //id
            let id = subject.id;
            if (title.length > 6) {
                title = title.substring(0, 6) + "...";
            }
            let temp = {
                title: title,
                average: average,
                imgUrl: imgUrl,
                movieId: subject.id,
                stars: stars,
                id: id
            };
            movies.push(temp);
        }
        let pageData = {};
        pageData[keyworld] = {
            movies: movies,
            name: name
        };
        this.setData(pageData);
    },

    moreTap: function (event) {
        let type = event.currentTarget.dataset.type;
        wx.navigateTo({
            url: "more-movies/more-movies?type=" + type
        })
    },

    //点击电影详情
    movieDetail: function (event) {
        wx.navigateTo({
            url: "movie-detail/movie-detail?id=" + event.currentTarget.dataset.id
        })
    }


})