<template>
    <div class="home-friend">
        <div class="tab">
            <span @click="getFriend(0)" :class="[isActive==0?'active':'']">热门职位</span>
            <span @click="getFriend(1)" :class="[isActive==1?'active':'']">热门城市</span>
        </div>
        <div class="swiper-container" ref="swiper" id="swiper-friend">
            <div class="swiper-wrapper" ref="page">
                <div class="swiper-slide stop-swiping" v-for="(item,index) in data" :key="index">
                    <router-link to="/search/hot_position" v-for="val in item" :key="val.id">{{val.name}}</router-link>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import Swiper from 'swiper'
import "swiper/css/swiper.css"
export default {
    props:{
        data: Array,
    },
    data() {
        return {
            isActive: 0,
            width: document.documentElement.offsetWidth,
        }
    },
    methods: {
        getFriend(num){
            this.isActive = num;
            this.$refs.page.style = `width: 100%; transform: translate3d(-${this.isActive*this.width}px, 0px, 0px);transition-duration: 300ms;`;
        },
    },
    mounted() {
        setTimeout(() => {
            this.$nextTick(() => {
                this.swiper = new Swiper("#swiper-friend", {
                    noSwiping : true,
                    noSwipingClass : 'stop-swiping',
                    // loop: true,
                    // autoplay: {
                    //     delay: 3000,
                    //     disableOnInteraction: false
                    // }
                });
            });
        }, 1000);
    },
        
}
</script>

<style lang="scss" scoped>
.home-friend{
    width: 100%;
    margin-bottom: 8px;
    background-color: #fff;
}
.tab{
    background-color: #fff;
    height: 48px;
    line-height: 48px;
    margin: 0 16px;
    font-size: 14px;
    color: #666;
    border-bottom: 1px solid #f0f0f0;
    span{
        margin-right: 16px;
    }
    .active{
        font-size: 16px;
        font-weight: 700;
        color: #222;
        position: relative;
        height: 48px;
        display: inline-block;
    }
    .active:after{
        content: '';
        display: block;
        position: absolute;
        bottom: 0;
        left: 50%;
        height: 2px;
        width: 20px;
        background-color: #ff7e3e;
        transform: translateX(-50%);
    }
}
.swiper-container{
    background-color: #fff;
    position: relative;
    overflow: hidden;
    z-index: 1;
    width: 100%;
    margin: 10px 0;
    .swiper-slide{
        width: 100%;
        overflow: hidden;
        a{
            position: relative;
            display: inline-block;
            width: 50%;
            margin: 5px 0;
            padding: 0 8px 0 30px;
            box-sizing: border-box;
            font-size: 14px;
            color: #222;
        }
        a::before{
            content: '';
            position: absolute;
            top: 50%;
            left: 16px;
            transform: translateY(-50%);
            width: 6px;
            height: 6px;
            background-color: #ffcbb1;
            border-radius: 50%;
        }
    }
}
</style>