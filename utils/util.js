const formatTime = date => {
    const year = date.getFullYear()
    const month = date.getMonth() + 1
    const day = date.getDate()
    const hour = date.getHours()
    const minute = date.getMinutes()
    const second = date.getSeconds()

    return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

const formatNumber = n => {
    n = n.toString()
    return n[1] ? n : '0' + n
}

//将整数评分转为数组 40=>[1,1,1,1,0]
const convertToStarsArray = stars => {
    let num = stars.toString().substring(0, 1);
    let array = [];
    for (let i = 1; i <= 5; i++) {
        if (i <= num) {
            array.push(1);
        } else {
            array.push(0);
        }
    }
    return array;
}

//http请求封装
const http=(url,callBack)=> {
    wx.request({
        url: url,
        data: {},
        method: 'GET',
        success: function (res) {
            callBack(res.data);
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
};

module.exports = {
    formatTime: formatTime,
    convertToStarsArray: convertToStarsArray,
    http: http
}
