<template>
  <div class="home-lunbo">
    <div class="swiper-container" ref="swiper" id="swiper-banner">
        <div class="swiper-wrapper">
            <div class="swiper-slide" v-for="(item,index) in data.img" :key="index">
                <img :src="item" alt="banner">
            </div>
        </div>
        <!-- 如果需要分页器 -->
        <div class="swiper-pagination" id="pagination-banner"></div>
    </div>
    <div class="btn">
        <router-link to="/search/search_nearby" class="btn1">
            <span></span>
            <i>附近职位</i> 
        </router-link>
        <router-link to="/search/search_applicat" class="btn2">
            <span></span>
            <i>申请记录</i> 
        </router-link>
        <!-- <router-link to="/search" class="btn3">
            <span></span>
            <i>谁看过我</i> 
        </router-link> -->
        <router-link to="/resume" class="btn4">
            <span></span>
            <i>我的简历</i>
        </router-link>
        <router-link to="/resume/modify" class="btn5">
            <span></span>
            <i>优化简历</i> 
        </router-link>
    </div>
  </div>
  
</template>

<script>
import Swiper from 'swiper'
import "swiper/css/swiper.css"
export default {
    props: {
        data: Object,
    },
    // watch: {
    //     data() {
    //         this.$nextTick(()=>{
    //             this.swiper = new Swiper(this.$refs.swiper, {
    //                 pagination: {
    //                     el: '.swiper-pagination',
    //                 },
    //                 loop: true,
    //                 autoplay: {
    //                     delay: 2000,
    //                     // 用户操作swiper之后，是否禁止autoplay。默认为true：停止。
    //                     disableOnInteraction: false
    //                 },
    //             });
    //         });
    //     },
    // },
    mounted() {
        setTimeout(() => {
            this.$nextTick(() => {
                this.swiper = new Swiper("#swiper-banner", {
                loop: true,
                pagination: {
                    el: "#pagination-banner"
                },
                autoplay: {
                    delay: 3000,
                    disableOnInteraction: false
                }
                });
            });
        }, 1000);
  },
}
</script>

<style lang="scss" scoped>
.home-lunbo{
    width: 100%;
    height: 216px;
    margin-bottom: 8px;
    display: flex;
    flex-direction: column;
    align-items: center;
    background-color: #fff;
    .swiper-container{
        width: 90%;
        height: 120px;
        .swiper-slide{
            width: 100%;
            height: 100%;
            overflow: hidden;
            img{
                width: 100%;
                height: 100%;
            }
        }
    }
    .btn{
        width: 100%;
        height: 96px;
        display: flex;
        justify-content: space-around;
        align-items: center;
        // margin: 0 30px;
        a{
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            background: url(../../../public/images/home/banner_btn.png)no-repeat;
            background-size: 250px auto;
            font-size: 13px;
            color: #666;
            span{
                width: 48px;
                height: 34px;
                padding-bottom: 8px;
            }
        }
        .btn1{
            background-position: 0 0;
        }
        .btn2{
            background-position: -50px 0;
        }
        // .btn3{
        //     background-position: -100px 0;
        // }
        .btn4{
            background-position: -150px 0;
        }
        .btn5{
            background-position: -200px 0;
        }
    }
}
</style>

<style lang="scss">
.swiper-container-horizontal > .swiper-pagination-bullets .swiper-pagination-bullet {
    margin: 0 4px;
}
.swiper-pagination-bullet {
    width: 8px;
    height: 8px;
}
.swiper-pagination-bullet.swiper-pagination-bullet-active{
  background: #ff7e3e;
}
</style>