<template>
  <div class="home-recommend">
    <div class="title-box">
        <h3 class="title">为您推荐</h3>
        <router-link class="all" to="/mine">
            <i>查看全部</i>
            <span class="iconfont iconjiantou-copy"></span>
        </router-link >
    </div>
    <div class="list">
        <div>
            <div class="tab"  v-if="isLogin">
                <router-link to="/mine" class="tab-item" v-for="item in tab" :key="item.id">{{item.word}}
                </router-link>
            </div>
            <div class="unlogin" v-else>
                <p>登录后可查看推荐职位</p>
                <van-button type="primary" color="#ff7e3e" to="/login">登录</van-button>
            </div>
        </div>
        <div class="title-box">
            <h3 class="title">知名企业招聘</h3>
            <router-link class="all" to="/mine">
                <i>查看全部</i>
                <span class="iconfont iconjiantou-copy"></span>
            </router-link >
        </div>
    </div>
  </div>
</template>

<script>
export default {
    props:{
        isLogin: {
            type: [String,Boolean]
        },
    },
    data() {
        return {
            // isLogin: false,
            tab: [
                {id: 1, word: 'HTML5 前端', path: '/mine'},
                {id: 2, word: 'HTML5 前端', path: '/mine'},
                {id: 3, word: 'HTML5 前端', path: '/mine'},
                {id: 4, word: 'HTML5 前端', path: '/mine'},
                {id: 5, word: 'HTML5 前端', path: '/mine'},
            ],
            list: [
                {id: 1, company: '金蝶软件（中国）有限公司', work_name: '技术支持-财务（深圳)的撒的撒打算的萨达杀手大的飒飒', area: '深圳', type: '民营公司', edu: '本科'},
                {id: 2, company: '金蝶软件（中国）有限公司', work_name: '技术支持-财务（深圳)', area: '深圳', type: '民营公司', edu: '本科'},
                {id: 3, company: '金蝶软件（中国）有限公司', work_name: '技术支持-财务（深圳)', area: '深圳', type: '民营公司', edu: '本科'},
            ]
        }
    },
    created() {
        // this.isLogin = this.$store.state.username != '';
        // this.$axios.post('/api/app/search',)
    },
}
</script>



<style lang="scss" scoped>
.home-recommend{
    width: 100%;
    // margin-bottom: 8px;
    .title-box{
        height: 56px;
        padding: 0 16px;
        display: flex;
        align-items: center;
        justify-content: space-between;
        background-color: #fff;
        .title{
            font-size: 18px;
            font-weight: 700;
        }
        .all{
            font-size: 14px;
            color: #666;
            span{
                font-size: 12px;
                padding-left: 5px;
                color: #ccc;
            }
        }
    }

    .list{
        width: 100%;
        .tab{
            background-color: #fff;
            max-height: 84px;
            overflow: hidden;
            padding: 0 8px 0 16px;
            // display: flex;
            .tab-item{
                float: left;
                max-width: 100%;
                height: 28px;
                line-height: 28px;
                text-align: center;
                padding: 0 12px;
                margin: 0 8px 14px 0;
                font-size: 14px;
                color: #666;
                background-color: #f5f5f5;
                border-radius: 28px;
            }
        }
        .unlogin{
            height: 118px;
            background: #fff url(../../../public/images/home/unlogin_bg.png) no-repeat;
            background-position: center center;
            background-size:contain;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            margin-bottom: 8px;
            p{
                font-size: 14px;
                color: #999;
                margin-bottom: 16px;
            }
            .van-button{
                width: 96px;
                height: 36px;
                border-radius: 4px;
            }
        }
    }
}
</style>