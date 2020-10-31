<template>
    <div id="position" class=" page subpage">
        <app-scroll class="content">
        <search-top />
            <div class="pageContent">
                <!-- 职位信息 -->
                <div class="card">
                    <div class="job-info">
                        <div class="job-box">
                            <h3>{{list.work_name}}</h3>
                            <span class="money">{{list.month_pay+'/月'}}</span>
                        </div>
                        <div class="job-box">
                            <p class="type">
                                <span>{{Number(list.recruit_num) ?list.recruit_num+'人' : '若干人'}}</span>|
                                <span>{{list.area}}</span>|
                                <span>{{list.work_year}}</span>
                            </p>
                            <span>{{list.time}}</span>
                        </div>
                        <div class="weal">
                            <div class="tab" v-for="(item,index) in list.weal" :key="index">
                                <span>{{item}}</span>
                            </div>
                        </div>
                        <div class="address">
                            <span class="iconfont icondingweiweizhi locate"></span>
                            <span>{{'上班地址:'+list.place}}</span>
                            <span class="iconfont iconjiantou-copy arrow"></span>
                        </div>
                    </div>
                </div>
                <!-- 公司信息 -->
                <div class="card">
                    <router-link :to="'/company/'+list._id">
                        <div class="company">
                            <img :src="list.logo" alt="logo" class="logo">
                            <div class="info">
                                <h3 class="tit">{{list.company}}</h3>
                                <p class="type">
                                    <span>{{list.type}}</span>|
                                    <span>{{list.trade}}</span>
                                </p>
                            </div>
                            <span class="iconfont iconjiantou-copy arrow"></span>
                        </div>
                    </router-link>
                    <router-link to="/company/123">
                        <div class="job-all">
                            <span class="iconfont iconfangkuai square"></span>
                            <span>该公司其他职位</span>
                            <span class="iconfont iconjiantou-copy arrow"></span>
                        </div>
                    </router-link>
                </div>
                <!-- 职位描述 -->
                <div class="card">
                    <div class="describe">
                        <h3 class="tit">职位描述</h3>
                        <p>岗位职责：</p>
                        <div class="box" v-for="(item,index) in duty" :key="index">
                            <p>{{item}}</p>
                        </div>
                    </div>
                </div>
                <!-- tips -->
                <div class="card">
                    <div class="tips">
                        <img src="../../public/images/work/tips.png" alt="tips">
                        <p>
                    警示：以招聘为名收取培训费用、提供培训贷款，或在录用过程中需支付体检、服装、押金等费用的，都属违法行为。一经发现，请<a href="https://m.51job.com/search/reportjob.php?jobid=116254287">立即举报</a>，并向当地公安机关报案。
                        </p>
                    </div>
                </div>
                <home-friend :data="friend"/>
                <home-footer />
            </div>
        </app-scroll>
        <!-- apply -->
        <div class="apply-tab">
            <span :class="['favorite', isClick?'isfavorite':'']" @click="addFavorite"></span>
            <!-- <span class="favorite" @click="addFavorite"></span> -->
            <van-button type="warning" color="#ff7e3e" @click="applyPosition">申请职位</van-button>
        </div>
    </div>
</template>

<script>
import SearchTop from '../components/common/search-top';
import HomeFriend from '../components/common/home-friend';
import HomeFooter from '../components/common/home-footer';
import { Toast } from 'vant';
export default {
    components:{
        SearchTop,
        HomeFriend,
        HomeFooter,
    },
    data() {
        return {
            isClick: false,
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
                ],
            ],
            list: []
        }
    },
    computed: {
        duty(){
            console.log(this.list.details);
            var x = this.list.details;
            var reg = /(\d[.])[^0-9]+/g;
            return x[0].match(reg);
        }
    },
    created() {
        this.$axios.get('/api/app/workinfo?_id='+this.$route.params.id).then((res)=>{
            if(res.data.code == 0){
                this.list = res.data.data
            }
            else{
                
            }
        })
    },
    methods: {
        addFavorite(){
            var phone = this.$store.state.userinfo.phone;
            var ids = [this.$route.params.id];
            if (this.isClick){
                this.$axios.post('/api/app/collect_delete',{
                    phone,
                    ids
                }).then((res)=>{
                    if (res.data.code == 0){
                        this.isClick = false;
                        Toast.success({
                            duration:1000,
                            message: '取消收藏成功'
                        });
                    }
                    else{
                        Toast.fail({
                            duration:1000,
                            message: '取消收藏失败'
                        });
                    }
                });
            }else{
                this.$axios.post('/api/app/collect',{
                    phone,
                    ids
                }).then((res)=>{
                    if (res.data.code == 0){
                        this.isClick = true;
                        Toast.success({
                            duration:1000,
                            message: '收藏成功'
                        });
                    }
                    else{
                        Toast.fail({
                            duration:1000,
                            message: '收藏失败'
                        });
                    }
                });
            }          
        },
    
        applyPosition(){
            var phone = this.$store.state.userinfo.phone;
            var ids = [this.$route.params.id];
            this.$axios.post('/api/app/apply_add',{
                phone,
                ids
            }).then((res)=>{
                if(res.data.code == 0){
                    Toast.success({
                        duration:1000,
                        message: '申请成功'
                    });
                }
                else{
                    Toast.fail({
                        duration:1000,
                        message: '申请失败'
                    });
                }
            });
        },

    },
}
</script>

