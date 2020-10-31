<template>
    <div class="apply page subpage">
        <!-- <div></div> -->
        <app-scroll class="content">
          <search-top />
          <div class="pages">
            <a href="https://app.51job.com/?c=h5app7" class="download">
              查看详情申请记录，下载<span>51job APP</span>
            </a>
            <div class="work-like" v-if="isShow">
                <img src="../../../public/images/mine/bg_ask_none.png" alt="ask">
                <p>这俩个月暂无申请记录噢</p>
            </div>
            <div class="stit">
              <p>你可能还想投</p>
            </div>
            <position-list/>
            <home-footer />
          </div>
        </app-scroll>
    </div>
</template>

<script>
import SearchTop from '../common/search-top';
import HomeFooter from '../common/home-footer';
export default {
    data() {
        return {
            isShow: true,
        }
    },
    components:{
        SearchTop,
        HomeFooter
    },
    methods: {
        handleShow(){
            this.isShow = !this.isShow;
        }
    },
}
</script>

<style lang="scss" scoped>
.content{
  width: 100%;
  height: 100%;
  position: absolute;
}
.apply{

    .pages{
        // position: absolute;
        // top: 96px;
        padding-top: 96px;
        width: 100%;
        padding-bottom: 30px;
        background-color: #fafafa;
        .work-like{
            display: flex;
            flex-direction: column;
            align-items: center;
            background-color: #fafafa;
            font-size: 14px;
            color: #999;
            padding: 30px 0;
            img{
                width: 138px;
            }
            p{
                margin: 15px 0 30px;
                max-width: 180px;
                text-align: center;
                line-height: 20px;
            }
        }
        .download{
          display: block;
          line-height: 30px;
          font-size: 12px;
          color: #999999;
          padding: 0 16px;
          background:  #fff6f1 url(../../../public/images/mine/arrow.png) no-repeat 95% center;
          background-size: 6px auto;
          span{
            color: #ff7e3e;
          }
        }
        .stit{
          position: relative;
          margin: 30px 0 10px;
          height: 20px;
          p{
            position: absolute;
            top: -1px;
            left: 50%;
            transform: translateX(-50%);
            color: #ff7e3e;
            padding: 0 5px;
            font-size: 14px;
            background: #fafafa;
          }
        }
        .stit::before{
          position: absolute;
          content: '';
          width: 36%;
          height: 1px;
          background-color: #ff7e3e;
          top: 5px;
          left: 50%;
          transform: translateX(-50%);
        }
    }
    // .home-footer{
    //     position: fixed;
    //     bottom: 0;
    //     left: 0;
    // }
}
</style>