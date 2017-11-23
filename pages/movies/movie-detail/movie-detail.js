let utils = require("../../../utils/util.js");
let app = getApp();

Page({
    data: {

    },
    onLoad: function (options) {
        let url = app.globalData.baseUrl + "/v2/movie/subject/" + options.id;
        let that = this;
        utils.http(url, function (res) {
            console.log(res);
            //设置title
            wx.setNavigationBarTitle({
                title: res.title,
            });
            let stars=utils.convertToStarsArray(res.rating.stars);
            //处理导演
            let directors=[];
            for (let director in res.directors){
                directors.push(res.directors[director].name);
            }
            //处理影人
            let casts={};
            for(let cast in res.casts){
                casts[cast] = { name: res.casts[cast].name, avatars: res.casts[cast].avatars.small}
            }
            that.setData({
                title: res.title,
                address: res.countries,
                year: res.year,
                summary: res.summary,
                genres: res.genres,
                collect_count: res.collect_count,
                comments_count: res.comments_count,
                image: res.images.small,
                original_title: res.original_title,
                stars:stars,
                average: res.rating.average,
                directors: directors,
                casts:casts,

            });
        });
    }
})