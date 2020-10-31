<template>
  <div class="hot-position page subpage">
    <div class="crumbs">
      <router-link to="/home">首页</router-link> > 
      <a>职位搜索结果</a>
    </div>
    <div class="options">
      <van-dropdown-menu active-color="#ff7e3e">
        <van-dropdown-item v-model="value1" :options="option1" />
        <van-dropdown-item v-model="value2" :options="option2" />
        <van-dropdown-item v-model="value2" :options="option2" />
      </van-dropdown-menu>
    </div>
    <app-scroll class="content">
      <div class="main">
        
        <div class="list">
            <router-link to="/position/123" class="list-item" v-for="item in list" :key="item.id">
              <div class="tit">
                  <p class="name"><span>{{item.work_name}}</span></p>
                  <p class="pay"><span>{{item.month_pay}}</span></p>
              </div>
              <div class="need">
                  <p class="company">{{item.company}}</p>
                  <em class="area">{{item.area}}</em>
              </div>
            </router-link>
        </div>
        <div class="pagination">
          <form action="" method="get">
            <div :class="['prev-box', prevStyle?'on':'']" @click="changePage('prev')">
              <span :class="['iconfont icondouble-arrow-left']"></span>
              <span>上一页</span>
            </div>
            <div class="showSelect">
              {{'第'+currentPage+'页'}}
              <span class="iconfont iconxiangxia"></span>  
            </div>
            <select v-model="currentPage">
              <option :value="val" v-for="val in pages" :key="val">
                {{'第'+val+'页'}}
              </option>
            </select>
            <div :class="['next-box', nextStyle?'on':'']"  @click="changePage('next')">
              <span>下一页</span>
              <span :class="['iconfont icondouble-arrow-right-copy']"></span>
            </div>
          </form>
        </div>
        <home-friend :data="friend"/>
        <home-footer />
      </div>
    </app-scroll>      

  </div>
</template>

<script>
export default {
  data() {
    return {
      prevStyle: false,
      nextStyle: false,
      currentPage: 2,
      pages: 10,
      value1: 0,
      value2: 'a',
      option1: [
        { text: '全部商品', value: 0 },
        { text: '新款商品', value: 1 },
        { text: '活动商品', value: 2 },
      ],
      option2: [
        { text: '默认排序', value: 'a' },
        { text: '好评排序', value: 'b' },
        { text: '销量排序', value: 'c' },
      ],
      list: [
                {id: 1, company: '金蝶软件（中国）有限公司', month_pay: '1-1.5万/月', work_name: '技术支持-财务（深圳)的撒的撒打算的萨达杀手大的飒飒', area: '深圳', type: '民营公司', edu: '本科'},
                {id: 2, company: '金蝶软件（中国）有限公司', month_pay: '1-1.5万/月', work_name: '技术支持-财务（深圳)', area: '深圳', type: '民营公司', edu: '本科'},
                {id: 3, company: '金蝶软件（中国）有限公司', month_pay: '1-1.5万/月', work_name: '技术支持-财务（深圳)', area: '深圳', type: '民营公司', edu: '本科'},
            ],
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


    };
  },
  methods: {
    changePage(val){
      setTimeout(()=>{
        this.prevStyle = false;
        this.nextStyle = false;
      },200);
      if(val=='prev'){
        if(this.currentPage <= 1) return;
        this.prevStyle = true;
        this.nextStyle = false;
        this.currentPage -= 1;
      }
      else{
        if(this.currentPage >= this.pages) return;
        this.prevStyle = false;
        this.nextStyle = true;
        this.currentPage += 1;
      }
      // this.$axios.
    }
  },
}
</script>

<style lang="scss" scoped>
.hot-position{
  // background-color: #fff;
  top: 98px;
  // bottom: 0px;
  width: 100%;
}
.content{
  // position: absolute;

  width: 100%;
  height: 100%;
}
.main{
  background-color: #fafafa;
  width: 100%;
  height: 100%;
}
.crumbs{
  font-size: 13px;
  color: #444;
  padding: 10px 5px;
  a{
    padding: 0 3px;
  }
}
.options{
  z-index: 100;
}
.list{
    width: 100%;
    background-color: #fff;
    .list-item{
        position: relative;
        margin: 0 20px;
        padding: 10px 0;
        border-top: 1px solid #e6e6e6;
        display: flex;
        flex-direction: column;
        align-items:flex-start;
        justify-content: center;
        line-height: 20px;
        .tit{
            width: 100%;
            font-size: 15px;
            color: #686868;
            display: flex;
            justify-content: space-between;
            margin-bottom: 5px;
            .name{
              font-weight: 700;
              width: 65%;
              overflow: hidden;
              text-overflow: ellipsis;
              white-space: nowrap;
            }
            .pay{
                font-size: 14px;
                color: #ff7e3e;
                width: 26%;
                overflow: hidden;
                text-overflow: ellipsis;
                white-space: nowrap;
                span{
                    float: right;
                }
            }
        }
        .need{
          width: 100%;
          display: flex;
          justify-content: space-between;
          font-size: 12px;
          color: #666;
          .company{
            font-size: 13px;
          }
          p>span{
              padding-right: 4px;
          }
        }
    }
    .list-item:first-child{
        border-top: none;
    }
}
.pagination{
  padding: 6px 10px;
  color: #868686;
  font-size: 14px;
  position: relative;
  form{
    display: flex;
    justify-content: center;
    align-items: center;
  }
  align-items: center;
  .prev-box, .next-box, select,.showSelect{
    height: 40px;
    width: 35%;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #fff;
    border: none;
    font-size: 14px;
    .iconfont{
      padding: 6px;
      font-size: 13px;
    }
  }
  select{
    margin: 0 6px;
    width: 30%;
    z-index: 3;
    opacity: 0;
    position: relative;
  }
  .showSelect{
    width: 28%;
    position: absolute;
    top: 6px;
    left: 50%;
    transform: translateX(-50%);
  }
  .on{
    color: #ff7e3e;
  }
}
</style>

<style lang="scss">
.van-dropdown-menu .van-dropdown-menu__bar{
  box-shadow: none;
  height: 35px;
  border-bottom: 1px solid #eee;
}
.van-dropdown-menu__item{
  border-right: 1px solid #eee;
}
.van-dropdown-menu__item:last-child{
  border: none;
}
</style>