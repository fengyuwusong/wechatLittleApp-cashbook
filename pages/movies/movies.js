let app = getApp();

Page({
    onLoad: function (event) {
        // 正在热映
        var inTheatersUrl = app.globalData.baseUrl+"/v2/movie/in_theaters?start=0&&count=3";
        // 准备上映
        var comingSoonUrl = app.globalData.baseUrl +"/v2/movie/coming_soon?start=0&&count=3";
        //top250
        var top250Url = app.globalData.baseUrl +"/v2/movie/top250?start=0&&count=3";

        this.getMovieListData(inTheatersUrl);
        this.getMovieListData(comingSoonUrl);
        this.getMovieListData(top250Url);
    },

    getMovieListData:function(url){
        let that=this;
        wx.request({
            url:  url,
            data: {},
            method: 'GET',
            success: function (res) {
                console.log(res);
                that.processDoubanData(res.data);
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

    processDoubanData:function(data){
        var movies=[];
        for(let idx in data.subjects){
            let subject = data.subjects[idx];
            //标题
            let title = subject.title;
            //评分
            let average = subject.rating.average;
            //图片
            let imgUrl=subject.images.small;
            if(title.length>6){
                title=title.substring(0,6)+"...";
            }
            var temp={
                title:title,
                average: average,
                imgUrl:imgUrl,
                movieId:subject.id
            };

            movies.push(temp);
            this.setData({
                movies:movies
            });  
        }
    }
})