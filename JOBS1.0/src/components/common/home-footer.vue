<template>
  <div class="home-footer">
      <footer>
          <div class="icons">
              <a href="https://app.51job.com/?c=h5app4" class="app">APP下载</a>
              <a href="https://mkt.51job.com/tg/lp_wx/index.html" class="wchat">微信公众号</a>
              <a href="https://www.51job.com/?f=web" class="pc">电脑版</a>
          </div>
          <div class="opa">
              <span>使用帮助</span>|
              <span>用户反馈</span>|
              <span>企业入口</span>|
              <span>职场百科</span>
          </div>
          <div class="text">
              <p>无忧工作网版权所有&copy;1999-2020</p>
              <p>51job.com（沪ICP备12015550）</p>
          </div>
      </footer>
  </div>
</template>

<script>
export default {

}
</script>

<style lang="scss" scoped>
.home-footer{
    // position: absolute;
    // bottom: 52px;
    width: 100%;
    // height: 188px;
    // height: 100%;
    background-color: #fafafa;
}
footer{
    font-size: 12px;
    color: #999;
    text-align: center;
    padding: 16px 0;
}
.icons{
    height: 56px;
    width: 100%;
    display: flex;
    justify-content: space-around;
    align-items: center;
    font-size: 12px;
    margin-bottom: 20px;
    a{
        color: #999;
    }
    a::before{
        content: '';
        display: block;
        width: 30px;
        height: 30px;
        background: url(../../../public/images/home/my.png) no-repeat;
        margin: 0 auto 6px;
        background-size: 231px auto;
    }
    .app::before{
        background-position: -50px 0;
    }
    .wchat::before{
        background-position: -100px 0;
    }
    .pc::before{
        background: url(../../../public/images/home/computer.png) no-repeat;
        background-size: 30px auto;
    }
}
.opa{
    line-height: 20px;
    font-size: 14px;
    color: #666;
    margin-bottom: 20px;
    span{
        padding: 12px;
    }
}
.text{
    line-height: 20px;
    font-size: 12px;
}
</style>