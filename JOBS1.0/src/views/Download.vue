<template>
  <div id="download" class="page subpage">
      <header class="header">
        <router-link to="/home">
          <img src="../../public/images/download/home.png" alt="home" class="home">
        </router-link>
        <img src="../../public/images/download/logo.png" alt="logo" class="logo">
      </header>
      <footer class="footer">
        <img src="../../public/images/download/slogan.png" alt="slogan" class="slogan">
        <a href="https://apps.apple.com/cn/app/apple-store/id415443644" class="down-box">
          <img src="../../public/images/download/down.png" alt="down">
          立即下载
        </a>
      </footer>
  </div>
</template>

<script>
export default {

}
</script>

<style lang="scss" scoped>
#download{
  background: url(../../public/images/download/content.png);
  background-size: contain;
  background-color: #fff;
}
.header{
  width: 100%;
  .home{
    position: absolute;
    top: 16px;
    left: 20px;
    width: 38px;
  }
  .logo{
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    width: 45%;
    top: 10%;
  }
}
.footer{
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 26%;
  background-color: #fff;
  position: absolute;
  bottom: 0;
  .slogan{
    width: 50%;
  }
  .down-box{
    width: 60%;
    height: 50px;
    background-color:#FC771B;
    border-radius: 4px;
    display: flex;
    justify-content: center;
    align-items: center;
    color: #fff;
    font-size: 16px;
    img{
      width: 20px;
      margin-right: 8px;
      margin-top: -1px;
    }
  }
}

</style>