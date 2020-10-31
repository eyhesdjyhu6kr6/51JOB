<template>
    <div class="favorite page subpage">
        <!-- <div></div> -->
        <app-scroll class="content">
        <search-top />
        
        <div class="pages">
            <div class="tab">
                <span :class="[isShow?'on':'']" @click="handleShow">职位收藏</span>
                <span :class="[!isShow?'on':'']" @click="handleShow">心愿公司</span>
            </div>
            
            <div class="work-like" v-if="isShow">
                <div v-if="!isApplyShow">
                    <img src="../../../public/images/mine/favorite_bg1.png" alt="">
                    <p class="txt">暂无职位收藏，<br>点击查看更多职位推荐</p>
                    <van-button type="primary" to="/search" color="#ff7e3e">职位搜索</van-button>
                </div>
                <div class="apply-list" v-else>
                    <van-checkbox-group v-model="result"  ref="checkboxGroup">
                        <div class="list" v-for="(item,index) in list" :key="index">
                            <van-checkbox :name="index" icon-size="20px" checked-color="#ff7e3e" ></van-checkbox>
                            <router-link to="/position/123" class="list-item" >
                                <div class="tit">
                                    <p class="name"><span>{{item.work_name}}</span></p>
                                    <em class="area">{{item.area}}</em>
                                </div>
                                <p class="company">{{item.company}}</p>
                                <div class="state">
                                    <p>未申请</p> 
                                    <p>{{item.time}}</p>
                                </div>
                            </router-link>
                        </div>
                    </van-checkbox-group>
                </div>
            </div>
            <div class="company-like" v-else>
                <img src="../../../public/images/mine/favorite_bg2.png" alt="">
                <p class="txt">暂无心愿公司，<br>点击发现更多名企</p>
                <van-button type="primary"  color="#ff7e3e" to="/search">名企招聘</van-button>
            </div>
            <home-footer />
        </div>
        </app-scroll>
        <!-- apply -->
        <div class="apply-tab">
            <van-checkbox v-model="checked" checked-color="#ff7e3e" @click="toggleAll">全选</van-checkbox>
            <van-button plain type="primary"  color="#ff7e3e" @click="deleteInfo">删除</van-button>
            <van-button type="warning" color="#ff7e3e"  class="apply" @click="applyPosition">申请职位</van-button>
        </div>
        
    </div>
</template>

<script>
import { Toast } from 'vant';