<style lang="scss" scoped>
.pageContent{
    // position: absolute;
    padding-top: 96px;
    // top: 96px;
    width: 100%;
    padding-bottom: 62px;
}
.content{
    width: 100%;
    height: 100%;
    // position: absolute;
}
.home-footer{
    bottom: 0px;
}
.card{
    margin-bottom: 8px;
    background-color: #fff;
    .job-info{
        padding: 12px 16px;
        .job-box{
            margin-bottom: 14px;
            display: flex;
            line-height: 20px;
            justify-content: space-between;
            h3{
                max-width: 75%;
                overflow: hidden;
                white-space: nowrap;
                text-overflow: ellipsis;
                line-height: 26px;
                font-size: 22px;
                font-weight: bold;
                color: #222;
                word-break: break-all;
            }
            .money{
                font-size: 16px;
                color: #ff6000;
                padding-top: 4px;
            }
            span{
                
                font-size: 12px;
                color: #666;
            }
        }
    }
    .type{
        max-width: 75%;
        font-size: 12px;
        color: #666;
        span{
            padding: 0 3px;
        }
        span:first-child{
            padding-left: 0;
        }
    }
    .weal{
        margin-bottom: 8px;
        background-color: #fff;
        border-bottom: 1px solid #ddd;
        .tab{
            overflow: hidden;   // 清除浮动，父级高度随子级自适应
            span{
                float: left;
                height: 20px;
                line-height: 18px;
                font-size: 12px;
                color: #999;
                margin: 0 10px 8px 0;
                padding: 0 3px;
                border: 1px solid #c6c6c6;
                border-radius: 4px;
                box-sizing: border-box;
            }
        }
    }
    .address{
        position: relative;
        font-size: 14px;
        line-height: 20px;
        padding: 4px 0;
        .locate{
            color: #ff7e3e;
            margin: 0 2px ;
        }
    }
    
    .company{
        margin: 0 16px;
        padding: 16px 0;
        background-color: #fff;
        display: flex;
        position: relative;
        border-bottom: 1px solid #ddd;
        .logo{
            width: 54px;
            height: 54px;
        }
        .info{
            margin-left: 14px;
            line-height: 20px;
            h3{
                font-size: 16px;
                line-height: 26px;
                font-weight: bold;
                color: #222;
                padding-top: 6px;
            }
        }
    }

    .job-all{
        display: flex;
        align-items: center;
        background-color: #fff;
        position: relative;
        font-size: 12px;
        color: #222;
        padding: 10px 0;
        margin: 0 16px;
        .square{
            color: #ff7e3e;
            margin-right: 6px;
        }
    }
    .arrow{
        position: absolute;
        right: 16px;
        top: 50%;
        transform: translateY(-50%);
        font-size: 12px;
        color: #ccc;
    }

    .describe{
        padding: 0 16px;
        color: #444;
        .tit{
            line-height: 56px;
            font-size: 18px;
            font-weight: 700;
            
        }
        p{
            line-height: 25px;
            font-size: 13px;
        }
    }

    .tips{
        padding: 10px 13px 10px 13px;
        color: #b9b9b9;
        font-size: 12px;
        display: flex;
        align-items: center;
        img{
            width: 29px;
            height: 28px;
        }
        p{
            margin-left: 13px;
            line-height: 20px;
            a{
                color: #937ae4;
            }
        }
    }
}
.apply-tab{
    position: fixed;
    z-index: 5;
    bottom: 0;
    height: 62px;
    width: 100%;
    background-color: #fff;
    padding: 10px 0;
    box-sizing: border-box;
    display: flex;
    justify-content: center;
    align-items: center;
    box-shadow: 0 -6px 16px rgba(0,0,0,.05);
    .favorite{
        width: 68px;
        height: 40px;
        background: url(../../public/images/work/icon.png);
        background-size: 100px auto;
        background-position: 16px 0;
    }
    .isfavorite{
        background-position: 16px 40px;
    }
    .van-button{
        width: 80%;
        height: 40px;
        margin-right: 20px;
    }
}
</style>