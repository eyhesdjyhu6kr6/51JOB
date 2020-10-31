<template>
  <div id="company" class=" page subpage">
    <app-scroll class="content">
    <search-top />
    
    <div class="pageContent">

      <!-- 公司信息 -->
      <div class="card">
        <div class="company">
            <img src="../../public/images/work/logo_default.png" alt="logo" class="logo">
            <div class="info">
              <h3 class="tit">金蝶软件（中国）有限公司</h3>
              <p class="type">
                <span>民营公司</span>|
                <span>计算机软件</span>
              </p>
            </div>
        </div>
        <div class="address">
          <span class="iconfont icondingweiweizhi locate"></span>
          <p>上班地址 : 深圳市福田区福中三路1280号黄埔雅苑商场三楼</p>
          <span class="iconfont iconjiantou-copy arrow"></span>
        </div>
      </div>

      <company-menu />

      <home-friend :data="friend"/>
      <home-footer />

    </div>
    </app-scroll>
  </div>
</template>

<script>
import SearchTop from '../components/common/search-top';
import HomeFriend from '../components/common/home-friend';
import HomeFooter from '../components/common/home-footer';
import CompanyMenu from '../components/position/company-menu';
export default {
    components:{
        SearchTop,
        HomeFriend,
        HomeFooter,
        CompanyMenu,
    },
    data() {
        return {
            friend: [
            [
              {id: 1, name: '深圳销售人才招聘'},
              {id: 2, name: '深圳销售人才招聘'},
              {id: 3, name: '深圳销售人才招聘'},
            ],
            [
              {id: 1, name: '深圳销售人才招聘'},
              {id: 2, name: '深圳销售人才招聘'},
              {id: 3, name: '深圳销售人才招聘'},
              {id: 4, name: '深圳销售人才招聘'},
              {id: 5, name: '深圳销售人才招聘'},
              {id: 6, name: '深圳销售人才招聘'},
            ]
        ],
        }
    },
    created() {
        // this.$axios.get('/api/app/workinfo',)
    },
}
</script>

<style lang="scss" scoped>
.content{
  width: 100%;
  height: 100%;
}
.pageContent{
    // position: absolute;
    padding-top: 96px;
    width: 100%;
}
.home-footer{
    bottom: 0px;
}
.card{
    margin-bottom: 8px;
    background-color: #fff;
    position: relative;
    .company{
        margin: 0 16px;
        padding: 16px 0;
        background-color: #fff;
        display: flex;
        position: relative;
        border-bottom: 1px solid #f5f5f5;
        .logo{
            width: 54px;
            height: 54px;
        }
        .info{
            margin-left: 14px;
            line-height: 20px;
            h3{
                font-size: 22px;
                line-height: 38px;
                font-weight: bold;
                color: #222;
            }
        }
    }
    .address{
      position: relative;
      font-size: 14px;
      line-height: 20px;
      padding: 4px 0;
      overflow: hidden;
      display: flex;
      align-items: center;
      padding: 10px 16px;
      .locate{
        min-height: 20px;
        overflow: hidden;
        color: #ff7e3e;
        margin: 0 5px;
      }
      p{
        max-width: 80%;
      }
      .arrow{
        position: absolute;
        right: 16px;
        top: 50%;
        transform: translateY(-50%);
        font-size: 12px;
        color: #ccc;
      }
    }
    .type{
        max-width: 75%;
        font-size: 12px;
        color: #666;
        padding-top: 4px;
        span{
            padding: 0 3px;
        }
        span:first-child{
            padding-left: 0;
        }
    }

    

}
</style>