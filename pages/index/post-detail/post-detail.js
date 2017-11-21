const data = require("../../../data/posts-data.js");
const app = getApp();
Page({
    data: {

    },
    onLoad: function (option) {
        this.setData({
            data: data.postList[option.id],
            id: option.id,
            isPlayingMusic: app.globalData.isPlayingMusic
        });
        const collected = wx.getStorageSync("collected");
        if (collected) {
            this.setData({
                collected: collected[option.id]
            });
        } else {
            const c = {};
            c[option.id] = false;
            wx.setStorageSync("collected", c);
        }
        const that = this;
        wx.onBackgroundAudioPlay(function () {
            that.setData({
                isPlayingMusic: true
            })
            app.globalData.isPlayingMusic = true;
        });
        wx.onBackgroundAudioPause(function () {
            that.setData({
                isPlayingMusic: false
            })
            app.globalData.isPlayingMusic = false;
        });
    },

    onCollectionTap: function (event) {
        this.getCollectedAsy();
    },

    //异步方法获取缓存
    getCollectedAsy: function () {
        const that = this;
        wx.getStorage({
            key: 'collected',
            success: function (res) {
                const collected = res.data;
                if (collected) {
                    collected[that.data.id] = !collected[that.data.id];
                    wx.setStorageSync("collected", collected)
                    that.setData({
                        collected: collected[that.data.id]
                    });
                    //消息提示框
                    wx.showToast({
                        title: collected[that.data.id] ? '收藏成功' : '取消成功',
                        duration: 1000,
                        icon: "success" //默认success 支持加载loading
                    })
                }
            },
        });
    },

    // 同步方法获取缓存
    getCollectedSync: function () {
        const collected = wx.getStorageSync('collected');
        if (collected) {
            collected[this.data.id] = !collected[this.data.id];
            wx.setStorageSync("collected", collected)
            this.setData({
                collected: collected[this.data.id]
            });
            //消息提示框
            wx.showToast({
                title: collected[this.data.id] ? '收藏成功' : '取消成功',
                duration: 1000,
                icon: "success" //默认success 支持加载loading
            })
        }
    },

    showModal: function () {
        // 模态框
        wx.showModal({
            title: '收藏',
            content: '是否收藏该文章',
            showCancel: "true",
            cancelText: "不收藏",
            cancelColor: "#333",
            confirmText: "收藏",
            confirmColor: "#405f80",
            success: function (res) {
                if (res.confirm) {
                    //点击确定动作
                }
            }
        })
    },
    onShareTap: function (event) {
        //缓存上限不能超过10MB
        //清除缓存
        //wx.removeStorageSync('key');
        // wx.clearStorageSync(); //清除所有本地缓存

        const itemList = [
            "分享给微信好友",
            "分享到朋友圈",
            "分享到QQ",
            "分享到微博",
        ];
        wx.showActionSheet({
            itemList: itemList,
            itemColor: "#405f80",
            success: function (res) {
                // res.cancel 点击了取消按钮
                // res.tapIndex 数组元素序号
                wx.showModal({
                    title: '用户' + itemList[res.tapIndex],
                    content: '',
                })
            }
        })
    },
    //音乐播放
    onMusicTap: function (event) {
        if (this.data.isPlayingMusic) {
            wx.pauseBackgroundAudio();
            this.setData({
                isPlayingMusic: false
            })
            app.globalData.isPlayingMusic = false;
        } else {
            wx.playBackgroundAudio({
                dataUrl: 'http://120.198.248.37/cache/m10.music.126.net/20171121203151/20d90cffb6312b371a06d63110d3bf3f/ymusic/4df5/573c/f762/918abe702237f3a63e1226ff4eb09443.mp3?ich_args2=29-21200711049194_0227efa76393af799ad493277810f633_10012302_9c89652dd5c5f7d1943a518939a83798_03567433e12be10f22a2ce81fb197911',
                title: 'try',
                coverImgUrl: 'http://p1.music.126.net/UhaBgCtPgQo2E08srHAu1A==/3109418883422533.jpg?param=130y130'
            });
            this.setData({
                isPlayingMusic: true
            })
            app.globalData.isPlayingMusic = true;
        }
    },
})