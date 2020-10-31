<template>
<div class="company-menu">
    <div class="menu">
        <span :class="[isShow?'on':'']" @click="handleShow">公司简介</span>
            <span :class="[!isShow?'on':'']" @click="handleShow">所有职位</span>
    </div>
    <div class="intro" v-if="isShow">
        <h3 class="tit">公司简介</h3>
        <div class="content">
            <article :class="[!isShowMore?'maxh':'']">
                天合光能股份有限公司（简称“天合光能”）创立于1997年，为中国早期登陆美国纽交所上市的太阳能企业之一。截至2017年底，天合光能组件累计总出货量突破32GW，全球排名***，在每块组件均正常运行的情况下，将太阳光转化成的电力相比于火力发电，一年可减排二氧化碳3200万吨。
            </article>
            <div class="more" @click="showMore" v-if="!isShowMore">
                <span>查看全部</span>
                <span class="iconfont iconxiangxia icon"></span>
            </div>
            <div class="hide" @click="showMore" v-else>
                <span>隐藏内容</span>
                <span class="iconfont iconxiangshang icon"></span>
            </div>
        </div>
    </div>
    <div class="work-all" v-else>
        <!-- <h3 class="tit">所有职位</h3> -->
        <!-- <div class="option">
            <van-cell is-link @click="showPopup(0)">
                <p>
                    <span>地区</span>
                    <span class="iconfont iconxiangxia"></span>
                </p>
            </van-cell>
            <van-cell is-link @click="showPopup(1)">
                <p>
                    <span>薪资</span>
                    <span class="iconfont iconxiangxia"></span>
                </p>
            </van-cell>
            <van-popup v-model="show"  position="top" :style="{ height: '24%' }">
                <div class="menu">
                    <span >公司简介</span>
                    <span class="on">所有职位</span>
                </div>
                <div class="options">
                    <p :class="[isOption==0?'checked':'']">
                        <span>地区</span>
                        <span :class="['iconfont iconxiangxia',isOption==0?'iconxiangshang':'']"></span>
                    </p>
                    <p :class="[isOption==1?'checked':'']">
                        <span>薪资</span>
                        <span :class="['iconfont iconxiangxia',isOption==1?'iconxiangshang':'']"></span>
                    </p>
                </div>
                <div class="area" v-if="isOption==0">

                </div>
                <div class="saray" v-else>

                </div>
                
            </van-popup>
        </div> -->
        <position-list :data="false"/>
    </div>
</div>
</template>

<script>
import PositionList from '../common/position-list';
export default {
    data() {
        return {
            isShow: true,
            isShowMore: false,
            show: false,
            isOption: 0,
        }
    },
    components:{
        PositionList
    },
    methods: {
        handleShow(){
            this.isShow = !this.isShow;
        },
        showMore(){
            this.isShowMore = !this.isShowMore;
        },
        showPopup(num) {
            this.show = true;
            this.isOption = num;
        },
    },
    created() {
        console.log(this.$route.params.id);
        this.$axios.get('/api/app/companyinfo?id='+this.$route.params.id)
        .then((res)=>{
            console.log(res.data);
            if(res.data.code == 0){
                console.log(res.data.data);
            }
        })
    },
}
</script>

<style lang="scss" scoped>
.menu{
    display: flex;
    justify-content: center;
    align-items: center;
    height: 44px;
    font-size: 14px;
    color: #444;
    background-color: #fff;
    border-bottom: 1px solid #f5f5f5;
    position: relative;
    span{
        width: 50%;
        height: 100%;
        line-height: 50px;
        text-align: center;
        position: relative;
    }
    .on{
        color:#ff783d;
        font-weight: bold;
    }
    .on::after{
        content: '';
        position: absolute;
        left: 50%;
        transform: translateX(-50%);
        bottom: 0;
        width: 25px;
        height: 2px;
        background-color:#ff783d;
        color:#ff783d;
    }
}
.intro{
    line-height: 25px;
    font-size: 13px;
    color: #444;
    padding: 0 16px 16px;
    background-color: #fff;
    margin-bottom: 8px;
    .content{

        .maxh{
            max-height: 100px;
            overflow: hidden;
        }
        .more, .hide{
            position: relative;
            height: 30px;
            line-height: 30px;
            color: #999;
            text-align: center;
            span{
                font-size: 13px;
            }
            .icon{
                padding-left: 8px;
                font-size: 12px;
                color: #ccc;
            }
        }
        .more::before{
            position: absolute;
            content: "";
            width: 100%;
            height: 24px;
            top: -24px;
            left: 0;
            background-image: linear-gradient(-180deg, rgba(255,255,255,0.50) 0%, #fff 100%);
        }
    }
    
}
.intro, .work-all{
    background-color: #fff;
    .tit{
        height: 56px;
        line-height: 56px;
        font-size: 18px;
        font-weight: 700;
        // border-bottom: 1px solid #f0f0f0;
        margin: 0 16px;
    }
}
/* .work-all{
    background-color: #fff;
    .option, .options{
        padding: 10px;
        display: flex;
        justify-content: space-around;
        border-bottom: 1px solid #f5f5f5;
        p{
            height: 26px;
            line-height: 26px;
            text-align: center;
            white-space: nowrap;
            text-overflow: ellipsis;
            overflow: hidden;
            font-size: 14px;
            color: #444;
            background-color: #f5f5f5;
            border: 1px solid #fafafa;
            border-radius: 4px;
            padding-left: 6px;
            .iconfont{
                padding-left: 10px;
                font-size: 12px;
                color: #ccc;
            }
        }
        .checked{
            color: #ff7e3e;
            background-color: #fff;
            border-color: #e6e6e6;
            .iconfont{
                color: #ff7e3e;
            }
        }
    }
    .options{
        p{
            width: 30%;
        }
    }
    .van-icon-arrow::before{
        content: '';
    }
} */
</style>