// Vue.use(Toast);
import SearchTop from '../common/search-top';
import HomeFooter from '../common/home-footer';
export default {
    data() {
        return {
            result: [],
            checked: false,
            isShow: true,
            isApplyShow: false,
            list: [
            ]
        }
    },
    created() {
        var phone = this.$store.state.userinfo.phone;
        this.$axios.get('/api/app/collectAll?phone='+phone).then((res)=>{
            if(res.data.code == 0){
                this.list = res.data.data;
                this.isApplyShow = true;
                console.log(res.data.data);
            }
        });
        },
    components:{
        SearchTop,
        HomeFooter
    },
    methods: {
        handleShow(){
            this.isShow = !this.isShow;
        },
        toggleAll() {
            if(this.checked){
                this.result = [];
                this.result = this.list.map((val,index)=>{
                    return index;
                })
            }
            else{
                this.result = [];
            }            
        },
        applyPosition(){
            if(this.result.length == 0){
                Toast.fail({
                duration:1000,
                message: '您还没有选择职位'
                });
                return;
            }
            var phone = this.$store.state.userinfo.phone;
            var ids = [];
            this.result.map((item,ind)=>{
                return this.list.filter((val,index)=>{
                    if(item == index) return ids.push(val._id);
                })
            })
            console.log(ids);

            this.$axios.post('/api/app/apply_add',{
                phone,
                ids
            }).then((res)=>{
                if(res.data.code == 0){
                    this.$axios.post('/api/app/collect_delete',{
                        phone,
                        ids
                    }).then((res)=>{
                        if(res.data.code == 0){
                            this.list.map((item,i)=>{
                                ids.map((val,ind)=>{
                                    if(item._id==val){
                                        this.list.splice(i,1);
                                    }
                                });
                            });
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
                    })
                }
                else{
                    Toast.fail({
                        duration:1000,
                        message: '申请失败'
                    });
                }
            });
        },

        deleteInfo(){
            if(this.result.length == 0){
                Toast.fail({
                duration:1000,
                message: '您还没有选择职位'
                });
                return;
            }
            // console.log(111);
            var phone = this.$store.state.userinfo.phone;
            var ids = [];
            this.result.map((item,ind)=>{
                return this.list.filter((val,index)=>{
                    if(item == index) return ids.push(val._id);
                })
            })
            // console.log(ids);
            this.$axios.post('/api/app/collect_delete',{
                phone,
                ids
            }).then((res)=>{
                // console.log(222);
                if(res.data.code==0){
                    this.list.map((item,i)=>{
                        ids.map((val,ind)=>{
                            if(item._id==val){
                                this.list.splice(i,1);
                            }
                        });
                    });
                    Toast.success({
                        duration:1000,
                        message: '删除成功'
                    });
                }
                else{
                    Toast.fail({
                        duration:1000,
                        message: '删除失败'
                    });
                }
            });
        }
    },
}
</script>

<style lang="scss" scoped>
.content{
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
}
.favorite{
    width: 100%;
    .pages{
        // position: absolute;
        // top: 96px;
        padding-top: 96px;
        width: 100%;
        background-color: #fff;
        .tab{
            display: flex;
            justify-content: center;
            align-items: center;
            height: 50px;
            padding: 0 10px;
            font-size: 15px;
            color: #444;
            background-color: #fff;
            border-bottom: 1px solid #e6e6e6;
            position: relative;
            span{
                width: 50%;
                height: 100%;
                line-height: 50px;
                text-align: center;
                position: relative;
            }
            .on{
                color: #ff7e3e;
            }
            .on::after{
                content: '';
                position: absolute;
                left: 50%;
                transform: translateX(-50%);
                bottom: 0;
                width: 90px;
                height: 2px;
                background-color: #ff7e3e;
                color: #ff7e3e;
            }
        }
        .tab span:first-child::before{
            content: "";
            position: absolute;
            width: 1px;
            right: 0px;
            top: 10px;
            bottom: 0px;
            height: 30px;
            background-color: #e6e6e6;
        }
        .work-like, .company-like{
            display: flex;
            flex-direction: column;
            align-items: center;
            background-color: #fff;
            font-size: 12px;
            color: #bfbfbf;
            width: 100%;
            img{
                width: 138px;
            }
            .txt{
                margin: 15px 0 30px;
                max-width: 150px;
                text-align: center;
                line-height: 20px;
            }
        }
        .van-button{
            width: 160px;
            border-radius: 4px;
            font-size: 15px;
            margin-bottom: 30px;
        }
    }
    .home-footer{
        // position: fixed;
        // bottom: 0;
        // left: 0;
        padding-bottom: 60px;
    }
}
.apply-list{
    width: 100%;
    background-color: #fff;
    // margin-bottom: 8px;
    .list{
        padding-left: 52px;
        padding-right: 20px;
        position: relative;
        .van-checkbox{
            position: absolute;
            top: 45%;
            transform: translateX(-50%);
            left: 6%;
        }
    }
    .list-item{
        padding: 14px 0;
        border-top: 1px solid #f0f0f0;
        display: flex;
        flex-direction: column;
        align-items:flex-start;
        justify-content: center;
        width: 100%;
        line-height: 22px;
        .tit{
            width: 100%;
            font-weight: bold;
            font-size: 15px;
            color: #686868;
            display: flex;
            justify-content: space-between;
            margin-bottom: 2px;
            .name{
                width: 64%;
                overflow: hidden;
                text-overflow: ellipsis;
                white-space: nowrap;
            }
            .area{
                font-size: 12px;
                color: #868686;
            }
        }
        .company{
            font-size: 13px;
            color: #868686;
        }
        .state{
            width: 100%;
            font-size: 14px;
            display: flex;
            justify-content: space-between;
            color: #868686;
            p:first-child{
                color: #61a5ff;
            }
        }
    }
    .list-item:first-child{
        border-top: none;
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
    justify-content: flex-start;
    align-items: center;
    box-shadow: 0 -6px 16px rgba(0,0,0,.05);
    .van-checkbox{
        padding: 0 18px;
        font-size: 14px;
        color: #444;
    }
    .van-button{
        width: 25%;
        height: 40px;
        margin-right: 10px;
        border-radius: 6px;
    }
    .apply{
        width: 45%;
    }
}
</style>