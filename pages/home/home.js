// pages/home/home.js
import { Theme } from "../../model/theme";
import { Banner } from "../../model/banner";
import { Category } from "../../model/category";
import { Activity } from "../../model/activity";
import { SpuPaging } from "../../model/spu-paging";

Page({

    /**
     * 页面的初始数据
     */
    data: {
        themeA: null,
        themeE: null,
        bannerB: null,
        grid: [],
        activityD: null,
        spuPaging:null
    },
    async onLoad(options) {
        this.initAllData();
        this.initBottomSpuList();
    },
    async initBottomSpuList(){
        const spuPaging = SpuPaging.getLatestPaging();
        this.data.spuPaging = spuPaging;
        const data = await spuPaging.getMoreData();
        if(!data){
            return
        }
        wx.lin.renderWaterFlow(data.items)
    },

    async initAllData() {
        const theme = new Theme();
        await theme.getThemes();
        const themeA = theme.getHomeLocationA();
        const themeE = theme.getHomeLocationE();
        let themeESpu = [];
        if (themeE.online) {
            const data = await Theme.getHomeLocationESpu();
            if (data) {
                themeESpu = data.spu_list.slice(0, 8)
            }
        }
        const themeF = theme.getHomeLocationF();

        const bannerB = await Banner.getHomeLocationB();
        const grid = await Category.getHomeLocationC();
        const activityD = await Activity.getHomeLocationD();

        const bannerG = await Banner.getHomeLocationG();
        const themeH = theme.getHomeLocationH();

        this.setData({
            themeA,
            bannerB,
            grid,
            activityD,
            themeE,
            themeESpu,
            themeF,
            bannerG,
            themeH
        })
    },
    onPullDownRefresh: function () {

    },
    onReachBottom: async function () {
        const data = await this.data.spuPaging.getMoreData();
        if(!data){
            return
        }
        wx.lin.renderWaterFlow(data.items)
    },
    onShareAppMessage: function () {

    }
})